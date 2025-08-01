
import { HeroSection } from '@/components/community/HeroSection';
import { CommunityRoles } from '@/components/community/CommunityRoles';
import { Timeline } from '@/components/community/Timeline';
import { TestimonialsSection } from '@/components/community/Testemonial';
import { EnhancedCTA } from '@/components/community/EnhancedCta';
import { SocialMediaFeed } from '@/components/community/SocialMedia';
import { Achievements } from '@/components/community/Achievement';

 

const CommunityPage = () => {
 

   

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section - Asymmetric Design */}
            <HeroSection />

      {/* Community Roles - Tabbed Interface */}
            <CommunityRoles/>

      {/* Timeline Section */}
  {/* <Timeline /> */}

      {/* Testimonials Section */}
     <TestimonialsSection />

      {/* Social Media Feed Section */}
  
            <SocialMediaFeed />
         

      {/* Achievements Showcase */}
      <Achievements/>
      {/* Enhanced CTA Section */}
   <EnhancedCTA/>

      {/* Final CTA - Creative Layout */}
     
    </div>
  );
};

export default CommunityPage;