# Oasis in the Desert: exhibition game

Group INT 31-02 · Beauty of Life. Plain HTML/CSS/JS with no libraries. It runs on GitHub Pages.

**Visitor flow (about 3 minutes):**
1. Remove one part of nature.
2. See a real vs AI-generated before/after and the ecosystem chain reaction. The *Ecosystem health* meter drops.
3. See how the loss affects people's mental well-being. The *Peace of mind* meter drops.
4. Bring it back. Both meters recover.
5. Write a leaf, pick a mood colour, and rate 1–5 how much nature helps their peace of mind.
6. The leaf appears on the shared **Oasis Tree**, along with stats on what visitors removed.

## Files
| File | What it is |
|---|---|
| `config.js` | **Edit this.** Firebase keys, elements, scores, texts, image paths, sounds. Texts are `{ en: "...", th: "..." }` |
| `i18n.js` | Interface texts in English and Thai. The language dropdown at the top right switches them; English is the default and the choice is remembered |
| `index.html`, `style.css`, `app.js` | The game |
| `db.js` | Saves leaves to Firestore through its REST API, or to the browser in demo mode |
| `images/` | Put your photos here |

## 1. Photos
For each element in `config.js`, add two files to `images/`:
- `trees-before.jpg`: the real photo from Thonburirom Park
- `trees-after.jpg`: the AI-edited version of **the same photo**, with the same framing and size

The other elements follow the same pattern: `pond`, `squirrels`, `birds`, `fish`, `lizards`, `flowers`.
A missing image shows a striped placeholder with the expected filename, so you can see what's still needed.

- **Use JPG, not HEIC.** Most browsers can't show HEIC. On iPhone, set Settings → Camera → Formats → *Most Compatible*, or export the photos as JPG.
- **Keep the files small.** Resize to about 1600 px wide, under 500 KB each, so they load fast on visitors' phones.
- **Landscape (4:3) fits best.** Portrait photos still work but get cropped.
- To drop an element, delete its block in `config.js`.

## 2. Try it locally
```
cd site
python3 -m http.server 8000
```
Then open http://localhost:8000. Without Firebase settings it runs in **demo mode**, where leaves are saved only in that browser.

## 3. Firebase (shared leaves for all visitors)
1. Go to https://console.firebase.google.com and choose **Add project**.
2. Go to **Build → Firestore Database → Create database**. Choose *Production mode* and the location `asia-southeast1`.
3. Go to **Project settings → General → Your apps → Web `</>`** and register an app. Copy the `projectId` and `apiKey` into `config.js`.
4. In **Firestore → Rules**, paste the following and click **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /leaves/{id} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasOnly(['element','mood','text','name','calm','createdAt'])
        && request.resource.data.name is string && request.resource.data.name.size() <= 30
        && request.resource.data.element is string && request.resource.data.element.size() <= 30
        && request.resource.data.mood in ['calm','hope','grateful','refreshed']
        && request.resource.data.text is string
        && request.resource.data.text.size() > 0 && request.resource.data.text.size() <= 120
        && request.resource.data.calm is int
        && request.resource.data.calm >= 1 && request.resource.data.calm <= 5
        && request.resource.data.createdAt is timestamp;
      allow update, delete: if false;
    }
  }
}
```

- **The API key is meant to be public.** These rules are what protect the data: visitors can only add valid leaves, never edit or delete them.
- **Moderation:** delete inappropriate leaves in the Firestore console. They disappear from the tree within about 15 seconds.
- **Free tier (Spark):** 50k reads and 20k writes a day, far more than an exhibition needs.

## Cache busting (run before every upload)
```
cd site
python3 bust_cache.py
```
- The script adds `?v=<content hash>` to every CSS, JS, image and sound reference, in `index.html` and `config.js`. A browser then downloads a file again only when its contents have changed.
- It uses the Python standard library only, and running it twice changes nothing.
- Files that don't exist yet stay unversioned and get stamped once you add them.
- Upload the updated `index.html` and `config.js` together with the files you changed.
- `index.html` itself can't carry a version. GitHub Pages lets browsers cache it for up to **10 minutes**, so a change can take that long to show. A hard refresh (Ctrl+Shift+R, or Cmd+Shift+R on Mac) shows it immediately.

## 4. Publish on GitHub Pages
1. Create a repo, for example `oasis`, and upload the **contents** of `site/`.
2. Go to **Settings → Pages → Source: Deploy from a branch**, then select `main` and `/ (root)`.
3. Your link will be `https://<username>.github.io/oasis/`. Turn it into a QR code for the booth.

**Booth screen tip:** open `https://<username>.github.io/oasis/#tree` on a laptop or TV. It shows the live tree and refreshes every 15 seconds while visitors play on their phones.

## Sounds (optional)
Put `mp3` files in a `sounds/` folder and set `sound:` on each element in `config.js`, plus `ambientSound` for the whole park. A sound plays when an element is brought back.
