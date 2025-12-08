"use client"; 

import React, { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Leaflet varsayılan ikonlarını düzeltmek için (Next.js'te sıkça gerekli olur)
import 'leaflet/dist/images/marker-icon-2x.png'; 
import 'leaflet/dist/images/marker-shadow.png'; 

// --- DİKKAT: GEOJSON VERİLERİ ---
// Bu mantığın çalışması için Türkiye'nin 7 Bölgesinin sınırlarını içeren GeoJSON verilerine ihtiyacınız var.
// Bu veri dosyalarını projenizin 'public' veya 'lib' klasörüne eklemelisiniz.
// Örnek GeoJSON yapısı:
// const turkeyRegionsGeoJSON = { type: 'FeatureCollection', features: [...] }; 
// const regionCitiesGeoJSON = { 'Marmara': {...}, 'Ege': {...}, ... }; 

// Türkiye merkezi ve başlangıç zoom seviyesi
const INITIAL_VIEW: [number, number] = [38.9637, 35.2433]; 
const INITIAL_ZOOM = 6;

const LeafletMap = () => {
    const mapRef = useRef<L.Map | null>(null);
    const [activeLayer, setActiveLayer] = useState<L.GeoJSON | null>(null);
    const [activeRegion, setActiveRegion] = useState<string | null>(null);

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
    }, []);

    // --- HARİTA ÇİZİM MANTIKLARI ---

    // 1. Türkiye Bölge Sınırlarını Gösteren Fonksiyon
    const renderTurkeyRegions = (map: L.Map) => {
        // Eski katmanı (eğer varsa) kaldır
        if (activeLayer) map.removeLayer(activeLayer);
        setActiveRegion(null);

        // Örnek bir tıklama ve stil fonksiyonu:
        const regionLayer = L.geoJSON(turkeyRegionsGeoJSON as any, { // GeoJSON verinizi buraya ekleyin
            style: (feature) => ({
                fillColor: 'rgba(50, 150, 255, 0.4)',
                weight: 2,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.7
            }),
            onEachFeature: (feature, layer) => {
                const regionName = feature.properties.name; // GeoJSON verisinde bölge adı olduğunu varsayalım
                layer.bindPopup(`<h3>${regionName} Bölgesi</h3><p>Tıklayınca şehirlere odaklan.</p>`);
                
                layer.on({
                    click: () => handleRegionClick(regionName, feature.properties.center, 8) // Merkez koordinat ve zoom seviyesi
                });
            }
        }).addTo(map);

        setActiveLayer(regionLayer);
        map.flyToBounds(regionLayer.getBounds()); // Haritayı Türkiye'ye sığdır
    };

    // 2. Bölgeye Tıklandığında Şehirlere Odaklanma Fonksiyonu
    const handleRegionClick = (regionName: string, coords: [number, number], zoomLevel: number) => {
        setActiveRegion(regionName);
        
        if (mapRef.current) {
            mapRef.current.flyTo(coords, zoomLevel); // Bölge merkezine odaklan
            
            // Eski bölge/Türkiye katmanını kaldır
            if (activeLayer) mapRef.current.removeLayer(activeLayer);

            // Yeni şehir sınırları katmanını yükle (Burada 'regionCitiesGeoJSON[regionName]' kullanılmalı)
            // Örnek:
            /*
            const cityLayer = L.geoJSON(regionCitiesGeoJSON[regionName] as any, { 
                 // ... şehir sınırları stil ve tıklama mantığı ...
            }).addTo(mapRef.current);
            setActiveLayer(cityLayer);
            */
            
            // Şimdilik sadece bölge merkezine zoom yapıyoruz.
        }
    };
    
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
                    className="absolute z-[1000] top-4 left-4 p-2 bg-white text-esn-dark-blue border rounded shadow-md hover:bg-gray-100 transition duration-150"
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
