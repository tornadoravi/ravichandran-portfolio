import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const portfolio = 'https://tornadoravi.github.io/ravichandran-portfolio/';
const output = process.argv[2]
  ? resolve(process.argv[2])
  : fileURLToPath(new URL('../assets/ravichandran-resume.pdf', import.meta.url));

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Ravichandran V | Product Designer II | Resume</title>
  <style>
    @page { size: A4; margin: 14mm 15mm; }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 14mm 15mm; background: white; color: #242424; font: 10.25pt/1.35 Arial, Helvetica, sans-serif; }
    main { width: 180mm; margin: 0 auto; }
    header { padding-bottom: 5pt; border-bottom: 1pt solid #b78051; }
    h1 { margin: 0; font-size: 25pt; line-height: 1.1; letter-spacing: -.4pt; }
    .title { margin: 4pt 0 5pt; color: #81502d; font-size: 11pt; font-weight: bold; }
    .contact { margin: 2pt 0 0; font-size: 9pt; color: #444; }
    a { color: inherit; text-decoration: none; }
    .links a { text-decoration: underline; text-underline-offset: 2px; }
    section { margin-top: 8pt; }
    h2 { margin: 0 0 4pt; color: #81502d; font-size: 10pt; line-height: 1.2; letter-spacing: .8pt; text-transform: uppercase; break-after: avoid; }
    h3 { margin: 0 0 2pt; font-size: 10.25pt; line-height: 1.3; break-after: avoid; }
    p { margin: 0 0 4pt; }
    .roles { margin: 0 0 5pt; font-size: 9.5pt; color: #444; }
    .role-heading { margin-top: 4pt; }
    ul { margin: 4pt 0 0; padding-left: 12pt; }
    li { margin: 0 0 3pt; padding-left: 1pt; break-inside: avoid; }
    .earlier { margin-top: 7pt; }
    .earlier p { margin-bottom: 4pt; font-size: 9.5pt; }
    .concept { margin-bottom: 5pt; }
    .scope { color: #555; }
    .education p, .skills p { margin-bottom: 2pt; font-size: 9.5pt; }
    @media print { body { padding: 0; } main { margin: 0; } }
  </style>
</head>
<body>
<main>
  <header>
    <h1>Ravichandran V</h1>
    <p class="title">Product Designer II &middot; Enterprise UX</p>
    <p class="contact">Madurai, India &middot; <a href="mailto:ravichandran.uxui@gmail.com">ravichandran.uxui@gmail.com</a> &middot; <a href="tel:9080507526">9080507526</a></p>
    <p class="contact links"><a href="${portfolio}">Portfolio: tornadoravi.github.io/ravichandran-portfolio</a> &middot; <a href="https://www.linkedin.com/in/ravichandran-uxui/">LinkedIn: ravichandran-uxui</a></p>
  </header>

  <section aria-labelledby="summary">
    <h2 id="summary">Summary</h2>
    <p>Product Designer II with four years at Lumel Technologies, designing analytics and planning experiences for Microsoft Power BI and Microsoft Fabric. Turn complex requirements into clear workflows, prototypes and implementation-ready designs.</p>
  </section>

  <section aria-labelledby="experience">
    <h2 id="experience">Experience</h2>
    <h3>Lumel Technologies &middot; Chennai, India</h3>
    <h3 class="role-heading">Product Designer II &middot; Jan 2025 - Present</h3>
    <ul>
      <li><strong>PowerTable / Microsoft Fabric &middot; Feb 2025 - Present:</strong> Design end-to-end Gantt and resource Gantt UX/UI using the Fabric design system: data mapping, task editing, timeline settings, resource assignments and time tracking.</li>
      <li>Contribute to Cross-tab layout and data configuration; explore baseline comparison.</li>
      <li>Work across requirements, interaction design, prototypes, developer handoff and implementation review with product managers, developers and stakeholders.</li>
    </ul>
    <h3 class="role-heading">Product Designer I &middot; Jul 2023 - Jan 2025</h3>
    <ul><li>Designed user interfaces and workflows for Inforiver Analytics+ in Power BI.</li></ul>
    <h3 class="role-heading">Contractor &middot; Oct 2022 - Jul 2023</h3>
    <ul><li>Contributed UX/UI design work to Inforiver Analytics+ on a contract basis.</li></ul>
    <div class="earlier">
      <h3>Earlier experience</h3>
      <p><strong>Arus Info &middot; Chennai:</strong> UX/UI Designer, Apr 2023 - Jul 2023; Trainee Engineer, Jul 2022 - Jun 2023.</p>
      <p><strong>Velsure Softech Solutions Pvt Ltd &middot; Madurai:</strong> Project Intern, Dec 2021 - Apr 2022.</p>
    </div>
  </section>

  <section aria-labelledby="lumel-work">
    <h2 id="lumel-work">Selected Lumel work &middot; across roles</h2>
    <ul>
      <li><strong>Inforiver Analytics+ / Power BI:</strong> Designed the shipped end-to-end Chart Wizard, from chart discovery to customization and advanced configuration.</li>
      <li>Delivered reusable KPI templates that shipped; broader design output included <strong>30+ KPI layouts, 20+ presets and 70+ custom icons</strong>.</li>
      <li>Redesigned implemented configuration side panels; contributed to Storyboard, annotations, presentation, Text-to-Visual and PowerPoint visualization templates.</li>
    </ul>
  </section>

  <section aria-labelledby="independent">
    <h2 id="independent">Independent product concepts</h2>
    <p class="concept"><strong><a href="${portfolio}bikecare.html">BikeCare:</a></strong> Designed a two-wheeler and EV care concept spanning service, personal documents, parts and rider journeys: <strong>59 mobile screens, seven journey maps</strong>, product architecture and a light/dark design system.</p>
    <p class="concept"><strong><a href="${portfolio}cod-shield.html">COD Shield:</a></strong> Designed reporting, verification and household-consent flows for unwanted cash-on-delivery deliveries, with a connected prototype and service safeguards. <span class="scope">Both projects are independent concepts, not launched or user-tested.</span></p>
  </section>

  <section class="skills" aria-labelledby="skills">
    <h2 id="skills">Skills &amp; tools</h2>
    <p><strong>Design:</strong> Requirements analysis, competitive analysis, user flows, interaction design, visual design, prototyping, design systems, data visualization.</p>
    <p><strong>Delivery:</strong> Stakeholder walkthroughs, developer handoff, implementation review. <strong>Tools:</strong> Figma, Adobe Illustrator, Adobe Photoshop.</p>
  </section>

  <section class="education" aria-labelledby="education">
    <h2 id="education">Education</h2>
    <p><strong>B.E., Electrical, Electronics and Communications Engineering</strong> &middot; 2018 - 2022</p>
    <p>Anna University of Technology Madurai, Madurai Campus</p>
  </section>
</main>
</body>
</html>`;

const browser = await chromium.launch();
try {
  const context = await browser.newContext({ offline: true, viewport: { width: 794, height: 1123 } });
  const page = await context.newPage();
  await page.emulateMedia({ media: 'print' });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  const layout = await page.locator('main').evaluate(main => ({
    height: main.getBoundingClientRect().height,
    overflow: [...main.querySelectorAll('*')].some(element => element.scrollWidth > element.clientWidth + 1)
  }));
  const usableHeight = 269 / 25.4 * 96;
  if (layout.height > usableHeight || layout.overflow) {
    throw new Error(`Resume must fit one A4 page without clipping: ${JSON.stringify(layout)}`);
  }
  await page.pdf({ path: output, preferCSSPageSize: true, printBackground: true, tagged: true });
  if (process.argv[3]) {
    await page.emulateMedia({ media: 'screen' });
    await page.screenshot({ path: resolve(process.argv[3]), fullPage: true });
  }
  console.log(`Built one-page resume: ${output}`);
} finally {
  await browser.close();
}
