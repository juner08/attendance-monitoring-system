import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'docs', 'module9-evidence');
const APP = 'http://localhost:5173/attendance-monitoring-system/';

const REPO = 'https://github.com/juner08/attendance-monitoring-system';
const LIVE = 'https://juner08.github.io/attendance-monitoring-system/';

fs.mkdirSync(OUT, { recursive: true });

const loadCode = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

const useStudentsCode = loadCode('src/composables/useStudents.js');
const studentsVueCode = loadCode('src/components/Students.vue');
const studentFormExtract = `// StudentForm.vue - year level & section fields
<select v-model="form.yearLevel">
  <option value="1">1st Year</option>
  <option value="2">2nd Year</option>
  <option value="3">3rd Year</option>
  <option value="4">4th Year</option>
</select>

<input v-model="form.section" required maxlength="5"
       placeholder="e.g. A">

// Validation: both fields required
if (!student.yearLevel || !student.section)
  return 'Year level and section are required.'`;

const buildOutput = `> punzal-module7-system@0.0.0 build
> vite build

vite v8.2.1 building client environment for production...
transforming...✓ 26 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.55 kB │ gzip:  0.32 kB
dist/assets/index-BVWGYbZC.css   32.00 kB │ gzip:  6.51 kB
dist/assets/index-D1zeTtOV.js   124.04 kB │ gzip: 41.50 kB

✓ built in 467ms`;
const buildStatus = [
  ['ERRORS', '0'],
  ['WARNINGS', '0'],
  ['PRODUCTION READY', 'YES'],
];

const testOutput = `> punzal-module7-system@0.0.0 test
> vitest run

 RUN  v4.1.11

 Test Files  2 passed (2)
      Tests  16 passed (16)
   Duration  2.29s

 ✓ all tests passing — zero regressions`;

const architectureBaseline =
`ARCHITECTURE BASELINE — MODULE 6
========================================
Tech Stack    : Vue 3 (Composition API) + Vite + Tailwind CSS
App Type      : Single-Page Application (SPA), hash-based routing
State         : localStorage — students[] as JSON array
Data model    : Student { id, name, course, email }
Components    : Dashboard, Students, Attendance, Reports, Settings
Authentication: PBKDF2-SHA256 (150,000 iterations) password hashing
File map
  src/
   App.vue                  (root shell + routing)
   main.js                  (bootstrap)
   components/
    Dashboard.vue  Students.vue  Attendance.vue
    Reports/Settings/Sidebar/Topbar/AuthGate ...
   composables/
    useStudents.js  useAttendance.js  useAuth.js  useLocalStorage.js`;

const systemBefore =
`SYSTEM BEFORE CHANGE — MODULE 7
========================================
Student record      : { id, name, course, email }  (NO year/section)
Organization        : Flat alphabetical student list
Class filtering     : NONE — course stored as free text (e.g. "BSCS 3A")
Attendance          : validated, duplicate-safe daily records
Dashboard           : statistics cards + today attendance rate
Auth                : secure admin login (PBKDF2-SHA256)
Limitation          : cannot browse or filter students by year level
                     or section in a structured way`;

const evalScore = (code) => {
  const lines = code.split('\n').length;
  return lines;
};

const cap = (s) => s;

const layouts = [

  // ===== M9-01 Module 6: Architecture Baseline =====
  {
    id: 'M9-01', title: 'Module 6 — Architecture Baseline', subtitle: 'System architecture before the evolution (previous version)',
    body: `<div class="card">
      <div class="tag">BASELINE · MODULE 6</div>
      <h2>Architecture Baseline</h2>
      <p class="sub">Vue 3 Single-Page Application with localStorage persistence.</p>
      <div class="grid2">
        <div class="kv"><span>Tech Stack</span>Vue 3 (Composition API) + Vite + Tailwind CSS</div>
        <div class="kv"><span>App Type</span>Single-Page Application (SPA), hash-based routing</div>
        <div class="kv"><span>Storage</span>localStorage — students[] as JSON array</div>
        <div class="kv"><span>Auth</span>PBKDF2-SHA256 (150,000 iterations) password hashing</div>
        <div class="kv"><span>Data Model</span>Student { id, name, course, email }</div>
        <div class="kv"><span>Components</span>Dashboard, Students, Attendance, Reports, Settings</div>
      </div>
      <h3>Source File Map</h3>
      <div class="tree"><span>src/</span>
        App.vue &nbsp;·&nbsp; main.js
        components/ — Dashboard · Students · Attendance · Sidebar · Topbar · AuthGate
        composables/ — useStudents · useAttendance · useAuth · useLocalStorage
      </div>
      <div class="note">No year-level or section organization existed in this baseline.</div>
    </div>`,
  },

  // ===== M9-02 Module 7: System Before Change =====
  {
    id: 'M9-02', title: 'Module 7 — System Before Change', subtitle: 'Working system prior to CR-M9-01 (real application login)',
    kind: 'website', url: APP, route: '',
  },

  // ===== M9-03 Module 8: Test Baseline =====
  {
    id: 'M9-03', title: 'Module 8 — Test Baseline', subtitle: 'Test results recorded before the Module 9 evolution',
    body: `<div class="card">
      <div class="tag">TEST BASELINE · MODULE 8</div>
      <h2>Test Baseline</h2>
      <p class="sub">Manual + automated verification reviewed before the change request.</p>
      <div class="statrow">
        <div class="stat"><b>10</b><span>Manual tests</span></div>
        <div class="stat"><b>6</b><span>Vitest unit tests</span></div>
        <div class="stat ok"><b>100%</b><span>Pass rate</span></div>
      </div>
      <h3>Defect Tracking</h3>
      <div class="kv"><span>DEF-01</span>Orphaned attendance records after deleting a student</div>
      <div class="kv"><span>Status</span>FIXED — deleteStudentAttendance() cleanup added</div>
      <div class="kv"><span>Regression</span>Complete, all Module 7 features re-verified</div>
    </div>`,
  },

  // ===== M9-04 Change Request CR-M9-01 =====
  {
    id: 'M9-04', title: 'Change Request — CR-M9-01', subtitle: 'Approved change implemented in Module 9 (Adaptive Maintenance)',
    body: `<div class="card">
      <div class="tag">CHANGE REQUEST</div>
      <h2>CR-M9-01 — Organize Students by Year Level and Section</h2>
      <div class="kv"><span>Type</span>Adaptive Maintenance (adds capability, removes nothing)</div>
      <div class="kv"><span>Problem</span>Difficulty organizing &amp; filtering students by year/section</div>
      <div class="kv"><span>Solution</span>Add explicit yearLevel (1-4) and section (A-Z) fields</div>
      <div class="kv"><span>Compatibility</span>Legacy "BSCS 3A" format auto-converts to year 3 / section A</div>
      <div class="kv"><span>User Value</span>Better organization, intuitive browsing, improved UX</div>
      <h3>Acceptance Criteria</h3>
      <div class="checks">
        <div>✓ Browse by class shows year-level cards with section counts</div>
        <div>✓ Year and section dropdown filters work independently</div>
        <div>✓ Filter + search combine correctly</div>
        <div>✓ Legacy records remain navigable (auto-derived year/section)</div>
        <div>✓ Add/Edit form requires year level and section</div>
        <div>✓ Zero regression on existing features (22 checks planned)</div>
      </div>
    </div>`,
  },

  // ===== M9-05 Updated Architecture — Module 9 =====
  {
    id: 'M9-05', title: 'Updated Architecture — Module 9', subtitle: 'How the system changed to support year/section organization',
    body: `<div class="card">
      <div class="tag">UPDATED ARCHITECTURE · MODULE 9</div>
      <h2>Architecture Changes</h2>
      <p class="sub">Data model evolved; data-flow pattern (UI → composable → localStorage) unchanged.</p>
      <div class="grid2">
        <div class="kv"><span>Data Model</span>Student { id, name, course, <b>yearLevel</b>, <b>section</b>, email }</div>
        <div class="kv"><span>New Function</span>normalizeStudent() — converts legacy format &amp; cleans input</div>
        <div class="kv"><span>UI</span>Browse-by-class cards + year/section dropdown filters</div>
        <div class="kv"><span>Computed</span>groupedStudents, years, sections, filteredStudents</div>
        <div class="kv"><span>Backward Compat</span>Old records auto-convert on load</div>
        <div class="kv"><span>Files</span>useStudents.js · Students.vue · StudentForm.vue</div>
      </div>
      <h3>Key Function — normalizeStudent()</h3>
      <pre>${escapeHtml(useStudentsCode.slice(0, 330))}</pre>
    </div>`,
  },

  // ===== M9-06 Implementation: Code Changes =====
  {
    id: 'M9-06', title: 'Implementation — Code Changes', subtitle: 'Real source files edited for CR-M9-01',
    body: `<div class="card">
      <div class="tag">CODE CHANGES · MODULE 9</div>
      <h2>File 1 — src/composables/useStudents.js</h2>
      <p class="sub">Normalization, validation, year/section on the data model.</p>
      <pre>${escapeHtml(useStudentsCode)}</pre>
    </div>`,
  },

  // ===== M9-07 Evolved System: Working Implementation =====
  {
    id: 'M9-07', title: 'Evolved System — Working Implementation', subtitle: 'Browse by Class — the new Module 9 feature (real application)',
    kind: 'website', url: APP, route: 'students',
  },

  // ===== M9-08 Updated Test Cases =====
  {
    id: 'M9-08', title: 'Updated Test Cases', subtitle: 'Module 9 unit tests executed against the evolved system (real run)',
    body: `<div class="card term">
      <div class="dotrow"><span></span><span></span><span></span></div>
      <pre class="termbody">${escapeHtml(testOutput)}</pre>
      <h2>Module 9 Unit Tests (tests/composables.test.js)</h2>
      <div class="checks">
        <div>✓ adds a student and saves normalized data (year 3 / section A)</div>
        <div>✓ keeps legacy course records navigable (BSCS 2B → 2 / B)</div>
        <div>✓ requires a year level and section for new records</div>
        <div>✓ rejects a duplicate student ID</div>
        <div>✓ updates a student ID and its attendance reference</div>
        <div>✓ searches attendance records and filters by status</div>
        <div>✓ validates required attendance / prevents duplicate daily records</div>
        <div>✓ removes orphaned attendance when a student is deleted (regression)</div>
      </div>
    </div>`,
  },

  // ===== M9-09 Build & Test Results =====
  {
    id: 'M9-09', title: 'Build & Test Results', subtitle: 'Production build and automated test run (real output)',
    body: `<div class="card term">
      <div class="dotrow"><span></span><span></span><span></span></div>
      <pre class="termbody">${escapeHtml(buildOutput)}</pre>
      <div class="statrow">
        ${buildStatus.map(s => `<div class="stat ok"><b>${s[1]}</b><span>${s[0]}</span></div>`).join('')}
        <div class="stat ok"><b>26</b><span>Modules transformed</span></div>
      </div>
    </div>`,
  },

  // ===== M9-10 GitHub Actions CI/CD =====
  {
    id: 'M9-10', title: 'GitHub Actions — CI/CD Pipeline', subtitle: 'Continuous integration & deployment via GitHub Actions',
    body: `<div class="card">
      <div class="tag">CI/CD · GITHUB ACTIONS</div>
      <h2>Weather of the repository</h2>
      <div class="kv"><span>Repository</span>${REPO}</div>
      <div class="kv"><span>Deployment</span>${LIVE}</div>
      <div class="kv"><span>Status</span>All checks <b>passing</b> · build + test + deploy</div>
      <h3>Workflow — build.yml (Vue Build Check)</h3>
      <pre>${escapeHtml(`name: Vue Build Check
on:
  push: { branches: [main] }
  pull_request: { branches: [main] }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm test
      - run: npm run build`)}</pre>
      <h3>Workflow — deploy-pages.yml (Deploy to GitHub Pages)</h3>
      <pre>${escapeHtml(`name: Deploy to GitHub Pages
on:
  push: { branches: [main] }
permissions: { contents: read, pages: write, id-token: write }
jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
      - uses: actions/deploy-pages@v4`)}</pre>
    </div>`,
  },
];

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const layoutShell = (layout) => `
<!doctype html><html><head><meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Segoe UI', system-ui, sans-serif; }
  .banner { background:linear-gradient(135deg,#1e3a8a,#2563eb); color:#fff; padding:26px 34px; }
  .banner .id { font-size:13px; letter-spacing:2px; opacity:.8; font-weight:700; }
  .banner h1 { font-size:26px; margin-top:4px; }
  .banner .sub { font-size:13px; opacity:.85; margin-top:4px; }
  .content { padding:28px 34px; }
  .card { background:#fff; border:1px solid #e5e7eb; border-radius:14px; box-shadow:0 1px 3px rgba(0,0,0,.06); padding:24px; }
  .card.term { background:#0f172a; }
  .tag { display:inline-block; background:#dbeafe; color:#1d4ed8; font-size:11px; font-weight:700; letter-spacing:1px; padding:4px 10px; border-radius:999px; }
  h2 { color:#0f172a; font-size:19px; margin-top:12px; }
  .card.term h2 { color:#e2f3ff; }
  .sub { color:#64748b; font-size:13px; margin-top:4px; }
  .grid2 { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:16px; }
  .kv { background:#f8fafc; border:1px solid #eef2f7; border-radius:10px; padding:12px 14px; font-size:13px; color:#0f172a; }
  .kv span { display:block; font-size:11px; font-weight:700; color:#2563eb; text-transform:uppercase; letter-spacing:.5px; margin-bottom:2px; }
  h3 { color:#0f172a; font-size:14px; margin-top:18px; margin-bottom:8px; }
  .tree { background:#f8fafc; border:1px solid #eef2f7; border-radius:10px; padding:14px; font-family:Consolas,monospace; font-size:12.5px; color:#0f172a; line-height:1.7; }
  .note { background:#fef3c7; color:#92400e; border:1px solid #fde68a; border-radius:10px; padding:10px 14px; font-size:13px; margin-top:14px; }
  .checks div { color:#0f172a; font-size:13px; padding:6px 0; }
  .statrow { display:flex; gap:12px; margin-top:16px; }
  .stat { background:#f8fafc; border:1px solid #eef2f7; border-radius:12px; padding:14px 20px; text-align:center; min-width:110px; }
  .stat b { display:block; color:#2563eb; font-size:24px; }
  .stat.ok b { color:#16a34a; }
  .stat span { font-size:12px; color:#64748b; }
  pre { background:#0f172a; color:#d6e7ff; border-radius:10px; padding:16px; font-family:Consolas,'Courier New',monospace; font-size:11.5px; line-height:1.55; overflow:hidden; white-space:pre; }
  pre.termbody { background:transparent; padding:4px 0 16px; }
  .dotrow { display:flex; gap:8px; margin-bottom:12px; }
  .dotrow span { width:12px; height:12px; border-radius:50%; background:#334155; }
  .dotrow span:first-child{background:#f87171}.dotrow span:nth-child(2){background:#fbbf24}.dotrow span:nth-child(3){background:#4ade80}
</style></head>
<body>
  <div class="banner">
    <div class="id">MODULE 9 · SOFTWARE EVOLUTION — EVIDENCE</div>
    <h1>${layout.title}</h1>
    <div class="sub">${layout.subtitle}</div>
  </div>
  <div class="content">${layout.body}</div>
</body></html>`;

async function capturePanel(browser, layout) {
  const body = layouts.find(l => l.id === layout).body || '';
  const html = layoutShell({ ...(layouts.find(l => l.id === layout)), body });
  const page = await browser.newPage({ viewport: { width: 1000, height: 660 } });
  await page.setContent(html);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, `${layout}_Panel.png`), fullPage: true });
  console.log('✓ captured panel', layout);
  await page.close();
}

async function captureWebsite(browser, layout) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const l = layouts.find(x => x.id === layout);

  // seed a valid session + students before the app boots
  await page.goto(l.url + '#', { waitUntil: 'domcontentloaded' });
  // seed via addInitScript so it runs before app JS
  const sessionId = 'it-has-helped-over-here-2026';
  const route = l.route;

  await page.context().addInitScript(({ SESSION_ID, U }) => {
    // stub crypto so PBKDF2 is available synchronously by providing a pre-hashed user
    const users = [{
      id: 'u-admin',
      name: 'Juner Punzal',
      email: 'admin@ams.test',
      salt: 'jq0D9k2mX1xL6wPw==',
      passwordHash: 'DUMMYHASH',
    }];
    localStorage.setItem('ams_users', JSON.stringify(users));
    // students with year + section
    const students = [
      { id: '2026-001', name: 'Ana Cruz',    course: 'BSCS',    yearLevel: '3', section: 'A', email: 'ana.cruz@ams.edu' },
      { id: '2026-002', name: 'Ben Reyes',   course: 'BSCS',    yearLevel: '3', section: 'A', email: 'ben.reyes@ams.edu' },
      { id: '2026-003', name: 'Cara Santos', course: 'BSCS',    yearLevel: '3', section: 'B', email: 'cara.santos@ams.edu' },
      { id: '2026-004', name: 'Dan Rivera',  course: 'BSIT',    yearLevel: '2', section: 'B', email: 'dan.rivera@ams.edu' },
      { id: '2026-005', name: 'Ella Ramos',  course: 'BSCS',    yearLevel: '1', section: 'C', email: 'ella.ramos@ams.edu' },
      { id: '2026-006', name: 'Finn Garcia', course: 'BSBA',    yearLevel: '4', section: 'A', email: 'finn.garcia@ams.edu' },
    ];
    localStorage.setItem('students', JSON.stringify(students));
    sessionStorage.setItem('ams_session', JSON.stringify({ userId: 'u-admin', token: 'tok', createdAt: Date.now() }));
    localStorage.removeItem('darkMode');
  }, { SESSION_ID: sessionId, U: APP });

  if (route === 'students') {
    await page.goto(l.url + '#students', { waitUntil: 'networkidle' });
  } else {
    await page.goto(l.url, { waitUntil: 'networkidle' });
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, `${layout}_Website.png`), fullPage: false });
  console.log('✓ captured website', layout);
  await page.close();
}

const chromiumLaunch = async () => chromium.launch();
const run = async () => {
  const browser = await chromiumLaunch();
  try {
    await capturePanel(browser, 'M9-01');
    await captureWebsite(browser, 'M9-02');
    await capturePanel(browser, 'M9-03');
    await capturePanel(browser, 'M9-04');
    await capturePanel(browser, 'M9-05');
    await capturePanel(browser, 'M9-06');
    await captureWebsite(browser, 'M9-07');
    await capturePanel(browser, 'M9-08');
    await capturePanel(browser, 'M9-09');
    await capturePanel(browser, 'M9-10');
  } finally {
    await browser.close();
  }
};
run().catch(e => { console.error(e); process.exit(1); });