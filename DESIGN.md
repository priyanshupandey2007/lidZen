---
name: lidZen
description: Keep your Mac alive with the lid closed
colors:
  primary: "#10b981"
  primary-glow: "rgba(16, 185, 129, 0.25)"
  neutral-bg: "#f8fafc"
  neutral-dark: "#09090b"
  surface-card-light: "#ffffff"
  surface-card-dark: "#141416"
  text-primary-light: "#0f172a"
  text-primary-dark: "#f8fafc"
  text-secondary-light: "#475569"
  text-secondary-dark: "#94a3b8"
  border-light: "rgba(0, 0, 0, 0.08)"
  border-dark: "rgba(255, 255, 255, 0.08)"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  heading:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "-0.006em"
  mono:
    fontFamily: "JetBrains Mono, Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "-0.01em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
components:
  button-primary:
    backgroundColor: "{colors.text-primary-light}"
    textColor: "{colors.surface-card-light}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.text-secondary-light}"
  card:
    backgroundColor: "{colors.surface-card-light}"
    rounded: "{rounded.xl}"
    padding: "24px"
---

## Overview

lidZen is a high-craft macOS utility web presence inspired by Apple hardware design and Shoji's calm, unboxed layout language. It presents technical system tools with clarity, restraint, and tactile feedback.

## Colors

- **Primary Accent:** Emerald green (`#10b981`), signifying active continuity and thermal efficiency.
- **Neutrals:** Crisp clean white/slate (`#f8fafc`) in light mode; deep aerospace titanium/obsidian (`#09090b` and `#141416`) in dark mode.
- **Semantic Signals:** Emerald (`#10b981`) for alive/running/safe, Sky (`#38bdf8`) for network/AirPlay, Rose (`#fb7185`) for runaway processes in diagnostics.

## Typography

- **Heading & Body:** Inter with tight tracking on headings (`-0.03em`) and comfortable reading height (`1.65`) on prose.
- **Telemetry & Terminal:** JetBrains Mono for system commands, CPU percentages, wattages, and PID counters.

## Layout

- Max container width: `72rem` (1152px) centered with responsive padding (`px-4 sm:px-6`).
- Section vertical rhythm: `clamp(4rem, 8vw, 8rem)` between major sections.
- Single-screen hero with two-column balance: strong copy on the left, authentic hardware device on the right.

## Elevation & Depth

- Ambient diffuse radial backlights (`blur-3xl`) rather than harsh box shadows.
- Micro-glass finishes (`backdrop-blur-xl` with hairline borders `border-black/5` or `border-white/10`).
- Apple-style physical hardware shadows (`0 25px 60px -15px rgba(0,0,0,0.35)`).

## Shapes

- Pill buttons (`rounded-full`) for high-level actions and status indicators.
- Continuous rounded rectangles (`rounded-2xl` and `rounded-3xl`) for cards and hardware chasses.
- Precise macOS camera notch and unibody thumb scoop details.

## Components

- **MacBook Pro Clamshell Showcase:** Authentic unibody hardware with active screen in open state, smooth 3D hinge down into closed clamshell state.
- **Mach Thread Diagnostics Inspector:** Interactive process suspension deck with live telemetry gauges and one-click thread controls.
- **Shoji-Style Pricing Card:** Unified lifetime license card with automatic regional currency display.

## Do's and Don'ts

- **Do:** Use authentic Apple unibody proportions and real macOS interface details.
- **Do:** Maintain WCAG AA high-contrast text at all viewport sizes.
- **Don't:** Add loud cartoonish illustrations, generic 3D floating icons, or template clutter.
- **Don't:** Use harsh layout shifts or un-interrupted transition delays.
