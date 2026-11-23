export const codFilmSources = [
  {
    name: 'The Indian Express',
    date: '14 October 2026',
    summary: 'Veeramani described unwanted appliance deliveries and repeated appeals to stop orders placed in his name.',
    url: 'https://indianexpress.com/article/trending/trending-in-india/madurai-influencer-fake-cod-orders-veeramani-10920954/'
  },
  {
    name: 'India Today',
    date: '13 October 2026',
    summary: 'Coverage connected the unwanted COD orders to his Diwali request and described the burden on him and delivery workers.',
    url: 'https://www.indiatoday.in/trending-news/story/madurai-mans-diwali-wish-goes-wrong-tvs-fridges-and-lakhs-in-cod-orders-pour-in-3016108-2026-10-13'
  }
];

export const codFilmScenes = [
  {
    id: 'veeramani', label: 'Veeramani', heading: 'He hoped for sweets. Not unwanted orders.',
    kind: 'incident', beats: ['A Diwali request', 'Madurai / reported context', 'An address is not consent'],
    narration: 'Veeramani, a creator in Madurai, reportedly shared his details hoping for Diwali sweets. This illustrated story is based on news coverage, not footage of him.'
  },
  {
    id: 'coverage', label: 'News reports', heading: 'The story made the news.',
    kind: 'incident', beats: ['Two published accounts', 'Unwanted appliances reported', 'Reporting, not audited records'],
    narration: 'The Indian Express and India Today reported unwanted cash-on-delivery orders in his name. He said he faced repeated visits for items he never ordered. These are reported claims, not audited order data.'
  },
  {
    id: 'burden', label: 'The burden', heading: 'The doorstep became a repeating task.',
    kind: 'incident', beats: ['Another call', 'Another parcel', 'Another explanation'],
    narration: 'At the doorstep, the problem became a loop: another call, another parcel, another explanation. Delivery partners also travelled for unwanted orders. Refusal leaves both sides doing repeated work.'
  },
  {
    id: 'opportunity', label: 'The question', heading: 'What if the response started earlier?',
    kind: 'concept', beats: ['Packing', 'Travel', 'Doorstep refusal comes too late'],
    narration: 'That led to the design question: could one managed incident move the response before dispatch? COD Shield is a proposal, not an existing service or a tested solution.'
  },
  {
    id: 'placement', label: 'Find the feature', heading: 'Start in Help. Not at checkout.',
    kind: 'concept', beats: ['Outside an individual order', 'Four app-inspired placements', 'No account or order ID required'],
    narration: 'Find COD Shield in Customer Service or Help, outside an order. These are separate feature concepts for Amazon, Flipkart, Swiggy Instamart and Blinkit. Each app handles its own case and COD orders, not competitors. None is an approved feature.'
  },
  {
    id: 'report', label: 'Report once', heading: 'One incident. One place to ask for help.',
    kind: 'concept', beats: ['Exact home and unit', 'No order ID required', 'One managed incident'],
    narration: 'First, report the repeated deliveries for the exact home and unit. The proposed route does not require an order ID. One case gives the resident a place to describe the pattern, rather than approve or refuse each order.'
  },
  {
    id: 'verify', label: 'Verify the unit', heading: 'Verify the household. Not just a phone.',
    kind: 'concept', beats: ['Verify contact', 'Review connection to the unit', 'Do not show premature protection'],
    narration: "Next, an authorised support review would verify the resident's connection to the exact unit. A phone code alone is not proof of residence. Protection must remain inactive until the review and enforcement acknowledgement clear."
  },
  {
    id: 'protect', label: 'Choose the scope', heading: 'Explain the impact before consent.',
    kind: 'concept', beats: ['Genuine COD orders are affected', 'Temporary scope and a clear exit', 'Consent before the example state'],
    narration: 'Review temporary COD protection in the selected app only. Genuine household COD orders in that app are affected. Choose a duration and consent before requesting protection. Other apps need separate reports. This preview changes no delivery settings.'
  },
  {
    id: 'sync', label: 'Confirm this app', heading: 'Wait for this app to confirm.',
    kind: 'concept', beats: ['This app’s COD orders only', 'Waiting or failed means not active', 'Expiry and removal need confirmation'],
    narration: 'Wait for the selected app to confirm its own COD restriction. Waiting or failed confirmation means protection is not active. Expiry and early removal need confirmation too. No competitor is controlled here and no real platform is connected.'
  },
  {
    id: 'scope', label: 'Business case', heading: 'Help the household. Reduce avoidable work.',
    disclosure: 'Business case / intended benefits',
    kind: 'concept', beats: ['Fewer household interruptions', 'Less wasted delivery effort', 'One managed support incident'],
    narration: 'COD Shield is designed to help targeted households report once, reduce wasted delivery trips, and give support teams one managed case. The business case is less avoidable fulfilment work and stronger trust. These are intended benefits, not measured results.'
  }
];

export const codFilmSections = [
  { label: 'Veeramani', start: 0, end: 0 },
  { label: 'News reports', start: 1, end: 1 },
  { label: 'The burden', start: 2, end: 2 },
  { label: 'The question', start: 3, end: 3 },
  { label: 'Solution', start: 4, end: 8 },
  { label: 'Business case', start: 9, end: 9 }
];

export const codFilmSolutionSteps = codFilmScenes.slice(4, 9).map(scene => ({ title: scene.label }));
