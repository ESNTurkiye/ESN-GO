"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PlacesBrowser } from "@/components/places/PlacesBrowser";
import type { City } from "@/lib/api";

/** Keeps the chosen destination in the address (?city=), so the view can be shared. */
export function ExplorePlaces({ cities }: { cities: City[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const city = params.get("city") ?? "";
  const known = cities.some((c) => c.cityId === city) ? city : "";

  return (
    <PlacesBrowser
      layout="split"
      cities={cities}
      initialCity={known}
      onCityChange={(next) => {
        const query = next ? `?city=${encodeURIComponent(next)}` : "";
        router.replace(`${pathname}${query}`, { scroll: false });
      }}
    />
  );
}
