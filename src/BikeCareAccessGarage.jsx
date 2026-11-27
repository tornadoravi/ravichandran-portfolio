import React, { useEffect, useId, useRef, useState } from 'react';
import { manufacturerSuggestions, powertrains, validateVehicle, vehicleCategories, vehicleYear } from './bikecare-ux-model.js';
import BikeCareSelect from './BikeCareSelect.jsx';

export function BikeCareAccess({ actor, scene, onEnter, onSupport }) {
  const [stage, setStage] = useState(scene === 'otp' ? 'verify' : scene === 'otp-expired' ? 'expired' : scene === 'recover' ? 'recover' : scene === 'signup' ? 'signup' : 'login');
  const [identity, setIdentity] = useState(actor.identity);
  const [code, setCode] = useState(scene === 'otp' ? '123456' : '');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('Demo rider');
  const [consent, setConsent] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');
  const testIdentity = /^[^\s@]+@[^\s@]+\.test$/.test(identity);
  function submit(event) {
    event.preventDefault(); setError('');
    if (!testIdentity) { setError('Use a fictional .test email for this prototype. No real credentials are collected or sent.'); return; }
    if (stage === 'signup') {
      if (!name.trim() || !consent) { setError('Add a demo name and acknowledge the concept privacy notice.'); return; }
      setStage('verify'); return;
    }
    if (stage === 'recover') { setStage('reset'); return; }
    if (stage === 'reset') {
      if (password.length < 8) { setError('Use at least eight characters for the demo reset.'); return; }
      onEnter(); return;
    }
    if (stage === 'verify') {
      if (code !== '123456') { setError('Demo code does not match. Use 123456 or resend the demo code.'); return; }
      onEnter(); return;
    }
    if (actor.id === 'rider') { setStage('verify'); return; }
    if (password !== 'demo-only') {
      setAttempts(value => value + 1);
      setError('Demo password does not match. Use demo-only. Three failed attempts lock this preview.'); return;
    }
    onEnter();
  }
  return <>
    <article className="bikecare-app-card"><span className="bikecare-status" data-tone="info">{actor.id === 'rider' ? 'Rider account' : `${actor.label} workspace`}</span>
      <p className="bikecare-small">Access preview only. Codes, email delivery, lockouts and password resets are simulated, not authentication.</p></article>
    {error && <p className="bikecare-app-alert" role="alert">{error}</p>}
    {stage === 'expired' || attempts >= 3 ? <article className="bikecare-app-card">
      <h4>{stage === 'expired' ? 'Code expired in this scenario.' : 'Demo access temporarily locked.'}</h4>
      <p>Keep the entered identity. Retry or recover access without starting the bike setup again.</p>
      <button className="bikecare-primary" onClick={() => { setAttempts(0); setStage(actor.id === 'rider' ? 'verify' : 'recover'); setError(''); }}>Retry demo access</button>
    </article> : <form className="bikecare-form" onSubmit={submit} noValidate>
      <label>Demo account email<input type="email" autoCapitalize="none" autoCorrect="off" value={identity} onChange={event => setIdentity(event.target.value)} /></label>
      {stage === 'signup' && <>
        <label>Profile name<input value={name} maxLength={60} onChange={event => setName(event.target.value)} /></label>
        <label className="bikecare-checkbox"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} />I understand the concept privacy notice: page-memory demo data, no real account or provider.</label>
      </>}
      {stage === 'verify' && <>
        <label>One-time code<input inputMode="numeric" autoComplete="off" maxLength={6} value={code} onChange={event => setCode(event.target.value)} /></label>
        <p className="bikecare-small">Demo code: 123456. No OTP was sent. Wrong, expired and resend states can be explored.</p>
      </>}
      {(stage === 'reset' || (stage === 'login' && actor.id !== 'rider')) && <label>{stage === 'reset' ? 'New demo password' : 'Demo password'}<input type="password" autoComplete="off" value={password} onChange={event => setPassword(event.target.value)} /></label>}
      {stage === 'login' && actor.id !== 'rider' && <p className="bikecare-small">Public demo password: demo-only. Staff responsibilities are assigned to the selected preview persona.</p>}
      {stage === 'reset' && <p className="bikecare-app-message">Demo reset link preview. No email was delivered; no production password is changed.</p>}
      <button className="bikecare-primary" type="submit">{stage === 'verify' ? 'Verify demo code' : stage === 'recover' ? 'Preview reset email' : stage === 'reset' ? 'Save demo reset' : stage === 'signup' ? 'Continue account setup' : actor.id === 'rider' ? 'Send demo code' : 'Sign in to demo'}</button>
    </form>}
    {stage === 'verify' && <div className="bikecare-inline-actions">
      <button onClick={() => { setCode(''); setError(''); }}>Resend demo code</button><button onClick={() => setStage('expired')}>Preview expired code</button>
    </div>}
    {stage === 'login' && <div className="bikecare-inline-actions"><button onClick={() => { setStage(actor.id === 'rider' ? 'signup' : 'recover'); setError(''); }}>{actor.id === 'rider' ? 'Create demo account' : 'Forgot password'}</button><button onClick={onSupport}>Get sign-in help</button></div>}
    {stage !== 'login' && <button onClick={() => { setStage('login'); setError(''); }}>Back to sign-in</button>}
  </>;
}

export function BikeCareGarage({ vehicles, selectedId, onSelect, onAdd, scene, onboarding = false }) {
  const listId = useId();
  const heading = useRef(null);
  const [step, setStep] = useState(onboarding ? 1 : scene === 'ev-profile' ? 4 : scene === 'vehicle-year' ? 2 : scene === 'vehicle-details' ? 3 : ['vehicle-brand', 'manufacturer-options', 'model-options'].includes(scene) ? 1 : 0);
  const [sample, setSample] = useState(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [draft, setDraft] = useState({
    manufacturer: onboarding ? '' : scene === 'ev-profile' ? 'Ather' : scene === 'model-options' ? 'Yamaha' : 'Honda', model: onboarding ? '' : scene === 'ev-profile' ? '450X' : scene === 'model-options' ? '' : 'Shine',
    category: scene === 'ev-profile' ? 'Scooter' : 'Motorcycle', powertrain: onboarding ? 'Not confirmed' : scene === 'ev-profile' ? 'Electric' : 'Petrol',
    year: onboarding ? '' : scene === 'ev-profile' ? '2024' : '2019', variant: '', odometer: onboarding ? '' : '13500', identifier: '', registration: '', chassis: '', engineCapacity: '', battery: '', connector: ''
  });
  const stages = ['Bike', 'Details', 'Identity', ...(draft.powertrain === 'Electric' ? ['Electric'] : []), 'Review'];
  const stageIndex = step === 5 ? stages.length - 1 : step - 1;
  const reviewVehicle = sample || draft;
  useEffect(() => {
    if (!onboarding || !heading.current) return;
    heading.current.closest('.bikecare-app-body').scrollTop = 0;
    heading.current.focus({ preventScroll: true });
  }, [step, onboarding]);
  function update(key, value) { setDraft(previous => ({ ...previous, [key]: value })); setError(''); }
  function advance() {
    if (step === 1 && (!draft.manufacturer.trim() || !draft.model.trim())) { setError('Choose or type the manufacturer and model.'); return; }
    if (step === 1) {
      const manufacturer = Object.keys(manufacturerSuggestions).find(name => name.toLowerCase() === draft.manufacturer.trim().toLowerCase()) || draft.manufacturer.trim();
      const model = (manufacturerSuggestions[manufacturer] || []).find(name => name.toLowerCase() === draft.model.trim().toLowerCase()) || draft.model.trim();
      setDraft(previous => ({ ...previous, manufacturer, model }));
    }
    if (step === 2 && draft.year && (Number(draft.year) < 1970 || Number(draft.year) > vehicleYear)) { setError(`Year must be between 1970 and ${vehicleYear}.`); return; }
    setStep(value => value + 1); setError('');
  }
  function save(event) {
    event.preventDefault();
    const invalid = validateVehicle(draft, vehicles);
    if (invalid) { setError(invalid); return; }
    if (onboarding) { setStep(5); setError(''); return; }
    addDraft();
  }
  function addDraft() {
    onAdd({ ...draft, id: `vehicle-${vehicles.length + 1}`, manufacturer: draft.manufacturer.trim(), model: draft.model.trim(),
      name: `${draft.manufacturer.trim()} ${draft.model.trim()}`, year: draft.year ? Number(draft.year) : null,
      odometer: Number(draft.odometer), identifier: draft.identifier.trim(),
      registration: draft.registration.trim().toUpperCase(), chassis: draft.chassis.trim().toUpperCase(),
      engineCapacity: ['Petrol', 'Diesel'].includes(draft.powertrain) ? draft.engineCapacity : '',
      battery: draft.powertrain === 'Electric' ? draft.battery : '', connector: draft.powertrain === 'Electric' ? draft.connector : '',
      verification: 'Rider-entered / Not catalog-verified' });
  }
  return <>
    {onboarding && <div className="bikecare-setup-heading">
      {step > 0 && !sample && <ol className="bikecare-setup-progress" aria-label="Bike setup progress">
        {stages.map((label, index) => <li key={label} aria-current={stageIndex === index ? 'step' : undefined}
          data-complete={index < stageIndex}><span>{index < stageIndex ? '✓' : index + 1}</span>{label}</li>)}
      </ol>}
      <h4 ref={heading} tabIndex={-1}>{step === 0 ? 'Choose a sample bike' : step === 1 ? 'Which bike do you ride?' : step === 2 ? 'A few bike details' : step === 3 ? 'Identify your bike' : step === 4 ? 'Your electric vehicle' : 'Review your bike'}</h4>
      <p className="bikecare-small">{step === 1 ? 'Choose the manufacturer and model. Unlisted bikes are welcome too.' : step === 2 ? 'Use your vehicle documents. Leave anything you do not know blank.' : step === 3 ? 'Add the current kilometre reading. Vehicle numbers are optional.' : step === 4 ? 'Battery and connector details can stay unknown.' : step === 5 ? 'Check the details before opening your care workspace.' : 'Fictional profiles for trying the app, not vehicles linked to a real account.'}</p>
    </div>}
    {!onboarding && step <= 1 && <p className="bikecare-small">India garage / 1970–{vehicleYear}. Motorcycles, scooters, mopeds and EVs; current, discontinued and imported vehicles can use manual entry.</p>}
    {error && <p className="bikecare-app-alert" role="alert">{error}</p>}
    {step === 0 ? <>
      <label>Find a saved vehicle<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Manufacturer, model or year" /></label>
      <div className="bikecare-ride-list">{vehicles.filter(vehicle => `${vehicle.name} ${vehicle.year || 'unknown'}`.toLowerCase().includes(search.toLowerCase())).map(vehicle =>
        <button className="bikecare-ride-card" key={vehicle.id} aria-label={`Select ${vehicle.name}`} aria-pressed={selectedId === vehicle.id}
          onClick={() => { if (onboarding) { setSample(vehicle); setStep(5); } else onSelect(vehicle.id); }}>
          <strong>{vehicle.manufacturer} / {vehicle.model}</strong><span>{vehicle.year || 'Year unknown'} / {vehicle.variant || 'Variant unknown'}</span>
          <span className="bikecare-small">{vehicle.category} / {vehicle.powertrain} / {vehicle.odometer.toLocaleString('en-IN')} km</span>
        </button>)}</div>
      {!vehicles.some(vehicle => `${vehicle.name} ${vehicle.year || 'unknown'}`.toLowerCase().includes(search.toLowerCase())) && <p>No saved match. Add a vehicle; a catalogue suggestion is not required.</p>}
      <button className="bikecare-primary" onClick={() => setStep(1)}>{onboarding ? 'Enter my bike details instead' : 'Add a two-wheeler'}</button>
    </> : step === 5 ? <>
      <article className="bikecare-app-card bikecare-setup-review">
        <span className="bikecare-status" data-tone="info">{sample ? 'Sample bike / Fictional profile' : 'Your entered details / Not verified'}</span>
        <h4>{reviewVehicle.manufacturer} {reviewVehicle.model}</h4>
        <dl className="bikecare-record-details">
          <div><dt>Year</dt><dd>{reviewVehicle.year || 'Not known'}</dd></div>
          <div><dt>Powertrain</dt><dd>{reviewVehicle.powertrain}</dd></div>
          <div><dt>Category</dt><dd>{reviewVehicle.category}</dd></div>
          <div><dt>Odometer</dt><dd>{Number(reviewVehicle.odometer).toLocaleString('en-IN')} km</dd></div>
          <div><dt>Variant</dt><dd>{reviewVehicle.variant || 'Not supplied'}</dd></div>
          {reviewVehicle.engineCapacity && <div><dt>Engine capacity</dt><dd>{reviewVehicle.engineCapacity} cc / Not verified</dd></div>}
          {reviewVehicle.registration && <div><dt>Registration</dt><dd>{reviewVehicle.registration}</dd></div>}
          {reviewVehicle.chassis && <div><dt>Chassis / VIN</dt><dd>{reviewVehicle.chassis}</dd></div>}
          {reviewVehicle.powertrain === 'Electric' && <div><dt>Battery / connector</dt><dd>{reviewVehicle.battery ? `${reviewVehicle.battery} kWh` : 'Capacity unknown'} / {reviewVehicle.connector || 'Connector unknown'}</dd></div>}
        </dl>
      </article>
      <p className="bikecare-small">{sample ? 'Sample data lets you explore the app without entering your own bike.' : 'New bikes start without service history. Bike details do not establish parts compatibility or service intervals.'} Nothing is sent or stored outside this page.</p>
      <button className="bikecare-primary" onClick={() => sample ? onSelect(sample.id) : addDraft()}>Confirm bike and continue</button>
      <button onClick={() => { setStep(sample ? 0 : draft.powertrain === 'Electric' ? 4 : 3); setSample(null); }}>Edit bike details</button>
    </> : <>
      {!onboarding && <span className="bikecare-status" data-tone="info">Vehicle setup / Step {step} of {draft.powertrain === 'Electric' ? 4 : 3}</span>}
      <form className="bikecare-form" onSubmit={event => { if (step === 4 || (step === 3 && draft.powertrain !== 'Electric')) save(event); else { event.preventDefault(); advance(); } }} noValidate>
        {step === 1 && <>
          <label>Vehicle category<select value={draft.category} onChange={event => update('category', event.target.value)}>{vehicleCategories.map(category => <option key={category}>{category}</option>)}</select></label>
          <BikeCareSelect label="Manufacturer" value={draft.manufacturer} options={Object.keys(manufacturerSuggestions)} initialOpen={scene === 'manufacturer-options'}
            placeholder="Search manufacturer" onChange={value => {
              setDraft(previous => ({ ...previous, manufacturer: value, model: value === previous.manufacturer ? previous.model : '' })); setError('');
            }} />
          <BikeCareSelect key={draft.manufacturer} label="Model" value={draft.model} disabled={!draft.manufacturer.trim()}
            initialOpen={scene === 'model-options'}
            placeholder="Search model or enter an unlisted name"
            options={manufacturerSuggestions[Object.keys(manufacturerSuggestions).find(name => name.toLowerCase() === draft.manufacturer.trim().toLowerCase())] || []}
            onChange={value => update('model', value)} />
          <p className="bikecare-small">{onboarding ? 'Not listed? Type the name from your documents. Suggestions do not verify model-year availability or parts fit.' : 'Suggestions are representative, not every historic model. Any unlisted manufacturer/model can be entered; no invented model-year availability or parts fit.'}</p>
        </>}
        {step === 2 && <>
          <p className="bikecare-setup-bike-name">{draft.manufacturer} / {draft.model}</p>
          <label>Manufacture / model year<select value={draft.year} onChange={event => update('year', event.target.value)}>
            <option value="">Year not known</option>{Array.from({ length: vehicleYear - 1969 }, (_, index) => vehicleYear - index).map(year => <option key={year} value={year}>{year}</option>)}</select></label>
          <label>Variant / trim (optional)<input value={draft.variant} maxLength={80} placeholder="Enter from vehicle documents, or leave unknown" onChange={event => update('variant', event.target.value)} /></label>
          <div className="bikecare-field"><label htmlFor={`${listId}-powertrain`}>Powertrain</label>
            <select id={`${listId}-powertrain`} value={draft.powertrain} onChange={event => update('powertrain', event.target.value)}>{powertrains.map(value => <option key={value}>{value}</option>)}</select></div>
          <p className="bikecare-small">{onboarding ? 'Year and variant can stay unknown. Entered details are not catalogue-verified.' : '1970–present is the entry range, not proof that every listed model existed in every year. Use vehicle documents; unknown values stay unknown.'}</p>
        </>}
        {step === 3 && <>
          <p className="bikecare-small">{draft.manufacturer} / {draft.model} / {draft.year || 'Year unknown'} / {draft.powertrain}</p>
          <div className="bikecare-field-pair"><label>Odometer (km)<input type="number" inputMode="numeric" value={draft.odometer} onChange={event => update('odometer', event.target.value)} /></label>
            {['Petrol', 'Diesel'].includes(draft.powertrain) && <label>Engine cc (optional)<input type="number" inputMode="decimal" value={draft.engineCapacity} onChange={event => update('engineCapacity', event.target.value)} /></label>}</div>
          <label>Vehicle identifier (optional)<input value={draft.identifier} maxLength={40} placeholder="Use a fictional label in this demo" onChange={event => update('identifier', event.target.value)} /></label>
          <label>Bike registration number (optional)<input value={draft.registration} maxLength={30} autoCapitalize="characters" spellCheck={false} placeholder="DEMO-REG-001" onChange={event => update('registration', event.target.value)} /></label>
          <label>Chassis / VIN number (optional)<input value={draft.chassis} maxLength={30} autoCapitalize="characters" spellCheck={false} placeholder="DEMO-CHASSIS-001" onChange={event => update('chassis', event.target.value)} /></label>
          <p className="bikecare-small">Use fictional numbers only. Unknown/unregistered is allowed. No registration lookup, VIN verification or history is created.</p>
        </>}
        {step === 4 && <>
          <article className="bikecare-app-card"><strong>{draft.manufacturer} / {draft.model}</strong><p className="bikecare-small">{draft.year || 'Year unknown'} / {draft.category} / Electric</p></article>
          <label>Battery kWh (optional)<input type="number" inputMode="decimal" value={draft.battery} onChange={event => update('battery', event.target.value)} /></label>
          <label>Charging connector<input value={draft.connector} maxLength={60} placeholder="Unknown is valid" onChange={event => update('connector', event.target.value)} /></label>
          <p className="bikecare-small">No engine-capacity or oil-change fields for EVs. Battery and charging faults require qualified EV service; no repair instructions or battery-health guarantee.</p>
          <p className="bikecare-small">Battery/connector data is rider-entered and unverified. Leave unknown values blank; do not infer charger fit or part compatibility.</p>
        </>}
        <button className="bikecare-primary" type="submit">{step === 4 || (step === 3 && draft.powertrain !== 'Electric') ? onboarding ? 'Review bike details' : 'Save demo vehicle' : 'Continue vehicle setup'}</button>
      </form>
      <button onClick={() => { setStep(value => value - 1); setError(''); }}>{step === 1 ? onboarding ? 'Use a sample bike instead' : 'Back to garage' : 'Previous setup step'}</button>
    </>}
  </>;
}
