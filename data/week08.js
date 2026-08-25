// Week 8 — Oct 19 — Tables in HTML
TERM1_WEEKS.push({
  week: 8,
  dates: "Oct 19",
  status: "content",
  topic: "Tables in HTML",
  inquiryQuestion: "How can websites collect information from users efficiently and accurately?",
  criterion: "Criterion C: Creating the Solution — C.iii: Follow the plan to create the solution, which functions as intended.",
  standard: "PG 1: Develop, utilize and evaluate algorithms to model and solve problems. (Computational Thinking, GLE CS.HS.1.5 — Abstraction is used to reduce complexity by focusing on the main idea.)",
  weekObjectives: [
    "Create tables.",
    "Use rows and columns.",
    "Present data effectively."
  ],
  successCriteria: [
    "Create structured tables.",
    "Organize data accurately.",
    "Display information clearly."
  ],
  crossCurricular: "Mathematics: Representing and organizing numerical data using rows and columns.",
  nationalIdentity: "UAE Statistical Information",
  formative: "Table activity (Lesson 4)",
  summative: null,
  lessons: [
    {
      number: 1,
      title: "Welcome Back: Tables 101",
      duration: "60 min",
      objective: "Explain how HTML tables organize data into rows and columns using table, tr, and td tags.",
      vocabulary: [
        { term: "Table", definition: "The <table> tag, used to organize data into rows and columns — not for page layout." },
        { term: "Table Row", definition: "The <tr> tag — one horizontal row of a table." },
        { term: "Table Data / Cell", definition: "The <td> tag — one individual cell of data inside a table row." },
        { term: "Table Header", definition: "The <th> tag — a cell used for column/row titles, shown bold and centered by default." }
      ],
      warmup: "Welcome back from the break — quick recap game: name one tag we've learned so far and what it does (round-robin).",
      main: [
        "Mini-lecture: tables are for tabular data (rows/columns), not for page layout. Structure: <table> wraps everything, <tr> = table row, <td> = table data (cell).",
        "Demo: build a simple table live (e.g. a weekly class schedule) showing how rows and cells nest.",
        "Introduce <th> for header cells (bold, centered by default) vs. <td> for regular data cells.",
        "Discuss abstraction: a table lets us represent complex data simply by focusing on rows and columns, not every individual detail."
      ],
      code: "<table>\n  <tr>\n    <th>Day</th>\n    <th>Subject</th>\n  </tr>\n  <tr>\n    <td>Monday</td>\n    <td>Design</td>\n  </tr>\n  <tr>\n    <td>Tuesday</td>\n    <td>Math</td>\n  </tr>\n</table>",
      task: "Build a simple 2-column, 3-row table (e.g. their weekly schedule or favorite foods vs. ratings) with a header row.",
      successChecklist: [
        "Table renders correctly with visible rows and columns.",
        "Header row uses <th>, data rows use <td>."
      ],
      exitTicket: "'What's the difference between <th> and <td>?'",
      notes: null
    },
    {
      number: 2,
      title: "Guided Practice: Multi-Column Tables",
      duration: "60 min",
      objective: "Build a correctly structured multi-row, multi-column table with teacher support.",
      warmup: "Quick fix-it: show a table with a missing </tr> — students spot the error.",
      main: [
        "Teacher models building a larger table (3+ columns, 4+ rows) step by step, e.g. a comparison table of favorite movies/ratings/genres.",
        "Checkpoint 1: students build the header row with 3+ <th> cells.",
        "Checkpoint 2: students add 3+ data rows, keeping the same number of cells in every row.",
        "Common error check: mismatched cell counts between rows (a very common table bug), unclosed <tr>/<td> tags."
      ],
      code: "<table>\n  <tr>\n    <th>Movie</th>\n    <th>Genre</th>\n    <th>Rating</th>\n  </tr>\n  <tr>\n    <td>Movie A</td>\n    <td>Action</td>\n    <td>8/10</td>\n  </tr>\n  <tr>\n    <td>Movie B</td>\n    <td>Comedy</td>\n    <td>7/10</td>\n  </tr>\n</table>",
      task: "Build a table with at least 3 columns and 4 rows (including the header) about a real topic of their choice, ensuring every row has the same number of cells.",
      successChecklist: [
        "Every row has the same number of cells.",
        "Table displays cleanly with no missing/misaligned data."
      ],
      exitTicket: "Screenshot check for a quick teacher review.",
      notes: "Mismatched cell counts between rows is the #1 error this lesson — check row-by-row while circulating."
    },
    {
      number: 3,
      title: "Independent Application: Data on Your Website",
      duration: "60 min",
      objective: "Independently decide where a table would present information more clearly than a list or paragraph, and build it correctly on their site.",
      vocabulary: [
        { term: "Colspan", definition: "An attribute on a table cell that makes it stretch across (merge with) multiple columns." }
      ],
      warmup: "'What real data or comparison could you show on your own website using a table?' (e.g. skills vs. proficiency, a project timeline, favorite things ranked)",
      main: [
        "Students identify one piece of content on their own site that would be clearer as a table.",
        "Independently plan the table's rows/columns before coding it (quick sketch or note).",
        "Build and insert the table into their site, matching their earlier plan.",
        "Stretch challenge: research and use the colspan attribute to merge cells for a table title row.",
        "Teacher circulates for 1:1 support."
      ],
      code: "<table>\n  <tr>\n    <th colspan=\"2\">My Skills</th>\n  </tr>\n  <tr>\n    <td>HTML</td>\n    <td>Beginner</td>\n  </tr>\n</table>",
      task: "Add one purposeful, correctly structured table to their personal website that presents real content more clearly than text alone.",
      successChecklist: [
        "Table content is genuinely tabular data (not just paragraph text forced into cells).",
        "Table is structurally correct and displays cleanly."
      ],
      exitTicket: "None formal — informal circulation check.",
      notes: null
    },
    {
      number: 4,
      title: "Formative Assessment: Table Activity",
      duration: "60 min",
      objective: "Demonstrate correct, independent construction of a structured HTML table for the week's formative assessment.",
      warmup: "Quick-fire: spot the bug in a table with a missing <td> in one row.",
      main: [
        "Explain the formative table activity and success criteria.",
        "Students complete a table-building task independently (teacher-provided dataset to structure correctly, e.g. a small set of facts about the UAE for the National Identity link).",
        "Teacher circulates and records evidence against the rubric.",
        "Peer check: partners verify each other's table has consistent rows/columns and clear headers."
      ],
      code: null,
      task: "Complete and submit the table activity: build a correctly structured table from the given dataset.",
      successChecklist: [
        "Create structured tables.",
        "Organize data accurately.",
        "Display information clearly."
      ],
      exitTicket: "'Name one website (real-world) where a table would genuinely be useful.'",
      notes: "This lesson is the Week 8 formative checkpoint (Table activity) noted in the Scope & Sequence."
    }
  ]
});
