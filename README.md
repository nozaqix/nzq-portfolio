# このサイトについて

nozaqiのポートフォリオサイトです。
## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- MDX (remark + remark-html)
- Cloudflare Pages (静的エクスポート)

## デプロイ

Cloudflare Pages Git連携により `main` に push すると自動デプロイされる。PRにはプレビューURLが自動生成される。

## ページの構成

- `/discography/`：制作楽曲。記事は `src/content/discography/` に置き、`category` は `Release`（自主リリース）か `Works`（楽曲提供）。旧 `/works/`・`/release/` は `public/_redirects` で `/discography/` に転送している
- `/journal/`：日々のことと開発のことを書く。記事は `src/content/journal/` に置く。ファイル名がそのまま URL になる（`foo.mdx` → `/journal/foo/`）

```mdx
---
title: 記事のタイトル
date: 2026-11-13
category: Diary # 日常は Diary、開発は Dev
thumbnail: https://assets.nozaqi.work/nzq/portfolio/images/xxx.png # 無くてもよい
---

本文
```

画像・`<YouTube id="..." />`・`<WebGPUDemo src="..." />` は discography の記事と同じように使える。
