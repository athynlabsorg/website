import { val, type Field } from "@/lib/placeholder";

/**
 * Character limits for a lab product card. The desktop lab map positions cards absolutely,
 * so copy longer than this overlaps neighbouring cards or gets clamped. Measured at 1280px
 * (the smallest width that shows the map) with every field at its limit.
 */
export const LAB_CARD_BUDGET = { name: 14, status: 16, body: 145 } as const;

type LabCardCopy = { name: Field<string>; status: string; body: string };

/** Fields of a lab card that exceed the budget, in display order. */
export function labCardOverBudget(p: LabCardCopy): (keyof typeof LAB_CARD_BUDGET)[] {
  const lengths = { name: val(p.name).length, status: p.status.length, body: p.body.length };
  return (Object.keys(LAB_CARD_BUDGET) as (keyof typeof LAB_CARD_BUDGET)[]).filter(
    (k) => lengths[k] > LAB_CARD_BUDGET[k],
  );
}
