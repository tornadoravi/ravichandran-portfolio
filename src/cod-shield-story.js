export const codFacts = [
  ['Refusing a parcel happens too late.', 'Unwanted orders create repeated calls and doorstep visits after packing and travel have already happened.'],
  ['One managed incident per app.', 'Report once to the affected app, verify the exact unit, and confirm that app’s own restriction.'],
  ['Unlaunched concept.', 'Service-flow and interface exploration only. No working identity verification, user testing, launch, or measured outcomes.']
];

export const codNarrative = {
  purpose: 'A proposed support service for repeated unwanted cash-on-delivery orders.',
  role: 'Independent concept: service flow, recipient interface, and safeguards.',
  audience: 'residents, delivery partners, and support teams',
  goal: 'Reduce repeated recipient work with one case per app. Each app controls only its own eligible COD orders, not competitors’ restrictions.',
  steps: [
    ['Report once', 'Manage the incident instead of asking for approval on every order.'],
    ['Verify the unit', 'A phone OTP alone does not establish residence or consent.'],
    ['Protect temporarily', 'Confirm this app’s restriction; explain genuine-order impact, expiry, removal and appeal.']
  ]
};

export const codScreens = [
  ['home', 'Home', 'One household, one support case', 'Introduce the report and the household status without promising protection.'],
  ['report', 'Report', 'Orders I never placed', 'Start a report without a shopping account or order ID.'],
  ['verify', 'Contact & unit', 'Contact is not residence verification', 'An agreed phone check cannot replace authorised review of connection to the exact unit.'],
  ['pending', 'Review pending', 'Verification is a separate step', 'Protection remains inactive until an authorised review clears.'],
  ['activate', 'Verified example', 'Explain the household impact', 'Choose a duration and acknowledge genuine-order restrictions before activation.'],
  ['platforms', 'Platform status', 'Amazon orders. Amazon protection.', 'The gallery uses an Amazon feature concept. Other app versions require separate cases; Amazon does not manage competitor restrictions.'],
  ['activating', 'Activation pending', 'A request is not an active restriction', 'Wait for enforcement acknowledgement; surface failure rather than showing protection as successful.'],
  ['active', 'Active example', 'Amazon COD protection only', 'Amazon confirms its own restriction in this example. Other apps remain unaffected; earlier parcel interception is not guaranteed.'],
  ['removing', 'Removal pending', 'Keep removal and acknowledgement separate', 'Verified removal is requested. Normal COD must not be promised until enforcement acknowledges it.'],
  ['ended', 'Ended', 'Provide a clear exit', 'Removal would take effect only after enforcement acknowledgement.'],
  ['help', 'Support & appeal', 'Keep a challenge route accessible', 'Wrong-unit restrictions, household disputes and buyer appeals require accountable review.']
].map(([id, label, heading, takeaway]) => ({
  id, label, heading, takeaway, src: `/assets/cod-shield-${id}.svg`, width: 390, height: 844,
  alt: `Amazon COD Shield ${label.toLowerCase()} concept interface. Fictional example data; no working safety service.`,
  caption: `Amazon-only feature concept / ${label}. Not a shipped product, real verification, or activated protection.`
}));
