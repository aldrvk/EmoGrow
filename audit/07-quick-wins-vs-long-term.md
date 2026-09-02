# 07 — Quick Wins vs Long-Term Fixes

## Quick Wins (< 1 Day Each)

| # | Item | Estimated Time | Files Affected | Impact |
|---|------|---------------|----------------|--------|
| 1 | **Remove duplicate routes** — Delete lines 8–14 in `web.php` (the dead `/register` and `/login` routes pointing to nonexistent components). | 5 min | `routes/web.php` | Eliminates route confusion and potential navigation bugs. |
| 2 | **Rotate APP_KEY** — Run `php artisan key:generate` to create a new key. Ensure `.env` remains gitignored. | 5 min | `.env` | Eliminates the risk of session forgery from the exposed key. |
| 3 | **Fix HelpDeskWidget reactivity** — Replace `window.location.pathname` dependency with `usePage().url` from Inertia. | 15 min | `Components/HelpDeskWidget.tsx` | Widget will correctly show/hide during SPA navigation. |
| 4 | **Extract BMI calculation utility** — Create `resources/js/utils/bmi.ts` with a single `computeBMI(weight, height)` and `getBMIStatus(bmi)` function. Replace all 3 duplicate implementations. | 30 min | `Pages/ScreeningAnak.tsx`, `Pages/AdminPanel.tsx`, new `utils/bmi.ts` | Single source of truth for health calculations. Eliminates inconsistency risk. |
| 5 | **Replace `alert()` with inline validation** — Remove the `alert()` call in Dashboard.tsx L123 and show an inline error message. | 20 min | `Pages/Dashboard.tsx` | Better UX, no jarring browser dialogs. |
| 6 | **Add `<meta>` description and proper page titles** — Use Inertia `<Head>` component on all pages (some already use it, some don't). | 30 min | All page components | Better SEO and accessibility. |
| 7 | **Translate remaining English UI copy** — "BMI Score", "Download Report (PDF)", "Step 2 of 2", "Merit", "Overweight" → Indonesian equivalents. | 1 hr | ~6 page files | Consistent language for target users. |
| 8 | **Write a proper README** — Replace default Laravel README with: project purpose, tech stack, setup instructions, feature overview. | 1 hr | `README.md` | Enables new developers to onboard. |
| 9 | **Add `img` error fallbacks** — Add `onError` handlers to all `<img>` tags that use external URLs. | 30 min | `Dashboard.tsx`, `Aktivitas.tsx`, `Header.tsx` | Prevents broken image icons when CDNs are unreachable. |
| 10 | **Set `APP_DEBUG=false` in `.env.example`** — Signal to deployers that debug should be off in production. | 2 min | `.env.example` | Prevents accidental debug-mode deployment. |

---

## Long-Term Fixes (Requires Planning / Major Effort)

| # | Item | Estimated Time | Dependencies | Impact |
|---|------|---------------|-------------|--------|
| 1 | **Build authentication system** — Implement Laravel Breeze or manual auth with login, registration, password hashing, session management, CSRF protection, and server-side role-based access control. | 2–3 days | None | **Prerequisite for everything else.** Without auth, the app cannot be deployed. |
| 2 | **Design and create database schema** — Migrations for `children`, `screenings`, `screening_results`, `activities`, `activity_logs`, `education_modules`, `monitoring_entries`, `evaluations`. Model relationships: User → Children → Screenings, etc. | 2–3 days | Auth system | Enables real data persistence. |
| 3 | **Build backend API layer** — Create controllers, form requests, and policies for CRUD operations on all domain entities. Wire Inertia page props to database queries. | 5–7 days | Database schema, Auth | Replaces all hardcoded data with real data. App becomes functional. |
| 4 | **Replace localStorage with server-side state** — Remove all `localStorage.setItem/getItem` calls. Pass data via Inertia shared data or page props. | 2–3 days | Backend API | Data persists across devices. Health data is properly secured server-side. |
| 5 | **Implement PDF report generation** — Wire up "Download Report (PDF)" buttons to actual PDF generation using `barryvdh/laravel-dompdf` or similar. | 1–2 days | Backend data | Core user expectation fulfilled. |
| 6 | **Refactor large page components** — Break `AdminPanel.tsx` (783 lines), `EdukasiDetail.tsx` (54KB), and `Monitoring.tsx` (464 lines) into smaller, testable sub-components. | 2–3 days | None | Dramatically improves maintainability and enables unit testing. |
| 7 | **Implement proper WHO growth standards** — Replace simple BMI threshold checks with age-and-gender-adjusted Z-score calculations using WHO Child Growth Standards data. | 3–5 days | Backend API, medical consultation | Medically accurate results. Essential for a health application. |
| 8 | **Set up CI/CD pipeline** — GitHub Actions with PHPUnit, TypeScript checking, build verification, dependency auditing, and automated deployment. | 1–2 days | Tests written | Prevents regressions, automates quality checks. |
| 9 | **Write comprehensive test suite** — Feature tests for all routes, unit tests for BMI calculations and business logic, integration tests for form submissions. Target: 80% coverage on backend. | 3–5 days | Backend implementation | Confidence in correctness, safe refactoring. |
| 10 | **Unify design system** — Resolve the neubrutalism vs. soft-card inconsistency. Create a shared component library with consistent tokens, spacing, and typography. | 2–3 days | None | Professional, cohesive visual experience. |
