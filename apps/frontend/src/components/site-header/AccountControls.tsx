"use client";

import Link from "next/link";
import { rememberReturnPath } from "@/lib/auth";
import { useSession } from "@/lib/session";
import buttonStyles from "../ui/button.module.scss";
import { Icon } from "../ui/Icon";
import { LoginButton } from "./LoginButton";
import { ProfileLinks, ProfileMenu, useShowAddPlace } from "./ProfileMenu";
import styles from "./SiteHeader.module.scss";

type AccountControlsProps = {
  /** Mobile menu: full width, the account links listed instead of a dropdown. */
  block?: boolean;
};

/**
 * Header account slot. Visitors: "Log in" (secondary). Logged-in ESNer: "Add a place"
 * on home, Destinations and Explore!, and a profile icon with My places and Log out;
 * no name in the bar (wireframe H1 + 8 Nov, Kayra).
 */
export function AccountControls({ block }: AccountControlsProps) {
  const session = useSession();
  const showAddPlace = useShowAddPlace();

  if (!session) {
    return <LoginButton block={block} onClick={() => rememberReturnPath()} />;
  }

  if (block) {
    return (
      <div className={styles.accountBlock}>
        <ProfileLinks session={session} />
      </div>
    );
  }

  return (
    <div className={styles.account}>
      {showAddPlace && (
        <Link
          href="/places/new"
          className={`${buttonStyles.button} ${buttonStyles.secondary} ${styles.addPlace}`}
        >
          <Icon name="add-outline" size={20} />
          Add a place
        </Link>
      )}
      <ProfileMenu session={session} />
    </div>
  );
}
