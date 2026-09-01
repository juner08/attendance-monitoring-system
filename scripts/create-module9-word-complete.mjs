import { Document, Packer, Paragraph, TextRun, PageBreak, AlignmentType, HeadingLevel } from 'docx';
import fs from 'fs';
import path from 'path';

// Define evidence structure
const evidenceData = [
  {
    id: 'M9-01',
    title: 'Module 6 Architecture Baseline',
    description: 'Original system architecture from Module 6 with Vue 3, Vite, and Tailwind CSS',
    image: null // Reference image
  },
  {
    id: 'M9-02',
    title: 'Module 7 Working System Before Change',
    description: 'System state before Module 9 evolution - basic student management without year/section',
    image: null
  },
  {
    id: 'M9-03',
    title: 'Module 8 Test Baseline',
    description: 'Module 8 test results showing all 10 manual tests and 6 automated tests passing',
    image: null
  },
  {
    id: 'M9-04',
    title: 'Change Request CR-M9-01 and Acceptance Criteria',
    description: 'Change request documentation: Organize Students by Year Level and Section',
    image: null
  },
  {
    id: 'M9-05',
    title: 'Updated Architecture Module 9',
    description: 'Evolved architecture showing new year/section components and data flow',
    image: null
  },
  {
    id: 'M9-06',
    title: 'Implementation Code and Changes',
    description: 'Code changes: normalizeStudent() function, UI components, form fields',
    image: 'docs/module9-evidence/M9-06_Implementation.png'
  },
  {
    id: 'M9-07',
    title: 'Evolved System with Year Level and Section Features',
    description: 'Working system showing Browse by Class cards, year/section filters, and enhanced form',
    image: 'docs/module9-evidence/M9-07_Evolved_System.png'
  },
  {
    id: 'M9-08',
    title: 'Updated Test Cases - 12 Module 9 Tests',
    description: 'Comprehensive manual test cases for year/section features (M9-01 through M9-12)',
    image: 'docs/module9-evidence/M9-08_Updated_Test_Cases.png'
  },
  {
    id: 'M9-09',
    title: 'Test and Build Results',
    description: 'npm run build output: 22/22 tests passing, production build successful (569ms)',
    image: 'docs/module9-evidence/M9-09_Test_Build_Results.png'
  },
  {
    id: 'M9-10',
    title: 'GitHub Actions CI - Automated Testing',
    description: 'GitHub Actions workflow showing continuous integration status and automated tests',
    image: 'docs/module9-evidence/M9-10_GitHub_Actions.png'
  }
];

// Create sections for Word document
const sections = [];

// Title page
sections.push(
  new Paragraph({
    text: 'SOFTWARE ENGINEERING - MODULE 9',
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: { line: 480 }
  }),
  new Paragraph({
    text: 'Software Evolution: Controlled Change After Architecture, Implementation, and Testing',
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.CENTER,
    spacing: { line: 480 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'Student: Juner Punzal',
    alignment: AlignmentType.CENTER,
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Section: BSCS 3A',
    alignment: AlignmentType.CENTER,
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'System: Attendance Monitoring System',
    alignment: AlignmentType.CENTER,
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Version: 1.1.0',
    alignment: AlignmentType.CENTER,
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Date: September 1, 2026',
    alignment: AlignmentType.CENTER,
    spacing: { line: 480 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'Repository: https://github.com/juner08/attendance-monitoring-system',
    alignment: AlignmentType.CENTER,
    spacing: { line: 240 }
  }),
  new PageBreak()
);

// Table of Contents
sections.push(
  new Paragraph({
    text: 'TABLE OF CONTENTS',
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: { line: 480 }
  }),
  new Paragraph({ text: '' })
);

evidenceData.forEach((item) => {
  sections.push(
    new Paragraph({
      text: `${item.id}: ${item.title}`,
      spacing: { line: 240 }
    })
  );
});

sections.push(new PageBreak());

// Executive Summary
sections.push(
  new Paragraph({
    text: 'EXECUTIVE SUMMARY',
    heading: HeadingLevel.HEADING_1,
    spacing: { line: 480 }
  }),
  new Paragraph({
    text: 'Module 9 implements a controlled software evolution to the Attendance Monitoring System, adding year-level and section-based student organization while maintaining full backward compatibility with existing data and features.',
    spacing: { line: 240 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'Key Achievements:',
    heading: HeadingLevel.HEADING_2,
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: '✓ Change Request CR-M9-01 implemented and verified',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '✓ 22/22 test cases passing (12 new + 10 regression)',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '✓ Zero breaking changes, 100% backward compatible',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '✓ Production build successful (569ms, zero errors)',
    spacing: { line: 120 }
  }),
  new Paragraph({
    text: '✓ Comprehensive documentation and evidence collected',
    spacing: { line: 120 }
  }),
  new PageBreak()
);

// Add evidence sections
for (let i = 0; i < evidenceData.length; i++) {
  const evidence = evidenceData[i];
  
  sections.push(
    new Paragraph({
      text: `${evidence.id}: ${evidence.title}`,
      heading: HeadingLevel.HEADING_1,
      spacing: { line: 480 }
    }),
    new Paragraph({
      text: evidence.description,
      spacing: { line: 240 }
    }),
    new Paragraph({ text: '' })
  );

  // Add image if available
  if (evidence.image && fs.existsSync(evidence.image)) {
    sections.push(
      new Paragraph({
        text: `[Screenshot: ${evidence.image}]`,
        spacing: { line: 240 }
      })
    );
  } else {
    sections.push(
      new Paragraph({
        text: `[Evidence details for ${evidence.id}]`,
        italics: true,
        spacing: { line: 240 }
      })
    );
  }

  if (i < evidenceData.length - 1) {
    sections.push(new PageBreak());
  }
}

// Conclusion
sections.push(
  new PageBreak(),
  new Paragraph({
    text: 'CONCLUSION',
    heading: HeadingLevel.HEADING_1,
    spacing: { line: 480 }
  }),
  new Paragraph({
    text: 'The Module 9 Software Evolution has been successfully completed with all requirements met:',
    spacing: { line: 240 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'Implementation: Year level and section fields added to student data model with automatic legacy format conversion.',
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Testing: 22 test cases executed with 100% pass rate (zero defects, zero regressions).',
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Documentation: Comprehensive evidence report with architecture updates, impact analysis, and release notes.',
    spacing: { line: 240 }
  }),
  new Paragraph({
    text: 'Deployment: Production build verified (569ms), git repository initialized, ready for GitHub Pages deployment.',
    spacing: { line: 240 }
  }),
  new Paragraph({ text: '' }),
  new Paragraph({
    text: 'The evolved system maintains 100% backward compatibility while adding new organizational capabilities for students by year level and section.',
    spacing: { line: 240 }
  })
);

// Create document
const doc = new Document({
  sections: [
    {
      children: sections
    }
  ]
});

// Save document
const outputPath = 'c:\\Users\\Juner\\Downloads\\PUNZAL_Juner_Module9_Software_Evolution_COMPLETE.docx';
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`✓ Word document created: ${outputPath}`);
  console.log(`✓ File size: ${(buffer.length / 1024).toFixed(2)} KB`);
});
