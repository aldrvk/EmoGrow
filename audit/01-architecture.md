# 01 — Architecture & System Design

## High-Level Architecture

**Stack:** Laravel 13 + Inertia.js v3 + React 19 + Tailwind CSS 4 + Vite 8 + MySQL (configured but unused)

**Pattern:** The project uses an **Inertia.js SPA monolith** — the Laravel backend serves as a route/page resolver and the React frontend handles all rendering. However, in practice, the architecture is a **static page renderer**: every route in `web.php` is a closure that calls `Inertia::render('PageName')` with zero props passed from the server.

### Data Flow (Current State)

```
Browser → Laravel Route (closure) → Inertia::render('PageName', []) → React Page Component → Hardcoded data / localStorage
```

There is **no controller layer**, **no service layer**, **no repository layer**, and **no API endpoints**. The only controller file (`Controller.php`) is the abstract base class with zero methods.

---

## Findings

| Finding | Severity | File/Line | Impact | Recommendation |
|---------|----------|-----------|--------|----------------|
| **All routes are inline closures with no controllers** — Every route in `web.php` is a closure that returns `Inertia::render()` with no data. No business logic flows through the backend. | High | [web.php](file:///Users/aldriknoel/EmoGrow/EmoGrow/routes/web.php) L8–68 | The backend is entirely decorative. No data validation, processing, or persistence happens server-side. The app cannot function as a real product. | Create dedicated controllers for each feature domain (ScreeningController, ChildController, ActivityController, etc.) following Laravel resource controller conventions. |
| **Duplicate route definitions for `/login` and `/register`** — Lines 8–10 define `/register` and `/login` returning `Auth/Register` and `Auth/Login` pages. Lines 67–68 redefine them returning `Auth/AuthPage`. The later definitions silently override the earlier ones. | High | [web.php](file:///Users/aldriknoel/EmoGrow/EmoGrow/routes/web.php) L8–10 vs L67–68 | `Auth/Register` and `Auth/Login` page components don't even exist — only `Auth/AuthPage.tsx` exists. The duplicate route names will cause `route('login')` to resolve to the *last* definition. While the last definition happens to be the correct one, the first two are dead code creating confusion. | Remove lines 8–14 (the dead routes pointing to nonexistent components). Keep only lines 67–68. |
| **No route grouping or middleware protection** — All routes including `/admin` are publicly accessible with zero middleware. There's no `auth` middleware group, no CSRF protection groups, nothing. | Critical | [web.php](file:///Users/aldriknoel/EmoGrow/EmoGrow/routes/web.php) L1–68 | Any unauthenticated user can access every page, including the admin panel. | Group protected routes behind `auth` middleware. Protect `/admin` with an additional admin role guard. |
| **No database schema for domain entities** — Only 3 default Laravel migrations exist (users, cache, jobs). There are no migrations for children, screenings, activities, monitoring data, education content, or any business entity. | Critical | [database/migrations/](file:///Users/aldriknoel/EmoGrow/EmoGrow/database/migrations) | The app cannot store or retrieve any meaningful data. All "data" is JavaScript constants in React components. | Design and create migrations for: `children`, `screenings`, `screening_results`, `activities`, `activity_completions`, `education_modules`, `monitoring_entries`, `evaluations`. |
| **Only `User` model exists** — No Eloquent models for any domain entity. The User model itself has only default fields (name, email, password) with no role/type field. | High | [app/Models/User.php](file:///Users/aldriknoel/EmoGrow/EmoGrow/app/Models/User.php) L1–33 | Cannot implement RBAC, cannot persist domain data, cannot build any API. | Add a `role` field to Users. Create models for all domain entities with proper relationships (User hasMany Children, Child hasMany Screenings, etc.). |
| **No caching, queueing, or async-processing strategy in use** — Although configured in `.env` (QUEUE_CONNECTION=database, CACHE_STORE=database), nothing actually uses them. | Low | [.env](file:///Users/aldriknoel/EmoGrow/EmoGrow/.env) L38–40 | No impact now (no data to cache), but needs to be designed before production. | Plan caching for education content, queue for PDF generation and email notifications. |

## Scalability Assessment

**Current capacity:** Not applicable — there is no backend to scale. The app would serve identical static pages to every user since no server-side state exists.

**Bottleneck if built properly:** The `localStorage`-based data approach means cross-device sync is impossible. At 10x–100x users, a proper database with indexed queries and pagination would be needed. The current hardcoded data approach would need to be completely replaced.
