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
      contentCell([para([run("Date:            Time: ", { bold: true })]), reviewPara("Date/Time", `add the exact class date and period; Week 9 runs ${d.weekDates}`)], { width: W[1] }),
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
// Shared week-level facts (from Week 9 Planner + data/week09.js)
// ============================================================
const WEEK_DATES = "Oct 26 - Oct 30 (Week 9)";
const STANDARD_SHORT = "PG 5: Develop systems solutions from a set of specifications to complete a design process. (Computing Systems & Networks, GLE CS.HS.2.5)";
const NI = "UAE Smart Services - most UAE government services, from visas to vehicle registration, are requested through clear, well-labelled online forms. Students build forms with the same care.";

const COMMON = {
  teacherName: "Arwa Abboud",
  subject: "Design 1 (Grade 9 - HTML Unit)",
  weekDates: WEEK_DATES,
};

// ============================================================
// LESSON 3 - Independent Application: The F1 Fan Survey Page
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W9L3 - DXB Lesson Plan.docx",
  lessonTopic: "Independent Application: The F1 Fan Survey Page (Term 1, Week 9, Lesson 3)",
  standard: STANDARD_SHORT,
  walt: ["To independently build a Fan Survey page with radio buttons, checkboxes and a dropdown, and link it from the site menu."],
  wilf: [
    "The survey uses radio buttons, checkboxes and a dropdown, each correctly labelled.",
    "The Fan Survey link works from every page's menu.",
  ],
  literacyStrategies: [
    "Literacy Strategy: Frayer Model (on 'Radio Button')",
    "Reading a form specification and turning it into HTML; choosing the right input type for each question.",
  ],
  assessment: "Informal - teacher circulation feedback on input types, labels and menu links.",
  vocabulary: "Radio Button, Checkbox, Dropdown (Select)",
  skills: "Matching a question to the right kind of input; applying a pattern consistently across many lines of code; updating every page of a multi-page site.",
  nationalIdentity: NI,
  aiDigitalLearning: "Independent building time; AI text/code generation not permitted per Academic Integrity Policy.",
  starter: "'If you made a survey for F1 fans, what would you ask them? Which questions have one answer, and which can have many?'",
  iDo: [
    "Brief intro: radio buttons (pick ONE), checkboxes (pick ANY), dropdown (<select> with <option> choices, keeps a long list tidy).",
    "Show that radio buttons in one question share the same name (name=\"gp\"), so only one can be picked, while each choice still has its own id and label.",
    "Frayer Model for Radio Button (definition, characteristics, example, non-example: checkbox).",
  ],
  weDo: [
    "N/A this lesson - teacher circulates for 1:1 support on the new input types.",
  ],
  youDo: [
    "Create survey.html with the same skeleton, title and menu as the other pages.",
    "Add 'Fan Survey' to the navigation menu on ALL 5 pages and check every link works.",
    "Build the survey from the F1 Forms Fan Survey sheet: favourite Grand Prix (radio buttons), what you enjoy about F1 (checkboxes), how often you watch (dropdown) and a Send survey button.",
  ],
  diffBeginning: "Support sheet with patterns for one radio button and the dropdown; teacher checks the first question before students continue",
  diffOn: "Build the survey page independently from the specification table",
  diffAbove: "Add a textarea question ('Who is your favourite F1 driver and why?') and an optional email field",
  closure: "None formal - informal circulation check: can each student pick only one Grand Prix, and does the Fan Survey link work from every page?",
  inclusivePlanning: "Chunked instructions (menu first, then one question at a time), extra processing time and visual supports (pattern boxes on the Support sheet) for students needing extra support, per this week's Inclusion/EAL plan. Independent inquiry offered to confident students through the extension questions.",
});

// ============================================================
// LESSON 4 - Formative Assessment: F1 Forms and Navigation
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W9L4 - DXB Lesson Plan.docx",
  lessonTopic: "Formative Assessment: F1 Forms and Navigation (Term 1, Week 9, Lesson 4)",
  standard: STANDARD_SHORT,
  walt: ["To show working, correctly labelled forms integrated with the site's navigation."],
  wilf: [
    "I build functional forms.",
    "I apply form elements correctly.",
    "I collect information successfully.",
  ],
  literacyStrategies: [
    "Literacy Strategy: Accountable Talk (peer testing of forms and menu links)",
    "Frayer Model review on 'Form'; reporting issues found to a partner using the checklist language.",
  ],
  assessment: "Formative (official Week 9 checkpoint) - HTML Forms & Navigation Activities, 10 pts (functional form 4, correct labelling 3, navigation 3), via Toddle.",
  vocabulary: "None new this lesson (cumulative review: form, input, label, button, textarea, radio, checkbox, select).",
  skills: "Testing and debugging their own work against a checklist; giving and acting on peer feedback.",
  nationalIdentity: NI,
  aiDigitalLearning: "None planned this lesson - independent/practical assessment.",
  starter: "Quick-fire vocabulary match: form, input, label, textarea, button, radio, checkbox, select. Match each one to its job.",
  iDo: [
    "Explain the formative and rubric: functional form 4, correct labelling 3, navigation 3.",
    "Show how to self-test: click every label (the cursor should jump to its field), try to pick two Grand Prix (it should not work), click every menu link.",
  ],
  weDo: [
    "Students who are stuck receive the Example Code sheet and compare their code one line at a time.",
    "Peer test: partners try every field and every menu link and report anything that doesn't work.",
  ],
  youDo: [
    "Finish the contact form (Name, Email, Message, Send) and the Fan Survey page.",
    "Work through the F1 Website Final Checklist (Forms), fix what the partner found, then submit via Toddle.",
  ],
  diffBeginning: "Support checklist with the example code on the back; checklist reviewed 1:1 before starting; extra time as needed",
  diffOn: "Complete the Final Checklist independently against the rubric",
  diffAbove: "Add placeholder text to the Name and Email boxes, then peer-coach a classmate through their checklist",
  closure: "What's one more field or feature you'd add to your form if you had more time?",
  inclusivePlanning: "Extra processing time and chunked instructions (one checklist section at a time) for students needing extra support, per this week's Inclusion/EAL plan. The Example Code sheet is available for students who are stuck. A leadership/peer-coaching extension offered to confident students after they finish.",
});
