import type { ExperienceItem } from "./data";

interface ExperienceCardProps {
    item: ExperienceItem;
    isActive: boolean;
    onSelect: (id: string) => void;
}

export default function ExperienceCard({
    item,
    isActive,
    onSelect,
}: ExperienceCardProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(item.id)}
            className={`w-full text-left rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer bg-white border ${
                isActive
                    ? "border-esn-magenta shadow-lg"
                    : "border-gray-200 shadow-sm hover:shadow-xl"
            }`}
        >
            <div className="h-24 bg-esn-cyan/10 border-b border-esn-cyan/30 flex items-center justify-between px-4">
                <span className="text-xs uppercase tracking-wide font-semibold text-esn-dark-blue/80">
                    {item.city}
                </span>
                <span className="text-xs rounded-full px-2 py-1 bg-esn-dark-blue text-white">
                    {item.transit}
                </span>
            </div>

            <div className="p-4 group-hover:bg-esn-dark-blue/5 transition-colors duration-300">
                <h3 className="font-semibold text-esn-dark-blue group-hover:text-esn-cyan transition-colors duration-300">
                    {item.title}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300 mt-1">
                    {item.description}
                </p>
            </div>
        </button>
    );
}