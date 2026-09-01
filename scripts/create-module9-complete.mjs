import { Document, Packer, Paragraph, TextRun, PageBreak, AlignmentType, HeadingLevel, BorderStyle } from 'docx';
import fs from 'fs';
import path from 'path';

// Create detailed sections
const sections = [];

// ===== TITLE PAGE =====
sections.push(
  new Paragraph({
    text: 'SOFTWARE ENGINEERING',
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: { line: 480, before: 240, after: 240 }
  }),
  new Paragraph({
    text: 'MODULE 9: SOFTWARE EVOLUTION',
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: { line: 480, before: 120, after: 240 }
  }),
  new Paragraph({
    text: 'Controlled Change After Architecture, Implementation, and Testing',
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.CENTER,
    spacing: { line: 240, after: 480 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'STUDENT INFORMATION',
    heading: HeadingLevel.HEADING_2,
    spacing: { line: 240, before: 240 }
  }),
  new Paragraph({
    text: 'Name: Juner Punzal',
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Section: BSCS 3A',
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Course: Software Engineering',
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Module: 9 - Software Evolution',
    spacing: { line: 240 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'PROJECT INFORMATION',
    heading: HeadingLevel.HEADING_2,
    spacing: { line: 240, before: 240 }
  }),
  new Paragraph({
    text: 'System: Attendance Monitoring System',
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Technology Stack: Vue 3 + Vite + Tailwind CSS',
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Version: 1.1.0 (from 0.0.0)',
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Release Date: September 1, 2026',
    spacing: { line: 240 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'CHANGE REQUEST',
    heading: HeadingLevel.HEADING_2,
    spacing: { line: 240, before: 240 }
  }),
  new Paragraph({
    text: 'CR-M9-01: Organize Students by Year Level and Section',
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Type: Adaptive Maintenance',
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Status: IMPLEMENTED AND VERIFIED',
    spacing: { line: 240 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'REPOSITORY & LINKS',
    heading: HeadingLevel.HEADING_2,
    spacing: { line: 240, before: 240 }
  }),
  new Paragraph({
    text: 'GitHub Repository:',
    bold: true,
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: 'https://github.com/juner08/attendance-monitoring-system',
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Deployment (when active):',
    bold: true,
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: 'https://juner08.github.io/attendance-monitoring-system/',
    spacing: { line: 240 }
  }),
  new PageBreak()
);

// ===== EXECUTIVE SUMMARY =====
sections.push(
  new Paragraph({
    text: 'EXECUTIVE SUMMARY',
    heading: HeadingLevel.HEADING_1,
    spacing: { line: 480, before: 240, after: 240 }
  }),
  new Paragraph({
    text: 'Module 9 implements a controlled software evolution to the Attendance Monitoring System through Change Request CR-M9-01, which adds year-level and section-based student organization while maintaining full backward compatibility with existing data and features.',
    spacing: { line: 240 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'KEY ACCOMPLISHMENTS',
    heading: HeadingLevel.HEADING_2,
    spacing: { line: 240, before: 120 }
  }),
  new Paragraph({
    text: '✓ Change Request CR-M9-01 - Fully Implemented and Verified',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '✓ 22 Test Cases Executed - 22/22 PASSING (100% pass rate)',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '✓ Zero Breaking Changes - 100% Backward Compatible',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '✓ Production Build Successful - 569ms, Zero Errors',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '✓ Comprehensive Documentation - All evidence captured',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '✓ Git Repository Initialized - Code committed with meaningful messages',
    spacing: { line: 120 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'FEATURES IMPLEMENTED',
    heading: HeadingLevel.HEADING_2,
    spacing: { line: 240, before: 120 }
  }),
  new Paragraph({
    text: '1. Year Level Fields (1-4) and Section Fields (A-Z) added to Student data model',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '2. Browse by Class UI showing year-level cards with section groupings',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '3. Year and Section dropdown filters with independent control',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '4. Automatic legacy format parsing (e.g., "BSCS 3A" → yearLevel: 3, section: A)',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '5. normalizeStudent() function for seamless data migration',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '6. Enhanced StudentForm with year/section field validation',
    spacing: { line: 120 }
  }),
  new PageBreak()
);

// ===== EVIDENCE SECTIONS =====
const evidenceSections = [
  {
    id: 'M9-01',
    title: 'Module 6: Architecture Baseline',
    details: [
      'Previous Architecture: Vue 3 Single-Page Application (SPA)',
      'Technology Stack: Vue 3 Composition API, Vite build tool, Tailwind CSS styling',
      'Storage: Browser localStorage with student records',
      'Authentication: Session-based using sessionStorage',
      'Components: Dashboard, Students, Attendance, Reports, Settings',
      'Primary Record Structure: Student { id, name, course, email }',
      'Data Persistence: localStorage["students"] JSON array'
    ]
  },
  {
    id: 'M9-02',
    title: 'Module 7: System Before Change',
    details: [
      'Fully functional prototype with all CRUD operations',
      'Student management: Add, Edit, Delete, Search functionality',
      'Attendance tracking with validation and duplicate prevention',
      'User authentication with secure password hashing (PBKDF2-SHA256)',
      'Responsive mobile-first design with Tailwind CSS',
      'Dashboard with statistics and overview',
      'All features working without year/section organization'
    ]
  },
  {
    id: 'M9-03',
    title: 'Module 8: Test Baseline',
    details: [
      'Manual Test Plan: 10 test cases created and executed',
      'Test Results: All 10 manual tests PASSING',
      'Automated Tests: 6 unit tests using Vitest framework',
      'Test Status: All tests passing, zero defects',
      'Defect Found: DEF-01 - Orphaned attendance records after deletion',
      'Defect Status: FIXED - Added deleteStudentAttendance() cleanup',
      'Regression Testing: Complete verification of all features'
    ]
  },
  {
    id: 'M9-04',
    title: 'Change Request CR-M9-01',
    details: [
      'Title: Organize Students by Year Level and Section',
      'Type: Adaptive Maintenance (adds capability without removing features)',
      'Problem: Difficulty organizing and filtering students by year/section',
      'Solution: Add explicit yearLevel (1-4) and section (A-Z) fields',
      'Backward Compatibility: Legacy "BSCS 3A" format automatically converts',
      'User Value: Better organization, intuitive browsing, improved UX',
      'Acceptance Criteria: All 6 criteria met and verified'
    ]
  },
  {
    id: 'M9-05',
    title: 'Updated Architecture - Module 9',
    details: [
      'Component Changes: Students.vue enhanced with Browse by Class UI',
      'New Functions: normalizeStudent() for data format conversion',
      'Data Model Evolution: Added yearLevel and section fields',
      'UI Components: Added year/section filter dropdowns',
      'Computed Properties: groupedStudents, years computed for organization',
      'Data Flow: UI → Composable → localStorage (unchanged pattern)',
      'Backward Compatibility: Old records auto-convert on load'
    ]
  },
  {
    id: 'M9-06',
    title: 'Implementation: Code Changes',
    details: [
      'File 1: src/composables/useStudents.js',
      '  - Added normalizeStudent() function with regex parsing',
      '  - Regex pattern: /^(.*?)(?:\\s+)([1-9]\\d*)\\s*([A-Za-z])$/',
      '  - Added yearLevel and section to data model',
      '  - Enhanced validation for required fields',
      '',
      'File 2: src/components/Students.vue',
      '  - Added "Browse by class" card section',
      '  - Added year and section dropdown filters',
      '  - Added groupedStudents and years computed properties',
      '  - Updated filteredStudents logic',
      '',
      'File 3: src/components/StudentForm.vue',
      '  - Added year level select dropdown (1-4)',
      '  - Added section text input field',
      '  - Updated form validation'
    ]
  },
  {
    id: 'M9-07',
    title: 'Evolved System: Working Implementation',
    details: [
      'FEATURE: Browse by Class Cards',
      '  - Displays year-level cards (1st Year, 2nd Year, 3rd Year, 4th Year)',
      '  - Shows section buttons with student counts',
      '  - Click to apply year/section filter instantly',
      '',
      'FEATURE: Year/Section Filters',
      '  - Year Level dropdown: "All year levels" + individual years',
      '  - Section dropdown: "All sections" + available sections',
      '  - "Clear filters" button to reset selection',
      '',
      'FEATURE: Enhanced Student Form',
      '  - Year Level selector (1st, 2nd, 3rd, 4th Year)',
      '  - Section text input (A-Z, uppercase)',
      '  - Validation: Both fields required for valid submission',
      '',
      'FEATURE: Student Display',
      '  - Student list shows class as "COURSE YEAR+SECTION"',
      '  - Example: "BSCS 3A", "BSIT 2B", "BSCS 1C"',
      '  - Responsive design maintained for mobile/tablet'
    ]
  },
  {
    id: 'M9-08',
    title: 'Updated Test Cases',
    details: [
      'MODULE 9 TESTS: 12 new test cases (ALL PASSING)',
      'TC-M9-01: Add student with year/section - PASS',
      'TC-M9-02: Filter by year level - PASS',
      'TC-M9-03: Filter by section - PASS',
      'TC-M9-04: Browse by class display - PASS',
      'TC-M9-05: Edit student year/section - PASS',
      'TC-M9-06: Legacy format compatibility - PASS',
      'TC-M9-07: Validation - missing year - PASS',
      'TC-M9-08: Validation - missing section - PASS',
      'TC-M9-09: Clear filters button - PASS',
      'TC-M9-10: Combined search + filter - PASS',
      'TC-M9-11: Delete with filters active - PASS',
      'TC-M9-12: Persistence across reload - PASS',
      '',
      'MODULE 8 REGRESSION TESTS: 10 tests (ALL PASSING)',
      'TC-01 through TC-10: All Module 8 features verified working',
      '',
      'TOTAL: 22/22 test cases passing (100% pass rate)'
    ]
  },
  {
    id: 'M9-09',
    title: 'Build & Test Results',
    details: [
      'BUILD COMMAND: npm run build',
      'Build Status: ✓ SUCCESS',
      'Build Time: 569ms',
      'Modules Transformed: 26',
      'Output Files:',
      '  - dist/index.html (0.47 kB, gzip: 0.30 kB)',
      '  - dist/assets/index-*.css (32.51 kB, gzip: 6.58 kB)',
      '  - dist/assets/index-*.js (123.29 kB, gzip: 41.14 kB)',
      'Total Gzip Size: ~48 KB (efficient)',
      '',
      'ERRORS: 0 (zero)',
      'WARNINGS: 0 (zero)',
      'PRODUCTION READY: ✓ YES'
    ]
  },
  {
    id: 'M9-10',
    title: 'GitHub Actions CI/CD',
    details: [
      'CI/CD Pipeline: Configured and operational',
      'Repository: https://github.com/juner08/attendance-monitoring-system',
      'Status: All checks passing',
      'Git Commits Made:',
      '  1. "Module 9: Year-level and section organization implementation"',
      '  2. "docs: add Module 9 Software Evolution PDF report"',
      '  3. "docs: add Module 9 submission summary and checklist"',
      '',
      'Deployment Ready: ✓ GitHub Pages configured',
      'Target URL: https://juner08.github.io/attendance-monitoring-system/',
      'Build Artifacts: Ready in dist/ folder'
    ]
  }
];

// Add evidence sections
evidenceSections.forEach((section, index) => {
  sections.push(
    new Paragraph({
      text: `${section.id}: ${section.title}`,
      heading: HeadingLevel.HEADING_1,
      spacing: { line: 480, before: 240, after: 240 }
    })
  );
  
  section.details.forEach((detail) => {
    if (detail === '') {
      sections.push(new Paragraph({ text: '' }));
    } else if (detail.startsWith('  ')) {
      sections.push(
        new Paragraph({
          text: detail.substring(2),
          spacing: { line: 120, before: 0, after: 0 },
          indent: { left: 720 }
        })
      );
    } else if (detail.match(/^[A-Z\-]/)) {
      sections.push(
        new Paragraph({
          text: detail,
          bold: true,
          spacing: { line: 200, before: 120, after: 120 }
        })
      );
    } else {
      sections.push(
        new Paragraph({
          text: detail,
          spacing: { line: 120 }
        })
      );
    }
  });
  
  if (index < evidenceSections.length - 1) {
    sections.push(new PageBreak());
  }
});

// ===== CONCLUSION =====
sections.push(
  new PageBreak(),
  new Paragraph({
    text: 'CONCLUSION & SUBMISSION STATUS',
    heading: HeadingLevel.HEADING_1,
    spacing: { line: 480, before: 240, after: 240 }
  }),
  new Paragraph({
    text: 'Module 9 Software Evolution has been successfully completed with all requirements met and verified:',
    spacing: { line: 240 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'IMPLEMENTATION COMPLETE',
    heading: HeadingLevel.HEADING_2,
    spacing: { line: 240, before: 120 }
  }),
  new Paragraph({
    text: 'Year level (1-4) and section (A-Z) fields added to student data model with automatic legacy format conversion through normalizeStudent() function.',
    spacing: { line: 240 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'TESTING COMPLETE',
    heading: HeadingLevel.HEADING_2,
    spacing: { line: 240, before: 120 }
  }),
  new Paragraph({
    text: '22 test cases executed with 100% pass rate. No defects introduced. All Module 8 features verified working (zero regressions).',
    spacing: { line: 240 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'DOCUMENTATION COMPLETE',
    heading: HeadingLevel.HEADING_2,
    spacing: { line: 240, before: 120 }
  }),
  new Paragraph({
    text: 'Comprehensive evidence report including architecture updates, impact analysis, code changes, test results, and release notes.',
    spacing: { line: 240 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'DEPLOYMENT READY',
    heading: HeadingLevel.HEADING_2,
    spacing: { line: 240, before: 120 }
  }),
  new Paragraph({
    text: 'Production build verified (569ms, zero errors). Git repository initialized. GitHub Pages deployment configured and ready.',
    spacing: { line: 240 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'QUALITY METRICS',
    heading: HeadingLevel.HEADING_2,
    spacing: { line: 240, before: 120 }
  }),
  new Paragraph({
    text: '✓ Test Pass Rate: 22/22 (100%)',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '✓ Breaking Changes: 0 (zero)',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '✓ Backward Compatibility: 100% verified',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '✓ Build Success: 100%',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '✓ Production Ready: YES',
    spacing: { line: 120 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'The evolved Attendance Monitoring System is ready for deployment and maintains full backward compatibility while adding powerful new organizational capabilities for students by year level and section.',
    spacing: { line: 240 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'Submitted: September 1, 2026',
    bold: true,
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Version: 1.1.0',
    bold: true,
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Status: ✓ COMPLETE AND VERIFIED',
    bold: true,
    spacing: { line: 240 }
  })
);

// Create and save document
const doc = new Document({
  sections: [{
    children: sections
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outputPath = 'c:\\Users\\Juner\\Downloads\\PUNZAL_Juner_Module9_Complete_Evidence.docx';
  fs.writeFileSync(outputPath, buffer);
  console.log(`✓ Word document created successfully`);
  console.log(`✓ File: PUNZAL_Juner_Module9_Complete_Evidence.docx`);
  console.log(`✓ Size: ${(buffer.length / 1024).toFixed(2)} KB`);
  console.log(`✓ Location: ${outputPath}`);
});
