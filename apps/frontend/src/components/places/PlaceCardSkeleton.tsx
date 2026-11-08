import styles from "./PlaceCard.module.scss";

/** Same size as a PlaceCard, so the list does not jump while it loads. */
export function PlaceCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.media} />
      <div className={styles.body}>
        <span className={styles.name}>&nbsp;</span>
        <span className={styles.meta}>&nbsp;</span>
        <span className={styles.by}>&nbsp;</span>
      </div>
    </div>
  );
}
