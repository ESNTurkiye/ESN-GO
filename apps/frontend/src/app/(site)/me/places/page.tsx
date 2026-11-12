import type { Metadata } from "next";
import { getCities } from "@/lib/api";
import { MyPlaces } from "./MyPlaces";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "My places",
  robots: { index: false, follow: false },
};

/** /me/places: the logged-in ESNer's own places (profile menu → My places). */
export default async function MyPlacesPage() {
  const cities = await getCities();
  return (
    <div className={`container ${styles.page}`}>
      <h1>My places</h1>
      <p className={styles.lead}>
        The places you added, newest first. Edit them any time; changes go live
        right away.
      </p>
      <MyPlaces cities={cities} />
    </div>
  );
}
