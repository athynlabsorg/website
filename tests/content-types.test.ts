import { describe, expect, it } from "vitest";
import type { HomeContent } from "@/content/home";
import { ph } from "@/lib/placeholder";

type Photo = HomeContent["about"]["photo"];

describe("about.photo type", () => {
  it("accepts a path under public/ (next/image needs remotePatterns for hosted URLs)", () => {
    const local: Photo = "/fodilu.jpg";
    const missing: Photo = ph(null);
    // @ts-expect-error hosted URLs would crash next/image without images.remotePatterns
    const hosted: Photo = "https://media.licdn.com/me.jpg";
    expect([local, missing, hosted]).toHaveLength(3);
  });
});
