import type { LucideIcon } from 'lucide-react';
import { Home, FileText, Search, Users, Settings } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/proposals', label: 'Proposals', icon: FileText },
  { href: '/dashboard/grants', label: 'Find Grants', icon: Search },
  { href: '/dashboard/team', label: 'Team', icon: Users },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];
