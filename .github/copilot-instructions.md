# Copilot Instructions – Mobile Movie Ticket Homepage

## Context & Goal
- Single-page mobile web for a movie ticket homepage; no backend, no database.
- Tech: plain HTML5 + CSS3 + vanilla JS only (no frameworks/build tools).

## File Layout (proposed)
- index.html – main page; sections ordered: header/search → carousel → category tabs → today box office list → optional extra modules → fixed bottom nav.
- css/style.css – mobile-first styles; define CSS custom properties for colors/spacing; place key layout classes here.
- js/app.js – data arrays (movies, categories, box office), carousel logic, tab switching, search interactions.
- assets/images/posters/poster1.jpg…poster5.jpg – hot movie carousel placeholders (you will replace with real images).
- assets/images/nav/home.png, movies.png, orders.png, profile.png – bottom nav icons (replace manually).

## Required UI Blocks & Behaviors
- Search bar: input with placeholder, search icon, clear button (show when text present). Support simple client-side suggestions from a static list; debounce ~200ms.
- Carousel: auto-rotate (interval ~4-5s) + swipe/prev-next controls; indicators show active slide; uses poster images from assets/posters/*.jpg.
- Category tags: pills for 热门 / 正在热映 / 即将上映 / 经典; clicking filters movie cards by category (filter client-side from data arrays).
- 今日票房排行榜: list top 5-10 items with rank, title, daily box office, simple trend icon (▲/▼ or inline SVG). Data lives in JS (no fetch).
- Bottom nav (fixed): 首页、电影、订单、我的; highlight current page; icons from assets/images/nav/*.png (replace manually).
- Optional module: 推荐/猜你喜欢 横向滑动卡片或双列网格，展示片名、评分、标签、购票/预告按钮。

## Styling Patterns
- Mobile-first: base width ~375-430px; use fluid units (%, vw, rem). Root font-size 16px; spacing scale 4/8/12/16.
- Use CSS vars for colors (e.g., --bg, --text, --muted, --accent, --card); keep a light theme; add subtle shadows for cards/nav.
- Layout: flex for bars/nav; grid or flex-wrap for cards; make bottom nav fixed with safe-area inset padding when available.
- Typography: bold titles for sections, medium for list items, muted for meta info; ensure line-height ≥1.4.

## JS Patterns
- Keep state in simple objects/arrays (movies, categories, rankings). No external libs.
- Carousel: setInterval for auto-play; pause on interaction; update indicators with an active class.
- Category filter: data-category attributes on cards; toggle via classList.
- Search: filter against movie titles; render suggestion list below input; clear button resets results.

## Assets & Placeholders (replace manually)
- Carousel posters: assets/images/posters/poster1.jpg…poster5.jpg.
- Bottom nav icons: assets/images/nav/home.png, movies.png, orders.png, profile.png.
- Trend icons: prefer inline SVG (up/down arrows) to avoid extra assets.

## Accessibility & UX
- Provide alt text for posters; label buttons (search, clear, nav items).
- Ensure focus styles visible; tap targets ≥44px; avoid text below 14px.
- Respect reduced motion: gate auto-animations behind a prefers-reduced-motion check if practical.

## Development Workflow
- No build step required. Open index.html directly or run a static server (e.g., `python -m http.server 8000` from project root) for CORS-safe asset loading.
- Keep all logic client-side; do not add npm/yarn unless requirements change.

## What to Avoid
- Adding dependencies, bundlers, or backend calls.
- Hard-coding absolute paths; use relative paths from index.html to assets/.

## Testing (manual)
- On mobile viewport: verify carousel auto-rotates, swipe/controls work; category pills filter cards; search suggestions appear with debounce; bottom nav stays fixed and tappable; rankings list shows trend icons.
