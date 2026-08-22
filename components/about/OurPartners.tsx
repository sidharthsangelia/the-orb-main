import Image from "next/image";
import { Marquee } from "../magicui/marquee";

export type Partner = {
  _id: string;
  title: string | null;
  logo: string | null;
  website?: string | null;
};

interface OurPartnersProps {
  partners: Partner[];
}

export function OurPartners({ partners }: OurPartnersProps) {
  if (!partners || partners.length === 0) return null;

  const logos = partners.filter((partner) => Boolean(partner.logo));
  if (logos.length === 0) return null;

  // With only a couple of partners the strip needs more copies to fill the
  // viewport; with many, four copies is a lot of wasted DOM.
  const repeat = Math.max(2, Math.min(6, Math.ceil(12 / logos.length)));

  return (
    <section
      className="relative w-full overflow-hidden border-y border-border/60 bg-muted py-12 sm:py-14"
      aria-labelledby="partners-heading"
    >
      <div className="container">
        <div className="text-center">
          <h2
            id="partners-heading"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
          >
            In collaboration with
          </h2>
        </div>
      </div>

      <Marquee pauseOnHover repeat={repeat} className="mt-8 [--duration:45s]">
        {logos.map((partner) => {
          const logo = (
            <Image
              src={partner.logo!}
              alt={partner.title ?? "Partner logo"}
              width={200}
              height={80}
              // Logos arrive at wildly different aspect ratios; a fixed height
              // with `object-contain` is what makes the row read as one strip.
              className="h-12 w-auto object-contain opacity-70 grayscale transition duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0 sm:h-14"
            />
          );

          return partner.website ? (
            <a
              key={partner._id}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              title={partner.title ?? undefined}
              className="group/logo mx-8 flex items-center justify-center"
            >
              {logo}
            </a>
          ) : (
            <span
              key={partner._id}
              title={partner.title ?? undefined}
              className="group/logo mx-8 flex items-center justify-center"
            >
              {logo}
            </span>
          );
        })}
      </Marquee>

      {/*
       * Fade the strip into the section's own background. These previously
       * faded to `muted/40` over a `muted/40` surface, which stacked the tint
       * and left a visible vertical seam at each edge.
       */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-muted to-transparent sm:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-muted to-transparent sm:w-28"
      />
    </section>
  );
}
