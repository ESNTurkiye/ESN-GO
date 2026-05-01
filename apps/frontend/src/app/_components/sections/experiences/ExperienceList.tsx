import ExperienceCard from "./ExperienceCard";
import type { ExperienceItem } from "./data";

interface ExperienceListProps {
    items: ExperienceItem[];
    activeId: string | null;
    onSelect: (id: string) => void;
}

export default function ExperienceList({
    items,
    activeId,
    onSelect,
}: ExperienceListProps) {
    return (
        <div className="pr-2 mt-6">
            <div className="grid grid-cols-1 gap-4">
                {items.map((item) => (
                    <ExperienceCard
                        key={item.id}
                        item={item}
                        isActive={activeId === item.id}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    );
}