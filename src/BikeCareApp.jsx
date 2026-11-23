import React, { useEffect, useId, useRef, useState } from 'react';
import {
  bikecareRoles, confirmedServices, createDemoJob, demoBikes, demoProducts, demoRides, demoToday,
  exampleService, invoicePayment, invoiceTotals, serviceReminder, validateRide, validateService
} from './bikecare-model.js';
import { BikeCareAccess, BikeCareGarage } from './BikeCareAccessGarage.jsx';
import { BikeCareNotifications, BikeCareSupport, BikeCareSystem } from './BikeCareCareSupport.jsx';
import { initialTicket } from './bikecare-ux-model.js';
import { BikeCareLogo, BikeCareVehiclePhoto } from './BikeCareBrand.jsx';
import BikeCareServiceFeedback from './BikeCareServiceFeedback.jsx';
import BikeCareDocuments from './BikeCareDocuments.jsx';
import { documentKey, sampleDocument } from './bikecare-documents.js';

const dateText = value => new Date(`${value}T00:00:00Z`).toLocaleDateString('en-IN', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'
});
const money = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
const statuses = {
  draft: 'Intake draft', approval: 'Rider approval needed', approved: 'Approved for work',
  completed: 'Work confirmed / Billing next', invoiced: 'Invoice issued / Rider review',
  confirmed: 'Confirmed by both', correction: 'Correction requested / Invoice held'
};
const titles = {
  landing: 'Good care. A longer story.', documents: 'Your documents. Your space.', 'service-feedback': 'How did the service feel?', 'feedback-thanks': 'Your voice stays in the record.',
  login: 'Your bike. Your workspace.', home: 'Your bike. Your care.', jobs: 'Your workshop queue.',
  jobcard: 'Workshop intake.', service: 'Your service, step by step.', estimate: 'Approve the estimate.',
  record: 'Confirm completed work.', bill: 'Your itemised bill.', review: 'Check the work and bill.',
  receipt: 'Service recorded. Care continues.', payment: 'Record a payment receipt.', history: 'Your service history.', share: 'Care for the next owner.',
  shop: 'The right part for your bike.', product: 'Fit and provenance.', supplier: 'What has been checked?',
  cart: 'Review your purchase.', order: 'Your demo order.', rides: 'Ride with your community.',
  ride: 'Before you join.', request: 'Your ride request.',
  organise: 'Create a motorcycle ride.', manage: 'Keep the group informed.',
  garage: 'Your vehicles, clearly identified.', profile: 'Know the vehicle, not just its name.', notifications: 'Care cues you control.', more: 'Care, help and preferences.',
  help: 'Help with the next step.', settings: 'Signal. Your theme.'
};

function initialJob(sourceScene, vehicle) {
  const scene = ['service-feedback', 'feedback-thanks'].includes(sourceScene) ? 'receipt' : sourceScene === 'ev-work' ? 'record' : sourceScene === 'ev-bill' ? 'bill' : sourceScene;
  const job = createDemoJob(vehicle);
  if (['record', 'estimate', 'bill', 'review', 'receipt', 'payment'].includes(scene)) {
    job.status = scene === 'estimate' ? 'approval' : scene === 'record' ? 'approved' : 'invoiced';
    job.nextDate = '2026-12-22'; job.nextOdometer = '15500';
  }
  if (['bill', 'review', 'receipt', 'payment'].includes(scene)) {
    job.mechanicConfirmed = true; job.billIssued = true; job.billRevision = 1;
  }
  if (scene === 'receipt') { job.status = 'confirmed'; job.riderConfirmed = true; job.received = invoiceTotals(job).total; }
  if (scene === 'payment') job.received = 200;
  return job;
}

function PartGraphic({ kind }) {
  return <svg className="bikecare-part-art" viewBox="0 0 160 100" aria-hidden="true">
    <ellipse cx="80" cy="88" rx="47" ry="6" fill="var(--bc-soft)" />
    {kind === 'helmet' ? <g stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
      <path d="M37 68c0-34 19-55 46-55 31 0 46 22 43 53l-17 14H53Z" fill="var(--bc-warning-soft)" />
      <path d="m75 34 47 5-3 24H70Z" fill="currentColor" /><path d="m75 66 34 4-5 10H57" fill="none" />
    </g> : <g stroke="currentColor" strokeWidth="3">
      <path d="M53 28h54v49c-6 13-47 13-54 0Z" fill="var(--bc-warning-soft)" />
      <ellipse cx="80" cy="28" rx="27" ry="10" fill="var(--bc-soft)" />
      <ellipse cx="80" cy="28" rx="9" ry="4" fill="currentColor" />
      <path d="M62 43h36M62 53h36M62 63h36" />
    </g>}
  </svg>;
}

function JobIdentity({ job, bike, editable = false }) {
  return <div className="bikecare-job-identity"><div className="bikecare-job-title"><strong>{job.id}</strong>
    <span className="bikecare-status" data-tone={job.status === 'confirmed' ? 'success' : job.status === 'correction' ? 'error' : job.status === 'approval' ? 'warning' : 'info'}>{statuses[job.status]} / v{job.revision}</span></div>
    <p className="bikecare-small">{bike.name} / {job.registration} / {job.customer}</p>
    {!editable && <p className="bikecare-small">{dateText(job.date)} / {Number(job.odometer).toLocaleString('en-IN')} km</p>}
  </div>;
}

function BillLines({ job }) {
  const total = invoiceTotals(job);
  return <div className="bikecare-bill-lines">
    {job.parts.map(part => <div key={part.id}><span><strong>{part.name}</strong><small>{part.partNumber} / {part.quantity} x {money(part.price)}</small></span>
      <b>{money(part.quantity * part.price)}</b></div>)}
    <div><span>Service labour<small>{job.labourLabel || 'Oil replacement + chain service / 1 job'}</small></span><b>{money(job.labour)}</b></div>
    <div><span>Subtotal</span><b>{money(total.subtotal)}</b></div>
    <div><span>Illustrative tax ({job.taxRate}%)</span><b>{money(total.tax)}</b></div>
    <div className="bikecare-bill-total"><strong>Total</strong><b>{money(total.total)}</b></div>
  </div>;
}

function RecordDetails({ record }) {
  return <dl className="bikecare-record-details">
    <div><dt>Service date</dt><dd>{dateText(record.date)}</dd></div>
    <div><dt>Odometer</dt><dd>{Number(record.odometer).toLocaleString('en-IN')} km</dd></div>
    <div><dt>Workshop</dt><dd>{record.workshop}</dd></div>
    <div><dt>Work & parts</dt><dd>{record.work}</dd></div>
    <div><dt>Next service</dt><dd>{record.nextDate ? dateText(record.nextDate) : 'Date not supplied'} / {record.nextOdometer ? `${record.nextOdometer} km` : 'Distance not supplied'}</dd></div>
  </dl>;
}

export default function BikeCareApp({ scene }) {
  const workId = useId();
  const body = useRef(null);
  const entryHeading = useRef(null);
  const previousView = useRef(null);
  const initialVehicleId = ['ev-home', 'ev-job', 'ev-work', 'ev-bill'].includes(scene) ? 'ather' : 'shine';
  const accessScene = ['rider-login', 'staff-login', 'otp', 'otp-expired', 'recover', 'signup'].includes(scene);
  const garageScene = ['garage', 'vehicle-brand', 'manufacturer-options', 'model-options', 'vehicle-year', 'vehicle-details', 'ev-profile'].includes(scene);
  const supportScene = ['help', 'complaint', 'product-issue', 'feedback', 'ticket', 'support-review', 'support-resolved'].includes(scene);
  const documentScene = ['documents', 'document-add', 'document-detail', 'document-expiry', 'document-delete'].includes(scene);
  const [documents, setDocuments] = useState(documentScene && scene !== 'document-add' ? {
    [documentKey('Insurance', 'shine')]: sampleDocument('Insurance', 'shine', scene === 'document-expiry' ? '2026-11-01' : '2026-12-10')
  } : {});
  const [vehicles, setVehicles] = useState(scene === 'garage' ? demoBikes.filter(vehicle => ['shine', 'ather'].includes(vehicle.id)) : demoBikes);
  const [theme, setTheme] = useState(scene === 'theme-dark' ? 'dark' : 'light');
  const [today, setToday] = useState(['notifications', 'reminder'].includes(scene) ? '2026-12-01' : demoToday);
  const [preferences, setPreferences] = useState({ inApp: true, push: false });
  const [permission, setPermission] = useState('Not asked');
  const [snooze, setSnooze] = useState('');
  const [tickets, setTickets] = useState(supportScene ? [{ ...initialTicket, status: scene === 'support-resolved' ? 'Closed' : initialTicket.status,
    outcome: scene === 'support-resolved' ? 'Workshop reinspection proposed' : '',
    timeline: scene === 'support-resolved' ? [...initialTicket.timeline, 'Support proposed reinspection / Rider accepted the response'] : initialTicket.timeline }] : []);
  const [ticketId, setTicketId] = useState('BC-HELP-001');
  const [bikeId, setBikeId] = useState(initialVehicleId);
  const [role, setRole] = useState(scene === 'support-review' ? 'support' : ['record', 'ev-work'].includes(scene) ? 'mechanic' : ['bill', 'payment', 'ev-bill'].includes(scene) ? 'billing'
    : ['jobcard', 'jobs', 'staff-login', 'recover', 'ev-job'].includes(scene) ? 'advisor' : 'rider');
  const [signedIn, setSignedIn] = useState(Boolean(scene && !accessScene && !['splash', 'landing'].includes(scene)));
  const [view, setView] = useState(!scene ? 'splash' : accessScene ? 'login' : garageScene ? 'garage' : documentScene ? 'documents' : supportScene ? 'help' : ['system', 'theme-dark'].includes(scene) ? 'settings'
    : scene === 'ev-job' ? 'jobcard' : scene === 'ev-work' ? 'record' : scene === 'ev-bill' ? 'bill' : scene === 'reminder' ? 'notifications' : scene === 'ev-home' ? 'home' : scene);
  const [jobs, setJobs] = useState(Object.fromEntries(demoBikes.map(vehicle => [vehicle.id, vehicle.id === initialVehicleId ? initialJob(scene, vehicle) : createDemoJob(vehicle)])));
  const [feedback, setFeedback] = useState(scene === 'feedback-thanks' ? { 'shine:BC-SHINE-014:v1': { rating: 5, comment: 'Clear estimate and useful care guidance.', followUp: false } } : {});
  const [supportEntry, setSupportEntry] = useState('');
  const [records, setRecords] = useState(Object.fromEntries(demoBikes.map(vehicle => [vehicle.id, vehicle.id === 'shine' ? [exampleService] : []])));
  const [readings, setReadings] = useState(Object.fromEntries(demoBikes.map(bike => [bike.id, bike.odometer])));
  const [readingInput, setReadingInput] = useState(String(demoBikes.find(vehicle => vehicle.id === initialVehicleId).odometer));
  const [acknowledged, setAcknowledged] = useState(false);
  const [workChecked, setWorkChecked] = useState(scene === 'record');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [paymentInput, setPaymentInput] = useState('300');
  const [paymentMethod, setPaymentMethod] = useState('Cash / Demo');
  const [notificationPreview, setNotificationPreview] = useState(scene === 'reminder');
  const [sharePreview, setSharePreview] = useState(scene === 'share');
  const [productId, setProductId] = useState('filter');
  const [sellerFilter, setSellerFilter] = useState('All sellers');
  const [cart, setCart] = useState(scene === 'cart' ? [{ id: 'filter', quantity: 1 }] : []);
  const [order, setOrder] = useState(scene === 'order' ? { items: [{ id: 'filter', quantity: 1 }], total: 180, payment: 'unpaid' } : null);
  const [rides, setRides] = useState(demoRides);
  const [rideId, setRideId] = useState('public');
  const [rideFilter, setRideFilter] = useState('All rides');
  const [requests, setRequests] = useState(scene === 'request' || scene === 'manage' ? { public: 'requested' } : {});
  const [blocked, setBlocked] = useState([]);
  const [eligible, setEligible] = useState(false);
  const [rideDraft, setRideDraft] = useState({
    name: 'Sunday motorcycle meetup', area: 'Approximate public meetup area', date: '2026-12-20', type: 'Rider-created', seats: '8'
  });
  const bike = vehicles.find(item => item.id === bikeId);
  const actor = bikecareRoles.find(item => item.id === role);
  const job = jobs[bikeId];
  const feedbackKey = `${bikeId}:${job.id}:v${job.revision}`;
  const serviceFeedback = feedback[feedbackKey];
  const payment = invoicePayment(job);
  const currentBillIssued = job.billIssued && ['invoiced', 'confirmed'].includes(job.status);
  const history = confirmedServices(records[bikeId]);
  const reminder = serviceReminder(history, readings[bikeId], today);
  const product = demoProducts.find(item => item.id === productId);
  const ride = rides.find(item => item.id === rideId);
  const request = requests[rideId];
  const canBuy = product.reviewed && (!product.bikeId || product.bikeId === bikeId);
  const cartTotal = cart.reduce((sum, item) => sum + demoProducts.find(part => part.id === item.id).price * item.quantity, 0);
  const navigation = [...(role === 'rider'
    ? [['home', 'Home'], ['service', 'Service'], ['history', 'History'], ['shop', 'Shop']]
    : role === 'support' ? [['help', 'Requests'], ['settings', 'Settings']]
    : [['jobs', 'Jobs'], ['jobcard', 'Job card'], ['record', 'Work'], ['bill', 'Bill']]), ['more', 'More']];
  const activeTab = role === 'rider' && ['jobcard', 'estimate', 'record', 'bill', 'review', 'receipt', 'payment', 'service-feedback', 'feedback-thanks'].includes(view) ? 'service'
    : role === 'rider' && ['product', 'supplier', 'cart', 'order'].includes(view) ? 'shop'
    : navigation.some(([id]) => id === view) ? view : 'more';

  useEffect(() => {
    if (body.current) body.current.scrollTop = 0;
    if (previousView.current !== null && previousView.current !== view) entryHeading.current?.focus({ preventScroll: true });
    previousView.current = view;
  }, [view, role, bikeId]);

  function navigate(next) { setView(next); setError(''); setMessage(''); setAcknowledged(false); }
  function changeRole(next) { setRole(next); setSignedIn(false); navigate('login'); setWorkChecked(false); }
  function enterWorkspace() { setSignedIn(true); navigate(role === 'support' ? 'help' : role === 'rider' ? 'home' : 'jobs'); }
  function selectVehicle(id) {
    setBikeId(id); setReadingInput(String(readings[id])); setWorkChecked(false);
    setSharePreview(false); setNotificationPreview(false); navigate(role === 'rider' ? 'home' : 'jobs');
  }
  function addVehicle(vehicle) {
    setVehicles(previous => [...previous, vehicle]);
    setJobs(previous => ({ ...previous, [vehicle.id]: createDemoJob(vehicle) }));
    setRecords(previous => ({ ...previous, [vehicle.id]: [] }));
    setReadings(previous => ({ ...previous, [vehicle.id]: vehicle.odometer }));
    setBikeId(vehicle.id); setReadingInput(String(vehicle.odometer)); navigate('home');
    setMessage('Vehicle added to the local demo. Model-year, variant and fit remain unverified; history starts empty.');
  }
  function patchJob(patch) { setJobs(previous => ({ ...previous, [bikeId]: { ...previous[bikeId], ...patch } })); setError(''); }
  function requireRole(expected) {
    if (role === expected) return true;
    setError(`This action belongs to ${bikecareRoles.find(item => item.id === expected).label}. Switch the demo workspace first.`);
    return false;
  }
  function sendEstimate(event) {
    event.preventDefault();
    if (!requireRole('advisor')) return;
    const invalid = validateService({ ...job, work: job.complaint }, history, today);
    if (invalid) { setError(invalid); return; }
    if (!job.intake.trim()) { setError('Record fuel, condition and items received before sending the estimate.'); return; }
    patchJob({ status: 'approval', mechanicConfirmed: false, riderConfirmed: false });
    navigate('estimate'); setMessage('Estimate ready for the demo rider. No message was sent.');
  }
  function approveEstimate() {
    if (!requireRole('rider') || job.status !== 'approval' || !acknowledged) return;
    patchJob({ status: 'approved', approvedRevision: job.revision }); navigate('service');
    setMessage(`Estimate v${job.revision} approved in this demo. Mechanic work is now available.`);
  }
  function completeWork(event) {
    event.preventDefault();
    if (!requireRole('mechanic')) return;
    if (job.status !== 'approved') { setError('Get rider approval for the current estimate before confirming work.'); return; }
    const invalid = validateService(job, history, today);
    if (invalid) { setError(invalid); return; }
    if (!workChecked) { setError('Confirm that the approved work and listed parts were recorded.'); return; }
    patchJob({ status: 'completed', mechanicConfirmed: true, riderConfirmed: false });
    navigate('service'); setMessage('Mechanic confirmed the work. Billing staff can now issue the demo invoice.');
  }
  function extraWork() {
    if (!requireRole('mechanic') || job.status !== 'approved') return;
    if (!job.parts.some(part => part.id === 'oil')) { setError('This vehicle has no approved oil-service scenario. Confirm vehicle-specific tasks and part fit with the workshop.'); return; }
    patchJob({
      status: 'approval', revision: job.revision + 1, mechanicConfirmed: false,
      parts: [...job.parts, { id: `filter-${job.revision}`, name: 'Oil filter / additional work', partNumber: 'DEMO-FILTER-01', quantity: 1, price: 180 }]
    });
    setWorkChecked(false); navigate('estimate');
    setMessage('Revised estimate needs fresh rider approval. Work confirmation is blocked until then.');
  }
  function issueBill() {
    if (!requireRole('billing') || job.status !== 'completed') return;
    patchJob({ status: 'invoiced', billIssued: true, billRevision: job.billRevision + 1 });
    setMessage('Demo invoice issued. Issuing a bill does not mean it has been paid.');
  }
  function confirmRider() {
    if (!requireRole('rider') || job.status !== 'invoiced' || !acknowledged) return;
    const record = { ...job, id: `${job.id}-v${job.revision}`, odometer: Number(job.odometer),
      nextOdometer: job.nextOdometer ? Number(job.nextOdometer) : null, riderConfirmed: true };
    setRecords(previous => ({ ...previous, [bikeId]: [...previous[bikeId], record] }));
    patchJob({ status: 'confirmed', riderConfirmed: true });
    setReadings(previous => ({ ...previous, [bikeId]: Math.max(previous[bikeId], Number(job.odometer)) }));
    setReadingInput(String(Math.max(readings[bikeId], Number(job.odometer))));
    navigate('service-feedback');
  }
  function correction() {
    if (!requireRole('rider') || job.status !== 'invoiced') return;
    patchJob({ status: 'correction', revision: job.revision + 1, mechanicConfirmed: false, riderConfirmed: false,
      audit: [...job.audit, { revision: job.revision, billRevision: job.billRevision, total: invoiceTotals(job).total, received: job.received }] });
    setAcknowledged(false); setMessage('Correction requested. Invoice is held and retained; this record stays out of confirmed history.');
  }
  function updateReading(event) {
    event.preventDefault();
    const value = Number(readingInput);
    if (!readingInput.trim() || !Number.isSafeInteger(value) || value < readings[bikeId]) {
      setError('Enter a whole-number reading no lower than the current demo odometer.'); return;
    }
    setReadings(previous => ({ ...previous, [bikeId]: value })); setError(''); setMessage('Demo odometer updated.');
  }
  function addToCart() {
    if (!requireRole('rider')) return;
    if (!canBuy) { setError('This listing needs supplier review or does not match the selected bike.'); return; }
    const current = cart.find(item => item.id === product.id)?.quantity || 0;
    if (current >= product.stock) { setError('You have reached the available demo stock.'); return; }
    setCart(previous => current ? previous.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...previous, { id: product.id, quantity: 1 }]);
    navigate('cart');
  }
  function checkout() {
    if (!requireRole('rider')) return;
    if (!cart.length) return;
    const mismatch = cart.some(item => {
      const part = demoProducts.find(candidate => candidate.id === item.id);
      return !part.reviewed || (part.bikeId && part.bikeId !== bikeId) || item.quantity > part.stock;
    });
    if (mismatch) { setError('Review cart compatibility and available stock for this bike before continuing.'); return; }
    setOrder({ items: cart.map(item => ({ ...item })), total: cartTotal, payment: 'unpaid' });
    setCart([]); navigate('order');
  }
  function requestRide() {
    if (!requireRole('rider')) return;
    if (bike.category !== 'Motorcycle') { setError('This ride permits motorcycles only. Scooters and mopeds need organiser-specific eligibility, not a checked box.'); return; }
    if (!eligible) { setError('Review the motorcycle and group requirements before requesting a place.'); return; }
    if (ride.cancelled || ride.date <= today || blocked.includes(ride.id)) { setError('This ride is cancelled, expired or unavailable.'); return; }
    setRequests(previous => ({ ...previous, [ride.id]: 'requested' })); navigate('request');
  }
  function createRide(event) {
    event.preventDefault();
    const invalid = validateRide(rideDraft, today);
    if (invalid) { setError(invalid); return; }
    const id = `created-${rides.length}`;
    setRides(previous => [...previous, { ...rideDraft, id, seats: Number(rideDraft.seats), organiser: 'You / Demo organiser',
      distance: 'Route to be agreed', rule: 'Motorcycles only; group eligibility and every join request need organiser approval.' }]);
    setRideId(id); navigate('manage'); setMessage('Motorcycle ride created locally. Nothing was published or sent.');
  }
  function chooseRide(item) { setRideId(item.id); setEligible(false); navigate('ride'); }
  function recordPayment(event) {
    event.preventDefault();
    if (!requireRole('billing')) return;
    if (!currentBillIssued) { setError('Issue the current invoice and resolve any hold before recording payment.'); return; }
    const amount = Number(paymentInput);
    if (!/^\d+(\.\d{1,2})?$/.test(paymentInput) || amount <= 0 || Math.round(amount * 100) > Math.round(payment.due * 100)) {
      setError('Enter a positive payment, with up to two decimals, no higher than the outstanding balance.'); return;
    }
    patchJob({ received: Math.round((job.received + amount) * 100) / 100,
      receipts: [...job.receipts, { amount, method: paymentMethod, invoiceRevision: job.billRevision }] });
    navigate('bill'); setMessage('Demo receipt recorded. No actual money was collected.');
  }
  function saveServiceFeedback(draft) {
    if (!requireRole('rider') || job.status !== 'confirmed') { setError('Feedback is available only after rider confirmation of this service record.'); return; }
    if (feedback[feedbackKey]) { setError('Feedback is already saved for this record.'); return; }
    let requestId = '';
    if (draft.followUp) {
      requestId = `BC-HELP-${String(tickets.length + 1).padStart(3, '0')}`;
      setTickets(previous => [...previous, { id: requestId, category: 'Service not satisfactory', subject: 'Follow-up after service feedback',
        description: draft.comment, context: `${job.id} / Record v${job.revision}`, status: 'Open', outcome: '',
        timeline: ['Rider requested follow-up after feedback / Nothing sent outside this demo'] }]);
    }
    setFeedback(previous => ({ ...previous, [feedbackKey]: { ...draft, requestId } })); navigate('feedback-thanks');
  }

  return <div className="bikecare-app" data-bikecare-app="" data-product-theme={theme}>
    <div className="bikecare-role-switch" role="group" aria-label="Simulate a BikeCare role"><span>Preview a separate workspace</span>
      {bikecareRoles.map(item => <button key={item.id} aria-pressed={role === item.id} onClick={() => changeRole(item.id)}>{item.label}</button>)}
    </div>
    <div className="bikecare-phone" data-intro={view === 'splash' ? 'true' : undefined}>
      {view !== 'splash' && <header className="bikecare-app-header">
        <div><button className="bikecare-brand-home" aria-label="BikeCare welcome" onClick={() => { setSignedIn(false); navigate('landing'); }}><BikeCareLogo /></button>
          <span className="bikecare-role-label">{actor.label} / Demo</span></div>
        {signedIn ? <button className="bikecare-vehicle-context" aria-label="Selected bike: open garage" onClick={() => navigate('garage')}>
          <strong>{view === 'garage' ? 'Garage / vehicle setup' : `${bike.manufacturer} / ${bike.model}`}</strong>
          <span>{view === 'garage' ? `Current vehicle: ${bike.name}` : `${bike.year || 'Year unknown'} / ${bike.variant || 'Variant unknown'} / ${bike.powertrain}`}</span>
        </button>
          : <p className="bikecare-small">Mobile UX/UI prototype / Not real authentication</p>}
      </header>}
      <div className="bikecare-app-body" ref={body} data-view={view}>
        {!['splash', 'landing'].includes(view) && <><p className="bikecare-app-eyebrow">{['rides', 'ride', 'request', 'organise', 'manage'].includes(view) ? 'MOTORCYCLE COMMUNITY' : role === 'rider' ? 'YOUR BIKE. CONNECTED CARE.' : 'LOCAL WORKSHOP / ROLE-BASED HANDOVER'}</p>
        <h3>{titles[view]}</h3></>}
        {error && <p className="bikecare-app-alert" role="alert">{error}</p>}
        {message && <p className="bikecare-app-message" role="status">{message}</p>}
        {view === 'splash' && <section className="bikecare-splash" aria-labelledby={`${workId}-intro`}>
          <div className="bikecare-splash-identity">
            <BikeCareLogo />
            <h3 id={`${workId}-intro`} ref={entryHeading} tabIndex={-1}>Every ride has a care story.</h3>
            <p>Keep yours together.</p>
          </div>
          <button className="bikecare-primary" onClick={() => navigate('landing')}>Continue to welcome</button>
          <p className="bikecare-small">Design preview. Continue when you are ready.</p>
        </section>}
        {view === 'landing' && <section className="bikecare-landing">
          <div className="bikecare-welcome-visual"><BikeCareVehiclePhoto key={bike.name} bike={bike} /></div>
          <h3 ref={entryHeading} tabIndex={-1}>{titles[view]}</h3>
          <p>From your neighbourhood mechanic to your next owner. Keep the care story together.</p>
          <p className="bikecare-landing-points">Approve. Record. Remember.</p>
          <button className="bikecare-primary" onClick={() => { setRole('rider'); navigate('login'); }}>Get started as a rider</button>
          <button onClick={() => changeRole('advisor')}>Open workshop sign-in</button>
          <p className="bikecare-small">Independent-workshop care for motorcycles, scooters, mopeds and EVs. Not an authorised brand service.</p>
          <button onClick={() => { setSignedIn(false); setRole('rider'); navigate('splash'); }}>Replay introduction</button>
        </section>}
        {view === 'login' && <>
          <div className="bikecare-inline-actions"><button aria-pressed={role === 'rider'} onClick={() => changeRole('rider')}>Rider sign-in</button>
            <button aria-pressed={role !== 'rider'} onClick={() => changeRole('advisor')}>Workshop sign-in</button></div>
            {role !== 'rider' && <label>Workshop role<select value={role} onChange={event => changeRole(event.target.value)}>
              {bikecareRoles.filter(item => item.id !== 'rider').map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>}
          <BikeCareAccess key={role} actor={actor} scene={scene} onEnter={enterWorkspace} onSupport={() => navigate('help')} />
          <details className="bikecare-invoice-details"><summary>Skip access for design review</summary>
            <button onClick={enterWorkspace}>Open demo workspace</button></details>
        </>}
        {view === 'garage' && <BikeCareGarage vehicles={vehicles.map(vehicle => ({ ...vehicle, odometer: readings[vehicle.id] }))} selectedId={bikeId} onSelect={selectVehicle} onAdd={addVehicle} scene={scene} />}
        {view === 'profile' && <article className="bikecare-app-card"><h4>{bike.name}</h4>
          <dl className="bikecare-record-details">
            <div><dt>Manufacturer / model</dt><dd>{bike.manufacturer} / {bike.model}</dd></div><div><dt>Year / variant</dt><dd>{bike.year || 'Unknown'} / {bike.variant || 'Unknown'}</dd></div>
            <div><dt>Vehicle / powertrain</dt><dd>{bike.category} / {bike.powertrain}</dd></div>
            <div><dt>Current odometer</dt><dd>{readings[bikeId].toLocaleString('en-IN')} km / Rider-entered</dd></div>
            {bike.powertrain === 'Electric' ? <><div><dt>Battery capacity</dt><dd>{bike.battery ? `${bike.battery} kWh / Unverified` : 'Unknown; not inferred'}</dd></div>
              <div><dt>Charging connector</dt><dd>{bike.connector || 'Unknown; manufacturer confirmation needed'}</dd></div></>
              : <div><dt>Engine capacity</dt><dd>{bike.engineCapacity ? `${bike.engineCapacity} cc / Unverified` : 'Unknown; not inferred'}</dd></div>}
          </dl>
          {role === 'rider' && <details className="bikecare-invoice-details"><summary>Vehicle numbers / Private details</summary>
            <dl className="bikecare-record-details"><div><dt>Registration number</dt><dd>{bike.registration || 'Not supplied / Unregistered allowed'}</dd></div><div><dt>Chassis / VIN</dt><dd>{bike.chassis || 'Not supplied / Not verified'}</dd></div></dl>
            <p className="bikecare-small">Fictional inputs only; no government lookup. Chassis and vault documents are not included in resale or public rides.</p>
          </details>}
          <p className="bikecare-small">{bike.verification || 'Fictional demo profile / Not vehicle verification'}. Vehicle identity never guarantees part fit, service intervals or complete history.</p>
          <button onClick={() => navigate('garage')}>Open vehicle garage</button>
          {role === 'rider' && <button onClick={() => navigate('documents')}>Open private document vault</button>}
        </article>}
        {view === 'documents' && (role === 'rider' && signedIn
          ? <BikeCareDocuments key={bikeId} bike={bike} documents={documents} setDocuments={setDocuments} today={today} setToday={setToday} scene={scene} />
          : <p className="bikecare-app-alert" role="alert">Documents belong to the signed-in rider. Workshop and support workspaces cannot open the vault.</p>)}
        {view === 'notifications' && <BikeCareNotifications reminder={reminder} today={today} setToday={setToday} preferences={preferences} setPreferences={setPreferences}
          permission={permission} setPermission={setPermission} snooze={snooze} setSnooze={setSnooze} onService={() => navigate('service')} />}
        {view === 'help' && <BikeCareSupport key={supportEntry} role={role} canRequest={role === 'rider' || !signedIn} guest={!signedIn} scene={supportEntry || scene} tickets={tickets} selectedId={ticketId} setSelectedId={setTicketId}
          contexts={signedIn ? { 'Service not satisfactory': job.id, 'Product issue': order ? 'BC-ORDER-014 / Demo pickup order' : `${product.partNumber} / Demo listing`,
            'Payment / bill issue': `${job.id} / ${currentBillIssued ? `Invoice revision ${job.billRevision}` : 'Draft bill'}`, 'Account / sign-in': 'Demo account help',
            'Ride / community issue': `${ride.id} / ${ride.name}`, Feedback: 'General product feedback' } : {}}
          onCreate={draft => {
            const id = `BC-HELP-${String(tickets.length + 1).padStart(3, '0')}`;
            setTickets(previous => [...previous, { ...draft, id, status: 'Open', outcome: '', timeline: ['Created in demo / No real request sent'] }]); setTicketId(id);
          }} onUpdate={(id, patch, note) => {
            if (role !== 'support' && role !== 'rider' && signedIn) { setError('Only the rider or support workspace owns this request action.'); return; }
            setTickets(previous => previous.map(ticket => ticket.id === id ? { ...ticket, ...patch, timeline: [...ticket.timeline, note] } : ticket));
          }} />}
        {view === 'settings' && <BikeCareSystem theme={theme} setTheme={setTheme} onLogout={() => { setSignedIn(false); navigate('login'); }} />}
        {view === 'more' && <div className="bikecare-ride-list">
          <button onClick={() => navigate('profile')}>Selected vehicle details</button>
          {role === 'rider' && <button onClick={() => navigate('documents')}>Documents: licence, insurance and RC</button>}
          {role === 'rider' && <button onClick={() => navigate('rides')}>Motorcycle rides</button>}
          {role !== 'rider' && role !== 'support' && <button onClick={() => navigate('supplier')}>Parts and supplier checks</button>}
          {[['garage', 'Vehicles and EV setup'], ['notifications', 'Notifications and reminders'], ['help', 'Help, complaints and feedback'], ['settings', 'Design system and theme']].map(([id, label]) =>
            <button key={id} onClick={() => { setSupportEntry(''); navigate(id); }}>{label}</button>)}
        </div>}
        {view === 'home' && <>
          <div className="bikecare-bike-card"><span>01 / YOUR {bike.category.toUpperCase()}{bike.powertrain === 'Electric' ? ' / EV' : ''}</span><h4>{bike.name}</h4><BikeCareVehiclePhoto key={bike.name} bike={bike} compact />
            <strong>{readings[bikeId].toLocaleString('en-IN')} km</strong><small>Rider-entered odometer</small></div>
          <article className="bikecare-app-card"><span className="bikecare-status" data-tone={reminder.status === 'Service due' ? 'warning' : 'info'}>{reminder.status}</span>
            <p>{reminder.latest?.nextDate ? dateText(reminder.latest.nextDate) : 'Date not supplied'} / {reminder.latest?.nextOdometer ? `${reminder.latest.nextOdometer.toLocaleString('en-IN')} km` : 'Distance not supplied'}</p>
            <p className="bikecare-small">{reminder.status === 'Guidance needed' ? 'Ask your mechanic for guidance. No interval is guessed.' : 'Due when either the supplied date or odometer is reached.'}</p>
          </article>
          <button className="bikecare-primary" onClick={() => navigate('service')}>Open service journey</button>
          <details className="bikecare-invoice-details"><summary>Odometer & reminder tools</summary><form className="bikecare-form bikecare-reading-form" onSubmit={updateReading} noValidate>
            <label>Current odometer (km)<input type="number" inputMode="numeric" value={readingInput} onChange={event => setReadingInput(event.target.value)} /></label>
            <button type="submit">Update reading</button></form>
          <button onClick={() => setNotificationPreview(value => !value)}>Preview a reminder</button>
            <p className="bikecare-small">Demo date: {dateText(today)}. Maintenance guidance is fictional, not a universal service schedule.</p></details>
          {notificationPreview && <p className="bikecare-app-message" role="status">Demo reminder: {reminder.status}. No notification was scheduled or sent.</p>}
        </>}
        {['jobs', 'service'].includes(view) && <>
          <article className="bikecare-app-card"><JobIdentity job={job} bike={bike} /><p>{job.complaint}</p>
            <ol className="bikecare-progress">
              {['Advisor intake & estimate', 'Rider approval', 'Mechanic work & parts', 'Billing staff invoice', 'Rider review & history'].map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
            </ol>
            <button className="bikecare-primary" onClick={() => navigate(role === 'advisor' ? 'jobcard' : role === 'mechanic' ? 'record'
              : role === 'billing' ? 'bill' : job.status === 'approval' ? 'estimate' : ['invoiced', 'confirmed', 'correction'].includes(job.status) ? 'review' : 'jobcard')}>Open current job</button>
          </article>
          <p className="bikecare-small">Approval, completion, invoice and payment are separate. Brand-style documentation for local shops, not manufacturer integration.</p>
          {job.status === 'draft' && role === 'rider' && <button onClick={() => changeRole('advisor')}>Preview Service advisor sign-in</button>}
          {job.status === 'confirmed' && <button onClick={() => navigate('history')}>Open confirmed history</button>}
          {job.status === 'confirmed' && role === 'advisor' && <button onClick={() => {
            const next = createDemoJob(bike);
            patchJob({ ...next, id: `${next.id}-${history.length}`, odometer: String(readings[bikeId]) });
            navigate('jobcard');
          }}>Start the next service job</button>}
        </>}
        {view === 'jobcard' && <>
          <JobIdentity job={job} bike={bike} editable={role === 'advisor' && ['draft', 'correction'].includes(job.status)} />
          {role === 'advisor' && ['draft', 'correction'].includes(job.status) ? <form className="bikecare-form" onSubmit={sendEstimate} noValidate>
            {job.status === 'correction' && <p className="bikecare-small">Original invoice retained on hold. Review the correction before sending a revised estimate.</p>}
            <div className="bikecare-field-pair">
              <label>Service date<input type="date" max={today} value={job.date} onChange={event => patchJob({ date: event.target.value })} /></label>
              <label>Odometer (km)<input type="number" inputMode="numeric" value={job.odometer} onChange={event => patchJob({ odometer: event.target.value })} /></label>
            </div>
            <label>Rider complaint<textarea rows={2} value={job.complaint} maxLength={300} onChange={event => patchJob({ complaint: event.target.value })} /></label>
            <label>{bike.powertrain === 'Electric' ? 'Intake: charge, condition, items' : 'Intake: fuel, condition, items'}<textarea rows={2} value={job.intake} maxLength={300} onChange={event => patchJob({ intake: event.target.value })} /></label>
            <div className="bikecare-estimate-summary"><strong>Periodic service / {money(invoiceTotals(job).total)}</strong>
              <p className="bikecare-small">{job.parts.length} part {job.parts.length === 1 ? 'line' : 'lines'} + {money(job.labour)} labour + illustrative {job.taxRate}% tax. Rider reviews the itemised estimate next.</p></div>
            <button className="bikecare-primary" type="submit">Send estimate for rider review</button>
          </form> : <article className="bikecare-app-card"><p><strong>Complaint</strong><br />{job.complaint}</p><p><strong>Intake record</strong><br />{job.intake}</p>
            <p className="bikecare-small">Advisor: Demo advisor / Mechanic: Demo mechanic.<br />Local shop: {job.workshop}</p>
            <BillLines job={job} /><button onClick={() => navigate('estimate')}>View estimate approval</button></article>}
          <p className="bikecare-small">Sample vehicle identity and tax figures. Photos, contact details and legal registration are not collected in this demo.</p>
        </>}
        {view === 'estimate' && <>
          <JobIdentity job={job} bike={bike} />
          <article className="bikecare-app-card"><p className="bikecare-small">{job.complaint}</p><BillLines job={job} />
            <label className="bikecare-checkbox"><input type="checkbox" checked={acknowledged} disabled={role !== 'rider' || job.status !== 'approval'}
              onChange={event => setAcknowledged(event.target.checked)} />I reviewed the work, parts and estimated total.</label>
            <button className="bikecare-primary" disabled={role !== 'rider' || job.status !== 'approval' || !acknowledged} onClick={approveEstimate}>Rider: approve estimate</button>
            {role === 'rider' && job.status === 'approval' && <button onClick={() => {
              patchJob({ status: 'draft', revision: job.revision + 1 }); setAcknowledged(false);
              setMessage('Estimate returned to the advisor. Work is not approved.');
            }}>Request estimate changes</button>}
          </article>
          <p className="bikecare-small">Additional work requires a new estimate and fresh approval. This is consent to the demo estimate, not a payment.</p>
        </>}
        {view === 'record' && <>
          <JobIdentity job={job} bike={bike} />
          {role === 'mechanic' && job.status === 'approved' ? <form className="bikecare-form" onSubmit={completeWork} noValidate>
            <div className="bikecare-field"><label htmlFor={workId}>Completed work & parts</label><textarea id={workId} rows={2} value={job.work} maxLength={600} onChange={event => patchJob({ work: event.target.value })} /></div>
            <article className="bikecare-app-card">
              {job.parts.map(part => <p className="bikecare-small" key={part.id}>{part.quantity} x {part.name} / {part.partNumber}</p>)}
              <p className="bikecare-small">Service labour: {money(job.labour)} / Demo mechanic</p>
            </article>
            <div className="bikecare-field-pair"><label>Next date (optional)<input type="date" value={job.nextDate} onChange={event => patchJob({ nextDate: event.target.value })} /></label>
              <label>Next km (optional)<input type="number" inputMode="numeric" value={job.nextOdometer} onChange={event => patchJob({ nextOdometer: event.target.value })} /></label></div>
            <p className="bikecare-small">Use manual or mechanic guidance; leave unknown intervals blank.</p>
            <label className="bikecare-checkbox"><input type="checkbox" checked={workChecked} onChange={event => setWorkChecked(event.target.checked)} />Approved work and parts have been recorded.</label>
            <button className="bikecare-primary" type="submit">Mechanic: confirm completed work</button>
            {job.parts.some(part => part.id === 'oil') && <button type="button" disabled={job.parts.some(part => part.id.startsWith('filter-'))} onClick={extraWork}>Request an additional oil filter</button>}
          </form> : <article className="bikecare-app-card"><p>{job.mechanicConfirmed ? job.work : 'Mechanic completion requires rider approval of the current estimate.'}</p>
            <p className="bikecare-small">Only the mechanic workspace records work; it cannot issue invoices or receive payments.</p></article>}
        </>}
        {['bill', 'review', 'receipt'].includes(view) && <>
          <JobIdentity job={job} bike={bike} />
          <article className="bikecare-app-card">
            <div className="bikecare-invoice-heading"><strong>{currentBillIssued ? `INV-014 / Revision ${job.billRevision}`
              : job.status === 'correction' ? `Held INV-014 / Revision ${job.billRevision}` : 'Draft service invoice'}</strong>
              <span className="bikecare-status" data-tone={job.status === 'correction' ? 'error' : payment.status === 'paid' ? 'success' : 'warning'}>{job.status === 'correction' ? 'On hold' : payment.status === 'paid' ? 'Paid / Demo receipt' : payment.status === 'partial' ? 'Part-paid / Demo' : 'Unpaid'}</span></div>
            {view === 'review' ? <>
              <p className="bikecare-small"><strong>Completed work:</strong> {job.work}</p>
              <div className="bikecare-bill-lines"><div><strong>Bill total / Illustrative tax included</strong><b>{money(invoiceTotals(job).total)}</b></div></div>
              <button onClick={() => navigate('bill')}>View itemised invoice</button>
            </> : <>
              <p className="bikecare-small">{job.workshop} / Bill to: Demo rider</p>
              <BillLines job={job} />
              <details className="bikecare-invoice-details"><summary>Work & invoice details</summary><p className="bikecare-small">{job.work}<br />Workshop address / registration withheld in demo. Tax figures are illustrative, not a legally valid invoice.</p></details>
            </>}
            <p className="bikecare-small">Received {money(payment.received)} / Due {money(payment.due)}</p>
            {role === 'billing' && view === 'bill' && <>
              {!job.billIssued || job.status === 'completed' ? <button className="bikecare-primary" disabled={job.status !== 'completed'} onClick={issueBill}>Billing: issue demo invoice</button> : null}
              <button disabled={!currentBillIssued || payment.status === 'paid'} onClick={() => {
                setPaymentInput(String(payment.due)); navigate('payment');
              }}>Record demo payment</button>
              <p className="bikecare-small">Receipt does not confirm rider acknowledgement.</p>
            </>}
            {role === 'rider' && view === 'review' && <>
              <label className="bikecare-checkbox"><input type="checkbox" checked={acknowledged} disabled={job.status !== 'invoiced'}
                onChange={event => setAcknowledged(event.target.checked)} />I reviewed the work, odometer, bill and next-service guidance.</label>
              <button className="bikecare-primary" disabled={job.status !== 'invoiced' || !acknowledged} onClick={confirmRider}>Rider: confirm record</button>
              <button disabled={job.status !== 'invoiced'} onClick={correction}>Ask for correction</button>
            </>}
            {job.audit.length > 0 && <p className="bikecare-small">Retained correction record: original invoice v{job.audit.at(-1).billRevision}, {money(job.audit.at(-1).total)}.</p>}
          </article>
          {view === 'receipt' && <><button className="bikecare-primary" onClick={() => navigate('history')}>Open service history</button>
            {role === 'rider' && job.status === 'confirmed' && <button onClick={() => navigate(serviceFeedback ? 'feedback-thanks' : 'service-feedback')}>{serviceFeedback ? 'View service feedback' : 'Rate this service'}</button>}</>}
          {view === 'bill' && role === 'rider' && <button onClick={() => navigate('review')}>Back to record review</button>}
          {view === 'review' && <p className="bikecare-small">Next care: {job.nextDate ? dateText(job.nextDate) : 'Date not supplied'} / {job.nextOdometer ? `${job.nextOdometer} km` : 'Distance not supplied'}. Confirmation is not a quality certificate.</p>}
        </>}
        {view === 'service-feedback' && role === 'rider' && job.status === 'confirmed' && <BikeCareServiceFeedback key={feedbackKey} job={job}
          preview={scene === 'service-feedback'} existing={serviceFeedback} onSave={saveServiceFeedback} onSkip={() => navigate('receipt')} />}
        {view === 'feedback-thanks' && serviceFeedback && <><article className="bikecare-app-card">
          <span className="bikecare-status" data-tone="success">Feedback saved / Demo only</span><h4>{serviceFeedback.rating} / 5 service rating</h4>
          <p>{serviceFeedback.comment || 'Thanks for sharing how the service felt.'}</p>
          <p className="bikecare-small">{job.id} / Record v{job.revision}. No public review or workshop notification was sent.</p>
          {serviceFeedback.requestId && <><p>Follow-up request: {serviceFeedback.requestId} / Open</p><button onClick={() => {
            setTicketId(serviceFeedback.requestId); setSupportEntry('ticket'); navigate('help');
          }}>Track workshop follow-up</button></>}
        </article><button className="bikecare-primary" onClick={() => navigate('history')}>Open service history</button>
          <button onClick={() => navigate('receipt')}>Back to service receipt</button>
          <p className="bikecare-small">Your rating never changes a service fact, settles a bill or closes a complaint. A support response still needs rider acceptance.</p></>}
        {view === 'payment' && <>
          <JobIdentity job={job} bike={bike} />
          <article className="bikecare-app-card"><span className="bikecare-status">{payment.status === 'partial' ? 'Part-paid / Demo' : payment.status === 'paid' ? 'Paid / Demo' : 'Unpaid'}</span>
            <h4>Outstanding: {money(payment.due)}</h4><p className="bikecare-small">Invoice total {money(invoiceTotals(job).total)} / Received {money(payment.received)}</p></article>
          {role === 'billing' ? <form className="bikecare-form" onSubmit={recordPayment} noValidate>
            <label>Receipt amount (INR)<input type="number" inputMode="decimal" step=".01" value={paymentInput} onChange={event => setPaymentInput(event.target.value)} /></label>
            <label>Receipt method<select value={paymentMethod} onChange={event => setPaymentMethod(event.target.value)}>
              {['Cash / Demo', 'UPI / Demo', 'Card / Demo'].map(method => <option key={method}>{method}</option>)}</select></label>
            <button className="bikecare-primary" disabled={payment.status === 'paid' || !currentBillIssued} type="submit">Save simulated receipt</button>
          </form> : <p>Only billing staff record demo receipts.</p>}
          <p className="bikecare-small">Partial payment leaves a balance. Revised invoices retain received amounts, not a stale paid flag. No gateway, payment or refund is performed.</p>
          <button onClick={() => navigate('bill')}>Back to invoice</button>
        </>}
        {view === 'history' && <>
          <p className="bikecare-small">Only jointly confirmed records. Pending work and held invoices are excluded.</p>
          {history.length ? history.map(record => <article className="bikecare-app-card" key={record.id}>
            <span className="bikecare-status" data-tone="success">Confirmed by both</span><RecordDetails record={record} />
          </article>) : <article className="bikecare-app-card"><h4>No confirmed records yet.</h4><p>Start with a local workshop visit. Self-entered receipts are not workshop-confirmed history.</p></article>}
          <button className="bikecare-primary" onClick={() => navigate('share')}>Preview resale history</button>
          <p className="bikecare-small">Completed records are read-only in this design demo.</p>
        </>}
        {view === 'share' && <>
          <p>Show recorded care, not a promised condition or resale price.</p>
          {!sharePreview && <article className="bikecare-app-card"><h4>{bike.name}</h4><p>{history.length} jointly confirmed {history.length === 1 ? 'service' : 'services'}</p>
            <p className="bikecare-small">No owner name, phone, address, number plate or invoice. Pending records are excluded.</p>
            <button className="bikecare-primary" disabled={!history.length} onClick={() => setSharePreview(true)}>Create local resale preview</button></article>}
          {sharePreview && history.length > 0 && <section className="bikecare-share-preview" aria-label="Buyer-facing resale preview">
            <p className="bikecare-app-eyebrow">BUYER PREVIEW / DEMO ONLY</p><h4>{bike.name} / Recorded care</h4>
            {history.map(record => <article key={record.id}><strong>{dateText(record.date)} / {Number(record.odometer).toLocaleString('en-IN')} km</strong>
              <p>{record.work}</p><p className="bikecare-small">Mechanic + rider confirmed / Version {record.revision}</p></article>)}
            <p className="bikecare-small">No public link created. Not a complete vehicle history, inspection certificate or quality guarantee.</p>
          </section>}
          {sharePreview && <button onClick={() => setSharePreview(false)}>Close resale preview</button>}
        </>}
        {view === 'shop' && <>
          <p className="bikecare-small">Genuine-parts-only design policy. All listings and supplier checks below are fictional.</p>
          <label>Seller type<select value={sellerFilter} onChange={event => setSellerFilter(event.target.value)}>
            {['All sellers', 'Local workshop', 'Parts dealer'].map(item => <option key={item}>{item}</option>)}</select></label>
          <div className="bikecare-products">{demoProducts.filter(item => item.reviewed && (sellerFilter === 'All sellers' || item.seller === sellerFilter)).map(item => <article className="bikecare-app-card" key={item.id}>
            <PartGraphic kind={item.kind} /><h4>{item.name}</h4><p className="bikecare-small">{item.seller} / {item.bikeId ? 'Honda Shine demo fit' : 'Size & safety markings need checking'}</p>
            <strong>{money(item.price)}</strong><button onClick={() => { setProductId(item.id); navigate('product'); }}>View {item.kind === 'helmet' ? 'helmet' : 'filter'} details</button>
          </article>)}</div>
          <button onClick={() => navigate('cart')}>Open cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</button>
        </>}
        {view === 'product' && <>
          <PartGraphic kind={product.kind} /><article className="bikecare-app-card"><h4>{product.name}</h4><p>{money(product.price)} / {product.seller}</p>
            <span className="bikecare-status">{product.reviewed ? 'Supplier review / Demo' : 'Listing blocked / Review pending'}</span>
            <dl className="bikecare-record-details"><div><dt>Part identity</dt><dd>{product.partNumber}</dd></div><div><dt>Demo stock</dt><dd>{product.stock}</dd></div>
              <div><dt>Compatibility</dt><dd>{product.bikeId ? product.bikeId === bikeId ? `${bike.name} / illustrative fit` : `Does not match ${bike.name}` : 'Check size and relevant safety certification'}</dd></div>
              <div><dt>Return terms</dt><dd>Demo: unopened within 7 days; installed parts excluded. Seller-specific terms must be reviewed before buying.</dd></div></dl>
            <button onClick={() => navigate('supplier')}>Inspect supplier & authenticity checks</button>
            <button className="bikecare-primary" disabled={!canBuy || role !== 'rider'} onClick={addToCart}>Add to demo cart</button>
          </article><p className="bikecare-small">No real supplier, authenticity, fit or stock checks.</p>
        </>}
        {view === 'supplier' && <>
          <article className="bikecare-app-card"><h4>{product.seller} / Sample evidence</h4>
            <ul className="bikecare-checklist"><li>Business identity: {product.reviewed ? 'reviewed in demo' : 'pending'}</li>
              <li>Supplier / authorisation documents: {product.reviewed ? 'reviewed in demo' : 'pending'}</li>
              <li>Part packaging & manufacturer identifier: check on physical product</li></ul>
            <p className="bikecare-small">Supplier documents reviewed does not prove every part genuine. Actual manufacturer checks and product evidence are still required.</p>
            <a className="bikecare-source-link" href="https://www.heromotocorp.com/en-in/services/hero-genuine-parts/test-of-genuineness.html" target="_blank" rel="noopener noreferrer">Hero parts only: manufacturer-check example</a>
            <p className="bikecare-small">For Hero parts only, not this demo listing. UPI is Unique Part Identity, not payment UPI.</p>
          </article>
          <button onClick={() => { setProductId(product.reviewed ? 'chain' : 'filter'); }}>Preview {product.reviewed ? 'pending supplier' : 'reviewed supplier'} state</button>
          <button className="bikecare-primary" disabled={!canBuy} onClick={() => navigate('product')}>Return to eligible product</button>
          <p className="bikecare-small">Pending suppliers cannot list or sell. Staff roles cannot self-approve suppliers in this prototype.</p>
        </>}
        {view === 'cart' && <>
          {cart.length ? <><article className="bikecare-app-card">
            {cart.map(item => { const part = demoProducts.find(candidate => candidate.id === item.id); return <div className="bikecare-cart-item" key={item.id}>
              <h4>{part.name}</h4><p className="bikecare-small">{part.seller} / {money(part.price)} each</p>
              <label>Quantity for {part.kind}<select value={item.quantity} onChange={event => setCart(previous => previous.map(entry => entry.id === item.id ? { ...entry, quantity: Number(event.target.value) } : entry))}>
                {Array.from({ length: part.stock }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}</select></label>
              <button onClick={() => setCart(previous => previous.filter(entry => entry.id !== item.id))}>Remove {part.kind}</button></div>; })}
            <div className="bikecare-bill-lines"><div><span>Items / Illustrative tax included</span><b>{money(cartTotal)}</b></div><div><span>Pickup delivery charge</span><b>{money(0)}</b></div></div>
            <p className="bikecare-small">Collect separately from each seller. Pay at pickup; no shipping or payment provider is connected.</p>
            <button className="bikecare-primary" onClick={checkout}>Place demo pickup order</button></article></>
            : <article className="bikecare-app-card"><h4>Your cart is empty.</h4><button onClick={() => navigate('shop')}>Browse compatible parts</button></article>}
        </>}
        {view === 'order' && (order ? <>
          <article className="bikecare-app-card"><span className="bikecare-status">{order.cancelled ? 'Cancelled / Demo' : 'Order placed / Demo only'}</span><h4>BC-ORDER-014</h4>
            {order.items.map(item => { const part = demoProducts.find(candidate => candidate.id === item.id); return <p key={item.id}>{item.quantity} x {part.name}<br /><span className="bikecare-small">{part.seller} / Pickup details require seller confirmation</span></p>; })}
            <div className="bikecare-bill-lines"><div><strong>Total</strong><b>{money(order.total)}</b></div></div>
            <p><strong>{order.payment === 'paid' ? 'Payment received / Demo' : 'Unpaid / Pay at pickup'}</strong></p>
            <p className="bikecare-small">No stock reserved, money collected or seller notified. Payment and order confirmation are separate.</p>
            <button disabled={order.cancelled || order.payment === 'paid'} onClick={() => setOrder(previous => ({ ...previous, payment: 'paid' }))}>Simulate pickup payment</button>
            <button disabled={order.cancelled || order.payment === 'paid'} onClick={() => setOrder(previous => ({ ...previous, cancelled: true }))}>Cancel demo order</button>
          </article><button onClick={() => navigate('shop')}>Back to parts</button></>
          : <p>No demo order yet. Add a compatible item to the cart first.</p>)}
        {view === 'rides' && <>
          <p className="bikecare-small">Motorcycle rides only. Public rider trips, brand/club events and employee groups; not a general social feed.</p>
          <label>Ride category<select value={rideFilter} onChange={event => setRideFilter(event.target.value)}>
            {['All rides', 'Rider-created', 'Brand / club', 'Company group'].map(item => <option key={item}>{item}</option>)}</select></label>
          <div className="bikecare-ride-list">{rides.filter(item => !blocked.includes(item.id) && (rideFilter === 'All rides' || item.type === rideFilter)).map(item => <button className="bikecare-ride-card" key={item.id}
            disabled={item.cancelled} aria-label={item.cancelled ? `${item.name}: cancelled` : `View ${item.type.toLowerCase()} ride`} onClick={() => chooseRide(item)}>
            <span className="bikecare-status">{item.type}</span><strong>{item.name}</strong><span className="bikecare-small">{dateText(item.date)} / {item.distance}</span>
          </button>)}</div>
          <button className="bikecare-primary" onClick={() => navigate('organise')}>Create a motorcycle ride</button>
        </>}
        {['ride', 'request', 'manage'].includes(view) && <>
          {view === 'ride' && <div className="bikecare-route-art" aria-label="Illustrative route, not navigation"><svg viewBox="0 0 320 90" aria-hidden="true">
            <path d="M30 66C80 2 109 96 156 32S230 4 290 58" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="8 5" />
            <circle cx="30" cy="66" r="8" fill="var(--bc-primary)" /><circle cx="290" cy="58" r="8" fill="currentColor" />
          </svg><span>Illustrative motorcycle route / Not a real trip</span></div>}
          <article className="bikecare-app-card"><span className="bikecare-status">{ride.cancelled ? 'Ride cancelled' : ride.type}</span><h4>{ride.name}</h4>
            <p className="bikecare-small">{ride.organiser}<br />{dateText(ride.date)} / {ride.distance} / {ride.seats} places</p>
            {view !== 'manage' && <><p className="bikecare-small">{ride.rule}</p>
              <p className="bikecare-meeting"><strong>{request === 'approved' && !ride.cancelled ? 'Demo meetup point / Not a real address' : 'Exact meetup point hidden until approval'}</strong><br /><span>{ride.area}</span></p></>}
            {view === 'ride' && <>
              <label className="bikecare-checkbox"><input type="checkbox" checked={eligible} disabled={Boolean(request) || ride.cancelled}
                onChange={event => setEligible(event.target.checked)} />I meet the motorcycle and group requirements.</label>
              <button className="bikecare-primary" disabled={Boolean(request) || ride.cancelled} onClick={requestRide}>{request ? `Request: ${request}` : 'Request to join ride'}</button>
            </>}
            {view === 'request' && <><p role="status"><strong>{ride.cancelled ? 'Ride cancelled' : request === 'approved' ? 'Place approved / Demo' : request === 'declined' ? 'Request declined / Demo' : request === 'cancelled' ? 'Request withdrawn' : 'Join request pending'}</strong></p>
              <button disabled={['cancelled', 'declined'].includes(request) || ride.cancelled} onClick={() => setRequests(previous => ({ ...previous, [rideId]: 'cancelled' }))}>Withdraw join request</button></>}
            {view !== 'manage' && <p className="bikecare-small">Helmet and legal riding requirements apply. Group review is not a safety guarantee. No live location or contacts shared.</p>}
            {bike.powertrain === 'Electric' && <p className="bikecare-small">EV rider: confirm eligibility, range and charging with the organiser. No charger availability or trip-range guarantee is provided.</p>}
          </article>
          {view === 'manage' ? <article className="bikecare-app-card"><h4>Organiser preview</h4><p className="bikecare-small">Demo applicant / Motorcycle and membership review required.</p>
            <button disabled={request !== 'requested' || ride.cancelled} onClick={() => { setRequests(previous => ({ ...previous, [rideId]: 'approved' })); setMessage('Demo organiser approved this request; meeting point becomes visible only to the approved member.'); }}>Simulate organiser approval</button>
            <button disabled={request !== 'requested' || ride.cancelled} onClick={() => setRequests(previous => ({ ...previous, [rideId]: 'declined' }))}>Decline demo applicant</button>
            <button disabled={ride.cancelled} onClick={() => { setRides(previous => previous.map(item => item.id === rideId ? { ...item, cancelled: true } : item)); setMessage('Ride cancelled locally. Members would need a notification in a real product; none was sent.'); }}>Cancel demo ride</button>
            <button onClick={() => navigate('request')}>Preview rider request state</button></article>
            : <>{request && <button onClick={() => navigate('manage')}>Preview organiser decisions</button>}
              <button onClick={() => { setBlocked(previous => [...previous, ride.id]); navigate('rides'); setMessage('Demo organiser blocked and hidden locally. A real report needs moderation; none was submitted.'); }}>Report & block demo organiser</button></>}
        </>}
        {view === 'organise' && <form className="bikecare-form" onSubmit={createRide} noValidate>
          <span className="bikecare-status">Motorcycle ride / Approval required</span>
          <label>Ride title<input value={rideDraft.name} maxLength={80} onChange={event => setRideDraft(previous => ({ ...previous, name: event.target.value }))} /></label>
          <label>Ride category<select value={rideDraft.type} onChange={event => setRideDraft(previous => ({ ...previous, type: event.target.value }))}>
            {['Rider-created', 'Brand / club', 'Company group'].map(item => <option key={item}>{item}</option>)}</select></label>
          <div className="bikecare-field-pair"><label>Ride date<input type="date" value={rideDraft.date} onChange={event => setRideDraft(previous => ({ ...previous, date: event.target.value }))} /></label>
            <label>Group size<input type="number" inputMode="numeric" value={rideDraft.seats} onChange={event => setRideDraft(previous => ({ ...previous, seats: event.target.value }))} /></label></div>
          <label>Public approximate meetup area<input value={rideDraft.area} maxLength={120} onChange={event => setRideDraft(previous => ({ ...previous, area: event.target.value }))} /></label>
          <p className="bikecare-small">Exact meetup and contact details are not public. Company/club membership needs organiser review; no employer verification is simulated as proof.</p>
          <button className="bikecare-primary" type="submit">Create local demo ride</button>
        </form>}
      </div>
      {signedIn && <nav className="bikecare-app-nav" data-items={navigation.length} aria-label="BikeCare app navigation">{navigation.map(([id, label], index) => <button key={id}
        aria-current={activeTab === id ? 'page' : undefined} onClick={() => navigate(id)}><span aria-hidden="true">0{index + 1}</span>{label}</button>)}</nav>}
      <div className="bikecare-in-phone-note">UX/UI concept / Fictional data / No real transactions</div>
    </div>
    <p className="bikecare-demo-note">Clickable design only. Sign-in, roles, supplier checks, orders, payments and ride decisions are simulated. Page-memory data resets on reload; no app, provider, message or sharing service is connected.</p>
  </div>;
}
