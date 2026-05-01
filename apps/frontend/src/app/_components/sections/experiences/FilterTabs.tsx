"use client";

interface FilterTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function FilterTabs({ activeTab, setActiveTab }: FilterTabsProps) {
    const tabs = ["Vibes", "Food", "Hidden Gems"];
    const activeIndex = Math.max(tabs.indexOf(activeTab), 0);

    return (
        <div className="mt-4 overflow-x-auto">
            <div className="relative inline-grid grid-cols-3 rounded-full border border-esn-dark-blue/20 bg-esn-cyan/10 p-1 min-w-[360px]">
                <span
                    className="absolute top-1 bottom-1 rounded-full bg-esn-dark-blue shadow-md transition-transform duration-300 ease-out"
                    style={{
                        left: "4px",
                        width: "calc((100% - 8px) / 3)",
                        transform: `translateX(${activeIndex * 100}%)`,
                    }}
                />
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`relative z-10 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                            activeTab === tab
                                ? "text-white"
                                : "text-esn-dark-blue hover:text-esn-magenta"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}