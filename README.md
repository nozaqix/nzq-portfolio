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

## 開発記録（/devlog）

区切りごと（見せられるものができたとき）に、`src/content/devlog/` に記事を1本足す。ファイル名がそのまま URL になる（`foo.mdx` → `/devlog/foo/`）。

```mdx
---
title: 記事のタイトル
date: 2026-11-05
category: Devlog
thumbnail: https://assets.nozaqi.work/nzq/portfolio/images/xxx.png
---

## 何を作ったか

## どう動くか

## どう作ったか
```

画像・`<YouTube id="..." />`・`<WebGPUDemo src="..." />` は works の記事と同じように使える。記事は一覧（/devlog）とトップ（Index）に並ぶ。
