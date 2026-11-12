'use client';

import { useState } from 'react';
import Link from 'next/link';
import { JOURNAL_CATEGORIES, journalCategoryLabel } from '@/lib/journal';

export interface JournalListItem {
  slug: string;
  title: string;
  date: string;
  category: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const textClass = 'text-xs font-normal leading-normal tracking-[0.6px] font-inter';

// TEMP: journal の一覧。日付・種類・題を 1 行ずつ並べ、上のボタンで種類を絞り込める
export default function JournalList({ items }: { items: JournalListItem[] }) {
  const [filter, setFilter] = useState<string>('All');
  const filters = [{ value: 'All', label: 'すべて' }, ...JOURNAL_CATEGORIES];
  const visible = filter === 'All' ? items : items.filter((item) => item.category === filter);

  return (
    <div className="w-full max-w-[960px] space-y-10">
      <div className="flex gap-4" role="group" aria-label="記事の種類で絞り込む">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={`${textClass} transition-colors ${
              filter === value ? 'text-white' : 'text-[#777777] hover:text-[#B8B9BA]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <ul className="space-y-6">
          {visible.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/journal/${item.slug}/`}
                className="group flex flex-col md:flex-row md:items-baseline gap-1 md:gap-6"
              >
                <span className={`${textClass} text-[#B8B9BA] md:w-24 flex-shrink-0`}>
                  {formatDate(item.date)}
                </span>
                <span className={`${textClass} text-[#999999] md:w-12 flex-shrink-0`}>
                  [{journalCategoryLabel(item.category)}]
                </span>
                <span className="text-sm text-[#B8B9BA] font-normal leading-normal tracking-[0.6px] font-inter transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={`${textClass} text-[#B8B9BA]`}>まだ記事はありません。</p>
      )}
    </div>
  );
}
