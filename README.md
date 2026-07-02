# Technical Notes

Codex App から疑問を投げて作る解説ノートと、後で参照したい外部資料URLを、静的HTMLの知識インデックスとして蓄積するためのリポジトリです。

## 使い方

1. このディレクトリを Git リポジトリとして初期化し、GitHub に接続します。
2. Codex App でこのリポジトリを開きます。
3. 解説ページを作る場合は、`質問: OAuth の PKCE は何を防ぐの？` のように依頼します。
4. 外部資料を管理したい場合は、URLと必要ならカテゴリを渡します。この場合は原則として個別ページを作らず、`data/index-items.json` の一覧データに登録します。
5. Codex が追加した一覧項目、ノート、参照元を検証します。
6. 検証に問題がなければ、Codex が対象ファイルだけを commit・pushします。GitHub Pages が自動更新されます。

ローカル確認は `python -m http.server 8000` を実行し、`http://localhost:8000` を開きます。

## GitHub Pages へ公開

GitHub CLI で認証後、次を実行します。

```powershell
git init -b main
git add .
git commit -m "Create technical notes site"
gh repo create technical-notes --public --source=. --remote=origin --push
```

初回push後、`.github/workflows/static.yml` がGitHub Pagesへ自動デプロイします。リポジトリの **Settings → Pages** で Source が **GitHub Actions** になっていることを確認してください。

このサイトには質問内容、生成したノート、登録した外部URLが公開されます。秘密情報や個人情報、未公開URLが含まれていないことを、作成依頼時点で必ず確認してください。
