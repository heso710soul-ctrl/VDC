/**
 * 大会データファイル
 * ================================
 * 新しい大会を追加したいときは、この配列の最後に
 * オブジェクトを1つ追加するだけでOKです。
 * HTMLやCSSを触る必要はありません。
 *
 * 例）第6回大会を追加する場合：
 *
 * {
 *   number: 6,
 *   title: "第6回 〇〇ダーツバー杯",
 *   date: "2026年9月吉日",
 *   participants: 16,
 *   format: "ダブルス トーナメント戦（501）",
 *   champion: "優勝者の名前",
 *   runnerUp: "準優勝者の名前",
 *   highlight: "大会の見どころ・エピソードを一言で。",
 *   youtubeId: "dQw4w9WgXcQ",  // ← YouTube動画のID（省略すると動画なしで表示）
 *   sheetUrl: "",              // ← スプレッドシートの共有リンク（省略するとリンクなしで表示）
 *   results: [
 *     { rank: "優勝",   name: "優勝者の名前",   note: "決勝は接戦のダブルアウト" },
 *     { rank: "準優勝", name: "準優勝者の名前", note: "" },
 *     { rank: "3位",   name: "3位の名前",       note: "" },
 *   ],
 * },
 *
 * ↑ これを配列の一番下（] の直前）に貼り付けて保存すれば、
 * ページを開いたときに自動的にタブが増えます。
 *
 * ---- youtubeIdの調べ方 ----
 * YouTubeの動画URLが
 *   https://www.youtube.com/watch?v=ABC12345XYZ
 * の場合、"v=" のあとの "ABC12345XYZ" の部分（"v="は含めない）が
 * youtubeId です。短縮URL（https://youtu.be/ABC12345XYZ）の場合も、
 * 最後の "ABC12345XYZ" の部分をそのまま使ってください。
 *
 * ---- sheetUrlの作り方 ----
 * スプレッドシートを開き「共有」→「リンクを取得」で発行される
 * URL（閲覧権限）をそのまま貼り付けてください。パネル内に
 * 「スコア詳細をスプレッドシートで見る」という外部リンクボタンが表示されます。
 */
 
const TOURNAMENTS = [
  {
    number: 1,
    title: "VDC 1",
    date: "2024/12/1",
    participants: 20,
    champion: "トラ",
    runnerUp: "みさき",
    highlight: "主催のトラさん、すべてを搔っ攫う大優勝！",
    youtubeId: "",
    sheetUrl: "https://docs.google.com/spreadsheets/d/1rK9XDu3kzhjNbys61Eulars7zoEsVwdTXbLRI0cTvXc/edit?usp=sharing",
    results: [
      { rank: "優勝", name: "トラ", note: "" },
      { rank: "準優勝", name: "みさき", note: "" },
      { rank: "3位", name: "足利", note: "" },
      { rank: "最高得点（countup）：574", name: "トラ", note: "" },
    ],
  },
  {
    number: 2,
    title: "VDC 2",
    date: "2025/4/13",
    participants: 20,
    champion: "トラ",
    runnerUp: "さとみ",
    highlight: "第１回大会に続き、トラが２連覇！",
    youtubeId: "",
    sheetUrl: "https://docs.google.com/spreadsheets/d/1dWuSMOLjomv7pOmpB4vwBSBaAGVZ0MpWNZRm4oaSsoo/edit?usp=sharing",
    results: [
      { rank: "優勝", name: "トラ", note: "2連覇！" },
      { rank: "準優勝", name: "さとみ", note: "" },
      { rank: "3位", name: "足利", note: "" },
      { rank: "最高得点（countup）：543", name: "足利", note: "" },
    ],
  },
  {
    number: 3,
    title: "VDC 3",
    date: "2025/8/17",
    participants: 16,
    champion: "トラ",
    runnerUp: "倉又",
    highlight: "トラさん、３連覇！！",
    youtubeId: "4DfwDJOFMkA",
    sheetUrl: "https://docs.google.com/spreadsheets/d/1WLJYzEco-JwD1NjYqNKkKIQUPcV6sJbMumCMufrxAPs/edit?usp=sharing",
    results: [
      { rank: "優勝", name: "トラ", note: "" },
      { rank: "準優勝", name: "倉又", note: "" },
      { rank: "3位", name: "道地", note: "" },
      { rank: "最高得点（countup）：527", name: "足利", note: "" },
    ],
  },
  {
    number: 4,
    title: "VDC 4",
    date: "2025/12/7",
    participants: 16,
    champion: "足利",
    runnerUp: "へそ",
    highlight: "足利さん、悲願の優勝！！しの、初のハットトリック！",
    youtubeId: "WICQCq0fSyA",
    sheetUrl: "https://docs.google.com/spreadsheets/d/1ZGoOoXccdQ1hg3eSyjZzxnGY5Poeb8zToB_DZwHWt0o/edit?usp=sharing",
    results: [
      { rank: "優勝", name: "足利", note: "" },
      { rank: "準優勝", name: "へそ", note: "" },
      { rank: "最高得点（countup）：480", name: "カエデ", note: "" },
    ],
  },
  {
    number: 5,
    title: "VDC 5",
    date: "2026/4/12",
    participants: 16,
    champion: "陸",
    runnerUp: "足利",
    highlight: "陸さん、初優勝！",
    youtubeId: "UhzB-Zm2g7I",
    sheetUrl: "https://docs.google.com/spreadsheets/d/1i68XtJ97n7IE_RBz1NCER0vSJovfrWR4au_g4aQkI4s/edit?usp=sharing",
    results: [
      { rank: "優勝", name: "陸", note: "" },
      { rank: "準優勝", name: "足利", note: "" },
      { rank: "最高得点（countup）：668", name: "陸", note: "" },
    ],
  },
  { 
   number: 6,
   title: "VDC 6", // ← スペースを半角1つに統一
   date: "2026/8/30", // ← 「年」を削除
   participants: 16,
   champion: "優勝者の名前",
   runnerUp: "準優勝者の名前",
   highlight: "大会の見どころ・エピソードを一言で。",
   youtubeId: "",  // ← YouTube動画のID（省略すると動画なしで表示）
   sheetUrl: "https://docs.google.com/spreadsheets/d/1YQH1P0FJ-p-uJe4w-LcDtyW9gc-2HxSj/edit?usp=sharing&ouid=113547619669760266130&rtpof=true&sd=true", 
   results: [
     { rank: "優勝",   name: "優勝者の名前",   note: "決勝は接戦のダブルアウト" },
     { rank: "準優勝", name: "準優勝者の名前", note: "" },
     { rank: "3位",   name: "3位の名前",       note: "" },
   ],
  },
];
 
