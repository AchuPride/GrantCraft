'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Rocket, LifeBuoy } from 'lucide-react';
import { Button } from '../ui/button';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2" aria-label="GrantCraft AI Home">
            <div className="bg-accent rounded-lg p-2">
                <Rocket className="h-6 w-6 text-accent-foreground" />
            </div>
            <h1 className="text-xl font-headline font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              GrantCraft AI
            </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-0">
        <SidebarMenu className="px-2">
          {NAV_LINKS.map(link => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} passHref legacyBehavior>
                <SidebarMenuButton
                  isActive={pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href))}
                  tooltip={{ children: link.label, side: 'right' }}
                  className="justify-start"
                >
                  <link.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
       <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={{ children: "Help & Support", side: "right" }}
              className="justify-start"
            >
              <LifeBuoy className="h-5 w-5" />
              <span className="group-data-[collapsible=icon]:hidden">Help & Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
