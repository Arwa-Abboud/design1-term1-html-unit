# Design 1 — Term 1 HTML Unit Dashboard

A local, no-login, browsable dashboard containing all 56 lesson plans for Grade 9 Design 1, Term 1 (Web Design Fundamentals / HTML), built from:
- `Design 1 Scope and Sequence AY 26-27.xlsx` (sheet "Term 1 HTML") — source of truth for topics, order, dates, inquiry questions, MYP criteria, standards, and success criteria
- `Design 1 Syllabus AY 26-27.pdf` — grading weights, the official formative/summative assessment calendar, and academic integrity policy
- `Design 1 Subject Overview AY 26-27.pdf` — year-level Statement of Inquiry, key vocabulary, and performance task context

## How to open it

Just double-click `index.html` — no server, no build step, no install. It works fully offline in any browser.

## How it's organized

```
html unit/
  index.html        — the dashboard shell (sidebar + content pane)
  css/style.css      — all styling
  js/app.js          — renders week/lesson data, handles navigation and the "Copy for Toddle" button
  data/week01.js ... data/week15.js  — one file per week; each pushes a week object into the global TERM1_WEEKS array
```

Each week file is self-contained and independently editable. Week 7 (Mid-Term Break) has `status: "break"` and an empty `lessons` array — it shows greyed out in the sidebar and isn't clickable.

## The 4-lessons-per-week model

Arwa's classes meet 4x/week at 60 min each, but the school's Scope & Sequence gives one topic per week. Each week here is built as 4 full 60-minute lesson plans following this arc:

- **Normal skill weeks:** Intro/Demo → Guided Practice → Independent/Creative Application → Review & Mini-Check
- **Week 1 (special):** Essential Agreement & Year Overview → Platform/Login Setup → Intro to HTML (2 lessons, compressed pattern) — this is also the week students choose Design vs. Visual Arts as their elective
- **Project weeks (10–13):** Plan → Build → Build/Peer Feedback → Refine, tied to the Personal Multi-Page Website Project
- **Week 14 (Completion):** Debug → Peer Test → Rubric Review → Presentation Prep
- **Week 15 (Presentation & Reflection):** Rehearse → Present → Present → Reflect

Formative assessments (Weeks 3, 5, 9, 11) and the one official summative (Week 13, Personal Multi-Page Website Project, 100 pts) are built directly into the correct lesson slot and flagged with an amber badge at the top of that week.

**Note on the xlsx "Summative Assessments" column:** the scope-and-sequence spreadsheet labels a named project deliverable in most weeks from Week 9 onward (e.g. "Forms Task," "Website Design Task," "Website Development"). The syllabus's official grade book only lists **one** graded summative for this unit — the Week 13 Personal Multi-Page Website Project (100 pts). These per-week xlsx labels are treated here as informal milestone names for the ongoing project (folded into that week's lesson content/task), not as separate graded summatives, to avoid conflicting with the syllabus grading table.

## Editing a week

Open the relevant `data/weekNN.js` file and edit the JavaScript object directly — it's plain data, no build step required. Save, refresh the browser. Each lesson object supports: `title`, `duration`, `objective`, `warmup`, `main` (array of steps), `code` (optional code example), `task`, `successChecklist` (array), `exitTicket`, and `notes`.

## Sharing to Toddle

There's no direct Toddle integration/API — transfer is manual. Open a lesson, click **Copy for Toddle** at the bottom of its card, and paste the clean plain-text version directly into a new Toddle lesson.

## Version log

- **v1 (2026-08-25):** Initial build — all 15 weeks (56 lesson slots) for Term 1 HTML unit, dashboard shell, and Copy-for-Toddle feature.
