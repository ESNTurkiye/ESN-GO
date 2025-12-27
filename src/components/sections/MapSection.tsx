'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from '@/hooks/useTranslations';
import MapSectionSkeleton from '@/components/sections/skeletons/MapSectionSkeleton';

// Dynamic import to prevent SSR issues with Leaflet
const MapCaller = dynamic(() => import('@/components/map/MapCaller'), {
  ssr: false,
  loading: () => <MapSectionSkeleton />,
});

export default function MapSection() {
  const { t } = useTranslations();

  return (
    <section id="map" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto container-responsive">
        <div className="mb-12 mt-8">
          <span className="inline-block w-3 h-3 rounded-full bg-esn-cyan mr-3"></span>
          <span className="text-sm font-oswald font-bold text-esn-cyan tracking-wider">
            {t('map.badge')}
          </span>
          <h2 className="fluid-heading-lg font-oswald font-bold text-esn-dark-blue mt-4 mb-4">
            {t('map.title')}
          </h2>
          <p className="fluid-body-md text-gray-600 font-lato max-w-2xl">
            {t('map.subtitle')}
          </p>
        </div>

        <div className="border-4 border-esn-cyan rounded-xl overflow-hidden shadow-lg">
          <MapCaller />
        </div>

        <div className="mt-6 flex flex-wrap gap-4 items-center justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-esn-cyan border-2 border-white shadow"></div>
            <span className="text-gray-700 font-lato">{t('map.status.active')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-esn-orange border-2 border-white shadow"></div>
            <span className="text-gray-700 font-lato">{t('map.status.upcoming')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-400 border-2 border-white shadow"></div>
            <span className="text-gray-700 font-lato">{t('map.status.closed')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

