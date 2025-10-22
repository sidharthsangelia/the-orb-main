import { HeroSection } from "@/components/community/HeroSection";
import { CommunityRoles } from "@/components/community/CommunityRoles"; 
import { TestimonialsSection } from "@/components/community/Testemonial";
import { EnhancedCTA } from "@/components/community/EnhancedCta"; 
import { Achievements } from "@/components/community/Achievement"; 
import { sanityFetch } from "@/sanity/lib/fetch";
 
import { CommunityPageData } from "@/types/community";
import { communityPageQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { CTA } from "@/components/about/Cta";
import NewsletterHorizontalCard from "@/components/NewsletterCard";


export const metadata: Metadata = {
  title: "Community",
  description: "Join India's most vibrant community of planet-conscious youth transforming climate awareness into actionable change.",
};

const CommunityPage = async () => {
  // Fallback data in case Sanity returns null
  const defaultData: CommunityPageData = {
    heroSection: {
      badge: "#YouthForPlanet Movement",
      mainHeading: "Build the",
      secondaryHeading: "Future Together",
      description: "Join India's most vibrant community of planet-conscious youth transforming climate awareness into actionable change.",
      joinMovementUrl: "https://forms.google.com/your-form-link",
      founderMessageUrl: "/founder/message",
      impactStats: [
        { value: 12847, label: "Trees Planted", icon: "TreePine" },
        { value: 2500, label: "Youth Connected", icon: "Users" },
        { value: 156, label: "Communities", icon: "Globe" },
        { value: 89, label: "Active Projects", icon: "Target" }
      ]
    },
    testimonialsSection: {
      title: "Voices of Change",
      description: "Real stories from community members making a difference",
      testimonials: [
        {
          name: "Arjun Sharma",
          role: "Climate Journalist, Delhi",
          content: "This community gave me the platform to tell stories that matter. My articles on urban sustainability have now reached millions.",
          avatar: "AS"
        },
        {
          name: "Priya Patel",
          role: "Visual Creator, Mumbai",
          content: "From zero followers to 100K+ in 8 months. The mentorship and collaboration opportunities here are unmatched.",
          avatar: "PP"
        },
        {
          name: "Rahul Kumar",
          role: "Community Educator, Bangalore",
          content: "I've conducted workshops in 15 schools this year. The impact we're creating together is beyond anything I imagined.",
          avatar: "RK"
        }
      ]
    },
    achievementsSection: {
      title: "Recognition & Impact",
      description: "Our community's achievements speak louder than words",
      achievements: [
        {
          title: "Featured in National Media",
          description: "Coverage by leading publications",
          icon: "Award"
        },
        {
          title: "Fastest Growing Community", 
          description: "300% growth in 2024",
          icon: "TrendingUp"
        },
        {
          title: "Multi-City Presence",
          description: "Active in 25+ cities", 
          icon: "Users2"
        },
        {
          title: "Innovation Award Winner",
          description: "Best Youth Initiative 2024",
          icon: "Lightbulb"
        }
      ]
    },
    ctaSection: {
      title: "Connect With Us",
      description: "The future of our planet is being written right now — and you have a part to play in the story. Whether you're a student, educator, creator, or someone who cares, we want to hear from you. Real change begins with conversations, collaborations, and communities like ours.",
      primaryButtonText: "Let's Build Together",
      secondaryButtonText: "Get In Touch", 
      hashtags: "#YouthforPlanet #CreativeClimateCampaigns"
    }
  };

  // Helper function to safely merge data with fallback
  const createSafePageData = (sanityData: any): CommunityPageData => {
    return {
      heroSection: {
        badge: sanityData?.heroSection?.badge || defaultData.heroSection.badge,
        mainHeading: sanityData?.heroSection?.mainHeading || defaultData.heroSection.mainHeading,
        secondaryHeading: sanityData?.heroSection?.secondaryHeading || defaultData.heroSection.secondaryHeading,
        description: sanityData?.heroSection?.description || defaultData.heroSection.description,
        joinMovementUrl: sanityData?.heroSection?.joinMovementUrl || defaultData.heroSection.joinMovementUrl,
        founderMessageUrl: sanityData?.heroSection?.founderMessageUrl || defaultData.heroSection.founderMessageUrl,
        impactStats: sanityData?.heroSection?.impactStats || defaultData.heroSection.impactStats,
      },
      testimonialsSection: {
        title: sanityData?.testimonialsSection?.title || defaultData.testimonialsSection.title,
        description: sanityData?.testimonialsSection?.description || defaultData.testimonialsSection.description,
        testimonials: sanityData?.testimonialsSection?.testimonials || defaultData.testimonialsSection.testimonials,
      },
      achievementsSection: {
        title: sanityData?.achievementsSection?.title || defaultData.achievementsSection.title,
        description: sanityData?.achievementsSection?.description || defaultData.achievementsSection.description,
        achievements: sanityData?.achievementsSection?.achievements || defaultData.achievementsSection.achievements,
      },
      ctaSection: {
        title: sanityData?.ctaSection?.title || defaultData.ctaSection.title,
        description: sanityData?.ctaSection?.description || defaultData.ctaSection.description,
        primaryButtonText: sanityData?.ctaSection?.primaryButtonText || defaultData.ctaSection.primaryButtonText,
        secondaryButtonText: sanityData?.ctaSection?.secondaryButtonText || defaultData.ctaSection.secondaryButtonText,
        hashtags: sanityData?.ctaSection?.hashtags || defaultData.ctaSection.hashtags,
      },
    };
  };

  try {
    // Fetch data from Sanity with proper type handling
    const communityDataResult = await sanityFetch({
      query: communityPageQuery,
      // tags: ['communityPage'],
    });

    // Create safe page data that handles all null cases
    const pageData: CommunityPageData = createSafePageData(communityDataResult);

    return (
      <div className="min-h-screen bg-background overflow-hidden">
        {/* Hero Section - Asymmetric Design */}
        <HeroSection data={pageData.heroSection} />
         
        {/* Community Roles - Tabbed Interface */}
        <CommunityRoles />
         
        {/* Testimonials Section */}
        {/* <TestimonialsSection data={pageData.testimonialsSection} /> */}
         
        {/* Achievements Showcase */}
        <Achievements data={pageData.achievementsSection} />
        
        {/* Enhanced CTA Section */}
        {/* <EnhancedCTA data={pageData.ctaSection} /> */}
        <NewsletterHorizontalCard/>
        <CTA />
      </div>
    );
  } catch (error) {
    // Fallback to default data in case of any fetch errors
    console.error('Failed to fetch community data from Sanity:', error);
    
    return (
      <div className="min-h-screen bg-background overflow-hidden">
        {/* Hero Section - Asymmetric Design */}
        <HeroSection data={defaultData.heroSection} />
         
        {/* Community Roles - Tabbed Interface */}
        <CommunityRoles />
         
        {/* Testimonials Section */}
        {/* <TestimonialsSection data={defaultData.testimonialsSection} /> */}
         
        {/* Achievements Showcase */}
        <Achievements data={defaultData.achievementsSection} />
        
        {/* Enhanced CTA Section */}
        {/* <EnhancedCTA data={defaultData.ctaSection} /> */}
        <CTA/>
      </div>
    );
  }
};

export default CommunityPage;