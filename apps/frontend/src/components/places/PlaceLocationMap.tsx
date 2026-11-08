"use client";

import dynamic from "next/dynamic";
import type { Place } from "@/lib/places";
import styles from "./PlaceLocationMap.module.scss";

// Browser only; a grey box of the same size holds the place until it loads (standard: Harita).
const PlaceMap = dynamic(() => import("./PlaceMap"), {
  ssr: false,
  loading: () => <div className={styles.loading} />,
});

/** One pin on the place page. Its information (address) is also written next to it. */
export function PlaceLocationMap({ place }: { place: Place }) {
  return (
    <div className={styles.box}>
      <PlaceMap
        places={[place]}
        className={styles.map}
        label={`Map: where ${place.name} is. The address is written next to it.`}
      />
    </div>
  );
}
