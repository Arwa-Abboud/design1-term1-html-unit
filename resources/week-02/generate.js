const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType
} = require("docx");

const FONT = "Times New Roman";
const RED = "EE0000";
const BLUE = "0070C0";
const GREY_FILL = "F2F2F2";

function titleBlock(subject, lessonLine, sheetTitle, tag) {
  const children = [
    new Paragraph({
      children: [new TextRun({ text: "Design 1: " + subject, bold: true, size: 32, font: FONT })],
    }),
    new Paragraph({
      children: [new TextRun({ text: lessonLine, italics: true, size: 20, font: FONT, color: "555555" })],
      spacing: { after: 120 },
    }),
    new Paragraph({
      children: [new TextRun({ text: sheetTitle, bold: true, size: 26, font: FONT })],
      spacing: { after: 100 },
    }),
  ];
  if (tag) {
    children.push(new Paragraph({
      children: [new TextRun({ text: tag.text, bold: true, size: 20, font: FONT, color: tag.color })],
      spacing: { after: 100 },
    }));
  }
  children.push(new Paragraph({
    children: [
      new TextRun({ text: "Name: ", bold: true, size: 22, font: FONT }),
      new TextRun({ text: "_______________________________", size: 22, font: FONT }),
      new TextRun({ text: "     Date: ", bold: true, size: 22, font: FONT }),
      new TextRun({ text: "______________", size: 22, font: FONT }),
    ],
    spacing: { after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000", space: 4 } },
  }));
  return children;
}

function bodyPara(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, font: FONT, bold: !!opts.bold })],
    spacing: { after: opts.after ?? 120 },
  });
}

function tierBox(color, lines) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color },
      bottom: { style: BorderStyle.SINGLE, size: 6, color },
      left: { style: BorderStyle.SINGLE, size: 6, color },
      right: { style: BorderStyle.SINGLE, size: 6, color },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, color: "auto", fill: GREY_FILL },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              ...lines.map(l => new Paragraph({
                children: [new TextRun({ text: l, size: 21, font: FONT })],
                spacing: { after: 60 },
              })),
            ],
          }),
        ],
      }),
    ],
  });
}

function spacer(size = 200) {
  return new Paragraph({ text: "", spacing: { after: size } });
}

function codeBlock(lines) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, color: "auto", fill: "0F172A" },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: lines.map(l => new Paragraph({
              children: [new TextRun({ text: l, font: "Consolas", size: 20, color: "E2E8F0" })],
            })),
          }),
        ],
      }),
    ],
  });
}

function checklistItem(text) {
  return new Paragraph({
    children: [new TextRun({ text: "☐  " + text, size: 22, font: FONT })],
    spacing: { after: 100 },
  });
}

function saveDoc(children, filename) {
  const doc = new Document({ sections: [{ properties: {}, children }] });
  Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync(filename, buf);
    console.log("Saved", filename);
  });
}

function differentiationDoc(subject, lessonLine, lessonTitle, filename, beginningLines, aboveLines) {
  const children = [
    ...titleBlock(subject, lessonLine, lessonTitle + " - Differentiation Support", {
      text: "FOR TEACHER USE - hand out only to students who need it, not the whole class",
      color: "555555",
    }),
    tierBox(RED, beginningLines),
    spacer(300),
    tierBox(BLUE, aboveLines),
  ];
  saveDoc(children, filename);
}

// ============ LESSON 1 - The Anatomy of an HTML Document ============
{
  const subject = "Term 1, Week 2, Lesson 1";
  const lessonLine = "HTML Document Structure";
  const title = "The Anatomy of an HTML Document";

  saveDoc([
    ...titleBlock(subject, lessonLine, title),
    bodyPara("Fill in the missing tag names in the skeleton below, then describe each tag's job in your own words."),
    spacer(100),
    codeBlock([
      "<!__________ html>",
      "<________>",
      "  <________>",
      "    <title>Page Title (shows in browser tab)</title>",
      "  </________>",
      "  <________>",
      "    <!-- Everything visible on the page goes here -->",
      "  </________>",
      "</________>",
    ]),
    spacer(200),
    bodyPara("What does each tag actually do? Write a one line description for each.", { bold: true }),
    spacer(80),
    bodyPara("Doctype Declaration:"),
    spacer(200),
    bodyPara("html:"),
    spacer(200),
    bodyPara("head:"),
    spacer(200),
    bodyPara("body:"),
    spacer(200),
    bodyPara("Frayer Model: Nesting", { bold: true }),
    bodyPara("Definition (in your own words):"),
    spacer(220),
    bodyPara("Characteristics:"),
    spacer(220),
    bodyPara("A real example from today's code:"),
    spacer(220),
    bodyPara("A non-example (tags that are NOT nested correctly):"),
    spacer(220),
    bodyPara("Exit ticket: What would happen if we left out the <body> tag?", { bold: true }),
    spacer(300),
  ], "W2L1 - HTML Structure Diagram - Labeling Worksheet.docx");

  differentiationDoc(subject, lessonLine, title, "W2L1 - HTML Structure Diagram - Labeling Worksheet - Differentiation Support.docx",
    [
      "Word bank for the blanks above: DOCTYPE, html, head, body (used twice).",
      "Worked example of the first line: <!DOCTYPE html> tells the browser which version of HTML to expect.",
      "Reminder: <head> holds information about the page that does not show on the page itself. <body> holds everything a visitor actually sees.",
    ],
    ["Bonus: explain why the order of these tags matters, not just their names. What would break if <head> and <body> were swapped?"]
  );
}

// ============ LESSON 2 - Guided Build: Structuring a Page ============
{
  const subject = "Term 1, Week 2, Lesson 2";
  const lessonLine = "Guided Build: Structuring a Page";
  const title = "Building Your Page Structure, Checkpoint Sheet";

  saveDoc([
    ...titleBlock(subject, lessonLine, title),
    bodyPara("Follow along with your teacher. Check off each checkpoint as you complete it, then add a heading and a paragraph to test your understanding of nesting."),
    spacer(100),
    checklistItem("Checkpoint 1: DOCTYPE and <html> tags are in place"),
    checklistItem("Checkpoint 2: <head> and <title> are in place"),
    checklistItem("Checkpoint 3: <body> opens and closes correctly"),
    checklistItem("Added one heading and one paragraph inside <body>"),
    checklistItem("Opened the file in a browser and confirmed it renders with no errors"),
    spacer(200),
    bodyPara("Target example, once you're done your page should work like this:", { bold: true }),
    spacer(80),
    codeBlock([
      "<!DOCTYPE html>", "<html>", "  <head>", "    <title>My Structured Page</title>",
      "  </head>", "  <body>", "    <h1>Welcome</h1>",
      "    <p>This paragraph is nested correctly inside the body.</p>", "  </body>", "</html>",
    ]),
    spacer(250),
    bodyPara("Partner structure check, swap screens with a partner and review their file:", { bold: true }),
    spacer(80),
    checklistItem("Does the file start with <!DOCTYPE html>?"),
    checklistItem("Does <html> wrap everything else?"),
    checklistItem("Is there a <head> with a <title> inside it?"),
    checklistItem("Does <body> contain all the visible content?"),
    checklistItem("Are all tags closed correctly, with matching opening and closing tags?"),
  ], "W2L2 - Building Your Page Structure - Checkpoint Sheet.docx");

  differentiationDoc(subject, lessonLine, title, "W2L2 - Building Your Page Structure - Checkpoint Sheet - Differentiation Support.docx",
    [
      "Type each line of the target example above one at a time, checking it matches exactly before moving to the next line.",
      "If a checkpoint does not pass, stop and fix that line before continuing. Do not move on with an error still in place.",
      "[Teacher note: pair with a peer or TA for this lesson if extra support is needed.]",
    ],
    ["Bonus: add a second heading and a second paragraph, or research one new HTML tag we have not learned yet and try adding it correctly to your page."]
  );
}

// ============ LESSON 3 - Independent Build: Expanding Your Homepage ============
{
  const subject = "Term 1, Week 2, Lesson 3";
  const lessonLine = "Independent Build: Expanding Your Homepage";
  const title = "Expanding Your Homepage, Planning Sheet";

  saveDoc([
    ...titleBlock(subject, lessonLine, title),
    bodyPara("Plan your expanded homepage before you type it. Add at least 2 headings and 2 paragraphs to your index.html file."),
    spacer(100),
    bodyPara("Heading 1 (h1), what will it say?", { bold: true }),
    spacer(180),
    bodyPara("Paragraph 1, what will it say?", { bold: true }),
    spacer(300),
    bodyPara("Heading 2 (h2), what will it say?", { bold: true }),
    spacer(180),
    bodyPara("Paragraph 2, what will it say?", { bold: true }),
    spacer(300),
    bodyPara("Stretch challenge (optional), a second page:", { bold: true }),
    bodyPara("If you finish early, plan a second file called about.html. What would this page be about?"),
    spacer(300),
  ], "W2L3 - Expanding Your Homepage - Planning Sheet.docx");

  differentiationDoc(subject, lessonLine, title, "W2L3 - Expanding Your Homepage - Planning Sheet - Differentiation Support.docx",
    [
      "Sentence starters:",
      '"Something people should know about me is ____."',
      '"One of my interests is ____ because ____."',
      "",
      "Worked example:",
      "<h1>Hi, I'm Sara</h1>",
      "<p>I'm a Grade 9 student learning web design this term.</p>",
      "<h2>My Interests</h2>",
      "<p>In my free time, I like to draw and play basketball.</p>",
    ],
    ["Bonus: plan your about.html stretch page with its own 2 headings and 2 paragraphs, or research one more HTML tag and plan where you would use it."]
  );
}

// ============ LESSON 4 - Peer Review & Structure Check ============
{
  const subject = "Term 1, Week 2, Lesson 4";
  const lessonLine = "Peer Review & Structure Check";
  const title = "Peer Review & Structure Check";

  saveDoc([
    ...titleBlock(subject, lessonLine, title),
    bodyPara("Swap screens with a partner. Use the checklist below to review their file, and the sentence stems to give feedback out loud."),
    spacer(100),
    checklistItem("Starts with <!DOCTYPE html>"),
    checklistItem("<html> wraps everything else"),
    checklistItem("<head> contains a <title>"),
    checklistItem("<body> contains all the visible content"),
    checklistItem("Every tag has a matching closing tag"),
    checklistItem("Tags are nested correctly, with no overlapping"),
    spacer(200),
    bodyPara("Accountable Talk stems, use these while you review:", { bold: true }),
    bodyPara("\"I noticed that...\"      \"Can you explain why...?\"      \"I'd suggest...\""),
    spacer(200),
    bodyPara("Write one specific piece of feedback for your partner, using a stem above:", { bold: true }),
    spacer(300),
    bodyPara("Fix any issues your partner flagged in your own file, then answer below.", { bold: true }),
    bodyPara("Exit ticket: One thing your partner helped you fix today:"),
    spacer(300),
  ], "W2L4 - Peer Review & Structure Check.docx");

  differentiationDoc(subject, lessonLine, title, "W2L4 - Peer Review & Structure Check - Differentiation Support.docx",
    [
      "Sentence stems, filled in as examples to copy or adapt:",
      '"I noticed that your <title> tag is missing, can you add one?"',
      '"Can you explain why this paragraph is outside the <body> tag?"',
      '"I\'d suggest closing this <h1> tag before starting your paragraph."',
    ],
    ["Bonus: after fixing your own file, help a third classmate who is stuck, using the same sentence stems."]
  );
}
