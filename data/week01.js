// Week 1 — Aug 31 — Introduction to HTML & Web Development
// Special week: L1 = Essential Agreement + year/unit overview (elective choice week),
// L2 = platform/login setup, L3-4 = actual HTML content (compressed skill-building pattern).
TERM1_WEEKS.push({
  week: 1,
  dates: "Aug 31",
  status: "content",
  topic: "Introduction to HTML & Web Development",
  inquiryQuestion: "How can websites be used to solve communication problems and meet user needs?",
  criterion: "Criterion A: Inquiring and Analyzing — A.i: Explain and justify the need for a solution to a problem for a specified client/target audience.",
  standard: "PG 4: Use systems thinking to describe networks and common software and hardware components. (Computing Systems & Networks, GLE CS.HS.2.3 — Computer software is written for specific purposes.)",
  weekObjectives: [
    "Explain the purpose of HTML.",
    "Identify webpage components.",
    "Create a basic HTML file."
  ],
  successCriteria: [
    "Explain the role of HTML in web development.",
    "Identify webpage elements correctly.",
    "Create and save an HTML file successfully."
  ],
  crossCurricular: "English: Analyzing how websites communicate information to audiences.",
  nationalIdentity: "UAE Digital Transformation and Future Skills",
  formative: "Observation, questioning, exit ticket (Lesson 4)",
  summative: null,
  lessons: [
    {
      number: 1,
      title: "Essential Agreement & Year/Unit Overview",
      duration: "60 min",
      objective: "Co-create classroom essential agreements and understand the full Design 1 year map, so students can make an informed elective choice (Design vs. Visual Arts) and know what to expect this term.",
      warmup: "Icebreaker: each student shares one thing they've made/built before and one thing they'd like to learn how to make.",
      main: [
        "Welcome & introductions — teacher and students share names and interests.",
        "Co-create classroom essential agreements as a group (respect, collaboration, device use, academic integrity) — explicitly connect this to the school's Academic Integrity Policy on permitted AI tool use.",
        "Present the Design 1 year map: Term 1 Web Design/HTML (Key Concept: Communication), Term 2 Scratch/Interactive Media (Key Concept: Creativity), Term 3 Python (Key Concept: Development) — walk through each term's Statement of Inquiry.",
        "Show the course pathway: Grade 6-8 ICT/Design → Grade 9-10 Digital Design → Grade 11 Pre-AP Computer Science → Grade 12 AP Computer Science Principles.",
        "Frame the elective decision point: what Design 1 involves vs. Visual Arts, answer FAQs, and share the decision timeline/deadline.",
        "Preview Term 1's big performance task: designing and building a personal multi-page website."
      ],
      code: null,
      task: "Complete a short 'About Me & My Goals for This Course' reflection (paper or Toddle form) — used as a baseline artifact for the teacher.",
      successChecklist: [
        "Can name at least 2 of the 3 terms' focus areas.",
        "Understands and has helped shape the class essential agreements.",
        "Knows the elective decision timeline."
      ],
      exitTicket: "Write down one question you still have about this course (sticky note or Toddle comment).",
      notes: "This lesson does not touch HTML content directly — prioritize building psychological safety and getting logistics/expectations right before the technical work begins."
    },
    {
      number: 2,
      title: "Platform & Login Setup",
      duration: "60 min",
      objective: "Successfully log into their laptop and every platform needed for Design 1 (school portal, Toddle, code editor, save location) so no future lesson is lost to tech troubleshooting.",
      vocabulary: [
        { term: "Code Editor", definition: "A program used to write and save code (e.g. VS Code, Notepad) — different from a word processor because it doesn't add hidden formatting." },
        { term: "File Extension", definition: "The letters after the dot in a filename (e.g. .html) that tell the computer/browser what kind of file it is." }
      ],
      warmup: "Quick show of hands: who has written any HTML or code before? Use this to gauge the room.",
      main: [
        "Laptop login and school network connectivity check.",
        "Log into Toddle (student view) and confirm students can see the Design 1 class/board.",
        "Locate and verify the code editor: install-check VS Code (or confirm Notepad as backup) — open and save a test file.",
        "Set up a class folder structure (e.g. Design1-HTML/) on the desktop or OneDrive — explain why organized file-saving matters for grading and their end-of-term portfolio.",
        "Walk through file naming conventions: no spaces, lowercase, correct .html extension.",
        "'Hello World' test: create index.html with a title and the text Hello, World!, save it in the correct folder, and open it in a browser.",
        "Troubleshooting station — teacher circulates to resolve individual login/software issues while others finish early."
      ],
      code: "<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <p>Hello, World!</p>\n</body>\n</html>",
      task: "Show the teacher (or submit a screenshot to Toddle) proof of: a working save location, an installed/working code editor, and a saved index.html that correctly displays 'Hello, World!' in a browser.",
      successChecklist: [
        "Logged into laptop and school network.",
        "Logged into Toddle and can see the Design 1 class.",
        "Code editor installed and working.",
        "Hello World file saved and opens correctly in a browser."
      ],
      exitTicket: "Submit the Hello World screenshot/file link on Toddle — this becomes the entry ticket for Lesson 3.",
      notes: "Keep a running list of unresolved login issues (e.g. forgotten passwords) to escalate to IT before the next lesson — don't let this eat into Lesson 3's content time."
    },
    {
      number: 3,
      title: "What Is HTML? Exploring the Web Around Us",
      duration: "60 min",
      objective: "Explain the purpose of HTML and identify the key components of a webpage.",
      vocabulary: [
        { term: "HTML (HyperText Markup Language)", definition: "The code language used to structure content on a webpage — the 'skeleton' every browser reads to build what you see." },
        { term: "Browser", definition: "The program (Chrome, Safari, Edge, etc.) that reads HTML files and displays them as a visual webpage." },
        { term: "Tag", definition: "A keyword surrounded by angle brackets (like <p> or <h1>) that tells the browser what a piece of content is." },
        { term: "Element", definition: "A complete piece of HTML: an opening tag, its content, and its closing tag together (e.g. <p>Hello</p>)." },
        { term: "Attribute", definition: "Extra information added inside an opening tag to give more detail about an element (e.g. the href in a link)." },
        { term: "Website", definition: "A collection of connected webpages, usually sharing the same navigation and design, reachable from one starting address." },
        { term: "Webpage", definition: "A single page of content on the web, written in HTML, that displays in a browser." }
      ],
      warmup: "Show two contrasting real websites (one well-designed, one cluttered/confusing). Turn-and-talk: 'What makes one easier to use than the other?'",
      main: [
        "Mini-lecture: What is HTML (HyperText Markup Language)? It is the structural 'skeleton' of every webpage — browsers read HTML and render it visually.",
        "Live demo: use 'View Page Source' / Inspect Element on a real website to reveal the HTML underneath what students normally see.",
        "Introduce key vocabulary: Tag, Element, Attribute, Hyperlink, Navigation, Website, Webpage.",
        "Teacher-led walkthrough: identify webpage components (header, navigation, main content, images, footer) on a sample site.",
        "Discuss the week's inquiry question — 'How can websites be used to solve communication problems and meet user needs?' — and connect it explicitly to Criterion A: Inquiring and Analyzing."
      ],
      code: "<!-- What the browser shows vs. what's underneath -->\n<header>Site Name</header>\n<nav>Home | About | Contact</nav>\n<main>\n  <h1>Welcome</h1>\n  <p>This is the main content area.</p>\n</main>\n<footer>&copy; 2026</footer>",
      task: "In pairs, browse two websites and complete a 'Website Anatomy' worksheet identifying the header, navigation, main content, and footer, plus one thing HTML is doing behind the scenes.",
      successChecklist: [
        "Can define HTML in their own words.",
        "Can identify at least 3 webpage components on a real site.",
        "Can explain why HTML matters for communicating with an audience."
      ],
      exitTicket: "One-sentence written response: 'Explain the role of HTML in web development.'",
      notes: null
    },
    {
      number: 4,
      title: "Building Your First HTML File",
      duration: "60 min",
      objective: "Create and save a basic HTML file independently, applying correct file-saving conventions.",
      vocabulary: [
        { term: "Syntax", definition: "The exact set of rules for writing code correctly — like grammar rules for HTML (e.g. every opening tag needs a matching closing tag)." }
      ],
      warmup: "Quick recall check: 'What do the letters H-T-M-L stand for, and why does a browser need it?'",
      main: [
        "Recap yesterday's vocabulary (tag, element, attribute) with a quick verbal check.",
        "Teacher demo: build a new HTML file from scratch (not just Hello World) containing a page title and a short paragraph of personal introduction.",
        "Guided practice: students follow along step-by-step to build their own basic personal HTML file.",
        "Introduce the term's Personal Website Project (the big performance task) — today's file becomes the first draft of their homepage.",
        "Save, open in the browser, and troubleshoot common errors (forgot to save, wrong file extension, browser cache not refreshing)."
      ],
      code: "<!DOCTYPE html>\n<html>\n<head>\n  <title>About Me</title>\n</head>\n<body>\n  <h1>Hi, I'm [Your Name]</h1>\n  <p>I'm a Grade 9 student learning web design this term. I'm excited to build my own website!</p>\n</body>\n</html>",
      task: "Create and save a file called index.html containing a page title and a short paragraph introducing yourself. Open it in the browser to confirm it displays correctly.",
      successChecklist: [
        "File created and saved correctly as index.html.",
        "Displays correctly when opened in a browser.",
        "Contains a page title and at least one paragraph of text."
      ],
      exitTicket: "Submit index.html to Toddle — this is this week's formal formative check (observation, questioning, exit ticket).",
      notes: "This lesson is the Week 1 formative checkpoint noted in the Scope & Sequence. Use the success checklist above as an informal rubric while circulating."
    }
  ]
});
