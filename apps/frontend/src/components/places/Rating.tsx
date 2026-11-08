import { Icon } from "@/components/ui/Icon";

/** 1–5 stars; screen readers hear "4 out of 5". */
export function Rating({ value, label }: { value: number; label: string }) {
  return (
    <span role="img" aria-label={`${label}: ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon key={n} name={n <= value ? "star" : "star-outline"} size={20} />
      ))}
    </span>
  );
}
