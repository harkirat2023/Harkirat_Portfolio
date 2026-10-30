# Decisions

- Used the résumé files and portfolio assets already in `public/assets`; the universal résumé PDF is exposed at the required download path.
- Kept the existing verified LinkedIn, GitHub, KhataBox, SymptomScope, and IntelliMoney URLs. Other unknown project URLs render as disabled text.
- Used the PRD/DESIGN names and descriptions for Supply Chain Control Tower and ChurnSight. The older Vite page contained different older projects; those were not substituted for the five projects explicitly required by the supplied product spec.
- Project years are omitted where the source docs do not establish a year; the content model currently carries a year field for formatting and will use the documented value `Building` for ChurnSight.
- The legacy app supplied concrete stats for KhataBox and SymptomScope. For IntelliMoney and the two analytics projects, outcome chips name documented methods or outputs instead of adding unsupported numeric claims.
- Interactive physics, smooth-scroll replacement, CursorGlow, and the optional custom cursor are deferred in favour of native scrolling, keyboard access, and a static SVG skill constellation. This is a deliberate simplification from the design spec; it avoids a permanent animation loop and unverified touch behaviour.
- Google Fonts DNS is unavailable in the build environment, so Geist, Geist Mono, and Instrument Serif ship as local font packages and are loaded through `next/font/local` instead. The display and sans families preload; mono does not.
- Next.js is pinned to the patched 15.5.28 release and Sharp 0.35.5 following the October 2026 upstream security update.
- The DESIGN skill taxonomy lists 29 skills while PRD §8.1 requires 24. I kept all 20 items in its first four clusters and the four database/cache skills in Data & Infra to meet the PRD count.
