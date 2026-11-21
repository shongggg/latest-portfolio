// ============================================================
//  EDIT YOUR CONTENT HERE. No need to touch the components.
//  To use real images, put files in /public/images and set
//  `image: '/images/najmai.png'` on the item.
// ============================================================

export const profile = {
  name: 'Therenz Jaromohom',
  photo: '/profile.jpg', // put your photo at public/profile.jpg
  logo: '/logo.png', // your personal brand logo: public/logo.svg (or .png). Shows a placeholder until it exists
  cv: '/Therenz-Jaromohom-CV.pdf', // put your CV at public/Therenz-Jaromohom-CV.pdf
  tagline:
    'Visual Identity & UI/UX Designer shaping how brands look, feel, and function across screens.',
  tags: ['Branding', 'Logo Design', 'Wireframing', 'Prototyping', 'User Research', 'Usability Testing', 'Design Systems', 'User Flows', 'Brand Guidelines', 'Vectorized Designs', 'Brand Consistency', 'Visual Storytelling',],
}

export const roles = ['UI / UX', 'Brand & Logo', 'Social Media'] // each is followed by "DESIGNER"

export const heroText =
  'Designing timeless logos and intuitive digital experiences that connect brands with the people who use them.'

export const stats = [
  { value: 3, label: 'Years of Experience' },
  { value: 15, label: 'Projects Completed' },
  { value: 7, label: 'Local Clients' },
]

// bg = fallback gradient used until you add a real `image`
export const projects = [
  {
    title: 'Track.Build.Align',
    meta: ['Graduate Tracker', 'UI / UX Design'],
    href: 'https://www.figma.com/design/oNKQzwXv5ElGUmBR6rZE2m/Student-Graduate-Tracker?node-id=1093-196&t=PJWlmr9Kx30hYVB0-1',
    image: '/images/projects/TBA.png',
    bg: 'linear-gradient(160deg,#7b4be0 0%,#3a1d8a 100%)',
  },
  {
    title: 'Autrack Workflow',
    meta: ['Room Management', 'Wireframe'],
    image: '/images/projects/AutrackWorkflow.png',
    bg: 'linear-gradient(160deg,#f08a3c 0%,#1f4d3d 70%)',
  },
  {
    title: 'Rockson',
    meta: ['Project Management Tool', 'UI / UX Design'],
    href: 'https://www.figma.com/design/oNKQzwXv5ElGUmBR6rZE2m/Student-Graduate-Tracker?node-id=1093-196&t=PJWlmr9Kx30hYVB0-1',
    image: '/images/projects/rakson111.png',
    bg: 'linear-gradient(160deg,#d6231c 0%,#5b0a08 100%)',
  },
  // --- placeholders: replace with your real projects ---
  {
    title: 'GoActive',
    meta: ['Fitness App', 'Mobile UI Design'],
    href: 'https://www.figma.com/design/Pjnrw7ssuSvCJwB5JWb5Bi/GoActive---Workout-Guide?m=auto&t=pkS0jDVIs9myLiHu-1',
    image: '/images/projects/GoActive .png',
    bg: 'linear-gradient(160deg,#2f6fed 0%,#102a6b 100%)',
  },
  {
    title: 'RenShoe',
    meta: ['Mobile & Web', 'UI / UX Design'],
    href: 'https://www.figma.com/design/NGt4QrUC6grW5WYqANTCLj/Ren-Shoe-Ecommerce?m=auto&t=RXDJQANI1GbtcmNa-1',
    image: '/images/projects/Renshoe UI Banner.png',
    bg: 'linear-gradient(160deg,#16a38a 0%,#0a3d4a 100%)',
  },
  {
    title: 'System Documentation - Rockson',
    meta: ['Guidelines', 'User & Admin Flows'],
    href: 'https://www.figma.com/board/JTgo8tUU4yQCp4iJbMJqlI/Student-Graduate-Tracker-Documentation?node-id=2004-19&t=RWtqMcqcuvwQH07X-1',
    image: '/images/projects/Documentation -  Rockson PMT.jpg',
    bg: 'linear-gradient(160deg,#e8b23a 0%,#7a3b0c 100%)',
  },
]

// WORKS: images can be any size/ratio (square logos, posters, wide mockups).
//  image  : '/images/file.png'. With no `aspect`, it shows at its natural ratio (no crop, no stretch).
//  aspect : optional fixed frame like '1 / 1', '3 / 4', '16 / 9'.
//  fit    : 'cover' (fills the frame) or 'contain' (shows the whole image, e.g. a logo).
//  canvas : optional background color behind a 'contain' image, e.g. '#f4f1ea'.
//  STACKS : give `images: ['/images/s1.png', '/images/s2.png', ...]` (2 or more) instead of `image`.
//           It automatically shows as a stacked card and opens a carousel on click.
//           One image (`image: '/images/logo.png'`) stays a plain single image with hover only.
//           (Tip: give stacks the same `aspect`, e.g. '1 / 1' or '4 / 5', so the layers line up.)
//  slides : placeholder-only demo. `slides: 4` makes a gradient stack with no files needed.
export const works = [
  { title: 'Alliance of Coders', category: 'Publication Material', aspect: '3 / 4', image: '/images/works/478042985_606888222195850_5810578033401123192_n.jpg', bg: 'linear-gradient(160deg,#f08a3c 0%,#1f4d3d 70%)' },
  { title: 'Personal Brand', category: 'Instagram Carousels', aspect: '1 / 1', images: ['/images/works/11.png', '/images/works/12.png', '/images/works/13.png','/images/works/14.png','/images/works/15.png','/images/works/16.png'], bg: 'linear-gradient(160deg,#7b4be0 0%,#3a1d8a 100%)' },
  { title: 'Asagiri', category: 'Cover Banner', aspect: '18 / 9', image: '/images/works/banner ASGR.png', bg: 'linear-gradient(160deg,#d6231c 0%,#5b0a08 100%)' },
  // --- placeholders: replace with your real works ---
  { title: 'Zakhar', category: 'Logo Design', aspect: '1 / 1', image: '/images/works/zakhar.png', bg: 'linear-gradient(160deg,#16a38a 0%,#0a3d4a 100%)' },
  { title: 'Calypso', category: 'Team Rooster', aspect: '18 / 9', image: '/images/works/rooster ELY.JPG', bg: 'linear-gradient(160deg,#2f6fed 0%,#102a6b 100%)' },
  { title: 'Aext', category: 'Social Media Poster', aspect: '1 / 1', image: '/images/works/aext_partnership.jpg', bg: 'linear-gradient(160deg,#e8b23a 0%,#7a3b0c 100%)' },
  { title: 'RKDY Apparel', category: 'Brand Identity', aspect: '1 / 1', image: '/images/works/20240106_105133.png', bg: 'linear-gradient(160deg,#e8b23a 0%,#7a3b0c 100%)' },
  { title: 'Autrack', category: 'Logo Design', aspect: '1 / 1', image: '/images/works/autrack.png', bg: 'linear-gradient(160deg,#e8b23a 0%,#7a3b0c 100%)' },
  { title: 'Maravilla', category: 'Photography', aspect: '16 / 9', image: '/images/works/IMG_4103.jpg', bg: 'linear-gradient(160deg,#e8b23a 0%,#7a3b0c 100%)' },
  { title: 'RenShoe', category: 'Social Media Poster', aspect: '3 / 4', image: '/images/works/RenShoe Sample Showcase.png', bg: 'linear-gradient(160deg,#e8b23a 0%,#7a3b0c 100%)' },
  { title: 'STX', category: 'Company Logo', aspect: '1 / 1', image: '/images/works/stx.png', bg: 'linear-gradient(160deg,#e8b23a 0%,#7a3b0c 100%)' },
  { title: 'GoActive', category: 'Fitness Branding', aspect: '1 / 1', image: '/images/works/goactive.png', bg: 'linear-gradient(160deg,#e8b23a 0%,#7a3b0c 100%)' },
  { title: 'Pablos Secret Shop', category: 'Online Retail Branding', aspect: '1 / 1', image: '/images/works/pablos.png', bg: 'linear-gradient(160deg,#e8b23a 0%,#7a3b0c 100%)' },
  { title: 'TBA - Admin Dashboard', category: 'System Mockup', aspect: '4 / 3', image: '/images/works/Admin - TBA.png', bg: 'linear-gradient(160deg,#e8b23a 0%,#7a3b0c 100%)' },
  { title: 'Maravilla', category: 'Photography', aspect: '3 / 5', image: '/images/works/IMG_3947.jpg', bg: 'linear-gradient(160deg,#e8b23a 0%,#7a3b0c 100%)' },
]

export const experiences = [
  {
    role: 'Brand & Logo Designer',
    org: 'Freelance',
    text: 'Delivered 20+ tailored logo and brand identity projects across digital and print platforms, collaborating directly with clients from discovery to final delivery to boost brand recognition and achieve a 95% satisfaction rate.',
    date: '2020 - 2021',
  },
  {
    role: 'Junior Photographer',
    org: 'On-Call',
    text: 'Managed 30+ end-to-end photo shoots for events, products, and promotional campaigns, handling planning, lighting, and post-production to deliver high-quality visuals on schedule and earn repeat bookings.',
    date: '2022 - 2024',
  },
  {
    role: 'UI / UX Designer',
    org: 'RAK SON OPC',
    text: 'Boosted user engagement by 40% across web applications by pairing user research and usability testing with responsive wireframes, interactive prototypes, and streamlined workflows.',
    date: 'Jan - May 2026',
  },
]

// icon keys are drawn in sections/Tools.jsx. Home shows the first 6; the Tools tab shows all.
export const tools = [
  { icon: 'figma', name: 'Figma', desc: 'Design Tool' },
  { icon: 'canva', name: 'Canva', desc: 'Design Tool' },
  { icon: 'affinity', name: 'Affinity', desc: 'Design Suite' },
  { icon: 'capcut', name: 'CapCut', desc: 'Video Editing' },
  { icon: 'illustrator', name: 'Illustrator', desc: 'Vector Graphics' },
  { icon: 'lightroom', name: 'Lightroom', desc: 'Photo Editing' },
  { icon: 'pixellab', name: 'PixelLab Studio', desc: 'Mobile Graphic Design' },
  { icon: 'claude', name: 'Claude', desc: 'AI Assistant' },
  { icon: 'gemini', name: 'Gemini', desc: 'AI Assistant' },
  { icon: 'trello', name: 'Trello', desc: 'Project Management' },
  { icon: 'drive', name: 'Google Drive', desc: 'Cloud Storage' },
  { icon: 'photopea', name: 'Photopea', desc: 'Browser Photo Editor' },
]

// Visit counter. `endpoint` is the Netlify function in /netlify/functions/visits.mjs.
// If the endpoint isn't reachable (e.g. npm run dev), it falls back to a count kept in this browser.
export const visitCounter = {
  endpoint: '/api/visits',
  label: 'Portfolio visits',
}

export const contact = {
  location: 'Philippines',
  email: 'jaromohomrenze231@gmail.com',
  phone: '09682021257',
  socials: [
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/rinsuuu11/' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/st.togen' },
    { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/itsbasyonggg.fk' },
    { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/639682021257' },
  ],
}
