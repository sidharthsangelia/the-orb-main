import { cn } from "@/lib/utils";

type Tone = "surface" | "onImage";

interface CategoryChipProps {
  category: { title?: string | null; color?: string | null };
  /**
   * "surface" sits on a card background, "onImage" sits over a photograph and
   * therefore carries its own scrim.
   */
  tone?: Tone;
  className?: string;
}

/*
 * Editors pick a category colour in Sanity and it arrives as hex. The cards
 * used to interpolate it straight into `hsl(${color} / 0.15)` — literally
 * `hsl(#3B82F6 / 0.15)`, which is not valid CSS, so the background silently
 * dropped. Rather than reintroduce arbitrary editor colours as text and
 * surface (unpredictable contrast across two themes), the colour becomes a
 * dot and the chip itself uses theme tokens.
 *
 * One definition, used by the hero, the home row, the visual decks and the
 * archive grid — previously four near-identical copies that had already
 * drifted apart.
 */
export function CategoryChip({
  category,
  tone = "surface",
  className,
}: CategoryChipProps) {
  if (!category?.title) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium backdrop-blur-sm",
        tone === "surface"
          ? "border-border/70 bg-background/90 text-foreground"
          : "border-white/25 bg-black/45 text-white",
        className,
      )}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: category.color || "hsl(var(--brand))" }}
      />
      {category.title}
    </span>
  );
}
