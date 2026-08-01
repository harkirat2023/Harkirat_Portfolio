# Emerald DuskCore — Portfolio Refresh

## Steps
- [x] Review all components & styles
- [x] Plan approved by user

## Implementation
- [x] 1. Update `src/styles.css` theme tokens → Emerald DuskCore dark palette (charcoal bg, Vite green accent, Vue cyan support)
- [x] 2. Increase container side margins (`.container` → `w-[min(1200px,90%)]`)
- [x] 3. Replace all orange accent references with emerald green across CSS
- [x] 4. Rebalance dark/light inverted sections (Intro, MobileMenu, Journey → light panel, buttons, header logo, About chips, selection)
- [x] 5. Skills: replace scrolling marquee with static wrap chip grid; add hover stagger animation
- [x] 6. Hero: character-by-character typewriter for rotating phrases
- [x] 7. Update JSX color classes in Skills, Hero, Journey, MobileMenu, Header, Intro, About, Cursor

## Dark/Light Theme Toggle
- [x] 8. Add `html.light` CSS variable overrides (light Emerald color scheme)
- [x] 9. Anti-FOUC script in `index.html` (localStorage + prefers-color-scheme)
- [x] 10. Create `ThemeToggle.jsx` (sun/moon icon button)
- [x] 11. Wire theme state into `App.jsx` (persist to localStorage, apply `.light` class, smooth transition)
- [x] 12. Add toggle to `Header.jsx` beside Download CV
- [x] 13. Convert hardcoded colors (Journey, grain, sweeps, cursor ring) to theme-aware `color-mix`/tokens

## Verification
- [x] 14. `npm run build` passes (444 modules)

