import { isPh, val, type Field } from "@/lib/placeholder";
import { PlaceholderTag } from "@/components/PlaceholderTag";

/** True everywhere except a Vercel production deploy, where placeholders can't exist anyway. */
export const showPlaceholderTags = process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";

/**
 * Renders a content field; flags placeholder values with a visible tag outside production.
 * Pass tag={false} when a parent shows one tag for a whole group (see GroupPlaceholderTag).
 */
export function ContentText({ f, tag = true }: { f: Field<string>; tag?: boolean }) {
  return (
    <>
      {val(f)}
      {tag && isPh(f) && showPlaceholderTags ? <PlaceholderTag /> : null}
    </>
  );
}

/** One tag for a group of fields (a case row, a credential) when any of them is a placeholder. */
export function GroupPlaceholderTag({ fields, className = "" }: { fields: unknown[]; className?: string }) {
  if (!showPlaceholderTags || !fields.some(isPh)) return null;
  return (
    <span className={className}>
      <PlaceholderTag />
    </span>
  );
}
