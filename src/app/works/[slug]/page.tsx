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
  const slugs = getAllSlugs('works');
  return slugs.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'works');

  if (!post) {
    return {};
  }

  return {
    title: post.frontmatter.title,
    alternates: {
      canonical: `https://nozaqi.work/works/${slug}/`,
    },
    openGraph: {
      title: post.frontmatter.title,
      type: 'article',
      url: `https://nozaqi.work/works/${slug}/`,
      ...(post.frontmatter.thumbnail && {
        images: [{ url: post.frontmatter.thumbnail }],
      }),
    },
    twitter: {
      card: post.frontmatter.thumbnail ? 'summary_large_image' : 'summary',
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'works');

  if (!post || !post.htmlContent) {
    notFound();
  }

  const parent = post.frontmatter.category === 'Release'
    ? { href: '/works/', label: 'Works' }
    : undefined;

  return <PostArticle post={{ ...post, htmlContent: post.htmlContent }} parent={parent} />;
}
