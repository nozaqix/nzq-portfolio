// TEMP: journal の記事の種類。frontmatter の category にこの値を書く
export const JOURNAL_CATEGORIES = [
  { value: 'Diary', label: '日常' },
  { value: 'Dev', label: '開発' },
] as const;

export function journalCategoryLabel(category: string): string {
  return JOURNAL_CATEGORIES.find((c) => c.value === category)?.label ?? category;
}
