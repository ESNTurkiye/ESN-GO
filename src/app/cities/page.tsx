// src/app/cities/page.tsx
"use client";

import React from 'react';
import dynamic from 'next/dynamic'; 

// Next.js'e harita bileşenini yalnızca tarayıcıda (Client-Side) yüklemesini söylüyoruz.
// Bu, Leaflet gibi DOM'a erişmesi gereken kütüphaneler için zorunludur.
const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
    ssr: false, 
    loading: () => <p>Harita yükleniyor...</p>, 
});

const CitiesPage = () => {
    return (
        <div style={{ padding: '20px', minHeight: '100vh', width: '100%' }}>
            <h1 className="text-3xl font-bold mb-6">Türkiye&apos;yi Keşfet: ESN Şehir Rehberi</h1>
            
            {/* Dinamik olarak yüklenen harita bileşeni */}
            <LeafletMap />
            
        </div>
    );
};

export default CitiesPage;
