// TERM1_WEEKS is populated by data/week01.js ... data/week15.js before this file loads.
(function () {
  var sidebar = document.getElementById("sidebar");
  var content = document.getElementById("content");

  function esc(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  function list(items) {
    if (!items || !items.length) return "";
    return "<ul>" + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>";
  }

  function orderedList(items) {
    if (!items || !items.length) return "";
    return "<ol>" + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ol>";
  }

  function checklist(items) {
    if (!items || !items.length) return "";
    return "<ul class=\"checklist\">" + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>";
  }

  function buildSidebar() {
    var rubricsBtn = document.createElement("button");
    rubricsBtn.className = "sidebar-item rubrics-item";
    rubricsBtn.id = "nav-rubrics";
    rubricsBtn.innerHTML = "<span class=\"week-num\">&#9776; RUBRICS</span><span class=\"week-topic\">Summative + Formative Scoring Guides</span>";
    rubricsBtn.addEventListener("click", showRubrics);
    sidebar.appendChild(rubricsBtn);

    var vocabBtn = document.createElement("button");
    vocabBtn.className = "sidebar-item rubrics-item";
    vocabBtn.id = "nav-vocabulary";
    vocabBtn.innerHTML = "<span class=\"week-num\">&#128214; VOCABULARY</span><span class=\"week-topic\">All Terms, In Teaching Order</span>";
    vocabBtn.addEventListener("click", showVocabulary);
    sidebar.appendChild(vocabBtn);

    var literacyBtn = document.createElement("button");
    literacyBtn.className = "sidebar-item rubrics-item";
    literacyBtn.id = "nav-literacy";
    literacyBtn.innerHTML = "<span class=\"week-num\">&#128221; LITERACY STRATEGIES</span><span class=\"week-topic\">3 Reads &middot; Accountable Talk &middot; Frayer Model</span>";
    literacyBtn.addEventListener("click", showLiteracyStrategies);
    sidebar.appendChild(literacyBtn);

    var divider = document.createElement("div");
    divider.className = "sidebar-divider";
    divider.textContent = "Weeks";
    sidebar.appendChild(divider);

    var weeks = TERM1_WEEKS.slice().sort(function (a, b) { return a.week - b.week; });
    weeks.forEach(function (w) {
      var isBreak = w.status === "break";
      var el = document.createElement(isBreak ? "div" : "button");
      el.className = "sidebar-item" + (isBreak ? " break" : "");
      el.id = "nav-week-" + w.week;
      el.innerHTML =
        "<span class=\"week-num\">Week " + w.week + " &middot; <span class=\"week-dates\">" + esc(w.dates) + "</span></span>" +
        "<span class=\"week-topic\">" + esc(w.topic) + "</span>";
      if (!isBreak) {
        el.addEventListener("click", function () { showWeek(w.week); });
      }
      sidebar.appendChild(el);
    });
  }

  function setActive(id) {
    var items = sidebar.querySelectorAll(".sidebar-item");
    items.forEach(function (i) { i.classList.remove("active"); });
    var active = document.getElementById(id);
    if (active) active.classList.add("active");
  }

  function lessonPlainText(w, l) {
    var lines = [];
    lines.push("WEEK " + w.week + " — " + w.topic + " (" + w.dates + ")");
    lines.push("LESSON " + l.number + ": " + l.title + " (" + l.duration + ")");
    lines.push("");
    lines.push("Learning Objective: " + l.objective);
    if (l.warmup) { lines.push(""); lines.push("Warm-Up / Hook:"); lines.push(l.warmup); }
    if (l.main && l.main.length) {
      lines.push("");
      lines.push("Main Activity:");
      l.main.forEach(function (step, idx) { lines.push((idx + 1) + ". " + step); });
    }
    if (l.code) { lines.push(""); lines.push("Code Example:"); lines.push(l.code); }
    if (l.vocabulary && l.vocabulary.length) {
      lines.push("");
      lines.push("New Vocabulary:");
      l.vocabulary.forEach(function (v) { lines.push("- " + v.term + ": " + v.definition); });
    }
    if (l.literacyStrategy) {
      lines.push("");
      lines.push("Literacy Strategy — " + l.literacyStrategy.name + ":");
      lines.push(l.literacyStrategy.note);
    }
    if (l.task) { lines.push(""); lines.push("Student Task:"); lines.push(l.task); }
    if (l.successChecklist && l.successChecklist.length) {
      lines.push("");
      lines.push("Success Criteria:");
      l.successChecklist.forEach(function (c) { lines.push("- " + c); });
    }
    if (l.exitTicket) { lines.push(""); lines.push("Exit Ticket / Formative Check:"); lines.push(l.exitTicket); }
    if (l.notes) { lines.push(""); lines.push("Teacher Notes: " + l.notes); }
    return lines.join("\n");
  }

  function lessonCard(w, l, openFirst) {
    var id = "lesson-" + w.week + "-" + l.number;
    var body =
      "<div class=\"lesson-section\"><h4>Learning Objective</h4><p>" + esc(l.objective) + "</p></div>" +
      (l.warmup ? "<div class=\"lesson-section\"><h4>Warm-Up / Hook</h4><p>" + esc(l.warmup) + "</p></div>" : "") +
      (l.main && l.main.length ? "<div class=\"lesson-section\"><h4>Main Activity</h4>" + orderedList(l.main) + "</div>" : "") +
      (l.code ? "<div class=\"lesson-section\"><h4>Code Example</h4><pre class=\"code-block\">" + esc(l.code) + "</pre></div>" : "") +
      (l.vocabulary && l.vocabulary.length ? "<div class=\"lesson-section\"><h4>New Vocabulary</h4><dl class=\"vocab-list\">" + l.vocabulary.map(function (v) { return "<dt>" + esc(v.term) + "</dt><dd>" + esc(v.definition) + "</dd>"; }).join("") + "</dl></div>" : "") +
      (l.literacyStrategy ? "<div class=\"lesson-section literacy-strategy-block\"><h4>&#128221; Literacy Strategy — " + esc(l.literacyStrategy.name) + "</h4><p>" + esc(l.literacyStrategy.note) + "</p></div>" : "") +
      (l.task ? "<div class=\"lesson-section\"><h4>Student Task</h4><p>" + esc(l.task) + "</p></div>" : "") +
      (l.successChecklist && l.successChecklist.length ? "<div class=\"lesson-section\"><h4>Success Criteria</h4>" + checklist(l.successChecklist) + "</div>" : "") +
      (l.exitTicket ? "<div class=\"lesson-section\"><h4>Exit Ticket / Formative Check</h4><p>" + esc(l.exitTicket) + "</p></div>" : "") +
      (l.notes ? "<div class=\"teacher-note\">Teacher note: " + esc(l.notes) + "</div>" : "") +
      "<button class=\"copy-btn\" data-lesson-id=\"" + id + "\">Copy for Toddle</button>";

    return (
      "<details class=\"lesson-card\"" + (openFirst ? " open" : "") + ">" +
      "<summary>" +
      "<span class=\"lesson-tag\">Lesson " + l.number + "</span>" +
      "<span class=\"lesson-title-text\">" + esc(l.title) + "</span>" +
      "<span class=\"lesson-duration\">" + esc(l.duration) + "</span>" +
      "<span class=\"chevron\">&#9656;</span>" +
      "</summary>" +
      "<div class=\"lesson-body\" id=\"" + id + "\">" + body + "</div>" +
      "</details>"
    );
  }

  function weekHeader(w) {
    var assessmentHtml = "";
    if (w.formative) assessmentHtml += "<span class=\"assessment-flag\">Formative: " + esc(w.formative) + "</span> ";
    if (w.summative) assessmentHtml += "<span class=\"assessment-flag\">Summative: " + esc(w.summative) + "</span>";

    return (
      "<div class=\"week-header\">" +
      "<span class=\"week-badge\">Week " + w.week + " &middot; " + esc(w.dates) + "</span>" +
      "<h2>" + esc(w.topic) + "</h2>" +
      "<dl class=\"week-meta-grid\">" +
      "<div class=\"full\"><dt>Inquiry Question</dt><dd>" + esc(w.inquiryQuestion) + "</dd></div>" +
      "<div><dt>MYP Criterion &amp; Strand</dt><dd>" + esc(w.criterion) + "</dd></div>" +
      "<div><dt>Standard</dt><dd>" + esc(w.standard) + "</dd></div>" +
      "<div class=\"full\"><dt>Week Learning Objectives</dt><dd>" + list(w.weekObjectives) + "</dd></div>" +
      "<div class=\"full\"><dt>Success Criteria / Skills</dt><dd>" + list(w.successCriteria) + "</dd></div>" +
      "<div><dt>Cross-Curricular Link</dt><dd>" + esc(w.crossCurricular) + "</dd></div>" +
      "<div><dt>National Identity Focus</dt><dd>" + esc(w.nationalIdentity) + "</dd></div>" +
      "</dl>" +
      (assessmentHtml ? "<div>" + assessmentHtml + "</div>" : "") +
      "</div>"
    );
  }

  function navButtons(weekNum) {
    var weeks = TERM1_WEEKS.slice().sort(function (a, b) { return a.week - b.week; });
    var idx = weeks.findIndex(function (w) { return w.week === weekNum; });
    var prev = null, next = null;
    for (var i = idx - 1; i >= 0; i--) { if (weeks[i].status !== "break") { prev = weeks[i]; break; } }
    for (var j = idx + 1; j < weeks.length; j++) { if (weeks[j].status !== "break") { next = weeks[j]; break; } }

    var html = "<div class=\"week-nav-buttons\">";
    html += "<button id=\"prev-week-btn\"" + (prev ? "" : " disabled") + ">&larr; " + (prev ? "Week " + prev.week : "Start of Term") + "</button>";
    html += "<button id=\"next-week-btn\"" + (next ? "" : " disabled") + ">" + (next ? "Week " + next.week : "End of Term") + " &rarr;</button>";
    html += "</div>";
    return { html: html, prev: prev, next: next };
  }

  function showWeek(weekNum) {
    var w = TERM1_WEEKS.find(function (x) { return x.week === weekNum; });
    if (!w) return;
    setActive("nav-week-" + weekNum);

    var lessonsHtml = "<ul class=\"lesson-list\">" +
      w.lessons.map(function (l, idx) { return "<li>" + lessonCard(w, l, idx === 0) + "</li>"; }).join("") +
      "</ul>";

    var nav = navButtons(weekNum);

    content.innerHTML = weekHeader(w) + lessonsHtml + nav.html;

    var prevBtn = document.getElementById("prev-week-btn");
    var nextBtn = document.getElementById("next-week-btn");
    if (prevBtn && nav.prev) prevBtn.addEventListener("click", function () { showWeek(nav.prev.week); window.scrollTo(0, 0); });
    if (nextBtn && nav.next) nextBtn.addEventListener("click", function () { showWeek(nav.next.week); window.scrollTo(0, 0); });

    content.querySelectorAll(".copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lessonId = btn.getAttribute("data-lesson-id");
        var parts = lessonId.replace("lesson-", "").split("-");
        var wk = parseInt(parts[0], 10);
        var ln = parseInt(parts[1], 10);
        var week = TERM1_WEEKS.find(function (x) { return x.week === wk; });
        var lesson = week.lessons.find(function (x) { return x.number === ln; });
        var text = lessonPlainText(week, lesson);
        navigator.clipboard.writeText(text).then(function () {
          btn.classList.add("copied");
          var original = btn.textContent;
          btn.textContent = "Copied!";
          setTimeout(function () { btn.classList.remove("copied"); btn.textContent = original; }, 1500);
        });
      });
    });

    window.scrollTo(0, 0);
  }

  function rubricCategoryTable(categories, hasLevels) {
    var rows = categories.map(function (c) {
      if (hasLevels) {
        var levelCells = c.levels.map(function (lv) {
          return "<td><strong>" + esc(lv.label) + "</strong> (" + esc(lv.range) + ")<br>" + esc(lv.description) + "</td>";
        }).join("");
        return "<tr><td><strong>" + esc(c.name) + "</strong><br><span class=\"rubric-points\">" + c.points + " pts</span></td>" + levelCells + "</tr>";
      }
      return "<tr><td><strong>" + esc(c.name) + "</strong></td><td class=\"rubric-points-cell\">" + c.points + " pts</td><td>" + esc(c.description) + "</td></tr>";
    }).join("");

    if (hasLevels) {
      return "<table class=\"rubric-table\"><thead><tr><th>Category</th><th>Exceeds Expectations</th><th>Meets Expectations</th><th>Approaching Expectations</th><th>Beginning</th></tr></thead><tbody>" + rows + "</tbody></table>";
    }
    return "<table class=\"rubric-table simple\"><thead><tr><th>Category</th><th>Points</th><th>What to look for</th></tr></thead><tbody>" + rows + "</tbody></table>";
  }

  function summativePlainText(r) {
    var lines = [r.title.toUpperCase() + " — " + r.subtitle];
    lines.push("");
    r.categories.forEach(function (c) {
      lines.push(c.name + " (" + c.points + " pts)");
      c.levels.forEach(function (lv) {
        lines.push("  " + lv.label + " (" + lv.range + "): " + lv.description);
      });
      lines.push("");
    });
    return lines.join("\n");
  }

  function formativePlainText(f) {
    var lines = ["WEEK " + f.week + " FORMATIVE — " + f.title + " (" + f.points + " pts)"];
    lines.push("");
    f.categories.forEach(function (c) {
      lines.push("- " + c.name + " (" + c.points + " pts): " + c.description);
    });
    return lines.join("\n");
  }

  function attachCopyHandler(btn, textFn) {
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(textFn()).then(function () {
        btn.classList.add("copied");
        var original = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(function () { btn.classList.remove("copied"); btn.textContent = original; }, 1500);
      });
    });
  }

  function showRubrics() {
    setActive("nav-rubrics");
    var r = RUBRICS.summative;

    var html = "<div class=\"week-header\">" +
      "<span class=\"week-badge\">Summative Rubric</span>" +
      "<h2>" + esc(r.title) + "</h2>" +
      "<p style=\"margin:0;color:var(--muted);font-size:13.5px;\">" + esc(r.subtitle) + "</p>" +
      "</div>" +
      "<div class=\"rubric-card\">" + rubricCategoryTable(r.categories, true) +
      "<button class=\"copy-btn\" id=\"copy-summative-rubric\">Copy for Toddle</button></div>";

    html += "<h3 class=\"rubric-section-title\">Formative Scoring Guides (10 pts each)</h3>";
    html += RUBRICS.formatives.map(function (f, idx) {
      return "<details class=\"lesson-card\"" + (idx === 0 ? " open" : "") + ">" +
        "<summary><span class=\"lesson-tag\">Week " + esc(f.week) + "</span><span class=\"lesson-title-text\">" + esc(f.title) + "</span><span class=\"lesson-duration\">" + f.points + " pts</span><span class=\"chevron\">&#9656;</span></summary>" +
        "<div class=\"lesson-body\">" + rubricCategoryTable(f.categories, false) +
        "<button class=\"copy-btn\" data-formative-idx=\"" + idx + "\">Copy for Toddle</button></div>" +
        "</details>";
    }).join("");

    content.innerHTML = html;

    var summativeBtn = document.getElementById("copy-summative-rubric");
    if (summativeBtn) attachCopyHandler(summativeBtn, function () { return summativePlainText(r); });

    content.querySelectorAll("[data-formative-idx]").forEach(function (btn) {
      var idx = parseInt(btn.getAttribute("data-formative-idx"), 10);
      attachCopyHandler(btn, function () { return formativePlainText(RUBRICS.formatives[idx]); });
    });

    window.scrollTo(0, 0);
  }

  function getAllVocabulary() {
    var weeks = TERM1_WEEKS.slice().sort(function (a, b) { return a.week - b.week; });
    var seen = {};
    var entries = [];
    var duplicates = [];
    weeks.forEach(function (w) {
      w.lessons.forEach(function (l) {
        if (!l.vocabulary) return;
        l.vocabulary.forEach(function (v) {
          var key = v.term.toLowerCase();
          if (seen[key]) {
            duplicates.push({ term: v.term, week: w.week, lesson: l.number, firstSeenWeek: seen[key].week, firstSeenLesson: seen[key].lesson });
            return;
          }
          seen[key] = { week: w.week, lesson: l.number };
          entries.push({ term: v.term, definition: v.definition, week: w.week, weekTopic: w.topic, lesson: l.number, lessonTitle: l.title });
        });
      });
    });
    return { entries: entries, duplicates: duplicates };
  }

  function vocabPlainText(entries) {
    var lines = ["TERM 1 VOCABULARY — IN TEACHING ORDER (" + entries.length + " terms)", ""];
    entries.forEach(function (e) {
      lines.push("Week " + e.week + ", Lesson " + e.lesson + " — " + e.term);
      lines.push("  " + e.definition);
    });
    return lines.join("\n");
  }

  function showVocabulary() {
    setActive("nav-vocabulary");
    var result = getAllVocabulary();

    var warningHtml = "";
    if (result.duplicates.length) {
      warningHtml = "<div class=\"assessment-flag\" style=\"display:block;margin-bottom:16px;\">Heads up: " + result.duplicates.length + " term(s) appear more than once — " +
        result.duplicates.map(function (d) { return esc(d.term) + " (Week " + d.week + " L" + d.lesson + " repeats Week " + d.firstSeenWeek + " L" + d.firstSeenLesson + ")"; }).join("; ") +
        ". Consider removing the repeat from the later lesson.</div>";
    }

    var rows = result.entries.map(function (e) {
      return "<tr><td class=\"rubric-points-cell\">Wk " + e.week + " &middot; L" + e.lesson + "</td><td><strong>" + esc(e.term) + "</strong></td><td>" + esc(e.definition) + "</td><td style=\"color:var(--muted);font-size:12px;\">" + esc(e.weekTopic) + "</td></tr>";
    }).join("");

    var html = "<div class=\"week-header\">" +
      "<span class=\"week-badge\">Vocabulary</span>" +
      "<h2>Term 1 Vocabulary — In Teaching Order</h2>" +
      "<p style=\"margin:0;color:var(--muted);font-size:13.5px;\">" + result.entries.length + " new terms introduced across the term, in the order students first meet them. Review this list, then let's turn it into visuals/word-wall displays.</p>" +
      "</div>" +
      warningHtml +
      "<div class=\"rubric-card\">" +
      "<table class=\"rubric-table simple\"><thead><tr><th>First Taught</th><th>Term</th><th>Definition</th><th>Week Topic</th></tr></thead><tbody>" + rows + "</tbody></table>" +
      "<button class=\"copy-btn\" id=\"copy-vocab-list\">Copy Full List for Toddle</button>" +
      "</div>";

    content.innerHTML = html;

    var copyBtn = document.getElementById("copy-vocab-list");
    if (copyBtn) attachCopyHandler(copyBtn, function () { return vocabPlainText(result.entries); });

    window.scrollTo(0, 0);
  }

  function literacyStrategyCard(s, idx) {
    var stepsHtml = s.steps.map(function (st) {
      return "<div class=\"lesson-section\"><h4>" + esc(st.label) + "</h4><p>" + esc(st.detail) + "</p></div>";
    }).join("");
    return "<details class=\"lesson-card\"" + (idx === 0 ? " open" : "") + ">" +
      "<summary><span class=\"lesson-tag\">Strategy</span><span class=\"lesson-title-text\">" + esc(s.name) + "</span><span class=\"chevron\">&#9656;</span></summary>" +
      "<div class=\"lesson-body\"><p style=\"margin-top:0;\"><em>" + esc(s.purpose) + "</em></p>" + stepsHtml + "</div>" +
      "</details>";
  }

  function showLiteracyStrategies() {
    setActive("nav-literacy");

    var usageRows = [];
    TERM1_WEEKS.slice().sort(function (a, b) { return a.week - b.week; }).forEach(function (w) {
      w.lessons.forEach(function (l) {
        if (l.literacyStrategy) {
          usageRows.push("<tr><td class=\"rubric-points-cell\">Wk " + w.week + " &middot; L" + l.number + "</td><td><strong>" + esc(l.literacyStrategy.name) + "</strong></td><td>" + esc(l.title) + "</td></tr>");
        }
      });
    });

    var html = "<div class=\"week-header\">" +
      "<span class=\"week-badge\">Literacy Strategies</span>" +
      "<h2>ENS DXB Required Literacy Strategies</h2>" +
      "<p style=\"margin:0;color:var(--muted);font-size:13.5px;\">Printable posters for the classroom wall live in resources/literacy-strategy-posters/. This is the same reference, digitally, plus where each strategy is used this term.</p>" +
      "</div>" +
      "<ul class=\"lesson-list\">" + LITERACY_STRATEGIES.map(literacyStrategyCard).join("") + "</ul>";

    if (usageRows.length) {
      html += "<h3 class=\"rubric-section-title\">Where These Are Used This Term</h3>" +
        "<div class=\"rubric-card\"><table class=\"rubric-table simple\"><thead><tr><th>Lesson</th><th>Strategy</th><th>Lesson Title</th></tr></thead><tbody>" +
        usageRows.join("") + "</tbody></table></div>";
    }

    content.innerHTML = html;
    window.scrollTo(0, 0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildSidebar();
  });
})();
