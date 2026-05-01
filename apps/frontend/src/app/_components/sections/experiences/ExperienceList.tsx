import ExperienceCard from "./ExperienceCard";
import type { ExperienceItem } from "./data";

interface ExperienceListProps {
    items: ExperienceItem[];
    activeId: string | null;
    onHover: (id: string) => void;
}

export default function ExperienceList({
    items,
    activeId,
    onHover,
}: ExperienceListProps) {
    return (
        <div className="mt-6 min-w-0 pr-2">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {items.map((item) => (
                    <ExperienceCard
                        key={item.id}
                        item={item}
                        isActive={activeId === item.id}
                        onHover={onHover}
                    />
                ))}
            </div>
        </div>
    );
}