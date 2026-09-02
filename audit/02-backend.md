# 02 — Backend Audit

## Overview

The backend is effectively **empty**. Laravel is used exclusively as a page router for Inertia.js. There are:
- **0 custom controllers** (only the abstract `Controller` base class)
- **0 API endpoints**
- **0 form request validation classes**
- **0 service classes**
- **0 custom middleware**
- **0 policies/gates** for authorization
- **0 database queries** beyond the default migration schema
- **1 model** (the default `User`)

---

## Findings

| Finding | Severity | File/Line | Impact | Recommendation |
|---------|----------|-----------|--------|----------------|
| **No server-side input validation** — The screening form collects sensitive child health data (age, weight, height) but none of it is sent to the server. All "validation" is client-side only (e.g., `ageMonths > 60` check in `Dashboard.tsx` L122). | Critical | [Dashboard.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/Dashboard.tsx) L116–139, [ScreeningAnak.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/ScreeningAnak.tsx) L72–73 | Malicious or accidental bad data (negative weights, absurd heights) can produce misleading BMI results. Since data isn't stored, this is currently a UX-only issue, but will become critical when a backend is added. | Create Laravel Form Requests with validation rules for every form. Never trust client-only validation for health data. |
| **No authentication implementation** — Login/register forms exist in the UI but perform zero server-side auth. The `handleSubmit` in `AuthPage.tsx` uses `setTimeout` to simulate a server call, then redirects via `router.get('/')`. No actual credential checking occurs. | Critical | [AuthPage.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/Auth/AuthPage.tsx) L87–108 | Any email/password combination "works". The admin check is `email === 'admin@emogrow.com'` on the client side (L96). This is trivially bypassable. | Implement Laravel Breeze, Fortify, or manual auth with proper password verification, session management, and CSRF tokens. |
| **Client-side role check for admin access** — Admin panel visibility is gated by `localStorage.getItem('userRole') !== 'admin'` in the Sidebar component. Any user can set this value via browser DevTools. | Critical | [Sidebar.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Components/Layout/Sidebar.tsx) L109 | Any user can access the admin panel by typing `localStorage.setItem('userRole', 'admin')` in the console. | Implement server-side RBAC. Add a `role` column to the users table. Use Laravel policies/middleware to protect admin routes. |
| **BMI calculation is duplicated and inconsistent** — The BMI formula and status thresholds are implemented in 3 places with slightly different logic: `ScreeningAnak.tsx` (L40–44), `AdminPanel.tsx` (`computeImt` L32–43), and `Dashboard.tsx` reads from localStorage. The threshold boundaries differ (one uses `<14` as "Kurus", another uses `imt < 14`; one has `imt >= 14 && imt <= 18`, the other has `imt > 18`). | Medium | [ScreeningAnak.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/ScreeningAnak.tsx) L40–44 vs [AdminPanel.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/AdminPanel.tsx) L32–43 | Different pages may show different nutritional status for the same measurements. For a health app, inconsistent medical calculations are dangerous. | Move BMI calculation to a single shared utility (preferably server-side). Use WHO Z-score tables for proper age/gender-adjusted classification, not simple thresholds. |
| **No database queries at all** — There are zero Eloquent queries, zero raw SQL, zero database interactions of any kind in the application code. | Critical | All backend files | The database (MySQL "EmoGrow") exists in config but is never queried. All data lives in frontend JS constants. | Implement full CRUD operations for all domain entities. |
| **No error handling strategy** — No custom exception handler, no error logging configuration beyond defaults, no error boundary in React. | Medium | Entire codebase | Uncaught errors will show default Laravel debug pages (since `APP_DEBUG=true`). In production, stack traces with sensitive info would leak. | Implement proper error handling: custom error pages, React error boundaries, structured logging. |
| **No testing beyond defaults** — Only the boilerplate `ExampleTest.php` exists in both `tests/Feature/` and `tests/Unit/`. Zero tests for any business logic. | High | [tests/](file:///Users/aldriknoel/EmoGrow/EmoGrow/tests) | Zero confidence in correctness. Any refactoring is blind. | Write tests for BMI calculation logic, authentication flows, and data validation before building further. |
| **Dependencies not audited for vulnerabilities** — Laravel 13.8, PHP 8.3, React 19 — these are very recent versions. `composer.lock` and `package-lock.json` exist but no automated vulnerability scanning is configured. | Low | [composer.json](file:///Users/aldriknoel/EmoGrow/EmoGrow/composer.json), [package.json](file:///Users/aldriknoel/EmoGrow/EmoGrow/package.json) | Unknown CVE exposure. | Run `composer audit` and `npm audit` regularly. Add to CI pipeline. |
