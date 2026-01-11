
"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutGrid, Bug, Files, Users, User, Archive } from "lucide-react";

type ActiveView = "dashboard" | "learning-style" | "quizzes" | "friends" | "account" | "archived";

type NavMenuProps = {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
};

const NavMenu = ({ activeView, onNavigate }: NavMenuProps) => {
  const menuItems: { id: ActiveView; label: string; icon: React.ElementType }[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutGrid,
    },
    {
      id: "learning-style",
      label: "Learning Style",
      icon: Bug,
    },
    {
      id: "quizzes",
      label: "Quizzes",
      icon: Files,
    },
    {
      id: "friends",
      label: "Friends",
      icon: Users,
    },
    {
      id: "account",
      label: "My Account",
      icon: User,
    },
    {
      id: "archived",
      label: "Archived",
      icon: Archive,
    }
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton
            onClick={() => onNavigate(item.id)}
            isActive={activeView === item.id}
            className="font-sidebar font-bold text-lg"
          >
            <item.icon />
            <span>{item.label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default NavMenu;
