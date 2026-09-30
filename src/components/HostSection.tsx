import { listing } from '../data';
import { ShieldIcon, StarIcon } from '../icons';

export function HostSection() {
  const { host } = listing;
  return (
    <section className="page-wrap block host-section">
      <h2>Meet your host</h2>
      <div className="host-layout">
        <div className="host-left">
          <div className="host-card">
            <div className="host-card-id">
              <div className="host-avatar">
                <img src={host.avatar} alt={host.name} width="88" height="88" />
                <span className="host-badge" aria-hidden="true">
                  <svg viewBox="0 0 32 32" width="24" height="24">
                    <circle cx="16" cy="16" r="16" fill="#E61E4D" />
                    <path d="m9.5 16.5 4.5 4.5 8.5-9" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <h3>{host.name}</h3>
              <div className="muted-text small">Host</div>
            </div>
            <dl className="host-stats">
              <div><dt>Reviews</dt><dd>{host.reviews}</dd></div>
              <div>
                <dt>Rating</dt>
                <dd>{host.rating}<StarIcon width="10" height="10" /></dd>
              </div>
              <div><dt>Years hosting</dt><dd>{host.years}</dd></div>
            </dl>
          </div>
          <ul className="host-facts">
            {host.facts.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
        <div className="host-right">
          <h3>Co-Hosts</h3>
          <ul className="cohosts">
            {host.coHosts.map((c) => (
              <li key={c.name}>
                {c.avatar ? <img src={c.avatar} alt="" width="32" height="32" /> : <span className="initial">{c.initial}</span>}
                <span>{c.name}</span>
              </li>
            ))}
          </ul>
          <h3>Host details</h3>
          {host.response.map((r) => <p key={r} className="host-detail">{r}</p>)}
          <button type="button" className="solid-btn">Message host</button>
          <div className="protect">
            <ShieldIcon width="24" height="24" />
            <p>To help protect your payment, always use Airbnb to send money and communicate with hosts.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
