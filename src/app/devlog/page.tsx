import { getAllPosts } from '@/lib/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorksGrid from '@/components/WorksGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devlog | NZQ',
  description: 'nozaqiの開発記録。音楽を作るためのツールを、何をどう作ったか。',
  alternates: {
    canonical: 'https://nozaqi.work/devlog/',
  },
};

export default async function DevlogPage() {
  const devlogPosts = getAllPosts('devlog');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col page-transition">
      {/* Header */}
      <Header />

      {/* Main Container - Figma Auto Layout */}
      <div className="flex flex-col items-start gap-[240px] w-full p-6 md:p-10 flex-1">
        {devlogPosts.length > 0 ? (
          <WorksGrid posts={devlogPosts} basePath="/devlog" />
        ) : (
          <p className="text-xs text-[#B8B9BA] font-normal leading-normal tracking-[0.6px] font-inter">
            まだ記事はありません。
          </p>
        )}
      </div>

      {/* Footer - Social Links */}
      <Footer />
    </div>
  );
}
