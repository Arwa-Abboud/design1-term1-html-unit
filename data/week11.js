// Week 11 — Nov 9 — Multi-Page Websites
TERM1_WEEKS.push({
  week: 11,
  dates: "Nov 9",
  status: "content",
  topic: "Multi-Page Websites",
  inquiryQuestion: "How can a website be designed to meet the needs of a specific target audience?",
  criterion: "Criterion B: Developing Ideas — B.i: Develop a design specification which clearly states the success criteria for the design of a solution.",
  standard: "PG 7: Design and create programs, individually and collaboratively, for a variety of disciplines. (Computer Programming, GLE CS.HS.3.3 — Collaborative tools, methods and strategies can be used to design, develop and update computational artifacts.)",
  weekObjectives: [
    "Create multiple webpages.",
    "Connect pages using navigation.",
    "Organize website structure."
  ],
  successCriteria: [
    "Create a multi-page website.",
    "Use navigation effectively.",
    "Maintain consistent design."
  ],
  crossCurricular: "English: Organizing information for different audiences and purposes across multiple pages.",
  nationalIdentity: "UAE Tourism Promotion",
  formative: "Website Prototype Review — 10 pts (Lesson 3)",
  summative: null,
  lessons: [
    {
      number: 1,
      title: "Plan: Design Specification for Your Website",
      duration: "60 min",
      objective: "Develop a written design specification for their Personal Multi-Page Website Project that clearly states its target audience and success criteria.",
      vocabulary: [
        { term: "Design Specification", definition: "A written plan that names who a product is for, what it needs to do, and how you'll know it succeeded." },
        { term: "Target Audience", definition: "The specific group of people a website is designed for, whose needs shape every design decision." },
        { term: "Site Map", definition: "A list or diagram of every page a website will have and how they connect to each other." }
      ],
      warmup: "Ask: 'Who is your personal website actually FOR?' (future employer, friends/family, college applications, just yourself) — this shapes every decision from here.",
      main: [
        "Introduce the term's major performance task: the Personal Multi-Page Website Project, due Week 13.",
        "Mini-lecture: a design specification names the target audience, the purpose of the site, and the success criteria it must meet — this is Criterion B: Developing Ideas.",
        "Model writing a design specification using a sample audience (e.g. 'a specification for a site aimed at college admissions officers').",
        "Students draft their own design specification: audience, purpose, and a site map listing every planned page (Home, About, Interests/Portfolio, Contact, etc.)."
      ],
      code: null,
      task: "Write a design specification: target audience, site purpose, a full site map (list of planned pages), and 3-4 measurable success criteria for the finished site.",
      successChecklist: [
        "Target audience and purpose are clearly named.",
        "Site map lists every planned page.",
        "Success criteria are specific enough to check against later."
      ],
      exitTicket: "'What page will be the hardest to get right for your chosen audience, and why?'",
      notes: null
    },
    {
      number: 2,
      title: "Build: Consistent Navigation Across All Pages",
      duration: "60 min",
      objective: "Build a consistent, working navigation structure connecting every planned page of their multi-page website.",
      warmup: "Quick share: read your site map from yesterday to a partner.",
      main: [
        "Teacher models auditing an existing multi-page site for consistent navigation and design (same menu, same overall look, on every page).",
        "Checkpoint 1: students create any remaining pages from their site map that don't exist yet.",
        "Checkpoint 2: students ensure the exact same navigation menu appears on every single page, in the same place.",
        "Checkpoint 3: students click through their entire site end-to-end to confirm every link works both ways."
      ],
      code: "<nav>\n  <ul>\n    <li><a href=\"index.html\">Home</a></li>\n    <li><a href=\"about.html\">About</a></li>\n    <li><a href=\"portfolio.html\">Portfolio</a></li>\n    <li><a href=\"contact.html\">Contact</a></li>\n  </ul>\n</nav>",
      task: "Ensure every page in their site map exists and has the identical navigation menu, then test every link in both directions.",
      successChecklist: [
        "Every planned page exists and is complete.",
        "Navigation is identical and fully working across every page."
      ],
      exitTicket: "Demo to a partner: navigate the entire site without any dead ends.",
      notes: null
    },
    {
      number: 3,
      title: "Formative Assessment: Website Prototype Review",
      duration: "60 min",
      objective: "Present their multi-page website prototype for structured peer and teacher review against their own design specification.",
      warmup: "Re-read your design specification from Lesson 1 — has anything changed since then?",
      main: [
        "Explain the Website Prototype Review formative assessment (10 pts) and how it will be scored against the student's own design specification.",
        "Structured peer review: in pairs, students navigate each other's prototype using a review checklist (audience fit, navigation, completeness, consistency).",
        "Teacher circulates during peer review to observe and add feedback for the formal grade.",
        "Students record the top 2 pieces of feedback received to act on next lesson."
      ],
      code: null,
      task: "Complete the Website Prototype Review: present the current site for peer + teacher review and record 2 concrete pieces of feedback.",
      successChecklist: [
        "Create a multi-page website.",
        "Use navigation effectively.",
        "Maintain consistent design."
      ],
      exitTicket: "'Top 2 pieces of feedback you're going to act on.'",
      notes: "This is the official graded Website Prototype Review formative assessment from the syllabus (Week 11, 10 pts)."
    },
    {
      number: 4,
      title: "Refine: Responding to Prototype Feedback",
      duration: "60 min",
      objective: "Apply prototype review feedback to improve the multi-page website's structure, navigation, and design consistency.",
      warmup: "Re-read your top 2 feedback notes from yesterday.",
      main: [
        "Students independently action their recorded feedback from the prototype review.",
        "Teacher circulates for 1:1 support, prioritizing students whose feedback flagged navigation or completeness issues.",
        "Whole-class troubleshooting of any common issue that came up across multiple prototypes.",
        "Preview next week's topic: Personal Website Development — the site now moves from prototype into full content-development mode."
      ],
      code: null,
      task: "Make at least 2 concrete improvements to the site based on prototype review feedback, and re-test full navigation afterward.",
      successChecklist: [
        "Both pieces of recorded feedback have been addressed.",
        "Full site navigation still works correctly after changes."
      ],
      exitTicket: "'What changed on your site because of today's feedback?'",
      notes: null
    }
  ]
});
