import { getAllPosts } from '@/lib/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JournalList from '@/components/JournalList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal | NZQ',
  description: 'nozaqiのジャーナル。日々のことと、開発のこと。',
  alternates: {
    canonical: 'https://nozaqi.work/journal/',
  },
};

function toIsoString(value: unknown): string {
  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}

export default async function JournalPage() {
  const items = getAllPosts('journal').map((post) => ({
    slug: post.slug,
    title: post.frontmatter.title,
    // TEMP: gray-matter は date を Date で返すので、クライアント部品に渡す前に文字列にする
    date: toIsoString(post.frontmatter.date),
    category: post.frontmatter.category,
  }));

  return (
    <div className="min-h-screen bg-black text-white flex flex-col page-transition">
      {/* Header */}
      <Header />

      <div className="flex flex-col items-start w-full p-6 md:p-10 flex-1">
        <JournalList items={items} />
      </div>

      {/* Footer - Social Links */}
      <Footer />
    </div>
  );
}
