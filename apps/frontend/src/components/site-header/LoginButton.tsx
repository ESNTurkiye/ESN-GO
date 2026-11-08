import Link from "next/link";
import buttonStyles from "../ui/button.module.scss";

type LoginButtonProps = {
  block?: boolean;
  className?: string;
  onClick?: () => void;
};

/**
 * "Log in" is always a secondary action: visitors browse everything without an account.
 * It opens /login first, which says what ESN GO receives from ESN Accounts (8 Nov).
 */
export function LoginButton({ block, className, onClick }: LoginButtonProps) {
  const classes = [
    buttonStyles.button,
    buttonStyles.secondary,
    block && buttonStyles.block,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={classes} href="/login" onClick={onClick}>
      Log in
    </Link>
  );
}
