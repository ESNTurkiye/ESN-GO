import ExperienceCard from "./ExperienceCard";
import ExperienceListSkeleton from "./ExperienceListSkeleton";
import type { ExperienceItem } from "./data";

interface ExperienceListProps {
    items: ExperienceItem[];
    activeId: string | null;
    onHover: (id: string) => void;
    isLoading?: boolean;
    showExpandButton?: boolean;
    onExpandMap?: () => void;
}

export default function ExperienceList({
    items,
    activeId,
    onHover,
    isLoading = false,
    showExpandButton = false,
    onExpandMap,
}: ExperienceListProps) {
    return (
        isLoading ? (
            <ExperienceListSkeleton />
        ) : (
            <div className="mt-6 min-w-0 pr-2">
                {showExpandButton && (
                    <div className="mb-4 flex justify-center">
                        <button
                            onClick={onExpandMap}
                            type="button"
                            className="rounded-lg border-2 border-esn-magenta px-6 py-2.5 text-sm font-semibold text-esn-magenta hover:bg-esn-magenta/10 transition-colors"
                        >
                            Expand map search
                        </button>
                    </div>
                )}
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
        )
    );
}