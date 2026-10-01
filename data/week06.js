// Week 6: Oct 5: Images in HTML (builds on the Week 5 F1 website)
TERM1_WEEKS.push({
  "week": 6,
  "dates": "Oct 5",
  "status": "content",
  "topic": "Images in HTML",
  "inquiryQuestion": "How can images improve communication and user engagement on a website?",
  "criterion": "Criterion C: Creating the Solution: C.ii: Demonstrate excellent technical skills when making the solution.",
  "standard": "PG 7: Design and create programs, individually and collaboratively, for a variety of disciplines. (Computer Programming, GLE CS.HS.3.1: The creation of a computer program requires a design process.)",
  "weekObjectives": [
    "Insert images into webpages.",
    "Use image attributes.",
    "Organize images appropriately."
  ],
  "successCriteria": [
    "Insert images successfully.",
    "Apply image attributes correctly.",
    "Improve webpage appearance."
  ],
  "crossCurricular": "Art & Media: Using visual elements to enhance communication and design.",
  "nationalIdentity": "UAE Landmarks and Tourism: Yas Marina Circuit, home of the Abu Dhabi Grand Prix",
  "formative": "Hyperlinks, Images & Tables Activities: 10 pts (shared with Week 5, checked in Lesson 4 on the F1 website)",
  "summative": null,
  "lessons": [
    {
      "number": 1,
      "title": "Adding Images to the F1 Website: The <img> Tag",
      "duration": "60 min",
      "objective": "Insert an image into the F1 Home page correctly using the <img> tag with src and alt attributes.",
      "vocabulary": [
        {
          "term": "Image Tag (img)",
          "definition": "The self-closing <img> tag used to embed a picture in a webpage."
        },
        {
          "term": "Source (src)",
          "definition": "The attribute on an <img> tag that tells the browser where to find the image file."
        },
        {
          "term": "Alt Text",
          "definition": "The alt attribute's description of an image, used by screen readers and shown if the image fails to load."
        }
      ],
      "warmup": "Show the F1 Home page with no images next to a real sports website. 'What do images add to a website?'",
      "main": [
        "Mini-lecture: the <img> tag is self-closing (no closing tag) and needs a src attribute (where the image file is).",
        "Introduce the alt attribute: it describes the image for screen readers and shows if the image fails to load. Always required.",
        "Students create an images folder inside their F1 website folder and copy in the F1 Image Pack.",
        "Demo: add f1-race-start.jpg to the Home page under the main heading, with a meaningful alt description.",
        "Frayer Model: Alt Text (definition, characteristics, example, non-example)."
      ],
      "code": "<img src=\"images/f1-race-start.jpg\" alt=\"F1 cars racing at the start of the Abu Dhabi Grand Prix\">",
      "literacyStrategy": {
        "name": "Frayer Model",
        "note": "Alt Text is the term students most often fill with useless text ('image', 'photo'); the Frayer non-examples make the difference clear."
      },
      "task": "Create an images folder in the F1 website, copy in the F1 Image Pack, and add the race-start image to the Home page with alt text you write yourself.",
      "successChecklist": [
        "The image shows on the Home page in the browser.",
        "The alt text actually describes the image."
      ],
      "exitTicket": "'Why does an image need alt text even if it looks fine on screen?'",
      "notes": null
    },
    {
      "number": 2,
      "title": "Guided Practice: Sizing F1 Images",
      "duration": "60 min",
      "objective": "Control image size with the width attribute and add a second image to the About Us page, with teacher support.",
      "vocabulary": [
        {
          "term": "File Path",
          "definition": "The route the browser follows to find a file, like images/f1-race-start.jpg: the folder name(s) plus the filename."
        }
      ],
      "warmup": "Quick recap: what two attributes does every <img> need?",
      "main": [
        "Teacher models adding a width attribute to the oversized Home page image, and explains why setting only width keeps the proportions.",
        "Checkpoint 1: students resize their Home page image to a sensible width.",
        "Checkpoint 2: students add alfa-romeo-1950.jpg to About Us, next to the fact about the first F1 race, with alt text and a width.",
        "Common error check: broken image paths (wrong folder name, wrong file name, missing images/)."
      ],
      "code": "<img src=\"images/alfa-romeo-1950.jpg\" alt=\"A red 1950 Alfa Romeo 158 racing car\" width=\"300\">",
      "task": "Resize the Home page image and add a correctly sized, correctly described image to About Us.",
      "successChecklist": [
        "Both images are a sensible size for the page.",
        "Both images have accurate alt text and working paths."
      ],
      "exitTicket": "Show a partner your About Us page: does it look planned, not broken or oversized?",
      "notes": "Broken paths are the most common error: check the images folder name and the file names first."
    },
    {
      "number": 3,
      "title": "Independent Application: Images on Every Page",
      "duration": "60 min",
      "objective": "Independently add images to the Contact Us and Vision and Mission pages so every page of the F1 website has a purposeful image.",
      "warmup": "'Open your F1 website. Which pages still have no picture?'",
      "main": [
        "Students follow the F1 Image Guide: yas-marina-circuit.jpg on Contact Us, pit-stop.jpg on Vision and Mission.",
        "Students write their own alt text and choose a sensible width for each image.",
        "Optional extra images: f1-helmets.jpg (About Us) or wind-tunnel-model.jpg (Vision and Mission, next to 'Show the science in F1').",
        "Stretch challenge: make an image a link by wrapping it in <a> (e.g. a small race image that links back to Home).",
        "Teacher circulates for 1:1 feedback on image choices, sizes and the images folder."
      ],
      "code": "<a href=\"index.html\">\n  <img src=\"images/f1-race-start.jpg\" alt=\"Back to the F1 World home page\" width=\"150\">\n</a>",
      "task": "Add an image to Contact Us and to Vision and Mission, each with your own alt text and a sensible width.",
      "successChecklist": [
        "Every page of the F1 website has at least one image.",
        "All images are inside the images folder and display correctly."
      ],
      "exitTicket": "None formal: informal circulation check.",
      "notes": null
    },
    {
      "number": 4,
      "title": "Formative Assessment: F1 Website with Images",
      "duration": "60 min",
      "objective": "Demonstrate working hyperlinks, navigation and correctly inserted images across the F1 website for the combined Week 5-6 formative.",
      "warmup": "Quick-fire: spot the bug in 3 broken <img> tags on the board.",
      "main": [
        "Explain the formative: Hyperlinks, Images & Tables Activities (10 pts: links 4, images 3, appearance 3), checked on the F1 website.",
        "Students finish any missing images, then work through the F1 Website Final Checklist (Images).",
        "Students who are stuck compare their code with the Example Code sheet, one line at a time.",
        "Peer test: partners click every link and check every image, then students fix what they find.",
        "Students submit evidence via Toddle. Preview next topic (after the break): Tables in HTML."
      ],
      "code": null,
      "task": "Complete the F1 Website Final Checklist (Images) and submit your F1 website for the 'Hyperlinks, Images & Tables Activities' formative assessment (10 pts).",
      "successChecklist": [
        "Insert images successfully.",
        "Apply image attributes correctly.",
        "Improve webpage appearance."
      ],
      "exitTicket": "'One thing about your F1 website you're proud of, one week before the mid-term break.'",
      "notes": "Combined formative: Working hyperlinks & navigation (4), Correct image implementation (3), Overall appearance & polish (3)."
    }
  ],
  "projectNote": "Week 6 continues the F1 website from Week 5: students add images from the F1 Image Pack to all four pages."
});
