# Suzie Duquette — Portfolio Site

A clean, editorial portfolio site built as static HTML/CSS/JS. No build step, no framework, no dependencies — just deploy.

---

## File structure

```
portfolio_site/
├── index.html              ← Landing page (hero + 2 case study previews)
├── tote-asrs.html          ← Case Study 1 detail page
├── proteus.html            ← Case Study 2 detail page
├── resume.pdf              ← Placeholder — replace with your actual résumé
├── CNAME                   ← Replace contents with your custom domain
├── .nojekyll               ← Tells GitHub Pages to skip Jekyll processing
└── assets/
    ├── css/styles.css      ← Single stylesheet, all design tokens at top
    ├── js/main.js          ← Sticky-nav border + reveal-on-scroll animations
    └── images/             ← All photos and diagrams (extracted from portfolio PDF)
```

---

## Before you deploy

A short editing pass:

1. **Replace `resume.pdf`** with your actual résumé PDF (keep the filename or update the link in all three HTML files: `href="resume.pdf"`).
2. **Update LinkedIn URL.** Search each HTML file for `linkedin.com/in/susanneduquette` and replace with your actual LinkedIn handle.
3. **Update CNAME.** Open `CNAME`, replace `yourdomain.com` with the domain you've purchased (e.g. `suzieduquette.com`).
4. **Optional copy edits.** Any text in the HTML is editable directly — open the file, find the line, edit, save. No build step.
5. **Optional image swaps.** All images live in `assets/images/`. Drop in replacements with the same filenames and they'll just work.

---

## Deployment options

You said you're leaning toward GitHub Pages with a custom domain — that works, and instructions are below. I'd also flag **Cloudflare Pages** as a stronger choice for a portfolio that hiring managers will load on phones, hotel Wi-Fi, etc. Both are free.

### Recommended: Cloudflare Pages

**Why:** Faster global CDN than GitHub Pages (Cloudflare's network is one of the largest), automatic HTTPS with no DNS gymnastics, instant rollbacks, and built-in analytics. Hiring managers in different geos will load your site faster.

**How:**
1. Push this folder to a GitHub repo.
2. Sign in at [pages.cloudflare.com](https://pages.cloudflare.com).
3. Create application → Pages → Connect to Git → pick your repo.
4. Build settings: leave both Build command and Build output directory empty. Framework preset: `None`.
5. Save & Deploy. You'll get a `*.pages.dev` URL immediately.
6. Custom domain: Pages dashboard → Custom domains → Set up a custom domain. Cloudflare auto-handles DNS and HTTPS.

### Alternative: GitHub Pages

**Why:** Simplest if you're already in GitHub. No third-party signup.

**How:**
1. Create a new repo on GitHub. If you name it `<your-github-username>.github.io`, it deploys to that subdomain automatically. Otherwise it goes under `<username>.github.io/<repo-name>/`.
2. Push the contents of this folder (not the folder itself — just what's inside) to the repo's `main` branch.
3. Repo Settings → Pages → Source: Deploy from a branch, Branch: `main`, Folder: `/ (root)`. Save.
4. Wait ~1 minute, then refresh — your site is live at the URL shown.
5. Custom domain:
   - In your domain registrar's DNS settings, add a `CNAME` record pointing your subdomain (e.g. `www`) to `<username>.github.io`.
   - For the apex domain (no `www`), add four `A` records pointing to GitHub's IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - In repo Settings → Pages → Custom domain, enter your domain. Tick "Enforce HTTPS" once the certificate provisions (~10 min).

The `CNAME` file in this folder is what GitHub Pages reads — make sure it contains your final domain.

### Alternative: Vercel or Netlify

Both are excellent — similar developer experience to Cloudflare Pages, both free for static sites. **Vercel** has the nicest preview-deploy workflow if you'll be iterating on copy. **Netlify** has a generous form-handling tier if you ever add a contact form.

### Why not Framer/Squarespace/Webflow?

For your level of design fluency, hand-rolled HTML/CSS reads stronger than a templated builder. It also stays free, loads faster, and gives you total control. Stick with this approach.

---

## Domain naming tips

A few things worth knowing if you're still buying:

- **Use your name if available** (e.g. `suzieduquette.com`, `susanneduquette.design`, `suzie.studio`). It's the easiest thing to share verbally and looks elevated.
- **Skip new TLDs that read as marketing.** `.com`, `.design`, `.studio`, `.co` are all safe. `.tech` and `.xyz` read cheaper.
- **Namecheap and Porkbun** are reasonable registrars. **Cloudflare Registrar** is at-cost (no markup) if you're already using Cloudflare Pages — worth the small migration effort.

---

## Adding case studies 3, 4, 5 later

When you're ready to publish the other case studies:

1. Duplicate `tote-asrs.html` and rename (e.g. `vulcan-stow.html`).
2. Update the title, eyebrow, copy, images, and impact numbers in the new file.
3. Drop new images into `assets/images/cs3/`, `cs4/`, `cs5/`.
4. Open `index.html` and add a new `<a class="case-card">…</a>` block inside `.work-list`. Copy one of the existing ones and update.
5. Update the "Next case study" link at the bottom of each detail page so the navigation chains correctly.

The CSS is already built for an arbitrary number of case-study cards — they alternate left/right automatically via `:nth-child(even)`.

---

## Editing the design

Every design token lives at the top of `assets/css/styles.css` under `:root`. To shift the entire look:

- `--paper`, `--ink`, `--accent` → color palette
- `--font-display`, `--font-sans` → typefaces
- `--s-1` through `--s-9` → spacing rhythm
- `--max`, `--max-text` → content widths

No need to hunt through the file — change a token and the whole site updates.

---

## Local preview

To preview locally before pushing:

```sh
cd portfolio_site
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or just double-click `index.html` to open it directly (most things will work; the fonts won't load without an internet connection).
