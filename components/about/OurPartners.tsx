import { cn } from "@/lib/utils";
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

  return (
    <section className="relative w-full py-10 bg-muted/40 dark:bg-muted/20">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Our Partners
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Collaborating with visionaries in sustainability and climate action.
        </p>
      </div>

      <Marquee pauseOnHover >
        {partners.map((partner) => (
          <a
            key={partner._id}
            href={partner.website ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-8 flex items-center justify-center "
          >
            <img
              src={partner.logo!}
              alt={partner.title ?? "Partner logo"}
              className="h-20 w-auto object-contain drop-shadow-md dark:drop-shadow-xl"
            />
          </a>
        ))}
      </Marquee>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-muted/40 via-transparent to-transparent dark:from-muted/10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-muted/40 via-transparent to-transparent dark:from-muted/10" />
    </section>
  );
}
