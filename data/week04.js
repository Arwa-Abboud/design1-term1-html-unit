// Week 4 — Sept 21 — Lists in HTML
TERM1_WEEKS.push({
  week: 4,
  dates: "Sept 21",
  status: "content",
  topic: "Lists in HTML",
  inquiryQuestion: "How can information be organized clearly and efficiently for users?",
  criterion: "Criterion C: Creating the Solution — C.ii: Demonstrate excellent technical skills when making the solution.",
  standard: "PG 7: Design and create programs, individually and collaboratively, for a variety of disciplines. (Computer Programming, GLE CS.HS.3.1 — The creation of a computer program requires a design process.)",
  weekObjectives: [
    "Create ordered lists.",
    "Create unordered lists.",
    "Organize information using lists."
  ],
  successCriteria: [
    "Create lists correctly.",
    "Select appropriate list types.",
    "Present information clearly."
  ],
  crossCurricular: "Social Studies: Organizing historical and cultural information effectively.",
  nationalIdentity: "UAE Heritage and Culture",
  formative: "Observation, practical task (Lesson 4)",
  summative: null,
  lessons: [
    {
      number: 1,
      title: "Ordered vs. Unordered Lists",
      duration: "60 min",
      objective: "Explain the difference between ordered and unordered lists and identify when to use each.",
      vocabulary: [
        { term: "Ordered List", definition: "A numbered list (<ol>), used when the sequence of items matters (e.g. steps in a process)." },
        { term: "Unordered List", definition: "A bulleted list (<ul>), used when the order of items doesn't matter (e.g. a list of hobbies)." },
        { term: "List Item", definition: "The <li> tag — each individual entry inside an ordered or unordered list." }
      ],
      warmup: "Show two real examples: a recipe's numbered steps and a shopping list. 'What's different about how these two are organized?'",
      main: [
        "Mini-lecture: unordered lists (<ul> + <li>) are for items where order doesn't matter (bulleted); ordered lists (<ol> + <li>) are for items where sequence matters (numbered).",
        "Demo: build one of each list type live, showing the <ul>/<ol> wrapper with <li> items inside.",
        "Discuss: when would a website use each type? (e.g. navigation menu = unordered, step-by-step instructions = ordered).",
        "Guided notes: students record both syntaxes side by side."
      ],
      code: "<h2>My Hobbies (Unordered)</h2>\n<ul>\n  <li>Reading</li>\n  <li>Coding</li>\n  <li>Football</li>\n</ul>\n\n<h2>How I Built This Page (Ordered)</h2>\n<ol>\n  <li>Planned the content</li>\n  <li>Wrote the HTML</li>\n  <li>Tested it in the browser</li>\n</ol>",
      task: "Identify 3 real-world examples from their own life that would be an ordered list and 3 that would be an unordered list.",
      successChecklist: [
        "Can explain the difference between <ul> and <ol>.",
        "Can give a correct real-world example of each."
      ],
      exitTicket: "'Would a website's main navigation menu be an ordered or unordered list — and why?'",
      notes: null
    },
    {
      number: 2,
      title: "Guided Practice: Building Lists",
      duration: "60 min",
      objective: "Build correctly nested ordered and unordered lists with teacher support.",
      vocabulary: [
        { term: "Nested List", definition: "A list placed inside a list item of another list — used to show sub-groups within a bigger category." }
      ],
      warmup: "Quick fix-it: show a list with a missing closing </li> tag — students spot the error.",
      main: [
        "Teacher models building an unordered list step by step, then converts it to an ordered list to show how little needs to change.",
        "Checkpoint 1: students build one unordered list with at least 3 items.",
        "Checkpoint 2: students build one ordered list with at least 3 items.",
        "Introduce nested lists (a list inside a list item) for more complex organization, with a worked example.",
        "Common error check: unclosed <li> tags, list items placed outside the <ul>/<ol> wrapper."
      ],
      code: "<ul>\n  <li>Web Design\n    <ul>\n      <li>HTML</li>\n      <li>CSS (coming later)</li>\n    </ul>\n  </li>\n  <li>Programming</li>\n</ul>",
      task: "Build one unordered list and one ordered list (3+ items each) on their personal website, and attempt one nested list.",
      successChecklist: [
        "Both list types render correctly with no errors.",
        "Nested list (if attempted) is structured correctly."
      ],
      exitTicket: "Submit a screenshot of the rendered lists for a quick teacher check.",
      notes: null
    },
    {
      number: 3,
      title: "Independent Application: Organizing Real Content",
      duration: "60 min",
      objective: "Independently choose and build the appropriate list type to organize real content on their personal website.",
      warmup: "'What content on your own website could be turned into a list instead of a paragraph?'",
      main: [
        "Students identify at least 2 places on their personal website where a list would organize the content better than a paragraph (e.g. skills, favorite books, steps in a process).",
        "Students independently build and integrate these lists into their existing page(s).",
        "Stretch challenge: build a simple navigation-style unordered list styled as a menu (even without CSS yet, discuss how this will later become the site's navigation bar).",
        "Teacher circulates for 1:1 feedback on list-type choices."
      ],
      code: "<h2>My Skills</h2>\n<ul>\n  <li>HTML</li>\n  <li>Problem Solving</li>\n  <li>Teamwork</li>\n</ul>",
      task: "Replace at least one paragraph on their site with a properly chosen and correctly built list.",
      successChecklist: [
        "List type chosen matches the content (ordered vs. unordered).",
        "Content is clearer as a list than it was as a paragraph."
      ],
      exitTicket: "None formal — informal circulation check.",
      notes: null
    },
    {
      number: 4,
      title: "Review & Practical Task: Lists in Context",
      duration: "60 min",
      objective: "Demonstrate correct, independent use of ordered and unordered lists to organize information clearly.",
      warmup: "Quick-fire vocabulary check: <ul>, <ol>, <li> — what does each do?",
      main: [
        "Peer review: partners check each other's lists against the success criteria (correct type, correct syntax, clear content).",
        "Whole-class troubleshooting of any recurring list-syntax errors.",
        "Formal practical task: students complete a short list-building activity (teacher-provided content that must be organized using the correct list type) as this week's formative check.",
        "Preview next week's topic: Hyperlinks & Navigation — tease that today's unordered lists are about to become a real navigation menu."
      ],
      code: null,
      task: "Complete the practical list-organizing task and submit for the formative check (observation + practical task).",
      successChecklist: [
        "Create lists correctly.",
        "Select appropriate list types.",
        "Present information clearly."
      ],
      exitTicket: "'One website (real or your own) that uses lists well, and why they work there.'",
      notes: "This lesson is the Week 4 formative checkpoint (observation, practical task) noted in the Scope & Sequence."
    }
  ]
});
