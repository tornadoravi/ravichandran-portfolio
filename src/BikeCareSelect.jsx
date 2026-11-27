import React, { useEffect, useId, useRef, useState } from 'react';
import { BikeCareManufacturerLogo } from './BikeCareBrand.jsx';

export default function BikeCareSelect({ label, value, options, onChange, disabled = false, placeholder, initialOpen = false }) {
  const id = useId();
  const input = useRef(null);
  const root = useRef(null);
  const list = useRef(null);
  const [open, setOpen] = useState(initialOpen);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(-1);
  const [placement, setPlacement] = useState({ above: false, height: 240 });
  const matches = options.filter(option => option.toLowerCase().includes(query.trim().toLowerCase()));
  const manual = query.trim() && !options.some(option => option.toLowerCase() === query.trim().toLowerCase());
  const entries = [...matches, ...(manual ? [query.trim()] : [])];
  useEffect(() => {
    if (!open) return;
    const body = root.current.closest('.bikecare-app-body');
    function position() {
      const bounds = body.getBoundingClientRect();
      const field = root.current.getBoundingClientRect();
      const viewport = window.visualViewport;
      const top = Math.max(bounds.top, viewport?.offsetTop || 0);
      const bottom = Math.min(bounds.bottom, viewport ? viewport.offsetTop + viewport.height : window.innerHeight);
      const above = field.top - top - 6;
      const below = bottom - field.bottom - 6;
      const flip = below < 220 && above > below;
      setPlacement({ above: flip, height: Math.max(0, Math.min(240, flip ? above : below)) });
    }
    position();
    body.addEventListener('scroll', position);
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position);
    window.visualViewport?.addEventListener('resize', position);
    return () => {
      body.removeEventListener('scroll', position);
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position);
      window.visualViewport?.removeEventListener('resize', position);
    };
  }, [open]);
  function choose(index) {
    if (!entries[index]) return;
    onChange(entries[index]); setOpen(false); setActive(-1); input.current.focus();
  }
  function keys(event) {
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      if (!open && ['Home', 'End'].includes(event.key)) return;
      event.preventDefault(); setOpen(true);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? entries.length - 1
        : event.key === 'ArrowDown' ? Math.min(active + 1, entries.length - 1) : Math.max(active - 1, 0);
      setActive(next);
      list.current?.children[next]?.scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter' && open) {
      event.preventDefault();
      const exact = entries.findIndex(option => option.toLowerCase() === value.trim().toLowerCase());
      choose(active >= 0 ? active : exact >= 0 ? exact : 0);
    } else if (event.key === 'Escape') {
      event.preventDefault(); setOpen(false); setActive(-1);
    } else if (event.key === 'Tab') setOpen(false);
  }
  return <div ref={root} className="bikecare-select" onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) { setOpen(false); setActive(-1); }
  }}>
    <label htmlFor={`${id}-input`}>{label}</label>
    <div className="bikecare-select-control">
      {label === 'Manufacturer' && <BikeCareManufacturerLogo name={value} />}
      <input ref={input} id={`${id}-input`} role="combobox" aria-autocomplete="list" aria-expanded={open}
        aria-controls={open ? `${id}-list` : undefined} aria-activedescendant={open && active >= 0 ? `${id}-option-${active}` : undefined}
        autoComplete="off" autoCapitalize="none" spellCheck={false} disabled={disabled} value={value} placeholder={placeholder}
        maxLength={80} onFocus={() => { setQuery(''); setOpen(true); setActive(-1); }}
        onChange={event => { onChange(event.target.value); setQuery(event.target.value); setOpen(true); setActive(-1); }} onKeyDown={keys} />
      <button type="button" tabIndex={-1} disabled={disabled} aria-label={`Toggle ${label.toLowerCase()} options`} aria-expanded={open}
        onMouseDown={event => event.preventDefault()} onClick={() => {
          if (open) setOpen(false);
          else { input.current.focus(); setQuery(''); setOpen(true); }
        }}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg></button>
    </div>
    {open && <div className={`bikecare-select-panel${placement.above ? ' is-above' : ''}`} style={{ maxHeight: placement.height }}>
      <p className="bikecare-small">{label === 'Model' ? 'Suggestions for the selected manufacturer' : 'Search manufacturers or enter an unlisted name'}</p>
      <div ref={list} role="listbox" aria-label={`${label} options`} id={`${id}-list`}>
        {entries.map((option, index) => <button key={`${option}-${index}`} type="button" role="option" tabIndex={-1}
          id={`${id}-option-${index}`} aria-selected={value === option} data-active={active === index}
          onMouseDown={event => event.preventDefault()} onClick={() => choose(index)}>
          <span className="bikecare-select-option-label" data-manufacturer={label === 'Manufacturer'}>
            {label === 'Manufacturer' && !(manual && index === entries.length - 1) && <BikeCareManufacturerLogo name={option} />}
            <span>{manual && index === entries.length - 1 ? `Use "${option}"` : option}</span>
          </span>
          {manual && index === entries.length - 1 ? <small>Manual entry / unverified</small> : value === option && <small>Selected</small>}
        </button>)}
      </div>
      {!entries.length && <p className="bikecare-small">No suggestions. Type the name from your vehicle documents.</p>}
    </div>}
  </div>;
}
