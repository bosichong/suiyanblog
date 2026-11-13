---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

# Frontend Design

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic detail and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

---

## Step 1 — Ground the Brief

If the brief doesn't define the subject, pin it yourself: name one concrete subject, its audience, and the page's single job. State your choice before proceeding. The subject's own world — its materials, instruments, artifacts, vernacular — is where distinctive choices come from. Build with the brief's real content throughout.

---

## Step 2 — Commit to a Direction

Before writing a single line of code, define the full aesthetic direction:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme and own it. Options: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, handcrafted/artisanal, dark/moody, lo-fi/zine. Treat these as starting points — the final direction should feel singular.
- **Constraints**: Framework, performance, accessibility requirements.
- **Differentiation**: What makes this UNFORGETTABLE? The one element someone will remember.

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work — the key is intentionality, not intensity.

### Design Token Plan

Create a compact token system before coding:

- **Color**: 4–6 named hex values. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Use CSS variables for everything.
- **Type**: 2–3 typeface roles — a characterful display face used with restraint, a complementary body face, a utility face for captions/data if needed.
- **Layout**: One-sentence prose concept + ASCII wireframe to pressure-test the idea.
- **Signature**: The single element this design will be remembered by.

### Calibration Check

Before building, compare your plan against known AI design clichés:

1. Warm cream background (~#F4F1EA) + high-contrast serif + terracotta accent
2. Near-black background + single acid-green or vermilion accent
3. Broadsheet layout + hairline rules + zero border-radius + dense columns

These are defaults, not choices — they appear regardless of subject matter. If your plan converges on any of these without a brief-specific reason, revise it and state what you changed and why. Where the brief explicitly specifies a visual direction, follow it exactly.

---

## Step 3 — Implement

Produce working code (HTML/CSS/JS, React, Vue, etc.) that is:

- Production-grade and fully functional
- Visually striking and memorable
- Cohesive with a single, clear aesthetic point-of-view
- Meticulously refined in every detail

---

## Aesthetics Reference

### Typography

Choose fonts that are beautiful, unique, and characterful. The type treatment should itself be a memorable part of the design — not a neutral delivery vehicle.

- Pair a distinctive display face with a refined body face
- Set a clear type scale with intentional weights, widths, and spacing

**NEVER use**: Arial, Inter, Roboto, or bare system font stacks as primary typefaces. Do not default to Space Grotesk or similar overused "safe" choices.

### Color & Theme

Commit to a cohesive aesthetic. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Define all tokens as CSS variables at `:root`.

**NEVER use**: Purple-gradient-on-white as a default, or any palette that reads as a generic SaaS template.

### Motion

Use animations for effects and micro-interactions. One well-orchestrated moment lands harder than scattered effects.

- **HTML/CSS**: Prefer CSS-only solutions. `animation-delay` staggering on page load creates delight.
- **React**: Use the Motion library when available.
- **Scroll-triggered reveals** and hover states should surprise.
- Restraint is better than scatter-fire: extra animation contributes to the AI-generated feeling.

### Spatial Composition

Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Choose generous negative space OR controlled density — never the safe middle ground.

### Backgrounds & Visual Details

Create atmosphere and depth — never default to solid colors. Match texture and effect to the aesthetic direction:
gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, grain overlays.

### Hero

The hero is a thesis. Open with the most characteristic thing in the subject's world: a headline, image, animation, live demo, or interactive moment. A big number + gradient accent is the template answer; only use it if it's genuinely the best option for this specific brief.

### Structure

Structural devices (numbering, eyebrows, dividers, labels) should encode something true about the content, not decorate it. Numbered markers (01 / 02 / 03) are only appropriate when content is an actual ordered sequence.

---

## CSS Implementation Notes

- Define all color, spacing, and type tokens as CSS custom properties.
- Watch specificity conflicts: `.section` (type-based) vs `.cta` (class-based) frequently cancel each other on padding/margin. Audit before finishing.
- Do not write classes that silently override each other across sections.

---

## Copy & Content

Words are design material, not filler.

- Write from the user's side of the screen — name things by what people control, not how the system is built.
- Use active voice: "Save changes," not "Submit." Actions keep the same name throughout the entire flow.
- Errors explain what went wrong and how to fix it. Empty states are invitations to act.
- Sentence case. Plain verbs. No filler. Tone matched to brand and audience.

---

## Self-Critique

Spend boldness in one place — the signature element. Keep everything else quiet and disciplined. Cut decoration that doesn't serve the brief.

Before submitting, ask: does any part of this read like it was generated for a different brief? Revise that part.

---

Remember: Codex is capable of extraordinary creative work. Don't hold back — show what can truly be created when committing fully to a distinctive, brief-specific vision.
