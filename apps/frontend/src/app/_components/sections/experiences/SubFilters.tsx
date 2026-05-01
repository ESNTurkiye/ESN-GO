interface SubFiltersProps {
    options: string[];
    selectedFilter: string;
    onSelect: (filter: string) => void;
}

export default function SubFilters({
    options,
    selectedFilter,
    onSelect,
}: SubFiltersProps) {
    return (
        <div className="flex gap-2 mt-4 flex-wrap">
            {options.map((f) => (
                <button
                    key={f}
                    type="button"
                    onClick={() => onSelect(f)}
                    className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
                        selectedFilter === f
                            ? "bg-esn-magenta text-white border-esn-magenta shadow-md"
                            : "border-gray-300 text-gray-600 hover:bg-esn-green hover:text-white hover:border-esn-green hover:shadow-sm"
                    }`}
                >
                    {f}
                </button>
            ))}
        </div>
    );
}