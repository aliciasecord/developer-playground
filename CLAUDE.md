# CLAUDE.md

## What this is
"365 Micro Builds" — a personal, one-project-a-day-ish playground for exploring HTML/CSS/JS patterns. Vanilla only: **no frameworks, no build step, no package manager, no libraries.** Hosted on GitHub Pages at a subpath of aliciasecord.com.

Full curriculum: [about/curriculum.md](about/curriculum.md). Style/credits: [about/colophon.md](about/colophon.md). Weekly plan and shipped log: [README.md](README.md).

## How to collaborate here
**Claude reviews, it doesn't draft.** Each build is written by hand first. Claude's job is to review afterward: catch bugs, suggest cleanups/simplifications, explain anything unclear, and help debug. Do not write a project's first draft or scaffold new build logic unless explicitly asked to.

Fine to do without asking: explain code, point out bugs, suggest CSS/JS cleanups, fix a specific reported issue, update docs (README/log entries) the user asks for.

## Site Structure & Conventions

This is a static, buildless HTML/CSS/JS site deployed on GitHub Pages at
`/developer-playground/`. No frameworks, no build step, no bundler.

### Paths

All internal references — `<link>`, `<script src>`, `<a href>`, `<img>`,
and entries in `projects.js`/`log.js` — use **root-absolute paths**,
always prefixed `/developer-playground/`, with **no `.html` extension**
on page links (e.g. `/developer-playground/about`, not
`/developer-playground/about.html` or `about/`). No exceptions, no
relative paths anywhere. This applies uniformly across every page depth —
a page two folders deep uses the same absolute path a root page would.

### Page routing (GitHub Pages)

GitHub Pages has no server-side rewriting — it only auto-serves
`index.html` for a bare directory request. So every route is a
**folder containing `index.html`**, never a flat `name.html` file.
This is what makes extensionless absolute links (above) actually resolve.

Example: the About page lives at `/about/index.html`, reachable at
`/developer-playground/about`.

### CSS layers (`global-styles/`)

Numbered files, loaded in this fixed order, one concern per file:

1. `1_modern-normalize.css` — reset
2. `2_atomic-tokens.css` — design tokens
3. `3_semantic-tokens.css` — utility classes
4. `4_utilities.css` — light/dark theme values
5. `5_theme.css` — reusable component patterns

Never skip a number; the number is what keeps cascade order
self-documenting without a build tool.

### Scripts (`global-scripts/`)

- `theme.js` — standalone, loaded in `<head>`, render-blocking.
  Detects light/dark preference before paint to avoid a flash of the
  wrong theme. Never defer or move this.
- `app.js` — loaded at the end of `<body>`. Injects the shared header,
  nav, and footer via `querySelector('header'/'footer').innerHTML`, and
  handles the mobile nav toggle and theme toggle. Every page needs bare
  `<header></header>`/`<footer></footer>` tags for this to work.

**Rule for what belongs in `global-scripts/`:** a script goes there only
if it's safe to run unconditionally on *every* page — i.e. it makes no
assumption about page-specific DOM. The moment a script assumes a
specific element exists, it's page-specific and does NOT belong here.

### Section data files (`projects/projects.js`, `log/log.js`)

Each is a single JS array acting as the source of truth for that
section's listings (home page "recent" widgets, section index pages).
All 365 rows are pre-seeded up front with placeholder/empty fields,
filled in as each day ships. Safe to include on any page needing that
section's data — these files only define data, they don't touch the DOM.

### Page-specific glue scripts

Code that reads a section's data array and populates a *specific*
element on *one* page (e.g. a "recent logs" sidebar) is **inline**, at
the very bottom of `<body>`, after the shared data script and after
`app.js`. Never extract this into a shared file — it's coupled to that
page's markup by definition.

Load order on any page needing this: data file → `app.js` → inline glue.

### Project folders (`projects/XXX-name/`)

Each project folder contains `index.html` and, **only if the project
actually needs them**, `script.js` and/or `style.css`. The template
does NOT link either by default — add the file and its `<link>`/
`<script>` tag only once there's real content for it. No empty
placeholder files.

If a `style.css` override shows up in more than one project folder,
that's a signal it belongs in `global-styles/` instead of being
repeated per project.

### Head boilerplate

The `<head>` block (favicons, manifest, theme-color, canonical, OG tags)
is duplicated in every page's raw HTML — it cannot be JS-injected like
the nav, because search/social crawlers don't execute JavaScript. This
duplication is by design, not an oversight. `XXX-template` and
`log/template` are the source of truth for the shared portion; if that
block changes, edit the templates first, then backport to already-live
pages manually.

## Numbering
- Folder numbers are 3-digit, zero-padded, sequential (`001`, `002`, ...).
- Not strictly one per calendar day — a build can span multiple days, and gaps are fine.
- `log/XXX` entries don't have to map 1:1 to `projects/XXX` — log what happened, even if no project folder shipped that day.

## Commits
Commit early and often — small commits per sub-step of a build, not one big commit at the end. Don't hold work back waiting for a build to feel "done."

## Conventions to follow (from the templates)
- New project folders start from [projects/XXX-template](projects/XXX-template/index.html); new log entries from `log/template`.
- Pages pull in `global-scripts/theme.js` (head, early theme flash prevention) and `global-scripts/app.js` (header/nav/footer injection, theme toggle, mobile nav) — don't hand-write nav/footer markup per page.
- Site-wide tokens/colors live in `global-styles/2_tokens.css` — reuse CSS variables (`--bg`, `--text`, `--accent`, etc.) rather than hardcoding colors.
- Favicon links, canonical URL, and OG meta tags in the template head block should be copied as-is into new pages, only updating the title/description.

## CSS rules
- **Cascade layers.** `style.css` imports everything through `@import ... layer(...)` and declares layer priority explicitly with `@layer patterns, theme, utilities, tokens, reset;`. Any new global CSS file needs an `@import` line in `style.css` plus a slot in that `@layer` statement — don't rely on source order for specificity.
- **Numbered load order.** `global-styles/` files are prefixed `1_`, `2_`, `3_`... (`1_modern-normalize.css`, `2_tokens.css`, `3_utilities.css`, `4_theme.css`, `5_patterns.css`) so the import order is legible from the filename. Keep new global stylesheets in that numbering scheme.
- **Tokens, not literals.** Colors, radii, fonts, spacing live as custom properties in `2_tokens.css` (`--bg`, `--text`, `--accent`, `--accent-hover`, `--border`, `--radius`, `--pill`, `--mono`, `--sans`, `--shadow`, etc.). Style with `var(--token)`; don't hardcode hex/px values that already have a token.
- **Element-first styling.** `4_theme.css` styles bare HTML elements (`header`, `nav`, `h1`-`h6`, `p`, `a`, `button`, `img`...) as the default, with every unstyled element left as a commented-out placeholder (`/* h5 {} */`) so the file doubles as a checklist. Keep that scaffold — fill in a commented block rather than deleting it when an element goes unstyled.
- **Minimal component/utility classes.** Reusable pieces get a small named class (`.card`, `.btn`, `.inner`, `.hero`) with modifiers chained on the same element (`.btn.btn-primary`, `.btn-small`, `.inner.condensed`) rather than a BEM-style naming scheme. One-off utilities (`.flex-row`, `.w-100`, `.text-scale-600`, `.bold`) live in `3_utilities.css`.
- **`:is()` for state grouping.** Hover/focus/visited variants are grouped with `:is(a:hover, a:focus)` / `:is(a, a:visited)` instead of separate rules per pseudo-class.
- **Range media queries.** Breakpoints use the modern range syntax — `@media (width < 768px)` — not `max-width`/`min-width`. Existing breakpoints are `768px` and `576px`.
- **Page-local CSS.** A project's own `style.css` (e.g. `projects/XXX-build-name/style.css`) is for that build only; anything reusable belongs in `global-styles/` instead.
