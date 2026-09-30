import { useCallback, useRef, useState } from 'react';
import { useOutsideClose } from '../hooks';
import { ChevronIcon, FlagIcon } from '../icons';
import { fmt, type Range } from './Calendar';

const GUEST_ROWS = [
  { key: 'adults', label: 'Adults', hint: 'Age 13+', min: 1 },
  { key: 'children', label: 'Children', hint: 'Ages 2–12', min: 0 },
  { key: 'infants', label: 'Infants', hint: 'Under 2', min: 0 },
  { key: 'pets', label: 'Pets', hint: 'Bringing a service animal?', min: 0 },
] as const;

type Counts = Record<(typeof GUEST_ROWS)[number]['key'], number>;
const MAX_GUESTS = 3;

export function BookingCard({ range }: { range: Range }) {
  const [open, setOpen] = useState(false);
  const [counts, setCounts] = useState<Counts>({ adults: 1, children: 0, infants: 0, pets: 0 });
  const boxRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useOutsideClose(boxRef, open, close);

  const guests = counts.adults + counts.children;
  const summary = [
    `${guests} guest${guests > 1 ? 's' : ''}`,
    counts.infants && `${counts.infants} infant${counts.infants > 1 ? 's' : ''}`,
    counts.pets && `${counts.pets} pet${counts.pets > 1 ? 's' : ''}`,
  ]
    .filter(Boolean)
    .join(', ');

  const change = (key: keyof Counts, delta: number) =>
    setCounts((c) => ({ ...c, [key]: c[key] + delta }));

  return (
    <aside className="booking" aria-label="Reservation">
      <div className="booking-card">
        <div className="booking-fields" ref={boxRef}>
          <div className="booking-dates">
            <div className="booking-field">
              <span className="field-label">Check-in</span>
              <span className={range.start ? '' : 'placeholder'}>{range.start ? fmt(range.start) : 'Add date'}</span>
            </div>
            <div className="booking-field">
              <span className="field-label">Checkout</span>
              <span className={range.end ? '' : 'placeholder'}>{range.end ? fmt(range.end) : 'Add date'}</span>
            </div>
          </div>
          <button
            type="button"
            className="booking-field guests"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span>
              <span className="field-label">Guests</span>
              <span>{summary}</span>
            </span>
            <ChevronIcon width="16" height="16" className={open ? 'flip' : ''} />
          </button>
          {open && (
            <div className="guest-pop" role="dialog" aria-label="Guests">
              {GUEST_ROWS.map((row) => {
                const value = counts[row.key];
                const atMax = row.key !== 'infants' && row.key !== 'pets' && guests >= MAX_GUESTS;
                return (
                  <div className="guest-row" key={row.key}>
                    <div>
                      <div className="guest-name">{row.label}</div>
                      <div className="guest-hint">{row.hint}</div>
                    </div>
                    <div className="stepper">
                      <button
                        type="button"
                        aria-label={`Decrease ${row.label.toLowerCase()}`}
                        disabled={value <= row.min}
                        onClick={() => change(row.key, -1)}
                      >
                        −
                      </button>
                      <span aria-live="polite">{value}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${row.label.toLowerCase()}`}
                        disabled={atMax || value >= 5}
                        onClick={() => change(row.key, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
              <p className="guest-note">This place has a maximum of {MAX_GUESTS} guests, not including infants.</p>
              <button type="button" className="link-btn close-pop" onClick={close}>Close</button>
            </div>
          )}
        </div>
        <button type="button" className="reserve">Check availability</button>
      </div>
      <button type="button" className="report">
        <FlagIcon width="12" height="12" />
        <span>Report this listing</span>
      </button>
    </aside>
  );
}
