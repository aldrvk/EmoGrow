# 04 — UI/UX Audit

## Overview

The UI is the strongest aspect of this project. The neubrutalism design is visually distinctive and well-executed on several pages. However, there are significant UX friction points that would impact user adoption, especially given the target audience (non-technical Indonesian mothers).

---

## Findings

| Finding | Severity | File/Line | Impact | Recommendation |
|---------|----------|-----------|--------|----------------|
| **Username hardcoded as "Ibu Sari"** — The Dashboard greets "Selamat Datang, Ibu Sari" regardless of who is logged in. This is a hardcoded string. | Medium | [Dashboard.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/Dashboard.tsx) L156 | Users will see someone else's name. Creates an impersonal, untrustworthy experience. | Fetch the authenticated user's name from the server via Inertia shared data. |
| **No confirmation before destructive actions** — Adding a child profile uses `Date.now()` as ID, but there's no delete functionality and no confirmation dialogs for any action. | Low | [Dashboard.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/Dashboard.tsx) L128–130 | Users can't undo accidental actions. | Add confirmation modals for all state-changing actions. Add delete/edit capability for child profiles. |
| **Mixed language UI copy** — Most labels are Indonesian ("Berat Badan", "Tinggi Badan") but several are English ("BMI Score", "Download Report (PDF)", "Overweight", "Step 2 of 2", "Merit"). | Medium | [ScreeningAnak.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/ScreeningAnak.tsx) L248, [ScreeningAnakResult.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/ScreeningAnakResult.tsx) L146–150, [Aktivitas.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/Aktivitas.tsx) L294 | Confusing for non-English-speaking mothers who are the primary users. Reduces trust in a healthcare context. | Translate all UI copy to Indonesian. Use a translation system (i18n) for consistency. |
| **"Download Report (PDF)" and "Export Grafik" buttons do nothing** — These buttons have no `onClick` handlers or link to any actual download functionality. | Medium | [ScreeningAnakResult.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/ScreeningAnakResult.tsx) L196–202, [ScreeningAnakDetail.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/ScreeningAnakDetail.tsx) L119–122 | Users click "Download" and nothing happens. This erodes trust, especially in a health context where parents expect to get their child's report. | Either implement PDF generation (using libraries like `dompdf` or `puppeteer`) or remove the buttons with a "Coming Soon" label. |
| **No form validation feedback** — The screening form uses HTML `required` attributes but no inline validation messages. The "Add Child" form only shows a generic `alert()` for age > 60 months. | Medium | [Dashboard.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/Dashboard.tsx) L122–125, [ScreeningAnak.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/ScreeningAnak.tsx) L72–73 | Users don't know why a form won't submit. Using `alert()` is jarring and non-informative. | Add inline validation messages below each field. Use a toast notification system instead of `alert()`. |
| **Admin panel has no RBAC visual distinction** — The admin panel is visually identical to the parent dashboard (same sidebar, header). There's no visual indicator that the user is in an administrative context. | Low | [AdminPanel.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/AdminPanel.tsx) L388–393 | Healthcare workers may not realize they're managing other people's data. | Add a distinctive admin header/banner or different color scheme for admin views. |
| **Progress bars and metrics show fake data** — "50% Selesai" is hardcoded on every PatientCard. "12.5 Jam Waktu Aktif" and "12.0 Kg Berat Badan" are hardcoded metrics. | High | [Dashboard.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/Dashboard.tsx) L51, L201–224 | Users see fake progress for their child. In a healthcare context, displaying inaccurate health data is ethically problematic and potentially harmful. | Remove fake metrics until real data is available. Show "Belum ada data" (No data yet) instead. |
| **Heatmap data is random** — The compliance heatmap in Monitoring.tsx uses `Math.random() > 0.25` to generate data. | High | [Monitoring.tsx](file:///Users/aldriknoel/EmoGrow/EmoGrow/resources/js/Pages/Monitoring.tsx) L73–79 | Every page refresh shows different "compliance" data. Users may make health decisions based on randomly generated data. | Replace with actual activity completion data from the database. |

---

## Top 5 UX Friction Points (User Drop-off Risks)

1. **Login doesn't work** — Users who register will find their accounts don't persist. On next visit, they have to "register" again. This will cause immediate abandonment.

2. **Screening data vanishes** — A parent who carefully fills out the screening form and sees results will lose everything if they clear their browser or switch devices. This is the core feature of the app, and it doesn't actually work.

3. **Buttons that do nothing** — "Download Report (PDF)", "Mulai Program Sekarang", "Export Grafik" — these CTAs promise functionality that doesn't exist. Users who click and get no response will lose trust.

4. **No progressive disclosure in the screening flow** — The two-step screening (form → results) works, but there's no way to go back and edit the input. The result page uses hardcoded data (e.g., "20.1" BMI in ScreeningAnakResult.tsx L146) instead of the values the user just entered.

5. **Admin panel is accessible to everyone** — If a parent stumbles onto `/admin`, they see a management panel with other people's (fake) data. This is both a security and trust issue.
