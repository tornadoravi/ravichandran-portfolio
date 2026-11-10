# Ravichandran V — Product Designer portfolio

A responsive, locally hosted portfolio with a cinematic 3D-style illustrated portrait hero, a midnight editorial visual system, and screenshot-led storytelling. No framework, runtime external requests, tracking, stock photography, or online publication.

## Preview

Requires Node.js 20 or newer.

```sh
npm start
```

Open **http://127.0.0.1:4173**. The server binds only to the local machine. Set `PORT` to use a different port.

## 3D-style portrait hero

The homepage displays the user-approved, generated 3D vector-style portrait in front of self-hosted Anton **PRODUCT DESIGNER** typography. It replaces the earlier crimson dot sculpture: there is no canvas, WebGL dependency, particle download, or reveal button. The image is available without JavaScript. A one-shot entrance and subtle fine-pointer parallax (at most 8px horizontally and 5px vertically) add depth, not 3D head rotation. Touch input does not drive parallax; pointer exit, pointer-capability changes, tab visibility changes, and reduced-motion changes reset it. Reduced motion disables the entrance and movement. Existing portfolio content, case studies, navigation, and the original About photo are preserved.

The homepage opens immediately, without a countdown or modal introduction. Its full-screen identity scene follows the supplied visual reference: a centered portrait in front of one full-width, mint-to-lilac PRODUCT DESIGNER line, a fine circular outline, black background, and soft ambient lighting. The portrait is capped at 1000px on desktop and sized against both the viewport width and scene height; mobile uses a separate width cap rather than enlarging the portrait to the phone's height. A smaller header, aligned outer margins, and clearance around the portrait keep the identity and work action legible. The previous left-aligned introduction and grid are removed. Mobile stacks the background words while keeping the portrait centered. The scene fills the viewport below the header, with minimum heights of 640px desktop and 620px mobile. The current role and a quiet Selected work link remain at its lower edge. Selected work follows immediately below this intentional full-screen opening, with no intermediate introduction. Work bookmarks remain intact on entry, refresh, and browser-history restoration. `tests/entry.spec.js` checks the visible route into work and bounds the distance from the work heading to the first preview; `tests/home-visual.spec.js` checks portrait sizing, title fit, and clearance around the kicker and footer. `tests/fixtures.js` simply re-exports Playwright without bypassing production behavior.

The cinematic treatment uses one-second title/footer reveals, a 1.4-second portrait entrance, and a 2.6-second lighting transition, each playing once rather than looping. Scrolling reveals later project chapters with a restrained lift and an accent rule. No video, shader, camera rotation, scroll hijacking, or screenshot distortion is used. Home bookmarks skip the cinematic entrance. Reduced motion cancels the active title/footer entrances, stops CSS effects and parallax, and permanently reveals pending scroll sections so returning to normal motion cannot hide previously accessible content. No-JavaScript content remains visible. The standalone export embeds the same centered composition and finite CSS portrait/lighting effects without JavaScript, filling the entire viewport because it has no site header.

**Asset provenance:** the user explicitly requested generating a 3D vector-style portrait from their supplied photograph and then replacing the dot sculpture with it. `assets/portrait-3d-source.png` preserves that generated image. It is an illustrated interpretation, not a genuine photo, editable vector/SVG, or interactive 3D model. `scripts/build-hero.mjs` locally removes edge-connected, near-black background pixels with a feathered boundary and produces the optimized transparent `assets/portrait-3d.webp`. Hair edges are approximate; no depth reconstruction or exact identity reproduction is claimed. The original `assets/ravichandran-profile.png` remains unchanged.

`index.html` and `hero.css` define the hero's markup and responsive styling. The portrait export includes a smooth chest-to-transparent fade from 64% to 90% of the source image's height, finishing before the illustration's curved base. This image-coordinate alpha blend avoids a visible cut edge at any responsive size, including the standalone export; face and hair stay opaque. Anton is bundled under its accompanying SIL Open Font License. No font or image is downloaded from an external service at runtime.

After changing hero source or assets, run `npm install` once, then `npm run build:hero`. This regenerates the transparent WebP and `portrait-standalone.html`. The latter embeds its font and illustration and opens directly by double-click without scripts, a server, or network. Its Selected work link points to the adjacent `index.html`; full case-study navigation still uses the local server. Served preview: **http://127.0.0.1:4173/portrait-standalone.html**.

## Pages

- `index.html`: full-screen centered portrait and role, selected work with a direct Chart Wizard feature link, then approach/contact.
- `analytics-plus.html`: parent product case study, official product context, role and process, source-backed competitive comparison, and five ordered feature stories.
- `about.html`: supplied profile portrait, design approach, dated employment timeline, and two attributed recommendations.
- `analytics.html`: flagship Chart Wizard decision case with three interface trade-offs, an observable disabled state, delivery/internal-review evidence, and all eight product screens in an expandable walkthrough.
- `storyboard.html`: Storyboard authoring case study containing all six supplied screenshots, with presentation work linked separately.
- `presentation.html`: Annotations, Comments & Presentation for Power BI, with nine full-resolution supplied design screens, confirmed contribution scope, vendor references, and two separately labeled original conceptual illustrations.
- `gantt.html`: separate Analytics+ Gantt for Power BI case study with three supplied screenshots covering entry, mapping guidance, and the task-and-timeline workspace.
- `powertable.html`: Fabric planning context, end-to-end Gantt/resource UX/UI, competitive comparison, developer handoff and implementation review, a supplied configuration screen, and cross-tab contributions.
- `column-mapping.html`: PowerTable feature case for Column Mapping & Configuration, with five supplied dialog crops, visible prerequisites, design rationale, and official Gantt mapping references.
- `mapping.css`: restrained, scoped styling for the PowerTable product case and its column-mapping feature; other product and Home styling remain unchanged.
- `kpi.html`: KPI Presets for Power BI, with Simple and Variance browsing, the supplied design library, and reusable-layout contribution scope.
- `styles.css`: shared layout, responsive styles, and reduced-motion support.
- `app.js`: accessible mobile navigation, section tracking, case reading progress, screenshot inspection, restrained scroll reveals, and original SVG illustrations.

All portfolio copy, supplied screenshots, and standalone SVG illustrations remain available without JavaScript. Navigation remains visible on mobile when JavaScript is unavailable; PowerTable's older, dynamically generated detailed illustrations require JavaScript, but its overview illustrations do not.

## Product and feature hierarchy

Home presents **two products**: **01 PowerTable · Microsoft Fabric** and **02 Inforiver Analytics+ · Power BI**. This order is shared by the work index, product-case numbers, and About product assignments. The Analytics+ case explains the product and why it matters before my contribution: end-to-end UX/UI, competitive analysis, developer handoff, and implementation review. Its feature order is **Storyboard (01) → Gantt for Power BI (02) → Chart Wizard (03) → Annotations (04) → KPI Presets (05)**. All five detailed HTML pages and their existing section bookmarks remain available. Feature back links return to `/analytics-plus.html#features`; next-feature links follow that order and finish back at the product overview. PowerTable remains a separate Microsoft Fabric product.

The official Analytics+ page was reviewed at `https://inforiver.com/analytics-plus/`. `assets/inforiver-analytics-logo.svg` is the unchanged official logo from `https://inforiver.com/wp-content/uploads/inforiver-analytics-plus-logo-template.svg`. `assets/inforiver-analytics-official.png` is the unchanged 1500×654 official product illustration from `https://inforiver.com/wp-content/uploads/inforiver-analytics-plus-features-one-stop-solution-for-all-your-custom-visuals.png`. Both are hosted locally and credited to Inforiver / Lumel; official marketing artwork is not labeled as my UI work.

The competitive comparison cites the official product overview, `https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualizations-overview`, and `https://help.tableau.com/current/pro/desktop/en-us/stories.htm`. It compares documented workflow patterns and design questions, not untested feature rankings, historical research artifacts, or competitor shortcomings. No adoption, ROI, interview, or usability findings are invented. The process illustration is original responsive HTML, separate from official artwork and supplied interface evidence.

Platform context explains **Microsoft Fabric → Microsoft Power BI → Inforiver Analytics+ inside a report**, not a required setup sequence. Power BI is the host, Analytics+ is a Lumel custom visual, and the Microsoft icons do not imply endorsement. The relationship is verified against `https://learn.microsoft.com/en-us/power-bi/fundamentals/power-bi-overview`. The unchanged `assets/microsoft-power-bi.svg` and `assets/microsoft-fabric.svg` are the 48px color SVGs from the official archive linked at `https://learn.microsoft.com/en-us/fabric/fundamentals/icons`: `https://github.com/microsoft/fabric-samples/blob/main/docs-samples/Icons.zip`, package `v6.1.0`. The included MIT copyright/license is retained in `assets/microsoft-fabric-icons-LICENSE`. Icons identify named Microsoft products in explanatory documentation and are not recolored, cropped, or used as Inforiver branding.

The comparison now starts with **report-author and report-viewer tasks**, then documents reference patterns and the Analytics+ design response. Power BI is explicitly the host baseline; Tableau Stories is an adjacent storytelling reference, not a like-for-like competing custom visual. Task statements are design framing, not fabricated interview quotes or validated research findings.

Home's previous `#project-storyboard`, `#project-gantt`, `#project-wizard`, `#project-presentation`, and `#project-kpi` anchors are retained on feature shortcuts inside the Analytics+ product card. About links to the product overview and the five detailed stories in the same feature order.

## Design and interaction

The default review path is a **3–4 minute first look**, not a requirement to read every case in full: Home → PowerTable → Analytics+ → experience/recommendations or LinkedIn. Home introduces the role once; each parent product shows its ownership, lead screen, compact evidence/status summary, and exactly three image-led design moments. The main copy distinguishes design intent from release evidence. No new outcome metrics are implied.

Hiring-focused review can go directly from Home or Analytics+ to `analytics.html`. Its default narrative explains documented interface choices and structural trade-offs, an actual unavailable visual-form state, and shipped/internal-review status. Deep-linked supporting screens open their containing native disclosure. Trade-offs are an analysis of the visible design, not invented historical alternatives or a fabricated before/after iteration. A single expandable evidence record distinguishes delivery and internal reviews from customer outcomes. Real iteration records and measured impact still require source material from the portfolio owner.

PowerTable's earlier configuration screen has three numbered portfolio callouts and a readable legend; the image and original-size inspection remain unchanged. New supplied time-entry and Resource layout crops replace the conceptual artwork in the short overview. Conceptual planning/resource canvases remain explicitly labeled in the expanded story. The linked column-mapping case supplies the remaining mapping detail without claiming verified runtime behavior or release status. Across the feature cases, repeated generic outcome disclaimers are consolidated into a short Role / Delivery / Evidence disclosure, while local source labels and material behavior limits remain.

`tests/quick-review.spec.js` caps the combined default-visible main copy of those three pages at 875 words on desktop and mobile, excluding collapsed supporting content. This is an editorial budget, not evidence that every viewer will finish in a fixed time or that screenshots take no time to inspect.

The overview favors visuals over text panels: each design moment has one large image, a short title, one caption, and a full-card link to deeper evidence. Mint, lilac, and peach frames separate the three moments without recoloring the supplied screens. Analytics+ uses Chart Wizard, Storyboard, and an annotation detail; PowerTable uses its actual configuration detail and two original task/timeline and work/people illustrations. Every image has alt text and a visible source label; illustrations are explicitly concepts, not shipped UI or measured results. A single design-direction line replaces the longer takeaway box. Ownership remains selectively emphasized; long-form problem/decision reasoning stays in the supporting sections.

`assets/fabric-configuration-detail.png` is an unaltered 806×600 crop at `{ left: 552, top: 54 }` of the persisted Fabric screen, focusing on dates, Task ID, and hierarchy. `assets/annotation-detail.png` is an unaltered 700×420 crop at `{ left: 150, top: 330 }` of `presentation-screen-07.png`, focusing on its annotation and nearby chart bars. Full originals remain available in the evidence sections. `assets/planning-timeline-concept.svg` and `assets/planning-capacity-concept.svg` are original local explanatory artwork, not product screenshots. All six overview images load without JavaScript; linked supporting disclosures retain native keyboard operation.

Long-form product context, comparisons, process, repeated scope notes, and sources are retained behind native `details` disclosures. Analytics+ keeps its five feature links visible in the existing order; their full previews/screens expand on demand. Detailed feature HTML pages remain unchanged. Internal highlight links, direct fragment URLs, and history navigation open containing disclosures before revealing the destination. Disclosures are keyboard-usable without JavaScript; full-size screenshot links remain available. Reading-position tracking ignores closed sections and refreshes when disclosures toggle. The short overview is a reading guide, not a measured hiring-review time.

Every page shares **Home / Work / About** navigation, including the mobile menu and no-JavaScript links. Home returns to `/`; Work opens `/#work`. The homepage's active tab follows the visible section, using the existing requestAnimationFrame-batched scroll tracking rather than the URL hash. Home remains active over the portrait; Work becomes active when Selected work reaches the reading position and remains active through the lower approach/contact section. Scrolling back to the hero restores Home even if a work bookmark remains in the URL. Anchor navigation, resize, image loading, and browser-history restoration refresh this state. About and case pages retain their appropriate static current-page or work-section indicator.

The reference portfolio at cedricith.com informed broad principles: generous editorial spacing, image-led work, simple navigation, and a clear transition into case studies. This site uses its own numbered work index, full-width screenshot-led Home cards, tinted product frames, and source-backed biography. No reference assets, text, or implementation code are used.

The hiring-focused hierarchy uses 17px narrative body copy, secondary evidence labels of at least 12px, and warm-white text against midnight blue-black. Mint is the primary interaction color, with restrained lilac and warm-peach accents differentiating projects and case-summary roles. Directional lighting, larger display typography, sharper project stages, and editorial rules replace the previous rounded pastel-card treatment. Case summaries, recommendations, and supporting panels share the deeper palette and quieter four-pixel corners. Project cards have concise names, an explicit ownership line, and a direct case-study action. Each case includes a three-part summary of the challenge, contribution, and delivery or evidence status. Home links to the supplied LinkedIn profile for contact; no availability, email, or resume is invented.

The detailed cases include explicit Business case, Pain points & solution highlights, and Concept sections, reachable from the sticky section navigation. Business copy explains the audience, intended product value, and qualitative objective; it does not invent ROI, financial results, interview findings, or adoption metrics. Three paired pain/solution cards link to supporting feature detail. Each original concept diagram uses responsive HTML nodes and directional connectors to explain the underlying mental model rather than imitate product UI. The diagrams stack on mobile and remain readable, keyboard-navigable, and available without JavaScript.

Every case has a native, keyboard-usable user-flow disclosure at `#user-flow`. Wizard and Storyboard retain their alternative-route distinctions. KPI Presets separates Simple and Variance as alternative families and assumes measures are already available. The presentation flow separates author annotation work from the audience's presentation context. Power BI Gantt distinguishes field availability from role mapping. PowerTable has a scope-based planning journey, explicitly not a mandatory cross-view sequence or an all-features-shipped assertion; resource earned-value and baseline planning remain explorations.

The project index and About links follow the current reading position. Case-section navigation stays visible while scrolling, with a thin reading-progress indicator. It uses a single horizontally scrollable row with 44px-tall targets instead of tiny wrapping mobile links. Active links move into view only when the current section changes; manual horizontal browsing is not continuously overridden.

Supplied product screenshots and the presentation case's original illustrations have an optional native dialog preview with keyboard focus containment, Escape dismissal, close/backdrop dismissal, and focus return. Illustration controls and dialogs say “Inspect illustration” and preserve the conceptual-source label rather than calling artwork a screenshot. Actual size exposes the original dimensions inside a scrollable, keyboard-focusable region; Fit to screen restores the overview. Images are never upscaled in the inspector. The size control is disabled when the original already fits, while Fit remains usable after resizing. Existing full-size image links remain available, including without JavaScript or native dialog support.

Scroll reveals and hover cues are restrained and respect reduced-motion preferences, including changes made while the page is open. Solution cards and concept nodes join the existing one-time scroll entrances; project frames lift without tilting or transforming their screenshots. Links, action arrows, recommendation cards, and next-project navigation use small border, color, and shadow responses. Hero-adjacent screenshot evidence stays immediately visible, and About sections do not compound parent and child fades. Content remains visible if JavaScript or IntersectionObserver is unavailable. Recommendation excerpts expand through native `details` elements and work without JavaScript.

Headings and introductory details make a short, staggered entrance on fresh page visits; deep links skip the entrance so the requested section remains the focus. Entrances use progressive Web Animations enhancement and cancel immediately if reduced motion is enabled. Project frames lift slightly on fine-pointer hover or keyboard focus without tilting, scaling, or cropping their screenshots. Links, section indicators, the mobile menu, screenshot dialogs, and recommendation disclosures share restrained transition timing. About principles, employer entries, and recommendation cards reveal as they enter the viewport.

A floating back-to-top link appears after 600 pixels of scrolling on every page. It uses the native `#main` destination, returns keyboard focus to the main content, and follows the browser's reduced-motion preference. The footer's original back-to-top link remains available without JavaScript. No scroll hijacking, looping animation, or autoplay media is added.

A small mint cursor dot and softly trailing ring enhance fine-mouse browsing across the portfolio. The ring expands over links and controls, uses elapsed-time easing, and stops requesting animation frames once settled. Its overlay is decorative and never intercepts input. Native cursors remain available on touch/coarse pointers, under reduced motion, in text fields and open screenshot dialogs, during keyboard navigation, and without JavaScript. Preference changes, pointer exit, tab visibility changes, and window blur restore the native cursor.

## Screenshots, illustrations, and content boundaries

Six user-supplied Storyboard screenshots are persisted in `assets/`: `storyboard-start.png`, `custom-layout.png`, `template-selection.png`, `blank-canvas.png`, `template-store.png`, and `storyboard-editor.png`. All six remain in the Storyboard authoring case; Home and the parent Analytics+ case preview the populated editor.

Eight subsequently supplied Chart Wizard screenshots are persisted separately: `wizard-chart-family.png`, `wizard-function.png`, `wizard-use-case.png`, `wizard-visual-style.png`, `wizard-favorites.png`, `wizard-customize.png`, `wizard-advanced.png`, and `wizard-result.png`. The first seven are 540×370 product-dialog crops; the final report-canvas crop is 1420×805. Cropping removes browser URLs, account avatars, and surrounding Power BI panels without altering the product interface. The parent Analytics+ case previews the actual chart-family screenshot. Dialog crops are displayed no wider than their native resolution, including in the inspection dialog.

The Wizard walkthrough distinguishes alternative Chart and Function discovery routes, use-case/visual-form filters, optional Favorites, Customize, Advanced, and the report canvas. The screenshots are arranged in feature-flow order, not presented as a recording of one session or proof that every setting persisted into the final chart. The provided multi-measure column-chart example is distinguished from the earlier confirmed actual-versus-target bullet workflow. TopN is visible as a tab; no unshown TopN settings are invented.

Three supplied Power BI Gantt screenshots are persisted as `gantt-entry.png` (440×355), `gantt-data-mapping.png` (455×310), and `gantt-timeline.png` (1406×786). The first two crop to the Analytics+ entry and guidance surfaces; the third retains the visual's ribbon, Pivot data settings, and timeline. Crops remove browser URLs, account avatars, workspace navigation, and external Power BI panels without modifying product controls, chart values, or text. Setup images stay at or below their native size. The parent Analytics+ case previews the actual timeline screenshot.

Home and the work index identify the two parent products; the Analytics+ page and About expose the five feature stories in the requested order. Gantt for Power BI and KPI Presets remain distinct from PowerTable's Microsoft Fabric planning case. Existing detailed-page URLs and section bookmarks remain unchanged.

The KPI case preserves three supplied PNG originals without cropping or resizing: `kpi-simple.png` (2000×1063), `kpi-variance.png` (2000×1046), and `kpi-preset-library.png` (1996×211). The first two show the Simple and Variance preset families; the last is a design inventory, not a full-resolution export of every card. All retain native-size inspection and no-JavaScript full-size links. The parent Analytics+ case previews the Variance screen. Simple and Variance are alternative routes; Advanced is visible only as a tab and no detailed Advanced state is invented. Preview values differ from report values, so the case does not claim matched applied results. Counts of 30+ layouts, 20+ presets, and 70+ icons describe confirmed broader design scope, not the pictured inventory, measured impact, or the release status of every variation.

KPI references were checked directly: `https://docs.inforiver.com/analytics+/working-with-analytics+/1.-navigating-the-analytics+-toolbar/card-toolbar` and `https://docs.inforiver.com/analytics+/working-with-analytics+/4.-cards/4.2.-quick-options-cards/kpi-customizations` corroborate simple and variance presets. The floating-toolbar route in the latter is documented context, not a supplied screenshot. The store is catalogue context, not proof of exact preset listings. The shared Figma URL still redirected to sign-in. No attributable preset-specific independent review was verified; general product ratings are not substituted.

The presentation case uses the nine individually supplied 1707×830 PNG originals as `presentation-screen-01.png` through `presentation-screen-09.png`, replacing the earlier tiny contact-sheet crops. They are copied without cropping, resizing, redrawing, sharpening, or synthetic detail. Full-width responsive figures preserve the complete design screens; the inspector supports original-size viewing and keyboard panning on mobile. Screens 01–03 show presentation disabled, enabled, and expanded formatting settings; 04–07 show callout styles, the monthly chart, playback guidance, and an annotation; 08–09 show quarterly small multiples without and with a callout. Their supplied order is preserved, not represented as a recorded click sequence. The parent Analytics+ case previews screen 07. The older contact sheet is no longer linked from the site.

The presentation case also keeps `assets/annotation-context.svg` and `assets/presentation-focus.svg` (both 1040×580), original, static portfolio artwork with fictional content, separate from the nine supplied design screens. Source labels appear on both figures, image alt text, SVG titles/descriptions, and inspection dialogs. The diagrams illustrate design intent, not shipped UI, exact Figma frames, or a verified playback sequence. The shared Figma prototype still required sign-in when checked; no prototype frames or interaction details were inspected. Image evidence comes from the user's attachments, not the inaccessible prototype. Visible settings and instructional callouts are described without asserting verified playback behavior. Storyboard's separate six-image grouping remains unchanged.

Confirmed presentation-case contribution scope is annotations, presentation mode, and slideshow interactions. The comments section describes public documentation rather than asserting comments-panel ownership. It does not infer threads, replies, mentions, notifications, approvals, or real-time collaboration. No feature-specific duration, release status, usability findings, or impact metrics are invented.

Directly checked presentation sources: `https://docs.inforiver.com/analytics+/storyboard/annotations` documents data-point/canvas annotations, All comments, a consolidated Comments pane, and animated annotations with a Present option; `https://inforiver.com/analytics-plus/faq/` confirms canvas/data-point annotation context. These are vendor feature documentation, not independent reviews or evidence of personal ownership. No attributable feature-specific independent customer review was verified, so no rating or testimonial was added. The template store remains catalogue context.

The Gantt case explains the two layers of mapping: making fields available in Power BI and assigning their roles in Analytics+ Pivot data. Visible but unconfigured planned-date, milestone, and connector slots are not treated as demonstrations of those features. Its reflection identifies the visible “Chart fields” / “Gantt fields” naming mismatch as a prospective terminology refinement, not an implemented or tested change. This addition does not infer a Power BI-specific duration, full-module ownership, research, release ownership, or measured impact from the separately documented Fabric Gantt work. It uses a neutral Case focus summary rather than inventing contribution details.

Public Gantt sources were checked directly: `https://docs.inforiver.com/analytics+/gantt-chart` and `https://inforiver.com/analytics-plus/gantt-chart/`. They corroborate the Analytics+ product context and setup flow, not personal ownership or customer outcomes. No attributable Analytics+ Gantt-specific independent customer review was verified in this pass; no review quotes or ratings are added. General Analytics+ reviews and separate xViz Gantt reviews are not substituted. The user-provided Analytics+ store remains template-catalogue context, not a feature review.

All product screenshots have descriptive alt text, dimensions, lazy loading below the fold, full-size links, and optional native-dialog inspection. The actual Wizard and Storyboard screenshots do not appear in the PowerTable case.

Storyboard's existing `#presentation` section now links to the separate presentation case, retaining its bookmark and clarifying that the six images show authoring. Older `/analytics.html#templates` and `#storytelling` bookmarks are redirected by JavaScript to the corresponding sections of `storyboard.html`.

The Wizard and Storyboard cases put genuine screenshot evidence immediately after the hero instead of behind long context sections. Their navigable flow overviews are available through keyboard-usable native disclosures, including without JavaScript. Custom layout, template selection, and blank report are explicitly alternative routes; the auto-create result is not illustrated. Storyboard screenshots are ordered as report entry, custom layout, template entry, template store, blank canvas, and populated editor. Presentation follows as contribution scope rather than an invented screenshot state.

The template store is product-ecosystem context, not a claim of personal ownership of the site or every catalogue asset. Descriptions of screenshot controls are observations, not assertions of unverified personal contributions or outcomes.

PowerTable leads with the earlier supplied **Layout Configuration design screen** and previews it on Home. `assets/fabric-gantt-configuration.png` is a native-resolution 1912×1038 crop from the supplied 2000×1125 image (left 80, top 50); it excludes the account header and tenant navigation without modifying product controls. It supports full-size and native-dialog inspection and remains visible without JavaScript. Tasks, Time Entries, Resource, and Cost are visible tabs; this earlier image shows only Tasks content and Reset/Next, while the newly supplied states use Save. These versions are not presented as a verified historical iteration.

### Column Mapping & Configuration

`/column-mapping.html` is a feature case under **PowerTable → Gantt → Microsoft Fabric**, linked from the PowerTable overview and Home without adding a third product or changing Analytics+ feature ordering. Its default view presents a selected Time Entries screen and three interface decisions; the five-screen walkthrough expands through native `details`. Shortcuts and direct bookmarks open the relevant section using the existing disclosure helper. All screenshots have original-resolution links, native-dialog inspection, alt text, and native size caps, including the lower-resolution Task image. No interactive planning functionality is simulated.

The five November 10 attachments are cropped locally using Sharp, with no image synthesis, resampling, repainting, or external upload. Original uploads remain outside the served asset allowlist. Crop coordinates in original screenshot pixels:

| Asset suffix (`assets/fabric-mapping-*.png`) | Source attachment | Left | Top | Width | Height |
| --- | --- | --- | --- | --- | --- |
| `task` | 1 | 243 | 104 | 312 | 235 |
| `time-entries` | 2 | 608 | 258 | 780 | 588 |
| `resource` | 3 | 607 | 258 | 780 | 588 |
| `cost` | 4 | 608 | 258 | 778 | 586 |
| `resource-layout` | 5 | 608 | 257 | 779 | 586 |

The original screenshots carry a Confidential/Internal Only marking. The dialog-only crops exclude surrounding account/workspace data but are **not publication clearance**. They are used only in the local preview; confirm permission before any public deployment or external sharing.

The walkthrough describes Task field roles and hierarchy alternatives, Direct Time Entry's source-table/Task ID/effort relationship, incomplete resource ID/display mappings with Save disabled, the explicit Resource prerequisite for Standard and Usage Cost, and the Resource layout's separate Task tab. The last is a related layout, not a mandatory fifth step. Reasoning is an analysis of the visible interfaces, not invented user research, a historical iteration log, or measured impact. The approved end-to-end Gantt/resource design role and handoff scope are inherited from the PowerTable case, not expanded to Microsoft employment or production-code ownership.

Official pages reviewed November 10, 2026: `https://learn.microsoft.com/en-us/fabric/iq/plan/overview`, `https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-overview`, and `https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-layouts/how-to-configure-gantt-layout`. The specific guide verifies core Gantt field mapping, including hierarchy, milestones, progress, dependencies, estimated effort, and filter columns. It does not independently verify every supplied Time Entries, Resource, or Cost state or their release status. No customer review, rating, or outcome is invented. The official Fabric icon is reused unchanged.

`mapping.css` removes hero glow, pastel overview stages, circular story actions, and oversized headings for the PowerTable family only. It uses neutral slate surfaces, fine rules, restrained typography, real UI evidence, and the native cursor rather than playful decorative effects. Shared navigation, screenshot inspection, finite entrance behavior, and reduced-motion handling remain intact.

The expanded PowerTable case explains why planning belongs in Fabric before my role, task-led competitive analysis, original process illustration, feature scope, and delivery involvement. Official context is verified at `https://learn.microsoft.com/en-us/fabric/iq/plan/overview` (“What is planning in Fabric?”) and `https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-overview`. Current “PowerTable sheets” terminology is distinguished from the supplied screen's “PowerTable.” The existing unchanged official Fabric icon identifies the platform rather than substituting an Office logo or inventing a PowerTable logo. Microsoft Project's `https://support.microsoft.com/en-us/project/basic-tasks-in-project-2` is an adjacent scheduling reference, not a hands-on benchmark. Public capabilities and the current comparison do not prove personal ownership, historical research findings, or release status.

PowerTable's remaining planning/resource representations are original **conceptual portfolio artwork**, not genuine product screenshots or interactive tools. Sample values, tasks, teams, and dates in those illustrations are fictional. Visible captions and SVG accessible names distinguish them from the supplied screen. The new process illustration is original responsive HTML, not Microsoft artwork. Developer handoff and implementation review describe design delivery, not ownership of all production code. Chart Wizard retains its separate supplied product evidence.

To add further approved product screenshots, replace the corresponding `.product-illustration[data-illustration]` element with an image, add its exact path to the server allowlist, and update the figure caption and browser tests. Do not present concepts as shipped interfaces.

The Analytics+ case describes a shipped Chart Wizard and shipped supporting deliverables. Storytelling describes contribution scope. The PowerTable case describes design scope and distinguishes resource-planning exploration from released functionality. No case asserts unverified research, usability improvements, adoption, or business impact.

The official Inforiver release walkthrough (November 24, 2024) documents the Chart Wizard feature and is linked as vendor product documentation, not as a customer endorsement or proof of personal contribution. The Analytics+ store is a template catalogue, not a feature-review page. A public review search surfaced general Analytics+ reviews, but no attributable Chart Wizard-specific customer review was verified; no review quotes, ratings, or inferred feedback were added.

The supplied portrait is saved without alteration as `assets/ravichandran-profile.png` (800×800) and displayed under About with descriptive alt text and a responsive square frame.

The supplied LinkedIn URL is linked from Home and About. Direct unauthenticated LinkedIn access was blocked by HTTP 999 and a browser sign-in wall. The subsequent user-supplied experience and recommendation screenshots provide the source for the dated timeline and quotations. No hidden skills, education, contact information, or resume have been inferred.

The About timeline groups six dated roles under three employers: Lumel Technologies (Product Designer II, Jan 2025–Present; Product Designer I, Jul 2023–Jan 2025; Contractor, Oct 2022–Jul 2023), Arus Info (UX/UI Designer, Apr 2023–Jul 2023; Trainee Engineer, Jul 2022–Jun 2023), and Velsure Softech Solutions (Project Intern, Dec 2021–Apr 2022). Explicit dates are used rather than LinkedIn's rounded duration labels. Overlapping periods are preserved as provided, not summed or rewritten. Analytics+ (2.5 years) and PowerTable (1.5 years) remain separate product assignments, not additional employment roles.

About includes in-page Profile, Approach, Experience, and Recommendations navigation. Recommendations reproduce the supplied text from Mai Tran (November 3, 2026; senior colleague, not a direct manager) and Deepak Praveen (November 2, 2026; direct manager), with author roles, verbatim excerpts, expandable full quotations, and a link to the original LinkedIn section. The general portfolio title remains Product Designer; Product Designer II is the verified current employment role. The phrase "senior designer" occurs only in the attributed recommendation, not as an invented personal title.

### Gantt Baseline Configuration & Comparison

`/gantt-baselines.html` is a sibling feature case under **PowerTable → Gantt → Microsoft Fabric**. Home and PowerTable link directly to it; the two feature cases link to each other. It reuses the restrained `mapping.css` treatment, native cursor, accessible screenshot inspector, and source disclosures. It does not add a product, reorder Analytics+ features, or simulate a planning application.

Two November 10 attachments provide three native-resolution crops. The first screen supplies the comparison menu and timeline; these are not presented as separate states. The second supplies the manager panel. Crops were prepared locally with Sharp; no synthesis, resampling, or external upload was used.

| Asset suffix (`assets/fabric-baseline-*.png`) | Source attachment | Left | Top | Width | Height |
| --- | --- | --- | --- | --- | --- |
| `compare-menu` | 1 | 544 | 98 | 452 | 281 |
| `timeline` | 1 | 1027 | 257 | 918 | 692 |
| `manager` | 2 | 1592 | 156 | 350 | 360 |

The manager's three author-metadata rows are intentionally redacted using opaque white rectangles at crop-relative `(left:16, top:121/220/319, width:317, height:32)`. Names, initials, and timestamps are removed; baseline names and row-level controls are retained. Captions and alt text disclose the redaction. Task names and account/workspace chrome are excluded from the comparison crops. Originals remain outside the server allowlist. The source screenshots are marked Confidential/Internal Only; redaction does not grant publication clearance. This remains a local preview pending permission for public use.

The menu's rule means **two total options**, including Current Data when selected—not current data plus two baselines. Current Data and Baseline 1 are selected in the supplied state. Create New is only a visible entry point: no creation form, persistence behavior, third-selection feedback, permissions, confirmations, or action-icon behavior is inferred. The timeline shows blue and light-grey bars on a shared axis; no computed variance or outcome is claimed. Resource Gantt baseline explorations remain separate from this comparison design scope.

Official context checked November 10, 2026: `https://learn.microsoft.com/en-us/fabric/iq/plan/overview` and `https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-concept-gantt`. These establish Planning/PowerTable and general Gantt capabilities, not the supplied baseline menu, manager, selection limit, or release status. No baseline-specific public review was verified. Intelligence Gantt and other planning-sheet documentation are not substituted for PowerTable evidence.

Focused baseline checks cover the three native crop dimensions and order, non-upscaling and overflow at 320/390/768/1440px, redaction pixel regions, route boundaries, source/ownership limits, parent/Home/sibling navigation, mobile actual-size panning and focus return, and no-JavaScript access.

### Gantt Resources — Conditional Formatting

The PowerTable overview groups feature cases into three workspace cards: **Gantt** (Column Mapping, Baseline Comparison, and Gantt Configuration), **Gantt Resources** (Conditional Formatting, Backlog Tasks, and Resource Configuration), and **Cross-tab** (the existing rows/columns/measures contribution overview). Cross-tab links to `#crosstab` in the full story rather than implying a separate evidence-backed case. All existing feature routes, return anchors, and the two-product Home hierarchy are preserved. The cards stack on tablet/mobile and use native links, including without JavaScript.

`/gantt-conditional-formatting.html` is **feature case study 03** under **PowerTable → Gantt Resources → Microsoft Fabric**, linked from Home, PowerTable, baseline, and backlog cases. The resupplied resource screenshot exactly matches the existing conditional-formatting evidence, so the case is refined rather than duplicated. Its route and bookmarks are preserved. It retains restrained PowerTable typography, neutral surfaces, native cursor, original-resolution links, screenshot inspection, responsive sizing, and native source disclosure. No new runtime JavaScript or simulated rule engine is added.

The November 10 attachment is one 1999×1000 editing state. Three local Sharp crops preserve the supplied pixels without synthesis, resampling, or repainting:

| Asset suffix (`assets/fabric-conditional-*.png`) | Left | Top | Width | Height |
| --- | --- | --- | --- | --- |
| `rule` | 1338 | 142 | 612 | 823 |
| `summary` | 885 | 190 | 445 | 39 |
| `timeline` | 254 | 230 | 1076 | 732 |

The panel crop retains Create Formatting Rule, title, mode, target selectors, condition, highlight controls, Discard, and Apply. The timeline crop excludes resource names and account/workspace chrome. Original uploads remain outside the server allowlist. The attachment is marked Confidential/Internal Only; cropping is not permission for public use. Keep the case local until publication clearance is confirmed.

The shown rule is **Schedule Hours > 0**, with orange fill swatches and a black Data Label swatch. This positive-hours threshold is not an over-allocation or capacity comparison. The new toolbar detail identifies **Summary Bar — Scheduled Hours** and **Quarter** without exposing resource names. Impacts On includes Bar and a +2 indicator; Apply To has a truncated second label. Hidden selections are not inferred. Add Condition is visible, but multi-condition states, precedence, validation, persistence, and Apply/Discard behavior are not verified from the screenshot. Blue task bars and brown summary bars in the adjacent timeline are not presented as the result of applying the orange rule. These are three crops of one state, not before/after evidence.

Microsoft Learn pages checked November 10, 2026: `https://learn.microsoft.com/en-us/fabric/iq/plan/overview` and `https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-layouts/how-to-customize-resource-layout#create-formatting-rules`. The newly verified Resource layout guide explicitly documents rules for task bars, summary bars, and milestones; summary-metric conditions; Bar / Data Label targets; AND/OR conditions; and rule management. This supersedes the earlier limited-source finding. Its **Scheduled Hours > 8** example is distinct from the screenshot's **Schedule Hours > 0** configuration. Documented available components do not establish which options are hidden in the supplied selection. Official documentation supports feature context, not independent testing or the release status of this exact design. General grid formatting, Intelligence charts, and Analytics+ Gantt are not substituted. No impact metrics, usability findings, or independent customer reviews are invented.

Focused coverage checks all three native dimensions/order, responsive non-upscaling and overflow, case-03 placement, resource-focused naming, source/privacy boundaries, Home/parent/sibling navigation, keyboard section links, actual-size mobile panning and focus return, no-JavaScript access, and the distinction between configuration, documented examples, and an applied result.

### Gantt Backlog

`/gantt-backlog.html` is a feature case under **PowerTable → Gantt → Microsoft Fabric**, linked from Home, PowerTable, and Conditional Formatting. It presents two supplied panel states side by side on desktop and stacked on smaller screens. Native-resolution images, restrained styling, keyboard section links, full-size inspection, and no-JavaScript source disclosure reuse the existing PowerTable case patterns. It does not simulate a backlog application or introduce a third product.

The two November 10 attachments are 2000×998 and 2000×999 respectively. Three local Sharp crops preserve the supplied pixels without synthesis, resampling, repainting, or external upload:

| Asset suffix (`assets/fabric-backlog-*.png`) | Source attachment | Left | Top | Width | Height |
| --- | --- | --- | --- | --- | --- |
| `empty` | 1 | 1592 | 150 | 350 | 550 |
| `list` | 2 | 1592 | 150 | 350 | 550 |
| `pending` | 2 | 48 | 144 | 500 | 40 |

The panel crops retain their heading, empty-state Add Task action, or Search / Backlog List (1) / New Task / T0011 row controls. The toolbar crop retains Save to Database, Preview Changes (1), and Discard Changes. It is a detail from the second state, not a third screen or proof of a successful save. The task form, underlying dates, search results, delete confirmation, scheduling interaction, and persisted database result are not supplied.

Crops exclude surrounding project/task-grid content, account controls, and workspace chrome. Original attachments remain outside the server allowlist. Both sources are marked Confidential/Internal Only; cropping does not grant publication clearance. This remains a local preview pending permission for public use.

Official pages reviewed November 10, 2026: `https://learn.microsoft.com/en-us/fabric/iq/plan/overview` and `https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-layouts/how-to-manage-tasks-resource#create-a-backlog-task`. The latter explicitly documents **Resource layout** backlog tasks without Start Date and End Date, later scheduling through editing, and Save to Database. It is related PowerTable product context, not verification of every control or release state in the supplied task-based Gantt panel. The screenshot does not establish T0011's dates or reproduce the documented form workflow. No feature-specific independent customer review, measured usability result, or impact metric is claimed.

Focused checks cover three native crop dimensions and order, desktop paired/mobile stacked layouts, non-upscaling and overflow at 320/390/768/1440px, route/privacy boundaries, Home/parent/sibling navigation, accessible screenshot inspection and panning, no-JavaScript access, and the distinction between list visibility, pending changes, persistence, and resource-layout documentation.

### Resource Configuration — Side Panel

`/resource-configuration.html` is a feature case under **PowerTable → Gantt Resources → Microsoft Fabric**, linked from the grouped PowerTable directory and the Conditional Formatting case. Home reaches it through PowerTable without another top-level product or a longer feature-link list. The four attachments show **Edit Resource** component settings, not a conditional-rule builder, so this is deliberately separate from Conditional Formatting.

The default view leads with Timeline and three short interface decisions. A native disclosure contains the Milestone, Data Color, and Label states in supplied order. Section shortcuts and direct hashes open the relevant disclosure through the existing helper. All four panel screenshots support original-resolution links, native-dialog inspection, no-JavaScript access, and non-upscaling. No new runtime JavaScript or simulated settings tool is added.

Four local Sharp crops use the same rectangle, **left 1348, top 140, width 604, height 825**, with no synthesis, resampling, repainting, or upload:

| Asset suffix (`assets/fabric-resource-config-*.png`) | Source attachment | Original dimensions |
| --- | --- | --- |
| `timeline` | 1 | 2000×998 |
| `milestone` | 2 | 2000×1000 |
| `data-color` | 3 | 2000×999 |
| `label` | 4 | 2000×1001 |

The crops preserve the complete panel frame, search, four tab labels, visible settings, and Reset to Default Styling footer. They exclude resource names, surrounding account/workspace chrome, and the outer tool rail. Originals remain outside the server allowlist. The attachments are marked Confidential/Internal Only; cropping is not publication clearance. Keep this local until public-use permission is confirmed.

Descriptions preserve the shown states: Timeline has Sunday +6 (the other selections are hidden), 8-hour daily capacity, no exception dates, Backward-Diagonal pattern, and mouse-wheel zoom Off. Milestone shows a flag and purple fill. Data Color shows All / blue task fill and a separate brown summary color. Label shows data labels and adaptive labels On, Auto, bar/summary font size 12, and separate color controls. These are tab states, not a before/after sequence or evidence of live preview, persistence, search results, reset behavior, improved readability, or a tested capacity calculation.

Official references: `https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-layouts/how-to-customize-resource-layout#customize-resource-layout-components` and `https://learn.microsoft.com/en-us/fabric/iq/plan/overview`, reviewed November 10, 2026. The Resource guide documents all four component categories and their customization context, including settings beyond the supplied states. It is product documentation, not an independent review or release verification of this exact design. No customer quotation, impact metric, historical iteration, or unseen UI is invented.

Focused resource-configuration coverage checks the four native crop dimensions and source order, non-upscaling and overflow at 320/390/768/1440px, allowlisted routes, grouped parent/sibling navigation, direct bookmarks, keyboard disclosure, actual-size mobile panning and focus return, no-JavaScript access, and source/privacy boundaries. The default portfolio overview retains its 875-word editorial budget.

### Gantt Configuration — Side Panel

`/gantt-configuration.html` belongs to **PowerTable → Gantt → Microsoft Fabric**, separate from Resource Configuration, Column Mapping, and Baseline Comparison. It is linked from the Gantt workspace card, baseline case, and resource case. Its parent return anchor is `#gantt-sidepanel`, preserving the older `#gantt-configuration` field-mapping bookmark. Home continues to reach new cases through PowerTable without extending its feature-link list.

The default view leads with Timeline and three short interface decisions. The other four tab states expand through native `details`, with keyboard section shortcuts and direct bookmarks using the existing disclosure helper. All screenshots have original-resolution links, native-dialog inspection, native size caps, and no-JavaScript access. No new runtime JavaScript or simulated scheduler is added.

Five panel-only crops were produced locally with Sharp, each **left 1348, top 140, width 602, height 823**, preserving pixels without synthesis, resampling, repainting, or upload:

| Asset suffix (`assets/fabric-gantt-config-*.png`) | Source attachment | Original dimensions |
| --- | --- | --- |
| `timeline` | 1 | 2000×997 |
| `milestone` | 2 | 2000×997 |
| `dependency` | 3 | 2000×999 |
| `data-color` | 4 | 2000×995 |
| `label` | 5 | 2000×999 |

The crops retain Edit Gantt, search, all five tab labels, settings, close, and Reset to Default Styling. Task names/data and account/workspace chrome are excluded; originals remain outside the server allowlist. The attachments are marked Confidential/Internal Only; cropping is not publication clearance. This remains a local preview until public-use permission is confirmed.

The text preserves the displayed states: Timeline has Sunday +6 (the other selections are hidden), 8-hour daily capacity, no exception dates, Backward-Diagonal pattern, and mouse-wheel zoom Off. Milestone shows a Default group with flag and purple fill, without asserting factory defaults. Dependency shows dark connector Color, solid Type, Stroke 2, Auto Scheduling On, and Successor Off. Connector Type is a line style, not the dependency relationship; the toggle states do not demonstrate rescheduling or prove tasks lack successors. Data Color is All / blue Fill. Label is On / Auto / size 12 with separate color controls. Adaptive and summary-label controls from the Resource case are not inferred.

Official references: `https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-concept-gantt` and `https://learn.microsoft.com/en-us/fabric/iq/plan/overview`, reviewed November 10, 2026. A targeted documentation search verified general PowerTable Gantt concepts, not an exact Edit Gantt panel guide. A candidate customization URL returned 404 and is not linked. Resource customization and Intelligence Gantt documentation are not substituted. No feature-specific independent review, release verification, measured outcome, or unseen state is claimed.

Focused checks cover five native dimensions/order, responsive non-upscaling, route and source boundaries, parent/Home/sibling navigation, preserved field-mapping bookmarks, direct tab hashes, keyboard disclosure, mobile panning/focus return, and no-JavaScript access.

## Validation

```sh
npm install
npx playwright install chromium
npm test
```

The browser suite covers the nine main pages and the additional column-mapping feature at 320, 390, 768, and 1440 pixels, horizontal overflow, image loading, internal links and anchors, product and feature navigation and numbering, keyboard/mobile menu behavior, reduced motion, no-JavaScript navigation and disclosures, screenshot grouping, full-size opening and inspection, exact role dates and recommendation text, sticky case navigation, reading progress, scroll reveals, previous section bookmarks, neutral styling, and static server boundaries. Hiring-focused checks verify early screenshot placement, concise case summaries, 44px mobile section targets, minimum type sizes, 4.5:1 text contrast on sampled editorial surfaces, native-resolution panning and resizing, and non-nested reveals. Analytics+ checks cover official source attribution, ordered feature stories, parent/child navigation, and the keyboard-scrollable competitive comparison. Gantt checks cover all three crops, their native dimensions and ordering, product/About entry points, mobile timeline inspection, and the separation between public feature documentation and unverified claims. Presentation checks verify all nine full-resolution screens, native dimensions, source order, non-upscaling, full-width desktop layout, original-size mobile inspection, the parent-product preview, SVG validity and accessible descriptions, conceptual labeling in figures and dialogs, and explicit boundaries around prototype access, comments ownership, and reviews. KPI checks cover all three original images, alternative preset families, preview-versus-report values, original-size mobile panning and focus return, product/About no-JavaScript entry, and source boundaries. Column-mapping checks cover five crop dimensions and source order, native size caps, Home and PowerTable entry points, direct bookmarks, keyboard disclosure, mobile image panning and focus return, no-JavaScript access, and source/release/publication boundaries. Detailed cases are checked for business context, paired pain/solution cards, working concept-node links, responsive diagram layout, and complete no-JavaScript user flows.
