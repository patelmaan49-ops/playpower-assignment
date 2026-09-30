import { Circle, MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { listing } from '../data';

export function MapSection() {
  const { center, place, text } = listing.location;
  return (
    <section className="page-wrap block map-section">
      <h2>Where you'll be</h2>
      <div className="map-box">
        <MapContainer center={center} zoom={14} zoomControl={false} scrollWheelZoom={false} attributionControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Circle center={center} radius={600} pathOptions={{ color: '#e61e4d', fillColor: '#e61e4d', fillOpacity: 0.15, weight: 2 }} />
          <ZoomControl position="topleft" />
        </MapContainer>
      </div>
      <h3 className="place">{place}</h3>
      <p>{text}</p>
    </section>
  );
}
