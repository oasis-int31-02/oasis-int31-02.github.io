// UI texts in English and Thai (polite, gender-neutral).
// Game content (elements, moods) is translated in config.js.

window.OasisI18n = (function () {
  const STRINGS = {
    en: {
      pageTitle: "Oasis in the Desert",
      brand: "Oasis in the Desert",
      langLabel: "Language",
      eco: "🌿 Ecosystem health",
      peace: "🧘 Peace of mind",
      eyebrow: "Thonburirom Park · Bangkok",
      heroHtml: "A little green,<br>a little peace.",
      introHtml: "This park keeps a whole ecosystem alive, and it keeps <em>us</em> calm too. What happens if one piece disappears?",
      step1: "Remove one part of nature",
      step2: "See what happens to the park, and to people",
      step3: "Bring it back and add your leaf to our Oasis Tree",
      start: "Start · about 3 minutes",
      treeOnly: "Just show me the Oasis Tree",
      chooseTitle: "Choose one thing to remove",
      chooseLead: "Tap the part of the park you think matters least.",
      impactTitle: "Without {name}…",
      tagReal: "REAL PHOTO",
      tagAi: "AI-GENERATED",
      sliderAria: "Compare before and after",
      sliderHint: "Drag the slider to compare the real park with the AI-generated \"after\".",
      toMind: "And how does this affect people? →",
      mindTitle: "It's not only the park that suffers",
      mindLead: "When nature loses a piece, we lose a piece of our calm. Nature looks after our mental well-being, and we can look after nature.",
      restore: "🌱 Bring it back",
      restoredTitle: "The oasis is whole again",
      restoredHtml: "<b>Everything is connected.</b> Trees, water, animals and people all share one calm space. Protecting nature also protects our peace of mind.",
      quote: "\"In today's fast-paced world, we need to remember to step outside and reconnect with nature.\"",
      toLeaf: "Add your leaf →",
      leafTitle: "Where is your oasis?",
      leafLabel: "A moment when nature gave you peace, or how you will step outside this week.",
      leafPh: "e.g. Morning walk by the pond",
      nameLabelHtml: "Your name or nickname <span class=\"optional\">(optional)</span>",
      namePh: "e.g. Mya",
      moodLegend: "How does nature make you feel?",
      calmLegend: "How much does nature help your peace of mind?",
      calmAria: "{n} of 5",
      submit: "Pin my leaf to the tree 🍃",
      pinning: "Pinning…",
      errText: "Please write a few words on your leaf.",
      errMood: "Please pick a colour for your leaf.",
      errCalm: "Please tap how much nature helps you (1 to 5).",
      errSave: "Could not save your leaf. Please try again.",
      treeTitle: "Our Oasis Tree",
      treeAria: "Oasis tree with visitors' leaves",
      loading: "Loading leaves…",
      readerHint: "Tap a leaf to read it.",
      anonymous: "Anonymous",
      leafCount: "{n} leaves so far.",
      leafAvg: " Visitors rate nature's help to their peace of mind {avg} / 5.",
      treeEmpty: "The tree is still bare. Be the first to add a leaf!",
      treeErr: "Could not load the tree right now.",
      statsTitle: "What visitors chose to remove",
      again: "Play again",
      demo: "Demo mode: leaves are saved in this browser only. Add Firebase settings in config.js to share them.",
      before: "Before",
      afterAi: "After (AI)",
      missing: "{label} photo missing: {src}"
    },
    th: {
      pageTitle: "โอเอซิสกลางทะเลทราย",
      brand: "โอเอซิสกลางทะเลทราย",
      langLabel: "ภาษา",
      eco: "🌿 ความสมบูรณ์ของระบบนิเวศ",
      peace: "🧘 ความสงบของจิตใจ",
      eyebrow: "สวนธนบุรีรมย์ · กรุงเทพฯ",
      heroHtml: "สีเขียวเพียงเล็กน้อย<br>ก็นำความสงบมาให้",
      introHtml: "สวนแห่งนี้หล่อเลี้ยงระบบนิเวศทั้งระบบ และยังช่วยให้<em>เรา</em>สงบใจด้วย หากสิ่งใดสิ่งหนึ่งหายไป จะเกิดอะไรขึ้น",
      step1: "เลือกนำธรรมชาติออกหนึ่งอย่าง",
      step2: "ดูว่าจะเกิดอะไรขึ้นกับสวนและกับผู้คน",
      step3: "นำกลับคืนมา แล้วร่วมติดใบไม้ของคุณบนต้นไม้โอเอซิส",
      start: "เริ่มเลย · ประมาณ 3 นาที",
      treeOnly: "ชมต้นไม้โอเอซิสเท่านั้น",
      chooseTitle: "กรุณาเลือกสิ่งที่จะนำออกหนึ่งอย่าง",
      chooseLead: "แตะส่วนของสวนที่คุณคิดว่าสำคัญน้อยที่สุด",
      impactTitle: "หากไม่มี{name}…",
      tagReal: "ภาพจริง",
      tagAi: "ภาพสร้างโดย AI",
      sliderAria: "เปรียบเทียบก่อนและหลัง",
      sliderHint: "กรุณาเลื่อนแถบเพื่อเปรียบเทียบสวนจริงกับภาพ \"หลัง\" ที่สร้างโดย AI",
      toMind: "แล้วสิ่งนี้ส่งผลต่อผู้คนอย่างไร →",
      mindTitle: "ไม่ใช่แค่สวนเท่านั้นที่ได้รับผลกระทบ",
      mindLead: "เมื่อธรรมชาติสูญเสียบางสิ่งไป เราก็สูญเสียความสงบในใจไปด้วย ธรรมชาติดูแลสุขภาพจิตของเรา และเราก็สามารถดูแลธรรมชาติได้เช่นกัน",
      restore: "🌱 นำกลับคืนมา",
      restoredTitle: "โอเอซิสกลับมาสมบูรณ์อีกครั้ง",
      restoredHtml: "<b>ทุกสิ่งเชื่อมโยงกัน</b> ต้นไม้ สายน้ำ สัตว์ และผู้คน ต่างแบ่งปันพื้นที่อันสงบแห่งนี้ร่วมกัน การปกป้องธรรมชาติจึงเป็นการปกป้องความสงบในจิตใจของเราด้วย",
      quote: "\"ในโลกที่หมุนเร็ว เราควรระลึกไว้เสมอว่าต้องออกไปข้างนอก และกลับมาเชื่อมโยงกับธรรมชาติอีกครั้ง\"",
      toLeaf: "ร่วมติดใบไม้ของคุณ →",
      leafTitle: "โอเอซิสของคุณอยู่ที่ไหน",
      leafLabel: "ช่วงเวลาที่ธรรมชาติมอบความสงบให้คุณ หรือคุณจะออกไปสัมผัสธรรมชาติอย่างไรในสัปดาห์นี้",
      leafPh: "เช่น เดินเล่นยามเช้าริมบ่อน้ำ",
      nameLabelHtml: "ชื่อหรือชื่อเล่นของคุณ <span class=\"optional\">(ไม่บังคับ)</span>",
      namePh: "เช่น ต้น",
      moodLegend: "ธรรมชาติทำให้คุณรู้สึกอย่างไร",
      calmLegend: "ธรรมชาติช่วยให้จิตใจของคุณสงบมากเพียงใด",
      calmAria: "{n} จาก 5",
      submit: "ติดใบไม้ของฉันบนต้นไม้ 🍃",
      pinning: "กำลังติดใบไม้…",
      errText: "กรุณาเขียนข้อความสั้น ๆ บนใบไม้ของคุณ",
      errMood: "กรุณาเลือกสีใบไม้ของคุณ",
      errCalm: "กรุณาเลือกระดับที่ธรรมชาติช่วยคุณได้ (1 ถึง 5)",
      errSave: "ขออภัย ไม่สามารถบันทึกใบไม้ได้ กรุณาลองใหม่อีกครั้ง",
      treeTitle: "ต้นไม้โอเอซิสของเรา",
      treeAria: "ต้นไม้โอเอซิสพร้อมใบไม้จากผู้มาเยือน",
      loading: "กำลังโหลดใบไม้…",
      readerHint: "แตะใบไม้เพื่ออ่านข้อความ",
      anonymous: "ไม่ระบุชื่อ",
      leafCount: "ขณะนี้มีใบไม้ทั้งหมด {n} ใบ",
      leafAvg: " ผู้มาเยือนให้คะแนนว่าธรรมชาติช่วยให้จิตใจสงบ {avg} จาก 5",
      treeEmpty: "ต้นไม้ยังว่างเปล่าอยู่ ขอเชิญร่วมเป็นคนแรกที่ติดใบไม้",
      treeErr: "ขออภัย ไม่สามารถโหลดต้นไม้ได้ในขณะนี้",
      statsTitle: "สิ่งที่ผู้มาเยือนเลือกนำออก",
      again: "เล่นอีกครั้ง",
      demo: "โหมดทดลอง: ใบไม้จะถูกบันทึกไว้ในเบราว์เซอร์นี้เท่านั้น กรุณาใส่ค่า Firebase ใน config.js เพื่อแบ่งปันกับทุกคน",
      before: "ก่อน",
      afterAi: "หลัง (AI)",
      missing: "ไม่พบภาพ{label}: {src}"
    }
  };

  const KEY = "oasis-lang";
  let lang = "en";                                   // default: English
  try { if (STRINGS[localStorage.getItem(KEY)]) lang = localStorage.getItem(KEY); } catch (e) { /* ignore */ }

  function t(key, vars) {
    let s = (STRINGS[lang] && STRINGS[lang][key]) ?? STRINGS.en[key] ?? key;
    if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
    return s;
  }
  // Pick the current language from a config value: {en, th} or a plain string/array.
  function L(v) {
    if (v && typeof v === "object" && !Array.isArray(v)) return v[lang] ?? v.en;
    return v;
  }
  function getLang() { return lang; }
  function setLang(l) {
    if (!STRINGS[l]) return;
    lang = l;
    try { localStorage.setItem(KEY, l); } catch (e) { /* ignore */ }
  }

  return { t, L, getLang, setLang };
})();
