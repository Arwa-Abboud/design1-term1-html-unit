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
        "Guided notes: students record the anchor tag syntax and the difference between an absolute link (full web address) and a relative link (a file in the same project).",
        "Frayer Model: in pairs, students complete a Frayer Model for 'Absolute Link' vs. 'Relative Link' side by side — definition, characteristics, a real example, and a non-example for each — since these two terms are the ones most often confused."
      ],
      code: "<!-- External link -->\n<a href=\"https://www.wikipedia.org\" target=\"_blank\">Visit Wikipedia</a>\n\n<!-- Internal (relative) link to another page in the same project -->\n<a href=\"about.html\">About Me</a>",
      literacyStrategy: {
        name: "Frayer Model",
        note: "Absolute Link vs. Relative Link are the two terms students confuse most this week — a side-by-side Frayer Model pair makes the contrast explicit before they start building navigation."
      },
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
      title: "Build an F1 Website: Four Pages",
      duration: "60 min",
      objective: "Build a four-page website from scratch (Home, About Us, Contact Us, Vision and Mission) and connect the pages with a navigation menu of hyperlinks.",
      warmup: "'Think of a website you use often. Which pages does it almost always have? Name 3.'",
      main: [
        "Explain the project: an F1 website with four pages, each saved as its own .html file in ONE folder: index.html, about.html, contact.html, vision.html.",
        "Teacher models the shared page skeleton: only the <title> and the page text change from page to page.",
        "Build the Home page (index.html) together, save it and open it in the browser.",
        "Students build the other three pages independently: the Page Content sheet gives the text for each page (labeled main heading, paragraph, list), and students write the HTML themselves.",
        "Students add the same navigation menu (Home, About Us, Contact Us, Vision and Mission) to the top of every page, plus an external link to formula1.com on the Home page, and test every link.",
        "Stretch challenge: add a fifth page, team.html, about a favourite F1 team (heading, paragraph, list of 3 facts)."
      ],
      code: "<!DOCTYPE html>\n<html>\n<head>\n  <title>F1 World - Home</title>\n</head>\n<body>\n  <h1>Welcome to F1 World</h1>\n  <p>Formula 1 is the fastest motor racing sport in the world.</p>\n</body>\n</html>",
      task: "Create all four F1 pages with the correct file names, writing the HTML for the text on the Page Content sheet, then connect them with a navigation menu on every page and test every link.",
      successChecklist: [
        "All 4 files are created with the correct names.",
        "The navigation menu is at the top of every page.",
        "Every link works when clicked."
      ],
      exitTicket: "Show a partner that you can reach every page from every other page using your menu.",
      notes: "Keep file names lowercase with no spaces; this prevents most broken links in Lesson 4."
    },
    {
      number: 4,
      title: "Formative Assessment: Finishing and Checking the F1 Website",
      duration: "60 min",
      objective: "Finish the F1 website started in Lesson 3 and check it against the formative checklist: four pages, a working navigation menu on every page, and one external link.",
      warmup: "Quick-fire: spot the bug in 3 broken href examples on the board.",
      main: [
        "Explain the formative task and the Final Checklist (part of the combined 'Hyperlinks, Images & Tables Activities' assessment).",
        "Students continue building from Lesson 3: this is a two-day task, so Lesson 4 is finishing time.",
        "Students work through the Final Checklist: pages, navigation menu on every page, link test table, formula1.com link.",
        "Students who are stuck compare their code with the Example Code sheet, one line at a time.",
        "Peer test: swap with a partner and try to 'break' their navigation, then submit evidence via Toddle."
      ],
      code: "<nav>\n  <ul>\n    <li><a href=\"index.html\">Home</a></li>\n    <li><a href=\"about.html\">About Us</a></li>\n    <li><a href=\"contact.html\">Contact Us</a></li>\n    <li><a href=\"vision.html\">Vision and Mission</a></li>\n  </ul>\n</nav>",
      task: "Finish the four-page F1 website, complete every item on the Final Checklist, and submit evidence as part of the 'Hyperlinks, Images & Tables Activities' formative assessment (10 pts).",
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
