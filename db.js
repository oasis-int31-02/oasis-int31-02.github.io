// Storage layer: Firestore REST API (no SDK) or browser-only demo mode.
// Collection "leaves": { element, mood, text, name, calm, createdAt }

window.OasisDB = (function () {
  const cfg = window.OASIS_CONFIG.firebase;
  const live = Boolean(cfg.projectId && cfg.apiKey);
  const BASE = live
    ? `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(cfg.projectId)}/databases/(default)/documents`
    : "";
  const DEMO_KEY = "oasis-demo-leaves";

  function demoRead() {
    try { return JSON.parse(localStorage.getItem(DEMO_KEY)) || []; }
    catch (e) { return []; }
  }
  function demoWrite(list) {
    try { localStorage.setItem(DEMO_KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
  }

  async function addLeaf(leaf) {
    const createdAt = new Date().toISOString();
    if (!live) {
      const list = demoRead();
      list.unshift({ ...leaf, createdAt });
      demoWrite(list.slice(0, 300));
      return;
    }
    const res = await fetch(`${BASE}/leaves?key=${encodeURIComponent(cfg.apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: {
        element:   { stringValue: leaf.element },
        mood:      { stringValue: leaf.mood },
        text:      { stringValue: leaf.text },
        name:      { stringValue: leaf.name },
        calm:      { integerValue: String(leaf.calm) },
        createdAt: { timestampValue: createdAt }
      }})
    });
    if (!res.ok) throw new Error(`Save failed (${res.status}): ${await res.text()}`);
  }

  async function listLeaves(limit = 300) {
    if (!live) return demoRead().slice(0, limit);
    const res = await fetch(`${BASE}:runQuery?key=${encodeURIComponent(cfg.apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ structuredQuery: {
        from: [{ collectionId: "leaves" }],
        orderBy: [{ field: { fieldPath: "createdAt" }, direction: "DESCENDING" }],
        limit
      }})
    });
    if (!res.ok) throw new Error(`Load failed (${res.status}): ${await res.text()}`);
    const rows = await res.json();
    return rows.filter(r => r.document).map(r => {
      const f = r.document.fields || {};
      return {
        element: f.element?.stringValue || "",
        mood: f.mood?.stringValue || "",
        text: f.text?.stringValue || "",
        name: f.name?.stringValue || "",
        calm: Number(f.calm?.integerValue || 0),
        createdAt: f.createdAt?.timestampValue || ""
      };
    });
  }

  // ---- Demo-mode testing helpers (never touch Firestore) ----
  // Open index.html?seed=150 to add 150 sample leaves, ?clear to remove all.
  const SAMPLE = {
    text: [
      "Morning walk by the pond", "Five quiet minutes on a bench", "Watching birds with my family",
      "Fresh air after a stressful week", "Reading under a big tree", "Jogging at sunset",
      "Listening to the fountain", "Feeding the squirrels", "Picnic with friends on the grass",
      "เดินเล่นยามเช้าริมบ่อน้ำ", "นั่งพักใต้ต้นไม้ใหญ่", "ฟังเสียงนกร้องตอนเช้า",
      "วิ่งออกกำลังกายตอนเย็น", "นั่งดูน้ำพุหลังเลิกเรียน", "ปิกนิกกับครอบครัว"
    ],
    name: ["", "", "Mya", "Ton", "Aung", "Ploy", "Htet", "Nok", "Khin", "Bank", "มายด์", "ต้น"],
    element: ["trees", "pond", "squirrels", "birds", "lizards", "flowers"],
    mood: ["calm", "hope", "grateful", "refreshed"]
  };
  const pick = a => a[Math.floor(Math.random() * a.length)];

  function seedDemo(n) {
    if (live) return 0;
    const now = Date.now();
    const fake = Array.from({ length: n }, (_, i) => ({
      element: pick(SAMPLE.element),
      mood: pick(SAMPLE.mood),
      text: pick(SAMPLE.text),
      name: pick(SAMPLE.name),
      calm: 1 + Math.floor(Math.random() * 5),
      // spread over the last few hours; unique timestamps keep leaf positions distinct
      createdAt: new Date(now - (i + 1) * 37000 - Math.floor(Math.random() * 30000)).toISOString()
    }));
    demoWrite(demoRead().concat(fake).slice(0, 300));
    return n;
  }
  function clearDemo() { if (!live) demoWrite([]); }

  return { live, addLeaf, listLeaves, seedDemo, clearDemo };
})();
