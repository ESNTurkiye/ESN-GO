"use client";

import { cn } from "@/_lib/utils";

export type FilterTabItem<T extends string = string> = {
    value: T;
    label: string;
};

type FilterTabsProps<T extends string> = {
    tabs: readonly FilterTabItem<T>[];
    value: T;
    onChange: (value: T) => void;
    ariaLabel?: string;
    /** Experiences: outer scroll + proportional min width. Events toolbar: single row strip. */
    variant?: "panel" | "inline";
    className?: string;
};

export default function FilterTabs<T extends string>({
    tabs,
    value,
    onChange,
    ariaLabel = "Filter tabs",
    variant = "panel",
    className,
}: FilterTabsProps<T>) {
    const count = tabs.length;
    const activeIndex = Math.max(
        0,
        tabs.findIndex((t) => t.value === value),
    );

    const minWidthPx = Math.max(280, count * 120);

    const track = (
        <div
            className={cn(
                "relative rounded-full border border-esn-dark-blue/20 bg-esn-cyan/10 p-1",
                variant === "panel" && "inline-grid",
                variant === "inline" && "grid w-full min-w-[200px] max-w-md",
                className,
            )}
            style={{
                gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
                ...(variant === "panel"
                    ? { minWidth: `${minWidthPx}px` }
                    : undefined),
            }}
            role="tablist"
            aria-label={ariaLabel}
        >
            <span
                className="absolute top-1 bottom-1 rounded-full bg-esn-dark-blue shadow-md transition-transform duration-300 ease-out"
                style={{
                    left: "4px",
                    width: `calc((100% - 8px) / ${count})`,
                    transform: `translateX(${activeIndex * 100}%)`,
                }}
                aria-hidden
            />
            {tabs.map((tab) => {
                const active = tab.value === value;
                return (
                    <button
                        key={tab.value}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => onChange(tab.value)}
                        className={cn(
                            "relative z-10 rounded-full font-semibold transition-colors duration-300",
                            variant === "panel" &&
                                "px-5 py-3 text-base md:text-lg",
                            variant === "inline" &&
                                "px-4 py-2 text-xs font-oswald font-bold uppercase tracking-wide sm:text-sm",
                            active
                                ? "text-white"
                                : "text-esn-dark-blue hover:text-esn-magenta",
                        )}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );

    if (variant === "inline") {
        return track;
    }

    return <div className="mt-4 overflow-x-auto">{track}</div>;
}
