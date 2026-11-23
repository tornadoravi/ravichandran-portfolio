import test from 'node:test';
import assert from 'node:assert/strict';
import { confirmedServices, createDemoJob, examplePending, exampleService, invoicePayment, invoiceTotals, serviceReminder, validateRide, validateService } from '../src/bikecare-model.js';
import { daysAfter, validateTicket, validateVehicle, vehicleYear } from '../src/bikecare-ux-model.js';
import { documentKey, documentStatus, sampleDocument, validateDocument } from '../src/bikecare-documents.js';

test('only both-party confirmed records inform history and reminders', () => {
  const records = [exampleService, examplePending, { ...examplePending, mechanicConfirmed: false, riderConfirmed: true }];
  assert.deepEqual(confirmedServices(records), [exampleService]);
  assert.equal(serviceReminder(records, 14000).status, 'Upcoming service');
  assert.equal(serviceReminder(records, 14500).distanceDue, true);
  assert.equal(serviceReminder(records, 13000, '2026-12-01').dateDue, true);
});

test('vehicle registration and chassis are independent, normalised duplicate checks with unknown support', () => {
  const draft = { category: 'Motorcycle', powertrain: 'Petrol', manufacturer: 'Honda', model: 'Shine', year: '', odometer: '1', identifier: '' };
  assert.equal(validateVehicle(draft, []), '');
  const vehicles = [{ registration: 'DEMO-REG-001', chassis: 'DEMO-CHASSIS-001' }];
  assert.match(validateVehicle({ ...draft, registration: 'demo reg 001' }, vehicles), /Registration number already/);
  assert.match(validateVehicle({ ...draft, chassis: 'demo chassis 001' }, vehicles), /Chassis number already/);
  assert.equal(validateVehicle({ ...draft, registration: 'DEMO-REG-002', chassis: 'OLD-CHASSIS-123' }, vehicles), '');
  assert.match(validateVehicle({ ...draft, chassis: '??' }, []), /Chassis number must/);
});

test('document expiry cues preserve unknown dates, exact boundaries and synthetic-only validation', () => {
  const draft = sampleDocument('Insurance', 'shine', '2026-12-22');
  assert.equal(documentStatus(draft, '2026-11-22').label, 'Due within 30 days');
  assert.equal(documentStatus({ ...draft, expiry: '2026-12-23' }, '2026-11-22').label, 'Date current / Unverified');
  assert.equal(documentStatus({ ...draft, expiry: '2026-11-22' }, '2026-11-22').label, 'Due within 30 days');
  assert.equal(documentStatus({ ...draft, expiry: '2026-11-21' }, '2026-11-22').label, 'Expired date');
  assert.equal(documentStatus({ ...draft, expiry: '' }, '2026-11-22').label, 'Expiry not supplied');
  assert.match(validateDocument({ ...draft, expiry: '2026-02-30' }), /calendar/);
  assert.match(validateDocument({ ...draft, sample: false }), /fictional sample/);
  assert.equal(documentKey('Driving licence', 'shine'), documentKey('Driving licence', 'fz'));
  assert.notEqual(documentKey('Insurance', 'shine'), documentKey('Insurance', 'fz'));
});

test('unknown or single-axis guidance stays explicit', () => {
  assert.equal(serviceReminder([], 100).status, 'Guidance needed');
  assert.equal(serviceReminder([{ ...exampleService, nextDate: '', nextOdometer: null }], 20000).status, 'Guidance needed');
  assert.equal(serviceReminder([{ ...exampleService, nextDate: '', nextOdometer: 14500 }], 14500).status, 'Service due');
  assert.equal(serviceReminder([{ ...exampleService, nextOdometer: null }], 20000).status, 'Upcoming service');
});

test('service validation rejects impossible dates, backwards mileage and invalid guidance', () => {
  const draft = { ...examplePending, odometer: '13500', nextOdometer: '15500' };
  assert.equal(validateService(draft, [exampleService]), '');
  for (const patch of [
    { date: '2026-11-31' }, { date: '2026-12-01' }, { date: '2026-10-01' },
    { odometer: '' }, { odometer: 'NaN' }, { odometer: '12000' }, { odometer: '13500.5' },
    { workshop: ' ' }, { work: ' ' }, { nextDate: '2026-11-22' }, { nextDate: '2026-02-30' },
    { nextOdometer: '13500' }, { nextOdometer: 'invalid' }
  ]) assert.notEqual(validateService({ ...draft, ...patch }, [exampleService]), '', JSON.stringify(patch));
  assert.equal(validateService({ ...draft, nextDate: '', nextOdometer: '' }, [exampleService]), '');
});

test('invoice totals retain quantities and keep payment independent', () => {
  const job = createDemoJob('shine');
  job.parts[0].quantity = 2;
  job.parts.push({ id: 'filter', name: 'Demo filter', quantity: 1, price: 180 });
  assert.deepEqual(invoiceTotals(job), { parts: 1080, labour: 300, subtotal: 1380, tax: 248.4, total: 1628.4 });
  job.received = invoiceTotals(job).total;
  assert.equal(invoicePayment(job).status, 'paid');
  assert.equal(job.riderConfirmed, false);
  assert.equal(invoiceTotals(job).total, 1628.4);
  job.parts.push({ id: 'extra', quantity: 1, price: 100 });
  assert.deepEqual(invoicePayment(job), { status: 'partial', received: 1628.4, due: 118 });
});

test('ride creation rejects past or impossible dates, wrong categories and invalid capacity', () => {
  const draft = { name: 'Demo motorcycle ride', area: 'Approximate area', date: '2026-11-29', seats: '8', type: 'Rider-created' };
  assert.equal(validateRide(draft), '');
  for (const patch of [
    { name: ' ' }, { area: '' }, { date: '2026-11-22' }, { date: '2026-11-31' },
    { type: 'General social event' }, { seats: '1' }, { seats: '31' }, { seats: '3.5' }, { seats: '' }
  ]) assert.notEqual(validateRide({ ...draft, ...patch }), '', JSON.stringify(patch));
});

test('manual historic vehicles and unknown variants do not require an invented catalogue match', () => {
  const draft = { manufacturer: 'Unlisted demo maker', model: 'Vintage moped', category: 'Moped', powertrain: 'Petrol',
    year: '1970', variant: '', odometer: '45000', identifier: '', battery: '' };
  assert.equal(validateVehicle(draft, []), '');
  assert.equal(validateVehicle({ ...draft, year: '', powertrain: 'Not confirmed' }, []), '');
  for (const patch of [{ year: '1969' }, { year: String(vehicleYear + 1) }, { model: ' ' }, { manufacturer: ' ' }, { odometer: '' }, { odometer: '1.5' }, { category: 'Car' }]) {
    assert.notEqual(validateVehicle({ ...draft, ...patch }, []), '', JSON.stringify(patch));
  }
  assert.notEqual(validateVehicle({ ...draft, identifier: ' demo-1 ' }, [{ identifier: 'DEMO-1' }]), '');
  assert.equal(validateVehicle(draft, [{ ...draft, id: 'another-bike' }]), '');
});

test('EV and unknown vehicle tasks never inherit the petrol-demo oil bill', () => {
  const electric = { id: 'local-ev', name: 'Demo EV', category: 'Scooter', powertrain: 'Electric', odometer: 900 };
  const job = createDemoJob(electric);
  assert.deepEqual(job.parts, []);
  assert.doesNotMatch(job.work + job.labourLabel, /oil|chain/i);
  assert.match(job.work, /specialist/);
  assert.equal(invoiceTotals(job).total, 354);
  assert.deepEqual(createDemoJob({ ...electric, powertrain: 'Not confirmed' }).parts, []);
  const draft = { manufacturer: 'Demo', model: 'EV', category: 'Scooter', powertrain: 'Electric', year: '', variant: '', odometer: '900', identifier: '', battery: '' };
  assert.equal(validateVehicle(draft, []), '');
  assert.notEqual(validateVehicle({ ...draft, battery: '-1' }, []), '');
});

test('support validates descriptive requests and snooze preserves calendar boundaries', () => {
  const draft = { category: 'Product issue', subject: 'Demo listing issue', description: 'Please review the product listing.' };
  assert.equal(validateTicket(draft), '');
  assert.notEqual(validateTicket({ ...draft, description: 'short' }), '');
  assert.notEqual(validateTicket({ ...draft, subject: ' ' }), '');
  assert.equal(daysAfter('2026-11-29', 3), '2026-12-02');
  assert.equal(serviceReminder([exampleService], 14500, '2026-11-29').status, 'Service due');
});
