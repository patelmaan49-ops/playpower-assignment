import { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Overview } from './components/Overview';
import { Reviews } from './components/Reviews';
import { MapSection } from './components/MapSection';
import { HostSection } from './components/HostSection';
import { ThingsToKnow } from './components/ThingsToKnow';
import { Footer } from './components/Footer';
import { PhotoTour } from './components/PhotoTour';
import { Lightbox } from './components/Lightbox';
import { allPhotos } from './data';

export function App() {
  const [tourOpen, setTourOpen] = useState(false);
  const [tourTarget, setTourTarget] = useState<string | undefined>();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openTour = useCallback((src?: string) => {
    setTourTarget(src);
    setTourOpen(true);
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setLightbox((i) => (i === null ? i : (i + dir + allPhotos.length) % allPhotos.length));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox !== null) {
        if (e.key === 'ArrowRight') step(1);
        else if (e.key === 'ArrowLeft') step(-1);
        else if (e.key === 'Escape') setLightbox(null);
      } else if (tourOpen && e.key === 'Escape') {
        setTourOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox, tourOpen, step]);

  return (
    <>
      <div inert={tourOpen}>
        <Header />
        <main>
          <Hero onOpen={openTour} />
          <Overview />
          <Reviews />
          <MapSection />
          <HostSection />
          <ThingsToKnow />
        </main>
        <Footer />
      </div>
      {tourOpen && (
        <PhotoTour
          inert={lightbox !== null}
          target={tourTarget}
          onClose={() => setTourOpen(false)}
          onPhoto={setLightbox}
        />
      )}
      {lightbox !== null && (
        <Lightbox index={lightbox} onClose={() => setLightbox(null)} onStep={step} />
      )}
    </>
  );
}
