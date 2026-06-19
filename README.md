# Hope Consultancy and Training Service — Website

A modern, bilingual (Amharic / English), dark+light mode website for **Hope Consultancy and Training Service**, built with React + Vite + TypeScript + Tailwind CSS.

## What's included

- **Bilingual** — full Amharic/English toggle (`src/data/content.ts`), defaults to Amharic
- **Dark & light theme** — toggle in the navbar, respects system preference on first visit, remembers choice
- **17 services** — pulled directly from the real business listing (purchasing plans, org design, HR strategy, entrepreneurship training, family counseling, etc.) plus civil-service placement support
- **Document Center** — the 4 forms from the Telegram channel:
  - Job Position Detail Form (`position-detail-form.docx`)
  - Staff Placement Competition Application (`competition-application-form.docx`)
  - Grievance Form (`grievance-form.docx`)
  - Evaluation Workbook (`evaluation-workbook.xlsx`)
  
  Each can be **previewed**, **filled in directly on the page**, and **downloaded as a generated PDF** (with correct Amharic text — a Noto Sans Ethiopic font is embedded for this) or as the **original file**.
- **Process timeline** — the 11-step placement process, alternating left/right on desktop, stacked on mobile
- **Real contact info** — phone numbers, email, license badge, and links to your Website / YouTube / Telegram / Facebook
- **Contact form** — client-side only for now (see "Connecting the contact form" below)

## Running it locally

```bash
npm install
npm run dev
```

Open the printed `localhost` URL. Hot-reloads on save.

## Building for production

```bash
npm run build
```

Output goes to `dist/`. This is a static site — no backend required.

## Deploying

Since your current site is on Vercel, the easiest path:

1. Push this folder to a GitHub repo
2. Import it in Vercel (Framework Preset: **Vite**)
3. Deploy — it'll detect `npm run build` and `dist/` automatically

Or drag-and-drop the `dist/` folder into Vercel/Netlify after running `npm run build`.

## Editing content

- **All text (AM + EN):** `src/data/content.ts` — one object per language, same keys
- **The 4 forms, their fields, and the process timeline steps:** `src/data/documents.ts`
- **Phone/email/socials:** `src/data/content.ts`, bottom of the file (`socials` and `contactInfo`)
- **Colors/fonts:** `tailwind.config.js`

## Connecting the contact form

Right now the "Send us a message" form just shows a success message locally — it doesn't actually send anywhere yet. To make it functional, the simplest options are:
- A form backend like **Formspree** or **Web3Forms** (no server needed, just swap the `handleSubmit` in `src/components/Contact.tsx` for a `fetch()` call to their endpoint)
- Or wire it to a Telegram bot so submissions land in your Telegram channel/chat directly

Happy to wire either of these up if you'd like.

## Notes

- The original DOCX/XLSX files live in `public/documents/` — replace them there if the forms ever get updated, keeping the same filenames (or update the filenames in `src/data/documents.ts`).
- The "fill online" PDF export is a clean re-typed version of each form (not a pixel copy of the original Word doc) — good for quick digital submission, but the original DOCX/XLSX is always offered as a download too for anyone who needs the exact original layout.
