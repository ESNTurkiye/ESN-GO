"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/_lib/utils";

const SAVE_KEY = "esn-go-saved-events";

function readSaved(): string[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        const parsed = raw ? (JSON.parse(raw) as unknown) : [];
        return Array.isArray(parsed)
            ? parsed.filter((x): x is string => typeof x === "string")
            : [];
    } catch {
        return [];
    }
}

type EventHeroActionsProps = {
    title: string;
    sharePath: string;
    eventSlug: string;
    className?: string;
};

const glassBtn =
    "inline-flex touch-target items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-[0.98]";

export default function EventHeroActions({
    title,
    sharePath,
    eventSlug,
    className,
}: EventHeroActionsProps) {
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setSaved(readSaved().includes(eventSlug));
    }, [eventSlug]);

    const toggleSave = useCallback(() => {
        setSaved((prev) => {
            const next = !prev;
            const set = new Set(readSaved());
            if (next) {
                set.add(eventSlug);
            } else {
                set.delete(eventSlug);
            }
            localStorage.setItem(SAVE_KEY, JSON.stringify([...set]));
            return next;
        });
    }, [eventSlug]);

    const share = useCallback(async () => {
        const url = `${window.location.origin}${sharePath}`;
        try {
            if (navigator.share) {
                await navigator.share({ title, text: title, url });
                return;
            }
        } catch {
            /* user cancelled or share failed */
        }
        try {
            await navigator.clipboard.writeText(url);
        } catch {
            /* ignore */
        }
    }, [sharePath, title]);

    return (
        <div className={cn("flex flex-wrap gap-3", className)}>
            <button type="button" className={glassBtn} onClick={() => share()}>
                <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                </svg>
                Share
            </button>
            <button
                type="button"
                className={cn(
                    glassBtn,
                    saved && "border-[#ffb1c6]/50 bg-[#ffb1c6]/20 text-[#ffb1c6]",
                )}
                onClick={toggleSave}
                aria-pressed={saved}
            >
                <svg
                    className="h-5 w-5"
                    fill={saved ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
                {saved ? "Saved" : "Save"}
            </button>
        </div>
    );
}
