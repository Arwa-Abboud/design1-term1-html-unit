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
      contentCell([para([run("Date:            Time: ", { bold: true })]), reviewPara("Date/Time", `add the exact class date and period; Week 11 runs ${d.weekDates}`)], { width: W[1] }),
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
// Shared week-level facts (from Week 11 Planner + data/week11.js)
// ============================================================
const WEEK_DATES = "Nov 9 - Nov 13 (Week 11)";
const STANDARD_FULL = "PG 7: Design and create programs, individually and collaboratively, for a variety of disciplines. (Computer Programming, GLE CS.HS.3.3 - Collaborative tools, methods and strategies can be used to design, develop and update computational artifacts.)";
const STANDARD_SHORT = "PG 7: Design and create programs, individually and collaboratively, for a variety of disciplines. (Computer Programming, GLE CS.HS.3.3)";
const NI = "UAE Tourism Promotion - tourism websites let visitors ask questions, subscribe and plan trips; students make their own website complete and easy to use for its visitors the same way.";
const NOAI = "Independent building time; AI text/code generation not permitted per Academic Integrity Policy. Content and code must be the student's own.";

const COMMON = {
  teacherName: "Arwa Abboud",
  subject: "Design 1 (Grade 9 - HTML Unit)",
  weekDates: WEEK_DATES,
};

// ============================================================
// LESSON 1 - Build Sprint 3: Adding a Form
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W11L1 - DXB Lesson Plan.docx",
  lessonTopic: "Build Sprint 3: Adding a Form (Term 1, Week 11, Lesson 1)",
  standard: STANDARD_FULL,
  walt: ["To add a correctly labelled form that serves a real purpose on my website."],
  wilf: [
    "Clicking each label focuses its field.",
    "My form makes sense for my audience.",
  ],
  literacyStrategies: [
    "Retrieval practice: recalling the Week 9 form tags; explaining why a form suits the audience.",
    "Frayer Model review for Form.",
  ],
  assessment: "Formative, informal - form self-test (click every label) + exit ticket.",
  vocabulary: "None new this lesson (review: form, label, input, input type, textarea, radio button, checkbox, button).",
  skills: "Choosing the right input for a question; matching labels to inputs; testing a feature as a visitor would.",
  nationalIdentity: NI,
  aiDigitalLearning: NOAI,
  starter: "'What form would YOUR visitors actually fill in?' (a contact form, a quiz, a sign-up, a vote).",
  iDo: [
    "Recap the Week 9 form tags: form, label with for, input with a matching id, input types, textarea, radio, checkbox, select and button.",
    "Show one short form and point out that the label's for and the input's id must match exactly.",
  ],
  weDo: [
    "Students choose a form that fits their topic and audience.",
    "Frayer Model review for Form; students plan each field (label text, input type, id) on the Form Planning sheet.",
  ],
  youDo: [
    "Students build a form with at least 3 labelled fields and 2 or more input types, plus a submit button.",
    "Self-test: click every label, then try the form as a visitor.",
  ],
  diffBeginning: "Form pattern on the Support sheet with the first label and input pair done; teacher checks the first field",
  diffOn: "Plan and build the form independently from the planning sheet",
  diffAbove: "Add a select menu or radio group and explain why each input type suits its question",
  closure: "Why does your website need this form?",
  inclusivePlanning: "Visual supports (code pattern), chunked instructions and a modelled label and input pair for students needing extra support, per this week's Inclusion/EAL plan. Real-world application for confident students: a form their own visitors would genuinely use.",
});

// ============================================================
// LESSON 2 - Content Complete: Finishing Every Page
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W11L2 - DXB Lesson Plan.docx",
  lessonTopic: "Content Complete: Finishing Every Page (Term 1, Week 11, Lesson 2)",
  standard: STANDARD_SHORT,
  walt: ["To reach 'content complete' on every page in my site map, ready for the prototype review."],
  wilf: [
    "Every page has real content, with no placeholder text.",
    "Every page looks like part of the same site.",
  ],
  literacyStrategies: ["Self-assessment: rating each page as done, nearly done or not started; setting a personal goal for the lesson."],
  assessment: "Informal - teacher circulation feedback; Page Tracker checked for readiness for the review.",
  vocabulary: "None new this lesson (review: navigation, heading, paragraph, alt text).",
  skills: "Self-assessing progress; prioritising work; checking consistency across a whole site.",
  nationalIdentity: NI,
  aiDigitalLearning: NOAI,
  starter: "Each student lists their pages and marks each one: done, nearly done or not started.",
  iDo: [
    "Explain what content complete means: real content on every page, with no placeholder text left.",
    "Explain the consistency pass: the same menu, the same heading style and the same layout on every page.",
  ],
  weDo: [
    "Students set a personal goal for the lesson based on their list.",
    "Teacher prioritises students who are behind and checks in with them first.",
  ],
  youDo: [
    "Students finish every page with no placeholder text and track progress on the Page Tracker.",
    "Students complete the consistency pass across the whole site.",
  ],
  diffBeginning: "Page Tracker with the most important page marked first and a tag bank for missing content; teacher checks in half-way through",
  diffOn: "Finish every page and complete the consistency pass independently",
  diffAbove: "Add an identical footer to every page and check heading order and alt text across the whole site",
  closure: "Is your site ready for review? If not, what is left?",
  inclusivePlanning: "Chunked instructions (one page at a time), extra processing time and visual supports (tracker and checklist) for students needing extra support, per this week's Inclusion/EAL plan. Extension/challenge task for confident students: a shared footer and a site-wide check.",
});

// ============================================================
// LESSON 3 - Formative Assessment: Website Prototype Review
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W11L3 - DXB Lesson Plan.docx",
  lessonTopic: "Formative Assessment: Website Prototype Review (Term 1, Week 11, Lesson 3)",
  standard: STANDARD_SHORT,
  walt: ["To present my website for peer and teacher review against my design specification, and record feedback."],
  wilf: [
    "I recorded 2 specific pieces of feedback.",
    "I know what to fix first.",
  ],
  literacyStrategies: [
    "Literacy Strategy: Accountable Talk (feedback stems 'I noticed...' and 'It would be clearer if...').",
    "Frayer Model for Feedback.",
  ],
  assessment: "Formative (official Week 11 checkpoint) - Website Prototype Review, 10 pts (multi-page site 4, navigation 3, consistent design 3).",
  vocabulary: "Prototype, Feedback",
  skills: "Giving and receiving specific feedback; testing against a specification; prioritising improvements.",
  nationalIdentity: NI,
  aiDigitalLearning: "None planned this lesson - peer testing and review of student work.",
  starter: "Model good feedback: 'Nice site' versus 'Your About page link goes to Home, so I couldn't reach About.'",
  iDo: [
    "Explain the formative rubric: multi-page site 4, navigation 3, consistent design 3.",
    "Model the Accountable Talk stems: 'I noticed...' and 'It would be clearer if...'.",
  ],
  weDo: [
    "Frayer Model for Feedback.",
    "Turn one vague comment into a specific one together: name the page and give a reason.",
  ],
  youDo: [
    "Pairs swap and test each other's site against its design specification and success criteria.",
    "Each student records 2 specific pieces of feedback (one strength, one improvement) on the Prototype Review sheet; the teacher reviews each site for the formative score.",
  ],
  diffBeginning: "Feedback sentence starters and a checklist on the Support sheet; review one page together before testing the rest",
  diffOn: "Test the partner's site and record 2 specific pieces of feedback independently",
  diffAbove: "Rank all feedback by importance and plan the first fix for the student's own site",
  closure: "What is the first change you will make in the next lesson?",
  inclusivePlanning: "Visual supports, flexible grouping (partner pairs) and sentence starters for students needing extra support, per this week's Inclusion/EAL plan. Higher-order questioning and peer coaching for confident students: ranking feedback by importance.",
});

// ============================================================
// LESSON 4 - Refine: Acting on Feedback
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W11L4 - DXB Lesson Plan.docx",
  lessonTopic: "Refine: Acting on Feedback (Term 1, Week 11, Lesson 4)",
  standard: STANDARD_SHORT,
  walt: ["To make at least 2 concrete improvements based on the prototype review and re-test the whole site."],
  wilf: [
    "I made at least 2 improvements.",
    "Everything still works after my changes.",
  ],
  literacyStrategies: [
    "Ranking feedback by importance; recording what changed and why for the Week 12 reflection.",
    "Frayer Model for Iterative Design.",
  ],
  assessment: "Informal - teacher circulation feedback; change log checked for the Week 12 reflection.",
  vocabulary: "Iterative Design",
  skills: "Prioritising feedback; making targeted improvements; re-testing a whole site systematically.",
  nationalIdentity: NI,
  aiDigitalLearning: NOAI,
  starter: "'Which piece of feedback will make the biggest difference to your visitors?'",
  iDo: [
    "Introduce Iterative Design: build, test, get feedback, improve, then test again.",
    "Model ranking feedback and starting with the most important fix.",
  ],
  weDo: [
    "Frayer Model for Iterative Design.",
    "Students rank their own feedback (1 = most important) and plan the fix for rank 1.",
  ],
  youDo: [
    "Students make at least 2 improvements from the feedback.",
    "Students re-test every link, image, table and form field, and note what they changed for the Week 12 reflection.",
  ],
  diffBeginning: "Feedback ranking table with the first item done and a step-by-step re-test checklist on the Support sheet",
  diffOn: "Rank the feedback, make 2 improvements and re-test independently",
  diffAbove: "Make 3 or more improvements and explain how each one helps a visitor",
  closure: "Write down one change you made and why it improved the site.",
  inclusivePlanning: "Chunked instructions, extra processing time and a modelled worked example for students needing extra support, per this week's Inclusion/EAL plan. Independent inquiry for confident students: extra improvements justified in writing.",
});
