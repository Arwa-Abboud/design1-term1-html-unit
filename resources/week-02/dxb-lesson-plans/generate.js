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
      contentCell([para([run("Date:            Time: ", { bold: true })]), reviewPara("Date/Time", `add the exact class date and period; Week 2 runs from ${d.weekDates}`)], { width: W[1] }),
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
    overviewRow("Skills", [reviewPara("Skills", "not tracked in the Week 2 planner/dashboard - add the specific transferable/technical skills this lesson practices")], W),
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
// Shared week-level facts (from Week 2 Planner + data/week02.js)
// ============================================================
const WEEK_DATES = "Sept 7 (Week 2)";
const STANDARD_FULL = "PG 1: Develop, utilize and evaluate algorithms to model and solve problems. (Computational Thinking, GLE CS.HS.1.4 - Large, complex problems can be broken down into smaller, manageable components.)";
const STANDARD_SHORT = "PG 1: Develop, utilize and evaluate algorithms to model and solve problems. (Computational Thinking, GLE CS.HS.1.4)";

const COMMON = {
  teacherName: "Arwa Abboud",
  subject: "Design 1 (Grade 9 - HTML Unit)",
  weekDates: WEEK_DATES,
};

// ============================================================
// LESSON 1 - The Anatomy of an HTML Document
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W2L1 - DXB Lesson Plan.docx",
  lessonTopic: "The Anatomy of an HTML Document (Term 1, Week 2, Lesson 1)",
  standard: STANDARD_FULL,
  walt: ["To explain and correctly use the core structural tags: <!DOCTYPE html>, <html>, <head>, <title>, and <body>."],
  wilf: [
    "I can name the 5 core structural tags in order.",
    "I can explain the difference between <head> and <body>.",
  ],
  literacyStrategies: [
    "Literacy Strategy: Frayer Model (on 'Nesting')",
    "Guided note-taking with a labeled diagram; technical vocabulary instruction (Doctype, Head, Body, Nesting).",
  ],
  assessment: "Formative, informal - quick write exit ticket (\"What would happen if we left out <body>?\")",
  vocabulary: "Doctype Declaration, Head, Body, Nesting",
  nationalIdentity: "UAE Digital Economy - professional websites need a reliable, standard structure to be trustworthy.",
  aiDigitalLearning: "None planned this lesson - concept taught through direct teacher demonstration.",
  starter: "Recap last week's Hello World / About Me file - which tags did we use, and what do students think might be missing from a 'real' webpage?",
  iDo: [
    "Mini-lecture: every HTML document needs a standard 'skeleton' - the DOCTYPE declaration, the html root element, the head (metadata, not visible), and the body (everything visible on the page).",
    "Live demo: build a document structure line by line, explaining what each tag does and why the order/nesting matters.",
    "Connect to today's standard: decomposing a webpage into logical structural parts is an example of breaking a large problem into smaller, manageable components.",
  ],
  weDo: [
    "Show a 'broken' structure example (tags missing or out of order) and diagnose it together as a class.",
    "Guided notes: students copy a labeled diagram of the structure into their notes.",
    "Frayer Model: as a class, complete a Frayer Model for 'Nesting' - definition in their own words, characteristics, a real example from today's code, and a non-example.",
  ],
  youDo: [
    "Label a given blank HTML structure diagram with the correct tag names and a one-line description of each tag's job.",
  ],
  diffBeginning: "Diagram provided with a word bank of tag names to match",
  diffOn: "Label the diagram from memory using notes as backup",
  diffAbove: "Explain in writing why tag order/nesting matters",
  closure: "Quick write - \"What would happen if we left out the <body> tag?\"",
  inclusivePlanning: "Visual supports, chunked instructions, and pre-teaching vocabulary provided for students needing extra support (per this week's Inclusion/EAL plan). Higher-order questioning used to extend more confident students, for example explaining why tag order and nesting matters rather than just naming the tags.",
});

// ============================================================
// LESSON 2 - Guided Build: Structuring a Page
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W2L2 - DXB Lesson Plan.docx",
  lessonTopic: "Guided Build: Structuring a Page (Term 1, Week 2, Lesson 2)",
  standard: STANDARD_SHORT,
  walt: ["To build a correctly structured HTML document using html, head, title, and body tags with teacher support."],
  wilf: [
    "My document includes all 5 core tags, correctly nested.",
    "My page renders in the browser with no visible errors.",
  ],
  literacyStrategies: ["Sequential instruction-following; error analysis (spotting syntax mistakes in text)."],
  assessment: "Formative, informal - partner structure-checklist review.",
  vocabulary: "Opening Tag, Closing Tag, Case Sensitivity",
  nationalIdentity: "UAE Digital Economy.",
  aiDigitalLearning: "None planned this lesson.",
  starter: "Quick matching activity: match each tag name to its purpose.",
  iDo: [
    "Teacher models building a document structure one step at a time, pausing after each line for students to replicate it.",
    "Mini-lesson on common syntax errors: unclosed tags, mismatched tags, and case sensitivity.",
  ],
  weDo: [
    "Checkpoint 1: confirm DOCTYPE + <html> tags are in place (teacher walks the room).",
    "Checkpoint 2: confirm <head> + <title> are in place.",
    "Checkpoint 3: confirm <body> opens and closes correctly.",
    "Students add a heading and a paragraph inside the body to test their understanding of nesting.",
  ],
  youDo: [
    "Build the 'shell' of a brand-new HTML page from scratch (not copy-pasted) following the three checkpoints, then open it in a browser to confirm it renders without errors.",
  ],
  diffBeginning: "Checkpoints broken into smaller sub-steps with TA check-ins",
  diffOn: "Follow the three checkpoints with teacher circulating",
  diffAbove: "Add an extra nested element beyond the minimum",
  closure: "Partner check: swap screens and use a quick structure checklist to review each other's file.",
  inclusivePlanning: "Chunked instructions, a worked/modeled example, and TA/LSA support available for students needing extra support (per this week's Inclusion/EAL plan). An extension/challenge task offered for confident students: adding an extra nested element beyond the minimum requirement.",
});

// ============================================================
// LESSON 3 - Independent Build: Expanding Your Homepage
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W2L3 - DXB Lesson Plan.docx",
  lessonTopic: "Independent Build: Expanding Your Homepage (Term 1, Week 2, Lesson 3)",
  standard: STANDARD_SHORT,
  walt: ["To apply correct HTML document structure independently to expand my personal website homepage."],
  wilf: [
    "My file structure is valid and complete.",
    "My content is organized logically under clear headings.",
  ],
  literacyStrategies: ["Independent expository writing (about-me content); self-editing/proofreading own code."],
  assessment: "Informal - teacher circulation check.",
  vocabulary: "None new this lesson (applying prior vocabulary).",
  nationalIdentity: "UAE Digital Economy - building a genuine online presence.",
  aiDigitalLearning: "Independent build time; AI code generation not permitted per Academic Integrity Policy.",
  starter: "Quick share: \"What's one part of your own website from last week that felt confusing to build?\"",
  iDo: [
    "Briefly review the structure checklist from Lesson 2.",
    "Introduce today's challenge: expand last week's index.html into a properly structured, richer homepage with multiple headings and paragraphs.",
  ],
  weDo: [
    "N/A this lesson - teacher circulates for 1:1 support rather than leading whole-class instruction.",
  ],
  youDo: [
    "Students work independently or in pairs to restructure and expand their file.",
    "Stretch challenge (for early finishers): create a second properly structured file, e.g. about.html, to start thinking ahead to multi-page sites.",
    "Expand index.html with a properly nested structure containing at least 2 headings and 2 paragraphs. Optionally begin a second file.",
  ],
  diffBeginning: "Sentence starters for new content; paired support available",
  diffOn: "Expand content independently using minimum requirements",
  diffAbove: "Begin a second properly structured file (e.g. about.html)",
  closure: "None formal - informal circulation check by the teacher.",
  inclusivePlanning: "Flexible grouping and sentence-starter scaffolds available for students needing extra support (per this week's Inclusion/EAL plan). Independent inquiry and a student-led/passion-project extension offered: planning and starting a second, properly structured file.",
});

// ============================================================
// LESSON 4 - Peer Review & Structure Check
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W2L4 - DXB Lesson Plan.docx",
  lessonTopic: "Peer Review & Structure Check (Term 1, Week 2, Lesson 4)",
  standard: STANDARD_SHORT,
  walt: ["To review and correct HTML document structure errors through peer feedback and complete the week's formal structure check."],
  wilf: [
    "I create a valid HTML document structure.",
    "I use tags correctly.",
    "My content displays successfully in a browser.",
  ],
  literacyStrategies: [
    "Literacy Strategy: Accountable Talk (peer review stems)",
    "Structured peer feedback protocol; oral explanation of technical work.",
  ],
  assessment: "Formative (official Week 2 checkpoint) - HTML structure check against success criteria.",
  vocabulary: "None new this lesson (consolidation).",
  nationalIdentity: "UAE Digital Economy.",
  aiDigitalLearning: "None planned this lesson.",
  starter: "Quick-fire: show 3 broken code snippets on the board, students spot the error out loud.",
  iDo: [
    "Quick-fire whole-class troubleshooting of the 2-3 most common recurring errors observed during peer review.",
  ],
  weDo: [
    "Peer review: swap laptops/screens with a partner and use a structure checklist to review each other's file.",
    "Accountable Talk: partners must use sentence stems while reviewing - \"I noticed that...\", \"Can you explain why...?\", \"I'd suggest...\" - instead of just pointing at the screen.",
  ],
  youDo: [
    "Students fix any issues flagged by their partner.",
    "Formal formative check: teacher reviews each student's file against this week's success criteria.",
    "Complete the peer review checklist, fix flagged issues, and submit the final corrected index.html for the formative check.",
  ],
  diffBeginning: "Paired with a stronger peer for review; TA support for fixes",
  diffOn: "Complete peer review and fixes independently",
  diffAbove: "Support a peer with debugging after finishing own fixes",
  closure: "\"One thing your partner helped you fix today.\"",
  inclusivePlanning: "Flexible grouping and TA/LSA support available for students needing extra support (per this week's Inclusion/EAL plan). A leadership/peer-coaching extension offered for confident students: supporting a peer with debugging after finishing their own fixes.",
});
