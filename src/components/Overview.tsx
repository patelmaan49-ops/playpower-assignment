import { useState, type FunctionComponent, type SVGProps } from 'react';
import { listing } from '../data';
import {
  CameraIcon, CoOffIcon, DoorIcon, KeyIcon, KitchenIcon, ParkingIcon, PetsIcon,
  PoolIcon, SmokeOffIcon, StarIcon, TubIcon, WifiIcon, WorkspaceIcon,
} from '../icons';
import { BookingCard } from './BookingCard';
import { Calendar, type Range } from './Calendar';

type Icon = FunctionComponent<SVGProps<SVGSVGElement>>;

const ICONS: Record<string, Icon> = {
  door: DoorIcon, key: KeyIcon, pool: PoolIcon, kitchen: KitchenIcon, wifi: WifiIcon,
  workspace: WorkspaceIcon, parking: ParkingIcon, tub: TubIcon, pets: PetsIcon,
  camera: CameraIcon, co: CoOffIcon, smoke: SmokeOffIcon,
};

export function Overview() {
  const [range, setRange] = useState<Range>({ start: new Date(2026, 6, 15), end: new Date(2026, 6, 19) });
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="page-wrap overview">
      <div className="overview-main">
        <section className="block intro">
          <h2>{listing.subtitle}</h2>
          <p>{listing.facts.join(' · ')}</p>
        </section>

        <section className="block">
          <div className="favourite-strip">
            <div className="fav-badge">
              <span>Guest</span>
              <span>favourite</span>
            </div>
            <p className="fav-text">One of the most loved homes on Airbnb, according to guests</p>
            <div className="fav-stat">
              <strong>{listing.rating}</strong>
              <span className="stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, i) => <StarIcon key={i} width="8" height="8" />)}
              </span>
            </div>
            <div className="fav-stat">
              <strong>{listing.reviewCount}</strong>
              <a href="#reviews">Reviews</a>
            </div>
          </div>
        </section>

        <section className="block host-row">
          <img src={listing.host.avatar} alt="" width="40" height="40" />
          <div>
            <div className="host-row-name">Hosted by {listing.host.name}</div>
            <div className="muted-text">{listing.host.years} years hosting</div>
          </div>
        </section>

        <section className="block highlights">
          {listing.highlights.map((h) => {
            const I = ICONS[h.icon];
            return (
              <div className="highlight" key={h.title}>
                <I width="24" height="24" />
                <div>
                  <div className="highlight-title">{h.title}</div>
                  <div className="muted-text">{h.text}</div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="block description">
          <div className="translate-note">
            Some info has been automatically translated. <button type="button" className="link-btn">Show original</button>
          </div>
          <p className={expanded ? '' : 'clamp'}>{listing.description}</p>
          {!expanded && (
            <button type="button" className="link-btn more" onClick={() => setExpanded(true)}>
              Show more &gt;
            </button>
          )}
        </section>

        <section className="block">
          <h2>Where you'll sleep</h2>
          <div className="sleep-grid">
            {listing.beds.map((b) => (
              <figure key={b.name} className="sleep-card">
                <img src={b.photo} alt={b.name} loading="lazy" />
                <figcaption>
                  <div className="highlight-title">{b.name}</div>
                  <div className="muted-text">{b.text}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="block">
          <h2>What this place offers</h2>
          <ul className="amenity-grid">
            {listing.amenities.map((a) => {
              const I = ICONS[a.icon];
              return (
                <li key={a.label} className={a.unavailable ? 'off' : ''}>
                  <I width="24" height="24" />
                  <span>{a.label}</span>
                </li>
              );
            })}
          </ul>
          <button type="button" className="outline-btn">Show all {listing.amenityTotal} amenities</button>
        </section>

        <section className="block last">
          <Calendar range={range} onChange={setRange} />
        </section>
      </div>
      <BookingCard range={range} />
    </div>
  );
}
