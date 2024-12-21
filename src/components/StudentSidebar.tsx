import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
interface itemType {
    title: string
    iconUrl: string
}

const items: itemType[] = [
  {
    title: "Dashboard",
    iconUrl: "/dshaboard_icon.svg",
  },
  {
    title: "Students",
    iconUrl: "/students_icon.svg",
  },
  {
    title: "Chapter",
    iconUrl: "/chapter_icon.svg",
  },
  {
    title: "Help",
    iconUrl: "/help_icon.svg",
  },
  {
    title: "Reports",
    iconUrl: "/reports_icon.svg",
  },
  {
    title: "Settings",
    iconUrl: "/settings_icon.svg",
  },
]

export function StudentSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="py-6">
        <SidebarGroup>
          <SidebarGroupLabel>
            <img src="/app_icon.svg" alt="" />
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-10">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild className="px-4 h-12">
                    <div>
                        <img className="text-[#6F767E]" src={item.iconUrl} alt="noPic" />
                      <p className="text-[#6F767E] font-bold text-base ml-2">{item.title}</p>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
