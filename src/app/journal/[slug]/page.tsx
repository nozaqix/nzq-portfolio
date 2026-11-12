import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/posts';
import { journalCategoryLabel } from '@/lib/journal';
import PostArticle from '@/components/PostArticle';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('journal');
  // TEMP: output: 'export' は空の配列だとビルドが失敗するため、記事が 0 本のあいだは
  // 仮の slug を 1 つ返す（そのページは notFound() で 404 になる）
  if (slugs.length === 0) {
    return [{ slug: '_' }];
  }
  return slugs.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'journal');

  if (!post) {
    return {};
  }

  return {
    title: post.frontmatter.title,
    alternates: {
      canonical: `https://nozaqi.work/journal/${slug}/`,
    },
    openGraph: {
      title: post.frontmatter.title,
      type: 'article',
      url: `https://nozaqi.work/journal/${slug}/`,
      ...(post.frontmatter.thumbnail && {
        images: [{ url: post.frontmatter.thumbnail }],
      }),
    },
    twitter: {
      card: post.frontmatter.thumbnail ? 'summary_large_image' : 'summary',
    },
  };
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'journal');

  if (!post || !post.htmlContent) {
    notFound();
  }

  return (
    <PostArticle
      post={{
        ...post,
        htmlContent: post.htmlContent,
        // TEMP: 記事の上の [種類] を「日常」「開発」で出す
        frontmatter: { ...post.frontmatter, category: journalCategoryLabel(post.frontmatter.category) },
      }}
      parent={{ href: '/journal/', label: 'Journal' }}
    />
  );
}
