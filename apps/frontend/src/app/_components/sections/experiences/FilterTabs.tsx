"use client";

interface FilterTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function FilterTabs({ activeTab, setActiveTab }: FilterTabsProps) {
  const tabs = ["Vibes", "Food", "Hidden"];

  return (
    <div className="flex gap-3 mt-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-3 rounded-full border-2 font-medium transition-all duration-200 ${
            activeTab === tab
              ? "bg-esn-dark-blue text-white border-esn-dark-blue shadow-lg"
              : "border-gray-300 text-gray-700 hover:bg-esn-cyan hover:text-white hover:border-esn-cyan"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}