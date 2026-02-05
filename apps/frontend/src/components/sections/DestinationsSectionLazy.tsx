/**
 * Lazy-loaded version of DestinationsSection
 * Use this if the section is below the fold for better initial page load performance
 * 
 * Usage in page.tsx:
 * import DestinationsSectionLazy from '@/components/sections/DestinationsSectionLazy';
 * 
 * Then use <DestinationsSectionLazy /> instead of <DestinationsSection />
 */

import dynamic from 'next/dynamic';

const DestinationsSection = dynamic(
  () => import('./DestinationsSection'),
  {
    loading: () => (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <div className="h-12 w-64 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-6 w-96 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex-[0_0_100%] md:flex-[0_0_calc(33.333%-16px)]"
              >
                <div className="aspect-3/4 bg-gray-200 rounded-xl animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    ssr: false,
  }
);

export default DestinationsSection;