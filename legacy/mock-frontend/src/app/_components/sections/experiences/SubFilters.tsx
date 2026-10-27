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
        <div className="mt-4 flex flex-wrap gap-2">
            {options.map((f) => (
                <button
                    key={f}
                    type="button"
                    onClick={() => onSelect(f)}
                    className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 sm:text-base ${
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