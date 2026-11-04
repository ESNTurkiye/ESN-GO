import { Icon, isIconName } from "@/components/ui/Icon";

/** A guide's Ionicons icon (seed field "icon"); book-outline if the name is unknown. */
export function GuideIcon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  return (
    <Icon
      name={isIconName(name) ? name : "book-outline"}
      className={className}
    />
  );
}
