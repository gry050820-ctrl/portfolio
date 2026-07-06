# Portfolio V1 Design Spec

**Status:** Approved · Frozen for V1  
**Date:** 2025-07-06  
**Narrative Line:** AI 产品经理 · 产品思维 × AI 实践

---

## 1. Global Architecture

**Stack:** Next.js + TypeScript + Tailwind CSS + Framer Motion  
**Deployment:** Static (Next.js `output: 'export'`), suitable for GitHub Pages / Vercel  
**Pattern:** Single-page scroll with independent project detail routes (`/project/[slug]`)

### Page Routes

| Route | Purpose |
|---|---|
| `/` | Single-page scroll: Hero → Dashboard → Product Lab → Capability Map → Methodology → Timeline → Contact |
| `/project/[slug]` | Project detail page (SSG, static paths) |
| `/lab` | Optional: full Product Lab index (all explorations) |

---

## 2. Information Architecture (Freeze)

```
① Hero              — "你是谁？"
② Data Dashboard    — "为什么值得相信？"
③ Product Lab       — "你解决过什么问题？"
④ Capability Map    — "为什么这些能力是真实的？"
⑤ Product Methodology — "你是怎么思考的？"
⑥ Growth Timeline   — "为什么会成为现在的你？"
⑦ Contact           — "为什么值得联系你？"
```

### Narrative Chain

Each section ends with a natural transition to the next question. No section is self-contained — the site is one continuous argument, not six independent pages.

---

## 3. Section Designs (Approved)

### ① Hero

- Centered layout, full viewport height
- Copy: "把 AI 做成产品的人" / "擅长需求拆解 · 快速验证 · AI 工具链搭建 · 产品落地"
- Two CTAs: "进入作品展厅 →" (primary) + "下载简历 PDF" (secondary)
- Top nav: transparent → glassmorphism on scroll
- Scroll indicator: breathing arrow, disappears on scroll
- Background: deep dark (#0b0b12) + single subtle radial glow
- Entry animation: stagger fade-in-up, total ~800ms

### ② Data Dashboard

- 4 metric cards in a row (PC), 2×2 grid (mobile)
- Metrics: AI Projects (5+) · Agent Workflows (3+) · End-to-end Cases (2-3) · AI Tools (10+)
- Each card: large number + label + evidence trail on click + "Last updated" timestamp
- Status indicator bar below cards: "🟢 Now Building: ..."
- Number count-up animation on scroll into view

### ③ Product Lab

- **Question-First organization** — projects grouped under exploration questions
- 3 featured explorations on homepage, "View All →" for the rest
- Project card design: **Conflict → Motivation → Project Name** (not Name → Description)
- Each card shows: problem statement, my role, tags, core result
- No screenshots as card covers — use abstract icons or data-flow sketches
- Supports "Ongoing" status, not just "Completed"

### Project Detail Page (`/project/[slug]`)

Modules (10 total, 8 required):
1. Background & Problem Definition
2. **Opportunity** (why worth doing + why now)
3. Thinking Process & Decisions
4. Execution Plan
5. **Trade-off** (what was chosen, what was given up, why)
6. AI Practice & Toolchain (AI contribution: AI did __, I did __)
7. **Impact** (user quotes > percentages, long-term influence)
8. Reflection
9. **If I Did It Again** (Next Iteration)
10. User Persona / Version History (optional)

Bottom: cross-linking by capability + by practice area

### ④ Capability Map

- 5 dimensions: 需求洞察 · 产品设计 · AI 实践 · 执行落地 · 表达输出
- Each dimension: depth levels (1-5) with project evidence at each level
- Click to expand evidence chain, click evidence to jump to project
- Growth description at bottom of each card
- NOT a radar chart — a capability map with evidence anchors

### ⑤ Product Methodology

- Real case walkthrough (AI U 盘) as methodology carrier
- 6 decision nodes: 发现 → 思考 → 取舍 → AI加速 → 验证 → 迭代
- Each node: my method + anchor link to corresponding Product Lab module
- Nodes connected by a timeline/flow visual
- "Expand All" option for full reading flow

### ⑥ Growth Timeline

- Narrative timeline, not a resume chronology
- Key turning points: first AI encounter → first project → internship → now
- Emphasis on growth path and direction, not dates

### ⑦ Contact

- Resume download, email, GitHub, WeChat QR placeholder
- Low-friction, minimal design
- "Why worth contacting" — final reinforcement

---

## 4. Design System

### Colors

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0b0b12` | Main background |
| `--bg-secondary` | `rgba(255,255,255,0.03)` | Card backgrounds |
| `--brand-primary` | `#6c5ce7` → `#8b5cf6` | Buttons, links, accents |
| `--brand-secondary` | `#3b82f6` | Secondary accents (dashboard) |
| `--text-primary` | `#f5f5f7` | Headlines |
| `--text-secondary` | `#a1a1aa` | Body text |
| `--text-tertiary` | `#71717a` | Labels, dates |
| `--border` | `rgba(255,255,255,0.08)` | Cards, dividers |

### Typography

| Usage | Font | Weight | Size (PC) |
|---|---|---|---|
| Hero title | Inter Display / Plus Jakarta Sans | 600 | 48-56px |
| Section title | Inter | 600 | 32-36px |
| Body | Inter | 400 | 16px |
| Labels | Inter | 500 | 14px |
| Mono (data/code) | JetBrains Mono | 400 | 12-14px |

### Spacing

- Section vertical gap: 160-200px
- Content max-width: 1100px (with 24px padding)
- Card gap: 20px
- Card border-radius: 16px
- Button border-radius: 12px

### Atmosphere Keywords

Deep · Clean · Calm · Credible · Like a freshly booted MacBook Pro screen

---

## 5. Component Architecture

```
components/
├── ui/                  # Base design system
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Section.tsx
│   ├── Container.tsx
│   └── Badge.tsx
├── layout/
│   ├── Nav.tsx
│   ├── Layout.tsx
│   └── Footer.tsx
├── hero/
│   ├── HeroSection.tsx
│   ├── HeroTitle.tsx
│   ├── HeroSubtitle.tsx
│   ├── HeroCTA.tsx
│   ├── HeroScrollIndicator.tsx
│   └── HeroBackground.tsx
├── dashboard/
│   ├── DashboardSection.tsx
│   ├── MetricCard.tsx
│   └── StatusBar.tsx
├── lab/
│   ├── LabSection.tsx
│   ├── ExplorationGroup.tsx
│   ├── ProjectCard.tsx
│   └── ProjectDetail.tsx (page)
├── capability/
│   ├── CapabilitySection.tsx
│   └── CapabilityCard.tsx
├── methodology/
│   ├── MethodologySection.tsx
│   └── MethodNode.tsx
├── timeline/
│   ├── TimelineSection.tsx
│   └── TimelineItem.tsx
└── contact/
    └── ContactSection.tsx
```

### Data

```
data/
├── site.config.ts       # Site metadata, nav, copy
├── projects.ts          # Project data (typed)
├── capabilities.ts      # Capability definitions + evidence
├── methodology.ts       # Method nodes data
└── timeline.ts          # Timeline entries
```

---

## 6. Motion Design Principles

- **Staggered entry:** fade-in-up, 0.4-0.6s per element, 0.1s stagger
- **Hover:** subtle scale (1.02-1.03), border brightness, 0.25s ease-out
- **Click feedback:** scale(0.97) → bounce back, 0.15s
- **Number counting:** 0 → target, 0.8s ease-out
- **Scroll trigger:** elements animate when 30-40% into viewport
- **NO:** mouse-follow effects, particles, heavy WebGL, parallax overuse

---

## 7. Backlog (Post-V1)

- [ ] Custom domain setup
- [ ] Bilingual support (EN/CN toggle)
- [ ] Blog/resource section
- [ ] Dark/Light theme toggle (currently dark-only)
- [ ] WeChat QR contact integration
- [ ] Analytics (plausible/umami)
- [ ] SEO metadata optimization
- [ ] OG image generation
- [ ] Project detail: interactive prototype embeds
- [ ] Project detail: data visualization for Impact section
- [ ] Full Product Lab index page (`/lab`)

---

## 8. Development Phases (V1)

| Phase | Scope | Deliverable |
|---|---|---|
| Phase 1 | Project init + Design System + Layout + Nav + Base Components | Runnable skeleton |
| Phase 2 | Hero section | Complete Hero with animations |
| Phase 3 | Data Dashboard | Metric cards + count-up + status bar |
| Phase 4 | Product Lab (home cards) | Question-First cards + exploration groups |
| Phase 5 | Project Detail page | Full detail template with all modules |
| Phase 6 | Capability Map | Expandable capability cards with evidence |
| Phase 7 | Product Methodology | 6-node walkthrough |
| Phase 8 | Growth Timeline | Narrative timeline |
| Phase 9 | Contact section | Download + links |
| Phase 10 | Polish + deploy | Responsive QA, perf, deploy |

---

*Frozen for V1. All further changes go to Backlog.*
