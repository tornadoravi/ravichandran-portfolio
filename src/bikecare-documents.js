import { daysAfter } from './bikecare-ux-model.js';

export const documentTypes = ['Driving licence', 'Insurance', 'Registration certificate (RC)'];

export function documentStatus(document, today) {
  if (!document) return { label: 'Not added', tone: 'info' };
  if (!document.expiry) return { label: 'Expiry not supplied', tone: 'info' };
  if (document.expiry < today) return { label: 'Expired date', tone: 'error' };
  if (document.expiry <= daysAfter(today, 30)) return { label: 'Due within 30 days', tone: 'warning' };
  return { label: 'Date current / Unverified', tone: 'info' };
}

export function validateDocument(draft) {
  if (!documentTypes.includes(draft.type)) return 'Choose a document type.';
  if (!draft.sample) return 'Select a fictional sample; real files are not accepted.';
  if (draft.expiry) {
    const date = new Date(`${draft.expiry}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.expiry) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== draft.expiry) return 'Enter a real calendar expiry date, or leave it unknown.';
  }
  return '';
}

export function documentKey(type, bikeId) {
  return type === 'Driving licence' ? 'rider:licence' : `${bikeId}:${type}`;
}

export function sampleDocument(type, bikeId, expiry = '', revision = 1) {
  return { type, scope: type === 'Driving licence' ? 'rider' : bikeId, sample: true, expiry, revision,
    reference: type === 'Driving licence' ? 'DEMO-LICENCE-001' : type === 'Insurance' ? 'DEMO-POLICY-001' : 'DEMO-RC-001' };
}
