import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/posts';
import PostArticle from '@/components/PostArticle';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('devlog');
  // output: export は空の配列だとビルドが失敗するため、記事が0本のあいだは
  // 仮の slug を1つ返す（そのページは notFound() で 404 になる）
  if (slugs.length === 0) {
    return [{ slug: '_' }];
  }
  return slugs.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'devlog');

  if (!post) {
    return {};
  }

  return {
    title: post.frontmatter.title,
    alternates: {
      canonical: `https://nozaqi.work/devlog/${slug}/`,
    },
    openGraph: {
      title: post.frontmatter.title,
      type: 'article',
      url: `https://nozaqi.work/devlog/${slug}/`,
      ...(post.frontmatter.thumbnail && {
        images: [{ url: post.frontmatter.thumbnail }],
      }),
    },
    twitter: {
      card: post.frontmatter.thumbnail ? 'summary_large_image' : 'summary',
    },
  };
}

export default async function DevlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'devlog');

  if (!post || !post.htmlContent) {
    notFound();
  }

  return <PostArticle post={{ ...post, htmlContent: post.htmlContent }} parent={{ href: '/devlog/', label: 'Devlog' }} />;
}
