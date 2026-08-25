// Week 5 — Sept 28 — Hyperlinks & Navigation
TERM1_WEEKS.push({
  week: 5,
  dates: "Sept 28",
  status: "content",
  topic: "Hyperlinks & Navigation",
  inquiryQuestion: "What makes website navigation effective and user-friendly?",
  criterion: "Criterion A: Inquiring and Analyzing — A.iii: Analyze a range of existing products that inspire a solution to identify their strengths and weaknesses.",
  standard: "PG 4: Use systems thinking to describe networks and common software and hardware components. (Computing Systems & Networks, GLE CS.HS.2.1 — Networked computing devices exchange information through protocols.)",
  weekObjectives: [
    "Create hyperlinks.",
    "Connect webpages.",
    "Navigate between pages."
  ],
  successCriteria: [
    "Create working hyperlinks.",
    "Link webpages successfully.",
    "Navigate efficiently between pages."
  ],
  crossCurricular: "English: Understanding information organization and navigation structures.",
  nationalIdentity: "UAE Government Digital Services",
  formative: "Hyperlinks, Images & Tables Activities — 10 pts (Lesson 4)",
  summative: null,
  lessons: [
    {
      number: 1,
      title: "How the Web Connects: The Anchor Tag",
      duration: "60 min",
      objective: "Explain how hyperlinks connect webpages and create working links using the anchor tag.",
      vocabulary: [
        { term: "Hyperlink", definition: "Clickable text or an image that takes the user to another webpage or location when clicked." },
        { term: "Anchor Tag", definition: "The <a> tag — the HTML element used to create a hyperlink." },
        { term: "href", definition: "The attribute inside an anchor tag that holds the destination address the link points to." },
        { term: "Absolute Link", definition: "A link using the full web address of a page (e.g. https://www.wikipedia.org), usually pointing to another website." },
        { term: "Relative Link", definition: "A link using just a filename or short path (e.g. about.html) to point to another page within the same project." }
      ],
      warmup: "Ask: 'What actually happens when you click a link?' Take guesses before explaining.",
      main: [
        "Mini-lecture: the web is a network of linked documents. The <a> (anchor) tag with an href attribute creates a clickable link to another page or site — connect this to how networked devices exchange information.",
        "Demo: build a link to an external website, then a link to a second local HTML file (e.g. about.html).",
        "Introduce the target=\"_blank\" attribute for opening links in a new tab, and discuss when that's appropriate (external sites) vs. not (internal site navigation).",
        "Guided notes: students record the anchor tag syntax and the difference between an absolute link (full web address) and a relative link (a file in the same project)."
      ],
      code: "<!-- External link -->\n<a href=\"https://www.wikipedia.org\" target=\"_blank\">Visit Wikipedia</a>\n\n<!-- Internal (relative) link to another page in the same project -->\n<a href=\"about.html\">About Me</a>",
      task: "Create one external link and one internal link (to a second file they create now if they don't already have one, e.g. about.html) on their homepage.",
      successChecklist: [
        "Can explain what the href attribute does.",
        "Understands the difference between an absolute and a relative link."
      ],
      exitTicket: "'Why might you NOT want every link on your own site to open in a new tab?'",
      notes: null
    },
    {
      number: 2,
      title: "Guided Practice: Building a Navigation Menu",
      duration: "60 min",
      objective: "Build a working navigation menu that links between multiple pages of their own website with teacher support.",
      vocabulary: [
        { term: "Navigation", definition: "The system of links (often a menu) that lets a visitor move between the different pages of a website." }
      ],
      warmup: "Quick recap: what tag and attribute make a hyperlink?",
      main: [
        "Teacher models combining last week's unordered list with anchor tags to build a simple navigation menu.",
        "Checkpoint 1: students create a second and third HTML file if they don't have them yet (e.g. about.html, contact.html).",
        "Checkpoint 2: students build a <ul> navigation menu with a link to each page, and place it at the top of every page.",
        "Common error check: broken relative paths (wrong filename, wrong capitalization, missing .html extension)."
      ],
      code: "<nav>\n  <ul>\n    <li><a href=\"index.html\">Home</a></li>\n    <li><a href=\"about.html\">About</a></li>\n    <li><a href=\"contact.html\">Contact</a></li>\n  </ul>\n</nav>",
      task: "Build a navigation menu and add it to the top of at least 2 of their HTML pages, then click through it in the browser to confirm every link works.",
      successChecklist: [
        "Navigation menu links to at least 2 real pages.",
        "All links work correctly when clicked in the browser."
      ],
      exitTicket: "Demo to a partner: click through your navigation menu without any broken links.",
      notes: "Broken relative links are the #1 error this lesson — check filename spelling/casing carefully while circulating."
    },
    {
      number: 3,
      title: "Independent Application: A Fully Connected Site",
      duration: "60 min",
      objective: "Independently expand and refine their site's navigation so every page connects to every other page.",
      warmup: "'Click through your own site right now — is there any page you can't get back to Home from?'",
      main: [
        "Students audit their own site: does every page have the navigation menu? Can a visitor always get back to Home?",
        "Independently fix any missing or broken links.",
        "Add the navigation menu consistently across all existing pages.",
        "Stretch challenge: link to an external resource relevant to a page's content (e.g. a source they used, a tool they mention) using target=\"_blank\" appropriately.",
        "Teacher circulates for 1:1 support on trickier relative path issues."
      ],
      code: null,
      task: "Ensure every page on their site has a consistent, fully working navigation menu, with no broken links.",
      successChecklist: [
        "Navigation is present and identical across all pages.",
        "Every link has been tested and works."
      ],
      exitTicket: "None formal — informal circulation check.",
      notes: null
    },
    {
      number: 4,
      title: "Formative Assessment: Hyperlinks & Navigation Task",
      duration: "60 min",
      objective: "Demonstrate correct, independent creation of working hyperlinks and site navigation for the week's graded formative assessment.",
      warmup: "Quick-fire: spot the bug in 3 broken href examples on the board.",
      main: [
        "Explain the formative assessment task and rubric (part of the combined 'Hyperlinks, Images & Tables Activities' assessment).",
        "Students complete a navigation task independently: build/verify a working multi-page navigation structure against the success criteria.",
        "Teacher circulates and records evidence for the rubric.",
        "Peer test: swap with a partner and try to 'break' their navigation by clicking everything — report back any issues found."
      ],
      code: null,
      task: "Complete and submit evidence of a fully working navigation menu across their site as part of the 'Hyperlinks, Images & Tables Activities' formative assessment (10 pts).",
      successChecklist: [
        "Create working hyperlinks.",
        "Link webpages successfully.",
        "Navigate efficiently between pages."
      ],
      exitTicket: "'What's one navigation design choice (from any real website) you want to copy for your own site?'",
      notes: "This lesson contributes the hyperlinks/navigation portion of the Week 5 formative assessment (10 pts, shared with next week's Images content per the syllabus)."
    }
  ]
});
