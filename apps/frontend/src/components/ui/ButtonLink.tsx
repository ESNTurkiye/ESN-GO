import Link from "next/link";
import type { ComponentProps } from "react";
import styles from "./button.module.scss";

type Variant = "primary" | "inverse" | "secondary" | "ghost";

type ButtonLinkProps = ComponentProps<typeof Link> & {
    variant?: Variant;
    block?: boolean;
};

/** Button classes, also for a plain <a> to another site. */
export function buttonClassName(variant: Variant = "primary", block?: boolean, className?: string) {
    return [styles.button, styles[variant], block && styles.block, className].filter(Boolean).join(" ");
}

/** A link that looks like a Button. Use it when the action navigates. */
export function ButtonLink({ variant = "primary", block, className, ...props }: ButtonLinkProps) {
    return <Link className={buttonClassName(variant, block, className)} {...props} />;
}
