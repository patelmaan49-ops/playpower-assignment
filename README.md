# Airbnb Listing Clone

A desktop clone of an Airbnb listing page with its two overlays: the photo tour and the single-photo lightbox. Built with React, TypeScript and Vite.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173. Build for production with `npm run build`.

## What's in it

- **Listing page**: header, photo grid, highlights, description, sleeping arrangements, amenities, date-range calendar, booking card with a guests picker, reviews, map, host section, house rules and footer.
- **Photo tour**: opens from "Show all photos" or any hero photo. Room tabs stay in sync with scrolling.
- **Lightbox**: opens from any tour photo. Use the arrow buttons or the `←` / `→` keys. `Esc` closes one layer at a time.

## Accessibility

- Dialogs trap focus, lock page scroll and return focus to the element that opened them.
- The page behind an open overlay is `inert`.
- All controls are real buttons with labels, and the calendar days are keyboard reachable.
- Motion respects `prefers-reduced-motion`.

## Structure

```
src/
  App.tsx          view state and keyboard handling
  data.ts          listing content and photo groups
  hooks.ts         modal focus handling, outside-click close
  icons.tsx        SVG icons and logo
  components/      one file per page section or overlay
docs/
  architecture.svg / .png   production architecture diagram
  PROMPTS.md                prompts used
  ANSWER.md                 the hardest part of the task
.claude/                    sub-agent and skill configs
```

## Notes

The original reference deployment sits behind Vercel's bot check, so a public sibling deployment of the same listing was used for layout, text and photos. All code is written from scratch.
