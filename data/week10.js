// Week 10 — Nov 2 — Combining HTML Elements
TERM1_WEEKS.push({
  week: 10,
  dates: "Nov 2",
  status: "content",
  topic: "Combining HTML Elements",
  inquiryQuestion: "How can several webpages be connected into a coherent and user-friendly website?",
  criterion: "Criterion C: Creating the Solution — C.i: Construct a logical plan which describes the efficient use of time and resources sufficient for peers to be able to follow to create the solution.",
  standard: "PG 7: Design and create programs, individually and collaboratively, for a variety of disciplines. (Computer Programming, GLE CS.HS.3.2 — Computational artifacts can be modified and improved through an iterative design process.)",
  weekObjectives: [
    "Combine text, images, tables and forms.",
    "Build complete webpages.",
    "Apply HTML skills independently."
  ],
  successCriteria: [
    "Integrate HTML elements correctly.",
    "Create complete webpages.",
    "Demonstrate technical accuracy."
  ],
  crossCurricular: "Design: Applying design principles to create functional digital products.",
  nationalIdentity: "UAE Smart Government",
  formative: "Teacher review — deliverable milestone: Website Design Task (Lesson 4)",
  summative: null,
  lessons: [
    {
      number: 1,
      title: "Planning a Complete Page: Design Task",
      duration: "60 min",
      objective: "Construct a logical plan that combines text, images, lists, tables, and forms into one coherent webpage layout.",
      vocabulary: [
        { term: "Wireframe", definition: "A simple sketch or diagram showing where each piece of content will go on a page, made before writing any code." },
        { term: "Iterative Design", definition: "A design process where you build something, test/get feedback, and improve it in repeated rounds rather than getting it perfect the first time." }
      ],
      warmup: "Show a well-designed real webpage and ask students to point out every element type they've learned so far (headings, paragraphs, lists, links, images, tables, forms).",
      main: [
        "Mini-lecture: real webpages rarely use just one element type — good design combines them logically so a page reads clearly for a specific audience.",
        "Introduce the 'Website Design Task': students will plan a new content page (e.g. a 'My Interests' or 'Portfolio' page) that intentionally combines at least 4 of the element types learned so far.",
        "Model planning: sketch a simple wireframe (boxes labeled heading/image/list/table) before writing any code — this is the logical plan required by Criterion C.i.",
        "Discuss iterative design: today's plan can and should change once building starts — that's normal, not a failure."
      ],
      code: null,
      task: "Sketch a wireframe/plan (paper or digital) for a new content page that will combine at least 4 different HTML element types, labeling what goes where and why.",
      successChecklist: [
        "Plan clearly shows at least 4 different element types being combined.",
        "Plan explains the reasoning behind the layout, not just what's included."
      ],
      exitTicket: "'What's the riskiest/trickiest part of your plan to actually build?'",
      notes: null
    },
    {
      number: 2,
      title: "Guided Build: Bringing the Plan to Life",
      duration: "60 min",
      objective: "Begin building the planned page, combining multiple HTML element types correctly with teacher support.",
      warmup: "Pair up and explain your wireframe plan to a partner in 60 seconds.",
      main: [
        "Teacher models translating a wireframe into real HTML, section by section, showing how each planned element becomes code.",
        "Checkpoint 1: students create the new HTML file and add the structural skeleton + heading(s) from their plan.",
        "Checkpoint 2: students add the next 2 planned elements (e.g. image + list, or table + form).",
        "Teacher circulates to keep students building toward their own plan rather than copying the demo exactly."
      ],
      code: "<h1>My Portfolio</h1>\n<img src=\"images/project1.jpg\" alt=\"Screenshot of my first HTML project\" width=\"300\">\n<ul>\n  <li>Project 1: Personal Homepage</li>\n  <li>Project 2: Contact Form</li>\n</ul>",
      task: "Build the first half of their planned page, implementing at least 2 of the planned element types correctly.",
      successChecklist: [
        "New page file created and linked into site navigation.",
        "At least 2 planned element types are implemented correctly."
      ],
      exitTicket: "Compare progress to plan: what's on track, what's changed?",
      notes: null
    },
    {
      number: 3,
      title: "Independent Build: Completing the Page",
      duration: "60 min",
      objective: "Independently complete the combined-elements page, integrating all planned components into one coherent, working page.",
      warmup: "Quick self-check: what's left to build from yesterday's plan?",
      main: [
        "Students independently complete the remaining planned elements on their new page.",
        "Ensure every element serves the page's actual purpose (no elements added 'just to tick a box').",
        "Cross-check that the page is reachable from the site's main navigation menu.",
        "Stretch challenge: add one element type not in the original plan if it genuinely improves the page.",
        "Teacher circulates for 1:1 troubleshooting as different students hit different technical issues."
      ],
      code: null,
      task: "Finish building the planned page so it combines at least 4 HTML element types correctly and is linked into the site's navigation.",
      successChecklist: [
        "Page combines 4+ element types, all functioning correctly.",
        "Page is reachable via the main navigation menu."
      ],
      exitTicket: "None formal — informal circulation check.",
      notes: null
    },
    {
      number: 4,
      title: "Teacher Review: Website Design Task",
      duration: "60 min",
      objective: "Present the completed combined-elements page for teacher review against Criterion C (technical accuracy and following the plan).",
      warmup: "Quick peer walkthrough: show a partner your finished page and narrate what each element is doing.",
      main: [
        "One-on-one or small-group teacher review conferences: each student walks the teacher through their page, referencing their original wireframe plan.",
        "Teacher gives immediate verbal feedback tied to the success criteria while other students continue polishing/fixing based on peer feedback.",
        "Students log one specific improvement to make before next week based on today's feedback.",
        "Preview next week's topic: Multi-Page Websites — this page becomes one part of a bigger connected site."
      ],
      code: null,
      task: "Complete the teacher review conference and record one concrete improvement to make to the page.",
      successChecklist: [
        "Integrate HTML elements correctly.",
        "Create complete webpages.",
        "Demonstrate technical accuracy."
      ],
      exitTicket: "'One specific thing you'll improve on this page before it's graded.'",
      notes: "This lesson delivers the Website Design Task deliverable and its teacher-review formative checkpoint noted in the Scope & Sequence."
    }
  ]
});
