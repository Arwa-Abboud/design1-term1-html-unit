const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, VerticalAlign
} = require("docx");

const FONT = "Aptos";
const RED = "EE0000";
const ORANGE = "FFC000";
const BLUE = "0070C0";
const REVIEW_BLUE = "1155CC"; // color for fields Arwa needs to fill in / review
const HEADER_FILL = "E8E8E8";
const BLACK = "000000";

function noEm(s) {
  if (s == null) return s;
  return String(s).replace(/—/g, "-").replace(/–/g, "-");
}

// ---------- run/paragraph helpers ----------

function run(text, opts = {}) {
  return new TextRun({
    text: noEm(text),
    bold: !!opts.bold,
    italics: !!opts.italics,
    size: opts.size ?? 22,
    font: opts.font ?? FONT,
    color: opts.color ?? BLACK,
  });
}

function para(runsOrText, opts = {}) {
  const children = Array.isArray(runsOrText) ? runsOrText : [run(runsOrText, opts)];
  return new Paragraph({ children, spacing: { after: opts.after ?? 80 } });
}

function reviewPara(label, note) {
  // A field Arwa needs to fill in / confirm, shown fully in review-blue with a bracketed flag.
  return para(`[TO REVIEW - ${label}: ${note}]`, { color: REVIEW_BLUE, italics: true });
}

function suggestedPara(text) {
  // Content Claude is unsure about but is proposing anyway, per Arwa's instruction - shown in blue for review.
  return para(text, { color: REVIEW_BLUE });
}

function bulletLines(lines, opts = {}) {
  return lines.map(l => para("-  " + noEm(l), opts));
}

function labeledCell(text, opts = {}) {
  return new TableCell({
    width: { size: opts.width, type: WidthType.DXA },
    columnSpan: opts.span,
    shading: opts.fill ? { type: ShadingType.CLEAR, color: "auto", fill: opts.fill } : undefined,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    verticalAlign: VerticalAlign.CENTER,
    children: [para(text, { bold: true, size: opts.size ?? 22 })],
  });
}

function contentCell(children, opts = {}) {
  return new TableCell({
    width: { size: opts.width, type: WidthType.DXA },
    columnSpan: opts.span,
    shading: opts.fill ? { type: ShadingType.CLEAR, color: "auto", fill: opts.fill } : undefined,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: Array.isArray(children) ? children : [children],
  });
}

function borderedTable(rows, colWidths) {
  return new Table({
    width: { size: colWidths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: colWidths,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
    },
    rows,
  });
}

// ---------- section builders (mirror the DXB template structure exactly) ----------

function headerInfoTable(d) {
  const W = [4698, 4508];
  return borderedTable([
    new TableRow({ children: [
      contentCell([para([run("Teacher Name: ", { bold: true }), run(d.teacherName)])], { width: W[0] }),
      contentCell([para([run("Class/Section:", { bold: true })]), reviewPara("Class/Section", "confirm section, e.g. 9A / 9B")], { width: W[1] }),
    ]}),
    new TableRow({ children: [
      contentCell([para([run("Subject:  ", { bold: true }), run(d.subject)])], { width: W[0] }),
      contentCell([para([run("Date:            Time: ", { bold: true })]), reviewPara("Date/Time", `add the exact class date and period; Week 10 runs ${d.weekDates}`)], { width: W[1] }),
    ]}),
    new TableRow({ children: [
      contentCell([para([run("Class Description: ", { bold: true })]), reviewPara("Class Description", "add class size, ability mix, and any IEP/EAL notes")], { width: W[0] + W[1], span: 2 }),
    ]}),
    new TableRow({ children: [
      contentCell([para([run("TA/LSA Role (if applicable): ", { bold: true })]), reviewPara("TA/LSA Role", "add if a TA/LSA supports this class and what their role is")], { width: W[0] + W[1], span: 2 }),
    ]}),
  ], W);
}

function diffGroupsTable() {
  const W = [2254, 2252, 2251, 2508];
  const total = W.reduce((a, b) => a + b, 0);
  return borderedTable([
    new TableRow({ children: [
      labeledCell("Differentiated Learning Groups (Data)", { width: total, span: 4, fill: HEADER_FILL }),
    ]}),
    new TableRow({ children: [
      labeledCell("Desert Fox", { width: W[0], fill: "00B0F0" }),
      labeledCell("Camel", { width: W[1], fill: "92D050" }),
      labeledCell("Oryx", { width: W[2], fill: "FFC000" }),
      labeledCell("Falcon", { width: W[3], fill: "FF0000" }),
    ]}),
    new TableRow({ children: [
      contentCell([reviewPara("Group roster", "add student names for this group")], { width: W[0] }),
      contentCell([reviewPara("Group roster", "add student names for this group")], { width: W[1] }),
      contentCell([reviewPara("Group roster", "add student names for this group")], { width: W[2] }),
      contentCell([reviewPara("Group roster", "add student names for this group")], { width: W[3] }),
    ]}),
  ], W);
}

function overviewRow(label, contentParas, W) {
  return new TableRow({ children: [
    labeledCell(label, { width: W[0] }),
    contentCell(contentParas, { width: W[1] + W[2], span: 2 }),
  ]});
}

function lessonOverviewTable(d) {
  const W = [2307, 2386, 4508];
  const total = W.reduce((a, b) => a + b, 0);
  return borderedTable([
    new TableRow({ children: [labeledCell("Lesson Overview", { width: total, span: 3, fill: HEADER_FILL })] }),
    overviewRow("Lesson Topic", [para(d.lessonTopic)], W),
    overviewRow("Standard(s)", [para(d.standard)], W),
    new TableRow({ children: [
      contentCell([
        para("Learning Objective(s) (WALT):", { bold: true }),
        ...bulletLines(d.walt),
      ], { width: W[0] + W[1], span: 2 }),
      contentCell([
        para("Success Criteria (WILF):", { bold: true }),
        ...bulletLines(d.wilf),
      ], { width: W[2] }),
    ]}),
    overviewRow("Literacy Strategies", d.literacyStrategies.map(l => para(l)), W),
    overviewRow("Assessment", [para(d.assessment)], W),
    overviewRow("Targeted Vocabulary", [para(d.vocabulary)], W),
    overviewRow("Skills", [suggestedPara(d.skills)], W),
    overviewRow("National Identity Integration", [para(d.nationalIdentity)], W),
    overviewRow("AI/Digital Learning", [para(d.aiDigitalLearning)], W),
  ], W);
}

function lessonStructureTable(d) {
  const W = [2141, 7198];
  const total = W.reduce((a, b) => a + b, 0);
  return borderedTable([
    new TableRow({ children: [labeledCell("Lesson Structure", { width: total, span: 2, fill: HEADER_FILL })] }),
    new TableRow({ children: [
      contentCell([para("Starter (Hook) ", { bold: true }), para("Engage and Ask"), para("(5-10 minutes)")], { width: W[0] }),
      contentCell([para(d.starter)], { width: W[1] }),
    ]}),
    new TableRow({ children: [
      contentCell([para("I Do ", { bold: true }), para("Direct Instruction / Model")], { width: W[0] }),
      contentCell(d.iDo.map(l => para(l)), { width: W[1] }),
    ]}),
    new TableRow({ children: [
      contentCell([para("We Do ", { bold: true }), para("Guided Practice")], { width: W[0] }),
      contentCell(d.weDo.map(l => para(l)), { width: W[1] }),
    ]}),
    new TableRow({ children: [
      contentCell([para("You Do ", { bold: true }), para("Independent Practice")], { width: W[0] }),
      contentCell(d.youDo.map(l => para(l)), { width: W[1] }),
    ]}),
    new TableRow({ children: [
      contentCell([
        para("Differentiated", { bold: true }),
        para("Instruction:", { bold: true }),
        para([
          run("Beginning ", { bold: true, size: 16, color: RED }),
          run("/ ", { bold: true, size: 16 }),
          run("On", { bold: true, size: 16, color: ORANGE }),
          run(" /", { bold: true, size: 16 }),
          run(" ", { bold: true }),
          run("Above", { bold: true, size: 16, color: BLUE }),
        ]),
      ], { width: W[0] }),
      contentCell([
        para([run("Beginning: ", { bold: true, size: 15, color: RED }), run(d.diffBeginning)]),
        para([run("On: ", { bold: true, size: 15, color: ORANGE }), run(d.diffOn)]),
        para([run("Above: ", { bold: true, size: 15, color: BLUE }), run(d.diffAbove)]),
      ], { width: W[1] }),
    ]}),
    new TableRow({ children: [
      contentCell([para("Closure/Reflection", { bold: true }), para(" (5-10 minutes)")], { width: W[0] }),
      contentCell([para(d.closure)], { width: W[1] }),
    ]}),
  ], W);
}

function inclusivePlanningTable(d) {
  const W = [9346];
  return borderedTable([
    new TableRow({ children: [labeledCell("Inclusive Planning", { width: W[0], fill: HEADER_FILL, size: 22 })] }),
    new TableRow({ children: [contentCell([para(d.inclusivePlanning)], { width: W[0] })] }),
  ], W);
}

function buildLessonPlan(d) {
  const children = [
    para("Lesson Plan", { bold: true, size: 40, after: 200 }),
    headerInfoTable(d),
    para("", { after: 160 }),
    diffGroupsTable(),
    para("", { after: 160 }),
    lessonOverviewTable(d),
    para("", { after: 160 }),
    lessonStructureTable(d),
    para("", { after: 160 }),
    inclusivePlanningTable(d),
  ];
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      children,
    }],
  });
  Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync(d.filename, buf);
    console.log("Saved", d.filename);
  });
}

// ============================================================
// Shared week-level facts (from Week 10 Planner + data/week10.js)
// ============================================================
const WEEK_DATES = "Nov 2 - Nov 6 (Week 10)";
const STANDARD_FULL = "PG 7: Design and create programs, individually and collaboratively, for a variety of disciplines. (Computer Programming, GLE CS.HS.3.2 - Computational artifacts can be modified and improved through an iterative design process.)";
const STANDARD_SHORT = "PG 7: Design and create programs, individually and collaboratively, for a variety of disciplines. (Computer Programming, GLE CS.HS.3.2)";
const NI = "UAE Smart Government - UAE government websites are planned around the people who use them; students plan and build their own website for a specific target audience the same way.";
const NOAI = "Independent building time; AI text/code generation not permitted per Academic Integrity Policy. Content and code must be the student's own.";

const COMMON = {
  teacherName: "Arwa Abboud",
  subject: "Design 1 (Grade 9 - HTML Unit)",
  weekDates: WEEK_DATES,
};

// ============================================================
// LESSON 1 - Project Launch: Design Specification and Site Map
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W10L1 - DXB Lesson Plan.docx",
  lessonTopic: "Project Launch: Design Specification and Site Map (Term 1, Week 10, Lesson 1)",
  standard: STANDARD_FULL,
  walt: ["To understand the summative brief and rubric, and plan my own website with a design specification and site map."],
  wilf: [
    "My site map has at least 4 pages with clear names.",
    "My target audience is specific, not 'everyone'.",
  ],
  literacyStrategies: [
    "Literacy Strategy: Frayer Model (on 'Target Audience')",
    "Reading the project brief and rubric together; writing a short design specification.",
  ],
  assessment: "Formative, informal - completed design specification + exit ticket.",
  vocabulary: "Design Specification, Target Audience, Site Map, Wireframe",
  skills: "Planning a product for a specific audience; breaking a project into pages; setting measurable success criteria.",
  nationalIdentity: NI,
  aiDigitalLearning: "None planned this lesson - planning on paper.",
  starter: "Show two real websites made for very different audiences (e.g. a kids' game site and a bank). 'Who is each one for? How can you tell?'",
  iDo: [
    "Introduce the summative: students build their OWN multi-page website on a topic they choose, using everything practised on the F1 website.",
    "Walk through the Summative Project Brief and the student copy of the rubric (100 pts), and the timeline: build in Weeks 10-11, submit and present in Week 12.",
  ],
  weDo: [
    "Frayer Model for Target Audience (definition, characteristics, example, non-example).",
    "Model one design specification together using the worked example (UAE desert animals for Grade 5 students).",
  ],
  youDo: [
    "Students choose a topic and a target audience.",
    "Students complete the Design Specification sheet: purpose, site map of at least 4 pages, 3 success criteria and a Home page wireframe.",
  ],
  diffBeginning: "Worked example, topic idea bank and sentence starters for the success criteria (Support sheet)",
  diffOn: "Complete the design specification independently",
  diffAbove: "Plan a 5th page and explain how each page helps the target audience",
  closure: "Who is your website for, and what is one page they will find useful?",
  inclusivePlanning: "Visual supports (worked example, wireframe box), pre-taught vocabulary and a modelled specification for students needing extra support, per this week's Inclusion/EAL plan. Higher-order questioning for confident students: justifying how each page serves the audience.",
});

// ============================================================
// LESSON 2 - Set Up the Site: Pages, Skeletons and Navigation
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W10L2 - DXB Lesson Plan.docx",
  lessonTopic: "Set Up the Site: Pages, Skeletons and Navigation (Term 1, Week 10, Lesson 2)",
  standard: STANDARD_SHORT,
  walt: ["To create every page from my site map with a correct skeleton and an identical navigation menu."],
  wilf: [
    "Every page in my site map exists.",
    "Every menu link works from every page.",
  ],
  literacyStrategies: ["Following a step-by-step checklist; recording and explaining a link fix in writing."],
  assessment: "Formative, informal - link test grid checked by the teacher.",
  vocabulary: "None new this lesson (review: navigation, skeleton, relative link).",
  skills: "Organising files and folders; applying consistent structure across many pages; systematic testing.",
  nationalIdentity: NI,
  aiDigitalLearning: NOAI,
  starter: "Fix-it: show <a href=\"About Me.html\">About</a>. 'Why does this link fail? How would you fix it?'",
  iDo: [
    "Model the project folder, an images folder, and lowercase file names with no spaces (Home = index.html).",
    "Model building the navigation menu once and copying it into every page.",
  ],
  weDo: [
    "Frayer Model review for Navigation.",
    "Teacher checks each student's folder and file names before they continue.",
  ],
  youDo: [
    "Students create every page with the full skeleton, a <title>, an <h1> and the same menu.",
    "Students complete the link test grid on the Site Setup Checklist and record one fix.",
  ],
  diffBeginning: "Menu pattern on the Support sheet; teacher checks after Step 1 before students continue",
  diffOn: "Complete the checklist and link test independently",
  diffAbove: "Add an identical footer with the student's name, the year and a source link to every page",
  closure: "Link test: start on any page and reach every other page while the teacher watches.",
  inclusivePlanning: "Chunked instructions (files, then skeletons, then menu), visual supports and a modelled example for students needing extra support, per this week's Inclusion/EAL plan. Extension/challenge task for confident students: an identical footer on every page.",
});

// ============================================================
// LESSON 3 - Build Sprint 1: Text Content
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W10L3 - DXB Lesson Plan.docx",
  lessonTopic: "Build Sprint 1: Text Content (Term 1, Week 10, Lesson 3)",
  standard: STANDARD_SHORT,
  walt: ["To build the text content of my Home page and one more page using headings, paragraphs, lists and formatting."],
  wilf: [
    "My headings are in a logical order.",
    "At least 2 pages have real content.",
  ],
  literacyStrategies: ["Planning and writing original content in their own words; organising text with headings, paragraphs and lists."],
  assessment: "Informal - teacher circulation feedback on heading order and content.",
  vocabulary: "None new this lesson (review: heading, paragraph, list, strong, em).",
  skills: "Writing original content for an audience; structuring information logically; self-checking against criteria.",
  nationalIdentity: NI,
  aiDigitalLearning: NOAI,
  starter: "'Which tags organise text?' Quick list on the board: h1-h6, p, strong, em, ul, ol, li. 'Which one appears only once on a page?'",
  iDo: [
    "Quick recap of the text tags; show a page with good heading order next to one with skipped levels.",
    "Model a well-structured Home page: one h1, h2 sections, paragraphs and a list.",
  ],
  weDo: [
    "Frayer Model review for Heading.",
    "Mid-lesson check: students show their heading order; no skipped levels.",
  ],
  youDo: [
    "Students plan the text for Home and one more page on the Text Content Plan sheet.",
    "Students build the content, then complete the 'check before you finish' list.",
  ],
  diffBeginning: "Tag bank on the Support sheet; plan and build one page before starting the second",
  diffOn: "Plan and build two pages independently",
  diffAbove: "Use three heading levels correctly (h1, h2, h3) and add a nested list",
  closure: "Which page is next, and what content will it have?",
  inclusivePlanning: "Chunked instructions, extra processing time and sentence starters for students needing extra support, per this week's Inclusion/EAL plan. Independent inquiry for confident students through the extension tasks.",
});

// ============================================================
// LESSON 4 - Build Sprint 2: Images and a Table
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W10L4 - DXB Lesson Plan.docx",
  lessonTopic: "Build Sprint 2: Images and a Table (Term 1, Week 10, Lesson 4)",
  standard: STANDARD_SHORT,
  walt: ["To add images with meaningful alt text and a table of real data to my website."],
  wilf: [
    "My images display and have meaningful alt text.",
    "My table has a header row and real data.",
  ],
  literacyStrategies: ["Writing meaningful alt text; planning a data table before coding it."],
  assessment: "Optional formative - Build Milestone Check, 10 pts (design specification 3, pages and navigation 4, content started 3).",
  vocabulary: "None new this lesson (review: alt text, file path, table, table header).",
  skills: "Choosing media that supports content; organising real data into rows and columns; accessibility awareness.",
  nationalIdentity: NI,
  aiDigitalLearning: NOAI,
  starter: "Compare alt=\"image\" with alt=\"An Arabian oryx standing in the desert\". 'Which is better? Who relies on alt text?'",
  iDo: [
    "Quick recap of <img> (src, alt, width) and saving images in the images folder first.",
    "Quick recap of <table>, <tr>, <th> and <td> with a small example.",
  ],
  weDo: [
    "Frayer Model review for Alt Text.",
    "Teacher completes the Build Milestone Check with each student while the class builds.",
  ],
  youDo: [
    "Students add at least 2 images with meaningful alt text and 1 table of real data.",
    "Students finish any page that is still empty and note the biggest thing still missing.",
  ],
  diffBeginning: "Image and table patterns on the Support sheet; extra time as needed",
  diffOn: "Add the images and table independently",
  diffAbove: "Add a <caption> to the table and make one image a link to a related page",
  closure: "What is the biggest thing still missing from your site?",
  inclusivePlanning: "Visual supports (code patterns) and extra processing time for students needing extra support, per this week's Inclusion/EAL plan. Extension/challenge task for confident students: table caption and an image link.",
});
