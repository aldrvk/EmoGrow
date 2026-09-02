# Executive Summary

## What This Application Does

**EmoGrow** is a web-based child health monitoring and early intervention platform built for Indonesian parents (mothers) and healthcare workers (admin/kader). It enables:

1. **BMI Screening** — Parents input child anthropometric data (weight, height, age, waist circumference) and the app auto-calculates BMI and nutritional status.
2. **Developmental Questionnaires** — Gross and fine motor skill assessments via structured yes/no questions.
3. **Personalized Education** — Dynamic educational content (articles, videos, quizzes) tailored to the child's BMI status and age group.
4. **Intervention Activities** — Week-by-week activity plans with stimulation exercises and nutrition guides.
5. **Growth Monitoring** — Charts tracking weight, height, BMI, and waist-to-height ratio over a 24-week intervention program using WHO standards.
6. **Evaluation Reports** — Pre/post comparison clinical tables and compliance analytics.
7. **Admin Panel** — User management for healthcare workers to manage parent accounts and child data.
8. **Help Desk** — An FAQ-based chat widget for user support.

**Target Users:** Indonesian mothers of children aged 0–5 years, and community health workers (Kader Posyandu).

---

## Overall Project Health Score: 3 / 10

### Justification

This is a **frontend-only prototype** masquerading as a full-stack application. While the UI is polished and visually appealing (neubrutalism design), the entire application has **zero backend logic**, **zero database integration**, **zero authentication**, and **zero data persistence**. Every single page renders hardcoded/mock data. There are critical route conflicts, committed secrets, and no tests beyond Laravel's boilerplate. This codebase is not production-ready by any measure — it is a UI demo/mockup.

---

## Top 3 Risks Requiring Immediate Attention

| # | Risk | Severity | Impact |
|---|------|----------|--------|
| 1 | **No Authentication / Authorization** — All routes are public, including `/admin`. Any user can access the admin panel directly via URL. Login/register forms are cosmetic — they do nothing server-side. | **Critical** | Anyone on the internet can see all pages, including admin management. If deployed, complete data exposure and unauthorized access. |
| 2 | **Zero Data Persistence** — All data is hardcoded in React components or stored in `localStorage`. Nothing is saved to the database. The `users` table is the only migration. There are no models, controllers, or API endpoints for any domain entities (children, screenings, activities, etc.). | **Critical** | If deployed, users will lose all data on browser clear, cross-device use is impossible, and the app provides no actual functionality. |
| 3 | **Committed Secrets & Route Conflicts** — `APP_KEY` is committed in `.env` (which is in `.gitignore` but the file exists), duplicate route names (`/login` and `/register` are defined twice in `web.php` with conflicting handlers), and `SESSION_ENCRYPT=false`. | **High** | The duplicate routes will cause the later definition to silently override the earlier one, breaking expected navigation flows. The exposed APP_KEY enables session/cookie forgery if the repo is public. |
