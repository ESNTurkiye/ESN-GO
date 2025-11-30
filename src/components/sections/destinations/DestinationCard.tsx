import Image from 'next/image';
import { Destination } from './types';

interface DestinationCardProps {
    destination: Destination;
    isPartial?: boolean;
    isActive?: boolean;
    width: string;
    priority?: boolean;
    sizes: string;
}

export const DestinationCard = ({
    destination,
    isPartial = false,
    isActive = true,
    width,
    priority = false,
    sizes,
}: DestinationCardProps) => {
    const opacity = isPartial ? 'opacity-40' : isActive ? 'opacity-100' : 'opacity-50';

    return (
        <div
            className={`
                shrink-0 ${width} transition-opacity duration-500 ease-in-out
                ${opacity}
            `}
        >
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-300 ease-out hover:shadow-2xl group">
                {/* Image Layer */}
                <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes={sizes}
                    priority={priority}
                    quality={85}
                    unoptimized={true}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content Layer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="text-3xl md:text-2xl lg:text-3xl font-oswald font-bold text-white mb-2 uppercase">
                        {destination.name}
                    </h3>
                    <p className="text-gray-200 text-sm font-lato line-clamp-2">
                        {destination.desc}
                    </p>
                </div>
            </div>
        </div>
    );
};