# ダーツバー 大会アーカイブ

行きつけのダーツバーの大会結果を記録していくための、木の温もりを感じるシンプルなホームページです。
ビルド不要（プレーンな HTML / CSS / JS のみ）なので、そのまま GitHub Pages で公開できます。

## ファイル構成

```
index.html            ページの骨組み
style.css              見た目（木目調デザイン）
script.js              tournaments-data.js を読み込んでタブ＋アコーディオンを自動生成
tournaments-data.js    ★大会データ本体（編集するのは基本ここだけ）
```

## 大会を追加する方法

1. `tournaments-data.js` を開く
2. 配列の一番下（`]` の直前）に、下記のようなオブジェクトを追加する

```js
{
  number: 6,
  title: "第6回 〇〇ダーツバー杯",
  date: "2026年9月吉日",
  participants: 16,
  format: "ダブルス トーナメント戦（501）",
  champion: "優勝者の名前",
  runnerUp: "準優勝者の名前",
  highlight: "大会の見どころを一言で。",
  results: [
    { rank: "優勝",   name: "優勝者の名前",   note: "" },
    { rank: "準優勝", name: "準優勝者の名前", note: "" },
    { rank: "3位",   name: "3位の名前",       note: "" },
  ],
},
```

3. 保存してページを開けば、タブとアコーディオンが自動で増えます（HTMLやCSSの編集は不要）。

現在は第1回〜第5回の内容がすべて仮の文言（「優勝者名を入力」など）になっているので、
実際の記録に差し替えてください。

## GitHub Pagesで公開する手順

1. GitHubで新しいリポジトリを作成する（例: `darts-tournament-archive`）
2. このフォルダの中身（`index.html`, `style.css`, `script.js`, `tournaments-data.js`）を
   リポジトリのルートに置いて push する
3. リポジトリの **Settings → Pages** を開く
4. 「Build and deployment」の Source を **Deploy from a branch** にする
5. Branch を `main`（お使いのデフォルトブランチ）／フォルダを `/ (root)` にして **Save**
6. 数分待つと、ページ上部に公開URL（`https://ユーザー名.github.io/リポジトリ名/`）が表示される

以降は `tournaments-data.js` を編集して push するだけで、大会が増えるたびにページも更新されます。

## デザインについて

- ウッド調のバーの雰囲気に合わせ、木目・チョークボード・真鍮（brass）の装飾金具をイメージした配色にしています。
- ヒーロー部分のダートボードはSVGで直書きしているため、画像ファイルを別途用意しなくても表示されます。
- タブ＝木のプレート、パネル＝そのプレートをめくると出てくる記録、というイメージで設計しています。
