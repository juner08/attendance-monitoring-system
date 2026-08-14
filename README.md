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
