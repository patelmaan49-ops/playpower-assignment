import { useMemo, useState } from 'react';
import { ArrowIcon, CalendarIcon } from '../icons';

export interface Range {
  start: Date | null;
  end: Date | null;
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const same = (a: Date | null, b: Date | null) => !!a && !!b && a.getTime() === b.getTime();
const day = (y: number, m: number, d: number) => new Date(y, m, d);

function startOfToday() {
  const t = new Date();
  return day(t.getFullYear(), t.getMonth(), t.getDate());
}

function Month({
  year,
  month,
  range,
  hover,
  today,
  onPick,
  onHover,
}: {
  year: number;
  month: number;
  range: Range;
  hover: Date | null;
  today: Date;
  onPick: (d: Date) => void;
  onHover: (d: Date | null) => void;
}) {
  const first = day(year, month, 1).getDay();
  const count = day(year, month + 1, 0).getDate();
  const label = day(year, month, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const end = range.end ?? (range.start && hover && hover > range.start ? hover : null);

  return (
    <div className="cal-month">
      <h3>{label}</h3>
      <div className="cal-grid" role="grid" aria-label={label}>
        {DAY_LABELS.map((l, i) => (
          <span key={i} className="cal-dow" aria-hidden="true">{l}</span>
        ))}
        {Array.from({ length: first }, (_, i) => <span key={`b${i}`} />)}
        {Array.from({ length: count }, (_, i) => {
          const d = day(year, month, i + 1);
          const past = d < today;
          const edge = same(d, range.start) || same(d, range.end);
          const between = !!range.start && !!end && d > range.start && d < end;
          const cls = ['cal-day', edge && 'edge', between && 'between', past && 'past']
            .filter(Boolean)
            .join(' ');
          return (
            <div key={i} className={`cal-cell${between ? ' between' : ''}${edge && end ? ' has-range' : ''}${same(d, range.start) && end ? ' range-start' : ''}${same(d, end) ? ' range-end' : ''}`}>
              <button
                type="button"
                className={cls}
                disabled={past}
                aria-label={d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                aria-pressed={edge}
                onClick={() => onPick(d)}
                onMouseEnter={() => onHover(d)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(d)}
                onBlur={() => onHover(null)}
              >
                {i + 1}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Calendar({ range, onChange }: { range: Range; onChange: (r: Range) => void }) {
  const today = useMemo(startOfToday, []);
  const [offset, setOffset] = useState(0);
  const [hover, setHover] = useState<Date | null>(null);

  const base = day(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const months = [0, 1].map((n) => day(base.getFullYear(), base.getMonth() + offset + n, 1));

  const pick = (d: Date) => {
    if (!range.start || range.end || d <= range.start) onChange({ start: d, end: null });
    else onChange({ start: range.start, end: d });
  };

  return (
    <div className="calendar">
      <div className="cal-head">
        <div>
          <h2>{range.start && range.end ? `${nights(range)} nights in Candolim` : range.start ? 'Select checkout date' : 'Select check-in date'}</h2>
          <p className="muted-text">
            {range.start && range.end ? `${fmt(range.start)} - ${fmt(range.end)}` : 'Add your travel dates for exact pricing'}
          </p>
        </div>
      </div>
      <div className="cal-body">
        <button
          type="button"
          className="cal-nav prev"
          aria-label="Previous month"
          disabled={offset === 0}
          onClick={() => setOffset(offset - 1)}
        >
          <ArrowIcon width="12" height="12" />
        </button>
        <button type="button" className="cal-nav next" aria-label="Next month" onClick={() => setOffset(offset + 1)}>
          <ArrowIcon width="12" height="12" style={{ transform: 'rotate(180deg)' }} />
        </button>
        <div className="cal-months">
          {months.map((m) => (
            <Month
              key={`${m.getFullYear()}-${m.getMonth()}`}
              year={m.getFullYear()}
              month={m.getMonth()}
              range={range}
              hover={hover}
              today={today}
              onPick={pick}
              onHover={setHover}
            />
          ))}
        </div>
      </div>
      <div className="cal-foot">
        <CalendarIcon width="24" height="24" className="cal-kb" />
        <button type="button" className="link-btn" onClick={() => onChange({ start: null, end: null })}>
          Clear dates
        </button>
      </div>
    </div>
  );
}

export const fmt = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
export const nights = (r: Range) =>
  r.start && r.end ? Math.round((r.end.getTime() - r.start.getTime()) / 86400000) : 0;
