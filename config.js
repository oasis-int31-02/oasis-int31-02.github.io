// =====================================================================
//  Oasis in the Desert — game settings.  Edit THIS file, not app.js.
//  Texts are { en: "...", th: "..." }. A plain string is used for both.
// =====================================================================

window.OASIS_CONFIG = {
  // ---- Firebase / Firestore -----------------------------------------
  // Leave projectId empty to run in DEMO mode (data saved only in this
  // browser). Fill both values from Firebase console → Project settings.
  firebase: {
    projectId: "",
    apiKey: ""
  },

  // Field-work location (Thonburirom Park). lat/lng are shown as text;
  // mapUrl is the Google Maps share link that opens the named place.
  location: {
    lat: 13.650412602733983,
    lng: 100.49109033083643,
    mapUrl: "https://maps.app.goo.gl/QKwuzExMAnXcrMu4A"
  },

  // Suggested time per visitor (Ajarn's rule). The timer only turns
  // amber when time is up; it never cuts a visitor off.
  timeLimitSeconds: 180,

  // ---- Removable elements -------------------------------------------
  // before: your real photo from Thonburirom Park (JPG/PNG/WebP, not HEIC)
  // after:  your AI-edited version of the same photo
  // eco:    how much Ecosystem Health drops when removed (0-100)
  // peace:  how much Peace of Mind drops when removed (0-100)
  // chain:  the ecosystem chain reaction (shown step by step)
  // mind:   how that loss affects people's mental well-being
  // sound:  optional ambient sound file for this element (mp3/ogg), or ""
  elements: [
    {
      id: "trees", icon: "🌳",
      name: { en: "Trees", th: "ต้นไม้" },
      before: "images/trees-before.jpg", after: "images/trees-after.jpg",
      eco: 50, peace: 40,
      chain: {
        en: [
          "Shade disappears and the ground heats up.",
          "Birds and squirrels lose their homes and food.",
          "The park becomes a hot, empty space, like a desert."
        ],
        th: [
          "ร่มเงาหายไป และพื้นดินร้อนขึ้น",
          "นกและกระรอกสูญเสียบ้านและแหล่งอาหาร",
          "สวนกลายเป็นพื้นที่ร้อนและว่างเปล่า เหมือนทะเลทราย"
        ]
      },
      mind: {
        en: "Shady trees were where visitors told us they rest and slow down. Without them, the park stops feeling like an escape from the busy city.",
        th: "ผู้มาเยือนเล่าให้เราฟังว่าร่มไม้คือที่ที่พวกเขามาพักผ่อนและผ่อนคลาย หากไม่มีต้นไม้ สวนแห่งนี้ก็ไม่ใช่ที่หลบพักจากเมืองที่วุ่นวายอีกต่อไป"
      },
      sound: ""
    },
    {
      id: "pond", icon: "💧",
      name: { en: "Pond & water", th: "บ่อน้ำและแหล่งน้ำ" },
      before: "images/pond-before.jpg", after: "images/pond-after.jpg",
      eco: 40, peace: 35,
      chain: {
        en: [
          "The water level drops and the pond dries out.",
          "Fish die and monitor lizards lose their hunting ground.",
          "Birds stop coming to drink, and the fountain goes silent."
        ],
        th: [
          "ระดับน้ำลดลงจนบ่อน้ำแห้ง",
          "ปลาตาย และตัวเงินตัวทองสูญเสียแหล่งหาอาหาร",
          "นกไม่มาดื่มน้ำอีกต่อไป และน้ำพุก็เงียบลง"
        ]
      },
      mind: {
        en: "The sound and sight of water is calming. Many visitors sit by the pond and fountain to clear their minds.",
        th: "เสียงและภาพของสายน้ำช่วยให้จิตใจสงบ ผู้มาเยือนหลายท่านนั่งพักริมบ่อน้ำและน้ำพุเพื่อให้จิตใจปลอดโปร่ง"
      },
      sound: ""
    },
    {
      id: "squirrels", icon: "🐿️",
      name: { en: "Squirrels", th: "กระรอก" },
      before: "images/squirrels-before.jpg", after: "images/squirrels-after.jpg",
      eco: 20, peace: 10,
      chain: {
        en: [
          "Squirrels bury seeds and forget many of them.",
          "Those forgotten seeds stop growing into new trees.",
          "Over the years the park slowly gets fewer trees."
        ],
        th: [
          "กระรอกฝังเมล็ดพืชไว้ และลืมไปหลายเมล็ด",
          "เมล็ดที่ถูกลืมเหล่านั้นจะไม่ได้เติบโตเป็นต้นไม้ต้นใหม่อีก",
          "เมื่อเวลาผ่านไปหลายปี ต้นไม้ในสวนก็ค่อย ๆ ลดน้อยลง"
        ]
      },
      mind: {
        en: "Watching small animals play is a simple joy. It pulls our attention away from worries and into the present moment.",
        th: "การได้มองสัตว์ตัวเล็ก ๆ เล่นกันเป็นความสุขที่เรียบง่าย ช่วยดึงความสนใจออกจากความกังวล และกลับมาอยู่กับปัจจุบัน"
      },
      sound: ""
    },
    {
      id: "birds", icon: "🐦",
      name: { en: "Birds", th: "นก" },
      before: "images/birds-before.jpg", after: "images/birds-after.jpg",
      eco: 25, peace: 30,
      chain: {
        en: [
          "Birds stop spreading seeds and eating insects.",
          "Insects grow out of control and damage plants.",
          "The park goes quiet: no more morning birdsong."
        ],
        th: [
          "ไม่มีนกช่วยกระจายเมล็ดพืชและกินแมลงอีกต่อไป",
          "แมลงเพิ่มจำนวนจนควบคุมไม่ได้ และทำลายต้นไม้",
          "สวนเงียบลง ไม่มีเสียงนกร้องยามเช้าอีกแล้ว"
        ]
      },
      mind: {
        en: "Birdsong is one of the sounds people link most with feeling relaxed. A silent park feels empty.",
        th: "เสียงนกร้องเป็นหนึ่งในเสียงที่ผู้คนรู้สึกผ่อนคลายมากที่สุด สวนที่เงียบงันจึงให้ความรู้สึกว่างเปล่า"
      },
      sound: ""
    },
    {
      id: "fish", icon: "🐟",
      name: { en: "Fish", th: "ปลา" },
      before: "images/fish-before.jpg", after: "images/fish-after.jpg",
      eco: 15, peace: 10,
      chain: {
        en: [
          "Fish stop eating mosquito larvae and algae.",
          "The pond turns green and murky.",
          "More mosquitoes fly around the benches."
        ],
        th: [
          "ไม่มีปลาคอยกินลูกน้ำและตะไคร่น้ำ",
          "น้ำในบ่อกลายเป็นสีเขียวและขุ่น",
          "ยุงบินวนรอบม้านั่งมากขึ้น"
        ]
      },
      mind: {
        en: "Families feed and watch the fish together. Losing them removes a small, shared moment of calm.",
        th: "หลายครอบครัวมาให้อาหารและชมปลาด้วยกัน การสูญเสียปลาจึงทำให้ช่วงเวลาแห่งความสงบเล็ก ๆ ที่ได้แบ่งปันกันหายไป"
      },
      sound: ""
    },
    {
      id: "lizards", icon: "🦎",
      name: { en: "Monitor lizards", th: "ตัวเงินตัวทอง" },
      before: "images/lizards-before.jpg", after: "images/lizards-after.jpg",
      eco: 15, peace: 5,
      chain: {
        en: [
          "Monitor lizards stop eating rats, dead fish and scraps.",
          "Rats and waste build up around the pond.",
          "The park becomes less clean and less healthy."
        ],
        th: [
          "ไม่มีตัวเงินตัวทองคอยกินหนู ปลาตาย และเศษอาหาร",
          "หนูและขยะสะสมอยู่รอบบ่อน้ำ",
          "สวนสะอาดน้อยลงและไม่ถูกสุขลักษณะ"
        ]
      },
      mind: {
        en: "A clean, healthy park is one people feel safe and comfortable relaxing in.",
        th: "สวนที่สะอาดและสมบูรณ์คือสถานที่ที่ผู้คนรู้สึกปลอดภัยและสบายใจที่จะมาพักผ่อน"
      },
      sound: ""
    },
    {
      id: "flowers", icon: "🌸",
      name: { en: "Flowers", th: "ดอกไม้" },
      before: "images/flowers-before.jpg", after: "images/flowers-after.jpg",
      eco: 20, peace: 25,
      chain: {
        en: [
          "Bees and butterflies lose their food.",
          "Fewer plants get pollinated, so fewer new plants grow.",
          "The park loses its colour."
        ],
        th: [
          "ผึ้งและผีเสื้อสูญเสียแหล่งอาหาร",
          "พืชได้รับการผสมเกสรน้อยลง ต้นไม้ใหม่จึงเกิดขึ้นน้อยลง",
          "สวนสูญเสียสีสัน"
        ]
      },
      mind: {
        en: "Colour and natural beauty lift our mood. A grey park feels like more of the city.",
        th: "สีสันและความงามของธรรมชาติช่วยให้อารมณ์ดีขึ้น สวนที่หม่นหมองก็ไม่ต่างอะไรจากเมือง"
      },
      sound: ""
    }
  ],

  // Optional background park ambience on the first screen ("" = none).
  ambientSound: "",

  // ---- Leaf moods (the narrative-board colours) ----------------------
  moods: [
    { id: "calm",      label: { en: "Calm",      th: "สงบ" },        color: "#7cc4d6" },
    { id: "hope",      label: { en: "Hope",      th: "มีความหวัง" },  color: "#a8d48a" },
    { id: "grateful",  label: { en: "Grateful",  th: "ซาบซึ้งใจ" },   color: "#f2c46d" },
    { id: "refreshed", label: { en: "Refreshed", th: "สดชื่น" },      color: "#2f7d55" }
  ]
};
