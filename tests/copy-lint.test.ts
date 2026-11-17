import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { home } from "@/content/home";
import { val } from "@/lib/placeholder";

const root = new URL("..", import.meta.url).pathname;

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return files(p);
    return /\.(ts|tsx)$/.test(p) ? [p] : [];
  });
}

function strings(node: unknown): string[] {
  const v = val(node as never) as unknown;
  if (typeof v === "string") return [v];
  if (Array.isArray(v)) return v.flatMap(strings);
  if (v && typeof v === "object") return Object.values(v).flatMap(strings);
  return [];
}

describe("copy lint (spec §3 anti-goals)", () => {
  it("has no em dash in content or components", () => {
    const offenders = ["content", "components", "app"]
      .flatMap((d) => files(join(root, d)))
      .filter((f) => readFileSync(f, "utf8").includes("—"));
    expect(offenders).toEqual([]);
  });

  it("has no 'not X, just Y' lines", () => {
    const bad = strings(home).filter((s) => /\bnot\b[^.]*,\s*just\b/i.test(s));
    expect(bad).toEqual([]);
  });
});
