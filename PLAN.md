# PLAN — M.e.B band website

## 1. Design direction

**Vibe:** raw, gritty, punk rock zine with VHS / glitch artifacts.

**Visual reference:** `public/assets/meb-visu.png` — dark photo of the 4 band members from behind, with horizontal cyan/red/teal color-band glitch (VHS tracking-error look). The photo is used as-is (the glitch is already baked into it) and becomes the full-bleed hero background.

**Palette**
| token            | value                                    | role                                |
| ---------------- | ---------------------------------------- | ----------------------------------- |
| `--bg`           | `#0a0a0a`                                | page background                     |
| `--bg-alt`       | `#141414`                                | alternate section background        |
| `--fg`           | `#f5f1ea`                                | body text (warm off-white)          |
| `--fg-dim`       | `rgba(245, 241, 234, 0.6)`               | secondary text                      |
| `--accent-cyan`  | `#00e5ff`                                | glitch channel                      |
| `--accent-red`   | `#ff003c`                                | glitch channel                      |
| `--accent-teal`  | `#0fb5a0`                                | glitch channel                      |
| `--line`         | `rgba(245, 241, 234, 0.12)`              | hairline borders                    |

**Typography**
- Display: `Rubik Maps` (spray-paint / stenciled, already loaded)
- Body: `Inter` (already loaded)
- Mono accent: system mono stack — for dates, track numbers, metadata

**Visual motifs**
- Glitch / chromatic-aberration text on the band wordmark + section headings (triple `::before` / `::after` with `mix-blend-mode: screen`, RGB-split transform)
- Full-page scanline overlay (`position: fixed; pointer-events: none`, repeating semi-transparent horizontal stripes + slow vertical jitter)
- Hard borders, no rounded corners (punk = sharp)
- Asymmetric / off-grid layouts (offset blocks, slight rotations on accents)
- Subtle film-grain via CSS noise pattern (optional)

## 2. Information architecture

Single page, anchor-linked, smooth scroll.

| #   | id           | content                                                                                           |
| --- | ------------ | ------------------------------------------------------------------------------------------------- |
| 1   | `#hero`      | Full-viewport. `meb-visu.png` background. Big "M.e.B" wordmark (glitch). Tagline. Scroll indicator. |
| 2   | `#about`     | Short bio. Reuse existing French copy + extend with origins / influences.                         |
| 3   | `#crew`      | The 4 members (Gui · Pat · Loulou · Bert). Cards with photo / instrument / name.                   |
| 4   | `#music`     | Releases — EP / singles list with artwork, release date, streaming links.                         |
| 5   | `#shows`     | Tour dates — table-like rows: date · venue · city · ticket link.                                  |
| 6   | `#gallery`   | Photo grid — live shots, promo shots.                                                             |
| 7   | `#contact`   | Social links (Instagram, Bandcamp, Spotify, YouTube, email).                                      |

## 3. Navigation (sticky, scroll-reactive)

- Fixed top, full-width
- **Initial state** (over hero): transparent background, only the M.e.B wordmark on the left, hamburger on the right; sits over the photo
- **Scrolled state** (past hero): solid `--bg` background, `backdrop-blur`, hairline bottom border, full nav links revealed, slight height shrink, wordmark stays left
- Smooth scroll to anchor on click (CSS `scroll-behavior: smooth` + JS that offsets for sticky-nav height)
- Mobile: collapsible drawer with the same links
- Active section highlighted via `IntersectionObserver` (Svelte action)
- Implementation: Svelte 5 `$state` for `scrolled` / `activeSection`, `$effect` watching `window.scrollY` and `IntersectionObserver` entries

## 4. Glitch effect — implementation

Two pure-CSS techniques, no JS libs.

**A. Chromatic-aberration text** — applied to band wordmark and section headings:
```css
.glitch { position: relative; }
.glitch::before, .glitch::after {
  content: attr(data-text);
  position: absolute; inset: 0;
  mix-blend-mode: screen;
  pointer-events: none;
}
.glitch::before { color: var(--accent-cyan); transform: translate(-2px, 0); }
.glitch::after  { color: var(--accent-red);  transform: translate(2px, 0);  }
```
Optional `@keyframes` cycles the offset for a slow idle glitch.

**B. Scanline overlay** — site-wide:
```css
.scanlines {
  position: fixed; inset: 0; pointer-events: none; z-index: 100;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 2px,
    rgba(0,0,0,0.18) 3px,
    transparent 4px
  );
  mix-blend-mode: multiply;
}
```

## 5. Tech choices

- **Svelte 5 runes** — `$state`, `$derived`, `$effect` for scroll + active-section
- **Tailwind 4** — `@theme` block in `app.css` declares the palette + fonts + custom utilities; utility classes drive layout
- **No router** — single `App.svelte`; sections are siblings with `id` attrs
- **No extra deps** — pure Svelte + Tailwind, native `IntersectionObserver`, native CSS scroll
- **Smooth scroll** — CSS `scroll-behavior: smooth` + a tiny JS handler for nav-height offset

## 6. Target file structure

```
src/
├── App.svelte
├── app.css                          # @theme tokens, base layers, glitch & scanline utilities
├── main.js
├── lib/
│   ├── sections/
│   │   ├── Hero.svelte
│   │   ├── About.svelte
│   │   ├── Crew.svelte
│   │   ├── Music.svelte
│   │   ├── Shows.svelte
│   │   ├── Gallery.svelte
│   │   └── Contact.svelte
│   ├── components/
│   │   ├── Nav.svelte               # sticky nav w/ scroll + active-section state
│   │   ├── Scanlines.svelte         # full-page overlay
│   │   ├── SectionTitle.svelte      # glitch heading utility
│   │   ├── Photo.svelte             # crew card
│   │   ├── ReleaseCard.svelte       # EP / single card
│   │   ├── ShowRow.svelte           # tour-date row
│   │   └── SocialButton.svelte      # social link
│   └── actions/
│       └── inview.js                # IntersectionObserver action (active-section)
public/
└── assets/
    └── meb-visu.png                 # existing, used as hero bg
```

## 7. Build phases

1. **Foundation** — `app.css` theme tokens, base layout, `App.svelte` shell with sections + sticky nav skeleton
2. **Hero + Nav** — validates the core design language (image bg, glitch wordmark, scroll-reactive nav)
3. **About + Crew** — restyle existing copy into the dark aesthetic
4. **Music + Shows + Gallery + Contact** — new sections
5. **Polish** — scanline overlay, idle glitch animation, mobile drawer, active-section highlight, hover micro-interactions

## 8. Assumptions / open questions

- **Language** — current copy is French; keeping French. Want an English version too?
- **Crew photos** — `public/assets/photos/` is empty. I'll use placeholder blocks with initials / silhouettes; you can drop in real photos later
- **Real release / show data** — placeholder rows so the layout is easy to fill in
- **External links** (Spotify, Bandcamp, Instagram, YouTube, email) — `#` placeholders unless you give me URLs
- **Fonts** — keep `Rubik Maps` + `Inter` (already in `index.html`). Add a mono stack for zine accents