import { allPhotos } from '../data';
import { useModal } from '../hooks';
import { ArrowIcon, CloseIcon } from '../icons';

interface Props {
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}

export function Lightbox({ index, onClose, onStep }: Props) {
  const ref = useModal<HTMLDivElement>();
  const photo = allPhotos[index];

  return (
    <div className="lightbox" ref={ref} role="dialog" aria-modal="true" aria-label="Photo viewer" tabIndex={-1}>
      <div className="lb-top">
        <button type="button" className="lb-btn" aria-label="Close photo viewer" onClick={onClose}>
          <CloseIcon width="16" height="16" />
        </button>
        <div className="lb-count" aria-live="polite">{index + 1} / {allPhotos.length}</div>
        <span className="lb-spacer" />
      </div>
      <div className="lb-stage">
        <button type="button" className="lb-btn lb-arrow" aria-label="Previous photo" onClick={() => onStep(-1)}>
          <ArrowIcon width="16" height="16" />
        </button>
        <img key={photo.src} src={photo.src} alt={photo.alt} />
        <button type="button" className="lb-btn lb-arrow" aria-label="Next photo" onClick={() => onStep(1)}>
          <ArrowIcon width="16" height="16" style={{ transform: 'rotate(180deg)' }} />
        </button>
      </div>
      <div className="lb-caption">{photo.alt}</div>
    </div>
  );
}
