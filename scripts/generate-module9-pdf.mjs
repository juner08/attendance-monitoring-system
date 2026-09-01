import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const EVIDENCE = path.join(ROOT, 'docs', 'module9-evidence');
const OUTPUT = path.join(ROOT, 'docs', 'PUNZAL_Juner_Module9_Software_Evolution.pdf');

function imgBase64(name) {
  const p = path.join(EVIDENCE, name);
  const buf = fs.readFileSync(p);
  return `data:image/png;base64,${buf.toString('base64')}`;
}

const repo = 'https://github.com/juner08/attendance-monitoring-system';
const live = 'https://juner08.github.io/attendance-monitoring-system/';

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @page { size: A4; margin: 18mm 16mm; }
  * { box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1f2937; margin: 0; line-height: 1.5; }
  .page { page-break-after: always; }
  .page:last-child { page-break-after: auto; }
  h1 { font-size: 24pt; margin: 0 0 4pt; }
  h2 { font-size: 16pt; color: #1d4ed8; border-bottom: 2px solid #bfdbfe; padding-bottom: 4pt; margin: 18pt 0 8pt; }
  h3 { font-size: 12.5pt; margin: 12pt 0 4pt; }
  .center { text-align: center; }
  .cover { text-align: center; padding-top: 40pt; }
  .cover h1 { font-size: 28pt; color: #1e3a8a; }
  .cover .sub { font-size: 14pt; color: #475569; margin: 8pt 0 30pt; }
  .cover .block { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8pt; padding: 14pt 20pt; margin: 10pt auto; width: 78%; text-align: left; }
  .cover .block h3 { margin-top: 0; color: #1d4ed8; }
  table { border-collapse: collapse; width: 100%; font-size: 10pt; margin: 6pt 0; }
  th, td { border: 1px solid #cbd5e1; padding: 6pt 8pt; text-align: left; }
  th { background: #eff6ff; }
  .badge { display: inline-block; background: #dcfce7; color: #166534; border-radius: 4pt; padding: 2pt 8pt; font-weight: 600; }
  .shot { margin: 8pt 0 6pt; }
  .shot img { width: 100%; border: 1px solid #e2e8f0; border-radius: 4pt; }
  .caption { font-size: 9pt; color: #64748b; margin: 2pt 0 14pt; }
  ul { margin: 4pt 0; }
  li { margin: 2pt 0; }
  .code { background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 4pt; padding: 8pt 10pt; font-family: Consolas, monospace; font-size: 9pt; white-space: pre-wrap; }
  .link { color: #1d4ed8; word-break: break-all; }
  .small { font-size: 9pt; color: #64748b; }
  .pass { color: #166534; font-weight: 600; }
  .grid2 { display: flex; gap: 10pt; }
  .grid2 > div { flex: 1; }
</style>
</head>
<body>

<!-- COVER -->
<div class="page cover">
  <h1>SOFTWARE ENGINEERING</h1>
  <h1 style="color:#1d4ed8;">MODULE 9: SOFTWARE EVOLUTION</h1>
  <div class="sub">Controlled Change After Architecture, Implementation, and Testing</div>

  <div class="block">
    <h3>STUDENT INFORMATION</h3>
    <p><b>Name:</b> Juner Punzal</p>
    <p><b>Section:</b> BSCS 3A</p>
    <p><b>Course:</b> Software Engineering</p>
    <p><b>Module:</b> 9 - Software Evolution</p>
  </div>

  <div class="block">
    <h3>PROJECT INFORMATION</h3>
    <p><b>System:</b> Attendance Monitoring System</p>
    <p><b>Technology Stack:</b> Vue 3 + Vite + Tailwind CSS</p>
    <p><b>Version:</b> 1.1.0 (from 0.0.0)</p>
    <p><b>Change Type:</b> Adaptive Maintenance</p>
  </div>

  <div class="block">
    <h3>REPOSITORY &amp; DEPLOYMENT</h3>
    <p><b>GitHub Repository:</b><br><span class="link">${repo}</span></p>
    <p><b>Live Deployment:</b><br><span class="link">${live}</span></p>
  </div>
</div>

<!-- SUMMARY -->
<div class="page">
  <h2>1. Executive Summary</h2>
  <p>Module 9 implements a controlled software evolution to the Attendance Monitoring System through Change Request <b>CR-M9-01</b>, which adds year-level and section-based student organization while maintaining full backward compatibility with existing data and features.</p>
  <h3>Key Achievements</h3>
  <ul>
    <li>Change Request CR-M9-01 implemented and verified</li>
    <li>22 test cases executed, <b>22/22 PASSING</b> (100% pass rate)</li>
    <li>Zero breaking changes, 100% backward compatible</li>
    <li>Production build successful</li>
    <li>Continuous Integration &amp; Deployment via GitHub Actions</li>
    <li>Application live with secure login (PBKDF2 password hashing)</li>
  </ul>

  <h2>2. Baseline: Modules 6, 7, and 8</h2>
  <h3>Module 6 - Architecture</h3>
  <ul>
    <li>Vue 3 Single-Page Application (Composition API)</li>
    <li>Vite build tool, Tailwind CSS styling</li>
    <li>Browser localStorage for data persistence</li>
    <li>Primary entity: <code>Student { id, name, course, email }</code></li>
  </ul>
  <h3>Module 7 - Implementation</h3>
  <ul>
    <li>User authentication and authorization (secure session)</li>
    <li>Student CRUD operations and attendance tracking</li>
    <li>Dashboard with statistics, responsive mobile design</li>
  </ul>
  <h3>Module 8 - Testing</h3>
  <ul>
    <li>10 manual test cases and 6 automated unit tests (Vitest)</li>
    <li>Defect DEF-01 identified and corrected (orphaned attendance)</li>
    <li>Regression testing: all features verified working</li>
  </ul>
</div>

<!-- EVIDENCE M9-01..M9-05 -->
<div class="page">
  <h2>3. Evidence Screenshots (from the live website)</h2>
  <p class="small">All screenshots below were captured from the deployed application with the administrator login feature active (repository <span class="link">${repo}</span>).</p>

  <h3>M9-01: Login Page</h3>
  <div class="shot"><img src="${imgBase64('M9-01_Login_Page.png')}"></div>
  <p class="caption">The secure administrator login screen (secure password hashing).</p>

  <h3>M9-02: Register Page</h3>
  <div class="shot"><img src="${imgBase64('M9-02_Register_Page.png')}"></div>
  <p class="caption">Administrator account registration screen.</p>

  <h3>M9-03: Dashboard</h3>
  <div class="shot"><img src="${imgBase64('M9-03_Dashboard.png')}"></div>
  <p class="caption">Main dashboard after login showing attendance statistics.</p>

  <h3>M9-04: Students Page</h3>
  <div class="shot"><img src="${imgBase64('M9-04_Students_Page.png')}"></div>
  <p class="caption">Students page with the "Browse by class" year and section organization (Module 9 feature).</p>

  <h3>M9-05: Add Student Form</h3>
  <div class="shot"><img src="${imgBase64('M9-05_Add_Student_Form.png')}"></div>
  <p class="caption">Student form with explicit Year level (1-4) and Section (A-Z) fields.</p>
</div>

<!-- EVIDENCE M9-06..M9-10 -->
<div class="page">
  <h3>M9-06: Browse by Class (Evolved System)</h3>
  <div class="shot"><img src="${imgBase64('M9-06_Browse_By_Class.png')}"></div>
  <p class="caption">Year-level cards with section groupings and student counts (adaptive evolution).</p>

  <h3>M9-07: Year / Section Filtering</h3>
  <div class="shot"><img src="${imgBase64('M9-07_Year_Section_Filter.png')}"></div>
  <p class="caption">Filtering students by year level and section, combined with search.</p>

  <h3>M9-08: Attendance Page</h3>
  <div class="shot"><img src="${imgBase64('M9-08_Attendance_Page.png')}"></div>
  <p class="caption">Attendance recording preserved and fully functional after evolution.</p>

  <h3>M9-09: Settings Page</h3>
  <div class="shot"><img src="${imgBase64('M9-09_Settings_Page.png')}"></div>
  <p class="caption">System settings including dark mode and system information management.</p>

  <h3>M9-10: Reports Page</h3>
  <div class="shot"><img src="${imgBase64('M9-10_Reports_Page.png')}"></div>
  <p class="caption">Student attendance reports and today's statistics.</p>
</div>

<!-- TEST & DEPLOY -->
<div class="page">
  <h2>4. Updated Test Cases</h2>
  <table>
    <tr><th>Category</th><th>Count</th><th>Status</th></tr>
    <tr><td>Module 9 new tests (year/section)</td><td>12</td><td class="pass">12/12 PASS</td></tr>
    <tr><td>Module 8 regression tests</td><td>10</td><td class="pass">10/10 PASS</td></tr>
    <tr><td><b>Total</b></td><td><b>22</b></td><td class="pass">22/22 PASS (100%)</td></tr>
  </table>

  <h2>5. Release &amp; Deployment</h2>
  <table>
    <tr><th>Attribute</th><th>Value</th></tr>
    <tr><td>Previous Version</td><td>0.0.0</td></tr>
    <tr><td>Current Version</td><td>1.1.0 (MINOR - Semantic Versioning)</td></tr>
    <tr><td>Change Type</td><td>Adaptive Maintenance</td></tr>
    <tr><td>CI/CD</td><td>GitHub Actions - build + test + deploy to Pages</td></tr>
    <tr><td>Repository</td><td class="link">${repo}</td></tr>
    <tr><td>Live Deployment</td><td class="link">${live}</td></tr>
  </table>

  <div class="code">✓ Production build successful
✓ Continuous Integration (build.yml): runs tests + build on push
✓ Continuous Deployment (deploy-pages.yml): auto-deploys dist/ to GitHub Pages
✓ Build errors: 0   Warnings: 0   Status: Production ready</div>

  <h2>6. Conclusion</h2>
  <p>Module 9 Software Evolution is <b>COMPLETE</b>. The Attendance Monitoring System now organizes students by year level and section while remaining fully backward compatible, with all 22 test cases passing and a live secure deployment integrating the administrator login feature.</p>
  <p><span class="badge">COMPLETE AND VERIFIED</span> &nbsp; Version 1.1.0 &nbsp; September 1, 2026</p>
  <p class="small">Student: Juner Punzal &middot; BSCS 3A &middot; <span class="link">${repo}</span></p>
</div>

</body>
</html>`;

async function main() {
  // Verify all screenshots exist
  const names = ['M9-01_Login_Page.png','M9-02_Register_Page.png','M9-03_Dashboard.png','M9-04_Students_Page.png','M9-05_Add_Student_Form.png','M9-06_Browse_By_Class.png','M9-07_Year_Section_Filter.png','M9-08_Attendance_Page.png','M9-09_Settings_Page.png','M9-10_Reports_Page.png'];
  for (const n of names) {
    if (!fs.existsSync(path.join(EVIDENCE, n))) {
      throw new Error('Missing screenshot: ' + n);
    }
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.pdf({
    path: OUTPUT,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  });
  await browser.close();
  console.log('✓ PDF created:', OUTPUT);
  console.log('✓ Size:', (fs.statSync(OUTPUT).size / 1024).toFixed(1), 'KB');
}

main().catch((e) => { console.error(e); process.exit(1); });
