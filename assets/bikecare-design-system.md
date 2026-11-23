# BikeCare Signal

## Design-system and theme explanation

**Edition:** 23 November 2026. **Scope:** UX/UI concept and clickable prototype.

Signal replaces the earlier cream, charcoal-button and editorial-serif direction.
It uses graphite, mineral-grey surfaces and signal-orange actions. The product
name and original linked-care mark remain; the visual language changes.

This document explains decisions, not proven user preferences. No interviews,
colour-psychology results, conversion uplift, usability score, Google authorship
or accessibility certification is claimed.

**Reading map:** sections 1-4 explain the foundations; 5-8 describe components,
states and privacy; 9-10 cover handoff and layout; 11-12 connect architecture and
journeys; 13-14 identify missing production scenarios and research decisions.

**Evidence boundary:** 59 exported mobile frames, seven screen-linked journey
maps and a connected page-memory prototype. A frame is one example state, not
proof that every possible scenario has been designed or validated.

## 1. What the system must help people do

BikeCare connects Indian riders and independent workshops. Its most important
decisions are understanding a vehicle, approving an estimate, acknowledging work,
reading a bill and recovering from a problem.

- Riders need understandable records, optional care cues and private documents.
- Advisors need readable intake and estimate revisions.
- Mechanics need the currently approved work, not permission for unapproved extras.
- Billing staff need distinct invoice, receipt and outstanding-balance states.
- Support needs unresolved issues and proposed next steps, not false closure.

Parts and motorcycle rides are supporting journeys. The system should make core
care easier to follow rather than make every module equally prominent.

## 2. Why this theme

| Choice | Design reason | Guardrail |
| --- | --- | --- |
| Graphite reading ink | Gives vehicle details and bills a consistent, tool-like hierarchy. | Never replace explanatory text with a decorative badge. |
| Cool mineral canvas and clean surfaces | Separates the page from its records without the previous warm onboarding aesthetic. | Group related information; do not put every sentence in a separate card. |
| Signal orange | Makes the next deliberate action and original brand mark distinct from secondary controls. | Orange is not the due, error or acknowledgement colour. Use one filled primary action per decision group. |
| System sans throughout | Connects onboarding and operational screens, supports device-native rendering and avoids an extra font download. | Test Indian-script typography before adding languages; it is not implemented by an English font stack. |
| 12px controls and 18px cards | Creates a more structured utility identity than the earlier pills and softer cards. | Shape never changes the minimum touch target. |

These are hypotheses about visual hierarchy and product positioning. Validate
comprehension and reading comfort with riders and workshop staff before release.
No colour is asserted to create trust, safety or willingness to pay.

## 3. Semantic colour tokens

Tokens describe a job, not an arbitrary colour name. The prototype and component
board use the same CSS variables; theme metadata documents those same values.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `canvas` | #f2f4f5 | #14191d | Main phone background |
| `surface` | #ffffff | #20282e | Forms, records and navigation |
| `ink` | #20262b | #f4f7f9 | Primary reading text |
| `muted` | #55616b | #b8c4cc | Supporting text, never essential information hidden by low contrast |
| `line` | #d4dade | #45535e | Decorative separators |
| `control-line` | #7a858f | #8898a4 | Visible interactive boundaries |
| `primary` | #ae3d12 | #ffac7a | Brand and next deliberate action |
| `on-primary` | #ffffff | #2d1b12 | Text on the primary action |
| `primary-hover` | #91300d | #ffc096 | Pointer-hover primary action |
| `soft` | #e7ecef | #2c373f | Quiet grouped context |
| `feature` | #263239 | #2c373f | Vehicle summary background |
| `on-feature` | #f5f7f8 | #f4f7f9 | Vehicle summary text |
| `warning` / `warning-soft` | #855000 / #fff2d9 | #ffdb8f / #3a2e19 | Attention or supplied care due |
| `error` / `error-soft` | #ad302b / #fff0ed | #ffb8ad / #422823 | Actionable error or correction |
| `info` / `info-soft` | #255779 / #eaf3fb | #b0d9fc / #213747 | Information or review pending |
| `success` / `success-soft` | #1e6744 / #e4f3e9 | #9eddb8 / #1b362a | Record acknowledgement |
| `focus` | #0668a8 | #91d5ff | Keyboard focus outline |

Light keeps white record surfaces distinct from the mineral canvas. Dark is an
independent set of surfaces and foregrounds, not image inversion. It is optional;
no claim of reduced eye strain is made. Switching theme never changes record,
payment, consent, document or complaint state.

### Measured contrast for these pairs

Ratios use the WCAG relative-luminance calculation, rounded to two decimals.

| Pair | Light | Dark |
| --- | --- | --- |
| Ink / surface | 15.29:1 | 13.90:1 |
| Muted / canvas | 5.75:1 | 9.95:1 |
| Primary label / action | 6.04:1 | 8.95:1 |
| Control boundary / surface | 3.76:1 | 5.04:1 |
| Focus / surface | 5.91:1 | 9.37:1 |

The defined status text/background pairs exceed 4.5:1. These checks concern
specified token pairs, not every rendered element or a complete WCAG audit.
Decorative separators are not substitutes for interactive control boundaries.

## 4. Type, spacing and layout

| Role | Default |
| --- | --- |
| Welcome headline | 32px, system sans, approximately 1.12 line height |
| Splash headline | 30px, approximately 1.16 line height |
| Task title | 26px, approximately 1.15 line height |
| Card title | 18px, approximately 1.25 line height |
| Inputs | 16px minimum, approximately 1.4 line height |
| Compact reading copy | 14px / 21px |
| Supporting copy | 12px / 18px |

Exported evidence frames use documented compact presentation sizing; the live
prototype remains the interaction reference. Amounts use tabular figures.
Essential content does not rely on tiny decorative captions or placeholders.
Some navigation annotations, badges and source captions currently use 9-11px
type. These are compact evidence details, not recommended production body-copy
sizes; enlarge and test them on physical phones before a production handoff.

Use a 4px spacing grid: 4, 8, 12, 16, 24 and 32px. Keep labels close to their
fields, related controls together and separate decisions visibly apart. Long
manufacturer names, model names and identifiers wrap without changing meaning.
The phone content scrolls independently while navigation stays reachable.
Do not shrink an entire screen to fit a long record.

## 5. Reusable component rules

| Component | Anatomy and behaviour | Recovery |
| --- | --- | --- |
| Primary action | Verb-led label, filled orange, at least 44px target | Explain any unmet condition beside a disabled important action |
| Secondary action | Surface background and control boundary | Preserve the current record on cancel |
| Labelled field | Persistent label, 16px input, optional hint | Associate the specific error with its field; preserve entered data |
| Searchable choice | Query, filtered options, selected state, manual entry | Escape closes; keyboard navigation is immediate; manufacturer changes clear its dependent model |
| Vehicle context | Manufacturer, model, year, variant and powertrain | Unknown stays unknown; registration and chassis remain distinct |
| Record card | ID, revision, actor, status and relevant details | Do not silently approve a changed estimate |
| Invoice | Itemised parts/labour, illustrative tax, total and receipts | Partial payment keeps a balance; payment does not confirm workmanship |
| Document row | Type, rider/vehicle scope, date cue and Add/View action | Explicit replacement and confirm-delete; no fake legal-validity badge |
| Support timeline | Issue context, events and next proposed step | Rider can challenge closure or reopen; proposed remedy is not executed repair |
| Navigation | Five primary destinations, selected state and text label | Supporting modules live in More rather than crowding the primary bar |

The case-study component board includes a working field-validation example,
default/disabled buttons and labelled status specimens. It saves nothing.
Product settings expose the currently selected theme's swatches and hex values.

## 6. State and wording contract

Orange means action. Amber means attention. Red explains a problem. Green
acknowledges a record. Information uses a separate blue pair. Every state has
words; colour alone is insufficient.

Estimate approval, mechanical completion, invoice issue, payment, rider
confirmation, satisfaction and complaint resolution remain independent.
Never collapse them into a single "verified" state.

Prefer "Estimate approved", "Partial payment", "Review requested" and "Expired
date". Avoid "Everything verified", "Safe to ride" and "Refund completed" when
the prototype has not established those facts.

## 7. Interaction and accessibility

- Minimum 44px touch controls are a product recommendation, not a claim that
  all WCAG 2.2 AA targets must be 44px.
- Use visible 3px keyboard focus with a 3px offset. Do not steal focus on initial
  page load; entry transitions focus their new heading.
- Press feedback uses transform only, 120ms and an ease-out curve.
- Keyboard actions remain immediate. Reduced motion removes press scaling.
- Hover styles apply only to hover-capable fine pointers.
- Splash has no fake loader or compulsory timer; continue and replay are explicit.
- Inputs retain labels, appropriate native keyboards and readable errors.
- Privacy and destructive choices are not preselected. Deletion requires confirmation.

Validate screen-reader announcements, text enlargement, touch/keyboard operation,
landscape, real phone keyboards and long/localised content before production.
Browser automation and contrast calculations do not replace these checks.

## 8. Brand, photographs and privacy

Keep the original linked-care mark at least 32px with 8px clear space. The check
refers to record acknowledgement, not quality certification. Do not stretch the
mark or borrow manufacturer identity.

Official current-product photos remain attributed, contained and unmodified.
They do not verify a selected historic model/year/trim. An unmatched vehicle
gets a named empty state, not an unrelated image. Production image rights and
trademark clearance remain unresolved.

The private vault accepts fictional samples only. Licence is rider-scoped;
insurance and RC are vehicle-scoped. Document dates do not verify coverage or
legal permission. Staff, resale previews and ride pages cannot open the vault.
This prototype has no real upload, secure storage, authentication or persistence.

## 9. Handoff and release checks

Update the shared theme metadata and CSS together. Re-export the screen evidence
after visual changes. Do not relax the site's Content Security Policy to support
inline theme styling.

Check normal, focus, pressed, disabled, empty, invalid, pending, acknowledged and
recovery states in both themes. Check defined text pairs at 4.5:1 or greater and
important control boundaries at 3:1 or greater. Keep confirmations, cancellation
and role boundaries working after a component change.

Before a production design handoff, validate primary research, workshop workload,
language/literacy needs, physical-device accessibility, image rights, billing
requirements, secure document handling and support operations. This document
does not resolve those dependencies.

## 10. Geometry, icons, layering and responsive behaviour

These specifications describe the current prototype unless marked as a
production requirement. They are not a second theme or a replacement for the
semantic colour tokens.

| Element | Current specification | Reason / boundary |
| --- | --- | --- |
| Phone preview | Maximum 390px wide; height is the smaller of 760px or viewport height minus 24px | Fits inside the case study; not a production device-size requirement |
| Evidence frame | 390 x 844px | Consistent comparison of the 59 exported states; not a full responsive specification |
| Phone shell | 26px radius; 1px border; header / scrolling body / navigation | Simulated device framing stays separate from 18px product cards |
| Body / cards | 18px body padding; 16px record-card padding; 12px form gaps | Keeps related information readable without squeezing long records |
| Controls | At least 44px target; buttons 10px/14px padding; inputs 9px padding | Visible glyphs and checkbox marks may be smaller than their labelled target |
| Small shapes | 8px status/option radius; 12px control radius; 18px card radius | Small inline states should not look like full containers |
| Brand icon | 32px normally; 88px on splash; 8px normal clear space | Expanded first-contact identity, not an icon-only navigation requirement |
| Dropdown glyph | 16px, 2px stroke | Indicates expansion; its adjacent control remains 44px |
| Rating glyph | 24px, 1.5px stroke inside a 48px labelled radio target | Selection includes an accessible label and state, not just a coloured star |
| Record elevation | Surface and border; no shadow on every card | Avoids competing floating layers in dense bills and records |
| Choice panel | Layer 5; 1px control border; `0 12px 32px #0002` shadow | Local overlay above the phone content, not a global modal layer |
| Safe area | Header top and navigation bottom include device safe-area insets | Protects controls from notches and home indicators |
| Press motion | `--bc-press: 120ms`; `--bc-ease-out: cubic-bezier(.23, 1, .32, 1)`; scale 0.98 | Touch/pointer acknowledgement only; keyboard and reduced-motion paths do not scale |

Use text labels for unfamiliar icons. Decorative SVGs are hidden from assistive
technology; an icon-only control needs a specific accessible name. The concept
uses original small SVGs and some text symbols, not a complete standardised icon
library. Normalising every glyph across Indian-script fonts remains a handoff
task.

The prototype remains a single-column phone experience on a desktop. The
surrounding architecture map collapses its branches at 760px; that breakpoint
belongs to the portfolio presentation, not a tablet product layout. Long names
wrap in records and options. Single-line inputs scroll their text natively.
Test expanded text, landscape and on-screen keyboards without reducing font
sizes or scaling the entire interface.

### Searchable manufacturer and model choices

Keep the visible label separate from the current value. Focus opens suggestions;
typing filters them case-insensitively. An unlisted query exposes an explicit
manual/unverified choice. Empty results explain how to enter a document-led name.
Changing manufacturer clears the dependent model; neither a suggested name nor
an official photograph proves the vehicle's year, variant or parts fit.

Arrow keys move the active option; Home/End move within an open list; Enter
selects; Escape closes; Tab leaves the field. Selection returns focus to the
combobox. Active and selected options use a surface cue with wording, not brand
colour alone. The panel fits available phone/visual-viewport space and opens
above the field when there is insufficient space below. Its local scrolling
must not hide the current choice behind the keyboard.

The existing control supports at most 80 characters and a panel up to 240px high.
These are prototype bounds, not verified limits for every historic manufacturer
or model. Search synonyms, transliteration and catalogue provenance need
additional research.

## 11. Product architecture and responsibility map

This is information architecture, not authentication, database architecture or
proof of secure permissions.

```text
Splash -> welcome -> rider access / workshop access
Rider -> garage -> selected vehicle
Rider -> private licence
Selected vehicle -> private insurance + RC
Selected vehicle -> service job ID + revision
Advisor intake -> rider estimate approval -> mechanic record
  -> billing invoice + separate receipts -> rider record review
Jointly confirmed record -> history -> supplied care cues / resale preview
Confirmed record -> optional feedback -> consent-based support request
Supporting paths -> parts pickup order / motorcycle ride request
```

| Actor | Can decide in the prototype | Must not imply |
| --- | --- | --- |
| Rider | Approve estimate, review own record, manage garage/vault, choose feedback and challenge support closure | Mechanical completion, supplier approval or a verified legal document |
| Advisor | Record intake and request approval for the current estimate revision | Approval on the rider's behalf or payment receipt |
| Mechanic | Record currently approved work and request reapproval for extras | Unapproved work, battery certification or invoice/payment authority |
| Billing staff | Issue itemised invoice and record separate illustrative receipts | Workmanship agreement or actual money movement |
| Support agent | Propose a response and retain request events | Open the private vault, rewrite service facts, execute a refund or self-close a rider complaint |

Rider navigation is Home, Service, History, Shop and More. Workshop navigation
is Jobs, Job card, Work, Bill and More; support has its own reduced navigation.
More exposes secondary destinations rather than adding every module to the
primary bar. Role switching is an explicit design-review simulation, not
production authorisation.

Each vehicle retains its own service context. Licence belongs to the rider;
insurance and RC belong to the selected vehicle. Chassis is private rider-profile
information, not public ride or resale content. Vault documents do not gate the
service workflow. Changing appearance never changes these relationships.

## 12. End-to-end journey and recovery inventory

The seven maps in the case study cover the following paths. EV examples extend
vehicle setup and service; they are not a separate verified diagnostic product.

| Journey | Connected design path | Important recovery / boundary |
| --- | --- | --- |
| Access and vehicle | Splash -> welcome -> sign-in/signup -> demo code -> manufacturer/model -> year/variant -> identifiers -> profile | Wrong/expired code, resend, staff recovery, replay and explicit design-review skip; unknown/manual vehicle values stay valid |
| Private documents | More/profile -> vault -> add synthetic sample -> detail -> replace or confirm-delete -> date cues | Cancel retains the existing entry; deletion changes neither vehicle nor service history; unknown/expired date is not legal verification |
| Service handovers | Advisor intake -> versioned estimate -> rider approval -> mechanic record -> invoice -> receipt -> rider review -> optional feedback | Extra work returns to approval; correction holds the record; partial receipts retain a balance; low rating alone does not create a complaint |
| Reminders and resale | Jointly confirmed history -> supplied date/distance guidance -> notifications -> private resale preview | Missing interval shows guidance needed; denied push keeps optional in-app cues; snooze does not erase due care |
| Parts purchase | Catalogue -> fit/stock/seller detail -> cart -> separate seller pickup order -> product-issue request | Unknown fit, insufficient stock or pending supplier blocks checkout; cancellation does not mean money has been refunded |
| Motorcycle rides | Public/club/company list -> detail -> join request -> organiser review -> approved private meetup | Eligibility/capacity/date checks, decline, withdrawal, cancellation and local report/block; no live membership or safety verification |
| Help and recovery | Help -> category/context -> request -> timeline -> support proposal -> rider acceptance, escalation or reopen | Service, product, payment, account, ride and feedback issues remain separate; timeline events never execute provider actions |

EV setup uses battery capacity and connector rather than engine capacity.
EV intake records charge/condition; work and billing show inspection and
qualified-service referral, not oil service, battery repair instructions or an
invented health score.

The feedback prompt appears after rider confirmation, with no preselected rating.
Skip and return remain available. Work confirmation, payment, satisfaction and
complaint closure are independent facts, including when one is complete and
another is unresolved.

Help displays `help@bikecare.example.test`, a reserved fictional address, not an
operational mailbox. No email, push, SMS, purchase, support request or document
leaves the page. Reload resets the simulated records and preferences.

## 13. Missing production scenarios: explicit design backlog

These items are deliberately not presented as completed screens or working
features. The concept demonstrates selected scenarios, not "all possible"
conditions.

| Unresolved scenario | Required design decision before implementation |
| --- | --- |
| Offline, timeout and interrupted submission | Distinguish saved/unsent/failed work; preserve drafts and offer a visible retry without creating duplicate jobs, requests or payments |
| Two staff editing the same revision | Show which revision changed, identify the current owner and require review instead of overwriting approved work |
| Real authentication and session expiry | Define secure recovery, workshop tenancy, role access and re-entry without exposing another rider's records |
| Secure document upload | Design consent, supported formats, upload failure, access audit, replacement, retention and deletion; never turn synthetic samples into a real vault by changing copy |
| Vehicle sale, ownership transfer and imported receipts | Separate ownership from historic-work provenance; minimise identity and define what the previous/new owner can inspect |
| National historic vehicle catalogue | Establish source/licence, model-year/variant provenance, unavailable-data states and manual correction; representative suggestions do not satisfy exhaustive coverage |
| Booking and workshop capacity | Design availability, cancellation, rescheduling, no-show and delayed-service communications; current core is a simulated walk-in handover |
| Real parts fulfilment and refunds | Establish stock reservation, seller disputes, pickup failure, return eligibility and gateway reconciliation before claiming an executed remedy |
| Live rides and moderation | Define membership checks, reports, cancellation notifications and moderator response; do not imply emergency response or guaranteed safe strangers |
| Localisation and assisted use | Test Indian-script fonts, transliteration, date/currency comprehension and low-literacy/assisted workflows; language switching is not implemented |
| Accessible production variants | Validate screen-reader order/announcements, enlarged text, landscape, keyboard occlusion, physical-device touch targets and normalised icons |
| Support operations | Define staffing, response-time expectations, evidence handling and escalation ownership; no invented SLA or functional help mailbox |

Use the same state grammar across these future components: explain what
happened, what remains unchanged and what the person can do next. A persistent
record status belongs beside the record; a transient acknowledgement must not
hide an unresolved problem. Never show success because a network call failed.

## 14. Business rationale, research and deliverable traceability

### Market and competitor evidence

The case study cites SIAM's 15 April 2025 report of 19,607,332 domestic
two-wheeler sales in FY2024-25 and ACMA's 8 July 2025 report of a
Rs 99,948 crore automotive-component aftermarket. These are dated context:
annual sales are not installed vehicles; the all-vehicle aftermarket is not
BikeCare's addressable service revenue. Neither establishes a 2026 forecast,
market share, TAM or willingness to pay.

GarageMate documents workshop operations. Hero App documents brand-owner care
and authorised-dealer journeys. Royal Enfield App combines care, shopping and
rides. Their published features establish baselines, not usability rankings or
proof that an undocumented competitor feature is absent. The proposed
differentiator is understandable cross-workshop care continuity, not a larger
feature list.

### Proposed business and learning sequence

Independent workshops are the proposed subscription buyers; riders receive
basic care records and complaint access without a proposed paywall. Pricing,
retention and willingness to pay remain unvalidated. Onboarding, staff recording
time, support, storage and optional messages are costs to measure. Supplier
commercial incentives must not outrank parts fit or encourage unnecessary work.

Research should observe local-service riders, advisors, mechanics and billers,
then test intake, revision approval, payment distinction, document scope and
complaint reopening. Include historic/manual vehicles, EV referral, denied
notifications and partial payment. Gather baseline task time, comprehension,
mistaken approvals, duplicated paperwork and unresolved/reopened issues before
setting pilot size or pass/fail thresholds. Broaden into parts and public rides
only after establishing support capacity.

### Where each deliverable lives

| Deliverable | Source / location | What it demonstrates |
| --- | --- | --- |
| Portfolio entry and cover | Home BikeCare card; `src/ProductCover.jsx` | Portfolio palette/type/borders around original product frames |
| Complete case study | `bikecare.html`; `src/pages/bikecare.jsx` | Problem, public research, business hypotheses, design rationale and disclosed limits |
| Interactive system board | Case-study design-system section | Both themes, tokens, field validation and explicit state specimens |
| Architecture and seven journey maps | `src/BikeCareProductStrategy.jsx` | Responsibilities, relationships, screen-linked decisions and recovery |
| Clickable phone prototype | Case-study prototype section; `src/BikeCareApp.jsx` | Connected fictional role/state interactions; not a backend or secure app |
| 59 mobile frames / walkthrough | Screen collections and Solution/Walkthrough | Selected original 390 x 844 states, including splash, EV, documents and support |
| Shared product tokens | `bikecare.css`; `src/bikecare-ux-model.js` | Matching semantic light/dark values; no independent undocumented palette |
| Explanation guide | `assets/bikecare-design-system.md` | This versioned decision and coverage document |

The portfolio shell follows the portfolio's own light/dark theme and display
font. Embedded BikeCare screens retain Signal and system sans. Do not recolour
the product prototype to fix a portfolio-cover mismatch, or apply product
orange to unrelated portfolio sections.

## Reference standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Contrast guidance: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- Non-text contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- Reduced-motion preference: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

## Case-study research sources

- GarageMate: https://garagemate.in/
- Hero App: https://play.google.com/store/apps/details?id=com.customerapp.hero&hl=en
- SIAM, 15 April 2025: https://www.siam.in/pressrelease-details.aspx?mpgid=48&pgidtrail=50&pid=579
- ACMA, FY2024-25 aftermarket report: https://www.acma.in/uploads/press-release/Press%20Release%20FY25.pdf

The full case study contains the Royal Enfield and manufacturer-photography
source links. Research statements above summarise the case's existing dated
evidence; they are not a new live-market or hands-on competitor audit.
