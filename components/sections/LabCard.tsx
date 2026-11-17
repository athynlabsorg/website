import { ContentText } from "@/components/ContentText";
import type { HomeContent } from "@/content/home";

type Product = HomeContent["lab"]["products"][number];

/**
 * A product label on the lab map. `scaled` sizes everything in cqw so the desktop map scales as one
 * picture (spec §6: 310/380px cards, 34px names, 16/24 body at 1440).
 */
export function LabCard({ product, widthPx, scaled }: { product: Product; widthPx: number; scaled: boolean }) {
  return (
    <article
      className={
        scaled
          ? "flex flex-col gap-[0.42cqw] rounded-lg border-[1.5px] border-contour bg-spruce px-[1.39cqw] pt-[1.11cqw] pb-[1.25cqw]"
          : "flex flex-col gap-1.5 rounded-lg border-[1.5px] border-contour bg-spruce px-5 pt-4 pb-5"
      }
      style={scaled ? { width: `${(widthPx / 1440) * 100}cqw` } : undefined}
    >
      <p className={`font-hand font-semibold text-alpenglow ${scaled ? "text-[max(18px,1.53cqw)]" : "text-[22px]"}`}>
        {product.status}
      </p>
      <h3
        className={`font-display leading-none font-extrabold tracking-[-0.03em] text-snow ${scaled ? "text-[max(26px,2.36cqw)]" : "text-[34px]"}`}
      >
        <ContentText f={product.name} />
      </h3>
      <p className={`text-fog ${scaled ? "line-clamp-5 text-[max(14px,1.11cqw)] leading-[1.5]" : "text-base leading-6"}`}>
        {product.body}
      </p>
    </article>
  );
}
