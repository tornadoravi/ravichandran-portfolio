export const codPlatforms = [
  { id: 'amazon', name: 'Amazon', mark: 'A', placement: 'Customer Service → Unwanted deliveries', help: 'Customer Service',
    reason: 'A household report belongs outside Your Orders: the resident may not own the buying account or have an order ID.' },
  { id: 'flipkart', name: 'Flipkart', mark: 'F', placement: 'Account → Help Centre → Unwanted deliveries', help: 'Help Centre',
    reason: 'Offer a household-support topic before order selection, rather than forcing a resident to choose a purchase they never made.' },
  { id: 'instamart', name: 'Swiggy Instamart', mark: 'SI', placement: 'Profile → Help & Support → Unwanted deliveries', help: 'Help & Support',
    reason: 'Separate repeated household disruption from help for a single grocery order. Keep a proposed doorstep-support shortcut to the same case.' },
  { id: 'blinkit', name: 'Blinkit', mark: 'B', placement: 'Profile → Help → Unwanted deliveries', help: 'Help',
    reason: 'Provide a household-report route, not only an order complaint. A recipient-facing support shortcut should reuse the same incident.' }
];

export const codSyncStates = {
  unconnected: ['Not connected', 'Partner approval and COD eligibility are unverified.'],
  pending: ['Waiting for confirmation', 'COD protection is not active yet in this app. Demo only.'],
  confirmed: ['Protection confirmed · Demo', 'This app only; exact unit and COD orders only.'],
  failed: ['Confirmation failed · Demo', 'Protection is not active in this app. Retry or contact support.'],
  'removal-pending': ['Demo removal pending', 'Do not promise COD has resumed on this platform.'],
  'removal-failed': ['Demo removal failed', 'The example restriction remains unresolved. Escalate to support.'],
  removed: ['Demo removal confirmed', 'Fictional removal acknowledgement; no real settings changed.']
};

export const codExpiryStates = {
  'removal-pending': ['Demo expiry confirmation pending', 'The agreed period elapsed; this platform has not confirmed expiry.'],
  'removal-failed': ['Demo expiry confirmation failed', 'Expiry is unresolved in this example. Retry or escalate; do not silently extend protection.'],
  removed: ['Demo expiry confirmed', 'Fictional automatic-expiry acknowledgement; no real settings changed.']
};

export function createCodSync(status = 'unconnected', platforms = codPlatforms) {
  if (!codSyncStates[status]) throw new Error(`Unknown COD sync status: ${status}`);
  return Object.fromEntries(platforms.map(platform => [platform.id, status]));
}

export const codPartnerStages = [
  ['entry', 'Find the feature', 'Help for a home, not just an order.'],
  ['report', 'Report once', 'Orders I never placed'],
  ['review', 'Review the household', 'Contact is not proof of residence.'],
  ['consent', 'Choose the scope', 'Review before requesting protection.'],
  ['sync', 'Track acknowledgement', 'Requested. Not protected yet.']
];
