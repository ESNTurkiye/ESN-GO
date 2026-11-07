"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/guides";
import styles from "./TableOfContents.module.scss";

type TableOfContentsProps = {
    items: TocItem[];
    /** "panel": always open (desktop side column). "disclosure": closed until tapped (mobile). */
    variant: "panel" | "disclosure";
    className?: string;
};

/** The section whose heading is closest above the top fifth of the screen. */
function useActiveId(idList: string) {
    const [active, setActive] = useState(idList.split(" ")[0]);

    useEffect(() => {
        const headings = idList
            .split(" ")
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);
        if (headings.length === 0) return;

        const update = () => {
            const line = window.innerHeight * 0.2;
            let current = headings[0].id;
            for (const heading of headings) {
                if (heading.getBoundingClientRect().top <= line) current = heading.id;
            }
            setActive(current);
        };

        const observer = new IntersectionObserver(update, {
            rootMargin: "0px 0px -80% 0px",
        });
        for (const heading of headings) observer.observe(heading);
        update();
        return () => observer.disconnect();
    }, [idList]);

    return active;
}

/**
 * "On this page" (wireframe E11): the intro and every section of the guide.
 * The current section is marked with a line and aria-current, not colour alone.
 */
export function TableOfContents({ items, variant, className }: TableOfContentsProps) {
    // A string, so the effect only re-runs when the sections change.
    const active = useActiveId(items.map((item) => item.id).join(" "));
    if (items.length === 0) return null;

    const list = (
        <ol className={styles.list}>
            {items.map((item) => (
                <li key={item.id}>
                    <a href={`#${item.id}`} className={styles.link} aria-current={item.id === active ? "location" : undefined}>
                        {item.label}
                    </a>
                </li>
            ))}
        </ol>
    );

    if (variant === "disclosure") {
        return (
            <nav aria-label="On this page" className={className}>
                <details className={styles.disclosure}>
                    <summary className={styles.summary}>On this page</summary>
                    {list}
                </details>
            </nav>
        );
    }

    return (
        <nav aria-labelledby="toc-title" className={`${styles.panel} ${className ?? ""}`}>
            <h2 id="toc-title" className={styles.heading}>
                On this page
            </h2>
            {list}
        </nav>
    );
}
