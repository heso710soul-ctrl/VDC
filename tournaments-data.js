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
 *   results: [
 *     { rank: "優勝",   name: "優勝者の名前",   note: "決勝は接戦のダブルアウト" },
 *     { rank: "準優勝", name: "準優勝者の名前", note: "" },
 *     { rank: "3位",   name: "3位の名前",       note: "" },
 *   ],
 * },
 *
 * ↑ これを配列の一番下（] の直前）に貼り付けて保存すれば、
 * ページを開いたときに自動的にタブが増えます。
 */

const TOURNAMENTS = [
  {
    number: 1,
    title: "第1回 大会",
    date: "2023年 春",
    participants: 12,
    format: "シングルス トーナメント戦（501）",
    champion: "優勝者名を入力",
    runnerUp: "準優勝者名を入力",
    highlight: "記念すべき第1回。常連メンバーが集まり、和気あいあいとした雰囲気の中でスタートしました。",
    results: [
      { rank: "優勝", name: "優勝者名を入力", note: "" },
      { rank: "準優勝", name: "準優勝者名を入力", note: "" },
      { rank: "3位", name: "3位の名前を入力", note: "" },
    ],
  },
  {
    number: 2,
    title: "第2回 大会",
    date: "2023年 秋",
    participants: 14,
    format: "シングルス トーナメント戦（501）",
    champion: "優勝者名を入力",
    runnerUp: "準優勝者名を入力",
    highlight: "参加者が増え、盛り上がりを見せた第2回。",
    results: [
      { rank: "優勝", name: "優勝者名を入力", note: "" },
      { rank: "準優勝", name: "準優勝者名を入力", note: "" },
      { rank: "3位", name: "3位の名前を入力", note: "" },
    ],
  },
  {
    number: 3,
    title: "第3回 大会",
    date: "2024年 春",
    participants: 16,
    format: "ダブルス トーナメント戦（501）",
    champion: "優勝ペア名を入力",
    runnerUp: "準優勝ペア名を入力",
    highlight: "初のダブルス形式を導入。チーム戦ならではの盛り上がりに。",
    results: [
      { rank: "優勝", name: "優勝ペア名を入力", note: "" },
      { rank: "準優勝", name: "準優勝ペア名を入力", note: "" },
      { rank: "3位", name: "3位ペア名を入力", note: "" },
    ],
  },
  {
    number: 4,
    title: "第4回 大会",
    date: "2024年 秋",
    participants: 18,
    format: "シングルス トーナメント戦（301）",
    champion: "優勝者名を入力",
    runnerUp: "準優勝者名を入力",
    highlight: "過去最多の参加人数を記録。接戦の連続となった大会。",
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
    results: [
      { rank: "優勝", name: "優勝者名を入力", note: "" },
      { rank: "準優勝", name: "準優勝者名を入力", note: "" },
      { rank: "3位", name: "3位の名前を入力", note: "" },
    ],
  },
];
