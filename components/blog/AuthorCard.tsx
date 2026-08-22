import Image from "next/image";

type Props = {
  name: string;
  picture: string;
  bio?: string;
};

export default function AuthorCard({ name, picture, bio }: Props) {
  return (
    <div className="mt-16">
      <div className="relative border border-border/60 rounded-2xl bg-gradient-to-br from-muted/50 to-card backdrop-blur-sm p-8 sm:p-10 shadow-sm hover:shadow-lg transition-all duration-300 group">
        {/* Decorative accent line on hover */}
        <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand to-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Header inside the card */}
        <h2 className="text-xl font-semibold text-foreground mb-8 tracking-tight border-b border-border/60 pb-3">
          About the author
        </h2>

        {/* Content section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Author Image */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 rounded-full overflow-hidden ring-2 ring-border/60 ring-offset-2 ring-offset-background">
            <Image
              src={picture || "/default-avatar.jpg"}
              alt={name}
              fill
              sizes="128px"
              className="object-cover aspect-square"
            />
          </div>

          {/* Author Details */}
          <div className="text-center sm:text-left flex-1 space-y-3">
            <h3 className="text-2xl font-bold text-foreground">{name}</h3>
            {bio && (
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-prose">
                {bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
