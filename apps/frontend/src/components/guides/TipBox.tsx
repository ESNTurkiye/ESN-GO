import { Icon } from "@/components/ui/Icon";
import styles from "./TipBox.module.scss";

/**
 * Tip in a guide (wireframe E9): icon + the word "Tip" + text. A hint, not a warning:
 * the word carries the meaning, the colour only groups it.
 */
export function TipBox({ children }: { children: string }) {
  return (
    <aside className={styles.tip}>
      <p className={styles.label}>
        <Icon name="bulb-outline" size={20} />
        Tip
      </p>
      <p>{children}</p>
    </aside>
  );
}
