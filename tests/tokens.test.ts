import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

const expected: Record<string, string> = {
  "--color-snow": "#FFFFFF",
  "--color-spruce": "#0B2B1F",
  "--color-evergreen": "#14704A",
  "--color-alpenglow": "#F7B49A",
  "--color-lichen": "#5B6B63",
  "--color-mist": "#EEF4F0",
  "--color-line": "#D5DED9",
  "--color-contour": "#2C6B4F",
  "--color-contour-outer": "#1E4A37",
  "--color-fog": "#C9D6CF",
  "--color-mint-text": "#E3F0E9",
  "--color-placeholder": "#C2410C",
};

describe("design tokens (spec §6)", () => {
  for (const [name, hex] of Object.entries(expected)) {
    it(`${name} is ${hex}`, () => {
      expect(css).toMatch(new RegExp(`${name}:\\s*${hex};`, "i"));
    });
  }

  it("maps the four font roles to next/font variables", () => {
    for (const role of ["display", "accent", "body", "hand"]) {
      expect(css).toMatch(new RegExp(`--font-${role}:\\s*var\\(--font-`));
    }
  });
});
