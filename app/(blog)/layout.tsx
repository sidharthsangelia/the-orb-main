import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  VisualEditing,
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { Inter } from "next/font/google";

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
  const siteSettings = data;

  // Extract logo logic to avoid TypeScript issues
  const logoUrl =
    data?.logo?.asset && data.logo
      ? urlForImage(data.logo)?.url?.() ?? undefined
      : undefined;


const footerData = {
  title: data?.title,
  description: data?.description,
  footerText: data?.footerText,
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
    <html lang="en" className={`${inter.variable} bg-white text-black`} suppressHydrationWarning>
      <body>
          {/* {isDraftMode && <AlertBanner />} */}
           
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
        <Header1
          title={data?.title}
          description={data?.description}
          logo={logoUrl}
        />
          {/* <section className="min-h-screen"> */}
            {children}
          {/* </section> */}
            
            {siteSettings && <Footer siteSettings={footerData} />}
          </ThemeProvider>
                  
          <SpeedInsights />
            
        </body>
    </html>
  );
}