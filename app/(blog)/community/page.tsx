import { HeroSection } from "@/components/community/HeroSection";
import { CommunityRoles } from "@/components/community/CommunityRoles"; 
import { TestimonialsSection } from "@/components/community/Testemonial";
import { EnhancedCTA } from "@/components/community/EnhancedCta"; 
import { Achievements } from "@/components/community/Achievement"; 
import { sanityFetch } from "@/sanity/lib/fetch";
 
import { CommunityPageData } from "@/types/community";
import { communityPageQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Community",
  description: "...",
};

const CommunityPage = async () => {
  // Fetch data from Sanity
  const communityData: CommunityPageData = await sanityFetch({
    query: communityPageQuery,
    tags: ['communityPage'],
  });

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

  // Use fetched data or fallback to default
  const pageData = communityData || defaultData;

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section - Asymmetric Design */}
      <HeroSection data={pageData.heroSection} />
       
      {/* Community Roles - Tabbed Interface */}
      <CommunityRoles />
       
      {/* Testimonials Section */}
      <TestimonialsSection data={pageData.testimonialsSection} />
       
      {/* Achievements Showcase */}
      <Achievements data={pageData.achievementsSection} />
      
      {/* Enhanced CTA Section */}
      <EnhancedCTA data={pageData.ctaSection} />
    </div>
  );
};

export default CommunityPage;