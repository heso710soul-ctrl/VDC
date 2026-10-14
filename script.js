/**
 * TOURNAMENTS配列（tournaments-data.js）を元に、
 * ヒーローの最新大会・優勝回数・歴代の大会・選んだ回の詳細を自動で描画します。
 * 大会を追加するときはこのファイルを触る必要はありません。
 */
(function () {
  "use strict";

  const data = typeof TOURNAMENTS !== "undefined" && Array.isArray(TOURNAMENTS) ? TOURNAMENTS : [];
  const sorted = [...data].sort((a, b) => a.number - b.number);

  const $ = (id) => document.getElementById(id);
  const rollEl = $("roll");
  const detailEl = $("detail");

  drawBoard($("board"));

  if (sorted.length === 0) {
    detailEl.innerHTML = '<p class="empty">まだ大会データがありません。tournaments-data.js に大会を追加すると、ここに表示されます。</p>';
    return;
  }

  const latest = sorted[sorted.length - 1];

  // ---------- ヒーロー：最新大会 ----------
  $("latest").innerHTML = `
    <span>最新は第${latest.number}回（${esc(latest.date || "")}）</span>
    <span>優勝 <b>${esc(latest.champion || "―")}</b></span>
    <a href="#vdc-${latest.number}" data-go="${latest.number}">結果を見る</a>`;

  // ---------- 優勝回数 ----------
  const wins = {};
  sorted.forEach((t) => { if (t.champion) wins[t.champion] = (wins[t.champion] || 0) + 1; });
  const tally = Object.entries(wins).sort((a, b) => b[1] - a[1]);
  $("tally").innerHTML =
    "<span>優勝回数</span>" + tally.map(([name, n]) => `<span>${esc(name)}<b>${n}</b></span>`).join("");

  // ---------- 歴代の大会 ----------
  rollEl.innerHTML = sorted
    .map(
      (t) => `
      <button type="button" class="roll__item" role="tab" id="tab-${t.number}"
        aria-controls="detail" aria-selected="false" data-go="${t.number}">
        <span class="roll__no">${t.number}</span>
        <span class="roll__date">${esc(t.date || "")}</span>
        <span class="roll__champ"><small>優勝</small>${esc(t.champion || "―")}</span>
      </button>`
    )
    .join("");

  document.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go]");
    if (!go) return;
    e.preventDefault();
    select(Number(go.dataset.go), go.tagName === "A");
  });

  // URLの #vdc-3 のような指定があればその回、なければ最新回を表示
  const fromHash = Number((location.hash.match(/^#vdc-(\d+)$/) || [])[1]);
  select(sorted.some((t) => t.number === fromHash) ? fromHash : latest.number, false);

  // ---------- 詳細 ----------
  function select(number, scroll) {
    const t = sorted.find((x) => x.number === number);
    if (!t) return;

    rollEl.querySelectorAll(".roll__item").forEach((b) =>
      b.setAttribute("aria-selected", String(Number(b.dataset.go) === number))
    );
    detailEl.setAttribute("aria-labelledby", `tab-${number}`);
    try { history.replaceState(null, "", `#vdc-${number}`); } catch (_) {}

    const ranks = [];
    const scores = [];
    (t.results || []).forEach((r) => {
      const m = String(r.rank).match(/^最高得点\s*[（(]?([^)）：:]*)[)）]?\s*[：:]\s*(\d+)/);
      if (m) scores.push({ game: m[1].trim(), value: m[2], name: r.name });
      else ranks.push(r);
    });

    const meta = [
      ["開催日", t.date],
      ["参加人数", t.participants != null ? `${t.participants}名` : ""],
      ["形式", t.format],
    ].filter(([, v]) => v);

    detailEl.innerHTML = `
      <article class="detail">
        <header class="detail__head">
          <h2 class="detail__title">${esc(t.title || `VDC ${t.number}`)}</h2>
          <dl class="detail__meta">
            ${meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}
          </dl>
        </header>

        ${t.highlight ? `<p class="detail__quote">${esc(t.highlight)}</p>` : ""}

        <div class="detail__grid">
          ${
            ranks.length
              ? `<ol class="podium">${ranks
                  .map(
                    (r, i) => `
                <li class="${i === 0 ? "is-champ" : ""}">
                  <span class="podium__rank">${esc(r.rank)}</span>
                  <span class="podium__name">${esc(r.name)}</span>
                  <span class="podium__note">${esc(r.note || "")}</span>
                </li>`
                  )
                  .join("")}</ol>`
              : `<p class="empty">結果は追って更新します。</p>`
          }
          <div>
            ${scores
              .map(
                (s) => `
              <div class="hiscore">
                <p class="hiscore__label">最高得点${s.game ? `（${esc(gameName(s.game))}）` : ""}</p>
                <p class="hiscore__value">${esc(s.value)}</p>
                <p class="hiscore__name">${esc(s.name)}</p>
              </div>`
              )
              .join("")}
          </div>
        </div>

        ${t.youtubeId ? videoHtml(t) : ""}

        ${
          t.sheetUrl
            ? `<a class="sheet-link" href="${esc(t.sheetUrl)}" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M14 3h7v7M21 3l-9 9M5 5h6M5 12h6M5 19h14M19 12v7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                スコア詳細をスプレッドシートで見る
              </a>`
            : ""
        }
      </article>`;

    const v = detailEl.querySelector("button.video");
    if (v) {
      v.addEventListener("click", () => {
        v.insertAdjacentHTML(
          "beforeend",
          `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(t.youtubeId)}?autoplay=1"
            title="${esc(t.title)} 大会動画"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>`
        );
      }, { once: true });
    }

    if (scroll) detailEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function videoHtml(t) {
    const id = encodeURIComponent(t.youtubeId);
    const play = `<span class="video__play"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M0 0L20 10L0 20Z"/></svg>大会の動画を再生</span>`;
    // プレビュー表示用（YouTubeを埋め込めない環境ではリンクにする）
    if (window.VDC_PREVIEW) {
      return `<a class="video" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">${play}</a>`;
    }
    return `<button type="button" class="video" style="background-image:url('https://i.ytimg.com/vi/${id}/hqdefault.jpg')">${play}</button>`;
  }

  function gameName(g) {
    return /^count\s*-?\s*up$/i.test(g) ? "カウントアップ" : g;
  }

  // ---------- ラインアートのダーツボード ----------
  function drawBoard(svg) {
    if (!svg) return;
    const order = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
    const R = { dOut: 162, dIn: 152, tOut: 100, tIn: 90, ob: 16, bull: 7 };
    const pt = (r, deg) => {
      const a = (deg * Math.PI) / 180;
      return [+(r * Math.sin(a)).toFixed(2), +(-r * Math.cos(a)).toFixed(2)];
    };
    const sector = (r1, r2, a1, a2) => {
      const [x1, y1] = pt(r2, a1), [x2, y2] = pt(r2, a2), [x3, y3] = pt(r1, a2), [x4, y4] = pt(r1, a1);
      return `M${x1},${y1} A${r2},${r2} 0 0,1 ${x2},${y2} L${x3},${y3} A${r1},${r1} 0 0,0 ${x4},${y4} Z`;
    };

    let s = "";
    order.forEach((n, i) => {
      const a1 = i * 18 - 9, a2 = i * 18 + 9;
      const cls = i % 2 === 0 ? "cell-red" : "cell-green";
      s += `<path class="${cls}" d="${sector(R.dIn, R.dOut, a1, a2)}"/>`;
      s += `<path class="${cls}" d="${sector(R.tIn, R.tOut, a1, a2)}"/>`;
      const [x0, y0] = pt(R.ob, a1), [x1, y1] = pt(R.dOut, a1);
      s += `<line class="wire" x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}"/>`;
      const [nx, ny] = pt(180, i * 18);
      s += `<text class="num" x="${nx}" y="${ny}">${n}</text>`;
    });
    [R.dOut, R.dIn, R.tOut, R.tIn, R.ob].forEach((r) => (s += `<circle class="ring" r="${r}"/>`));
    s += `<circle class="cell-green" r="${R.ob - 0.5}"/><circle class="bull" r="${R.bull}"/>`;
    // トリプル20に刺さるダーツ
    s += `<g transform="translate(0,-95)"><g class="dart">
            <line x1="0" y1="0" x2="74" y2="74"/>
            <path d="M66 66 L92 70 L80 80 L70 92 Z"/>
          </g></g>`;
    svg.innerHTML = s;
  }

  function esc(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
