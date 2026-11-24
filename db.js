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

  return { live, addLeaf, listLeaves };
})();
