import { cn } from "@/_lib/utils";
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
            className={cn(
                "flex h-full min-h-[260px] w-full appearance-none flex-col text-left cursor-pointer bg-white transition-shadow",
                isActive && "ring-2 ring-esn-cyan ring-offset-2 ring-offset-white",
            )}
        >
            <div
                className="h-32 w-full shrink-0 rounded-xl border border-esn-cyan/30 bg-esn-cyan/5 px-4 py-3"
            >
                <div className="flex h-full flex-col justify-between">
                    <span className="text-xs uppercase tracking-wide font-semibold text-esn-dark-blue/80 truncate sm:text-sm">
                        {item.city}
                    </span>
                    <span className="text-sm font-medium text-esn-dark-blue/60 sm:text-base">
                        Image Placeholder
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="text-base font-semibold leading-snug text-esn-dark-blue line-clamp-2 sm:text-lg">
                    {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-3 sm:text-base">
                    {item.description}
                </p>
            </div>
        </button>
    );
}