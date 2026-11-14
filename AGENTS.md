# nzq - ポートフォリオサイト

Claude と Codex の共通のルール。Claude は `CLAUDE.md` から、このファイルを読み込む。

## ローカル確認ルール（必須）

実装変更後、push する前に必ずローカルで動作確認を行うこと。

```bash
cd ~/src/nzq-portfolio
npm run dev
```

`http://localhost:3000` をブラウザで開き、変更が意図どおりに表示され、動くことを確かめてから push する。

## コミット

- コミットメッセージの 1 行目は、PR のタイトルと同じ `種類: 説明 (Issue 番号)` にする。説明は日本語で書く。Issue が無ければ `(Issue 番号)` は付けない。種類は「PR」の節と同じものから選ぶ
  - 例：`fix: sync-dotfiles で Claude Code の設定が消えないように修正 (NZQ-97)`
  - 例：`chore: Ghostty のフォントを Lilex にする`
- 2 行目より後に詳しい説明を書くときも、日本語で書く
- GitHub が自動で作るマージコミット（`Merge pull request #...`）は、この形にしなくてよい。Dependabot が作るコミットと PR は、説明が英語のままでよい（どちらも日本語にできないため）

## PR

- PR は `develop` に出す
- タイトルは `種類: 説明 (Issue 番号)` にする。説明は日本語で書く
  - 例：`fix: sync-dotfiles で Claude Code の設定が消えないように修正 (NZQ-97)`
- 本文も日本語で書く
- 種類は次のどれか
  - `feat`：機能を足す
  - `fix`：直す
  - `docs`：ドキュメントだけ
  - `ci`：CI やワークフロー
  - `test`：テスト
  - `refactor`：動きを変えずに書き直す
  - `chore`：設定や雑務
- Linear の Issue がないときは、Issue 番号を書かない
- タイトルに Issue 番号を入れると、マージしたときに Linear がその Issue を Done にする。Issue にまだ残りの作業があるときは、マージのあとで In Progress に戻す
