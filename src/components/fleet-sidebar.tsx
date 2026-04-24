"use client"

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Truck, Users, Map, FileText, Settings, LogOut, Package, Building2, SquareChevronRight, SquareChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'Viajes', href: '/dashboard/trips' },
  { icon: Truck, label: 'Vehiculos', href: '/dashboard/vehicles' },
  { icon: Users, label: 'Conductores', href: '/dashboard/drivers' },
  { icon: Package, label: 'Clientes', href: '/dashboard/clients' },
  { icon: Map, label: 'Mapa', href: '/map' },
  { icon: Building2, label: 'Empresas', href: '/dashboard/empresas' }
];

export function FleetSidebar() {
  const [collapsed, setCollapsed] = useState(true)
  const pathname = usePathname();

  const toggleSideBar = () => {
    setCollapsed(prev => !prev)
  }

  return (
    <div className={cn(collapsed ? "w-16" : "w-64", "sticky top-0 self-start min-h-screen bg-sidebar h-screen text-sidebar-foreground flex flex-col transition-[width] duration-300 ease-in-out")}>
      <div className={cn("p-6 flex items-center gap-3 ", collapsed && "justify-center")}>
        <div className="bg-sidebar-primary p-2 rounded-lg ">
          <Truck className="w-6 h-6 text-white" />
        </div>
        <span className={cn("text-xl font-bold font-headline tracking-tight", collapsed &&  "hidden")}>FleetOps</span>
      </div>
      <nav className="flex-1 p-4 space-y-6 ">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === (item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn( 
                "flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-200 group",
                collapsed ? "justify-center px-1" : "gap-3",
                isActive 
                  ? "bg-sidebar-primary text-white" 
                  : "hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground"
              )}
            >
              <Icon className={cn(collapsed ? "w-6 h-6" : "w-5 h-5", isActive ? "text-white" : "group-hover:text-sidebar-foreground transition-all")} />
              <span className={cn("font-medium transition-all", collapsed && "hidden")}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button className='p-4 flex items-center justify-center cursor-pointer' onClick={toggleSideBar} >
          {collapsed ?
            <SquareChevronRight className='w-4 h-4 ' /> :
            <SquareChevronLeft className='w-4 h-4' />
          }
        </button>
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}