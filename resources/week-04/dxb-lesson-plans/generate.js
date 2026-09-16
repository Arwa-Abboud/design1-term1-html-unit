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
      contentCell([para([run("Date:            Time: ", { bold: true })]), reviewPara("Date/Time", `add the exact class date and period; Week 4 runs ${d.weekDates}`)], { width: W[1] }),
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
// Shared week-level facts (from Week 4 Planner + data/week04.js)
// ============================================================
const WEEK_DATES = "Sept 21 (Week 4)";
const STANDARD_FULL = "PG 7: Design and create programs, individually and collaboratively, for a variety of disciplines. (Computer Programming, GLE CS.HS.3.1 - The creation of a computer program requires a design process.)";
const STANDARD_SHORT = "PG 7: Design and create programs, individually and collaboratively, for a variety of disciplines. (Computer Programming, GLE CS.HS.3.1)";

const COMMON = {
  teacherName: "Arwa Abboud",
  subject: "Design 1 (Grade 9 - HTML Unit)",
  weekDates: WEEK_DATES,
};

// ============================================================
// LESSON 1 - Ordered vs. Unordered Lists
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W4L1 - DXB Lesson Plan.docx",
  lessonTopic: "Ordered vs. Unordered Lists (Term 1, Week 4, Lesson 1)",
  standard: STANDARD_FULL,
  walt: ["To explain the difference between ordered and unordered lists and identify when to use each."],
  wilf: [
    "I can explain the difference between <ul> and <ol>.",
    "I can give a correct real-world example of each.",
  ],
  literacyStrategies: [
    "Literacy Strategy: Frayer Model (on 'Ordered List')",
    "Comparing real-world examples (recipe steps vs. shopping list) to distinguish sequence-matters from order-doesn't-matter content.",
  ],
  assessment: "Formative, informal - real-world list examples + quick write exit ticket.",
  vocabulary: "Ordered List, Unordered List, List Item",
  skills: "Comparing and contrasting information structures; identifying real-world examples of sequential vs. non-sequential data.",
  nationalIdentity: "UAE Heritage and Culture - ordered lists can present Emirati traditions or historical events in the sequence they happened.",
  aiDigitalLearning: "None planned this lesson - concept taught through direct comparison and demonstration.",
  starter: "Show two real examples: a recipe's numbered steps and a shopping list. 'What's different about how these two are organized?'",
  iDo: [
    "Mini-lecture: unordered lists (<ul> + <li>) are for items where order doesn't matter (bulleted); ordered lists (<ol> + <li>) are for items where sequence matters (numbered).",
    "Demo: build one of each list type live, showing the <ul>/<ol> wrapper with <li> items inside.",
  ],
  weDo: [
    "Discuss: when would a website use each type? (e.g. navigation menu = unordered, step-by-step instructions = ordered).",
    "Guided notes: students record both syntaxes side by side.",
  ],
  youDo: [
    "Identify 3 real-world examples from their own life that would be an ordered list and 3 that would be an unordered list.",
  ],
  diffBeginning: "Sentence starter + visual example bank (recipe vs. shopping list) to sort from",
  diffOn: "Identify 3 ordered and 3 unordered real-world examples independently",
  diffAbove: "Justify why each example must be ordered/unordered and what would break if swapped",
  closure: "Would a website's main navigation menu be an ordered or unordered list - and why?",
  inclusivePlanning: "Visual supports, chunked instructions, and pre-taught vocabulary provided for students needing extra support (per this week's Inclusion/EAL plan). Higher-order questioning used to extend more confident students, for example justifying why an example must be ordered/unordered rather than just sorting it.",
});

// ============================================================
// LESSON 2 - Guided Practice: Building Lists
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W4L2 - DXB Lesson Plan.docx",
  lessonTopic: "Guided Practice: Building Lists (Term 1, Week 4, Lesson 2)",
  standard: STANDARD_SHORT,
  walt: ["To build correctly nested ordered and unordered lists with teacher support."],
  wilf: [
    "Both list types render correctly with no errors.",
    "My nested list (if attempted) is structured correctly.",
  ],
  literacyStrategies: ["Modeling and checkpoint-based guided practice; accountable talk during common-error troubleshooting."],
  assessment: "Formative, informal - checkpoint checks + screenshot exit ticket.",
  vocabulary: "Nested List",
  skills: "Applying syntax rules precisely; debugging nested code structures.",
  nationalIdentity: "UAE Heritage and Culture - organizing cultural information (e.g. Emirati dishes, customs) clearly.",
  aiDigitalLearning: "None planned this lesson.",
  starter: "Quick fix-it: show a list with a missing closing </li> tag - students spot the error.",
  iDo: [
    "Teacher models building an unordered list step by step, then converts it to an ordered list to show how little needs to change.",
    "Introduce nested lists (a list inside a list item) for more complex organization, with a worked example.",
  ],
  weDo: [
    "Checkpoint 1: students build one unordered list with at least 3 items.",
    "Checkpoint 2: students build one ordered list with at least 3 items.",
    "Common error check: unclosed <li> tags, list items placed outside the <ul>/<ol> wrapper.",
  ],
  youDo: [
    "Build one unordered list and one ordered list (3+ items each) on their personal website, and attempt one nested list.",
  ],
  diffBeginning: "Step-by-step checklist for each checkpoint; teacher checks in after each one",
  diffOn: "Complete both checkpoints and attempt the nested list independently",
  diffAbove: "Build a nested list with 2+ levels of depth and explain when nesting is useful",
  closure: "Submit a screenshot of the rendered lists for a quick teacher check.",
  inclusivePlanning: "A modeled/worked example and TA/LSA support available for students needing extra support (per this week's Inclusion/EAL plan). An extension/challenge task offered for confident students: building a nested list with 2+ levels of depth.",
});

// ============================================================
// LESSON 3 - Independent Application: Organizing Real Content
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W4L3 - DXB Lesson Plan.docx",
  lessonTopic: "Independent Application: Organizing Real Content (Term 1, Week 4, Lesson 3)",
  standard: STANDARD_SHORT,
  walt: ["To independently choose and build the appropriate list type to organize real content."],
  wilf: [
    "My list type choice matches the content.",
    "My content is clearer as a list than it was as a paragraph.",
  ],
  literacyStrategies: ["Independent organizational writing; purposeful list-type selection for real content."],
  assessment: "Informal - teacher circulation feedback on list-type choices.",
  vocabulary: "None new this lesson (applying prior vocabulary).",
  skills: "Evaluating existing content to choose the most effective structure; editing/refactoring already-written code.",
  nationalIdentity: "UAE Heritage and Culture - presenting real cultural/heritage content with the right list type.",
  aiDigitalLearning: "Independent building time; AI text/code generation not permitted per Academic Integrity Policy.",
  starter: "'What content on your own website could be turned into a list instead of a paragraph?'",
  iDo: [
    "Brief share-out of list ideas; no formal direct instruction - this is an independent day.",
  ],
  weDo: [
    "N/A this lesson - teacher circulates for 1:1 feedback rather than whole-class instruction.",
  ],
  youDo: [
    "Students identify at least 2 places on their personal website where a list would organize the content better than a paragraph.",
    "Students independently build and integrate these lists into their existing page(s).",
    "Stretch challenge: build a simple navigation-style unordered list styled as a menu.",
    "Replace at least one paragraph on their site with a properly chosen and correctly built list.",
  ],
  diffBeginning: "Provided list of 2 content areas likely to work well as lists; sentence starters",
  diffOn: "Identify 2 places for lists and build them independently",
  diffAbove: "Attempt the stretch navigation-style menu list and explain how it previews next week's nav bar",
  closure: "None formal - informal circulation check.",
  inclusivePlanning: "Flexible grouping and sentence-starter scaffolds available for students needing extra support (per this week's Inclusion/EAL plan). Independent inquiry and an open-ended task offered: the stretch navigation-style menu list, connecting today's work to next week's topic.",
});

// ============================================================
// LESSON 4 - Review & Practical Task: Lists in Context
// ============================================================
buildLessonPlan({
  ...COMMON,
  filename: "W4L4 - DXB Lesson Plan.docx",
  lessonTopic: "Review & Practical Task: Lists in Context (Term 1, Week 4, Lesson 4)",
  standard: STANDARD_SHORT,
  walt: ["To demonstrate correct, independent use of ordered and unordered lists to organize information clearly."],
  wilf: [
    "I create lists correctly.",
    "I select appropriate list types.",
    "I present information clearly.",
  ],
  literacyStrategies: [
    "Literacy Strategy: Accountable Talk (peer review of lists)",
    "Peer review of lists against success criteria; cumulative practical check.",
  ],
  assessment: "Formative (official Week 4 checkpoint) - Lists practical task, observation + task, via Toddle.",
  vocabulary: "None new this lesson (cumulative review).",
  skills: "Applying prior learning under time constraints; organizing unfamiliar content using a taught structure.",
  nationalIdentity: "UAE Heritage and Culture - today's practical task organizes real UAE cultural content (e.g. steps to prepare Arabic coffee, traditional Emirati foods).",
  aiDigitalLearning: "None planned this lesson - independent/practical assessment.",
  starter: "Quick-fire vocabulary check: <ul>, <ol>, <li> - what does each do?",
  iDo: [
    "Quick review game: flash a tag, students state its purpose (mixes Weeks 1-2 tags with this week's tags).",
  ],
  weDo: [
    "Peer review: partners check each other's lists against the success criteria (correct type, correct syntax, clear content).",
    "Whole-class troubleshooting of any recurring list-syntax errors.",
  ],
  youDo: [
    "Formal practical task: students complete a short list-building activity (teacher-provided content that must be organized using the correct list type) as this week's formative check.",
    "Complete the practical list-organizing task and submit for the formative check (observation + practical task).",
  ],
  diffBeginning: "Success criteria checklist reviewed 1:1 before starting; extra time as needed",
  diffOn: "Complete the practical task independently against the shared success criteria",
  diffAbove: "After finishing, peer-review another student's lists and suggest one improvement",
  closure: "One website (real or your own) that uses lists well, and why they work there.",
  inclusivePlanning: "Extra processing time and text read by TA/LSA available for students needing extra support (per this week's Inclusion/EAL plan). A leadership/peer-coaching extension offered for confident students: peer-reviewing another student's lists after finishing.",
});
