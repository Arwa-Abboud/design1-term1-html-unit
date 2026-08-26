// Week 9 — Oct 26 — Forms in HTML
TERM1_WEEKS.push({
  week: 9,
  dates: "Oct 26",
  status: "content",
  topic: "Forms in HTML",
  inquiryQuestion: "How can different webpage components be integrated into one functional webpage?",
  criterion: "Criterion C: Creating the Solution — C.iii: Follow the plan to create the solution, which functions as intended.",
  standard: "PG 5: Develop systems solutions from a set of specifications to complete a design process. (Computing Systems & Networks, GLE CS.HS.2.5 — Stakeholder considerations drive system design.)",
  weekObjectives: [
    "Create forms.",
    "Use text boxes and buttons.",
    "Collect user input."
  ],
  successCriteria: [
    "Build functional forms.",
    "Apply form elements correctly.",
    "Collect information successfully."
  ],
  crossCurricular: "Business: Designing surveys and collecting user information digitally.",
  nationalIdentity: "UAE Smart Services",
  formative: "HTML Forms & Navigation Activities — 10 pts (Lesson 4)",
  summative: null,
  lessons: [
    {
      number: 1,
      title: "Why Forms? Collecting User Input",
      duration: "60 min",
      objective: "Explain the purpose of HTML forms and identify their core components (form, input, label, button).",
      vocabulary: [
        { term: "Form", definition: "The <form> tag — a container that groups input fields together so a website can collect information from a user." },
        { term: "Input", definition: "The <input> tag — a field where a user types or selects data (text, email, etc.)." },
        { term: "Label", definition: "The <label> tag — text that names an input field and is linked to it so clicking the label focuses the field." },
        { term: "Button", definition: "The <button> tag — a clickable element, often used to submit a form." }
      ],
      warmup: "Show a real contact/signup form (e.g. a school event registration). 'What is this webpage doing that our sites don't do yet?'",
      main: [
        "Mini-lecture: forms let a webpage collect input from a user (text, choices, clicks) — this is how websites become interactive rather than just informational, directly tied to stakeholder needs.",
        "Demo: build a minimal form live: <form>, a text <input>, a <label>, and a submit <button>.",
        "Explain the label-for-id relationship so form fields are accessible and clickable by their label.",
        "Guided notes: students record the four core form elements and what each does.",
        "Frayer Model: individually, students complete a Frayer Model for 'Input' — definition, characteristics (the different types: text, email, etc.), a real example from today's demo, and a non-example (e.g. a <p> tag, since it displays text but never collects it)."
      ],
      code: "<form>\n  <label for=\"name\">Your Name:</label>\n  <input type=\"text\" id=\"name\" name=\"name\">\n  <button type=\"submit\">Submit</button>\n</form>",
      literacyStrategy: {
        name: "Frayer Model",
        note: "'Input' is the term students most often confuse with the visible <label> next to it — a Frayer Model makes clear that Input is the interactive field itself, not its text description."
      },
      task: "Sketch (on paper or in notes) what a simple 'Contact Me' form on their own website should ask for, before building it.",
      successChecklist: [
        "Can name the 4 core form elements (form, input, label, button).",
        "Understands why labels are linked to inputs, not just placed near them."
      ],
      exitTicket: "'Why does a form need a submit button?'",
      notes: null
    },
    {
      number: 2,
      title: "Guided Practice: Building a Contact Form",
      duration: "60 min",
      objective: "Build a working contact form using multiple input types (text, email, textarea) with teacher support.",
      vocabulary: [
        { term: "Input Type", definition: "The type attribute on an <input> tag that controls what kind of data it collects (e.g. text, email)." },
        { term: "Textarea", definition: "The <textarea> tag — an input box for longer, multi-line text like a message." }
      ],
      warmup: "Quick recap: what's the purpose of the for/id link between a label and an input?",
      main: [
        "Teacher models adding more input types: type=\"email\", and a <textarea> for longer messages.",
        "Checkpoint 1: students add a labeled text input for Name.",
        "Checkpoint 2: students add a labeled email input for Email.",
        "Checkpoint 3: students add a labeled <textarea> for a Message, plus a submit button.",
        "Common error check: missing name attributes, mismatched label for/id pairs."
      ],
      code: "<form>\n  <label for=\"name\">Name:</label>\n  <input type=\"text\" id=\"name\" name=\"name\"><br>\n\n  <label for=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" name=\"email\"><br>\n\n  <label for=\"message\">Message:</label><br>\n  <textarea id=\"message\" name=\"message\" rows=\"4\"></textarea><br>\n\n  <button type=\"submit\">Send</button>\n</form>",
      task: "Build a Contact Me form with Name, Email, and Message fields, each correctly labeled, plus a submit button.",
      successChecklist: [
        "All 3 fields are present, labeled, and correctly typed (text/email/textarea).",
        "Clicking each label focuses the correct field."
      ],
      exitTicket: "Demo to a partner: click each label and confirm it focuses the right field.",
      notes: null
    },
    {
      number: 3,
      title: "Independent Application: Expanding Your Form",
      duration: "60 min",
      objective: "Independently extend a form with additional appropriate input types to meet a specific purpose.",
      vocabulary: [
        { term: "Radio Button", definition: "An input type that lets a user pick exactly one option from a group of choices." },
        { term: "Checkbox", definition: "An input type that lets a user select any number of options (including none or several) from a group." },
        { term: "Dropdown (Select)", definition: "The <select> tag — a menu that lets a user choose one option from a list without them all being shown at once." }
      ],
      warmup: "'If you were building a form for people to sign up for a school club, what information would you actually need to ask for?'",
      main: [
        "Students choose a purpose for a second form on their site (e.g. event RSVP, feedback form, quiz) different from the basic contact form.",
        "Independently research and try at least one new input type: radio buttons, checkboxes, or a <select> dropdown.",
        "Build the new form, applying correct labels and structure learned this week.",
        "Teacher circulates for 1:1 support on new input types."
      ],
      code: "<label>Favorite Web Topic:</label><br>\n<input type=\"radio\" id=\"html\" name=\"topic\" value=\"html\">\n<label for=\"html\">HTML</label><br>\n<input type=\"radio\" id=\"design\" name=\"topic\" value=\"design\">\n<label for=\"design\">Design</label>",
      task: "Build a second, purpose-specific form using at least one new input type (radio, checkbox, or dropdown) beyond the contact form.",
      successChecklist: [
        "New form serves a clear, different purpose than the contact form.",
        "New input type is correctly labeled and structured."
      ],
      exitTicket: "None formal — informal circulation check.",
      notes: null
    },
    {
      number: 4,
      title: "Formative Assessment: HTML Forms & Navigation",
      duration: "60 min",
      objective: "Demonstrate correct, independent construction of functional HTML forms integrated with working site navigation, for the week's graded formative assessment.",
      warmup: "Quick-fire vocabulary: form, input, label, textarea, button — match each to its job.",
      main: [
        "Explain the combined forms + navigation formative assessment and rubric.",
        "Students complete the assessed task independently: a working contact form correctly linked into the site's navigation menu.",
        "Teacher circulates and records evidence against the rubric.",
        "Peer test: partners try submitting/clicking through each other's form and navigation to confirm everything works end to end."
      ],
      code: null,
      task: "Complete and submit the 'HTML Forms & Navigation Activities' formative assessment (10 pts): a working, correctly labeled form reachable through the site's navigation.",
      successChecklist: [
        "Build functional forms.",
        "Apply form elements correctly.",
        "Collect information successfully."
      ],
      exitTicket: "'What's one more field or feature you'd add to your form if you had more time?'",
      notes: "This is the official graded formative assessment from the syllabus (Week 9, 10 pts)."
    }
  ]
});
