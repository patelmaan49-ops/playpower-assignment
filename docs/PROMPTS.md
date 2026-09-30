# Prompts

1. Brief: build a pixel-perfect desktop clone of the Airbnb listing page, photo tour and lightbox from the assignment. Use the reference link for layout and content, fall back to airbnb.com where it is unclear, build only what is asked, keep the code optimised with no comments, keep the README and markdown simple, push to the given repo, and answer the "hardest part" question.
2. (Agent) Scrape the reference: fetch the page, then retry with a headless browser when Vercel's bot check blocked it.
3. (Agent) Extract the photo list and icon paths from the sibling deployment and download the photos.
4. (Agent) Scaffold React + TypeScript + Vite, then write data, hooks, icons and one component per section.
5. (Agent) Run the dev server, screenshot the three views, and compare them to the reference screenshots. Adjust spacing, header, hero height and clamping.
6. (Agent) Verify keyboard behaviour: arrow keys in the lightbox, `Esc` order, focus restore.
7. (Agent) Write the architecture diagram, README, and sub-agent configs.
