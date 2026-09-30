import { listing } from '../data';
import { GlobeIcon } from '../icons';

export function Footer() {
  return (
    <footer className="footer">
      <div className="page-wrap">
        <div className="footer-cols">
          {listing.footer.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l}><a href="#top">{l}</a></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer-bar">
          <div className="legal">
            <span>© 2026 Airbnb, Inc.</span>
            {['Privacy', 'Terms', 'Sitemap', 'Company details'].map((l) => (
              <span key={l}>
                <span aria-hidden="true">·</span> <a href="#top">{l}</a>
              </span>
            ))}
          </div>
          <div className="locale">
            <button type="button"><GlobeIcon width="16" height="16" /> English (IN)</button>
            <button type="button">₹ INR</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
