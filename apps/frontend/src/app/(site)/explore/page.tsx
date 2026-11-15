import type { Metadata } from "next";
import { Suspense } from "react";
import { getCities } from "@/lib/api";
import { ExplorePlaces } from "./ExplorePlaces";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Explore!",
  description:
    "Places recommended by local ESNers across Türkiye: cafés, restaurants, bars and more.",
};

/**
 * /explore (wireframe 05): title + one sentence, no primary button (the page's only job is
 * finding places). Filters, list and sticky map below. "?city=istanbul" preselects a
 * destination (the destination page's "Open İstanbul in Explore! ›" link).
 */
export default async function ExplorePage() {
  const cities = await getCities();
  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.head}>
        <h1>Explore!</h1>
        <p className={styles.lead}>
          Places recommended by local ESNers across Türkiye.
        </p>
      </header>
      {/* The destination comes from the URL, which is only known in the browser. */}
      <Suspense fallback={null}>
        <ExplorePlaces cities={cities} />
      </Suspense>
    </div>
  );
}
