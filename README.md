Therenz Jaromohom | Portfolio

Personal portfolio of Therenz Jaromohom, a Brand Identity & UI/UX Designer.

Live site: https://rinsooouw.netlify.app/

A note on how this was made

This portfolio is vibe coded. The design and content are mine, and the code was generated through prompting an AI assistant (Claude), not hand-written by an experienced developer. It works, but it hasn't been through a professional code review, so expect rough edges.

Features
Dark, single-page layout with a sticky profile card and a pill-style navigation bar
Tab-style sections (Home, Projects, Works, Experiences, Tools) with smooth transitions and URL hash support, so back/forward and shared links work
Animated spiral background that rotates on its own and speeds up while scrolling
Typewriter job title, slot-machine stat counters, and a visit counter
Works gallery with stacked cards that open an image carousel
Footer reveal effect (the page slides up to uncover the footer)
Skill carousel and brand logo in the profile card, and a profile modal on mobile
Responsive layout, with the navigation moved to the bottom on mobile
Tech stack
Vite + React
Tailwind CSS
Motion for animations
Lenis for smooth scrolling
Netlify for hosting, plus a small Netlify Function (using @netlify/blobs) for the visit counter
Getting started

Requires Node.js (LTS).

bash
npm install
npm run dev

Open the local link shown in the terminal (usually http://localhost:5173).

Customizing the content

Most content lives in one file: src/data.js. Edit it to change:

Profile details, tagline and skill tags
Hero text, roles and stats
Projects, works, experiences and tools
Contact details and social links
Visit counter settings

Images and files go in the public/ folder, for example:

public/profile.jpg
public/logo.png
public/Therenz-Jaromohom-CV.pdf
public/images/...

Make sure the paths in data.js match the filenames exactly (they are case-sensitive on Netlify).

Deployment

The site is deployed on Netlify from this repository.

Build command: npm run build
Publish directory: dist

Every push to the main branch triggers a new deploy.

Visit counter

The counter uses a Netlify Function at netlify/functions/visits.mjs, available at /api/visits. It counts one visit per browser tab session. If the function isn't reachable (for example, on npm run dev), it falls back to a count stored in the visitor's own browser.

Contact
Email: jaromohomrenze231@gmail.com
Portfolio: https://rinsooouw.netlify.app/

Design and content © Therenz Jaromohom.
