import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { toPlainText, type PortableTextBlock } from "next-sanity";
import { Inter } from "next/font/google";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage, urlForImage } from "@/sanity/lib/utils";
import Header1 from "@/components/mvpblocks/header-1";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "react-hot-toast";
export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);

  /*
   * Without a metadataBase, Next resolves Open Graph and Twitter image paths
   * relative to nothing — the generated opengraph-image route produced URLs
   * that social crawlers could not fetch. Prefer an explicit site URL, fall
   * back to the Vercel deployment URL, then to the production domain.
   */
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "https://theorbearth.in";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: Array.isArray(description) ? toPlainText(description) : description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await sanityFetch({ query: settingsQuery });
  const siteSettings = data;

  // Extract logo logic to avoid TypeScript issues
  const logoUrl =
    data?.logo?.asset && data.logo
      ? urlForImage(data.logo)?.url?.() ?? undefined
      : undefined;


const footerData = {
  title: data?.title,
  description: data?.description,
  // footerText: data?.footerText,
  socialLinks: data?.socialLinks,
  contactEmail: data?.contactEmail,
  phoneNumber: data?.phoneNumber,
  addressLine1: data?.addressLine1,
  addressLine2: data?.addressLine2,
  city: data?.city,
  state: data?.state,
  zipCode: data?.zipCode,
  country: data?.country,
  googleMapsLink: data?.googleMapsLink,
};


  // Removed the problematic footer line since it's not used anywhere
  // const footer = data?.footer || [];
  // const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      className={inter.variable}
      /*
       * globals.css sets `scroll-behavior: smooth` so the article table of
       * contents glides to its anchors. Next 16 no longer overrides that during
       * route transitions unless this attribute is present, which would make
       * every navigation animate a long scroll to the top instead of jumping.
       */
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background text-foreground antialiased">
        {/* {isDraftMode && <AlertBanner />} */}

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Keyboard users can jump the fixed header and nav */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-foreground"
          >
            Skip to content
          </a>

          <div className="flex min-h-dvh flex-col">
            <Header1
              title={data?.title}
              description={data?.description}
              logo={logoUrl}
            />

            <main id="main-content" className="flex-1">
              {children}
            </main>

            {siteSettings && <Footer siteSettings={footerData} />}
          </div>

          {/* Mounted once here — the newsletter forms call toast() but had no
              renderer, so success/error toasts never actually appeared. */}
          <Toaster
            position="bottom-center"
            toastOptions={{
              className:
                "!bg-card !text-card-foreground !border !border-border !shadow-lg",
              duration: 4000,
            }}
          />
        </ThemeProvider>

        <SpeedInsights />

        <GoogleAnalytics gaId="G-QWJWTC258D" />
      </body>
    </html>
  );
}