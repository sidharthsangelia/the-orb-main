// types/community.ts

export interface ImpactStat {
  value: number;
  label: string;
  icon: 'TreePine' | 'Users' | 'Globe' | 'Target';
}

export interface HeroSectionData {
  badge: string | null;
  mainHeading: string  | null;
  secondaryHeading: string | null;
  description: string | null;
  joinMovementUrl: string | null;
  founderMessageUrl: string | null;
  impactStats: ImpactStat[] | null;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface TestimonialsSectionData {
  title: string;
  description: string;
  testimonials: Testimonial[];
}

export interface Achievement {
  title: string;
  description: string;
  icon: 'Award' | 'TrendingUp' | 'Users2' | 'Lightbulb';
}

export interface AchievementsSectionData {
  title: string;
  description: string;
  achievements: Achievement[];
}

export interface CTASectionData {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  hashtags: string;
}

export interface CommunityPageData {
  heroSection: HeroSectionData;
  testimonialsSection: TestimonialsSectionData;
  achievementsSection: AchievementsSectionData;
  ctaSection: CTASectionData;
}