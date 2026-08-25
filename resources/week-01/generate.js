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
      children: [new TextRun({ text: "Design 1 — " + subject, bold: true, size: 32, font: FONT })],
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
    ...titleBlock(subject, lessonLine, lessonTitle + " — Differentiation Support", {
      text: "FOR TEACHER USE — hand out only to students who need it, not the whole class",
      color: "555555",
    }),
    tierBox(RED, beginningLines),
    spacer(300),
    tierBox(BLUE, aboveLines),
  ];
  saveDoc(children, filename);
}

// ============ LESSON 1 — About Me & My Goals Reflection ============
{
  const subject = "Term 1, Week 1, Lesson 1";
  const lessonLine = "Essential Agreement & Year/Unit Overview";
  const title = "About Me & My Goals for This Course";

  saveDoc([
    ...titleBlock(subject, lessonLine, title),
    bodyPara("Answer the questions below. There's no wrong answer here — this just helps your teacher get to know you as we start the year."),
    spacer(100),
    bodyPara("1. One thing I already know about computers or technology is..."),
    spacer(500),
    bodyPara("2. One thing I'm curious (or a little nervous) about this year is..."),
    spacer(500),
    bodyPara("3. This year, in Design 1, I want to learn how to..."),
    spacer(500),
  ], "W1L1 - About Me & Goals Reflection.docx");

  differentiationDoc(subject, lessonLine, title, "W1L1 - About Me & Goals Reflection - Differentiation Support.docx",
    [
      '"One thing I already know about technology is ____ because ____."',
      '"I\'m curious about ____ because I\'ve never ____."',
      '"This year I want to learn how to make/build ____ so that I can ____."',
    ],
    ["4. Bonus: How could the skills you learn in Design 1 connect to a career or interest you already have?"]
  );
}

// ============ LESSON 2 — Platform & Login Setup ============
{
  const subject = "Term 1, Week 1, Lesson 2";
  const lessonLine = "Platform & Login Setup";
  const title = "Getting Set Up — Step-by-Step Checklist";

  saveDoc([
    ...titleBlock(subject, lessonLine, title),
    bodyPara("Work through each step in order. Check the box once you've done it. Raise your hand if you get stuck on any step."),
    spacer(150),
    checklistItem("Step 1 — Log into your laptop"),
    checklistItem("Step 2 — Connect to the school Wi-Fi / network"),
    checklistItem("Step 3 — Open a web browser and log into Toddle"),
    checklistItem("Step 4 — Confirm you can see the \"Design 1\" class in Toddle"),
    checklistItem("Step 5 — Open your code editor (VS Code or Notepad)"),
    checklistItem("Step 6 — Create a new folder on your Desktop called \"Design1-HTML\""),
    checklistItem("Step 7 — In your code editor, create a new file named exactly: index.html"),
    checklistItem("Step 8 — Type the code below into your file (copy it exactly)"),
    checklistItem("Step 9 — Save the file inside your Design1-HTML folder"),
    checklistItem("Step 10 — Open the file in your browser and confirm it says \"Hello, World!\""),
    checklistItem("Step 11 — Submit a screenshot of your working page to Toddle"),
    spacer(200),
    bodyPara("Copy this code exactly into your index.html file:", { bold: true }),
    spacer(80),
    codeBlock([
      "<!DOCTYPE html>", "<html>", "<head>", "  <title>My First Page</title>",
      "</head>", "<body>", "  <p>Hello, World!</p>", "</body>", "</html>",
    ]),
  ], "W1L2 - Platform Setup Checklist.docx");

  differentiationDoc(subject, lessonLine, title, "W1L2 - Platform Setup Checklist - Differentiation Support.docx",
    [
      "Work through the checklist with a partner or teacher/TA, checking off each step together before moving to the next one.",
      "[Teacher note: attach a screenshot of your school's actual Toddle login screen and VS Code window here for a fully visual version of this checklist.]",
    ],
    ["Explore one extra feature of your code editor (for example, change the color theme, or look at what an \"extension\" is) before we move on."]
  );
}

// ============ LESSON 3 — Website Anatomy Worksheet ============
{
  const subject = "Term 1, Week 1, Lesson 3";
  const lessonLine = "What Is HTML? Exploring the Web Around Us";
  const title = "Website Anatomy Worksheet";
  const wordBank = "Word Bank: Header · Navigation · Main Content · Footer · Image · Link";

  function siteBlock(n) {
    return [
      bodyPara("Website " + n + ": ______________________________ (write the site name or address)", { bold: true, after: 80 }),
      bodyPara("Header — What's at the very top of the page?", { after: 60 }),
      spacer(180),
      bodyPara("Navigation — What links or menu items help you move around the site?", { after: 60 }),
      spacer(180),
      bodyPara("Main Content — What is the main content or information on this page?", { after: 60 }),
      spacer(180),
      bodyPara("Footer — What's at the very bottom of the page?", { after: 60 }),
      spacer(180),
    ];
  }

  saveDoc([
    ...titleBlock(subject, lessonLine, title),
    bodyPara("With a partner, open two real websites in your browser. For each one, find and describe the parts listed below."),
    bodyPara(wordBank, { bold: true, after: 150 }),
    ...siteBlock(1),
    ...siteBlock(2),
  ], "W1L3 - Website Anatomy Worksheet.docx");

  differentiationDoc(subject, lessonLine, title, "W1L3 - Website Anatomy Worksheet - Differentiation Support.docx",
    [
      "Worked example (Website: wikipedia.org):",
      "Header — The Wikipedia logo and the search bar at the top.",
      "Navigation — The menu links like \"Main page\", \"Contents\", \"Random article\" on the left side.",
      "Main Content — The article text, headings, and images in the middle of the page.",
      "Footer — Links about Wikipedia, privacy policy, and terms of use at the very bottom.",
    ],
    ["Right-click one of your websites and choose \"View Page Source\" or \"Inspect\". Find and write down ONE piece of HTML you didn't expect to see (for example, a comment, or a tag you don't recognize)."]
  );
}

// ============ LESSON 4 — About Me Paragraph ============
{
  const subject = "Term 1, Week 1, Lesson 4";
  const lessonLine = "Building Your First HTML File";
  const title = "Writing Your \"About Me\" Paragraph";

  saveDoc([
    ...titleBlock(subject, lessonLine, title),
    bodyPara("Add a title and a short paragraph introducing yourself to your index.html file. Plan your writing here first, then type it into your code."),
    spacer(150),
    bodyPara("My paragraph plan:", { bold: true }),
    spacer(900),
  ], "W1L4 - About Me Paragraph.docx");

  differentiationDoc(subject, lessonLine, title, "W1L4 - About Me Paragraph - Differentiation Support.docx",
    [
      "Sentence starters:",
      '"Hi, my name is ____ and I am a Grade 9 student at ____."',
      '"This year, I\'m excited to learn ____ because ____."',
      '"In my free time, I like to ____."',
      '"One thing I hope to build or create this year is ____."',
      "",
      "Worked example:",
      "<h1>Hi, I'm Sara</h1>",
      "<p>I'm a Grade 9 student learning web design this term. In my free time,",
      "I like to draw and play basketball. I'm excited to build my own website",
      "and learn how to create things with code!</p>",
    ],
    ["Add a second paragraph about your goals for this course, or a second heading introducing a hobby or interest."]
  );
}
