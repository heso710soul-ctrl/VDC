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
 * の場合、"v=" のあとの "ABC12345XYZ" の部分が youtubeId です。
 * 短縮URL（https://youtu.be/ABC12345XYZ）の場合も、最後の
 * "ABC12345XYZ" の部分をそのまま使ってください。
 */
 
const TOURNAMENTS = [
  {
    number: 1,
    title: "VDC 1",
    date: "2024/12/1",
    participants: 12,
    format: "シングルス トーナメント戦（501）",
    champion: "優勝者名を入力",
    runnerUp: "準優勝者名を入力",
    highlight: "記念すべき第1回。常連メンバーが集まり、和気あいあいとした雰囲気の中でスタートしました。",
    youtubeId: "",
    sheetUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRh1mjSzmXjtD8MCa2VAmLITajHwtJP01g9908YjaUQnjhQwNqNQ4Yek2KlvycrpLWEDHnRugDECq3g/pub?gid=1176057709&single=true&output=csv",
    results: [
      { rank: "優勝", name: "優勝者名を入力", note: "" },
      { rank: "準優勝", name: "準優勝者名を入力", note: "" },
      { rank: "3位", name: "3位の名前を入力", note: "" },
    ],
  },
  {
    number: 2,
    title: "VDC 2",
    date: "2025/4/13",
    participants: 14,
    format: "シングルス トーナメント戦（501）",
    champion: "優勝者名を入力",
    runnerUp: "準優勝者名を入力",
    highlight: "参加者が増え、盛り上がりを見せた第2回。",
    youtubeId: "",
    sheetUrl: "",
    results: [
      { rank: "優勝", name: "優勝者名を入力", note: "" },
      { rank: "準優勝", name: "準優勝者名を入力", note: "" },
      { rank: "3位", name: "3位の名前を入力", note: "" },
    ],
  },
  {
    number: 3,
    title: "VDC 3",
    date: "2025/8/17",
    participants: 16,
    format: "ダブルス トーナメント戦（501）",
    champion: "優勝ペア名を入力",
    runnerUp: "準優勝ペア名を入力",
    highlight: "初のダブルス形式を導入。チーム戦ならではの盛り上がりに。",
    youtubeId: "",
    sheetUrl: "",
    results: [
      { rank: "優勝", name: "優勝ペア名を入力", note: "" },
      { rank: "準優勝", name: "準優勝ペア名を入力", note: "" },
      { rank: "3位", name: "3位ペア名を入力", note: "" },
    ],
  },
  {
    number: 4,
    title: "VDC 4",
    date: "2025/12/7",
    participants: 18,
    format: "シングルス トーナメント戦（301）",
    champion: "優勝者名を入力",
    runnerUp: "準優勝者名を入力",
    highlight: "過去最多の参加人数を記録。接戦の連続となった大会。",
    youtubeId: "",
    sheetUrl: "",
    results: [
      { rank: "優勝", name: "優勝者名を入力", note: "" },
      { rank: "準優勝", name: "準優勝者名を入力", note: "" },
      { rank: "3位", name: "3位の名前を入力", note: "" },
    ],
  },
  {
    number: 5,
    title: "第5回 大会",
    date: "2025年 春",
    participants: 20,
    format: "シングルス トーナメント戦（501）",
    champion: "優勝者名を入力",
    runnerUp: "準優勝者名を入力",
    highlight: "節目の第5回。決勝は最後のダブルアウトまでもつれる名勝負に。",
    youtubeId: "v=UhzB-Zm2g7I",
    sheetUrl: "",
    results: [
      { rank: "優勝", name: "優勝者名を入力", note: "" },
      { rank: "準優勝", name: "準優勝者名を入力", note: "" },
      { rank: "3位", name: "3位の名前を入力", note: "" },
    ],
  },
];
