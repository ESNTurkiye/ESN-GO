import type { Metadata } from "next";
import { PlaceFormPage } from "@/components/place-form/PlaceFormPage";
import { getCities } from "@/lib/api";
import styles from "../../new/page.module.scss";

export const metadata: Metadata = {
  title: "Edit place",
  robots: { index: false, follow: false },
};

/**
 * Cache Components needs at least one entry to build the page (the header reads the
 * address). Real ids render on request; the form loads the place itself in the browser.
 */
export function generateStaticParams() {
  return [{ placeId: "example" }];
}

/**
 * /places/{placeId}/edit: the place is loaded in the browser (the current version, not
 * the cached page) and only its ESNer (or an admin) gets the form.
 */
export default async function EditPlacePage({
  params,
}: PageProps<"/places/[placeId]/edit">) {
  const [{ placeId }, cities] = await Promise.all([params, getCities()]);
  return (
    <div className={`container ${styles.page}`}>
      <h1>Edit place</h1>
      <p className={styles.lead}>
        Changes go live right away. Your name and section stay on the place.
      </p>
      <PlaceFormPage cities={cities} placeId={placeId} />
    </div>
  );
}
