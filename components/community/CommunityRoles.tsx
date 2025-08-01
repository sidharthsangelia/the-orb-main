import React from 'react';
import { 
  Camera, 
  PenTool, 
  Mic, 
  BookOpen,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CommunityRoles = () => {
  const roleData = {
    creators: {
      title: "Visual Storytellers",
      icon: Camera,
      impact: "50M+ views generated",
      description: "Create compelling visual narratives that make climate science accessible and engaging through infographics, videos, and interactive content.",
      skills: ["Video Production", "Graphic Design", "Social Media"],
      color: "from-blue-500/20 to-purple-500/20",
      actions: [
        "Create impactful content that reaches millions",
        "Collaborate with like-minded changemakers",
        "Get featured on national platforms",
        "Access professional tools and resources",
        "Receive mentorship from industry experts"
      ]
    },
    journalists: {
      title: "Climate Journalists",
      icon: PenTool,
      impact: "200+ stories published",
      description: "Investigate and report on local environmental issues, policy changes, and community success stories across India.",
      skills: ["Research", "Writing", "Fact-checking"],
      color: "from-green-500/20 to-teal-500/20",
      actions: [
        "Investigate local environmental issues",
        "Interview climate experts and activists",
        "Publish stories in leading publications",
        "Build a portfolio of impactful journalism",
        "Connect with media professionals"
      ]
    },
    audio: {
      title: "Audio Creators",
      icon: Mic,
      impact: "1M+ downloads",
      description: "Host podcasts, create audio documentaries, and amplify diverse voices in the climate conversation.",
      skills: ["Audio Editing", "Interviewing", "Storytelling"],
      color: "from-orange-500/20 to-red-500/20",
      actions: [
        "Host engaging climate podcasts",
        "Create audio documentaries",
        "Interview change-makers nationwide",
        "Build loyal listener communities",
        "Get featured on major platforms"
      ]
    },
    educators: {
      title: "Community Educators",
      icon: BookOpen,
      impact: "10K+ students reached",
      description: "Design workshops, create educational resources, and lead sustainability initiatives in schools and communities.",
      skills: ["Curriculum Design", "Public Speaking", "Workshop Facilitation"],
      color: "from-pink-500/20 to-violet-500/20",
      actions: [
        "Design interactive climate workshops",
        "Create educational resources",
        "Lead school sustainability programs",
        "Train other educators",
        "Build community partnerships"
      ]
    }
  };

  const RoleContent = ({ roleKey, role }) => (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className={`p-4 bg-gradient-to-br ${role.color} rounded-2xl`}>
            <role.icon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{role.title}</h3>
            <p className="text-primary font-medium">{role.impact}</p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {role.description}
        </p>
        <div className="space-y-4">
          <h4 className="font-semibold">Key Skills You'll Develop:</h4>
          <div className="flex flex-wrap gap-2">
            {role.skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-br ${role.color} rounded-3xl blur-xl opacity-50`}></div>
        <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">What You'll Do</h4>
              <ChevronRight className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-4">
              {role.actions.map((action, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Find Your Superpower
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every changemaker has a unique strength. Discover how your skills can drive India's sustainability revolution.
          </p>
        </div>

        <Tabs defaultValue="creators" className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <TabsList className="bg-muted/50 p-1 rounded-xl backdrop-blur-sm border border-border/50">
              {Object.entries(roleData).map(([key, role]) => (
                <TabsTrigger 
                  key={key}
                  value={key}
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-300 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 data-[state=active]:scale-105"
                >
                  {role.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(roleData).map(([key, role]) => (
            <TabsContent 
              key={key}
              value={key} 
              className="mt-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
            >
              <RoleContent roleKey={key} role={role} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};