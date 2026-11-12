import { getAllPosts } from '@/lib/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorksGrid from '@/components/WorksGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discography | NZQ',
  description: 'nozaqiの制作楽曲。オリジナル楽曲のリリースと楽曲提供。',
  alternates: {
    canonical: 'https://nozaqi.work/discography/',
  },
};

// TEMP: 旧 /release/（自主リリース）と旧 /works/（楽曲提供）を 1 ページにまとめ、見出しで分ける
const GROUPS = [
  { category: 'Release', label: 'Release' },
  { category: 'Works', label: 'Works' },
] as const;

export default async function DiscographyPage() {
  const posts = getAllPosts('discography');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col page-transition">
      {/* Header */}
      <Header />

      <div className="flex flex-col items-start gap-24 w-full p-6 md:p-10 flex-1">
        {GROUPS.map(({ category, label }) => {
          const groupPosts = posts.filter((post) => post.frontmatter.category === category);
          if (groupPosts.length === 0) {
            return null;
          }
          return (
            <section key={category} className="w-full max-w-[1440px] mx-auto space-y-8">
              <h2 className="text-sm text-white font-bold leading-normal tracking-[1px] font-din-next">
                {label}
              </h2>
              <WorksGrid posts={groupPosts} basePath="/discography" />
            </section>
          );
        })}
      </div>

      {/* Footer - Social Links */}
      <Footer />
    </div>
  );
}
