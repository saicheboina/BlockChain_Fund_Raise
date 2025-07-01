import {
  AudioWaveform,
  CircleGauge,
  CreditCard,
  Sparkles,
  Ticket,
  TicketCheck,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const data = {
  Company: [
    {
      name: "Dashboard",
      url: "/",
      icon: CircleGauge,
    },
    {
      name: "My Campaigns",
      url: "/my-campaigns",
      icon: TicketCheck,
    },
    {
      name: "Create Campaign",
      url: "/create-campaign",
      icon: Sparkles,
    },
    {
      name: "My Funds",
      url: "/transactions",
      icon: CreditCard,
    },
  ],
  Investors: [
    {
      name: "Dashboard",
      url: "/",
      icon: CircleGauge,
    },
    {
      name: "Campaigns",
      url: "/all-campaigns",
      icon: Ticket,
    },
    {
      name: "My Transactions",
      url: "/transactions",
      icon: CreditCard,
    },
  ],
  Admin: [
    {
      name: "Dashboard",
      url: "/",
      icon: CircleGauge,
    },
    {
      name: "Campaigns",
      url: "/all-campaigns",
      icon: Ticket,
    },
    {
      name: "All Transactions",
      url: "/transactions",
      icon: CreditCard,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { user } = useContext(AuthContext);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <AudioWaveform className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-lg leading-tight">
            <span className="truncate font-bold">FundHive</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data[user?.role] || data.Investors} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
