import type { Metadata } from "next";
import { PlaceFormPage } from "@/components/place-form/PlaceFormPage";
import { getCities } from "@/lib/api";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Add a place",
  robots: { index: false, follow: false },
};

/** /places/new: an ESNer adds a place in four steps; live right away (no pre-approval). */
export default async function NewPlacePage() {
  const cities = await getCities();
  return (
    <div className={`container ${styles.page}`}>
      <h1>Add a place</h1>
      <p className={styles.lead}>
        Recommend a place in your city to exchange students. It goes live right
        away with your name and ESN section.
      </p>
      <PlaceFormPage cities={cities} />
    </div>
  );
}
