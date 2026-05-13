# Photos you still need to upload

I built CS3, CS4, and CS5 with placeholder slots where photos belong. The placeholders are clearly marked on the live site so you can see what's missing at a glance. When you upload them, save each file at the path I've listed (or rename the file you've got).

## Naming convention
Save originals at the highest resolution you have. JPEGs are fine. Roughly **2000–2400px wide** is ideal for the hero and feature spots; **1200–1600px wide** is fine for inline supporting photos.

---

## Case Study 3 — Vulcan Stow (`vulcan-stow.html`)

| Where it goes | Save to | Description |
|---|---|---|
| Hero cover (top of page) | `assets/images/v2/cs3/cover.jpg` | Wide shot of the Vulcan Stow workcell — the bot arm + induct conveyor + operator if possible. Landscape, 16:9 ideal. |
| "Robots meet operators" gallery, left tile | `assets/images/v2/cs3/workcell.jpg` | Close-up of the Vulcan workcell (robot arm, induct chute). |
| "Robots meet operators" gallery, right tile | `assets/images/v2/cs3/associate.jpg` | An associate working alongside Vulcan — scanning, sidelining, recovering. |
| "Connecting outcomes to UI elements" section | `assets/images/v2/cs3/cxos-in-design.jpg` | The two-step "Scan item → Place successfully scanned item" mockup from your original deck. Re-export from Figma if possible — the slide screenshot version reads soft on the web. |
| Research clip (CXOs in research) | `assets/video/scan-confusion.mp4` | The video clip of an operator scratching their head, where the scan-item CXO isn't being met. |
| Before / after improvement | `assets/images/v2/cs3/before-after.jpg` | Side-by-side: original scan-item UI vs. the improved version. |

## Case Study 4 — Problem Solve Handling (`ps-handling.html`)

| Where it goes | Save to | Description |
|---|---|---|
| Hero cover | `assets/images/v2/cs4/cover.jpg` | Wide FC floor shot. The ToteASRS storage floor or an active workstation works. Darker / dramatic is fine — the page overlays it. |
| Pick-Pack column | `assets/images/v2/cs4/pick-pack.jpg` | Photo of the new Pick-Pack station prototype. |
| Grocery column | `assets/images/v2/cs4/grocery.jpg` | Photo of the grocery workstation prototype. |
| Tote congestion gallery, left | `assets/images/v2/cs4/congestion-1.jpg` | Top-down or wide angle of PS totes piling up around a PEW station. |
| Tote congestion gallery, right | `assets/images/v2/cs4/congestion-2.jpg` | Operator with sidelined items piling up. |
| Recommended improvements mockup, left | `assets/images/v2/cs4/scan-feedback-mockup.jpg` | Before/after of the scan feedback — current toast vs. full-screen acknowledgment. |
| Recommended improvements mockup, right | `assets/images/v2/cs4/unknown-item-mockup.jpg` | The 4-step unknown-item guided workflow. |

## Case Study 5 — Ops Tools (`ops-tools.html`)

| Where it goes | Save to | Description |
|---|---|---|
| Hero cover | `assets/images/v2/cs5/cover.jpg` | A PA, QB, or AFM at their dashboard — or a wider shot showing the multi-monitor reality of ops work. |

---

## When you've uploaded

Once a file lands at the correct path, the placeholder in the HTML doesn't automatically pick it up. Open the relevant page and replace the `<div class="placeholder">…</div>` block with a normal `<img>` tag, like the ones already in CS1/CS2. The CSS handles the rest.

Or just tell me which photos you've added and I'll wire them in for you.

---

## Things I had to call out (per your request)

> "if the images aren't good enough quality to upload, tell me so that i can upload a higher resolution version."

Here's what I found in the existing portfolio PDF:

| Image | What I have | Verdict |
|---|---|---|
| Selfie (about page) | 2722 × 1074 native | **Good** — usable as a portrait crop. |
| ToteASRS workstation overhead | 2335 × 3015 | **Excellent** — already on the site as the CS1 cover. |
| Inside-the-tote photo | 3086 × 3990 | **Excellent** — sharp enough to crop further. |
| Proteus fleet | 3097 × 3999 | **Excellent** — currently the CS2 cover. |
| Cart photo (CS2 secondary) | 1882 × 1455 | **Good**. |
| Workstation post-launch (CS1) | 2139 × 1030 | **Good**. |
| UI mockups (CS1 design) | 650 × 1160 | **Workable, not great.** They're small and slightly soft — readable on the website at the size I've used them, but if you have higher-res Figma exports, drop them in at `assets/images/v2/cs1/ui-*.jpg` and they'll look sharper. |
| Sticky-note research board | 1469 × 1494 | **Good** — but if you have a clean photo of the synthesis wall (not the actual stickies) that'd elevate it. |
| Touchpoint diagram (CS3) | From your most recent upload | **Good** — the rotated landscape version reads fine. If you re-export this from Figma as a clean PNG, drop it in at `assets/images/v2/cs3/touchpoints.png` and it'll replace what I have. |
| All CS3, CS4, CS5 photos | I have nothing for these | **Need upload** — see the tables above. |

The biggest gap is CS3–5: I currently have **zero real photos** for any of them. Everything in those pages is a placeholder, native diagram, or text. Upload at your convenience and the pages get dramatically stronger.
