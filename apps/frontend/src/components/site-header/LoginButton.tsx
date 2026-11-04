import buttonStyles from "../ui/button.module.scss";
import styles from "./SiteHeader.module.scss";

type LoginButtonProps = {
  href: string | null;
  block?: boolean;
  className?: string;
};

/** "Log in" is always a secondary action: visitors browse everything without an account. */
export function LoginButton({ href, block, className }: LoginButtonProps) {
  const classes = [
    buttonStyles.button,
    buttonStyles.secondary,
    block && buttonStyles.block,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!href) {
    // API address missing (local dev without .env.local): disabled state, not a broken link.
    return (
      <span
        className={`${classes} ${styles.disabled}`}
        aria-disabled="true"
        title="NEXT_PUBLIC_API_URL is not set"
      >
        Log in
      </span>
    );
  }

  // ESN Accounts is another site: a plain <a>, not next/link.
  return (
    <a className={classes} href={href}>
      Log in
    </a>
  );
}
