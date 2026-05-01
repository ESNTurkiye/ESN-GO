import type { ExperienceItem } from "./data";

interface ExperienceCardProps {
    item: ExperienceItem;
    isActive: boolean;
    onHover: (id: string) => void;
}

export default function ExperienceCard({
    item,
    isActive,
    onHover,
}: ExperienceCardProps) {
    return (
        <button
            type="button"
            onMouseEnter={() => onHover(item.id)}
            onFocus={() => onHover(item.id)}
            className="flex h-full min-h-[260px] w-full flex-col text-left cursor-pointer bg-white"
        >
            <div
                className="h-32 shrink-0 rounded-xl border border-esn-cyan/30 bg-esn-cyan/5 px-4 py-3"
            >
                <div className="flex h-full flex-col justify-between">
                    <span className="text-[10px] sm:text-xs uppercase tracking-wide font-semibold text-esn-dark-blue/80 truncate">
                        {item.city}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-esn-dark-blue/60">
                        Image Placeholder
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="font-semibold text-esn-dark-blue text-sm sm:text-base leading-snug line-clamp-2">
                    {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-3">
                    {item.description}
                </p>
            </div>
        </button>
    );
}