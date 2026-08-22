"use client";

import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { CategoryChip } from "@/components/ui/category-chip";
import { cn } from "@/lib/utils";

export interface DeckSlide {
  src: string;
  alt?: string;
}

export interface VisualStoryDeckProps {
  title: string;
  category?: { title?: string | null; color?: string | null } | null;
  slides: DeckSlide[];
  /** Only the first deck's cover slide is worth eager-loading. */
  priority?: boolean;
}

/** Beyond this, individual dots stop being a usable target and only the counter remains. */
const MAX_DOTS = 10;

export function VisualStoryDeck({
  title,
  category,
  slides,
  priority = false,
}: VisualStoryDeckProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selected, setSelected] = React.useState(0);

  const count = slides.length;
  const isDeck = count > 1;

  React.useEffect(() => {
    if (!api) return;

    const sync = () => setSelected(api.selectedScrollSnap());

    sync();
    api.on("select", sync);
    api.on("reInit", sync);

    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  /*
   * No hover lift or shadow bloom on this card. Unlike a story card it is not
   * a link — there is nowhere to click through to — so card-level hover
   * feedback promises an interaction that does not exist. The controls inside
   * the carousel carry their own hover states; the frame stays still.
   * focus-within is kept: it is the only cue that a keyboard user has landed
   * on the deck's arrows or dots.
   */
  return (
    <article className="group/card flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-colors duration-200 focus-within:border-brand/40">
      <Carousel
        className="relative w-full"
        setApi={setApi}
        aria-label={isDeck ? `${title} — ${count} slides` : title}
      >
        <CarouselContent
          className={cn("ml-0", isDeck && "cursor-grab active:cursor-grabbing")}
        >
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="pl-0"
              aria-label={`Slide ${index + 1} of ${count}`}
            >
              <div className="relative aspect-[4/5] w-full bg-muted">
                <Image
                  src={slide.src}
                  alt={
                    slide.alt ??
                    `${title} — slide ${index + 1} of ${count}`
                  }
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={priority && index === 0}
                  loading={priority && index === 0 ? undefined : "lazy"}
                  quality={85}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {isDeck && (
          <>
            {/*
             * opacity-0 rather than hidden/invisible: an opacity-0 button is
             * still in the tab order, so a keyboard user can Tab to it and
             * `group-focus-within` then reveals it. `visibility:hidden` would
             * have made the reveal-on-focus impossible to ever trigger.
             * pointer-events follow opacity so there are no invisible hit
             * targets sitting over the photograph.
             */}
            <div className="deck-controls pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover/card:pointer-events-auto group-hover/card:opacity-100 group-focus-within/card:pointer-events-auto group-focus-within/card:opacity-100">
              <CarouselPrevious className="left-3 h-9 w-9 border-0 bg-background/85 text-foreground shadow-md backdrop-blur hover:bg-background" />
              <CarouselNext className="right-3 h-9 w-9 border-0 bg-background/85 text-foreground shadow-md backdrop-blur hover:bg-background" />
            </div>

            {/*
             * Position indicator, always visible — it is the only cue that
             * there is anything past the cover slide. The old badge read a
             * static "N slides" and never moved as you swiped.
             */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/65 to-transparent p-3 pt-10">
              {count <= MAX_DOTS ? (
                <div className="pointer-events-auto flex items-center gap-1">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => api?.scrollTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={index === selected ? "true" : undefined}
                      /* 24px tall hit area around a 6px dot. */
                      className="group/dot flex h-6 items-center px-0.5 outline-none"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          index === selected
                            ? "w-5 bg-white"
                            : "w-1.5 bg-white/50 group-hover/dot:bg-white/80",
                          "group-focus-visible/dot:ring-2 group-focus-visible/dot:ring-white group-focus-visible/dot:ring-offset-1 group-focus-visible/dot:ring-offset-black/40",
                        )}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <span />
              )}

              <span
                aria-hidden
                className="shrink-0 rounded-full bg-black/55 px-2 py-0.5 text-[0.7rem] font-medium tabular-nums text-white backdrop-blur-sm"
              >
                {selected + 1} / {count}
              </span>
            </div>

            {/* Announced instead of the visual counter, which is decorative. */}
            <span className="sr-only" aria-live="polite">
              Slide {selected + 1} of {count}
            </span>
          </>
        )}
      </Carousel>

      <div className="flex flex-1 flex-col items-start gap-3 p-5">
        {category?.title && <CategoryChip category={category} />}

        {/* h3, not h2 — this sits under the section heading above. */}
        <h3 className="text-balance text-lg font-semibold leading-snug tracking-tight text-foreground">
          {title}
        </h3>
      </div>
    </article>
  );
}
