// Oasis in the Desert — game flow. Settings live in config.js, UI texts in i18n.js.
(function () {
  const C = window.OASIS_CONFIG;
  const DB = window.OasisDB;
  const { t, L } = window.OasisI18n;
  const $ = id => document.getElementById(id);
  const SVG = "http://www.w3.org/2000/svg";

  const state = {
    eco: 100, peace: 100, chosen: null, mood: null, calm: 0,
    startedAt: 0, timerId: 0, lastLeafKey: null,
    errKey: null, errDetail: "", leaves: null, treeError: ""
  };

  // ---------- language ----------
  function applyLang() {
    const lang = window.OasisI18n.getLang();
    document.documentElement.lang = lang;
    document.title = t("pageTitle");
    $("langSel").value = lang;
    document.querySelectorAll("[data-i18n]").forEach(n => { n.textContent = t(n.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach(n => { n.innerHTML = t(n.dataset.i18nHtml); });   // trusted strings only
    document.querySelectorAll("[data-i18n-ph]").forEach(n => { n.placeholder = t(n.dataset.i18nPh); });
    document.querySelectorAll("[data-i18n-aria]").forEach(n => { n.setAttribute("aria-label", t(n.dataset.i18nAria)); });

    buildGrid();
    relabelMoods();
    [...$("calmPick").children].forEach((b, i) => b.setAttribute("aria-label", t("calmAria", { n: i + 1 })));

    // Re-translate whatever is currently on screen.
    if (state.chosen) {
      const el = state.chosen;
      $("impactTitle").textContent = t("impactTitle", { name: lowerFirst(L(el.name)) });
      const items = L(el.chain);
      [...$("chain").children].forEach((li, i) => { li.textContent = items[i] || ""; });
      $("mindText").textContent = L(el.mind);
      document.querySelectorAll(".compare .missing").forEach(d => {
        d.querySelector(".msg").textContent = t("missing", { label: t(d.dataset.label), src: d.dataset.src });
      });
    }
    if (state.errKey) showError(state.errKey, state.errDetail);
    renderSoundBtn();
    renderCaption();
    renderToLeafBtn();
    if (!$("s-tree").hidden) renderTree();
    $("modeNote").textContent = DB.live ? "" : t("demo");
  }
  function lowerFirst(s) {
    // English: "Without trees…"; Thai has no case, so this is a no-op there.
    return s.charAt(0).toLowerCase() + s.slice(1);
  }

  // ---------- screens ----------
  const screens = ["intro", "choose", "impact", "mind", "restored", "leaf", "tree"];
  function show(name) {
    screens.forEach(s => { $("s-" + s).hidden = s !== name; });
    $("meters").hidden = !["choose", "impact", "mind", "restored"].includes(name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- meters ----------
  function setMeters(eco, peace) {
    state.eco = Math.max(0, Math.min(100, eco));
    state.peace = Math.max(0, Math.min(100, peace));
    $("ecoBar").style.width = state.eco + "%";
    $("peaceBar").style.width = state.peace + "%";
    $("ecoBar").classList.toggle("low", state.eco < 60);
    $("peaceBar").classList.toggle("low", state.peace < 60);
    countTo($("ecoVal"), state.eco);
    countTo($("peaceVal"), state.peace);
  }
  function countTo(el, target) {
    const from = Number(el.textContent) || 0;
    const t0 = performance.now();
    function step(now) {
      const k = Math.min(1, (now - t0) / 1200);
      el.textContent = Math.round(from + (target - from) * k);
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ---------- timer (guide only, never blocks) ----------
  function startTimer() {
    clearInterval(state.timerId);
    state.startedAt = Date.now();
    const el = $("timer");
    el.hidden = false;
    el.classList.remove("over");
    const tick = () => {
      const left = C.timeLimitSeconds - Math.floor((Date.now() - state.startedAt) / 1000);
      const s = Math.abs(left);
      el.textContent = (left < 0 ? "+" : "") + Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
      el.classList.toggle("over", left < 0);
    };
    tick();
    state.timerId = setInterval(tick, 1000);
  }
  function stopTimer() { clearInterval(state.timerId); $("timer").hidden = true; }

  // ---------- sound (light version: nature returns when restored) ----------
  const audio = $("audio");
  const SOUND_KEY = "oasis-sound";
  const MAX_VOL = 0.7;
  let soundOn = true;
  try { soundOn = localStorage.getItem(SOUND_KEY) !== "off"; } catch (e) { /* ignore */ }
  let fadeId = 0;
  let captionEl = null;          // element whose sound is currently playing

  function fadeTo(target, ms, done) {
    clearInterval(fadeId);
    const from = audio.volume, t0 = performance.now();
    fadeId = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / ms);
      audio.volume = Math.max(0, Math.min(1, from + (target - from) * k));
      if (k >= 1) { clearInterval(fadeId); if (done) done(); }
    }, 40);
  }
  function renderCaption() {
    const cap = $("soundCaption");
    if (!captionEl || !captionEl.soundCaption) { cap.hidden = true; return; }
    cap.textContent = (soundOn ? "🔊 " : "🔇 ") + L(captionEl.soundCaption) + (soundOn ? "" : " " + t("captionMuted"));
    cap.hidden = false;
  }
  function renderSoundBtn() {
    const b = $("soundBtn");
    b.textContent = soundOn ? "🔊" : "🔇";
    b.setAttribute("aria-pressed", String(soundOn));
    b.setAttribute("aria-label", t(soundOn ? "soundOnAria" : "soundOffAria"));
    b.title = t(soundOn ? "soundOnAria" : "soundOffAria");
  }
  function playNature(el) {
    stopSound(true);
    if (!el.sound) return;
    audio.loop = true;
    audio.volume = 0;
    audio.muted = !soundOn;                      // muted playback still confirms the file exists
    audio.onplaying = () => { captionEl = el; renderCaption(); };
    audio.onerror = () => { captionEl = null; renderCaption(); };   // missing file: no caption
    audio.src = el.sound;
    audio.play().then(() => fadeTo(MAX_VOL, 2500)).catch(() => { /* blocked or missing: stay silent */ });
  }
  function stopSound(immediate) {
    captionEl = null;
    renderCaption();
    if (audio.paused) return;
    if (immediate) { clearInterval(fadeId); audio.pause(); return; }
    fadeTo(0, 1200, () => audio.pause());
  }
  function toggleSound() {
    soundOn = !soundOn;
    try { localStorage.setItem(SOUND_KEY, soundOn ? "on" : "off"); } catch (e) { /* ignore */ }
    audio.muted = !soundOn;
    renderSoundBtn();
    renderCaption();
  }

  // ---------- images with placeholder fallback ----------
  function setImage(img, src, labelKey) {
    const wrap = img.parentElement;
    wrap.querySelector(".missing")?.remove();
    img.hidden = false;
    img.onerror = null;
    img.removeAttribute("src");      // force a fresh load/error on replay
    img.onerror = () => {
      img.hidden = true;
      const d = document.createElement("div");
      d.className = "missing";
      d.dataset.label = labelKey;
      d.dataset.src = src;
      const inner = document.createElement("div");
      const icon = document.createElement("b");
      icon.textContent = "🖼️";
      const msg = document.createElement("span");
      msg.className = "msg";
      msg.textContent = t("missing", { label: t(labelKey), src });
      inner.append(icon, msg);
      d.append(inner);
      wrap.prepend(d);
    };
    img.src = src;
  }

  // ---------- choose ----------
  function buildGrid() {
    const grid = $("elementGrid");
    grid.textContent = "";
    C.elements.forEach(el => {
      const b = document.createElement("button");
      b.className = "el-card";
      b.type = "button";
      const thumb = document.createElement("div");
      thumb.className = "thumb";
      thumb.textContent = el.icon;
      // Use the real photo as thumbnail if it loads.
      const probe = new Image();
      probe.onload = () => { thumb.style.backgroundImage = `url("${el.before}")`; thumb.textContent = ""; };
      probe.src = el.before;
      const name = document.createElement("div");
      name.className = "name";
      name.textContent = L(el.name);
      b.append(thumb, name);
      b.addEventListener("click", () => removeElement(el));
      grid.append(b);
    });
  }

  // ---------- impact ----------
  let impactTimers = [];
  function removeElement(el) {
    impactTimers.forEach(clearTimeout);
    impactTimers = [];
    state.chosen = el;
    $("impactTitle").textContent = t("impactTitle", { name: lowerFirst(L(el.name)) });
    setImage($("imgBefore"), el.before, "before");
    setImage($("imgAfter"), el.after, "afterAi");
    setSlider(50);
    const chain = $("chain");
    chain.textContent = "";
    $("toMindBtn").hidden = true;
    show("impact");
    stopSound(true);

    impactTimers.push(setTimeout(() => setMeters(100 - el.eco, state.peace), 400));
    const items = L(el.chain);
    items.forEach((txt, i) => {
      const li = document.createElement("li");
      li.textContent = txt;
      chain.append(li);
      impactTimers.push(setTimeout(() => li.classList.add("show"), 900 + i * 1100));
    });
    impactTimers.push(setTimeout(() => { $("toMindBtn").hidden = false; }, 900 + items.length * 1100));
  }
  function setSlider(v) {
    $("slider").value = v;
    $("afterWrap").style.clipPath = `inset(0 0 0 ${v}%)`;
    $("divider").style.left = v + "%";
  }

  // ---------- mind ----------
  function toMind() {
    const el = state.chosen;
    $("mindText").textContent = L(el.mind);
    $("mindEmoji").textContent = el.peace >= 30 ? "😣" : el.peace >= 15 ? "😟" : "😕";
    show("mind");
    setTimeout(() => setMeters(state.eco, 100 - el.peace), 400);
  }

  // ---------- restore ----------
  // "Add your leaf" waits a few seconds so visitors hear nature come back.
  const LISTEN_SECONDS = 5;
  let leafWait = 0, leafWaitId = 0;
  function renderToLeafBtn() {
    const b = $("toLeafBtn");
    b.textContent = t("toLeaf") + (leafWait > 0 ? ` (${leafWait})` : "");
    b.disabled = leafWait > 0;
  }
  function startLeafCountdown() {
    clearInterval(leafWaitId);
    leafWait = LISTEN_SECONDS;
    renderToLeafBtn();
    leafWaitId = setInterval(() => {
      leafWait -= 1;
      renderToLeafBtn();
      if (leafWait <= 0) clearInterval(leafWaitId);
    }, 1000);
  }

  function restore() {
    show("restored");
    setTimeout(() => setMeters(100, 100), 300);
    playNature(state.chosen);
    startLeafCountdown();
  }

  // ---------- leaf form ----------
  function buildLeafForm() {
    const moods = $("moodPick");
    C.moods.forEach(m => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "mood"; b.dataset.mood = m.id;
      b.setAttribute("aria-pressed", "false");
      const dot = document.createElement("span");
      dot.className = "dot"; dot.style.background = m.color;
      const label = document.createElement("span");
      label.className = "mood-label";
      b.append(dot, label);
      b.addEventListener("click", () => {
        state.mood = m.id;
        moods.querySelectorAll(".mood").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      });
      moods.append(b);
    });

    const calm = $("calmPick");
    for (let i = 1; i <= 5; i++) {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = "🌿";
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", () => {
        state.calm = i;
        [...calm.children].forEach((x, j) => {
          x.classList.toggle("on", j < i);
          x.setAttribute("aria-pressed", String(j === i - 1));
        });
      });
      calm.append(b);
    }

    $("leafText").addEventListener("input", e => { $("leafCount").textContent = e.target.value.length; });
    $("leafForm").addEventListener("submit", submitLeaf);
  }
  function relabelMoods() {
    document.querySelectorAll("#moodPick .mood").forEach(b => {
      const m = C.moods.find(x => x.id === b.dataset.mood);
      b.querySelector(".mood-label").textContent = L(m.label);
    });
  }

  function showError(key, detail) {
    state.errKey = key; state.errDetail = detail || "";
    const err = $("leafError");
    err.textContent = t(key) + (detail ? " (" + detail + ")" : "");
    err.hidden = false;
  }
  function clearError() { state.errKey = null; state.errDetail = ""; $("leafError").hidden = true; }

  function resetLeafForm() {
    $("leafText").value = ""; $("leafCount").textContent = "0"; $("leafName").value = "";
    state.mood = null; state.calm = 0;
    document.querySelectorAll("#moodPick .mood").forEach(x => x.setAttribute("aria-pressed", "false"));
    [...$("calmPick").children].forEach(x => { x.classList.remove("on"); x.setAttribute("aria-pressed", "false"); });
    clearError();
  }

  async function submitLeaf(e) {
    e.preventDefault();
    const text = $("leafText").value.trim();
    if (!text) return showError("errText");
    if (!state.mood) return showError("errMood");
    if (!state.calm) return showError("errCalm");
    clearError();

    const btn = $("leafSubmit");
    btn.disabled = true; btn.textContent = t("pinning");
    try {
      const name = $("leafName").value.trim().slice(0, 30);
      const leaf = { element: state.chosen ? state.chosen.id : "", mood: state.mood, text, name, calm: state.calm };
      await DB.addLeaf(leaf);
      state.lastLeafKey = text;
      stopTimer();
      await openTree();
    } catch (ex) {
      showError("errSave", ex.message.slice(0, 120));
    } finally {
      btn.disabled = false; btn.textContent = t("submit");
    }
  }

  // ---------- Oasis Tree ----------
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function leafPos(seed) {
    // Spread leaves over the canopy (ellipse centred at 200,165).
    const a = (seed % 3600) / 3600 * Math.PI * 2;
    const r = Math.sqrt(((seed >>> 12) % 1000) / 1000);
    return { x: 200 + Math.cos(a) * r * 165, y: 165 + Math.sin(a) * r * 125, rot: (seed >>> 4) % 360 };
  }
  function svgEl(tag, attrs) {
    const n = document.createElementNS(SVG, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function drawTree(leaves) {
    const svg = $("treeSvg");
    svg.textContent = "";
    const green = Math.min(1, leaves.length / 60);           // bare desert → full oasis
    svg.append(svgEl("ellipse", { cx: 200, cy: 405, rx: 150, ry: 12, fill: "#e0b878" }));
    svg.append(svgEl("ellipse", { cx: 200, cy: 170, rx: 185, ry: 145, fill: "#a8d48a", opacity: (0.08 + green * 0.5).toFixed(2) }));
    svg.append(svgEl("path", {
      d: "M188 405 C190 330 186 280 192 230 C170 200 140 190 110 160 M192 250 C215 215 250 200 290 170 M195 300 C210 270 230 250 260 240 M192 230 C195 190 205 150 200 100",
      stroke: "#8a5a2b", "stroke-width": 14, fill: "none", "stroke-linecap": "round"
    }));
    svg.append(svgEl("rect", { x: 182, y: 300, width: 22, height: 105, rx: 8, fill: "#8a5a2b" }));

    const moodColor = Object.fromEntries(C.moods.map(m => [m.id, m.color]));
    const reader = $("leafReader");
    reader.textContent = t("readerHint");
    leaves.slice().reverse().forEach(lf => {
      const seed = hash(lf.text + "|" + lf.createdAt);
      const p = leafPos(seed);
      const path = svgEl("path", {
        d: "M-12 0 C-6 -9 6 -9 12 0 C6 9 -6 9 -12 0 Z",
        fill: moodColor[lf.mood] || "#a8d48a",
        transform: `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.rot})`,
        class: "vleaf"
      });
      const g = svgEl("g", {});
      g.append(path);
      if (lf.text === state.lastLeafKey) path.classList.add("new");
      g.addEventListener("click", () => {
        svg.querySelectorAll(".vleaf.sel").forEach(x => x.classList.remove("sel"));
        path.classList.add("sel");
        const mood = C.moods.find(m => m.id === lf.mood);
        reader.textContent = `"${lf.text}" (${lf.name || t("anonymous")})` + (mood ? ` · ${L(mood.label)}` : "");
      });
      svg.append(g);
    });
  }

  function drawStats(leaves) {
    const box = $("stats");
    box.textContent = "";
    const counts = {};
    leaves.forEach(l => { if (l.element) counts[l.element] = (counts[l.element] || 0) + 1; });
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    if (!total) return;
    const h = document.createElement("b");
    h.textContent = t("statsTitle");
    box.append(h);
    C.elements
      .map(e => ({ e, n: counts[e.id] || 0 }))
      .sort((a, b) => b.n - a.n)
      .forEach(({ e, n }) => {
        const row = document.createElement("div");
        row.className = "stat-row";
        const name = document.createElement("span");
        name.textContent = e.icon + " " + L(e.name);
        const bar = document.createElement("div"); bar.className = "bar";
        const fill = document.createElement("div"); fill.className = "fill";
        fill.style.width = (n / total * 100).toFixed(0) + "%";
        bar.append(fill);
        const num = document.createElement("span"); num.textContent = n;
        row.append(name, bar, num);
        box.append(row);
      });
  }

  // Draw from the last loaded leaves (used for refresh and language switch).
  function renderTree() {
    const summary = $("treeSummary");
    if (state.treeError) { summary.textContent = t("treeErr") + " (" + state.treeError + ")"; return; }
    if (!state.leaves) { summary.textContent = t("loading"); return; }
    const leaves = state.leaves;
    drawTree(leaves);
    drawStats(leaves);
    const rated = leaves.filter(l => l.calm > 0);
    const avg = rated.length ? (rated.reduce((a, l) => a + l.calm, 0) / rated.length).toFixed(1) : null;
    summary.textContent = leaves.length
      ? t("leafCount", { n: leaves.length }) + (avg ? t("leafAvg", { avg }) : "")
      : t("treeEmpty");
  }

  let treeTimer = 0;
  async function refreshTree() {
    try {
      state.leaves = await DB.listLeaves(300);
      state.treeError = "";
    } catch (ex) {
      state.treeError = ex.message.slice(0, 100);
    }
    renderTree();
  }
  async function openTree() {
    show("tree");
    stopSound(false);
    $("modeNote").textContent = DB.live ? "" : t("demo");
    renderTree();
    await refreshTree();
    clearInterval(treeTimer);
    treeTimer = setInterval(() => { if (!$("s-tree").hidden) refreshTree(); }, 15000);
  }

  // ---------- wire up ----------
  function restart() {
    clearInterval(treeTimer);
    state.chosen = null;
    resetLeafForm();
    setMeters(100, 100);
    startTimer();
    show("choose");
  }

  // Location link: the share link opens the named place; coordinates are the fallback.
  if (C.location) {
    const { lat, lng, mapUrl } = C.location;
    const url = mapUrl || `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    $("mapLink").href = url;
    $("mapLink2").href = url;
    $("coords").textContent = `${Math.abs(lat).toFixed(5)}° ${lat >= 0 ? "N" : "S"}, ${Math.abs(lng).toFixed(5)}° ${lng >= 0 ? "E" : "W"}`;
  }

  buildLeafForm();
  applyLang();
  $("langSel").addEventListener("change", e => { window.OasisI18n.setLang(e.target.value); applyLang(); });
  $("soundBtn").addEventListener("click", toggleSound);
  $("startBtn").addEventListener("click", restart);
  $("treeOnlyBtn").addEventListener("click", openTree);
  $("slider").addEventListener("input", e => setSlider(e.target.value));
  $("toMindBtn").addEventListener("click", toMind);
  $("restoreBtn").addEventListener("click", restore);
  $("toLeafBtn").addEventListener("click", () => show("leaf"));
  $("againBtn").addEventListener("click", () => { stopTimer(); stopSound(true); show("intro"); });

  // Demo-mode test helpers: ?seed=150 adds sample leaves, ?clear removes all.
  // Ignored when Firebase is configured, so they can't touch real data.
  const params = new URLSearchParams(location.search);
  let testMode = false;
  if (!DB.live && params.has("clear")) { DB.clearDemo(); testMode = true; }
  if (!DB.live && params.has("seed")) {
    DB.seedDemo(Math.max(1, Math.min(300, parseInt(params.get("seed"), 10) || 100)));
    testMode = true;
  }
  if (testMode) history.replaceState(null, "", location.pathname + "#tree");   // so a refresh doesn't seed again

  // Kiosk shortcut: open directly on the tree with  index.html#tree
  if (testMode || location.hash === "#tree") openTree();
})();
