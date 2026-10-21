// Week 9: Oct 26: Forms in HTML (builds on the F1 website)
TERM1_WEEKS.push({
  "week": 9,
  "dates": "Oct 26",
  "status": "content",
  "topic": "Forms in HTML",
  "inquiryQuestion": "How can different webpage components be integrated into one functional webpage?",
  "criterion": "Criterion C: Creating the Solution: C.iii: Follow the plan to create the solution, which functions as intended.",
  "standard": "PG 5: Develop systems solutions from a set of specifications to complete a design process. (Computing Systems & Networks, GLE CS.HS.2.5: Stakeholder considerations drive system design.)",
  "weekObjectives": [
    "Create forms.",
    "Use text boxes and buttons.",
    "Collect user input."
  ],
  "successCriteria": [
    "Build functional forms.",
    "Apply form elements correctly.",
    "Collect information successfully."
  ],
  "crossCurricular": "Business: Designing surveys and collecting user information digitally.",
  "nationalIdentity": "UAE Smart Services: most UAE government services are requested through clear online forms",
  "formative": "HTML Forms & Navigation Activities: 10 pts (Lesson 4), on the F1 website",
  "summative": null,
  "lessons": [
    {
      "number": 1,
      "title": "Why Forms? Starting the F1 Contact Form",
      "duration": "60 min",
      "objective": "Explain the purpose of HTML forms and their core parts (form, input, label, button), and start a contact form on the F1 Contact Us page.",
      "vocabulary": [
        {
          "term": "Form",
          "definition": "The <form> tag: a container that groups input fields together so a website can collect information from a user."
        },
        {
          "term": "Input",
          "definition": "The <input> tag: a field where a user types or selects data (text, email, etc.)."
        },
        {
          "term": "Label",
          "definition": "The <label> tag: text that names an input field and is linked to it so clicking the label focuses the field."
        },
        {
          "term": "Button",
          "definition": "The <button> tag: a clickable element, often used to submit a form."
        }
      ],
      "warmup": "Show a real contact or registration form. 'What is this webpage doing that our F1 website doesn't do yet?'",
      "main": [
        "Mini-lecture: forms let a website collect input from users; this is how websites become interactive.",
        "Demo: build a minimal form live: <form>, a labelled text <input> and a submit <button>.",
        "Explain the label for / input id link: clicking the label puts the cursor in the field.",
        "Frayer Model: Input (definition, characteristics, example, non-example).",
        "Students start the contact form on Contact Us: the Name field and the Send button."
      ],
      "code": "<form>\n  <label for=\"name\">Your name:</label>\n  <input type=\"text\" id=\"name\" name=\"name\">\n  <button type=\"submit\">Send</button>\n</form>",
      "literacyStrategy": {
        "name": "Frayer Model",
        "note": "'Input' is the term students most often confuse with the visible <label> next to it: a Frayer Model makes clear that Input is the interactive field itself, not its text description."
      },
      "task": "Start the contact form on the F1 Contact Us page: a labelled Name field and a Send button.",
      "successChecklist": [
        "Can name the 4 core form elements (form, input, label, button).",
        "Clicking the Name label puts the cursor in the Name field."
      ],
      "exitTicket": "'Why does a form need a submit button?'",
      "notes": null
    },
    {
      "number": 2,
      "title": "Guided Practice: Finishing the F1 Contact Form",
      "duration": "60 min",
      "objective": "Finish the F1 contact form with text, email and textarea fields, with teacher support.",
      "vocabulary": [
        {
          "term": "Input Type",
          "definition": "The type attribute on an <input> tag that controls what kind of data it collects (e.g. text, email)."
        },
        {
          "term": "Textarea",
          "definition": "The <textarea> tag: an input box for longer, multi-line text like a message."
        }
      ],
      "warmup": "Quick recap: what does the for/id link between a label and an input do?",
      "main": [
        "Teacher models type=\"email\" and a <textarea> for longer messages.",
        "Checkpoint 1: Name field (from Lesson 1) works with its label.",
        "Checkpoint 2: add a labelled Email field.",
        "Checkpoint 3: add a labelled Message textarea, with the Send button at the end.",
        "Common error check: missing name attributes and label for / input id that don't match."
      ],
      "code": "<label for=\"email\">Email:</label>\n<input type=\"email\" id=\"email\" name=\"email\">\n\n<label for=\"message\">Message:</label>\n<textarea id=\"message\" name=\"message\" rows=\"4\"></textarea>",
      "task": "Finish the contact form on Contact Us with Name, Email and Message fields, each correctly labelled, plus a Send button.",
      "successChecklist": [
        "All 3 fields are present, labeled, and correctly typed (text/email/textarea).",
        "Clicking each label focuses the correct field."
      ],
      "exitTicket": "Demo to a partner: click each label and confirm it focuses the right field.",
      "notes": null
    },
    {
      "number": 3,
      "title": "Independent Application: The F1 Fan Survey Page",
      "duration": "60 min",
      "objective": "Independently build a Fan Survey page with radio buttons, checkboxes and a dropdown, and add it to the site menu.",
      "vocabulary": [
        {
          "term": "Radio Button",
          "definition": "An input type that lets a user pick exactly one option from a group of choices."
        },
        {
          "term": "Checkbox",
          "definition": "An input type that lets a user select any number of options (including none or several) from a group."
        },
        {
          "term": "Dropdown (Select)",
          "definition": "The <select> tag: a menu that lets a user choose one option from a list without them all being shown at once."
        }
      ],
      "warmup": "'If you made a survey for F1 fans, what would you ask them?'",
      "main": [
        "Students create survey.html with the same skeleton and menu as the other pages.",
        "Students add 'Fan Survey' to the navigation menu on EVERY page.",
        "Students build the survey from the sheet: radio buttons (favourite Grand Prix), checkboxes (what you enjoy) and a dropdown (how often you watch).",
        "Teacher circulates for 1:1 support on the new input types."
      ],
      "code": "<input type=\"radio\" id=\"gp-abudhabi\" name=\"gp\" value=\"abudhabi\">\n<label for=\"gp-abudhabi\">Abu Dhabi</label>\n\n<select id=\"watch\" name=\"watch\">\n  <option>Every race</option>\n  <option>Some races</option>\n</select>",
      "task": "Build the Fan Survey page with radio buttons, checkboxes and a dropdown, and link it from the menu on every page.",
      "successChecklist": [
        "The survey uses radio buttons, checkboxes and a dropdown, each correctly labelled.",
        "The Fan Survey link works from every page's menu."
      ],
      "exitTicket": "None formal: informal circulation check.",
      "notes": null
    },
    {
      "number": 4,
      "title": "Formative Assessment: F1 Forms and Navigation",
      "duration": "60 min",
      "objective": "Demonstrate working, correctly labelled forms integrated with the site's navigation, for the week's graded formative.",
      "vocabulary": [],
      "warmup": "Quick-fire vocabulary: form, input, label, textarea, button, radio, checkbox, select. Match each to its job.",
      "main": [
        "Explain the formative and rubric: functional form 4, correct labelling 3, navigation integration 3.",
        "Students finish both forms and work through the F1 Website Final Checklist (Forms).",
        "Students who are stuck compare their code with the Example Code sheet, one line at a time.",
        "Peer test: partners try every field and every menu link, then students submit via Toddle."
      ],
      "code": null,
      "task": "Complete the F1 Website Final Checklist (Forms) and submit for the 'HTML Forms & Navigation Activities' formative (10 pts).",
      "successChecklist": [
        "Build functional forms.",
        "Apply form elements correctly.",
        "Collect information successfully."
      ],
      "exitTicket": "'What's one more field or feature you'd add to your form if you had more time?'",
      "notes": "This is the official graded formative assessment from the syllabus (Week 9, 10 pts)."
    }
  ],
  "projectNote": "Week 9 continues the F1 website: a contact form on Contact Us and a new Fan Survey page added to the menu."
});
