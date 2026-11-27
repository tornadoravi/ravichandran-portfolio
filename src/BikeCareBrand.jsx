import React, { useState } from 'react';
import { sitePath } from './site-path.js';

export const bikecarePhotography = [
  { manufacturer: 'Honda', models: ['Shine', 'Shine 125'], name: 'Honda Shine 125', file: 'honda', source: 'https://www.honda2wheelersindia.com/motorcycle/shine-125' },
  { manufacturer: 'Yamaha', models: ['FZ', 'FZ FI'], name: 'Yamaha FZ FI', file: 'yamaha', source: 'https://www.yamaha-motor-india.com/yamaha-fz-fi.html' },
  { manufacturer: 'Hero', models: ['Splendor', 'Splendor Plus'], name: 'Hero Splendor Plus', file: 'hero', source: 'https://www.heromotocorp.com/en-in/motorcycles/splendor-plus.html' },
  { manufacturer: 'Ather', models: ['450X'], name: 'Ather 450X', file: 'ather', source: 'https://www.atherenergy.com/450' }
];

export function BikeCareLogo() {
  return <span className="bikecare-brand"><svg viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="12" fill="currentColor" />
    <path d="M22 12a8 8 0 1 0 0 16m-4-16a8 8 0 1 1 0 16" fill="none" stroke="var(--bc-on-primary, #fff)" strokeWidth="3" strokeLinecap="round" />
    <path d="m17 20 2 2 5-5" fill="none" stroke="var(--bc-on-primary, #fff)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg><strong>BikeCare<span>.</span></strong></span>;
}

const manufacturerLogos = {
  hero: 'hero',
  honda: 'honda',
  bajaj: 'bajaj',
  yamaha: 'yamaha',
  suzuki: 'suzuki',
  'royal enfield': 'royal-enfield',
  ktm: 'ktm',
  triumph: 'triumph',
  husqvarna: 'husqvarna'
};

export function BikeCareManufacturerLogo({ name }) {
  const key = name.trim().toLowerCase();
  const logo = Object.hasOwn(manufacturerLogos, key) ? manufacturerLogos[key] : null;
  if (!logo) return null;
  return <img className="bikecare-manufacturer-logo" data-brand-tone={['bajaj', 'ktm', 'triumph', 'husqvarna'].includes(logo) ? 'dark' : 'light'}
    src={sitePath(`/assets/bikecare-brand-${logo}.png`)} alt="" aria-hidden="true" width="48" height="32" />;
}

export function BikeCareVehiclePhoto({ bike, compact = false }) {
  const [failed, setFailed] = useState(false);
  const reference = bikecarePhotography.find(item => item.manufacturer.toLowerCase() === bike.manufacturer.toLowerCase()
    && item.models.some(model => model.toLowerCase() === bike.model.toLowerCase()));
  return <figure className={`bikecare-vehicle-photo${compact ? ' is-compact' : ''}`} data-photo-state={reference && !failed ? 'reference' : 'empty'}>
    {reference && !failed ? <img src={sitePath(`/assets/bikecare-official-${reference.file}.webp`)}
      alt={`${reference.name}, official current-product reference; not verified for this vehicle's year or trim`}
      width="584" height="380" onError={() => setFailed(true)} />
      : <div className="bikecare-photo-empty"><strong>{bike.manufacturer} / {bike.model}</strong>
        <span>{failed ? 'Reference photo could not load.' : 'No matched official photo yet.'}</span></div>}
    <figcaption>{reference ? <a href={reference.source} target="_blank" rel="noopener noreferrer">
      Photo: {reference.manufacturer} / current reference{!compact && <span>Year & trim may differ.</span>}
    </a> : 'No unrelated motorcycle is substituted.'}</figcaption>
  </figure>;
}
