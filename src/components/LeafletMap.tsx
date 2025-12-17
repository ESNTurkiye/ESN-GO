"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Harita Merkezi
const INITIAL_VIEW: [number, number] = [39.0, 35.5]; 
const INITIAL_ZOOM = 6;

// Define a type for GeoJSON layers with feature properties
type GeoJSONLayer = L.Layer & {
    feature?: {
        properties?: {
            name?: string;
        };
    };
    setStyle?: (style: L.PathOptions) => void;
    bringToFront?: () => void;
    getBounds?: () => L.LatLngBounds;
    bindTooltip?: (content: string, options?: L.TooltipOptions) => void;
};

const LeafletMap = () => {
    const mapRef = useRef<L.Map | null>(null);
    const geoJsonLayer = useRef<L.GeoJSON | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const selectedCityRef = useRef<string | null>(null);

    // Keep ref in sync with state
    useEffect(() => {
        selectedCityRef.current = selectedCity;
    }, [selectedCity]);

    useEffect(() => {
        // Define styles
        const defaultStyle = {
            fillColor: '#e0e0e0',
            weight: 1,
            opacity: 1,
            color: '#ffffff',     
            fillOpacity: 1
        };

        const hoverStyle = {
            fillColor: '#cfcfcf', 
            weight: 2,
            color: '#666',
            fillOpacity: 1
        };

        const selectedStyle = {
            fillColor: '#D32F2F', 
            color: '#fff',
            weight: 2,
            fillOpacity: 1
        };

        if (!mapRef.current) {
           
            const map = L.map('mapid', { 
                center: INITIAL_VIEW, 
                zoom: INITIAL_ZOOM,
                zoomControl: true,
                attributionControl: false 
            });

            
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(map);

            mapRef.current = map;

            
            // Wait for map to be fully loaded before adding GeoJSON
            map.whenReady(() => {
                fetch('/data/turkey.json') 
                    .then(res => res.json())
                    .then(data => {
                        if (!mapRef.current) return;

                        const layer = L.geoJSON(data, {
                            style: () => defaultStyle, 
                            
                            onEachFeature: (feature, featureLayer) => {
                                // Type guard to ensure we have a proper layer
                                if (!featureLayer || typeof featureLayer.on !== 'function') return;
                                
                                // --- ETKİLEŞİMLER ---
                                
                                // 1. Mouse üzerine gelince (Hover)
                                featureLayer.on('mouseover', (e: L.LeafletMouseEvent) => {
                                    const currentLayer = e.target as GeoJSONLayer;
                                    // Güvenlik kontrolü ve tip kontrolü
                                    if (currentLayer && typeof currentLayer.setStyle === 'function' && 
                                        currentLayer.feature?.properties?.name !== selectedCityRef.current) {
                                        currentLayer.setStyle(hoverStyle);
                                        if (typeof currentLayer.bringToFront === 'function') {
                                            currentLayer.bringToFront();
                                        }
                                    }
                                });

                                // 2. Mouse gidince (Reset)
                                featureLayer.on('mouseout', (e: L.LeafletMouseEvent) => {
                                    const currentLayer = e.target as GeoJSONLayer;
                                    // Güvenlik kontrolü
                                    if (currentLayer && currentLayer.feature?.properties?.name !== selectedCityRef.current) {
                                        // GeoJSON katmanını sıfırla
                                        geoJsonLayer.current?.resetStyle(currentLayer);
                                    }
                                });

                                // 3. Tıklayınca (Click)
                                featureLayer.on('click', (e: L.LeafletMouseEvent) => {
                                    const currentLayer = e.target as GeoJSONLayer;
                                    if (!currentLayer || !currentLayer.feature) return;
                                    
                                    // Tıklanan ilin ismini al (GeoJSON'da 'name' özelliği olmalı)
                                    const cityName = feature.properties.name; 
                                    setSelectedCity(cityName);
                                    
                                    // Haritayı o ile yaklaştır
                                    if (typeof currentLayer.getBounds === 'function') {
                                        map.fitBounds(currentLayer.getBounds());
                                    }
                                    
                                    // Diğer tüm illeri varsayılan renge döndür, bunu kırmızı yap
                                    geoJsonLayer.current?.eachLayer((l: L.Layer) => {
                                         geoJsonLayer.current?.resetStyle(l);
                                    });
                                    
                                    if (typeof currentLayer.setStyle === 'function') {
                                        currentLayer.setStyle(selectedStyle);
                                    }
                                });
                            }
                        });

                        // Add layer to map FIRST
                        layer.addTo(map);
                        
                        // THEN bind tooltips after layer is on the map
                        layer.eachLayer((featureLayer: L.Layer) => {
                            const geoLayer = featureLayer as GeoJSONLayer;
                            if (geoLayer && geoLayer.feature && typeof geoLayer.bindTooltip === 'function') {
                                const cityName = geoLayer.feature.properties?.name;
                                if (cityName) {
                                    geoLayer.bindTooltip(cityName, {
                                        permanent: false,   // Sadece hover'da görünsün
                                        direction: "center", // Yazı ortada dursun
                                        className: "bg-white/90 border border-gray-300 shadow-lg px-3 py-1 rounded font-bold text-gray-800 text-sm" // Daha belirgin stil
                                    });
                                }
                            }
                        });

                        geoJsonLayer.current = layer;
                    })
                    .catch(err => console.error("Harita verisi yüklenemedi:", err));
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []); // Empty dependency array - map initializes once

    return (
        <div className="relative w-full h-full">
            {/* Seçilen Şehir Bilgisi Kutusu */}
            {selectedCity && (
                <div className="absolute top-4 right-4 z-1000 bg-white p-4 rounded-lg shadow-xl border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800">{selectedCity}</h3>
                    <p className="text-sm text-gray-500">Bu şehri keşfetmeye hazır mısın?</p>
                    <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 w-full">
                        Etkinlikleri Gör
                    </button>
                </div>
            )}

            {/* Harita Alanı */}
            <div id="mapid" style={{ height: '80vh', width: '100%', backgroundColor: '#f8f9fa' }} />
        </div>
    );
};

export default LeafletMap;
