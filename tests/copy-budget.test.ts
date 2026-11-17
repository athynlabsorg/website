import { describe, expect, it } from "vitest";
import { home } from "@/content/home";
import { LAB_CARD_BUDGET, labCardOverBudget } from "@/lib/copy-budget";

describe("lab card copy budget (review: longer real copy must not overlap or truncate on the desktop map)", () => {
  it("accepts every current lab product", () => {
    for (const p of home.lab.products) {
      expect(labCardOverBudget(p)).toEqual([]);
    }
  });

  it("names each field that is over budget", () => {
    const tooLong = {
      name: "Agent Review Studio X",
      status: "at base camp",
      body: "x".repeat(LAB_CARD_BUDGET.body + 1),
    };
    expect(labCardOverBudget(tooLong)).toEqual(["name", "body"]);
  });

  it("counts placeholder names by their value", () => {
    expect(
      labCardOverBudget({ name: { value: "y".repeat(LAB_CARD_BUDGET.name + 1), placeholder: true }, status: "ok", body: "ok" }),
    ).toEqual(["name"]);
  });
});
