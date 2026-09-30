import { GridIcon, HeartIcon, ShareIcon } from '../icons';
import { heroPhotos, listing } from '../data';

export function Hero({ onOpen }: { onOpen: (src?: string) => void }) {
  return (
    <section className="page-wrap hero-section">
      <div className="title-row">
        <h1>{listing.title}</h1>
        <div className="title-actions">
          <button type="button" className="text-action">
            <ShareIcon width="16" height="16" />
            <span>Share</span>
          </button>
          <button type="button" className="text-action">
            <HeartIcon width="16" height="16" />
            <span>Save</span>
          </button>
        </div>
      </div>
      <div className="hero-grid">
        {heroPhotos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            className={`hero-cell hero-cell-${i}`}
            aria-label={`Open photo tour: ${photo.alt}`}
            onClick={() => onOpen(photo.src)}
          >
            <img src={photo.src} alt={photo.alt} decoding="async" />
          </button>
        ))}
        <button type="button" className="show-all" onClick={() => onOpen()}>
          <GridIcon width="16" height="16" />
          Show all photos
        </button>
      </div>
    </section>
  );
}
