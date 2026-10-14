/**
 * ・トップの写真スライド
 * ・TOURNAMENTS配列（tournaments-data.js）から大会リストを自動生成
 * 大会を追加するときはこのファイルを触る必要はありません。
 */
(function () {
  "use strict";

  setupSlides();

  const data = typeof TOURNAMENTS !== "undefined" && Array.isArray(TOURNAMENTS) ? TOURNAMENTS : [];
  const list = document.getElementById("list");
  // 新しい回を上に表示
  const items = [...data].sort((a, b) => b.number - a.number);

  if (items.length === 0) {
    list.innerHTML = '<p class="empty">まだ大会データがありません。tournaments-data.js に大会を追加すると、ここに表示されます。</p>';
    return;
  }

  const latest = items[0];

  // ---------- ヒーロー：最新大会 ----------
  document.getElementById("latest").innerHTML = `
    <span><span class="k">最新</span> 第${latest.number}回 ${esc(fmtDate(latest.date))}</span>
    <span><span class="k">優勝</span> <b>${esc(latest.champion || "―")}</b></span>
    <a href="#vdc-${latest.number}" data-open="${latest.number}">結果を見る</a>`;

  // ---------- 優勝回数 ----------
  const wins = {};
  items.forEach((t) => { if (t.champion) wins[t.champion] = (wins[t.champion] || 0) + 1; });
  document.getElementById("tally").innerHTML =
    "<span>優勝回数</span>" +
    Object.entries(wins)
      .sort((a, b) => b[1] - a[1])
      .map(([name, n]) => `<span>${esc(name)}<b>${n}</b></span>`)
      .join("");

  // ---------- 大会リスト ----------
  list.innerHTML = items.map(rowHtml).join("");

  list.addEventListener("click", (e) => {
    const head = e.target.closest(".row__head");
    if (head) {
      const row = head.closest(".row");
      toggle(row, !row.classList.contains("is-open"));
      return;
    }
    const v = e.target.closest("button.video");
    if (v && !v.querySelector("iframe")) {
      v.insertAdjacentHTML(
        "beforeend",
        `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(v.dataset.id)}?autoplay=1"
          title="${esc(v.dataset.title)} 大会動画"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>`
      );
    }
  });

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-open]");
    if (!a) return;
    e.preventDefault();
    const row = document.getElementById(`vdc-${a.dataset.open}`);
    toggle(row, true);
    row.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // URLの #vdc-3 のような指定があればその回、なければ最新回を開いておく
  const fromHash = document.getElementById((location.hash || "").slice(1));
  toggle(fromHash && fromHash.classList.contains("row") ? fromHash : list.querySelector(".row"), true);

  function toggle(row, open) {
    if (!row) return;
    row.classList.toggle("is-open", open);
    row.querySelector(".row__head").setAttribute("aria-expanded", String(open));
  }

  function rowHtml(t) {
    const ranks = [];
    const scores = [];
    (t.results || []).forEach((r) => {
      const m = String(r.rank).match(/^最高得点\s*[（(]?([^)）：:]*)[)）]?\s*[：:]\s*(\d+)/);
      if (m) scores.push({ game: gameName(m[1].trim()), value: m[2], name: r.name });
      else ranks.push(r);
    });
    const top = scores[0];
    const no = String(t.number).padStart(2, "0");
    const pid = `vdc-${t.number}-panel`;

    const facts = [
      ["開催日", fmtDate(t.date)],
      ["参加人数", t.participants != null ? `${t.participants}名` : ""],
      ["形式", t.format || ""],
    ]
      .filter(([, v]) => v)
      .map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`)
      .join("");

    const rankFacts = ranks
      .map((r) => `<dt>${esc(r.rank)}</dt><dd><span class="big">${esc(r.name)}</span>${r.note ? `　${esc(r.note)}` : ""}</dd>`)
      .join("");

    const scoreFacts = scores
      .map((s) => `<dt>最高得点${s.game ? `<br>${esc(s.game)}` : ""}</dt><dd><span class="big">${esc(s.value)}</span>　${esc(s.name)}</dd>`)
      .join("");

    const video = t.youtubeId ? videoHtml(t) : "";

    return `
    <article class="row" id="vdc-${t.number}">
      <button type="button" class="row__head" aria-expanded="false" aria-controls="${pid}">
        <span class="row__no" aria-label="第${t.number}回">${no}</span>
        <span class="row__date">${esc(fmtDate(t.date))}</span>
        <span class="row__champ"><span class="c-label">優勝</span>${esc(t.champion || "―")}</span>
        <span class="row__runner"><span class="c-label">準優勝</span>${esc(t.runnerUp || "―")}</span>
        <span class="row__score">${top ? `<span class="c-label">最高得点</span>${esc(top.value)}` : ""}</span>
        <svg class="row__toggle" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16M4 12h16"/></svg>
      </button>
      <div class="row__panel" id="${pid}">
        <div class="row__panel-inner">
          <div class="detail"${video ? "" : ' style="grid-template-columns:minmax(0,1fr)"'}>
            <div>
              ${t.highlight ? `<p class="detail__quote">${esc(t.highlight)}</p>` : ""}
              <dl class="facts">${facts}${rankFacts}${scoreFacts}</dl>
              ${
                t.sheetUrl
                  ? `<a class="sheet-link" href="${esc(t.sheetUrl)}" target="_blank" rel="noopener">
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7M21 3l-9 9M5 5h6M5 12h6M5 19h14M19 12v7"/></svg>
                      スコア詳細をスプレッドシートで見る
                    </a>`
                  : ""
              }
            </div>
            ${video}
          </div>
        </div>
      </div>
    </article>`;
  }

  function videoHtml(t) {
    const id = encodeURIComponent(t.youtubeId);
    const play = `<span class="video__play"><i><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2 0L20 10L2 20Z"/></svg></i>動画を再生</span>`;
    // プレビュー表示用（YouTubeを埋め込めない環境ではリンクにする）
    if (window.VDC_PREVIEW) {
      return `<a class="video" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">${play}</a>`;
    }
    return `<button type="button" class="video" data-id="${esc(t.youtubeId)}" data-title="${esc(t.title || "")}">
      <img class="video__thumb" src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()">${play}</button>`;
  }

  // ---------- 写真スライド ----------
  function setupSlides() {
    const slides = [...document.querySelectorAll(".slide")];
    const count = document.getElementById("slideCount");
    const prev = document.getElementById("slidePrev");
    const next = document.getElementById("slideNext");
    if (slides.length === 0) return;
    if (slides.length < 2) {
      document.querySelector(".hero__nav").hidden = true;
      return;
    }
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    let timer = null;

    const show = (n) => {
      slides[i].classList.remove("is-active");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("is-active");
      count.textContent = `${i + 1} / ${slides.length}`;
    };
    const start = () => {
      if (still) return;
      clearInterval(timer);
      timer = setInterval(() => show(i + 1), 6500);
    };

    prev.addEventListener("click", () => { show(i - 1); start(); });
    next.addEventListener("click", () => { show(i + 1); start(); });
    document.addEventListener("visibilitychange", () => (document.hidden ? clearInterval(timer) : start()));
    show(0);
    start();
  }

  // ---------- 小さな道具 ----------
  function fmtDate(d) {
    const m = String(d || "").match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
    return m ? `${m[1]}.${m[2].padStart(2, "0")}.${m[3].padStart(2, "0")}` : String(d || "");
  }
  function gameName(g) {
    return /^count\s*-?\s*up$/i.test(g) ? "カウントアップ" : g;
  }
  function esc(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
