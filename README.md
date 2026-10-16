# SOMANÚ — website

Five pages (Home — which includes About —, How I can support you, Brands in space, Projects in motion, Contact), built with [Eleventy](https://www.11ty.dev/), hosted for free on GitHub Pages, and editable without code through [Pages CMS](https://pagescms.org).

---

## 1. Put the site on GitHub (once, ~10 minutes)

1. Create a GitHub account if you don't have one, then create a **new repository** (e.g. `somanu-site`). Public is fine and keeps hosting free.
2. Upload the contents of this folder to it. Either drag and drop all files on the repository page ("Add file → Upload files"), or from a terminal:
   ```bash
   git init && git add . && git commit -m "SOMANÚ website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/somanu-site.git
   git push -u origin main
   ```
   Make sure the hidden `.github` folder and the `.pages.yml` file are uploaded too. Drag and drop on macOS may skip files starting with a dot; if so, use the terminal commands, or press Cmd+Shift+. in Finder to show them.
3. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Go to the **Actions** tab. The "Publish site" workflow runs on every change (if it doesn't start, click it and press "Run workflow"). After 1–2 minutes the site is live at `https://YOUR-USERNAME.github.io/somanu-site/`.

## 2. Connect her domain (once)

1. In **Settings → Pages → Custom domain**, enter the domain (e.g. `somanu.com`) and save.
2. At the domain registrar, in the DNS settings, add:
   - four **A** records for the root domain (`@`):
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - optionally four **AAAA** records for `@`:
     `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - a **CNAME** record for `www` pointing to `YOUR-USERNAME.github.io`
   - remove any older A/CNAME records left over from Framer or the registrar's parking page.
3. DNS can take from a few minutes to a day. When GitHub shows the domain as verified, tick **Enforce HTTPS**.
4. Re-run the "Publish site" workflow once (Actions tab → Publish site → Run workflow) so links drop the `/somanu-site/` part.
5. Optional: in Pages CMS (below), set **Contact details & footer → Website address** to `https://the-domain.com` to enable link previews when the site is shared.

GitHub's own guide: Settings → Pages → "Learn more about configuring custom domains".

## 3. Set up editing for Manon (once)

1. Go to [app.pagescms.org](https://app.pagescms.org) and sign in with **your** GitHub account.
2. Install the Pages CMS GitHub App when asked, and give it access to the `somanu-site` repository only.
3. Open the repository in Pages CMS. The menu on the left (Home, How I can support you, …) comes from `.pages.yml`.
4. Invite Manon as a **collaborator by email** from the repository's collaborator settings in Pages CMS. She receives an email, logs in with it, and never needs a GitHub account.

## 4. How Manon edits the site

- Open [app.pagescms.org](https://app.pagescms.org), log in with the email link, choose the site.
- Pick a page in the left menu, change the text or photos, then press **Save**.
- The site updates by itself about **2 minutes** later. Refresh the page (on a phone, close and reopen the tab) to see it.
- **Line breaks**: in longer text boxes, an empty line starts a new paragraph.
- **Lists** (Before/Now/Next, services, ways of working): items can be added, removed and dragged into a new order.
- **Photos**: upload JPG, PNG or WebP straight from a phone; the site resizes them. Always fill in the "Photo description" (a short sentence for visitors who can't see the image).
- **Home** fields are numbered in the order they appear on the page (1 · Hero, 2 · What I do, 3 · How I work, 4 · About…).
- **Brands that trusted me**: remove every brand to hide that section.
- **Availability** ("Available from November 2026") lives in **Contact details & footer**.
- Everything is versioned: if something goes wrong, any earlier version can be restored from GitHub's history.

What she can't change from the CMS, on purpose: layout, colours, fonts and page structure.

---

## For developers

```bash
npm install
npm start          # local preview at http://localhost:8080
npm run build      # outputs to _site/
```

- **Content**: `src/_data/*.yml` (one file per page + `site.yml` for contact details). Templates in `src/*.njk`, shared parts in `src/_includes/`.
- **Images**: originals in `src/assets/images/`. At build time every `<img>` is resized to WebP + JPEG at several widths (`@11ty/eleventy-img`). Logos use `eleventy:ignore` to keep their transparency.
- **Sub-path hosting**: the workflow passes the Pages base path as `ELEVENTY_PATH_PREFIX`, so the site works on `username.github.io/repo/` and on the custom domain.
- **Logo**: `src/assets/brand/` is rendered from the vector artwork in the SOMANÚ deck. The background around "SOMA" was made transparent; the "nú" square is unchanged.
- **Font rules** (see top of `site.css`), self-hosted, no Google requests:
  - Titles (H1, H2): **Poppins Bold** (SIL Open Font License).
  - Everything else, i.e. body, subtitles, quotes (in italic), labels, navigation and micro-copy: **Raleway** (SIL Open Font License). No all-caps labels.
  - The logo is an image and is never retyped with these fonts.
- **Text styles and layout patterns**: documented at the top of `src/assets/css/site.css`. Text styles are set on the HTML elements (h1, h2, h3, p) plus `.lead`, `.quote`, `.small`. Every section uses one of five patterns (A intro, B split, C content, D statement, E gallery); A and B are Nunjucks macros in `src/_includes/macros.njk`. Links and buttons are at least 44px tall, text lines max 65 characters.
- Colours: ivory `#F7F2EE`, blush `#E5D5CF`, navy `#09192B` (from the logo).
