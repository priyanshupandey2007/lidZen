# Design & Engineering Decisions

**Project:** lidZen  
**Priority Hierarchy:** Brand & Content > Accessibility & Performance > Taste Skill Art Direction > Impeccable Rules > Emil Motion Rules

---

## Decision 1: Camera Notch Clearance vs Realism
- **Context:** `impeccable detect` flagged text occlusion where the MacBook Pro camera notch (`w-24`) sat near the top menu items ("Window" and "Lid Open · Tasks Running").
- **Resolution:** Reorganized the macOS menu bar into two flex containers flanked with `gap-8` and centered notch buffer (`max-w-[calc(50%-55px)]`), preserving the authentic Apple camera notch while ensuring 100% text clearance.

## Decision 2: Typography Scale & Terminal Contexts
- **Context:** Impeccable flagged `<11px` micro-text. Taste Skill and Apple Design require code/terminal and hardware badges to look authentic to macOS.
- **Resolution:** Maintained an 11px floor for all UI metadata, buttons, labels, and badges. Inside the simulated terminal window, code text is set to 11px/12px so it remains legible while retaining high-DPI terminal fidelity.

## Decision 4: Authentic Clamshell Architecture vs Bezels
- **Context:** Previously, the closed state showed a gray box inside an open screen bezel, appearing distorted and artificial.
- **Resolution:** Modeled the closed state as an authentic unibody aluminum casing with rounded corners, centered laser-etched lidZen emblem, MagSafe 3 power LED, and front display scoop. When closed, it is genuinely the exterior unibody lid of a MacBook Pro; when open, it is the upright Retina display. Framer Motion 3D hinge physics connects both seamlessly.

## Decision 5: Eliminating Kicker Slop
- **Context:** `impeccable detect` flagged uppercase kickers (`CLAMSHELL MODE`, `FAQ`, `PRICING`, `FEATURES`) above `h2` headings as redundant formulaic slop.
- **Resolution:** Removed redundant uppercase kickers across all primary sections, allowing bold, crafted Apple-style headings ("Close the lid. Your Mac keeps working.", "Pay once. Keep it.") to lead the section hierarchy cleanly without visual noise.
