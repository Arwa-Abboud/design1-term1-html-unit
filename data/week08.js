// Week 8: Oct 19: Tables in HTML (builds on the F1 website)
TERM1_WEEKS.push({
  "week": 8,
  "dates": "Oct 19",
  "status": "content",
  "topic": "Tables in HTML",
  "inquiryQuestion": "How can websites collect information from users efficiently and accurately?",
  "criterion": "Criterion C: Creating the Solution: C.iii: Follow the plan to create the solution, which functions as intended.",
  "standard": "PG 1: Develop, utilize and evaluate algorithms to model and solve problems. (Computational Thinking, GLE CS.HS.1.5: Abstraction is used to reduce complexity by focusing on the main idea.)",
  "weekObjectives": [
    "Create tables.",
    "Use rows and columns.",
    "Present data effectively."
  ],
  "successCriteria": [
    "Create structured tables.",
    "Organize data accurately.",
    "Display information clearly."
  ],
  "crossCurricular": "Mathematics: Representing and organizing numerical data using rows and columns.",
  "nationalIdentity": "UAE Statistical Information: presenting real data about the Abu Dhabi Grand Prix clearly in a table",
  "formative": "Table activity (Lesson 4): Abu Dhabi Grand Prix facts table on the F1 website - optional 10-pt rubric in the Rubrics tab",
  "summative": null,
  "lessons": [
    {
      "number": 1,
      "title": "Welcome Back: Tables 101 on the F1 Website",
      "duration": "60 min",
      "objective": "Explain how HTML tables organize data into rows and columns, and add an F1 Quick Facts table to the About Us page.",
      "vocabulary": [
        {
          "term": "Table",
          "definition": "The <table> tag, used to organize data into rows and columns: not for page layout."
        },
        {
          "term": "Table Row",
          "definition": "The <tr> tag: one horizontal row of a table."
        },
        {
          "term": "Table Data / Cell",
          "definition": "The <td> tag: one individual cell of data inside a table row."
        },
        {
          "term": "Table Header",
          "definition": "The <th> tag: a cell used for column/row titles, shown bold and centered by default."
        }
      ],
      "warmup": "Welcome back from the break: quick recap game. Name one tag on your F1 website and what it does (round-robin).",
      "main": [
        "Mini-lecture: tables are for data in rows and columns, not for page layout. <table> wraps everything, <tr> is a row, <td> is a cell.",
        "Introduce <th> for header cells (bold and centered by default) versus <td> for data cells.",
        "Demo: build the first two rows of the F1 Quick Facts table live.",
        "Frayer Model: Table (definition, characteristics, example, non-example).",
        "Students add the full F1 Quick Facts table to About Us from the Starter Sheet."
      ],
      "code": "<table>\n  <tr>\n    <th>Fact</th>\n    <th>Detail</th>\n  </tr>\n  <tr>\n    <td>First F1 World Championship race</td>\n    <td>1950</td>\n  </tr>\n</table>",
      "literacyStrategy": {
        "name": "Frayer Model",
        "note": "'Table' non-examples (using a table to position text) stop students using tables for layout."
      },
      "task": "Add the F1 Quick Facts table (2 columns, header row plus 4 data rows) to the About Us page.",
      "successChecklist": [
        "Table renders with visible rows and columns.",
        "Header row uses <th>, data rows use <td>."
      ],
      "exitTicket": "'What's the difference between <th> and <td>?'",
      "notes": null
    },
    {
      "number": 2,
      "title": "Guided Practice: The Famous Grand Prix Table",
      "duration": "60 min",
      "objective": "Build a correctly structured multi-column table on the F1 Home page with teacher support.",
      "vocabulary": [],
      "warmup": "Quick fix-it: show a table with a missing </tr>. Students spot the error.",
      "main": [
        "Teacher models planning a 3-column table: Grand Prix, Country, Circuit.",
        "Checkpoint 1: students build the header row with 3 <th> cells.",
        "Checkpoint 2: students add the 5 data rows, keeping 3 cells in every row.",
        "Common error check: rows with the wrong number of cells, and unclosed <tr> or <td> tags."
      ],
      "code": "<table>\n  <tr>\n    <th>Grand Prix</th>\n    <th>Country</th>\n    <th>Circuit</th>\n  </tr>\n  <tr>\n    <td>Abu Dhabi</td>\n    <td>UAE</td>\n    <td>Yas Marina Circuit</td>\n  </tr>\n</table>",
      "task": "Add the Famous Grand Prix table (3 columns, header row plus 5 data rows) to the Home page.",
      "successChecklist": [
        "Every row has the same number of cells.",
        "Table displays cleanly with no missing or misaligned data."
      ],
      "exitTicket": "Screenshot check for a quick teacher review.",
      "notes": "Mismatched cell counts between rows is the #1 error this lesson: check row by row while circulating."
    },
    {
      "number": 3,
      "title": "Independent Application: Contact Times Table",
      "duration": "60 min",
      "objective": "Independently build a table on the Contact Us page, with a title row that spans both columns.",
      "vocabulary": [
        {
          "term": "Colspan",
          "definition": "An attribute on a table cell that makes it stretch across (merge with) multiple columns."
        }
      ],
      "warmup": "'Look at your Contact Us page. What information would be clearer as a table than as a list?'",
      "main": [
        "Students plan the Contact Times table from the sheet: how many columns, how many rows?",
        "Students build the table independently on the Contact Us page.",
        "Stretch: add a title row using colspan=\"2\" so the title stretches across both columns.",
        "Teacher circulates for 1:1 support."
      ],
      "code": "<table>\n  <tr>\n    <th colspan=\"2\">Contact Times</th>\n  </tr>\n  <tr>\n    <td>Monday to Thursday</td>\n    <td>8:00 to 15:00</td>\n  </tr>\n</table>",
      "task": "Add the Contact Times table to the Contact Us page, with a header row and every row complete.",
      "successChecklist": [
        "The table holds real tabular data (days and times), not paragraph text.",
        "The table is structurally correct and displays cleanly."
      ],
      "exitTicket": "None formal: informal circulation check.",
      "notes": null
    },
    {
      "number": 4,
      "title": "Formative Assessment: Abu Dhabi Grand Prix Table",
      "duration": "60 min",
      "objective": "Independently build a correctly structured table from given data for the Week 8 formative.",
      "vocabulary": [],
      "warmup": "Quick-fire: spot the bug in a table with a missing <td> in one row.",
      "main": [
        "Explain the formative: build the Abu Dhabi Grand Prix facts table on the Vision and Mission page from the data on the Final Checklist.",
        "Students build the table independently, then check it against the Final Checklist (Tables).",
        "Students who are stuck compare their code with the Example Code sheet, one line at a time.",
        "Peer check: partners verify consistent rows, clear headers and correct data, then students submit via Toddle."
      ],
      "code": null,
      "task": "Build the Abu Dhabi Grand Prix facts table on the Vision and Mission page and complete the Final Checklist (Tables).",
      "successChecklist": [
        "Create structured tables.",
        "Organize data accurately.",
        "Display information clearly."
      ],
      "exitTicket": "'Name one real website where a table would genuinely be useful.'",
      "notes": "This lesson is the Week 8 formative checkpoint (Table activity) noted in the Scope & Sequence."
    }
  ],
  "projectNote": "Week 8 continues the F1 website: each lesson adds a table to a different page; students write the code."
});
