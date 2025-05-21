'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon not loading in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const defaultPosition: [number, number] = [45.75, 4.85];

interface Disponibilite {
  id: number;
  titre: string;
  description: string;
  type: string;
  utilisateur: string;
  localisation: { lat: number; lng: number };
  categorie: string;
  date: string;
}

export default function RecherchePage() {
  const [data, setData] = useState<Disponibilite[]>([]);
  const [filtered, setFiltered] = useState<Disponibilite[]>([]);
  const [filter, setFilter] = useState({ type: '', motCle: '' });

  useEffect(() => {
    fetch('/api/disponibilites')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setFiltered(json);
      });
  }, []);

  const handleFilter = () => {
    const f = data.filter(item =>
      (!filter.type || item.type === filter.type) &&
      (!filter.motCle || item.titre.toLowerCase().includes(filter.motCle.toLowerCase()))
    );
    setFiltered(f);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Trouver du matériel ou des compétences</h1>

      <div className="flex gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
        >
          <option value="">Tous types</option>
          <option value="matériel">Matériel</option>
          <option value="compétence">Compétence</option>
        </select>
        <input
          type="text"
          placeholder="Mot-clé"
          className="border p-2 rounded"
          value={filter.motCle}
          onChange={(e) => setFilter({ ...filter, motCle: e.target.value })}
        />
        <button onClick={handleFilter} className="bg-blue-600 text-white px-4 py-2 rounded">
          Filtrer
        </button>
      </div>

      <MapContainer center={defaultPosition} zoom={12} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filtered.map((item) => (
          <Marker
            key={item.id}
            position={[item.localisation.lat, item.localisation.lng]}
          >
            <Popup>
              <strong>{item.titre}</strong><br />
              {item.description}<br />
              <em>Par {item.utilisateur}</em>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
