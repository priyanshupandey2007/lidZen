# Production Polish & Hardening Plan

**Project:** lidZen (macOS Clamshell Continuity & Diagnostic Utility)  
**Date:** November 18, 2026  
**Branch:** `polish/production-pass`  
**Site Kind:** `software` (Apple macOS power utility)

---

## 1. Audit Findings (Ranked by Severity)

### [P0] Critical / Hard Failures
1. **Camera Notch Text Occlusion** (`impeccable detect`):
   - In the MacBook Pro menu bar, the centered camera notch (`w-24`) partially occludes "Window" and "Lid Open · Tasks Running".
   - *Fix:* Structure the macOS top menu bar into distinct left (menus) and right (status/clock) clusters with guaranteed minimum 100px center notch clearance.
2. **Low-Contrast Failures** (`impeccable detect` & WCAG AA):
   - Green text `#059669` on `#e1f4f0` is 3.3:1 (fails WCAG AA 4.5:1).
   - Slate-500 `#64748b` on pale backgrounds `#f1f5f9` is 4.3:1 (fails 4.5:1).
   - *Fix:* Elevate emerald text to `#047857` / `#065f46` (5.2:1+) and slate to `#334155` / `#1e293b` (7:1+) in light mode.

### [P1] Major Accessibility & Design System Flaws
3. **Micro / Undersized UI Text (< 11px)** (`impeccable detect`):
   - 8px, 9px, and 10px text scattered across the terminal, language selector, telemetry pills, and footer.
   - *Fix:* Normalize all functional UI text to an 11px floor for metadata/telemetry badges, 12px for secondary captions, and 14–16px for body copy.
4. **Copy Slop & Banned AI Patterns** (`copy-lint.mjs` & Impeccable):
   - Overused filler word "seamlessly" flagged.
   - 8 em-dashes across marketing copy (exceeds budget of 2).
   - Repetitive uppercase kickers ("CLAMSHELL MODE", "PRICING", "FAQ") above `h2` headings.
   - *Fix:* Remove repetitive kickers, replace "seamlessly" with technical facts ("in user space with zero kexts"), and replace excessive em-dashes with natural punctuation.
5. **Animation & Transition Quality** (Emil Kowalski `emil-design-eng`, `animate`):
   - Widespread `transition: all` in CSS/Tailwind (causes unwanted layout property transitions).
   - No `prefers-reduced-motion` media queries for the automated 3D lid animation, pulsing rings, or equalizer bars.
   - Missing physical press feedback (`:active { transform: scale(0.97); }`) on buttons.
   - *Fix:* Replace `transition-all` with explicit `transition: transform, opacity`. Wrap automated motion in `motion-reduce:transition-none` / `useReducedMotion`. Add tactile press feedback.

### [P2] Responsive & UX Edge Cases (Emil `break-ui` & `mobile-native`)
6. **Mobile Touch Targets & Viewport Safe Areas**:
   - Language selector and icon buttons on mobile viewports (< 390px) need 44×44px minimum tap target boxes.
   - Mobile inputs must have 16px minimum font size to prevent iOS Safari auto-zoom.
   - Missing viewport safe-area insets for notched iPhones.
7. **Nested Cards Depth Clutter**:
   - Multiple layers of cards-in-cards in Features and Diagnostics sections.
   - *Fix:* Flatten visual hierarchy into clean single-plane panels with border dividers and spacious rhythm.

### [P3] Production Hardening & SEO
8. **SEO & Metadata**:
   - Add OpenGraph / Twitter preview card meta tags.
   - Generate `public/robots.txt` and `public/sitemap.xml`.
   - Add structured JSON-LD data for software application schema (`SoftwareApplication`).
   - Clean up `404.tsx` gradient text into crisp solid typography.
9. **Security Headers & Config**:
   - Add standard security headers in `next.config.js` (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
   - Add `.env.example`.

---

## 2. Execution Phases

### Phase 3: Improve Visual System, Copy & Motion
- **Pass 1:** Resolve typography scale, fix micro-text (<11px), eliminate text occlusion around notch.
- **Pass 2:** WCAG AA contrast adjustments (emerald `#047857`, slate `#334155`). Remove formulaic kickers and copy slop.
- **Pass 3:** Emil Kowalski motion pass: Replace `transition-all`, add `:active` scale(0.97), enforce `prefers-reduced-motion` compliance.

### Phase 4: Production Hardening
- **SEO & Social:** Add Open Graph, Twitter cards, JSON-LD schema, `robots.txt`, `sitemap.xml`.
- **Security & Headers:** Configure `next.config.js` HTTP security headers. Add `.env.example`.
- **404 Page:** Remove decorative text gradients, align with DESIGN.md.
- **Mobile Native:** Add safe-area insets, ensure 44px tap targets, prevent iOS form zoom.

### Phase 5: Verification Gate
- Run `npm run build` with zero errors.
- Run `impeccable detect` on source and live URL.
- Run `copy-lint.mjs`.
- Verify responsive layout at 1440, 1024, 768, and 390px.
