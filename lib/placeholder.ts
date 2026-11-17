/**
 * Placeholder content: values that look real in the design but are not true yet
 * (invented case studies, stand-in links). They render with a "Placeholder" tag
 * outside Vercel production and block the Vercel production build (spec §8.3).
 */

export type Ph<T> = { readonly value: T; readonly placeholder: true };
export type Field<T> = T | Ph<T>;

export function ph<T>(value: T): Ph<T> {
  return { value, placeholder: true };
}

export function isPh(x: unknown): x is Ph<unknown> {
  return typeof x === "object" && x !== null && (x as { placeholder?: unknown }).placeholder === true && "value" in x;
}

export function val<T>(f: Field<T>): T {
  return isPh(f) ? (f.value as T) : f;
}

/** Dotted paths (with array indexes) of every placeholder in a content tree. */
export function collectPlaceholders(node: unknown, path = ""): string[] {
  if (isPh(node)) return [path];
  const join = (key: string | number) => (path ? `${path}.${key}` : String(key));
  if (Array.isArray(node)) return node.flatMap((child, i) => collectPlaceholders(child, join(i)));
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([k, child]) => collectPlaceholders(child, join(k)));
  }
  return [];
}

/** Production deploys must not ship placeholders; previews and local builds may. */
export function placeholderGuard(
  vercelEnv: string | undefined,
  paths: string[],
): { ok: boolean; message: string } {
  if (paths.length === 0) return { ok: true, message: "No placeholder content left." };
  const list = paths.map((p) => `  - ${p}`).join("\n");
  if (vercelEnv === "production") {
    return {
      ok: false,
      message: `Production build blocked: ${paths.length} placeholder value(s) still in content/home.ts:\n${list}`,
    };
  }
  return { ok: true, message: `${paths.length} placeholder value(s) remain (allowed outside production):\n${list}` };
}
