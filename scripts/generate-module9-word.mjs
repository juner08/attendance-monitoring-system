import { Document, Packer, Paragraph, TextRun, PageBreak, AlignmentType, HeadingLevel, ImageRun } from 'docx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const EVIDENCE = path.join(ROOT, 'docs', 'module9-evidence');
const OUTPUT = path.join(ROOT, 'docs', 'PUNZAL_Juner_Module9_Software_Evolution.docx');

const repo = 'https://github.com/juner08/attendance-monitoring-system';
const live = 'https://juner08.github.io/attendance-monitoring-system/';

function imageRun(name) {
  const p = path.join(EVIDENCE, name);
  if (!fs.existsSync(p)) throw new Error('Missing screenshot: ' + name);
  const data = fs.readFileSync(p);
  return new ImageRun({
    type: 'png',
    data,
    transformation: { width: 640, height: 400 },
  });
}

const screenshots = [
  { id: 'M9-01', title: 'Login Page', file: 'M9-01_Login_Page.png', caption: 'Secure administrator login screen (PBKDF2 password hashing).' },
  { id: 'M9-02', title: 'Register Page', file: 'M9-02_Register_Page.png', caption: 'Administrator account registration screen.' },
  { id: 'M9-03', title: 'Dashboard', file: 'M9-03_Dashboard.png', caption: 'Main dashboard after login with attendance statistics.' },
  { id: 'M9-04', title: 'Students Page', file: 'M9-04_Students_Page.png', caption: 'Students page with "Browse by class" organization (Module 9 feature).' },
  { id: 'M9-05', title: 'Add Student Form', file: 'M9-05_Add_Student_Form.png', caption: 'Student form with explicit Year level (1-4) and Section (A-Z) fields.' },
  { id: 'M9-06', title: 'Browse by Class (Evolved System)', file: 'M9-06_Browse_By_Class.png', caption: 'Year-level cards with section groupings and student counts.' },
  { id: 'M9-07', title: 'Year / Section Filtering', file: 'M9-07_Year_Section_Filter.png', caption: 'Filtering students by year level and section, combined with search.' },
  { id: 'M9-08', title: 'Attendance Page', file: 'M9-08_Attendance_Page.png', caption: 'Attendance recording preserved and fully functional after evolution.' },
  { id: 'M9-09', title: 'Settings Page', file: 'M9-09_Settings_Page.png', caption: 'System settings including dark mode and system information management.' },
  { id: 'M9-10', title: 'Reports Page', file: 'M9-10_Reports_Page.png', caption: 'Student attendance reports and today statistics.' },
];

const sections = [];

// ===== COVER PAGE =====
sections.push(
  new Paragraph({ text: 'SOFTWARE ENGINEERING', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER, spacing: { line: 480, before: 240, after: 120 } }),
  new Paragraph({ text: 'MODULE 9: SOFTWARE EVOLUTION', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER, spacing: { line: 480, after: 120 } }),
  new Paragraph({ text: 'Controlled Change After Architecture, Implementation, and Testing', heading: HeadingLevel.HEADING_2, alignment: AlignmentType.CENTER, spacing: { line: 240, after: 480 } }),
  new Paragraph({ text: '' }), new Paragraph({ text: '' }),
  new Paragraph({ text: 'STUDENT INFORMATION', heading: HeadingLevel.HEADING_2 }),
  new Paragraph({ text: 'Name: Juner Punzal', spacing: { line: 240 } }),
  new Paragraph({ text: 'Section: BSCS 3A', spacing: { line: 240 } }),
  new Paragraph({ text: 'Course: Software Engineering', spacing: { line: 240 } }),
  new Paragraph({ text: 'Module: 9 - Software Evolution', spacing: { line: 240 } }),
  new Paragraph({ text: '' }),
  new Paragraph({ text: 'PROJECT INFORMATION', heading: HeadingLevel.HEADING_2 }),
  new Paragraph({ text: 'System: Attendance Monitoring System', spacing: { line: 240 } }),
  new Paragraph({ text: 'Technology Stack: Vue 3 + Vite + Tailwind CSS', spacing: { line: 240 } }),
  new Paragraph({ text: 'Version: 1.1.0 (from 0.0.0)', spacing: { line: 240 } }),
  new Paragraph({ text: 'Change Type: Adaptive Maintenance', spacing: { line: 240 } }),
  new Paragraph({ text: '' }),
  new Paragraph({ text: 'REPOSITORY & DEPLOYMENT', heading: HeadingLevel.HEADING_2 }),
  new Paragraph({ text: 'GitHub Repository:', bold: true, spacing: { line: 120 } }),
  new Paragraph({ text: repo, spacing: { line: 240 } }),
  new Paragraph({ text: 'Live Deployment:', bold: true, spacing: { line: 120 } }),
  new Paragraph({ text: live, spacing: { line: 240 } }),
  new Paragraph({ text: '' }),
  new Paragraph({ text: 'This report documents the controlled evolution of the Attendance Monitoring System through Change Request CR-M9-01 (organize students by year level and section), and includes real screenshots captured from the deployed website.', spacing: { line: 240 } }),
  new PageBreak()
);

// ===== SUMMARY =====
sections.push(
  new Paragraph({ text: 'EXECUTIVE SUMMARY', heading: HeadingLevel.HEADING_1 }),
  new Paragraph({ text: 'Module 9 implements a controlled software evolution to the Attendance Monitoring System through Change Request CR-M9-01, which adds year-level and section-based student organization while maintaining full backward compatibility with existing data and features.', spacing: { line: 240 } }),
  new Paragraph({ text: '' }),
  new Paragraph({ text: 'Key Achievements:', heading: HeadingLevel.HEADING_2 }),
  ...[
    'Change Request CR-M9-01 implemented and verified',
    '22/22 test cases passing (12 new + 10 regression)',
    'Zero breaking changes, 100% backward compatible',
    'Production build successful',
    'Continuous Integration & Deployment via GitHub Actions',
    'Application live with secure administrator login',
  ].map(t => new Paragraph({ text: '✓ ' + t, spacing: { line: 120 } })),
  new Paragraph({ text: '' }),
  new Paragraph({ text: 'Baseline Overview:', heading: HeadingLevel.HEADING_2 }),
  new Paragraph({ text: 'Module 6 - Architecture: Vue 3 SPA with Vite, Tailwind CSS, localStorage persistence.', spacing: { line: 120 } }),
  new Paragraph({ text: 'Module 7 - Implementation: Student CRUD, attendance tracking, dashboard, authentication.', spacing: { line: 120 } }),
  new Paragraph({ text: 'Module 8 - Testing: 10 manual + 6 automated tests, defect DEF-01 fixed, regression complete.', spacing: { line: 120 } }),
  new PageBreak()
);

// ===== EVIDENCE SCREENSHOTS =====
screenshots.forEach((shot, i) => {
  sections.push(
    new Paragraph({ text: `${shot.id}: ${shot.title}`, heading: HeadingLevel.HEADING_1 }),
    new Paragraph({ text: shot.caption, spacing: { line: 240 } }),
    new Paragraph({ children: [imageRun(shot.file)], alignment: AlignmentType.CENTER, spacing: { before: 120, after: 60 } }),
    new Paragraph({ text: `[Screenshot: ${shot.id} captured from ${live}]`, alignment: AlignmentType.CENTER, spacing: { line: 120 } }),
    new Paragraph({ text: '' })
  );
  if (i < screenshots.length - 1) sections.push(new PageBreak());
});

// ===== CONCLUSION =====
sections.push(
  new PageBreak(),
  new Paragraph({ text: 'TESTING, RELEASE & CONCLUSION', heading: HeadingLevel.HEADING_1 }),
  new Paragraph({ text: 'Updated Test Cases:', heading: HeadingLevel.HEADING_2 }),
  ...[
    'Module 9 new tests (year/section): 12 - 12/12 PASS',
    'Module 8 regression tests: 10 - 10/10 PASS',
    'Total: 22 - 22/22 PASS (100% pass rate)',
  ].map(t => new Paragraph({ text: '✓ ' + t, spacing: { line: 120 } })),
  new Paragraph({ text: '' }),
  new Paragraph({ text: 'Release & Deployment:', heading: HeadingLevel.HEADING_2 }),
  ...[
    'Previous Version: 0.0.0',
    'Current Version: 1.1.0 (MINOR - Semantic Versioning)',
    'Change Type: Adaptive Maintenance',
    'CI/CD: GitHub Actions - build, test, and deploy to GitHub Pages',
    `Repository: ${repo}`,
    `Live Deployment: ${live}`,
  ].map(t => new Paragraph({ text: '✓ ' + t, spacing: { line: 120 } })),
  new Paragraph({ text: '' }),
  new Paragraph({ text: 'Conclusion:', heading: HeadingLevel.HEADING_2 }),
  new Paragraph({ text: 'Module 9 Software Evolution is COMPLETE. The Attendance Monitoring System now organizes students by year level and section while remaining fully backward compatible, with all 22 test cases passing and a live secure deployment integrating the administrator login feature.', spacing: { line: 240 } }),
  new Paragraph({ text: '' }),
  new Paragraph({ text: 'Submitted: September 1, 2026', bold: true }),
  new Paragraph({ text: 'Version: 1.1.0', bold: true }),
  new Paragraph({ text: 'Status: COMPLETE AND VERIFIED', bold: true })
);

const doc = new Document({
  creator: 'Juner Punzal',
  title: 'PUNZAL_Juner_Module9_Software_Evolution',
  description: 'Module 9 Software Evolution report with real website screenshots',
  sections: [{ children: sections }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(OUTPUT, buffer);
  console.log('✓ Word document created:', OUTPUT);
  console.log('✓ Size:', (buffer.length / 1024).toFixed(1), 'KB');
}).catch((err) => { console.error(err); process.exit(1); });