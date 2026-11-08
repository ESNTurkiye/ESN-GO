"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { useSession } from "@/lib/session";

/**
 * "Edit place" for the ESNer who added it. The session is only known in the browser, so
 * the button appears after the page loads; the API checks ownership again on save.
 */
export function OwnerActions({
  placeId,
  authorId,
}: {
  placeId: string;
  authorId: string;
}) {
  const session = useSession();
  if (!session || session.userId !== authorId) return null;
  return (
    <ButtonLink href={`/places/${placeId}/edit`} variant="secondary">
      <Icon name="create-outline" size={20} />
      Edit place
    </ButtonLink>
  );
}
