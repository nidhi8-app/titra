"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutGrid, Bug, Files, Users } from "lucide-react";

const NavMenu = () => {
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutGrid,
      href: "#",
      active: true,
    },
    {
      label: "Learning Style",
      icon: Bug,
      href: "#",
    },
    {
      label: "Quizzes",
      icon: Files,
      href: "#",
    },
    {
      label: "Friends",
      icon: Users,
      href: "#",
    },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton
            asChild
            isActive={item.active}
            className="font-sidebar font-bold text-lg"
          >
            <a href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default NavMenu;
