// Week 6 — Oct 5 — Images in HTML
TERM1_WEEKS.push({
  week: 6,
  dates: "Oct 5",
  status: "content",
  topic: "Images in HTML",
  inquiryQuestion: "How can images improve communication and user engagement on a website?",
  criterion: "Criterion C: Creating the Solution — C.ii: Demonstrate excellent technical skills when making the solution.",
  standard: "PG 7: Design and create programs, individually and collaboratively, for a variety of disciplines. (Computer Programming, GLE CS.HS.3.1 — The creation of a computer program requires a design process.)",
  weekObjectives: [
    "Insert images into webpages.",
    "Use image attributes.",
    "Organize images appropriately."
  ],
  successCriteria: [
    "Insert images successfully.",
    "Apply image attributes correctly.",
    "Improve webpage appearance."
  ],
  crossCurricular: "Art & Media: Using visual elements to enhance communication and design.",
  nationalIdentity: "UAE Landmarks and Tourism",
  formative: "Hyperlinks, Images & Tables Activities — 10 pts (shared with Week 5, checked in Lesson 4)",
  summative: null,
  lessons: [
    {
      number: 1,
      title: "Adding Images: The <img> Tag",
      duration: "60 min",
      objective: "Insert images into a webpage correctly using the <img> tag with src and alt attributes.",
      vocabulary: [
        { term: "Image Tag (img)", definition: "The self-closing <img> tag used to embed a picture in a webpage." },
        { term: "Source (src)", definition: "The attribute on an <img> tag that tells the browser where to find the image file." },
        { term: "Alt Text", definition: "The alt attribute's description of an image, used by screen readers and shown if the image fails to load." }
      ],
      warmup: "Compare a plain-text page vs. the same page with a relevant image. 'What does the image add that text alone doesn't?'",
      main: [
        "Mini-lecture: the <img> tag is self-closing (no closing tag) and requires a src attribute (the image's location/path).",
        "Introduce the alt attribute: describes the image for accessibility (screen readers) and displays if the image fails to load — always required.",
        "Demo: add an image from a local project folder and one linked from a web address, showing both src styles.",
        "Discuss file organization: why images should live in a dedicated images/ folder within the project."
      ],
      code: "<img src=\"images/profile.jpg\" alt=\"A photo of me smiling outdoors\">",
      task: "Create an images/ folder in their project, add one appropriate image file to it, and insert it into their homepage with a meaningful alt description.",
      successChecklist: [
        "Image displays correctly in the browser.",
        "alt attribute is present and actually describes the image."
      ],
      exitTicket: "'Why does an image need an alt attribute even if it looks fine visually?'",
      notes: null
    },
    {
      number: 2,
      title: "Guided Practice: Sizing & Attributes",
      duration: "60 min",
      objective: "Control image size and placement using the width and height attributes with teacher support.",
      vocabulary: [
        { term: "File Path", definition: "The route the browser follows to find a file, like images/profile.jpg — the folder name(s) plus the filename." }
      ],
      warmup: "Show an image that's way too large for the page. 'What's wrong here, and how would you fix it?'",
      main: [
        "Teacher models adding width and height attributes to resize an oversized image, and explains keeping proportions consistent.",
        "Checkpoint 1: students resize their homepage image to a reasonable size.",
        "Checkpoint 2: students add a second image somewhere else on their site (e.g. an 'about' page) with correct attributes.",
        "Common error check: broken image paths (wrong folder name, wrong file extension, case sensitivity)."
      ],
      code: "<img src=\"images/profile.jpg\" alt=\"A photo of me smiling outdoors\" width=\"300\" height=\"300\">",
      task: "Resize their existing image appropriately and add a second correctly-sized, correctly-described image elsewhere on their site.",
      successChecklist: [
        "Both images are a reasonable size for the page.",
        "Both images have accurate alt text and working paths."
      ],
      exitTicket: "Screenshot check: does the page look intentional, not broken or oversized?",
      notes: "Broken image paths are the most common error — check folder/file names carefully while circulating."
    },
    {
      number: 3,
      title: "Independent Application: Visual Storytelling",
      duration: "60 min",
      objective: "Independently select and place images that meaningfully support the content and purpose of their personal website.",
      warmup: "'Where on your site would an image actually help communicate something, not just decorate the page?'",
      main: [
        "Students identify 1-2 more spots on their site where an image would genuinely support the content (e.g. a hobby photo next to the Hobbies section).",
        "Independently source/add and correctly insert these images with appropriate sizing and alt text.",
        "Stretch challenge: research and try wrapping an image inside a link (<a><img></a>) so clicking the image navigates somewhere.",
        "Teacher circulates for 1:1 feedback on visual choices and file organization."
      ],
      code: "<a href=\"about.html\">\n  <img src=\"images/thumbnail.jpg\" alt=\"Click to visit my About page\" width=\"150\">\n</a>",
      task: "Add at least one more purposeful, correctly-attributed image to their site, tied clearly to nearby content.",
      successChecklist: [
        "New image choice is clearly relevant to its section.",
        "Image folder stays organized (no stray files outside images/)."
      ],
      exitTicket: "None formal — informal circulation check.",
      notes: null
    },
    {
      number: 4,
      title: "Review: Hyperlinks, Images & Tables Check",
      duration: "60 min",
      objective: "Consolidate and demonstrate correct use of hyperlinks, navigation, and images together as part of the combined Week 5-6 formative assessment.",
      warmup: "Quick-fire vocabulary: href, src, alt, target — match each to its job.",
      main: [
        "Peer review: partners check each other's site for working navigation AND correctly inserted/described images.",
        "Whole-class troubleshooting of any recurring errors from either topic.",
        "Students finalize corrections based on peer feedback.",
        "Formal check-in: teacher reviews evidence for the combined 'Hyperlinks, Images & Tables Activities' formative assessment (10 pts total, spanning Weeks 5-6).",
        "Preview next topic (after the break): Tables in HTML."
      ],
      code: null,
      task: "Submit final evidence (working navigation + correctly inserted images across the site) for the Week 5-6 formative assessment.",
      successChecklist: [
        "Insert images successfully.",
        "Apply image attributes correctly.",
        "Improve webpage appearance."
      ],
      exitTicket: "'One thing about your site you're proud of so far, one week before the mid-term break.'",
      notes: "This lesson closes out the combined 'Hyperlinks, Images & Tables Activities' formative assessment (10 pts) from the syllabus. Next week is the Mid-Term Break."
    }
  ]
});
