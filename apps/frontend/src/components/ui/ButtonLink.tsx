import Link from "next/link";
import type { ComponentProps } from "react";
import styles from "./button.module.scss";

type Variant = "primary" | "inverse" | "secondary" | "ghost";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  block?: boolean;
};

/** A link that looks like a Button. Use it when the action navigates. */
export function ButtonLink({
  variant = "primary",
  block,
  className,
  ...props
}: ButtonLinkProps) {
  const classes = [
    styles.button,
    styles[variant],
    block && styles.block,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <Link className={classes} {...props} />;
}
