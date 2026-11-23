export const bikecareFacts = [
  ['Local service. Forgotten dates. Missing history.', 'Riders also service bikes at independent mechanics, not only authorised centres. My idea addresses remembering periodic care and keeping records when a bike is resold. This starting scenario is not interview research.'],
  ['Approve. Document. Stay connected.', 'Separate rider, advisor, mechanic and billing workspaces connect estimates, job cards and invoices with jointly confirmed history. Parts and motorcycle rides support the core care journey.'],
  ['Useful beyond the service visit.', 'Proposed value: riders remember care; workshops make clearer handovers; buyers inspect recorded history; reviewed suppliers and motorcycle groups offer useful return visits. Adoption, revenue and resale benefits are hypotheses, not measured outcomes.']
];

export const bikecareNarrative = {
  purpose: 'A service-first Indian two-wheeler UX/UI concept: identify motorcycles, scooters, mopeds and EVs, then connect local-shop care, rider-reviewed history, reminders and recovery. Parts and motorcycle communities support the journey.',
  role: 'Self-initiated UX/UI design, public-source desk research and clickable design prototype. Not application development.',
  audience: 'riders using local mechanics, service advisors, mechanics, billing staff, parts suppliers and motorcycle ride groups',
  steps: [
    ['Separate the service handovers', 'The advisor prepares intake and an estimate. The rider approves it before mechanic completion. Billing staff issue the invoice and record payment separately.'],
    ['Keep care useful after the visit', 'The rider reviews work, bill and guidance. Only jointly confirmed work enters history, date/distance reminders and the identity-minimised resale preview.'],
    ['Connect parts and motorcycle people', 'Reviewed workshops/dealers support a genuine-parts-only policy. Public, brand/club and company rides remain motorcycle-specific, with membership review and private meetup details.']
  ]
};

export const bikecareEarlierScreens = [
  ['garage', 'Bike context', 'What do you ride?', 'Brand and model connect the motorcycle illustration, component examples and local garage.', 1296, 896],
  ['vehicle', 'Add a bike', 'Start with the right motorcycle', 'The actual prototype opens brand and model selection before asking for vehicle details.', 1000, 900],
  ['care', 'Choose care', 'Give the care request a clear meaning', 'The original service-selection surface keeps the chosen motorcycle and separate care options in context.', 1440, 1000],
  ['tracking', 'Service stages', 'Make the service handovers visible', 'The illustrative console explains completed, current and pending stages alongside an example estimate.', 1440, 1082]
].map(([id, label, heading, takeaway, width, height]) => ({
  id, label, heading, takeaway, width, height, src: `/assets/bikecare-${id}.webp`,
  alt: `BikeCare original local prototype: ${label.toLowerCase()}. Simulated data, not a live service.`,
  caption: 'Captured from the supplied local prototype using example data. No live diagnostics, real bookings or workshop tracking.'
}));

export const bikecareScreens = [
  ['home', 'care', 'Rider home', 'Care remains the starting point', 'Bike identity, rider-entered mileage and supplied next-service guidance stay together.'],
  ['splash', 'access', 'Splash', 'A calm branded introduction', 'Continue to welcome without a forced timer or fake loading. Replay is available from welcome; no account is created.'],
  ['landing', 'access', 'Welcome', 'One clear beginning', 'A care-first entry connects rider access and workshop sign-in without disguising the prototype as a live service.'],
  ['rider-login', 'access', 'Rider sign-in', 'A rider workspace, not a workshop account', 'Editable fictional account, code, signup and recovery paths; no OTP is sent.'],
  ['staff-login', 'access', 'Workshop sign-in', 'Different staff, different responsibilities', 'Advisor, mechanic and billing personas have distinct demo identities and actions.'],
  ['jobs', 'workshop', 'Advisor queue', 'See the next handover', 'The workshop queue makes estimate approval, work, billing and rider review separate steps.'],
  ['jobcard', 'workshop', 'Job card intake', 'Brand-style detail for a local shop', 'Bike, mileage, complaint, fuel, condition, items received and estimate belong to one job card.'],
  ['estimate', 'care', 'Estimate approval', 'No unapproved additional work', 'The rider reviews quantities, part prices, labour and illustrative tax before approving this version.'],
  ['record', 'workshop', 'Mechanic work', 'Record approved work and actual parts', 'Only the mechanic confirms work. An extra part requests a revised estimate and fresh rider approval.'],
  ['bill', 'workshop', 'Billing workspace', 'Issuing a bill is not receiving payment', 'Itemised parts and labour connect to the job card. Billing alone owns invoice and receipt actions.'],
  ['payment', 'workshop', 'Payment receipt', 'Partial payment leaves a real balance in the design', 'Unpaid, part-paid and paid states derive from received amounts. Revised invoices retain receipts without assuming the new total is paid.'],
  ['review', 'care', 'Rider confirmation', 'Review work and the bill together', 'The rider acknowledges the exact record or requests a correction. Held records stay out of history.'],
  ['receipt', 'care', 'Service receipt', 'Payment and agreement remain distinct', 'A demo paid invoice and a jointly confirmed record are independent states, not interchangeable approvals.'],
  ['service-feedback', 'care', 'Service feedback', 'Ask how it felt, not just whether it happened', 'After confirmation, an optional rating and an explicitly requested workshop follow-up remain separate from recorded facts.'],
  ['feedback-thanks', 'care', 'Feedback saved', 'Close the loop without promising a remedy', 'One response per confirmed record; an opted-in complaint is trackable, not an executed refund or public review.'],
  ['reminder', 'care', 'Service reminder', 'Remember the supplied next service', 'Date or mileage can make care due; unknown maintenance intervals are never invented.'],
  ['history', 'care', 'Confirmed history', 'A useful record beyond this visit', 'Only jointly confirmed services enter history. Imported or self-entered receipts are not treated as confirmed.'],
  ['share', 'care', 'Resale preview', 'Show care without exposing identity', 'A buyer can inspect confirmed work and mileage without owner contact, plate, address or invoice details.'],
  ['shop', 'parts', 'Parts catalogue', 'Workshops and parts dealers', 'Service remains primary. The catalogue shows reviewed demo suppliers, not unverified marketplace listings.'],
  ['product', 'parts', 'Part detail', 'Fit and provenance before checkout', 'Bike compatibility, part identity, stock and return terms must be checked separately from supplier review.'],
  ['supplier', 'parts', 'Supplier checks', 'Reviewed documents are not proof of genuineness', 'Business and authorisation checks, packaging and manufacturer identifiers have distinct evidence states.'],
  ['cart', 'parts', 'Pickup checkout', 'Review each seller and quantity', 'Demo stock limits and compatibility gates apply. Collection is separate by seller; no shipping is claimed.'],
  ['order', 'parts', 'Order state', 'An order can still be unpaid', 'Pickup payment and cancellation are separate simulated actions. No seller or gateway is connected.'],
  ['rides', 'community', 'Motorcycle community', 'Three ride types, one motorcycle focus', 'Rider-created public trips, brand/club events and company employee rides exclude unrelated social outings.'],
  ['ride', 'community', 'Ride detail', 'Know the group before requesting a place', 'Organiser, eligibility, date and approximate area are visible. Exact meetup details remain private.'],
  ['request', 'community', 'Join request', 'Requested is not approved', 'Joining requires organiser review. Riders can withdraw; reporting and blocking remain available.'],
  ['organise', 'community', 'Create a ride', 'Plan a motorcycle-only gathering', 'Category, future date, group size and approximate public area are explicit; private contacts are not published.'],
  ['manage', 'community', 'Organiser review', 'Review membership and handle cancellation', 'An organiser approves or declines requests. Company/club eligibility is not treated as verified by a checkbox.'],
  ['garage', 'garage', 'Vehicle garage', 'A readable vehicle identity', 'Manufacturer, model, year, variant and powertrain replace the cramped three-bike picker.'],
  ['vehicle-brand', 'garage', 'Manufacturer and model', 'Search or enter an unlisted vehicle', 'Representative current and discontinued suggestions never exclude an unlisted Indian two-wheeler.'],
  ['manufacturer-options', 'garage', 'Manufacturer dropdown', 'A proper component, not a browser suggestion popup', 'Search, labelled options, selected state, keyboard focus and manual entry use the same light/dark design tokens.'],
  ['model-options', 'garage', 'Model dropdown', 'The model belongs to its manufacturer', 'Yamaha suggestions are distinct from Honda. A manufacturer change clears the previous model; unlisted names still have a manual path.'],
  ['vehicle-year', 'garage', 'Year and variant', 'Unknown is better than invented', '1970 to the demo present is an entry range, not verified availability for every model/year combination.'],
  ['vehicle-details', 'garage', 'Vehicle details', 'Keep each vehicle and its records separate', 'Optional identifiers, whole-number odometers and duplicate-identifier recovery protect the garage context.'],
  ['profile', 'garage', 'Saved vehicle profile', 'Details remain accessible after setup', 'Year/variant and powertrain-specific specifications retain their unknown or rider-entered provenance.'],
  ['documents', 'documents', 'Document vault', 'Rider-private, not workshop evidence', 'Licence belongs to the rider; insurance and RC belong to the selected vehicle. Fictional samples only.'],
  ['document-add', 'documents', 'Add a document', 'No real uploads in a design prototype', 'Choose a synthetic sample and an optional expiry date. Unknown and expired dates remain explicit.'],
  ['document-detail', 'documents', 'Document detail', 'Inspect, replace or delete deliberately', 'A labelled fictional sample has scope, revision and expiry—not legal verification.'],
  ['document-expiry', 'documents', 'Document expiry', 'A dated cue is not proof of coverage', 'Expired dates and upcoming expiry use wording, not colour alone. No renewal or permission to ride is implied.'],
  ['document-delete', 'documents', 'Delete a document', 'Remove only the vault entry', 'Confirm deletion or keep the sample; vehicle and service records remain unchanged.'],
  ['ev-profile', 'garage', 'EV details', 'Electric is a powertrain, not another brand', 'Battery capacity and connector can remain unknown; no engine-capacity or oil-change fields are imposed.'],
  ['ev-home', 'electric', 'EV rider home', 'Care without a petrol assumption', 'An electric scooter starts with empty confirmed history and no invented maintenance schedule.'],
  ['ev-job', 'electric', 'EV intake', 'Separate charge concerns from routine care', 'EV intake records charge/condition and routes battery or charging concerns to qualified EV service.'],
  ['ev-work', 'electric', 'EV mechanic record', 'Do not suggest an oil filter for an EV', 'Inspection and specialist referral are explicit; no battery repair instructions or health claims.'],
  ['ev-bill', 'electric', 'EV invoice', 'Bill only the recorded work', 'Tyre/brake inspection labour replaces petrol-only oil service; referral is not a completed battery repair.'],
  ['otp', 'access', 'Code verification', 'An editable verification journey', 'Wrong-code feedback, resend and expiry remain discoverable; all provider actions are simulated.'],
  ['otp-expired', 'access', 'Expired code', 'Recover without losing identity', 'An expired-code scenario offers retry while preserving the fictional account.'],
  ['signup', 'access', 'Account setup', 'Explain privacy before continuing', 'A profile and concept notice precede verification; no production account or data storage.'],
  ['recover', 'access', 'Staff recovery', 'Recovery belongs beside access', 'Demo reset email and new-password states are distinct from a successful login.'],
  ['notifications', 'care', 'Notification centre', 'A reminder is not an obligation erased', 'Read/unread, date advance, preferences, permission denial and snooze preserve the underlying due guidance.'],
  ['help', 'support', 'Help and support', 'One entry, contextual issues', 'Service, products, payments, accounts, community and feedback use an explicit request journey.'],
  ['complaint', 'support', 'Service complaint', 'Acknowledgement is not satisfaction', 'A complaint links to service context without rewriting the original work or confirmation.'],
  ['product-issue', 'support', 'Product issue', 'A return request is not a refund', 'Seller review and billing reconciliation remain proposed actions, not actual money movement.'],
  ['feedback', 'support', 'Feedback', 'Feedback is not a verified outcome', 'The user can describe an issue and track its response without invented ratings or improvements.'],
  ['ticket', 'support', 'Request timeline', 'Make the unresolved state visible', 'Request history, escalation and response remain separate; no real support message is sent.'],
  ['support-review', 'support', 'Support workspace', 'Do not let riders approve their own remedy', 'A separate demo support persona proposes a response but cannot collect money or edit mechanical records.'],
  ['support-resolved', 'support', 'Resolution and reopen', 'Closure can be challenged', 'The rider accepts the proposed response; reopening preserves the original request timeline.'],
  ['system', 'system', 'Design system', 'Signal / Clear care', 'Graphite, mineral surfaces and orange actions share type, spacing and explicit state rules. Explanation document included; not Google branding.'],
  ['theme-dark', 'system', 'Dark theme', 'Low luminance, not low readability', 'The actual product theme changes surfaces, text, fields and semantic states independently of the portfolio.']
].map(([id, group, label, heading, takeaway]) => ({
  id, group, label, heading, takeaway, width: 390, height: 844, src: `/assets/bikecare-mobile-${id}.webp`,
  alt: `BikeCare UX/UI design: ${label.toLowerCase()}. Fictional accounts, services and trips.`,
  caption: 'Original UX/UI concept screen from the clickable prototype. Demo roles and data; not a launched app.'
}));

export const bikecareScreenGroups = [
  ['care', 'Rider care'], ['garage', 'Garage & vehicles'], ['electric', 'EV care'], ['access', 'Access & recovery'],
  ['documents', 'Private documents'], ['workshop', 'Workshop roles'], ['parts', 'Parts shopping'], ['community', 'Motorcycle rides'], ['support', 'Help & recovery'], ['system', 'Design system']
];

export const bikecareCoverage = [
  ['Access', 'Splash → welcome → rider/workshop entry → editable demo sign-in, signup, wrong/expired code, resend, staff lockout/reset and sign-out. Replay the introduction from welcome.', 'No forced splash delay, fake loading, actual OTP, secure account, password email or persistent authentication.'],
  ['India garage', 'Category → searchable manufacturer/dependent model dropdowns → 1970–2026 year/variant → separate registration and chassis fields. Manual entry, unknown values, duplicate-number recovery and isolated empty history.', 'Fictional inputs only; no government lookup or VIN verification. Suggestions and photos do not verify historical model-year/trim or parts fit.'],
  ['Private documents', 'Rider-level licence; vehicle-scoped insurance and RC. Add, view, replace, cancel, confirm-delete and date-based expiry cues with unknown dates.', 'Synthetic samples only; no real uploads, secure storage, official verification, renewal or legal-document validity. Workshop/support roles cannot open the vault.'],
  ['EV care', 'Electric scooters/motorcycles/mopeds, battery/connector fields, charge intake, inspection/referral and non-oil invoice.', 'No battery diagnosis, health certification, OEM warranty integration or charger availability.'],
  ['Service', 'Advisor intake, estimate changes, approval, extra-work reapproval, mechanic record, correction hold, invoice, partial receipts and rider review.', 'Booking dispatch, appointment capacity and reinspection execution are not implemented. Walk-in service handovers are simulated.'],
  ['Service feedback', 'Automatic optional prompt after rider confirmation, 1–5 rating, skip/return, record-scoped response and consent-based follow-up request linked to support.', 'No public review, real workshop contact or guaranteed remedy. Ratings do not rewrite service facts, payment or complaint closure.'],
  ['Care & resale', 'Confirmed-only history, odometer validation, date/distance cues, unknown intervals, read/unread, permission denial, preferences, snooze and identity-minimised resale preview.', 'No live push/SMS, imported-receipt verification, ownership transfer or complete-history guarantee.'],
  ['Products', 'Reviewed/pending suppliers, compatibility/stock gates, quantities, unpaid order, pickup payment/cancellation and product-issue request.', 'No actual supplier review, stock reservation, fulfilment, legal refund or genuine-part certification.'],
  ['Community', 'Public, brand/club and company motorcycle rides, date/capacity validation, join review, decline, withdrawal, cancellation and local report/block.', 'No real employment/club verification, moderation, live location or guaranteed safety. Scooter/moped trip eligibility is not broadened implicitly.'],
  ['Support', 'Contextual complaint/product/payment/account/ride/feedback requests, validation, timeline, escalation, support proposal, rider closure and reopen.', 'No real support team, mailbox, evidence upload, SLA, refund execution or emergency response.'],
  ['Interface', 'Custom light/dark semantic themes, labelled controls, focus, 16px fields, minimum 44px controls, press feedback and reduced motion.', 'Browser checks are not physical-phone testing or proof of usability outcomes.']
];

export const bikecareResearch = [
  { name: 'GarageMate', url: 'https://garagemate.in/',
    finding: 'Two-wheeler job cards, mechanic assignments, service history, parts/service billing and reminders.',
    decision: 'Job cards are not a novel feature. Make role handovers and rider acknowledgement understandable.' },
  { name: 'Hero App', url: 'https://play.google.com/store/apps/details?id=com.customerapp.hero&hl=en',
    finding: 'Service dates, maintenance guidance and authorised-dealer discovery/booking.',
    decision: 'Design continuity for riders using independent mechanics; do not imply manufacturer integration.' },
  { name: 'Royal Enfield App', url: 'https://www.royalenfield.com/in/en/re-app/',
    finding: 'Service history, appointments, shopping and registration for Royal Enfield rides/events.',
    decision: 'Motorcycle community can sit beside care. Public stranger trips and company rides are BikeCare proposals, not features established by this source.' },
  { name: 'Hero Genuine Parts', url: 'https://www.heromotocorp.com/en-in/services/hero-genuine-parts/test-of-genuineness.html',
    finding: 'Manufacturer-specific packaging and Unique Part Identity checks.',
    decision: 'Separate supplier-document review from actual part authenticity. Unique Part Identity is not payment UPI.' }
];
