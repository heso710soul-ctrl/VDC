/**
 * TOURNAMENTS配列（tournaments-data.js）を元に
 * タブとアコーディオンパネルを自動生成します。
 * 大会を追加するときはこのファイルを触る必要はありません。
 */
(function () {
  const tabList = document.getElementById("tabList");
  const panelList = document.getElementById("panelList");
 
  if (!Array.isArray(TOURNAMENTS) || TOURNAMENTS.length === 0) {
    panelList.innerHTML = '<p style="text-align:center;opacity:.6;">まだ大会データがありません。</p>';
    return;
  }
 
  // 番号の新しい順ではなく、登録順（第1回→第N回）で表示
  const sorted = [...TOURNAMENTS].sort((a, b) => a.number - b.number);
 
  sorted.forEach((t, index) => {
    const panelId = `panel-${t.number}`;
    const tabId = `tab-${t.number}`;
 
    // --- タブボタン ---
    const tabBtn = document.createElement("button");
    tabBtn.className = "tab";
    tabBtn.id = tabId;
    tabBtn.type = "button";
    tabBtn.setAttribute("role", "tab");
    tabBtn.setAttribute("aria-controls", panelId);
    tabBtn.setAttribute("aria-selected", "false");
    tabBtn.innerHTML = `<span class="tab__num">第${t.number}回</span>${escapeHtml(t.date || "")}`;
    tabBtn.addEventListener("click", () => openPanel(t.number, true));
    tabList.appendChild(tabBtn);
 
    // --- パネル ---
    const panel = document.createElement("section");
    panel.className = "panel";
    panel.id = panelId;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tabId);
 
    const resultsRows = (t.results || [])
      .map(
        (r) => `
        <tr>
          <td class="rank">${escapeHtml(r.rank)}</td>
          <td>${escapeHtml(r.name)}</td>
          <td>${escapeHtml(r.note || "")}</td>
        </tr>`
      )
      .join("");
 
    panel.innerHTML = `
      <button type="button" class="panel__head" aria-expanded="false">
        <span>
          <span class="panel__head-title">${escapeHtml(t.title)}</span>
          <div class="panel__head-sub">${escapeHtml(t.date || "")}・優勝: ${escapeHtml(t.champion || "―")}</div>
        </span>
        <svg class="panel__chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="panel__inner">
        <div class="panel__body">
          <div class="panel__content">
            <div class="panel__meta">
              <span><b>開催日</b> ${escapeHtml(t.date || "―")}</span>
              <span><b>参加人数</b> ${t.participants != null ? t.participants + "名" : "―"}</span>
              <span><b>形式</b> ${escapeHtml(t.format || "―")}</span>
            </div>
            ${t.highlight ? `<p class="panel__highlight">${escapeHtml(t.highlight)}</p>` : ""}
            ${
              t.youtubeId
                ? `<div class="video-wrap">
                    <iframe
                      src="https://www.youtube.com/embed/${encodeURIComponent(t.youtubeId)}"
                      title="${escapeHtml(t.title)} 大会動画"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>`
                : ""
            }
            <table class="result-table">
              <thead>
                <tr><th>順位</th><th>名前</th><th>メモ</th></tr>
              </thead>
              <tbody>${resultsRows || '<tr><td colspan="3">結果は追って更新します。</td></tr>'}</tbody>
            </table>
            ${t.sheetUrl ? `
              <a class="sheet-link" href="${escapeHtml(t.sheetUrl)}" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" class="sheet-link__icon">
                  <path d="M14 3h7v7M21 3l-9 9M5 5h6M5 12h6M5 19h14M19 12v7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                スコア詳細をスプレッドシートで見る
              </a>
            ` : ""}
          </div>
        </div>
      </div>
    `;
 
    panel.querySelector(".panel__head").addEventListener("click", () => {
      const isOpen = panel.classList.contains("is-open");
      openPanel(t.number, !isOpen);
    });
 
    panelList.appendChild(panel);
  });
 
  function openPanel(number, shouldOpen) {
    document.querySelectorAll(".panel").forEach((p) => {
      const isTarget = p.id === `panel-${number}`;
      const willOpen = isTarget && shouldOpen;
      p.classList.toggle("is-open", willOpen);
      p.querySelector(".panel__head").setAttribute("aria-expanded", String(willOpen));
    });
    document.querySelectorAll(".tab").forEach((tabBtn) => {
      const isTarget = tabBtn.id === `tab-${number}`;
      tabBtn.setAttribute("aria-selected", String(isTarget && shouldOpen));
    });
    if (shouldOpen) {
      const panelEl = document.getElementById(`panel-${number}`);
      panelEl?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }
 
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
 
  // 初期表示：一番新しい回（配列の最後）を開いておく
  const latest = sorted[sorted.length - 1];
  openPanel(latest.number, true);
})();
 
