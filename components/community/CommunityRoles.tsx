import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ChevronRight, LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { COMMUNITY_ROLES_QUERY } from "@/sanity/lib/queries";

// Type definitions
interface Role {
  key: string | null;
  title: string | null;
  impact: string | null;
  description: string | null;
  icon: string | null;
  color: string | null;
  skills?: string[] | null;
  actions?: string[] | null;
}

interface RoleData {
  [key: string]: Role;
}

interface RoleContentProps {
  role: Role;
}

export const CommunityRoles = async () => {
  const roles: Role[] = await sanityFetch({ query: COMMUNITY_ROLES_QUERY });

  // Convert array into object keyed by `role.key`
  const roleData: RoleData = roles.reduce((acc: RoleData, role: Role) => {
    if (role.key) {
      acc[role.key] = role;
    }
    return acc;
  }, {});

  const RoleContent: React.FC<RoleContentProps> = ({ role }) => {
    const IconComponent: LucideIcon = (Icons as any)[role.icon || 'Camera'] || Icons.Camera;

    return (
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className={`p-4 bg-gradient-to-br ${role.color || 'from-primary to-secondary'} rounded-2xl`}>
              <IconComponent className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{role.title || 'Untitled'}</h3>
              <p className="text-primary font-medium">{role.impact || ''}</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {role.description || ''}
          </p>
          <div className="space-y-4">
            <h4 className="font-semibold">Key Skills You'll Develop:</h4>
            <div className="flex flex-wrap gap-2">
              {role.skills?.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="relative">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${role.color || 'from-primary to-secondary'} rounded-3xl blur-xl opacity-50`}
          ></div>
          <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">What You'll Do</h4>
                <ChevronRight className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-4">
                {role.actions?.map((action: string, idx: number) => (
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
  };

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
            Every changemaker has a unique strength. Discover how your skills
            can drive India's sustainability revolution.
          </p>
        </div>

<Tabs defaultValue={Object.keys(roleData)[0]} className="max-w-6xl mx-auto">
  <div className="text-center mb-8">
    <TabsList
      className="
        grid grid-cols-2 gap-2
        sm:flex sm:flex-wrap sm:justify-center
        bg-muted/50 p-1 rounded-xl backdrop-blur-sm border border-border/50
      "
    >
      {Object.entries(roleData).map(([key, role]: [string, Role]) => (
        <TabsTrigger
          key={key}
          value={key}
          className="
            w-full px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-medium
            transition-all duration-300
            data-[state=active]:bg-background
            data-[state=active]:text-foreground
            data-[state=active]:shadow-lg
            data-[state=active]:shadow-primary/20
            data-[state=active]:scale-105
          "
        >
          {role.title || "Untitled"}
        </TabsTrigger>
      ))}
    </TabsList>
  </div>

  {Object.entries(roleData).map(([key, role]: [string, Role]) => (
    <TabsContent
      key={key}
      value={key}
      className="mt-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
    >
      <RoleContent role={role} />
    </TabsContent>
  ))}
</Tabs>


      </div>
    </section>
  );
};