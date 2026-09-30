import { GlobeIcon, Logo, MenuIcon, SearchIcon } from '../icons';

export function Header() {
  return (
    <header className="header">
      <a className="header-logo" href="/" aria-label="Airbnb home">
        <Logo />
      </a>
      <div className="search-pill" role="search">
        <img src="/images/4aae4ed7-5939-4e76-b100-e69440ebeae4.png" alt="" width="48" height="48" />
        <button type="button" className="search-seg strong">Anywhere</button>
        <span className="search-sep" />
        <button type="button" className="search-seg strong">Anytime</button>
        <span className="search-sep" />
        <button type="button" className="search-seg muted">Add guests</button>
        <button type="button" className="search-go" aria-label="Search">
          <SearchIcon width="14" height="14" strokeWidth="4" />
        </button>
      </div>
      <nav className="header-nav">
        <button type="button" className="host-link">Become a host</button>
        <button type="button" className="round-btn" aria-label="Choose a language and currency">
          <GlobeIcon width="16" height="16" />
        </button>
        <button type="button" className="round-btn" aria-label="Main menu">
          <MenuIcon width="16" height="16" />
        </button>
      </nav>
    </header>
  );
}
