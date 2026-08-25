# Design 1 (Grade 9) — Term 1 HTML Unit: Full Project Documentation

**Read this first if you are a new AI assistant, or Arwa is reading this herself after switching tools/devices.** This file is a complete, standalone record of what this project is, how it was built, where everything lives, and — most importantly — the *process* to replicate for future weeks, terms, or school years. It assumes no prior context.

---

## 1. What this project is

Arwa Abboud teaches Grade 9 **Design 1** (MYP) at Emirates National Schools. Term 1 covers **Web Design Fundamentals (HTML)**. The school's official Scope & Sequence gives one topic per week (15 weeks), but her classes actually meet **4 times a week, 60 minutes each**. This project turns that one-topic-per-week outline into a full set of classroom-ready materials:

1. A browsable **HTML dashboard** — 15 weeks × 4 lesson plans each, plus rubrics and a vocabulary bank
2. **Weekly planner** Word documents filled into the school's official template
3. **Printable lesson resources** (worksheets/handouts), split into core (whole class) and differentiation support (selective)
4. Everything mirrored to **OneDrive** for access from any computer, and the dashboard hosted live on **GitHub Pages**

The end goal for each lesson is that Arwa can open the dashboard, review a lesson, hit "Copy for Toddle," and paste it into her school's Toddle LMS — this project is a staging/organizing layer, not a replacement for Toddle.

---

## 2. Source-of-truth documents (do not lose these)

Everything derives from three files Arwa's school provided, originally in `C:\Users\a.abboud\Downloads\OneDrive_1_8-25-2026\Design 1 (1.0)\`:

| File | Role |
|---|---|
| `Design 1 Scope and Sequence AY 26-27.xlsx` (sheet "Term 1 HTML") | **Primary source of truth.** One row per week: dates, topic, inquiry question, MYP criterion/strand, standard/GLE code, learning objectives, success criteria, formative/summative flags, cross-curricular link, National Identity link. |
| `Design 1 Syllabus AY 26-27.pdf` | Grading weights, the official formative/summative assessment calendar (which week, how many points), academic integrity policy. |
| `Design 1 Subject Overview AY 26-27.pdf` | Year-level framing: 3 units (Term 1 HTML, Term 2 Scratch, Term 3 Python), Key Concepts, Key Vocabulary list, performance tasks. |

**If you are starting a new term or a new school year, get the equivalent updated documents first** — the whole process below re-derives from whatever is in these three files.

---

## 3. The core method: turning 1 topic/week into 4 real lessons

This is the reusable part — apply it to any future week, term, or course that has this same "one syllabus row = one week, but N real class periods" shape.

### Step 1 — Read the week's row from the Scope & Sequence
Pull: topic name, dates, inquiry question, MYP criterion + strand, standard/GLE text, learning objectives (3 short bullet points), success criteria (3 short bullet points), formative/summative flag, cross-curricular link, National Identity link.

### Step 2 — Pick the right lesson-arc pattern for that week's *purpose*
Not every week is "teach a new skill." Match the pattern to what the week is actually for:

- **Normal skill-building week** (most weeks): `Intro/Demo → Guided Practice → Independent/Creative Application → Review & Mini-Check`. Lessons 2 and 3 should be majority student build-time, not lecture.
- **First week of a term/course** (orientation): Lesson 1 = essential agreement + full-course/year overview (and, if relevant, an elective-choice framing week). Lesson 2 = platform/tech/login setup. Remaining lessons = compressed version of the normal skill pattern.
- **Project/build weeks** (when students are working on a major performance task): `Plan/Design → Build → Build + Peer Feedback → Refine`.
- **Completion week**: `Finish/Debug → Peer Test → Polish Against Rubric → Submission/Presentation Prep`.
- **Final presentation week**: `Rehearse → Present (group A) → Present (group B) → Reflection`.

### Step 3 — Write each of the 4 lessons with this consistent schema
Every lesson needs: a title, duration, one clear objective, a warm-up/hook, 4-6 main-activity steps, a code/content example where relevant, a student task, a 2-4 item success checklist, an exit ticket / formative check, and (if relevant) a one-line teacher note. This schema is what the dashboard code renders (see §5).

### Step 4 — Tag new vocabulary, once, the first time it appears
Keep a running "already introduced" list (chronological, across the whole term) and only tag a term on the lesson that introduces it — don't repeat it later. Each entry needs a short, student-friendly one-sentence definition, not a textbook definition.

### Step 5 — Fold in the syllabus's formative/summative checkpoints on the correct week
Cross-reference the syllabus's assessment calendar (§2) against the Scope & Sequence week numbers — they should line up. Build the actual graded task into the right lesson slot, and mirror it in `data/rubrics.js` (see §5). If a formative genuinely tests retention of earlier weeks' skills (not just the current week), say so explicitly and give the rubric a category for it — don't silently assume single-week scope.

### Step 6 — Build a plain-language rubric (not raw MYP achievement-level jargon)
Arwa's preference: rubrics should describe **what was actually taught and is expected to be delivered**, in plain teacher language (4 levels: Exceeds / Meets / Approaching / Beginning), not MYP's 1-8 achievement-level codes. Category point values should sum to the syllabus's stated point total for that assessment.

### Step 7 — Differentiation resources: split into two files, color only, no text labels
This was a specific correction from Arwa, apply it to all future resources:
- **Core sheet** — the actual worksheet/handout every student gets. No mention of tiers anywhere. Print-ready as-is.
- **Differentiation Support sheet** — separate file, marked "FOR TEACHER USE — hand out only to students who need it, not the whole class." Contains a **red-bordered box** (extra support content) and a **blue-bordered box** (extension/challenge content) — **no text labels** like "Beginning" or "Above" or "Extra Support," since students should never be able to read tiering off a handout. Color alone is the signal; Arwa reads the colors herself.

### Step 8 — Fill the school's official Weekly Planner template, unmodified
Arwa's school provides a Word template (`Weekly Planner Template x4 - Final.docx`) — one week's planner, 4 lesson-columns, 17 fixed rows (Standards, Literacy Strategies, Assessment, WALT, WILF, Vocabulary, Resources, National Identity, AI/Digital Learning, I Do/We Do/You Do, Differentiated Instruction with Beginning/On/Above sub-rows, Closure, Inclusion/EAL checkboxes, G&T/Extension checkboxes). **Never restructure this template** — only fill existing empty cells and toggle existing checkbox glyphs (☐ → ☑). See §6 for the exact technical method.

---

## 4. Standing preferences (apply these without re-asking)

- **Auto-push**: after any change to the `html unit` project, commit and push to GitHub without asking each time.
- **OneDrive mirror**: whenever a planner or resource `.docx` is created/updated, copy it into the matching OneDrive path too (see §7), without being asked.
- **Rubrics are plain-language**, not MYP 1-8 codes (see §3 Step 6).
- **Differentiation resources are split and unlabeled** (see §3 Step 7) — this was an explicit correction, don't regress to combined/labeled sheets.
- **GitHub repo is public** — Arwa wanted private-but-link-only; that literally doesn't exist on GitHub outside Enterprise Cloud (confirmed by testing — flipping the repo private silently disables Pages entirely). She accepted public as the working tradeoff. Don't re-attempt private+Pages on this repo.
- **Never commit scratch/working files** (unpacked template internals, `__pycache__`, debug dumps, `node_modules`) — these leaked into the repo once by accident and had to be cleaned up. Check `.gitignore` covers: `planner_review/`, `__pycache__/`, `node_modules/`.
- When generating Word docs, **verify visually** (render to PDF/PNG and actually look at it) before considering the task done — don't just trust that python-docx/docx-js didn't throw an error.

---

## 5. Technical architecture — the dashboard

**Location:** `C:\Users\a.abboud\Desktop\html unit\` — plain static site, no build step, no server, no login. Open `index.html` directly in any browser.

```
html unit/
  index.html          — shell: sidebar (Week 1-15 + Rubrics + Vocabulary nav) + content pane
  css/style.css        — all styling
  js/app.js            — renders week/lesson/rubric/vocabulary data, nav, "Copy for Toddle" buttons
  data/week01.js ... week15.js   — one file per week; each does TERM1_WEEKS.push({...}) with a
                                    week object containing topic/standards/dates + a `lessons` array
  data/rubrics.js      — RUBRICS.summative (one big project rubric) + RUBRICS.formatives[] (per-checkpoint)
  planners/            — filled Weekly Planner .docx files (school template, one per week)
  resources/week-NN/   — printable lesson handouts (core + differentiation-support pairs)
  README.md            — shorter developer-facing version of this documentation
  PROJECT_DOCUMENTATION.md  — this file
```

**Why plain `<script>` tags instead of `fetch()`/JSON:** opening `index.html` via `file://` breaks `fetch()` due to browser CORS restrictions on local files. Plain script includes sidestep that entirely — no server needed, ever.

**Data schema per lesson** (inside each week's `lessons` array):
```js
{
  number: 1,
  title: "...",
  duration: "60 min",
  objective: "...",
  vocabulary: [{ term: "...", definition: "..." }],   // omit if no new terms this lesson
  warmup: "...",
  main: ["step 1", "step 2", ...],
  code: "...",           // or null if not applicable
  task: "...",
  successChecklist: ["...", "..."],
  exitTicket: "...",
  notes: "..."            // or null
}
```

**Rubric schema** (`data/rubrics.js`):
```js
RUBRICS.summative = { title, subtitle, points, categories: [{ name, points, levels: [{label, range, description}, ...4 levels] }] }
RUBRICS.formatives = [{ week, title, points, categories: [{ name, points, description }] }, ...]
```

**To add/edit a week:** open the relevant `data/weekNN.js` file directly — it's plain JS, no build step. Save, refresh browser. To move a lesson between weeks, cut the lesson object from one `lessons` array and paste into another; renumber `number` if needed (only needs to be unique within its own week — it's used to build the Copy-for-Toddle button's ID).

---

## 6. Technical method — filling the school's Weekly Planner template

The template (`Weekly Planner Template x4 - Final.docx`) has one big table, 17 rows × 5 columns (label column + 4 lesson columns). Empty content cells have **zero runs** (no text at all yet) — the method is:

1. Open the template with `python-docx` (never `docx.Document()` with `data_only` tricks — just the normal API).
2. For each target cell, add a new run to its existing (empty) paragraph, explicitly setting font to match the template's compact style (Times New Roman, ~8pt, black, non-bold) — the template itself has no font default set on empty cells, so you must set it explicitly or Word/LibreOffice fall back to a generic default that looks inconsistent.
3. For the "Beginning / On / Above" differentiation row: each sub-label ("Beginning: ", "On: ", "Above: ") is its own paragraph with one existing run. Append your content as a **new run in that same paragraph** (`paragraph.add_run(...)`) so it lands on the same line right after the label — do not create a new paragraph. **Known template quirk:** only column 1's "Above:" label has a trailing space baked in; columns 2-4 are missing it. Pad your own inserted text with a leading space when the label lacks one — never edit the template's own label run.
4. For the Inclusion/EAL and G&T/Extension checkbox rows: each checkbox glyph (☐) is its own isolated run, immediately followed by a run containing its label text. To "check" a box, find the run whose text is exactly `☐` and whose *next* run's text matches your target label, then set that run's `.text = '☑'`. This is a safe, surgical, single-character edit — it never touches structure.
5. **Never** delete rows/columns, change cell merges, or alter the template's own label text. "Filling in" means adding runs to existing empty paragraphs and toggling existing checkbox runs — nothing else.
6. Always render the result to PDF/PNG and actually look at it before calling it done (`soffice --headless --convert-to pdf`, then render pages with PyMuPDF/`fitz` at ~150-200 DPI — LibreOffice is installed at `C:\Program Files\LibreOffice\program\soffice.exe` on this machine).
7. If Arwa reports a file "won't open" — check three things in order: (a) is the actual `.docx` valid (re-open with python-docx, or better, actually open it via Word COM automation from PowerShell to replicate exactly what she's doing); (b) is the file located somewhere the current session/tool can actually generate working links to (a chat client's markdown links to arbitrary local `.docx` paths have repeatedly failed in this project — treat that as the default suspect before assuming corruption); (c) is the file locked open in Word already (look for a `~$filename.docx` lock file in the same folder).

**Reusable script:** a generator following this exact method lives at `resources/week-01/generate.js` (for the docx-js Node-based printable worksheets) — the Python/python-docx planner-filling script was scratch-only and not committed (see §4, "never commit scratch files"); rebuild it fresh from this documentation's method if needed for a future week's planner.

---

## 7. Where everything lives (all locations, one place)

| What | Where | Access |
|---|---|---|
| Live dashboard (view-only) | https://arwa-abboud.github.io/design1-term1-html-unit/ | Any browser, any device, no login |
| Dashboard source + full history | GitHub repo `Arwa-Abboud/design1-term1-html-unit` (public) | `git clone` on any machine with git + the `gh` CLI authenticated as Arwa-Abboud |
| Dashboard source (local working copy) | `C:\Users\a.abboud\Desktop\html unit\` | This machine only, unless cloned elsewhere |
| Printable Word docs (planners + resources) | `C:\Users\a.abboud\OneDrive - Emirates National School\2026-2027\Design 1 - Term 1 HTML Unit\` | Any device signed into the same school Microsoft 365 account, or onedrive.com in a browser |
| Original source documents (xlsx/pdf) | `C:\Users\a.abboud\Downloads\OneDrive_1_8-25-2026\Design 1 (1.0)\` | This machine — **back these up**, everything derives from them |

**GitHub identity:** repo owned by GitHub account `Arwa-Abboud`. Local git commits in this repo use the GitHub-provided noreply email (`186092679+Arwa-Abboud@users.noreply.github.com`), not her real Gmail, to avoid leaking it into public commit history.

---

## 8. What's done vs. what's next (status as of last update)

**Done:** Full 15-week dashboard (56 lesson slots), Rubrics tab (1 summative + 4 formatives), Vocabulary tab (60 terms, teaching order, no duplicates), Week 1 & 2 filled planners, Week 1 differentiation resources (4 lessons × core+support pair = 8 files), GitHub Pages hosting, OneDrive mirroring.

**Explicitly paused, by Arwa's request:** planners and resources are built **2 weeks at a time**, with a check-in before continuing — do not mass-generate all 15 weeks' planners/resources without her review in between. Weeks 3-15 already have dashboard content (lesson plans) but do not yet have filled Weekly Planner `.docx` files or printable resources.

**Open question for Arwa, not yet answered:** whether the "cumulative rubric" treatment (Week 3's formative also checks Weeks 1-2 skills) should be applied to the other three formatives (Weeks 5-6, 9, 11) too, or was a one-off.

---

## 9. If you are a different AI assistant reading this cold

You don't need this specific conversation's history to be useful here. Read the Scope & Sequence xlsx (§2), pick the next unbuilt week, follow §3 step by step, use the schema in §5, follow the technical method in §6 if a Word document is requested, and respect the standing preferences in §4. Ask Arwa before applying any *new* judgment call that isn't already established here (e.g., a rubric structure not yet used, a differentiation approach not yet used) — but you don't need to re-litigate anything already decided in this document.
