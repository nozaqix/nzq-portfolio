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
  const slugs = getAllSlugs('discography');
  return slugs.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'discography');

  if (!post) {
    return {};
  }

  return {
    title: post.frontmatter.title,
    alternates: {
      // TEMP: URL を /works/ から /discography/ に変更（旧 URL は public/_redirects で 301）
      canonical: `https://nozaqi.work/discography/${slug}/`,
    },
    openGraph: {
      title: post.frontmatter.title,
      type: 'article',
      url: `https://nozaqi.work/discography/${slug}/`,
      ...(post.frontmatter.thumbnail && {
        images: [{ url: post.frontmatter.thumbnail }],
      }),
    },
    twitter: {
      card: post.frontmatter.thumbnail ? 'summary_large_image' : 'summary',
    },
  };
}

export default async function DiscographyPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'discography');

  if (!post || !post.htmlContent) {
    notFound();
  }

  // TEMP: パンくずは Home > Discography > 曲名 に統一
  return (
    <PostArticle
      post={{ ...post, htmlContent: post.htmlContent }}
      parent={{ href: '/discography/', label: 'Discography' }}
    />
  );
}
