import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/sections/Hero";

describe("hero headline", () => {
  it("reads as a sentence for crawlers and screen readers (spaces between its pieces)", () => {
    const html = renderToStaticMarkup(<Hero />);
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)![1];
    const text = h1.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    expect(text).toBe("We build software that pays attention.");
  });
});
