export const demoToday = '2026-11-22';
export const demoBikes = [
  { id: 'shine', name: 'Honda Shine', manufacturer: 'Honda', model: 'Shine', year: 2019, variant: 'Drum / demo', category: 'Motorcycle', powertrain: 'Petrol', odometer: 13500 },
  { id: 'fz', name: 'Yamaha FZ', manufacturer: 'Yamaha', model: 'FZ', year: 2018, variant: 'Standard / demo', category: 'Motorcycle', powertrain: 'Petrol', odometer: 8200 },
  { id: 'splendor', name: 'Hero Splendor', manufacturer: 'Hero', model: 'Splendor', year: 2021, variant: 'Standard / demo', category: 'Motorcycle', powertrain: 'Petrol', odometer: 6400 },
  { id: 'ather', name: 'Ather 450X', manufacturer: 'Ather', model: '450X', year: 2024, variant: 'Variant unconfirmed / demo', category: 'Scooter', powertrain: 'Electric', battery: '', connector: '', odometer: 1800 }
];
export const exampleService = {
  id: 'example-service', bikeId: 'shine', revision: 1,
  date: '2026-11-01', odometer: 12800, workshop: 'Neighbourhood workshop (demo)',
  work: 'Engine oil replaced; chain cleaned and adjusted.',
  nextDate: '2026-12-01', nextOdometer: 14500,
  mechanicConfirmed: true, riderConfirmed: true
};
export const examplePending = {
  ...exampleService, id: 'example-pending', date: demoToday, odometer: 13500,
  nextDate: '2026-12-22', nextOdometer: 15500, riderConfirmed: false
};

export function blankService() {
  return { date: demoToday, odometer: '', workshop: '', work: '', nextDate: '', nextOdometer: '' };
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function validateService(draft, records, today = demoToday) {
  const latest = confirmedServices(records).at(-1);
  if (!validDate(draft.date) || draft.date > today) return 'Enter a valid service date, no later than the demo date.';
  if (latest && draft.date < latest.date) return 'This demo adds the latest service: choose a date on or after the last confirmed record.';
  const odometer = Number(draft.odometer);
  if (!String(draft.odometer).trim() || !Number.isSafeInteger(odometer) || odometer < 0 ||
    (latest && odometer < latest.odometer)) return 'Enter a whole-number odometer reading at least as high as the last confirmed service.';
  if (!draft.workshop.trim() || !draft.work.trim()) return 'Add the workshop and the work or parts recorded.';
  if (draft.nextDate && (!validDate(draft.nextDate) || draft.nextDate <= draft.date)) return 'The next-service date must be after this service.';
  if (String(draft.nextOdometer).trim() &&
    (!Number.isSafeInteger(Number(draft.nextOdometer)) || Number(draft.nextOdometer) <= odometer)) {
    return 'The next-service odometer must be higher than this service reading.';
  }
  return '';
}

export function confirmedServices(records) {
  return records.filter(record => record.mechanicConfirmed && record.riderConfirmed)
    .toSorted((a, b) => a.date.localeCompare(b.date) || a.odometer - b.odometer);
}

export function serviceReminder(records, odometer, today = demoToday) {
  const latest = confirmedServices(records).at(-1);
  if (!latest || (!latest.nextDate && latest.nextOdometer == null)) return { status: 'Guidance needed', latest };
  const dateDue = Boolean(latest.nextDate && today >= latest.nextDate);
  const distanceDue = latest.nextOdometer != null && odometer >= latest.nextOdometer;
  return { status: dateDue || distanceDue ? 'Service due' : 'Upcoming service', latest, dateDue, distanceDue };
}

export const bikecareRoles = [
  { id: 'rider', label: 'Rider', identity: 'rider@example.test' },
  { id: 'advisor', label: 'Service advisor', identity: 'advisor@workshop.example.test' },
  { id: 'mechanic', label: 'Mechanic', identity: 'mechanic@workshop.example.test' },
  { id: 'billing', label: 'Billing staff', identity: 'billing@workshop.example.test' },
  { id: 'support', label: 'Support agent', identity: 'help@bikecare.example.test' }
];

export function createDemoJob(vehicle) {
  const bike = typeof vehicle === 'string' ? demoBikes.find(item => item.id === vehicle) : vehicle;
  if (!bike?.id) throw new Error('A known vehicle or a complete local vehicle profile is required.');
  const bikeId = bike.id;
  const electric = bike.powertrain === 'Electric';
  const oilService = bike.powertrain === 'Petrol' && ['shine', 'fz', 'splendor'].includes(bike.id);
  return {
    id: `BC-${bikeId.toUpperCase()}-014`, bikeId, revision: 1, status: 'draft',
    customer: 'Demo rider', registration: bike.registration || 'DEMO VEHICLE', date: demoToday, odometer: String(bike.odometer),
    workshop: 'Neighbourhood Motors / Demo', complaint: electric ? 'Tyre/brake inspection; charging concern for EV specialist review.' : oilService ? 'Periodic service and chain noise.' : 'Vehicle-specific care guidance and tyre/brake inspection requested.',
    intake: electric ? 'Charge level and visible condition recorded. Battery work requires a qualified EV workshop.' : oilService ? 'Fuel: half tank. Existing scratches recorded. Keys received.' : 'Powertrain, condition and items received need workshop confirmation.',
    work: electric ? 'Visual tyre and brake inspection recorded. Charging concern referred to an EV specialist; no battery repair performed.' : oilService ? 'Engine oil replaced; chain cleaned and adjusted.' : 'Visual tyre and brake inspection recorded. Model-specific work and parts need workshop guidance.', nextDate: '', nextOdometer: '',
    parts: oilService ? [{ id: 'oil', name: 'Engine oil / demo OEM', partNumber: 'DEMO-OIL-01', quantity: 1, price: 450 }] : [],
    labour: 300, labourLabel: oilService ? 'Oil replacement + chain service / 1 job' : 'Tyre/brake inspection / 1 job', taxRate: 18, billRevision: 0, billIssued: false, received: 0, receipts: [],
    mechanicConfirmed: false, riderConfirmed: false, audit: []
  };
}

export function invoiceTotals(job) {
  const parts = job.parts.reduce((sum, part) => sum + part.quantity * part.price, 0);
  const subtotal = parts + job.labour;
  const tax = Math.round(subtotal * job.taxRate) / 100;
  return { parts, labour: job.labour, subtotal, tax, total: subtotal + tax };
}

export function invoicePayment(job) {
  const total = Math.round(invoiceTotals(job).total * 100);
  const received = Math.round(job.received * 100);
  return { status: received >= total ? 'paid' : received > 0 ? 'partial' : 'unpaid',
    received: received / 100, due: Math.max(0, total - received) / 100 };
}

export const demoProducts = [
  { id: 'filter', name: 'OEM oil filter / demo', kind: 'filter', bikeId: 'shine', partNumber: 'DEMO-FILTER-01',
    seller: 'Local workshop', price: 180, stock: 4, reviewed: true },
  { id: 'helmet', name: 'Full-face riding helmet / demo', kind: 'helmet', bikeId: null, partNumber: 'DEMO-GEAR-02',
    seller: 'Parts dealer', price: 2400, stock: 3, reviewed: true },
  { id: 'chain', name: 'Chain kit / pending listing', kind: 'chain', bikeId: 'shine', partNumber: 'DEMO-CHAIN-03',
    seller: 'Parts dealer', price: 850, stock: 2, reviewed: false }
];

export const demoRides = [
  { id: 'public', type: 'Rider-created', name: 'Sunday motorcycle loop', area: 'Outer-city meetup / Demo', date: '2026-11-29',
    organiser: 'Demo rider group', distance: '80 km / illustrative', seats: 8, rule: 'Motorcycles only; organiser approves each request.' },
  { id: 'club', type: 'Brand / club', name: 'Weekend owners club ride', area: 'Club meetup area / Demo', date: '2026-12-06',
    organiser: 'Demo motorcycle club', distance: '120 km / illustrative', seats: 12, rule: 'Motorcycles only; club eligibility is reviewed. No manufacturer affiliation.' },
  { id: 'company', type: 'Company group', name: 'Colleagues on two wheels', area: 'Workplace meetup area / Demo', date: '2026-12-13',
    organiser: 'Demo employee group', distance: '60 km / illustrative', seats: 6, rule: 'Motorcycles only; employee/group membership must be approved.' }
];

export function validateRide(draft, today = demoToday) {
  if (!draft.name.trim() || !draft.area.trim()) return 'Add a ride title and an approximate meetup area.';
  if (!validDate(draft.date) || draft.date <= today) return 'Choose a valid ride date after the demo date.';
  const capacity = Number(draft.seats);
  if (!Number.isSafeInteger(capacity) || capacity < 2 || capacity > 30) return 'Use a group size from 2 to 30 for this demo.';
  if (!['Rider-created', 'Brand / club', 'Company group'].includes(draft.type)) return 'Choose a motorcycle ride category.';
  return '';
}
