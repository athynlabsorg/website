import { describe, expect, it } from "vitest";
import { collectPlaceholders, isPh, ph, placeholderGuard, val } from "@/lib/placeholder";
import { home } from "@/content/home";

describe("ph / val / isPh", () => {
  it("wraps a value and unwraps it", () => {
    const f = ph("x");
    expect(isPh(f)).toBe(true);
    expect(val(f)).toBe("x");
  });
  it("passes real values through", () => {
    expect(isPh("real")).toBe(false);
    expect(val("real")).toBe("real");
  });
  it("supports a null placeholder (missing photo)", () => {
    expect(val(ph<string | null>(null))).toBeNull();
  });
});

describe("collectPlaceholders", () => {
  it("finds placeholders nested in objects and arrays by dotted path", () => {
    const tree = { a: ph("x"), b: [{ c: "real" }, { c: ph("y") }] };
    expect(collectPlaceholders(tree)).toEqual(["a", "b.1.c"]);
  });
  it("returns nothing for fully real content", () => {
    expect(collectPlaceholders({ a: "x", b: [1, { c: null }] })).toEqual([]);
  });
  it("covers the placeholders the spec lists in the real content", () => {
    const paths = collectPlaceholders(home);
    for (const p of [
      "site.bookingUrl",
      "site.email",
      "site.legalName",
      "site.linkedin",
      "site.github",
      "work.cases.0.metric",
      "work.cases.2.summary",
      "about.photo",
      "about.bio",
      "about.credentials.0.figure",
      "about.credentials.1.figure",
      "lab.products.1.name",
    ]) {
      expect(paths).toContain(p);
    }
  });
  it("does not flag the true 'CA / incorporated' credential", () => {
    const paths = collectPlaceholders(home);
    expect(paths).not.toContain("about.credentials.2.figure");
    expect(paths).not.toContain("about.credentials.2.label");
  });
});

describe("placeholderGuard", () => {
  it("fails a Vercel production build when placeholders remain, naming each", () => {
    const r = placeholderGuard("production", ["site.email", "work.cases.1.metric"]);
    expect(r.ok).toBe(false);
    expect(r.message).toContain("site.email");
    expect(r.message).toContain("work.cases.1.metric");
  });
  it("lets preview builds through", () => {
    expect(placeholderGuard("preview", ["a"]).ok).toBe(true);
  });
  it("lets local builds through", () => {
    expect(placeholderGuard(undefined, ["a"]).ok).toBe(true);
  });
  it("passes production once nothing is left", () => {
    expect(placeholderGuard("production", []).ok).toBe(true);
  });
});
