import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  VisualEditing,
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";

import AlertBanner from "../../components/alert-banner";
import PortableText from "../../components/portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage, urlForImage } from "@/sanity/lib/utils";
import Header1 from "@/components/mvpblocks/header-1";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";


export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  // metadataBase property does not exist on ogImage, so we leave it undefined or set it as needed
  return {
    metadataBase,
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
  const siteSettings = data

  const footer = data?.footer || [];
  // const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${inter.variable} bg-white text-black`}>
      <body>
          {/* {isDraftMode && <AlertBanner />} */}

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Header1
          title={data?.title}
          description={data?.description}
          logo={
            data?.logo?.asset ? urlForImage(data.logo).url() : undefined
          }
        />
          {/* <section className="min-h-screen"> */}
            {children}
          {/* </section> */}
            {siteSettings && <Footer siteSettings={siteSettings} />}
          </ThemeProvider>
          {/* <footer className="bg-accent-1 border-accent-2 border-t">
            <div className="container mx-auto px-5">
              {footer.length > 0 ? (
                <PortableText
                  className="prose-sm text-pretty bottom-0 w-full max-w-none bg-white py-12 text-center md:py-20"
                  value={footer as PortableTextBlock[]}
                />
              ) : (
                <div className="flex flex-col items-center py-28 lg:flex-row">
                  <h3 className="mb-10 text-center text-4xl font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-5xl">
                    Built with Next.js.
                  </h3>
                  <div className="flex flex-col items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4">
                    <a
                      href="https://nextjs.org/docs"
                      className="mx-3 mb-6 border border-black bg-black py-3 px-12 font-bold text-white transition-colors duration-200 hover:bg-white hover:text-black lg:mb-0 lg:px-8"
                    >
                      Read Documentation
                    </a>
                    <a
                      href="https://github.com/vercel/next.js/tree/canary/examples/cms-sanity"
                      className="mx-3 font-bold hover:underline"
                    >
                      View on GitHub
                    </a>
                  </div>
                </div>
              )}
            </div>
          </footer> */}
        {/* {isDraftMode && <VisualEditing />} */}
        <SpeedInsights />
     
      </body>
    </html>
  );
}
