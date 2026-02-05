'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import ArrowIcon from '../ui/ArrowIcon';

export default function FoodSection() {
  const [showAll, setShowAll] = useState(false);
  
  const foodSpots = [
    {
      name: "Sultanahmet Köftecisi",
      type: "Traditional Turkish",
      price: "₺₺",
      discount: "ESNcard -20%",
      image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783"
    },
    {
      name: "Simit Sarayı",
      type: "Fast Food & Breakfast",
      price: "₺",
      discount: "Student Menu",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
    },
    {
      name: "Çiya Sofrası",
      type: "Anatolian Cuisine",
      price: "₺₺",
      discount: "ESNcard -15%",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
    },
    {
      name: "Karaköy Lokantası",
      type: "Turkish Home Cooking",
      price: "₺₺",
      discount: "ESNcard -15%",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947"
    },
    {
      name: "Midpoint",
      type: "Cafe & Brunch",
      price: "₺₺",
      discount: "Student -10%",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
    },
    {
      name: "Tarihi Eminönü Balık Ekmek",
      type: "Street Food",
      price: "₺",
      discount: "Cash Discount",
      image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6"
    }
  ];

  const visibleSpots = showAll ? foodSpots : foodSpots.slice(0, 4);

  return (
    <section className="section-padding bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto container-responsive">
        <div className="mb-12">
          <span className="inline-block w-3 h-3 rounded-full bg-esn-orange mr-3"></span>
          <span className="text-sm font-oswald font-bold text-esn-orange  tracking-wider">Food & Culture</span>
          <h2 className="fluid-heading-lg font-oswald font-bold text-esn-dark-blue mt-4 mb-4 ">
            Budget-Friendly Eats
          </h2>
          <p className="fluid-body-md text-gray-600 font-lato">
            Student-approved restaurants and street food - all wallet-friendly
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleSpots.map((spot, index) => (
            <article 
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              aria-label={`${spot.name} restaurant`}
            >
              <div className="relative h-48 sm:h-52">
                <Image 
                  src={spot.image}
                  alt={`${spot.name} - ${spot.type} restaurant`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                />
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-esn-orange text-white text-xs font-oswald font-bold  rounded-full shadow-md">
                  {spot.discount}
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-oswald font-bold text-esn-dark-blue mb-2">{spot.name}</h3>
                <p className="text-gray-600 font-lato mb-3 text-sm sm:text-base">{spot.type}</p>
                <div className="flex justify-between items-center">
                  <span className="text-esn-orange font-oswald font-bold text-lg">{spot.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {!showAll && foodSpots.length > 4 && (
          <div className="flex justify-center mt-12">
            <Button 
              variant="orange" 
              size="lg"
              onClick={() => setShowAll(true)}
              className="touch-target flex items-center gap-2"
              aria-label="View full budget eats guide"
              aria-expanded={false}
            >
              View Full Budget Eats Guide
              <ArrowIcon className="w-5 h-5" />
            </Button>
          </div>
        )}

        {showAll && (
          <div className="flex justify-center mt-12">
            <Button 
              variant="ghost" 
              size="lg"
              onClick={() => setShowAll(false)}
              className="touch-target"
              aria-label="Show fewer food spots"
              aria-expanded={true}
            >
              Show Less
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}