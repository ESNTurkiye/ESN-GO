import { Icon, type IconName } from "@/components/ui/Icon";
import type { PlaceType } from "@/lib/places";

/** Stand-in when a place has no photo yet. */
const ICON: Record<PlaceType, IconName> = {
  cafe: "location-outline",
  restaurant: "location-outline",
  bar: "location-outline",
  pub: "location-outline",
  nature: "map-outline",
  viewpoint: "image-outline",
};

export function PlaceTypeIcon({ type }: { type: PlaceType }) {
  return <Icon name={ICON[type] ?? "location-outline"} />;
}
