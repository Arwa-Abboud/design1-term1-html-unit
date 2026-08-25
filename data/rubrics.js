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
      week: "3",
      title: "HTML Structure & Text Formatting Activities",
      points: 10,
      categories: [
        { name: "Correct use of text formatting tags", points: 4, description: "Headings, paragraphs, <strong>, and <em> are used correctly and appropriately." },
        { name: "Logical content organization", points: 3, description: "Content follows a clear heading hierarchy with no skipped or misused levels." },
        { name: "Readability", points: 3, description: "The finished page is genuinely easier to read/skim than plain unformatted text." }
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
      week: "11",
      title: "Website Prototype Review",
      points: 10,
      categories: [
        { name: "Multi-page site exists", points: 4, description: "All pages from the design specification's site map exist and contain real content." },
        { name: "Effective navigation", points: 3, description: "Navigation is consistent and every page is reachable from every other page." },
        { name: "Consistent design", points: 3, description: "Pages share a consistent look and structure, matching the student's own design specification." }
      ]
    }
  ]
};
