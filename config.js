// =====================================================================
//  Oasis in the Desert — game settings.  Edit THIS file, not app.js.
//  Texts are { en: "...", th: "..." }. A plain string is used for both.
// =====================================================================

window.OASIS_CONFIG = {
  // ---- Firebase / Firestore -----------------------------------------
  // Leave projectId empty to run in DEMO mode (data saved only in this
  // browser). Fill both values from Firebase console → Project settings.
  firebase: {
    projectId: "oasis-int31-02",
    apiKey: "AIzaSyAe-naHXWRCceIH7FZObyRDYX1X5YPuNXc"
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
  // sound:  nature sound played when the visitor brings it back (mp3), or ""
  // soundCaption: what the sound is, shown as a caption (add e.g. "recorded at
  //         Thonburirom Park" or the library credit here)
  elements: [
    {
      id: "trees", icon: "🌳",
      name: { en: "Trees", th: "ต้นไม้" },
      before: "images/trees-before.jpg?v=1872022ab3", after: "images/trees-after.jpg?v=d8c02061a7",
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
      sound: "sounds/trees.mp3?v=59fc0340cb",
      soundCaption: { en: "Wind rustling through the leaves", th: "เสียงลมพัดผ่านใบไม้" }
    },
    {
      id: "pond", icon: "💧",
      name: { en: "Pond & water", th: "บ่อน้ำและแหล่งน้ำ" },
      before: "images/pond-before.jpg?v=c23b5f142f", after: "images/pond-after.jpg?v=1e2d59845a",
      eco: 40, peace: 35,
      chain: {
        en: [
          "The water level drops and the pond dries out.",
          "Water plants wilt and monitor lizards lose their hunting ground.",
          "Birds stop coming to drink, and the fountain goes silent."
        ],
        th: [
          "ระดับน้ำลดลงจนบ่อน้ำแห้ง",
          "พืชน้ำเหี่ยวเฉา และตัวเงินตัวทองสูญเสียแหล่งหาอาหาร",
          "นกไม่มาดื่มน้ำอีกต่อไป และน้ำพุก็เงียบลง"
        ]
      },
      mind: {
        en: "The sound and sight of water is calming. Many visitors sit by the pond and fountain to clear their minds.",
        th: "เสียงและภาพของสายน้ำช่วยให้จิตใจสงบ ผู้มาเยือนหลายท่านนั่งพักริมบ่อน้ำและน้ำพุเพื่อให้จิตใจปลอดโปร่ง"
      },
      sound: "sounds/pond.mp3",
      soundCaption: { en: "The fountain and flowing water", th: "เสียงน้ำพุและสายน้ำไหล" }
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
      sound: "sounds/squirrels.mp3",
      soundCaption: { en: "Squirrels chattering in the trees", th: "เสียงกระรอกร้องบนต้นไม้" }
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
      sound: "sounds/birds.mp3",
      soundCaption: { en: "Morning birdsong", th: "เสียงนกร้องยามเช้า" }
    },
    {
      id: "lizards", icon: "🦎",
      name: { en: "Monitor lizards", th: "ตัวเงินตัวทอง" },
      before: "images/lizards-before.jpg", after: "images/lizards-after.jpg",
      eco: 15, peace: 5,
      chain: {
        en: [
          "Monitor lizards stop eating rats, dead animals and scraps.",
          "Rats and waste build up around the pond.",
          "The park becomes less clean and less healthy."
        ],
        th: [
          "ไม่มีตัวเงินตัวทองคอยกินหนู ซากสัตว์ และเศษอาหาร",
          "หนูและขยะสะสมอยู่รอบบ่อน้ำ",
          "สวนสะอาดน้อยลงและไม่ถูกสุขลักษณะ"
        ]
      },
      mind: {
        en: "A clean, healthy park is one people feel safe and comfortable relaxing in.",
        th: "สวนที่สะอาดและสมบูรณ์คือสถานที่ที่ผู้คนรู้สึกปลอดภัยและสบายใจที่จะมาพักผ่อน"
      },
      sound: "sounds/lizards.mp3",
      soundCaption: { en: "A rustle in the grass and a splash into the pond", th: "เสียงสวบสาบในพงหญ้าและเสียงลงน้ำ" }
    },
    {
      id: "flowers", icon: "🌸",
      name: { en: "Flowers", th: "ดอกไม้" },
      before: "images/flowers-before.jpg?v=108902dd78", after: "images/flowers-after.jpg?v=ece86f41eb",
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
      sound: "sounds/flowers.mp3",
      soundCaption: { en: "Bees humming in the breeze", th: "เสียงผึ้งบินหึ่งท่ามกลางสายลม" }
    }
  ],

  // ---- Leaf moods (the narrative-board colours) ----------------------
  moods: [
    { id: "calm",      label: { en: "Calm",      th: "สงบ" },        color: "#7cc4d6" },
    { id: "hope",      label: { en: "Hope",      th: "มีความหวัง" },  color: "#a8d48a" },
    { id: "grateful",  label: { en: "Grateful",  th: "ซาบซึ้งใจ" },   color: "#f2c46d" },
    { id: "refreshed", label: { en: "Refreshed", th: "สดชื่น" },      color: "#2f7d55" }
  ]
};
