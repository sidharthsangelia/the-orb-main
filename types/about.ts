// types/about.ts
export interface AboutPageData {
  title: string;
  tagline?: string;
  introText?: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  mission?: string;
  vision?: string;
  coreValues: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  whatWeDo: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  journey: Array<{
    year: string;
    title: string;
    description?: string;
  }>;
  seoTitle?: string;
  seoDescription?: string;
}
 
