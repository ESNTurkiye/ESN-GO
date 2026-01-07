'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getOfficeStatus, formatTimeTR } from '@/lib/dateHelpers';
import { useTranslations } from '@/hooks/useTranslations';
import type { Office } from '@/components/map/types';

// Fix Leaflet default icon issue in Next.js
// Leaflet requires explicit icon configuration for Next.js SSR
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

/**
 * MapController Component
 * Automatically fits map bounds to show all office locations
 * Uses useMap hook to access map instance and fitBounds method
 */
const MapController = ({ locations }: { locations: Office[] }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length === 0) return;

    // Convert all coordinates to Leaflet format
    const points = locations.map(
      (loc) => [loc.coordinates.lat, loc.coordinates.lng] as [number, number]
    );

    // Create bounds from all points
    const bounds = L.latLngBounds(points);

    // Fit map to bounds with padding and animation
    map.fitBounds(bounds, {
      padding: [50, 50], // 50px padding on all sides
      maxZoom: 15, // Prevent zooming too close for single points
      animate: true, // Smooth animation
      duration: 1, // Animation duration in seconds
    });
  }, [locations, map]);

  return null; // This component doesn't render anything
};

const MapCaller = () => {
  const { t } = useTranslations();
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);

  // VERİYİ API'DEN ÇEKME İŞLEMİ
  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await fetch('/api/offices');
        if (!res.ok) throw new Error('Veri gelmedi');
        const data = await res.json();
        setOffices(data);
      } catch (err) {
        console.error('Harita verisi yüklenirken hata:', err);
        // Hata durumunda boş array set et
        setOffices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffices();
  }, []);

  useEffect(() => {
    // Ensure Leaflet icons are properly initialized
    if (typeof window !== 'undefined') {
      // Fix for default marker icon (if needed)
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
    }
  }, []);

  // Yükleniyorsa loading göster
  if (loading) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center bg-gray-100 text-gray-500 animate-pulse">
        {t('map.loading')}
      </div>
    );
  }

  // Default center: Turkey (Ankara) - used if no offices exist
  const defaultCenter: [number, number] = [39.9334, 32.8597]; // Ankara
  const defaultZoom = 6; // Country-level zoom

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      style={{ height: '500px', width: '100%', zIndex: 0 }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* MapController automatically fits bounds to all office locations */}
      <MapController locations={offices} />

      {offices.map((office) => {
        const status = getOfficeStatus(office.startTime, office.endTime);
        
        // Color coding based on status - using ESN official colors
        let markerColor = '#9ca3af'; // gray for closed
        if (status === 'active') {
          markerColor = '#00aeef'; // ESN Cyan (#00aeef) for active
        } else if (status === 'upcoming') {
          markerColor = '#f47b20'; // ESN Orange (#f47b20) for upcoming
        }

        const customIcon = createCustomIcon(markerColor);

        return (
          <Marker
            key={office.id}
            position={[office.coordinates.lat, office.coordinates.lng]}
            icon={customIcon}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-lg mb-1 text-gray-900">
                  {office.eventName}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {office.locationLabel}
                </p>

                <div className="mt-2 p-2 bg-gray-100 rounded text-center">
                  <span className="font-mono font-bold text-sm">
                    {formatTimeTR(office.startTime)} - {formatTimeTR(office.endTime)}
                  </span>
                </div>

                <div
                  className={`mt-2 text-center text-white text-xs font-bold py-1 px-2 rounded-full ${
                    status === 'active'
                      ? 'bg-esn-cyan'
                      : status === 'upcoming'
                      ? 'bg-esn-orange'
                      : 'bg-gray-400'
                  }`}
                >
                  {status === 'active'
                    ? t('map.status.active').toUpperCase()
                    : status === 'upcoming'
                    ? t('map.status.upcoming').toUpperCase()
                    : t('map.status.closed').toUpperCase()}
                </div>

                {office.note && (
                  <p className="mt-2 text-xs italic text-gray-500">{office.note}</p>
                )}

                <p className="mt-2 text-xs text-gray-600">
                  <span className="font-semibold">{t('map.popup.responsible')}:</span>{' '}
                  {office.instagram ? (
                    <a
                      href={`https://instagram.com/${office.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!text-esn-orange hover:!text-esn-magenta hover:underline transition-colors"
                    >
                      {office.pic}
                    </a>
                  ) : (
                    <span>{office.pic}</span>
                  )}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapCaller;

