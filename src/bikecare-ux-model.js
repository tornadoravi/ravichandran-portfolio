import { demoToday } from './bikecare-model.js';

export const vehicleYear = Number(demoToday.slice(0, 4));
export const vehicleCategories = ['Motorcycle', 'Scooter', 'Moped'];
export const powertrains = ['Petrol', 'Electric', 'Diesel', 'Not confirmed'];

// Search suggestions are not a verified historical model-year catalogue.
export const manufacturerSuggestions = {
  'Hero': ['Splendor', 'Passion', 'HF Deluxe', 'Karizma', 'XPulse', 'Xtreme'],
  'Hero Honda': ['CD 100', 'Splendor', 'CBZ', 'Karizma', 'Hunk'],
  'Honda': ['Shine', 'Unicorn', 'Activa', 'Dio', 'CB350', 'SP125'],
  'Bajaj': ['Chetak', 'Pulsar', 'Discover', 'CT100', 'Platina', 'M80'],
  'TVS': ['XL', 'XL100', 'Apache', 'Jupiter', 'Scooty', 'iQube'],
  'Yamaha': ['RX100', 'RX135', 'RD350', 'FZ', 'R15', 'Fascino', 'Ray ZR'],
  'Suzuki': ['Access', 'Burgman', 'Gixxer', 'Shogun', 'Samurai', 'AX100'],
  'Royal Enfield': ['Bullet', 'Classic', 'Himalayan', 'Meteor', 'Interceptor', 'Taurus'],
  'Enfield': ['Bullet', 'Crusader'],
  'Jawa': ['250', '350', '42', 'Perak'],
  'Yezdi': ['Roadking', 'Classic', 'Adventure', 'Roadster'],
  'Rajdoot': ['175', '350'],
  'Kinetic Honda': ['DX', 'ZX'],
  'Kinetic': ['Luna', 'K4', 'e-Luna'],
  'LML': ['Vespa', 'Freedom', 'Adreno'],
  'Mahindra': ['Centuro', 'Mojo', 'Duro', 'Gusto'],
  'KTM': ['Duke', 'RC', 'Adventure'],
  'Kawasaki': ['Ninja', 'Versys', 'Z', 'W175'],
  'BMW Motorrad': ['G 310', 'G 310 GS', 'CE 02'],
  'Triumph': ['Speed', 'Scrambler', 'Tiger', 'Bonneville'],
  'Harley-Davidson': ['X440', 'Street', 'Sportster'],
  'Ducati': ['Monster', 'Scrambler', 'Panigale'],
  'Aprilia': ['RS', 'SR', 'Tuono'],
  'Vespa': ['LX', 'VXL', 'SXL'],
  'Benelli': ['TNT', 'Imperiale', 'TRK'],
  'Husqvarna': ['Vitpilen', 'Svartpilen'],
  'BSA': ['Gold Star'],
  'Norton': ['Commando'],
  'Hyosung': ['GT', 'Aquila'],
  'Indian Motorcycle': ['Scout', 'Chief'],
  'Moto Guzzi': ['V7', 'V85'],
  'Ather': ['450', '450X', 'Rizta'],
  'Ola Electric': ['S1', 'S1 Pro'],
  'VIDA': ['V1', 'V2'],
  'River': ['Indie'],
  'Revolt': ['RV400'],
  'Ultraviolette': ['F77'],
  'Oben': ['Rorr'],
  'Tork': ['Kratos'],
  'Ampere': ['Magnus', 'Nexus'],
  'Okinawa': ['Praise', 'Ridge'],
  'Hero Electric': ['Optima', 'Photon'],
  'PURE EV': ['Epluto', 'Etryst'],
  'Simple Energy': ['One'],
  'Yulu': ['Wynn']
};

export function validateVehicle(draft, vehicles) {
  if (!vehicleCategories.includes(draft.category) || !powertrains.includes(draft.powertrain)) return 'Select a two-wheeler category and powertrain.';
  if (!draft.manufacturer.trim() || !draft.model.trim()) return 'Add the manufacturer and model, or use the manual entry path.';
  if (draft.year !== '' && (!Number.isSafeInteger(Number(draft.year)) || Number(draft.year) < 1970 || Number(draft.year) > vehicleYear)) return `Choose a year from 1970 to ${vehicleYear}, or mark it unknown.`;
  if (!draft.odometer.trim() || !Number.isSafeInteger(Number(draft.odometer)) || Number(draft.odometer) < 0) return 'Enter a non-negative whole-number odometer reading.';
  if (draft.identifier.trim() && vehicles.some(vehicle => vehicle.identifier?.toLowerCase() === draft.identifier.trim().toLowerCase())) return 'That vehicle identifier is already in your garage. Open its existing profile.';
  for (const [field, label] of [['registration', 'Registration number'], ['chassis', 'Chassis number']]) {
    const value = draft[field]?.trim();
    if (value && (!/^[a-z0-9 -]{4,30}$/i.test(value) || !/[a-z0-9]/i.test(value))) return `${label} must contain 4–30 letters, numbers, spaces or hyphens. Use a fictional example.`;
    if (value && vehicles.some(vehicle => normaliseVehicleNumber(vehicle[field]) === normaliseVehicleNumber(value))) return `${label} already belongs to a saved vehicle. Open its profile instead.`;
  }
  if (draft.powertrain === 'Electric' && draft.battery && (!Number.isFinite(Number(draft.battery)) || Number(draft.battery) <= 0)) return 'Battery capacity must be positive, or left unknown.';
  if (['Petrol', 'Diesel'].includes(draft.powertrain) && draft.engineCapacity && (!Number.isFinite(Number(draft.engineCapacity)) || Number(draft.engineCapacity) <= 0)) return 'Engine capacity must be positive, or left unknown.';
  return '';
}

export function normaliseVehicleNumber(value = '') {
  return value.toUpperCase().replace(/[ -]/g, '');
}

export function daysAfter(date, days) {
  const value = new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

export const supportCategories = ['Service not satisfactory', 'Product issue', 'Payment / bill issue', 'Account / sign-in', 'Ride / community issue', 'Feedback'];
export const supportOutcomes = ['Workshop reinspection proposed', 'Seller review requested', 'Billing reconciliation requested', 'Account assistance proposed', 'Moderation review requested', 'Feedback acknowledged'];
export const initialTicket = {
  id: 'BC-HELP-001', category: 'Service not satisfactory', subject: 'Service needs another look',
  description: 'Demo rider requests a workshop reinspection after the visit.', context: 'BC-SHINE-014',
  status: 'Open', outcome: '', timeline: ['Created in demo / No real complaint sent']
};

export function validateTicket(draft) {
  if (!supportCategories.includes(draft.category)) return 'Choose an issue category.';
  if (!draft.subject.trim() || draft.description.trim().length < 10) return 'Add a subject and at least ten characters describing the issue.';
  return '';
}

export const bikecareThemes = {
  light: {
    '--bc-canvas': '#f5f7f5', '--bc-surface': '#ffffff', '--bc-ink': '#182c28', '--bc-muted': '#52635f',
    '--bc-line': '#d8e1dc', '--bc-control-line': '#788983', '--bc-primary': '#006b60', '--bc-primary-hover': '#00564d',
    '--bc-on-primary': '#ffffff', '--bc-soft': '#e5eee8', '--bc-feature': '#153d33', '--bc-on-feature': '#f5f7f8',
    '--bc-warning': '#855000', '--bc-warning-soft': '#fff2d9', '--bc-error': '#ad302b', '--bc-error-soft': '#fff0ed',
    '--bc-info': '#255779', '--bc-info-soft': '#eaf3fb', '--bc-focus': '#0668a8',
    '--bc-success': '#1e6744', '--bc-success-soft': '#e4f3e9'
  },
  dark: {
    '--bc-canvas': '#101c19', '--bc-surface': '#1b2b26', '--bc-ink': '#edf5f0', '--bc-muted': '#b4c9bf',
    '--bc-line': '#4a5c52', '--bc-control-line': '#8a9e94', '--bc-primary': '#8bd5c5', '--bc-primary-hover': '#a4e3d5',
    '--bc-on-primary': '#063b31', '--bc-soft': '#293f35', '--bc-feature': '#293f35', '--bc-on-feature': '#edf5f0',
    '--bc-warning': '#ffdb8f', '--bc-warning-soft': '#3a2e19', '--bc-error': '#ffb8ad', '--bc-error-soft': '#422823',
    '--bc-info': '#b0d9fc', '--bc-info-soft': '#213747', '--bc-focus': '#91d5ff',
    '--bc-success': '#9eddb8', '--bc-success-soft': '#1b362a'
  }
};

export const designTokens = [
  ['Care teal', bikecareThemes.light['--bc-primary'], 'The next deliberate action, not a warning or verification badge.', 'primary'],
  ['Quiet canvas', bikecareThemes.light['--bc-canvas'], 'Warm neutral separation between readable white cards.', 'canvas'],
  ['Deep ink', bikecareThemes.light['--bc-ink'], 'Strong hierarchy for vehicle identity, bills and support.', 'ink'],
  ['Attention', bikecareThemes.light['--bc-warning'], 'Pending decisions and caution, supported by explicit wording.', 'warning'],
  ['Actionable error', bikecareThemes.light['--bc-error'], 'Explain the problem and how to recover, never colour alone.', 'error'],
  ['Record surface', bikecareThemes.light['--bc-surface'], 'Clean surfaces for long records; adapted independently in dark mode.', 'surface']
];
