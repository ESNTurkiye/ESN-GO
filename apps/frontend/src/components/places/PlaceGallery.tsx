"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/places";
import styles from "./PlaceGallery.module.scss";

/**
 * The place's photos (8 Nov, Kayra): one large photo; on mobile swipe to the next one
 * (scroll snap, "2 / 3" under it), on larger screens click a thumbnail below.
 * Both move the same scrolling strip, so swipe and thumbnails always agree.
 * No auto-play (standard: Impressions).
 */
export function PlaceGallery({
  photos,
  credit,
}: {
  photos: Photo[];
  credit: string;
}) {
  const track = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const many = photos.length > 1;

  // Which photo is in view: the one whose slot is nearest the strip's left edge.
  useEffect(() => {
    const el = track.current;
    if (!el || !many) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const index = Math.round(el.scrollLeft / el.clientWidth);
        setActive(Math.min(Math.max(index, 0), photos.length - 1));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, [many, photos.length]);

  function show(index: number) {
    const el = track.current;
    if (!el) return;
    setActive(index);
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  }

  return (
    <figure className={styles.gallery}>
      {/* Keyboard: with several photos the strip can be focused and scrolled with the arrow keys. */}
      <section
        ref={track}
        className={styles.track}
        tabIndex={many ? 0 : undefined}
        aria-label={many ? `Photos, ${photos.length}` : "Photo"}
      >
        {photos.map((photo, i) => (
          <div
            key={photo.key}
            className={styles.slide}
            aria-hidden={i !== active || undefined}
          >
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              preload={i === 0}
              sizes="(min-width: 48rem) 320px, 100vw"
            />
          </div>
        ))}
      </section>

      <figcaption className={styles.caption}>
        <span>{credit}</span>
        {many && (
          <span className={styles.count} aria-live="polite">
            {active + 1} / {photos.length}
          </span>
        )}
      </figcaption>

      {many && (
        <ul className={styles.thumbs}>
          {photos.map((photo, i) => (
            <li key={photo.key}>
              <button
                type="button"
                className={`${styles.thumb} ${i === active ? styles.current : ""}`}
                aria-pressed={i === active}
                aria-label={`Show photo ${i + 1}: ${photo.alt}`}
                onClick={() => show(i)}
              >
                <Image src={photo.url} alt="" fill sizes="80px" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}
