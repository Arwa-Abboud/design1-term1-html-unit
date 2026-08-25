// Week 3 — Sept 14 — Headings, Paragraphs & Text Formatting
TERM1_WEEKS.push({
  week: 3,
  dates: "Sept 14",
  status: "content",
  topic: "Headings, Paragraphs & Text Formatting",
  inquiryQuestion: "How can webpage content be structured to improve readability and communication?",
  criterion: "Criterion C: Creating the Solution — C.ii: Demonstrate excellent technical skills when making the solution.",
  standard: "PG 7: Design and create programs, individually and collaboratively, for a variety of disciplines. (Computer Programming, GLE CS.HS.3.1 — The creation of a computer program requires a design process.)",
  weekObjectives: [
    "Create headings and paragraphs.",
    "Format webpage text.",
    "Organize content effectively."
  ],
  successCriteria: [
    "Use text formatting tags correctly.",
    "Organize content logically.",
    "Create readable webpages."
  ],
  crossCurricular: "English: Applying writing and communication skills in digital environments.",
  nationalIdentity: "Effective Digital Communication",
  formative: "HTML Structure & Text Formatting Activities — 10 pts (Lesson 4)",
  summative: null,
  lessons: [
    {
      number: 1,
      title: "Headings & Paragraphs: Structuring Text",
      duration: "60 min",
      objective: "Use heading tags (h1-h6) and paragraph tags to structure webpage text in a clear hierarchy.",
      vocabulary: [
        { term: "Heading", definition: "A title tag (h1 through h6) that labels a page or section, with h1 the most important and h6 the least." },
        { term: "Paragraph", definition: "The <p> tag, used to group a block of related sentences together as one unit of text." },
        { term: "Hierarchy", definition: "An ordered structure from most to least important — used here to describe how heading levels (h1 > h2 > h3...) organize a page." }
      ],
      warmup: "Show a wall of unformatted text vs. the same text with headings/paragraphs. 'Which one would you actually read?'",
      main: [
        "Mini-lecture: headings (h1-h6) create a visual and semantic hierarchy — h1 is the most important, h6 the least. Paragraphs (<p>) group related sentences.",
        "Demo: build a simple page using h1 for the page title, h2 for section titles, and <p> for body text.",
        "Discuss why hierarchy matters for both sighted readers (skimming) and screen readers (accessibility/navigation).",
        "Guided notes: students record the heading hierarchy rules and one example of correct vs incorrect use (e.g. skipping from h1 straight to h4)."
      ],
      code: "<h1>My Website</h1>\n<p>Welcome to my personal site.</p>\n\n<h2>About Me</h2>\n<p>A short paragraph about who I am.</p>\n\n<h2>My Hobbies</h2>\n<p>A short paragraph about what I enjoy doing.</p>",
      task: "On paper or in notes, sketch the heading hierarchy (h1/h2/h3) for their own personal website's homepage before touching code.",
      successChecklist: [
        "Can explain the purpose of h1-h6.",
        "Can explain why <p> is used to group text."
      ],
      exitTicket: "'Which heading level would you use for a page's main title, and which for a section title?'",
      notes: null
    },
    {
      number: 2,
      title: "Guided Practice: Building a Structured Page",
      duration: "60 min",
      objective: "Apply headings and paragraphs correctly to build a structured content page with teacher support.",
      vocabulary: [
        { term: "Strong", definition: "The <strong> tag — marks text as important, and browsers usually show it in bold." },
        { term: "Emphasis", definition: "The <em> tag — marks text as emphasized, and browsers usually show it in italics." },
        { term: "Semantic", definition: "Describing HTML that's chosen for its meaning (e.g. <strong> = important), not just how it happens to look." }
      ],
      warmup: "Quick recap: order the heading tags h1-h6 from most to least important.",
      main: [
        "Teacher models adding a new section (heading + paragraph) to a sample page, live.",
        "Checkpoint 1: students add an h1 page title and an introductory paragraph.",
        "Checkpoint 2: students add at least 2 more sections, each with an h2 and a paragraph.",
        "Introduce basic text formatting tags: <strong> (bold/important) and <em> (emphasis/italic), and when to use each semantically (not just visually).",
        "Students add one <strong> and one <em> use inside their paragraphs."
      ],
      code: "<h2>My Favorite Subject</h2>\n<p>My favorite subject is <strong>Design</strong>, because I get to <em>build real things</em> with code.</p>",
      task: "Build a content page (or expand index.html) with a title (h1), at least two sections (h2 + paragraph each), and at least one <strong> and one <em> used correctly.",
      successChecklist: [
        "Heading hierarchy used correctly (no skipped levels).",
        "At least one <strong> and one <em> used appropriately."
      ],
      exitTicket: "Partner check: does your partner's page make sense just from reading the headings alone?",
      notes: "Emphasize <strong>/<em> are about meaning, not just visual style — this sets up good habits before CSS is introduced later in the pathway."
    },
    {
      number: 3,
      title: "Independent Application: Formatting Your Own Content",
      duration: "60 min",
      objective: "Independently structure and format original written content for their personal website using headings, paragraphs, and text formatting.",
      warmup: "'What's one section you want on your personal website that we haven't built yet?' (e.g. Hobbies, Goals, Favorite Projects)",
      main: [
        "Students choose 1-2 new content sections for their personal website (e.g. 'My Goals', 'Favorite Things').",
        "Independently write and structure the content using correct heading hierarchy and paragraphs.",
        "Apply text formatting (<strong>, <em>) purposefully to highlight key words.",
        "Stretch challenge: research and try the <br> line break tag and the <hr> horizontal rule tag appropriately.",
        "Teacher circulates for 1:1 feedback on structure and formatting choices."
      ],
      code: "<h2>My Goals</h2>\n<p>This year I want to learn <strong>web design</strong> and improve my <em>problem-solving</em> skills.</p>\n<hr>\n<h2>Favorite Subjects</h2>\n<p>Design<br>Mathematics<br>Art</p>",
      task: "Add 1-2 new, fully formatted content sections to their personal website using correct headings, paragraphs, and at least 2 formatting tags.",
      successChecklist: [
        "New content is original and organized logically.",
        "Formatting tags are used purposefully, not randomly."
      ],
      exitTicket: "None formal — informal circulation check.",
      notes: null
    },
    {
      number: 4,
      title: "Formative Assessment: HTML Structure & Text Formatting",
      duration: "60 min",
      objective: "Demonstrate correct, independent use of HTML document structure (Weeks 1-2) together with text formatting tags (Week 3) for the week's graded formative assessment.",
      warmup: "Quick review game: flash a tag on the screen, students say its purpose out loud — mix structural tags from Weeks 1-2 (html, head, body) with this week's tags (h1, p, strong, em).",
      main: [
        "Explain the formative assessment task and rubric (shared in advance per the Academic Integrity & Assessment Policy) — remind students this rubric checks their document structure from Weeks 1-2 as well as this week's text formatting.",
        "Students complete the graded activity independently: build or extend a webpage section with a fully valid HTML structure (DOCTYPE, html, head, title, body, correct nesting) AND correct headings, paragraphs, and text formatting.",
        "Teacher circulates to observe and note evidence against all three rubric categories — structure, formatting, and organization/readability (this activity is worth 10 points, Web Design Fundamentals standard).",
        "Early finishers self-check their work against the success criteria checklist before submitting, double-checking their file still has a valid structure from earlier weeks."
      ],
      code: null,
      task: "Complete and submit the 'HTML Structure & Text Formatting Activities' formative assessment (10 pts) via Toddle — the submitted page must have a valid HTML document structure (Weeks 1-2) as well as correct text formatting (Week 3).",
      successChecklist: [
        "Valid HTML document structure carried over from Weeks 1-2 (correct DOCTYPE/html/head/body, no broken nesting).",
        "Use text formatting tags correctly.",
        "Organize content logically and readably."
      ],
      exitTicket: "One-sentence reflection: 'What part of formatting text in HTML felt easiest, and what still feels tricky?'",
      notes: "This is the official graded formative assessment from the syllabus (Week 3, 10 pts). It is cumulative — the rubric also checks Weeks 1-2 document-structure skills, not just this week's text formatting. Share the rubric before students begin, per the Academic Integrity Policy."
    }
  ]
});
