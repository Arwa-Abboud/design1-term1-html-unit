// Rubrics for Term 1 HTML unit — plain skills-based scoring (not MYP achievement levels),
// built directly from what students actually learn and are expected to deliver each week.
var RUBRICS = {
  summative: {
    title: "Personal Multi-Page Website Project",
    subtitle: "Summative Assessment — Due Week 13 — 100 points — Unit 1 Outcomes",
    points: 100,
    categories: [
      {
        name: "HTML Structure & Syntax",
        points: 15,
        levels: [
          { label: "Exceeds Expectations", range: "14-15", description: "Every page uses valid, correctly nested HTML with no syntax errors. Document structure (doctype, html, head, title, body) is flawless across all pages." },
          { label: "Meets Expectations", range: "11-13", description: "Pages use correct HTML structure with only minor, non-breaking issues (e.g. inconsistent indentation)." },
          { label: "Approaching Expectations", range: "7-10", description: "Structure is mostly correct but has some errors — a missing tag, incorrect nesting, or a broken element on at least one page." },
          { label: "Beginning", range: "0-6", description: "Structure is incomplete or broken on multiple pages; pages may fail to render correctly." }
        ]
      },
      {
        name: "Content & Text Formatting",
        points: 15,
        levels: [
          { label: "Exceeds Expectations", range: "14-15", description: "Headings are used in a clear, logical hierarchy; paragraphs and lists organize content effectively; formatting tags (strong/em) are used purposefully throughout." },
          { label: "Meets Expectations", range: "11-13", description: "Headings, paragraphs, and lists are used correctly and organize content clearly, with minor inconsistencies." },
          { label: "Approaching Expectations", range: "7-10", description: "Some content is organized with headings/paragraphs/lists, but structure is inconsistent or a heading level is skipped/misused." },
          { label: "Beginning", range: "0-6", description: "Content is mostly unformatted text with little to no use of headings, paragraphs, or lists to organize it." }
        ]
      },
      {
        name: "Navigation & Multi-Page Structure",
        points: 20,
        levels: [
          { label: "Exceeds Expectations", range: "18-20", description: "Every page is connected by a consistent, fully working navigation menu; a visitor can reach any page from any other page with no dead ends." },
          { label: "Meets Expectations", range: "14-17", description: "Navigation works across all pages with only a very minor inconsistency (e.g. slightly different menu order)." },
          { label: "Approaching Expectations", range: "9-13", description: "Most pages are connected, but navigation is missing from at least one page or contains a broken link." },
          { label: "Beginning", range: "0-8", description: "Site is a single page, or multiple pages exist but are not properly connected by navigation." }
        ]
      },
      {
        name: "Media Integration — Images & Tables",
        points: 15,
        levels: [
          { label: "Exceeds Expectations", range: "14-15", description: "Images are appropriately sized, purposefully placed, and have meaningful alt text; any tables are well-structured and clearly present real data." },
          { label: "Meets Expectations", range: "11-13", description: "Images and/or tables are used correctly and support the content, with minor issues (e.g. a generic alt description)." },
          { label: "Approaching Expectations", range: "7-10", description: "Images or tables are present but have technical issues (broken path, missing alt text, mismatched table cells) or feel unnecessary to the content." },
          { label: "Beginning", range: "0-6", description: "Images and/or tables are missing, broken, or not used at all where they were expected." }
        ]
      },
      {
        name: "Forms & Interactivity",
        points: 10,
        levels: [
          { label: "Exceeds Expectations", range: "9-10", description: "At least one form is fully functional, with correctly labeled inputs matched to their fields, and clearly serves a real purpose on the site." },
          { label: "Meets Expectations", range: "7-8", description: "A form is present and mostly functional with correct labeling, with minor issues." },
          { label: "Approaching Expectations", range: "4-6", description: "A form is present but has missing labels, incorrect input types, or does not clearly serve a purpose." },
          { label: "Beginning", range: "0-3", description: "No working form is present." }
        ]
      },
      {
        name: "Design Consistency & Polish",
        points: 15,
        levels: [
          { label: "Exceeds Expectations", range: "14-15", description: "The whole site feels like one cohesive product — consistent navigation placement, heading styles, and layout across every page. Presentation-ready." },
          { label: "Meets Expectations", range: "11-13", description: "Site is mostly consistent across pages with only small variations." },
          { label: "Approaching Expectations", range: "7-10", description: "Noticeable inconsistencies between pages (different navigation style, inconsistent heading use, uneven formatting)." },
          { label: "Beginning", range: "0-6", description: "Pages feel disconnected or unfinished; little consistency across the site." }
        ]
      },
      {
        name: "Presentation & Reflection",
        points: 10,
        levels: [
          { label: "Exceeds Expectations", range: "9-10", description: "Presents the site confidently and clearly, explaining its purpose and audience, and offers a genuine, specific reflection on its impact and one real area for improvement." },
          { label: "Meets Expectations", range: "7-8", description: "Presents the site clearly and reflects on its purpose and effectiveness with minor gaps in depth." },
          { label: "Approaching Expectations", range: "4-6", description: "Presentation covers the basics but lacks clarity, confidence, or meaningful reflection." },
          { label: "Beginning", range: "0-3", description: "Presentation is missing, incomplete, or does not explain the site's purpose or impact." }
        ]
      }
    ]
  },
  formatives: [
    {
      week: "1",
      title: "My First HTML File (Optional)",
      points: 10,
      optional: true,
      categories: [
        { name: "File saved correctly", points: 4, description: "The file is saved as index.html in the right folder and opens from there." },
        { name: "Title and paragraph", points: 3, description: "The page has a title and at least one paragraph introducing the student." },
        { name: "Displays in the browser", points: 3, description: "The page opens and displays correctly in the browser." }
      ]
    },
    {
      week: "2",
      title: "HTML Structure Check (Optional)",
      points: 10,
      optional: true,
      categories: [
        { name: "Valid document structure", points: 4, description: "All 5 core tags (<!DOCTYPE html>, html, head, title, body) are present and in the right order." },
        { name: "Correct tag use and nesting", points: 3, description: "Tags are opened, closed and nested correctly, with content in the body." },
        { name: "Displays successfully", points: 3, description: "The page displays in the browser with no visible errors." }
      ]
    },
    {
      week: "3",
      title: "HTML Structure & Text Formatting Activities",
      points: 10,
      categories: [
        { name: "Valid HTML document structure (Weeks 1-2)", points: 3, description: "File is saved and named correctly; uses a valid DOCTYPE/html/head/body structure with correct nesting — carried over from Weeks 1-2, not just this week's new content." },
        { name: "Correct use of text formatting tags (Week 3)", points: 4, description: "Headings, paragraphs, <strong>, and <em> are used correctly and appropriately." },
        { name: "Logical organization & readability", points: 3, description: "Content follows a clear heading hierarchy with no skipped or misused levels, and the finished page is genuinely easier to read/skim than plain unformatted text." }
      ]
    },
    {
      week: "4",
      title: "Lists in Context (Optional)",
      points: 10,
      optional: true,
      categories: [
        { name: "Lists built correctly", points: 4, description: "ul/ol and li tags are used and closed correctly, including any nested list." },
        { name: "Appropriate list type", points: 3, description: "Ordered lists are used where order matters and unordered lists where it does not." },
        { name: "Information presented clearly", points: 3, description: "The content is clearer as a list than it was as a paragraph." }
      ]
    },
    {
      week: "5-6",
      title: "Hyperlinks, Images & Tables Activities",
      points: 10,
      categories: [
        { name: "Working hyperlinks & navigation", points: 4, description: "All links (internal and external) work correctly; navigation connects the pages built so far." },
        { name: "Correct image implementation", points: 3, description: "Images display correctly with appropriate size and meaningful alt text." },
        { name: "Overall appearance & polish", points: 3, description: "Navigation and images are placed thoughtfully and improve the page rather than cluttering it." }
      ]
    },
    {
      week: "8",
      title: "F1 Tables: Abu Dhabi Grand Prix Table (Optional)",
      points: 10,
      optional: true,
      categories: [
        { name: "Structured table", points: 4, description: "The table uses table, tr, th and td correctly, with a header row of th cells." },
        { name: "Accurate, complete data", points: 3, description: "Every row has the right number of cells and the data matches the given facts." },
        { name: "Displayed clearly", points: 3, description: "All four F1 tables display cleanly on their pages, with no misaligned cells." }
      ]
    },
    {
      week: "9",
      title: "HTML Forms & Navigation Activities",
      points: 10,
      categories: [
        { name: "Functional form", points: 4, description: "The form submits/behaves correctly with appropriate input types for the data being collected." },
        { name: "Correct form element labeling", points: 3, description: "Every input has a correctly linked label (for/id match)." },
        { name: "Navigation integration", points: 3, description: "The form is reachable through the site's working navigation menu." }
      ]
    },
    {
      week: "10",
      title: "Website Design Task (Optional)",
      points: 10,
      optional: true,
      categories: [
        { name: "Elements integrated correctly", points: 4, description: "The new page combines at least 4 different HTML element types, all working." },
        { name: "Complete, linked page", points: 3, description: "The page is complete and reachable from the site's navigation menu." },
        { name: "Technical accuracy", points: 3, description: "No broken tags, links or images on the page." }
      ]
    },
    {
      week: "11",
      title: "Website Prototype Review",
      points: 10,
      categories: [
        { name: "Multi-page site exists", points: 4, description: "All pages from the design specification's site map exist and contain real content." },
        { name: "Effective navigation", points: 3, description: "Navigation is consistent and every page is reachable from every other page." },
        { name: "Consistent design", points: 3, description: "Pages share a consistent look and structure, matching the student's own design specification." }
      ]
    },
    {
      week: "12",
      title: "Website Development Conference (Optional)",
      points: 10,
      optional: true,
      categories: [
        { name: "Original content", points: 4, description: "Every page in the site map has real, original content (no placeholder text)." },
        { name: "HTML applied accurately", points: 3, description: "Structure, formatting, links, images and tables follow correct HTML conventions." },
        { name: "Effective organization", points: 3, description: "Navigation, headings and layout are consistent across all pages." }
      ]
    },
    {
      week: "13",
      title: "Peer Feedback (Optional)",
      points: 10,
      optional: true,
      categories: [
        { name: "Specific feedback given", points: 4, description: "Feedback to a peer is specific and actionable, not just praise." },
        { name: "Feedback recorded", points: 3, description: "Feedback received is fully recorded for use in refinement." },
        { name: "Issues logged and prioritized", points: 3, description: "The student's own testing log lists issues clearly and marks the top priorities." }
      ]
    },
    {
      week: "14",
      title: "Project Review Against the Rubric (Optional)",
      points: 10,
      optional: true,
      categories: [
        { name: "Honest self-assessment", points: 4, description: "The student assesses their site against every summative category with evidence." },
        { name: "Critical issues fixed", points: 3, description: "All broken links, images or pages found after submission are fixed." },
        { name: "Presentation notes", points: 3, description: "Notes cover purpose, audience, a demo plan, impact and one area for improvement." }
      ]
    },
    {
      week: "15",
      title: "Unit Reflection (Optional)",
      points: 10,
      optional: true,
      categories: [
        { name: "Target-audience effectiveness", points: 4, description: "Explains how well the website meets its audience's needs, with examples." },
        { name: "Strengths and improvements", points: 3, description: "Names real strengths and a genuine area for improvement." },
        { name: "Next steps", points: 3, description: "Sets a clear, specific next step for future web design work." }
      ]
    }
  ]
};
