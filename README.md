# Technical Notes

Codex App から疑問を投げ、読みやすい静的 HTML ノートとして蓄積するためのリポジトリです。

## 使い方

1. このディレクトリを Git リポジトリとして初期化し、GitHub に接続します。
2. Codex App でこのリポジトリを開きます。
3. `質問: OAuth の PKCE は何を防ぐの？` のように依頼します。
4. Codex が追加したノートと参照元を確認します。
5. 問題なければコミット・pushします。GitHub Pages が自動更新されます。

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

このサイトには質問内容と生成したノートが公開されます。秘密情報や個人情報が含まれていないことを、push前に必ず確認してください。
