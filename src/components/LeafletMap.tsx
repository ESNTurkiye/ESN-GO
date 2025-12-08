"use client"; 

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Placeholder GeoJSON for Turkey's 7 regions (simplified polygons)
const turkeyRegionsGeoJSON = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: { name: 'Marmara', center: [40.5, 28.5] },
            geometry: {
                type: 'Polygon',
                coordinates: [[[26.0, 39.5], [30.5, 39.5], [30.5, 41.5], [26.0, 41.5], [26.0, 39.5]]]
            }
        },
        {
            type: 'Feature',
            properties: { name: 'Ege', center: [38.5, 28.0] },
            geometry: {
                type: 'Polygon',
                coordinates: [[[26.0, 36.5], [30.0, 36.5], [30.0, 39.5], [26.0, 39.5], [26.0, 36.5]]]
            }
        },
        {
            type: 'Feature',
            properties: { name: 'Akdeniz', center: [36.8, 32.5] },
            geometry: {
                type: 'Polygon',
                coordinates: [[[30.0, 36.0], [36.5, 36.0], [36.5, 38.0], [30.0, 38.0], [30.0, 36.0]]]
            }
        },
        {
            type: 'Feature',
            properties: { name: 'İç Anadolu', center: [39.0, 33.0] },
            geometry: {
                type: 'Polygon',
                coordinates: [[[30.5, 37.5], [36.5, 37.5], [36.5, 41.0], [30.5, 41.0], [30.5, 37.5]]]
            }
        },
        {
            type: 'Feature',
            properties: { name: 'Karadeniz', center: [41.0, 35.0] },
            geometry: {
                type: 'Polygon',
                coordinates: [[[30.5, 40.5], [42.0, 40.5], [42.0, 42.0], [30.5, 42.0], [30.5, 40.5]]]
            }
        },
        {
            type: 'Feature',
            properties: { name: 'Doğu Anadolu', center: [39.5, 40.0] },
            geometry: {
                type: 'Polygon',
                coordinates: [[[38.0, 37.5], [44.0, 37.5], [44.0, 41.5], [38.0, 41.5], [38.0, 37.5]]]
            }
        },
        {
            type: 'Feature',
            properties: { name: 'Güneydoğu Anadolu', center: [37.5, 39.5] },
            geometry: {
                type: 'Polygon',
                coordinates: [[[36.5, 36.5], [44.5, 36.5], [44.5, 38.5], [36.5, 38.5], [36.5, 36.5]]]
            }
        }
    ]
};

// Türkiye merkezi ve başlangıç zoom seviyesi
const INITIAL_VIEW: [number, number] = [38.9637, 35.2433]; 
const INITIAL_ZOOM = 6;

const LeafletMap = () => {
    const mapRef = useRef<L.Map | null>(null);
    const [activeLayer, setActiveLayer] = useState<L.GeoJSON | null>(null);
    const [activeRegion, setActiveRegion] = useState<string | null>(null);
    const activeLayerRef = useRef<L.GeoJSON | null>(null);

    // Keep ref in sync with state
    useEffect(() => {
        activeLayerRef.current = activeLayer;
    }, [activeLayer]);

    // 2. Bölgeye Tıklandığında Şehirlere Odaklanma Fonksiyonu
    const handleRegionClick = useCallback((regionName: string, coords: [number, number], zoomLevel: number) => {
        setActiveRegion(regionName);
        
        if (mapRef.current) {
            mapRef.current.flyTo(coords, zoomLevel); // Bölge merkezine odaklan
            
            // Eski bölge/Türkiye katmanını kaldır
            if (activeLayerRef.current) mapRef.current.removeLayer(activeLayerRef.current);

            // Yeni şehir sınırları katmanını yükle (Burada 'regionCitiesGeoJSON[regionName]' kullanılmalı)
            // Örnek:
            /*
            const cityLayer = L.geoJSON(regionCitiesGeoJSON[regionName], { 
                 // ... şehir sınırları stil ve tıklama mantığı ...
            }).addTo(mapRef.current);
            setActiveLayer(cityLayer);
            */
            
            // Şimdilik sadece bölge merkezine zoom yapıyoruz.
        }
    }, []);

    // 1. Türkiye Bölge Sınırlarını Gösteren Fonksiyon
    const renderTurkeyRegions = useCallback((map: L.Map) => {
        // Eski katmanı (eğer varsa) kaldır
        if (activeLayerRef.current) map.removeLayer(activeLayerRef.current);
        setActiveRegion(null);

        // Örnek bir tıklama ve stil fonksiyonu:
        const regionLayer = L.geoJSON(turkeyRegionsGeoJSON as GeoJSON.FeatureCollection, {
            style: {
                fillColor: 'rgba(50, 150, 255, 0.4)',
                weight: 2,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.7
            },
            onEachFeature: (feature, layer) => {
                const regionName = feature.properties?.name; // GeoJSON verisinde bölge adı olduğunu varsayalım
                layer.bindPopup(`<h3>${regionName} Bölgesi</h3><p>Tıklayınca şehirlere odaklan.</p>`);
                
                layer.on({
                    click: () => handleRegionClick(regionName, feature.properties?.center, 8) // Merkez koordinat ve zoom seviyesi
                });
            }
        }).addTo(map);

        setActiveLayer(regionLayer);
        map.flyToBounds(regionLayer.getBounds()); // Haritayı Türkiye'ye sığdır
    }, [handleRegionClick]);

    useEffect(() => {
        // Haritayı başlat
        if (!mapRef.current) {
            mapRef.current = L.map('mapid', { center: INITIAL_VIEW, zoom: INITIAL_ZOOM });
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mapRef.current);
            
            renderTurkeyRegions(mapRef.current); // İlk harita görünümünü yükle
        }

        // Component kaldırıldığında haritayı temizle
        return () => {
             if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [renderTurkeyRegions]);

    // --- HARİTA ÇİZİM MANTIKLARI ---
    
    // Geri Dönme İşlemi
    const handleBackToCountry = () => {
        if (mapRef.current) {
            mapRef.current.flyTo(INITIAL_VIEW, INITIAL_ZOOM);
            renderTurkeyRegions(mapRef.current); // Türkiye bölgelerine geri dön
        }
    };
    

    return (
        <div className="relative">
            {/* Geri Butonu: Sadece bölge seçiliyken göster */}
            {activeRegion && (
                <button 
                    onClick={handleBackToCountry}
                    className="absolute z-1000 top-4 left-4 p-2 bg-white text-esn-dark-blue border rounded shadow-md hover:bg-gray-100 transition duration-150"
                >
                    ← {activeRegion} Bölgesinden Geri Dön
                </button>
            )}
            
            {/* Haritanın Yükleneceği Alan */}
            <div id="mapid" style={{ height: '80vh', width: '100%' }} />
        </div>
    );
};

export default LeafletMap;
