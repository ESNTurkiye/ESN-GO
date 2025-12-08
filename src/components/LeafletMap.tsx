"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Harita Merkezi
const INITIAL_VIEW: [number, number] = [39.0, 35.5]; 
const INITIAL_ZOOM = 6;

const LeafletMap = () => {
    const mapRef = useRef<L.Map | null>(null);
    const geoJsonLayer = useRef<L.GeoJSON | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    // --- STİL AYARLARI ---
    // MapChart gibi görünmesi için renkler
    const defaultStyle = {
        fillColor: '#e0e0e0', // İllerin normal rengi (Açık Gri)
        weight: 1,            // Sınır çizgi kalınlığı
        opacity: 1,
        color: '#ffffff',     // Sınır çizgi rengi (Beyaz)
        fillOpacity: 1
    };

    const hoverStyle = {
        fillColor: '#cfcfcf', // Mouse üzerine gelinceki renk (Koyu Gri)
        weight: 2,
        color: '#666',
        fillOpacity: 1
    };

    const selectedStyle = {
        fillColor: '#D32F2F', // Seçilen ilin rengi (Kırmızı/ESN Rengi)
        color: '#fff',
        weight: 2,
        fillOpacity: 1
    };

    useEffect(() => {
        if (!mapRef.current) {
            // 1. Haritayı Başlat (Arka planı beyaz yapalım)
            const map = L.map('mapid', { 
                center: INITIAL_VIEW, 
                zoom: INITIAL_ZOOM,
                zoomControl: true,
                attributionControl: false 
            });

            // MapChart tarzı için TileLayer (Sokak Haritası) EKLEMİYORUZ veya çok sade ekliyoruz.
            // Eğer tamamen boş beyaz zemin isterseniz aşağıdaki L.tileLayer kısmını silebilirsiniz.
            // Ama hafif bir zemin iyidir:
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(map);

            mapRef.current = map;

            // 2. GeoJSON Verisini Yükle ve Çiz
            fetch('/data/turkey.json') // public/data/turkey.json yolundan okur
                .then(res => res.json())
                .then(data => {
                    if (!mapRef.current) return;

                    const layer = L.geoJSON(data, {
                        style: (feature) => defaultStyle, // Varsayılan stil
                        
                        onEachFeature: (feature, layer) => {
                            const cityName = feature.properties.name;
                            layer.bindTooltip(cityName, {
                                permanent: true,   // İsim hep açık olsun mu? (Evet: true, Hayır: false)
                                direction: "center", // Yazı ortada dursun
                                className: "bg-transparent border-0 shadow-none font-bold text-gray-700" // Yazı stili (Tailwind)
                            });
                            // --- ETKİLEŞİMLER ---
                            
                            // 1. Mouse üzerine gelince (Hover)
                            layer.on('mouseover', (e) => {
                                const currentLayer = e.target;
                                // Eğer seçili değilse rengi değiştir
                                if (currentLayer.feature.properties.name !== selectedCity) {
                                    currentLayer.setStyle(hoverStyle);
                                    currentLayer.bringToFront(); // Öne çıkar
                                }
                            });

                            // 2. Mouse gidince (Reset)
                            layer.on('mouseout', (e) => {
                                const currentLayer = e.target;
                                // Eğer seçili değilse eski rengine dön
                                if (currentLayer.feature.properties.name !== selectedCity) {
                                    // GeoJSON katmanını sıfırla
                                    geoJsonLayer.current?.resetStyle(currentLayer);
                                }
                            });

                            // 3. Tıklayınca (Click)
                            layer.on('click', (e) => {
                                // Tıklanan ilin ismini al (GeoJSON'da 'name' özelliği olmalı)
                                const cityName = feature.properties.name; 
                                setSelectedCity(cityName);
                                
                                // Haritayı o ile yaklaştır
                                map.fitBounds(e.target.getBounds());
                                
                                // Diğer tüm illeri varsayılan renge döndür, bunu kırmızı yap
                                geoJsonLayer.current?.eachLayer((l: any) => {
                                     geoJsonLayer.current?.resetStyle(l);
                                });
                                e.target.setStyle(selectedStyle);
                            });
                        }
                    }).addTo(map);

                    geoJsonLayer.current = layer;
                })
                .catch(err => console.error("Harita verisi yüklenemedi:", err));
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []); // Dependency array boş

    return (
        <div className="relative w-full h-full">
            {/* Seçilen Şehir Bilgisi Kutusu */}
            {selectedCity && (
                <div className="absolute top-4 right-4 z-[1000] bg-white p-4 rounded-lg shadow-xl border border-gray-200">
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
