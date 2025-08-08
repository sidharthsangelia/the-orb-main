// types/community.ts

export interface ImpactStat {
  value: number;
  label: string;
  icon: 'TreePine' | 'Users' | 'Globe' | 'Target';
}

export interface HeroSectionData {
  badge: string;
  mainHeading: string;
  secondaryHeading: string;
  description: string;
  joinMovementUrl: string;
  founderMessageUrl: string;
  impactStats: ImpactStat[];
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