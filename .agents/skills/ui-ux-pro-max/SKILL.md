---
name: ui-ux-pro-max
description: UI/UX design intelligence for web and mobile. Covers accessibility, touch interaction, performance, typography, animation, forms, navigation, and data visualization. Use when the task involves UI structure, visual design decisions, interaction patterns, or user experience quality control. Projects include websites, landing pages, dashboards, admin panels, SaaS, portfolios, and mobile apps. Stacks include React, Next.js, Vue, Svelte, HTML/CSS/Tailwind, and shadcn/ui.
license: 'Adapted from nextlevelbuilder/ui-ux-pro-max-skill (MIT). Source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill'
---

# UI/UX Pro Max — Design Intelligence

Comprehensive UX/UI guidance for web and mobile. Covers 10 rule categories: accessibility, touch & interaction, performance, style, layout, typography & color, animation, forms & feedback, navigation, and data visualization. Applied with priority weighting — fix CRITICAL first, HIGH second, MEDIUM third.

---

## When to Apply

### Must Use
- Designing new pages (landing, dashboard, admin, SaaS, mobile app)
- Creating or refactoring UI components (buttons, modals, forms, tables, charts)
- Choosing color schemes, typography, spacing, or layout systems
- Reviewing UI code for accessibility, visual consistency, or UX quality
- Implementing navigation, animations, or responsive behavior
- Making product-level design decisions (style, hierarchy, brand)

### Recommended
- UI looks "unprofessional" but the reason is unclear
- Receiving feedback on usability or experience
- Pre-launch UI quality pass
- Aligning cross-platform design (Web / iOS / Android)
- Building design systems or reusable component libraries

### Skip
- Pure backend logic, API/database design, DevOps, infrastructure, non-visual scripts

**Decision rule**: If the task changes how something *looks, feels, moves, or is interacted with* — use this skill.

---

## How to Use

**Step 1 — Analyze requirements**
Identify: product type, target audience, style keywords, tech stack.

**Step 2 — Apply the rule categories below** in priority order (1→10). Focus on CRITICAL and HIGH first.

**Step 3 — Run the Pre-Delivery Checklist** before submitting any UI code.

| Scenario | Start From |
|---|---|
| New project / page | Step 1 → Style Selection → Layout → Typography |
| New component | Animation + Forms + Interaction rules |
| Review existing UI | Quick Reference checklist, §1–§3 first |
| Fix a UI bug | Relevant section from Quick Reference |
| Improve / optimize | §3 Performance + §5 Layout |
| Add charts / data viz | §10 Charts & Data |

---

## Rule Categories by Priority

| Priority | Category | Impact | Key Checks (Must Have) | Anti-Patterns (Avoid) |
|---|---|---|---|---|
| 1 | Accessibility | CRITICAL | Contrast 4.5:1, Alt text, Keyboard nav, Aria-labels | Removing focus rings, Icon-only buttons without labels |
| 2 | Touch & Interaction | CRITICAL | Min size 44×44px, 8px+ spacing, Loading feedback | Reliance on hover only, Instant state changes (0ms) |
| 3 | Performance | HIGH | WebP/AVIF, Lazy loading, Reserve space (CLS < 0.1) | Layout thrashing, Cumulative Layout Shift |
| 4 | Style Selection | HIGH | Match product type, Consistency, SVG icons (no emoji) | Mixing flat & skeuomorphic randomly |
| 5 | Layout & Responsive | HIGH | Mobile-first, Viewport meta, No horizontal scroll | Fixed px widths, Disable zoom |
| 6 | Typography & Color | MEDIUM | Base 16px, Line-height 1.5, Semantic color tokens | Text < 12px body, Raw hex in components |
| 7 | Animation | MEDIUM | 150–300ms, Motion conveys meaning, Spatial continuity | Decorative-only animation, No reduced-motion support |
| 8 | Forms & Feedback | MEDIUM | Visible labels, Error near field, Progressive disclosure | Placeholder-only label, Overwhelm upfront |
| 9 | Navigation Patterns | HIGH | Predictable back, Bottom nav ≤5, Deep linking | Overloaded nav, Broken back behavior |
| 10 | Charts & Data | LOW | Legends, Tooltips, Accessible colors | Relying on color alone |

---

## Quick Reference

### §1 Accessibility (CRITICAL)

- `color-contrast` — Minimum 4.5:1 for normal text; 3:1 for large text
- `focus-states` — Visible focus rings on all interactive elements (2–4px)
- `alt-text` — Descriptive alt text for meaningful images
- `aria-labels` — aria-label for icon-only buttons; accessibilityLabel in native
- `keyboard-nav` — Tab order matches visual order; full keyboard support
- `form-labels` — `<label for>` per input; never placeholder-only
- `skip-links` — "Skip to main content" for keyboard users
- `heading-hierarchy` — Sequential h1→h6, no level skipped
- `color-not-only` — Don't convey info by color alone; add icon/text
- `dynamic-type` — Support system text scaling; avoid truncation as text grows
- `reduced-motion` — Respect `prefers-reduced-motion`; reduce/disable animations
- `voiceover-sr` — Meaningful labels and logical reading order for screen readers
- `escape-routes` — Cancel/back affordance in all modals and multi-step flows

### §2 Touch & Interaction (CRITICAL)

- `touch-target-size` — Min 44×44pt (iOS) / 48×48dp (Android); extend hit area if needed
- `touch-spacing` — Minimum 8px gap between touch targets
- `hover-vs-tap` — Use click/tap for primary interactions; don't rely on hover only
- `loading-buttons` — Disable button during async; show spinner or progress
- `error-feedback` — Clear, specific error messages near the problem
- `cursor-pointer` — `cursor: pointer` on all clickable elements (Web)
- `tap-delay` — `touch-action: manipulation` to eliminate 300ms delay (Web)
- `standard-gestures` — Use platform-standard gestures; don't redefine swipe-back or pinch-zoom
- `system-gestures` — Don't block Control Center, back swipe, or gesture bar
- `press-feedback` — Visual feedback on press (ripple, opacity, scale) within 80–150ms
- `haptic-feedback` — Haptic for confirmations and important actions; avoid overuse
- `safe-area-awareness` — Keep primary touch targets away from notch, Dynamic Island, gesture bar
- `no-precision-required` — Avoid requiring pixel-perfect taps on small targets
- `drag-threshold` — Movement threshold before starting drag to avoid accidental drags

### §3 Performance (HIGH)

- `image-optimization` — WebP/AVIF, responsive `srcset`, lazy load non-critical assets
- `image-dimension` — Declare `width`/`height` or `aspect-ratio` to prevent CLS
- `font-loading` — `font-display: swap` to avoid invisible text; preload critical fonts only
- `critical-css` — Inline or early-load above-the-fold CSS
- `lazy-loading` — Dynamic import / route splitting for non-hero components
- `bundle-splitting` — Split by route/feature (React Suspense / Next.js dynamic)
- `reduce-reflows` — Batch DOM reads then writes; avoid frequent layout reads/writes
- `content-jumping` — Reserve space for async content (CLS < 0.1)
- `virtualize-lists` — Virtualize lists with 50+ items
- `main-thread-budget` — Keep per-frame work under ~16ms for 60fps
- `progressive-loading` — Skeleton screens / shimmer for operations >1s
- `input-latency` — Keep input latency under ~100ms
- `debounce-throttle` — Debounce/throttle scroll, resize, and input events
- `offline-support` — Provide offline state messaging and basic fallback

### §4 Style Selection (HIGH)

- `style-match` — Match style to product type and industry
- `consistency` — Same style across all pages; no arbitrary style switching
- `no-emoji-icons` — Use SVG icons (Heroicons, Lucide, etc.), never emojis
- `color-palette-from-product` — Choose palette from product/industry context
- `effects-match-style` — Shadows, blur, radius aligned with chosen style
- `platform-adaptive` — Respect platform idioms (iOS HIG vs Material Design)
- `state-clarity` — Hover / pressed / disabled states visually distinct
- `elevation-consistent` — Consistent elevation/shadow scale; no random shadow values
- `dark-mode-pairing` — Design light and dark variants together
- `icon-style-consistent` — One icon set; consistent stroke width and corner radius
- `primary-action` — One primary CTA per screen; secondary actions visually subordinate
- `system-controls` — Prefer native controls over fully custom ones unless branding requires it

### §5 Layout & Responsive (HIGH)

- `viewport-meta` — `width=device-width, initial-scale=1`; never disable zoom
- `mobile-first` — Design mobile-first, scale up to tablet and desktop
- `breakpoint-consistency` — Systematic breakpoints: 375 / 768 / 1024 / 1440
- `readable-font-size` — Minimum 16px body on mobile (avoids iOS auto-zoom)
- `line-length-control` — Mobile 35–60 chars/line; desktop 60–75 chars
- `horizontal-scroll` — No horizontal scroll on mobile
- `spacing-scale` — 4pt/8dp incremental spacing system
- `container-width` — Consistent max-width on desktop (max-w-6xl / 7xl)
- `z-index-management` — Defined z-index scale: 0 / 10 / 20 / 40 / 100 / 1000
- `fixed-element-offset` — Fixed navbar/bottom bar reserves padding for underlying content
- `scroll-behavior` — No nested scroll regions that interfere with main scroll
- `viewport-units` — Use `min-h-dvh` over `100vh` on mobile
- `orientation-support` — Layout readable in landscape
- `visual-hierarchy` — Size, spacing, contrast — not color alone — drives hierarchy

### §6 Typography & Color (MEDIUM)

- `line-height` — 1.5–1.75 for body text
- `line-length` — 65–75 characters per line
- `font-pairing` — Heading/body font personalities match; pair with intent
- `font-scale` — Consistent type scale: 12 / 14 / 16 / 18 / 24 / 32
- `contrast-readability` — Darker text on light backgrounds (e.g. slate-900 on white)
- `weight-hierarchy` — Bold headings (600–700), Regular body (400), Medium labels (500)
- `color-semantic` — Semantic color tokens (primary, secondary, error, surface, on-surface); no raw hex in components
- `color-dark-mode` — Desaturated/lighter tonal variants for dark; not inverted colors
- `color-accessible-pairs` — Foreground/background ≥4.5:1 (AA) or 7:1 (AAA)
- `color-not-decorative-only` — Functional color (error red, success green) requires icon/text alongside
- `number-tabular` — Tabular/monospaced figures for prices, data columns, timers
- `whitespace-balance` — Intentional whitespace groups related items; avoids clutter

### §7 Animation (MEDIUM)

- `duration-timing` — 150–300ms for micro-interactions; complex transitions ≤400ms; never >500ms
- `transform-performance` — Animate `transform` and `opacity` only; avoid `width`/`height`/`top`/`left`
- `loading-states` — Skeleton or progress indicator when loading exceeds 300ms
- `excessive-motion` — 1–2 key animated elements per view maximum
- `easing` — `ease-out` for entering, `ease-in` for exiting; never `linear` for UI transitions
- `motion-meaning` — Every animation expresses cause-effect; no purely decorative motion
- `state-transition` — State changes animate smoothly (hover / active / expanded / collapsed)
- `continuity` — Page transitions maintain spatial continuity (shared element, directional slide)
- `spring-physics` — Prefer spring/physics-based curves for natural feel
- `exit-faster-than-enter` — Exit animations ~60–70% of enter duration
- `stagger-sequence` — Stagger list/grid entrance 30–50ms per item
- `interruptible` — Animations interruptible by user tap; UI stays interactive during animation
- `modal-motion` — Modals animate from trigger source (scale+fade or slide-in)
- `navigation-direction` — Forward: left/up; backward: right/down — consistent direction
- `layout-shift-avoid` — Animations must not cause CLS; use `transform` for position changes

### §8 Forms & Feedback (MEDIUM)

- `input-labels` — Visible label per input; never placeholder-only
- `error-placement` — Error messages below the related field
- `submit-feedback` — Loading → success/error state on submit
- `required-indicators` — Mark required fields (asterisk or equivalent)
- `empty-states` — Helpful message and call-to-action when no content
- `toast-dismiss` — Auto-dismiss toasts in 3–5 seconds
- `confirmation-dialogs` — Confirm before destructive actions
- `inline-validation` — Validate on blur (not keystroke); show error only after user finishes
- `input-type-keyboard` — Semantic `input type` (email, tel, number) for correct mobile keyboard
- `password-toggle` — Show/hide toggle on password fields
- `autofill-support` — `autocomplete` / `textContentType` for system autofill
- `undo-support` — Allow undo for destructive or bulk actions (e.g. "Undo delete" toast)
- `error-recovery` — Error message includes a clear recovery path (retry, edit, help link)
- `multi-step-progress` — Step indicator or progress bar; allow back navigation
- `error-clarity` — Error states state cause + how to fix; never just "Invalid input"
- `focus-management` — After submit error, auto-focus the first invalid field

### §9 Navigation Patterns (HIGH)

- `bottom-nav-limit` — Bottom navigation max 5 items; icons with labels
- `back-behavior` — Back navigation predictable, consistent, preserves scroll/state
- `deep-linking` — All key screens reachable via deep link / URL
- `nav-label-icon` — Navigation items have both icon and text label; icon-only hurts discoverability
- `nav-state-active` — Current location visually highlighted (color, weight, indicator)
- `nav-hierarchy` — Primary nav (tabs/bottom bar) vs secondary nav (drawer) clearly separated
- `modal-escape` — Modals offer clear close affordance; swipe-down to dismiss on mobile
- `search-accessible` — Search reachable from top bar or tab; recent/suggested queries provided
- `state-preservation` — Back restores scroll position, filter state, and input
- `gesture-nav-support` — Support iOS swipe-back, Android predictive back without conflict
- `adaptive-navigation` — ≥1024px: sidebar; <1024px: bottom/top nav
- `back-stack-integrity` — Never silently reset nav stack or jump to home unexpectedly
- `avoid-mixed-patterns` — Don't mix Tab + Sidebar + Bottom Nav at the same hierarchy level
- `modal-vs-navigation` — Modals not for primary navigation flows; they break the user's path
- `persistent-nav` — Core navigation reachable from deep pages; don't hide in sub-flows

### §10 Charts & Data (LOW)

- `chart-type` — Match chart type to data: trend → line, comparison → bar, proportion → pie/donut
- `color-guidance` — Accessible palettes; avoid red/green-only pairs for colorblind users
- `data-table` — Provide table alternative; charts alone are not screen-reader friendly
- `pattern-texture` — Supplement color with patterns/shapes for colorblind accessibility
- `legend-visible` — Always show legend; position near chart
- `tooltip-on-interact` — Hover (Web) / tap (mobile) tooltips with exact values
- `axis-labels` — Label axes with units; no truncated or rotated labels on mobile
- `responsive-chart` — Charts reflow on small screens (horizontal bar instead of vertical)
- `empty-data-state` — Meaningful empty state with guidance; not a blank chart
- `loading-chart` — Skeleton/shimmer while chart data loads
- `animation-optional` — Chart entrance animations respect `prefers-reduced-motion`
- `large-dataset` — Aggregate or sample 1000+ data points; provide drill-down
- `touch-target-chart` — Interactive chart elements ≥44pt tap area
- `no-pie-overuse` — Avoid pie/donut for >5 categories; use bar chart
- `contrast-data` — Data lines/bars vs background ≥3:1; data labels ≥4.5:1

---

## Common Rules for Professional UI

### Icons & Visual Elements

| Rule | Do | Don't |
|---|---|---|
| No emoji as icons | Use SVG icons (Lucide, Heroicons, etc.) | Navigation icons as emojis (🎨🚀⚙️) |
| Vector-only assets | SVG / platform vector icons | Raster PNG icons that blur |
| Consistent icon sizing | Define tokens: icon-sm / icon-md (24pt) / icon-lg | Random 20 / 24 / 28pt mixing |
| Stroke consistency | One stroke width per visual layer (1.5px or 2px) | Mixing thick/thin strokes |
| Filled vs outline discipline | One style per hierarchy level | Mixing filled and outline at same level |
| Touch target minimum | ≥44×44pt; use `hitSlop` if icon is smaller | Small icons without expanded hit area |
| Icon alignment | Align to text baseline; consistent padding | Misaligned icons or inconsistent spacing |
| Icon contrast | 4.5:1 (small) / 3:1 (large UI glyphs) | Low-contrast icons blending into background |

### Interaction Standards

| Rule | Do | Don't |
|---|---|---|
| Tap feedback | Visual response within 80–150ms (ripple/opacity/elevation) | No visual response on tap |
| Animation timing | Micro-interactions 150–300ms with platform-native easing | Instant transitions or >500ms animations |
| Accessibility focus | Screen reader focus order matches visual; labels descriptive | Unlabeled controls or confusing traversal |
| Disabled state | Reduced opacity (0.38–0.5) + cursor change + semantic attribute | Controls that look tappable but do nothing |
| Touch target minimum | ≥44×44pt iOS / ≥48×48dp Android; expand hit area | Tiny touch targets without padding |
| Semantic controls | Native interactive primitives with proper roles | Generic containers as controls without semantics |

### Light/Dark Mode

| Rule | Do | Don't |
|---|---|---|
| Surface readability (light) | Cards/surfaces clearly separated with opacity/elevation | Overly transparent surfaces that blur hierarchy |
| Text contrast (light) | Body text ≥4.5:1 against light surfaces | Low-contrast gray body text |
| Text contrast (dark) | Primary ≥4.5:1; secondary ≥3:1 on dark surfaces | Dark mode text that blends into background |
| Token-driven theming | Semantic color tokens mapped per theme | Hardcoded hex values per screen |
| Scrim and modal legibility | Modal scrim 40–60% black to isolate foreground | Weak scrim that leaves background competing |
| State contrast parity | Pressed/focused/disabled equally distinguishable in both themes | Interaction states defined for one theme only |

### Layout & Spacing

| Rule | Do | Don't |
|---|---|---|
| Safe-area compliance | Respect top/bottom safe areas for fixed headers, tab bars, CTA bars | UI placed under notch, status bar, or gesture area |
| 8dp spacing rhythm | Consistent 4/8dp spacing system for padding, gaps, section spacing | Random spacing increments with no rhythm |
| Consistent content width | Predictable content width per device class | Arbitrary widths between screens |
| Section spacing hierarchy | Vertical rhythm tiers: 16 / 24 / 32 / 48 by hierarchy | Similar UI levels with inconsistent spacing |
| Scroll and fixed coexistence | Content insets so lists don't hide behind fixed bars | Scroll content obscured by sticky headers/footers |

---

## Pre-Delivery Checklist

Run this before submitting any UI code.

### Visual Quality
- [ ] No emojis used as icons
- [ ] All icons from consistent family and style
- [ ] No ad-hoc hardcoded hex values; semantic tokens used throughout
- [ ] Pressed-state visuals don't shift layout or cause jitter

### Interaction
- [ ] All tappable elements have pressed feedback within 150ms
- [ ] Touch targets meet minimum size (≥44×44pt iOS / ≥48×48dp Android)
- [ ] Micro-interaction timing: 150–300ms with native-feeling easing
- [ ] Disabled states are visually clear and non-interactive
- [ ] Screen reader focus order matches visual; interactive labels descriptive
- [ ] No nested/conflicting gesture regions

### Light/Dark Mode
- [ ] Primary text contrast ≥4.5:1 in both modes
- [ ] Secondary text contrast ≥3:1 in both modes
- [ ] Dividers/borders and states distinguishable in both modes
- [ ] Both themes tested before delivery

### Layout
- [ ] Safe areas respected for headers, tab bars, and bottom CTA bars
- [ ] Scroll content not hidden behind fixed bars
- [ ] Tested on small phone, large phone, and tablet (portrait + landscape)
- [ ] 4/8dp spacing rhythm consistent across component, section, and page levels

### Accessibility
- [ ] All meaningful images/icons have accessibility labels
- [ ] Form fields have labels, hints, and clear error messages
- [ ] Color is not the only indicator of state or meaning
- [ ] Reduced motion and dynamic text size supported without layout breakage
- [ ] Accessibility traits/roles/states (selected, disabled, expanded) announced correctly

---

## Stacking with frontend-design

This skill covers **UX rules and interaction quality**. The `frontend-design` skill covers **aesthetic direction and visual identity**. Use both together:

1. `frontend-design` → aesthetic direction, type system, color palette, signature element
2. `ui-ux-pro-max` → accessibility, interaction quality, animation timing, layout rules, pre-delivery checks
