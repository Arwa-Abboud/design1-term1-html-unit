// Week 2 — Sept 7 — HTML Document Structure
// Template for a "normal" skill-building week: Intro/Demo -> Guided Practice -> Independent Application -> Review & Mini-Check.
TERM1_WEEKS.push({
  week: 2,
  dates: "Sept 7",
  status: "content",
  topic: "HTML Document Structure",
  inquiryQuestion: "How do professional websites organize information effectively for users?",
  criterion: "Criterion A: Inquiring and Analyzing — A.iii: Analyze a range of existing products that inspire a solution to identify their strengths and weaknesses.",
  standard: "PG 1: Develop, utilize and evaluate algorithms to model and solve problems. (Computational Thinking, GLE CS.HS.1.4 — Large, complex problems can be broken down into smaller, manageable components.)",
  weekObjectives: [
    "Create a webpage structure.",
    "Use html, head, title and body tags correctly.",
    "Apply proper HTML syntax."
  ],
  successCriteria: [
    "Create a valid HTML document structure.",
    "Use tags correctly.",
    "Display content successfully in a browser."
  ],
  crossCurricular: "ICT: Understanding how browsers interpret webpage structure.",
  nationalIdentity: "UAE Digital Economy",
  formative: "HTML structure check (Lesson 4)",
  summative: null,
  lessons: [
    {
      number: 1,
      title: "The Anatomy of an HTML Document",
      duration: "60 min",
      objective: "Explain and correctly use the core structural tags: <!DOCTYPE html>, <html>, <head>, <title>, and <body>.",
      vocabulary: [
        { term: "Doctype Declaration", definition: "The very first line of an HTML file (<!DOCTYPE html>) that tells the browser which version of HTML to expect." },
        { term: "Head", definition: "The part of an HTML document (<head>) that holds information about the page, like its title — nothing inside it shows directly on the page." },
        { term: "Body", definition: "The part of an HTML document (<body>) that holds everything visible to a visitor — text, images, links, etc." },
        { term: "Nesting", definition: "Placing one HTML element inside another, so the inner element is fully contained within the outer one." }
      ],
      warmup: "Recap last week's Hello World / About Me file — which tags did we use, and what do students think might be missing from a 'real' webpage?",
      main: [
        "Mini-lecture: every HTML document needs a standard 'skeleton' — the DOCTYPE declaration, the html root element, the head (metadata, not visible), and the body (everything visible on the page).",
        "Live demo: build a document structure line by line, explaining what each tag does and why the order/nesting matters.",
        "Connect to today's standard: decomposing a webpage into logical structural parts is an example of breaking a large problem into smaller, manageable components.",
        "Show a 'broken' structure example (tags missing or out of order) and diagnose it together as a class.",
        "Guided notes: students copy a labeled diagram of the structure into their notes."
      ],
      code: "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Page Title (shows in browser tab)</title>\n  </head>\n  <body>\n    <!-- Everything visible on the page goes here -->\n  </body>\n</html>",
      task: "Label a given blank HTML structure diagram with the correct tag names and a one-line description of each tag's job.",
      successChecklist: [
        "Can name the 5 core structural tags in the correct order.",
        "Can explain the difference between <head> and <body>."
      ],
      exitTicket: "Quick write: 'What would happen if we left out the <body> tag?'",
      notes: null
    },
    {
      number: 2,
      title: "Guided Build: Structuring a Page",
      duration: "60 min",
      objective: "Build a correctly structured HTML document using html, head, title, and body tags with teacher support.",
      vocabulary: [
        { term: "Opening Tag", definition: "The first half of an element, written as <tagname>, that marks where it begins." },
        { term: "Closing Tag", definition: "The second half of an element, written as </tagname> with a forward slash, that marks where it ends." },
        { term: "Case Sensitivity", definition: "When uppercase and lowercase letters are treated as different characters — HTML tags/attributes should stay consistently lowercase to avoid errors." }
      ],
      warmup: "Quick matching activity: match each tag name to its purpose.",
      main: [
        "Teacher models building a document structure one step at a time, pausing after each line for students to replicate it.",
        "Checkpoint 1: confirm DOCTYPE + <html> tags are in place (teacher walks the room).",
        "Checkpoint 2: confirm <head> + <title> are in place.",
        "Checkpoint 3: confirm <body> opens and closes correctly.",
        "Students add a heading and a paragraph inside the body to test their understanding of nesting.",
        "Mini-lesson on common syntax errors: unclosed tags, mismatched tags, and case sensitivity."
      ],
      code: "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Structured Page</title>\n  </head>\n  <body>\n    <h1>Welcome</h1>\n    <p>This paragraph is nested correctly inside the body.</p>\n  </body>\n</html>",
      task: "Build the 'shell' of a brand-new HTML page from scratch (not copy-pasted) following the three checkpoints, then open it in a browser to confirm it renders without errors.",
      successChecklist: [
        "Document includes all 5 core tags in the correct nested order.",
        "Page renders in the browser with no visible errors."
      ],
      exitTicket: "Partner check: swap screens and use a quick structure checklist to review each other's file.",
      notes: "Circulate heavily during this lesson — unclosed/mismatched tags are the most common beginner error at this stage."
    },
    {
      number: 3,
      title: "Independent Build: Expanding Your Homepage",
      duration: "60 min",
      objective: "Apply correct HTML document structure independently to expand their personal website homepage.",
      warmup: "Quick share: 'What's one part of your own website from last week that felt confusing to build?'",
      main: [
        "Briefly review the structure checklist from Lesson 2.",
        "Introduce today's challenge: expand last week's index.html into a properly structured, richer homepage with multiple headings and paragraphs.",
        "Students work independently or in pairs to restructure and expand their file.",
        "Stretch challenge (for early finishers): create a second properly structured file, e.g. about.html, to start thinking ahead to multi-page sites.",
        "Teacher circulates for 1:1 support rather than leading whole-class instruction."
      ],
      code: "<!DOCTYPE html>\n<html>\n  <head>\n    <title>About Me</title>\n  </head>\n  <body>\n    <h1>Hi, I'm [Your Name]</h1>\n    <p>A short introduction paragraph.</p>\n    <h2>My Interests</h2>\n    <p>A paragraph about hobbies or interests.</p>\n  </body>\n</html>",
      task: "Expand index.html with a properly nested structure containing at least 2 headings and 2 paragraphs. Optionally begin a second file.",
      successChecklist: [
        "File structure is valid and complete.",
        "Content is organized logically under clear headings."
      ],
      exitTicket: "None formal — informal circulation check by the teacher.",
      notes: "This is the most autonomous lesson of the week — resist over-directing so students build independence."
    },
    {
      number: 4,
      title: "Peer Review & Structure Check",
      duration: "60 min",
      objective: "Review and correct HTML document structure errors through peer feedback and complete the week's formal structure check.",
      warmup: "Quick-fire: show 3 broken code snippets on the board, students spot the error out loud.",
      main: [
        "Peer review: swap laptops/screens with a partner and use a structure checklist to review each other's file.",
        "Whole-class troubleshooting of the 2-3 most common recurring errors observed during peer review.",
        "Students fix any issues flagged by their partner.",
        "Formal formative check: teacher reviews each student's file against this week's success criteria.",
        "Preview next week's topic: Headings, Paragraphs & Text Formatting."
      ],
      code: null,
      task: "Complete the peer review checklist, fix flagged issues, and submit the final corrected index.html for the formative check.",
      successChecklist: [
        "Create a valid HTML document structure.",
        "Use tags correctly.",
        "Display content successfully in a browser."
      ],
      exitTicket: "'One thing your partner helped you fix today.'",
      notes: "This lesson is the formal HTML structure check formative assessment noted in the Scope & Sequence."
    }
  ]
});
