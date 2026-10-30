# Implementation decisions

- The user asked for the supplied Dribbble artwork to be the primary visual direction. The actual shot is a light, grayscale collage of overlapping website panels with bold black type and thin orange hand-drawn lines. The site uses an original paper-panel composition and an orange accent, without reusing the shot's identity, wording, or photography.
- The companion design document defines Obsidian Signal as dark-first. To resolve that conflict with the user's explicit light-reference direction, Paper is the default and the user can switch to a dark charcoal theme. The theme tokens, spacing, typography, reduced-motion contract, and accessibility rules remain centralized in `app/globals.css`.
- Copy is organized in `content/site.ts`. The two supplied résumés are the source for biographical details and project claims. The internship is dated Aug 1–30, 2026 and described in the past tense. ChurnSight is marked in progress. Unknown project years and certification dates are omitted.
- “05 projects” replaces the unsupported “05 products” claim. The 180K+ order, 23-region, delivery, SLA, perfect-order, team, membership, and education figures are retained only where a résumé states them.
- The résumés do not record project trade-offs or implementation rationale at the detail requested in the companion case-study template. Case pages therefore show résumé-supported overviews, grouped technologies, and reported outputs instead of presenting invented decisions as historical facts.
- Availability and response-time claims do not appear in the résumés, so the site uses a contact invitation without claiming current job availability or a reply deadline.
- The repository already contained LinkedIn, GitHub, and three project URLs. The GitHub profile, three repositories, and three live project URLs were opened successfully; LinkedIn redirects to its sign-in wall. Other missing project URLs are omitted.
- The supplied PDFs are published as two separate downloads on `/resume`, preserving both versions rather than silently choosing one as the sole résumé.
- Native scrolling is retained. Section and card reveals use opacity and small transforms, and the small system glyphs use an optional motion path; reduced-motion styles remove nonessential motion and the content remains server-rendered and readable.
- Geist Sans and Geist Mono load locally, avoiding runtime font requests and matching the reference's compact, bold typography. The unused Instrument Serif dependency was removed so only the two families used by the site ship.
- `sitemap.xml` and `robots.txt` use the Vercel-provided deployment host when available. No unconfirmed public domain is hard-coded.
- `vercel.json` declares Next.js and `.next` as the output directory to override the earlier `dist` output-directory mismatch in the supplied deployment log.

- Final checks: 
pm run typecheck and 
pm run lint pass. 
pm run build compiles and reaches route generation locally, but Next.js then fails during .next filesystem writes on this Windows workspace (UNKNOWN/write errors). The prior Vercel Linux log completed route generation and failed at the dist output-directory check; a fresh Vercel deployment is still needed to confirm the .next override.
