# Attendance Monitoring System

A Vue 3 single-page application for managing students and their daily attendance records. Data is stored in the browser so it remains available after a refresh.

## Features

- Dashboard with daily attendance statistics and attendance rate
- Student create, search, edit, and delete operations
- Attendance create, search, filter, edit, and delete operations
- Duplicate-record prevention for the same student and date
- Persistent browser storage using `localStorage`
- Attendance reports per student
- Configurable system details and dark mode
- Shareable hash navigation, such as `/#attendance`

## Module 9 - Software Evolution

**Change request:** CR-M9-01 — Adaptive maintenance: organize students by year level and section while preserving older stored records.

- Student records now keep `yearLevel` and `section` values for class-based browsing and filtering.
- Older records in the existing `BSCS 3A` format are read safely and derive Year 3 / Section A when loaded.
- The Students page provides year-level and section cards plus matching filters.
- The automated tests cover legacy-record compatibility and the required year/section validation; `npm run test` and `npm run build` are used for verification.

**Release:** 0.1.0 — adaptive, backward-compatible enhancement. The app remains a browser-local prototype; authentication and records are stored in browser storage and are not a replacement for server-side security.

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown by Vite, usually `http://localhost:5173`.

## Build for production

```bash
npm run build
```

## Project structure

- `src/components` — reusable Vue interface components
- `src/composables` — reusable student, attendance, and storage logic
- `src/App.vue` — application layout, navigation, reports, and settings

## Technologies

- Vue 3 Composition API
- Vite
- Tailwind CSS
