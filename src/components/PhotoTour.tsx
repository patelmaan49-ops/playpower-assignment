import { useEffect, useRef, useState } from 'react';
import { ArrowIcon, HeartIcon, ShareIcon } from '../icons';
import { photoGroups } from '../data';
import { useModal } from '../hooks';

const offsets = photoGroups.map((_, i) =>
  photoGroups.slice(0, i).reduce((sum, g) => sum + g.photos.length, 0),
);

interface Props {
  target?: string;
  inert: boolean;
  onClose: () => void;
  onPhoto: (index: number) => void;
}

export function PhotoTour({ target, inert, onClose, onPhoto }: Props) {
  const ref = useModal<HTMLDivElement>(!inert);
  const [active, setActive] = useState(photoGroups[0].id);
  const scrolling = useRef(false);

  const scrollTo = (id: string, smooth = true) => {
    const el = ref.current?.querySelector<HTMLElement>(`#tour-${id}`);
    if (!el || !ref.current) return;
    scrolling.current = true;
    setActive(id);
    ref.current.scrollTo({ top: el.offsetTop - 200, behavior: smooth ? 'smooth' : 'instant' });
    window.setTimeout(() => (scrolling.current = false), 600);
  };

  useEffect(() => {
    const group = photoGroups.find((g) => g.photos.some((p) => p.src === target));
    if (group) scrollTo(group.id, false);
  }, [target]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const onScroll = () => {
      if (scrolling.current) return;
      const line = root.scrollTop + 240;
      let current = photoGroups[0].id;
      for (const g of photoGroups) {
        if (root.querySelector<HTMLElement>(`#tour-${g.id}`)!.offsetTop <= line) current = g.id;
      }
      setActive(current);
    };
    root.addEventListener('scroll', onScroll, { passive: true });
    return () => root.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="tour" ref={ref} role="dialog" aria-modal="true" aria-label="Photo tour" tabIndex={-1} inert={inert}>
      <div className="tour-top">
        <button type="button" className="tour-back" aria-label="Close photo tour" onClick={onClose}>
          <ArrowIcon width="18" height="18" />
        </button>
        <div className="title-actions">
          <button type="button" className="text-action"><ShareIcon width="16" height="16" /><span>Share</span></button>
          <button type="button" className="text-action"><HeartIcon width="16" height="16" /><span>Save</span></button>
        </div>
      </div>
      <div className="tour-inner">
        <h2 className="tour-title">Photo tour</h2>
      </div>
      <div className="tour-tabs-wrap">
        <div className="tour-tabs" role="tablist" aria-label="Rooms">
          {photoGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={active === g.id}
              className={`tour-tab${active === g.id ? ' active' : ''}`}
              onClick={() => scrollTo(g.id)}
            >
              <span className="tab-thumb"><img src={g.photos[0].src} alt="" /></span>
              <span className="tab-label">{g.title}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="tour-inner tour-sections">
        {photoGroups.map((g, gi) => (
          <section key={g.id} id={`tour-${g.id}`} className="tour-section">
            <div className="tour-meta">
              <h3>{g.title}</h3>
              <p>{g.subtitle}</p>
            </div>
            <div className="tour-photos">
              {g.photos.map((p, pi) => (
                <button
                  key={p.src}
                  type="button"
                  className={`tour-photo${g.photos.length % 2 === 1 && pi === g.photos.length - 1 && g.photos.length > 1 ? ' wide' : ''}`}
                  aria-label={`View ${g.title} photo ${pi + 1} of ${g.photos.length}`}
                  onClick={() => onPhoto(offsets[gi] + pi)}
                >
                  <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
