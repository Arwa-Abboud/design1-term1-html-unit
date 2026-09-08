const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, AlignmentType
} = require("docx");

const FONT = "Times New Roman";
const RED = "EE0000";
const ORANGE = "FFC000";
const BLUE = "0070C0";
const GREY_FILL = "F2F2F2";
const RED_FILL = "FDECEC";
const BLUE_FILL = "E8F1FC";

// ---------- shared building blocks (matches Week 1/2 worksheet style) ----------

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
    children: [new TextRun({ text, size: 22, font: FONT, bold: !!opts.bold, italics: !!opts.italics })],
    spacing: { after: opts.after ?? 120 },
  });
}

function spacer(size = 200) {
  return new Paragraph({ text: "", spacing: { after: size } });
}

function checklistItem(text) {
  return new Paragraph({
    children: [new TextRun({ text: "☐  " + text, size: 22, font: FONT })],
    spacing: { after: 100 },
  });
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

function calloutBox(color, fill, lines) {
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
            shading: { type: ShadingType.CLEAR, color: "auto", fill },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: lines.map(l => new Paragraph({
              children: [new TextRun({ text: l, size: 21, font: FONT })],
              spacing: { after: 60 },
            })),
          }),
        ],
      }),
    ],
  });
}

function tierBanner(tier) {
  // tier: "support" | "extension" | null (on-level, no banner)
  if (!tier) return spacer(80);
  const isSupport = tier === "support";
  const color = isSupport ? RED : BLUE;
  const fill = isSupport ? RED_FILL : BLUE_FILL;
  const label = isSupport
    ? "SUPPORT VERSION - full activity with extra scaffolding built in"
    : "EXTENSION VERSION - full activity plus the challenge task built in";
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color },
      bottom: { style: BorderStyle.SINGLE, size: 6, color },
      left: { style: BorderStyle.SINGLE, size: 6, color },
      right: { style: BorderStyle.SINGLE, size: 6, color },
    },
    rows: [new TableRow({
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, color: "auto", fill },
        margins: { top: 80, bottom: 80, left: 140, right: 140 },
        children: [new Paragraph({
          children: [new TextRun({ text: label, bold: true, size: 19, font: FONT, color })],
        })],
      })],
    })],
  });
}

// A single-row "sketch box" for planning a heading + its content, used in Lesson 1/3
function sketchRow(labelText, lineCount = 2) {
  const lines = [
    new Paragraph({
      children: [new TextRun({ text: labelText, bold: true, size: 20, font: FONT, color: "444444" })],
      spacing: { after: 60 },
    }),
  ];
  for (let i = 0; i < lineCount; i++) {
    lines.push(new Paragraph({ text: "", spacing: { after: 40 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: "AAAAAA", space: 1 } } }));
  }
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
    },
    rows: [new TableRow({
      children: [new TableCell({
        margins: { top: 100, bottom: 100, left: 160, right: 160 },
        children: lines,
      })],
    })],
  });
}

function wordBank(title, items) {
  return calloutBox(RED, RED_FILL, [title, items.join("   |   ")]);
}

function saveDoc(children, filename) {
  const doc = new Document({ sections: [{ properties: {}, children }] });
  Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync(filename, buf);
    console.log("Saved", filename);
  });
}

// ============================================================
// LESSON 1 - Headings & Paragraphs: Structuring Text
// ============================================================
{
  const subject = "Term 1, Week 3, Lesson 1";
  const lessonLine = "Headings & Paragraphs: Structuring Text";
  const title = "Planning Your Heading Hierarchy";
  const filenameBase = "W3L1 - Planning Your Heading Hierarchy";

  function build(tier) {
    const support = tier === "support";
    const extension = tier === "extension";

    const children = [
      ...titleBlock(subject, lessonLine, title),
      tierBanner(tier),
      bodyPara("Heading tags (h1 through h6) create a hierarchy: h1 is the most important heading on a page, h6 the least. The <p> tag groups a block of related sentences into one paragraph."),
      spacer(150),
      bodyPara("Correct vs. incorrect example:", { bold: true }),
      spacer(60),
      codeBlock([
        "Example A (correct):          Example B (incorrect):",
        "<h1>My Website</h1>           <h1>My Website</h1>",
        "<h2>About Me</h2>             <h4>About Me</h4>",
        "<p>...</p>                    <p>...</p>",
      ]),
      spacer(150),
    ];

    if (support) {
      children.push(wordBank("Hint bank:", ["h1 = page title", "h2 = section title", "skips a level", "harder for screen readers to follow"]));
      children.push(spacer(150));
      children.push(bodyPara("What is wrong with Example B? Circle the correct reason, then finish the sentence.", { bold: true }));
      children.push(bodyPara("Example B skips a heading level, going from _____ straight to _____, which makes the page structure confusing and _____________________."));
      children.push(spacer(250));
    } else if (extension) {
      children.push(bodyPara("What is wrong with Example B, and how would you fix it? Also explain why this matters for a visitor using a screen reader, not just for visual style.", { bold: true }));
      children.push(spacer(300));
    } else {
      children.push(bodyPara("What is wrong with Example B? Explain in your own words.", { bold: true }));
      children.push(spacer(250));
    }

    children.push(bodyPara("Now sketch the heading hierarchy for your own personal website's homepage.", { bold: true }));
    children.push(spacer(80));

    if (support) {
      children.push(wordBank("Section ideas:", ["About Me", "My Hobbies", "My Goals", "Favorite Subjects"]));
      children.push(spacer(150));
      children.push(bodyPara("Worked example to copy the pattern from:", { italics: true }));
      children.push(codeBlock([
        "<h1>Hi, I'm Sara</h1>",
        "<p>A short introduction about who I am.</p>",
        "<h2>My Hobbies</h2>",
        "<p>A short paragraph about what I enjoy doing.</p>",
      ]));
      children.push(spacer(150));
      children.push(sketchRow("h1 - Page title:", 1));
      children.push(spacer(100));
      children.push(sketchRow("h2 - Section 1 title, and what the paragraph will say:", 2));
      children.push(spacer(100));
      children.push(sketchRow("h2 - Section 2 title, and what the paragraph will say:", 2));
    } else {
      children.push(sketchRow("h1 - Page title:", 1));
      children.push(spacer(100));
      children.push(sketchRow("h2 - Section 1 title, and what the paragraph will say:", 2));
      children.push(spacer(100));
      children.push(sketchRow("h2 - Section 2 title, and what the paragraph will say:", 2));
      children.push(spacer(100));
      children.push(sketchRow("h2 - Section 3 title, and what the paragraph will say:", 2));
    }

    if (extension) {
      children.push(spacer(150));
      children.push(calloutBox(BLUE, BLUE_FILL, [
        "Extension - Justify your choices:",
        "For each section above, write one sentence explaining why you chose that heading level (h1 vs. h2 vs. h3) rather than a different one.",
      ]));
      children.push(spacer(250));
    }

    children.push(spacer(200));
    children.push(bodyPara("Exit ticket: Which heading level would you use for a page's main title, and which for a section title?", { bold: true }));
    children.push(spacer(280));

    saveDoc(children, tier ? `${filenameBase} - ${tier === "support" ? "Support (Beginning)" : "Extension (Above)"}.docx` : `${filenameBase}.docx`);
  }

  build(null);
  build("support");
  build("extension");
}

// ============================================================
// LESSON 2 - Guided Practice: Building a Structured Page
// ============================================================
{
  const subject = "Term 1, Week 3, Lesson 2";
  const lessonLine = "Guided Practice: Building a Structured Page";
  const title = "Building a Structured Page, Checkpoint Sheet";
  const filenameBase = "W3L2 - Building a Structured Page - Checkpoint Sheet";

  function build(tier) {
    const support = tier === "support";
    const extension = tier === "extension";

    const children = [
      ...titleBlock(subject, lessonLine, title),
      tierBanner(tier),
      bodyPara("<strong> marks text as important (usually shown bold). <em> marks text as emphasized (usually shown italic). Use them for meaning, not just to make something look bold or italic."),
      spacer(150),
      checklistItem("Checkpoint 1: added an h1 page title and an introductory paragraph"),
      checklistItem("Checkpoint 2: added at least 2 more sections, each with an h2 and a paragraph"),
      checklistItem("Added one <strong> use inside a paragraph"),
      checklistItem("Added one <em> use inside a paragraph"),
      spacer(200),
      bodyPara("Target example:", { bold: true }),
      spacer(60),
      codeBlock([
        "<h2>My Favorite Subject</h2>",
        "<p>My favorite subject is <strong>Design</strong>, because I get to",
        "<em>build real things</em> with code.</p>",
      ]),
      spacer(200),
    ];

    if (support) {
      children.push(wordBank("Sentence starter:", ['"My favorite ___ is ___, because ___."']));
      children.push(spacer(150));
      children.push(bodyPara("Write your <strong> / <em> sentence here first, then copy it into your code:", { bold: true }));
      children.push(spacer(250));
    } else if (extension) {
      children.push(calloutBox(BLUE, BLUE_FILL, [
        "Extension - a second use:",
        "Add a second <strong> and a second <em> use somewhere else on your page, then explain in one sentence why you chose the semantic tag rather than just making the text bold or italic.",
      ]));
      children.push(spacer(250));
    }

    children.push(bodyPara("Partner structure check - swap screens with a partner and review their file:", { bold: true }));
    children.push(spacer(80));
    children.push(checklistItem("Heading hierarchy is used correctly (no skipped levels)"));
    children.push(checklistItem("At least one <strong> and one <em> are used, and both make sense"));

    saveDoc(children, tier ? `${filenameBase} - ${tier === "support" ? "Support (Beginning)" : "Extension (Above)"}.docx` : `${filenameBase}.docx`);
  }

  build(null);
  build("support");
  build("extension");
}

// ============================================================
// LESSON 3 - Independent Application: Formatting Your Own Content
// ============================================================
{
  const subject = "Term 1, Week 3, Lesson 3";
  const lessonLine = "Independent Application: Formatting Your Own Content";
  const title = "Formatting Your Own Content, Planning Sheet";
  const filenameBase = "W3L3 - Formatting Your Own Content - Planning Sheet";

  function build(tier) {
    const support = tier === "support";
    const extension = tier === "extension";

    const children = [
      ...titleBlock(subject, lessonLine, title),
      tierBanner(tier),
      bodyPara(support
        ? "Plan and write one new content section for your personal website."
        : "Plan and write 1-2 new content sections for your personal website, using headings, paragraphs, and at least 2 formatting tags in total."),
      spacer(150),
    ];

    if (support) {
      children.push(wordBank("Section ideas:", ["My Goals", "Favorite Things", "My Hobbies", "Favorite Subjects"]));
      children.push(spacer(120));
      children.push(bodyPara("Sentence starters:", { italics: true }));
      children.push(bodyPara('"This year I want to ___ because ___."'));
      children.push(bodyPara('"One of my favorite ___ is ___."'));
      children.push(spacer(150));
      children.push(sketchRow("h2 - New section title:", 1));
      children.push(spacer(100));
      children.push(sketchRow("Paragraph (remember at least one <strong> or <em>):", 3));
    } else {
      children.push(sketchRow("h2 - New section 1 title:", 1));
      children.push(spacer(100));
      children.push(sketchRow("Paragraph (use at least one <strong> or <em>):", 3));
      children.push(spacer(150));
      children.push(sketchRow("h2 - New section 2 title (optional, or required for stretch):", 1));
      children.push(spacer(100));
      children.push(sketchRow("Paragraph (use at least one <strong> or <em>):", 3));
    }

    children.push(spacer(150));

    if (extension) {
      children.push(calloutBox(BLUE, BLUE_FILL, [
        "Extension - required stretch:",
        "Both sections above are required (not optional). Also try the <br> line break tag and the <hr> horizontal rule tag somewhere appropriate on your page, then add a third content section if you have time.",
      ]));
      children.push(spacer(200));
      children.push(codeBlock([
        "<hr>",
        "<h2>Favorite Subjects</h2>",
        "<p>Design<br>Mathematics<br>Art</p>",
      ]));
    } else {
      children.push(bodyPara("Stretch challenge (optional): research the <br> line break tag and the <hr> horizontal rule tag, and try adding one of each where it makes sense on your page.", { bold: !support, italics: support }));
    }

    saveDoc(children, tier ? `${filenameBase} - ${tier === "support" ? "Support (Beginning)" : "Extension (Above)"}.docx` : `${filenameBase}.docx`);
  }

  build(null);
  build("support");
  build("extension");
}

// ============================================================
// LESSON 4 - Formative Assessment: HTML Structure & Text Formatting
// ============================================================
{
  const subject = "Term 1, Week 3, Lesson 4";
  const lessonLine = "Formative Assessment: HTML Structure & Text Formatting";
  const title = "Self-Check Rubric, Before You Submit";
  const filenameBase = "W3L4 - Self-Check Rubric";

  function build(tier) {
    const support = tier === "support";
    const extension = tier === "extension";

    const children = [
      ...titleBlock(subject, lessonLine, title, {
        text: "This is the official Week 3 formative assessment (10 pts) - submit via Toddle once every box is checked.",
        color: "555555",
      }),
      tierBanner(tier),
      bodyPara("Warm-up: for each tag your teacher flashes on the screen, say its purpose out loud. Tags will mix Weeks 1-2 structure tags with this week's formatting tags.", { italics: true }),
      spacer(150),
    ];

    if (support) {
      children.push(bodyPara("Check your file against each box below, one at a time. Fix anything unchecked before moving to the next box.", { bold: true }));
      children.push(spacer(100));
      children.push(calloutBox(RED, RED_FILL, [
        "Step 1 - Structure (from Weeks 1-2):",
      ]));
      children.push(checklistItem("File starts with <!DOCTYPE html>"));
      children.push(checklistItem("<html> wraps everything else"));
      children.push(checklistItem("<head> contains a <title>"));
      children.push(checklistItem("<body> contains all the visible content"));
      children.push(spacer(150));
      children.push(calloutBox(RED, RED_FILL, [
        "Step 2 - This week's formatting:",
      ]));
      children.push(checklistItem("Heading levels are correct, with no skipped levels (h1 then h2, not h1 then h4)"));
      children.push(checklistItem("At least one <strong> tag is used and makes sense"));
      children.push(checklistItem("At least one <em> tag is used and makes sense"));
      children.push(checklistItem("Content is organized under clear, readable headings"));
    } else {
      children.push(bodyPara("Valid HTML document structure carried over from Weeks 1-2:", { bold: true }));
      children.push(spacer(80));
      children.push(checklistItem("Correct DOCTYPE, <html>, <head>, and <body>, with no broken nesting"));
      children.push(spacer(150));
      children.push(bodyPara("This week's text formatting:", { bold: true }));
      children.push(spacer(80));
      children.push(checklistItem("Text formatting tags (headings, <strong>, <em>) are used correctly"));
      children.push(checklistItem("Content is organized logically and readably"));
    }

    children.push(spacer(200));
    children.push(bodyPara("Reflection: What part of formatting text in HTML felt easiest, and what still feels tricky?", { bold: true }));
    children.push(spacer(280));

    if (extension) {
      children.push(calloutBox(BLUE, BLUE_FILL, [
        "Extension - after you submit:",
        "Once your own file is submitted, swap screens with a partner who has also submitted and check their file against the same rubric above. Write one specific, kind piece of feedback for them below.",
      ]));
      children.push(spacer(250));
    }

    saveDoc(children, tier ? `${filenameBase} - ${tier === "support" ? "Support (Beginning)" : "Extension (Above)"}.docx` : `${filenameBase}.docx`);
  }

  build(null);
  build("support");
  build("extension");
}
