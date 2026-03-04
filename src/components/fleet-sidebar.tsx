"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Truck, Users, Map, FileText, Settings, LogOut, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'Trips', href: '/trips' },
  { icon: Truck, label: 'Vehicles', href: '/vehicles' },
  { icon: Users, label: 'Drivers', href: '/drivers' },
  { icon: Package, label: 'Clients', href: '/clients' },
  { icon: Map, label: 'Live Map', href: '/map' },
];

export function FleetSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-sidebar h-screen text-sidebar-foreground flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-sidebar-primary p-2 rounded-lg">
          <Truck className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold font-headline tracking-tight">FleetOps</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-sidebar-primary text-white" 
                  : "hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-white" : "group-hover:text-sidebar-foreground")} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}