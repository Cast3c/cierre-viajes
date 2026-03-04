import { Home, ClipboardList, History, User } from 'lucide-react';
import Link from 'next/link';

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="mobile-container shadow-2xl overflow-hidden border-x">
        <div className="flex-1 flex flex-col h-full bg-slate-50 relative pb-20">
          {children}
        </div>

        <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white border-t border-slate-200 h-20 px-6 flex items-center justify-between z-50">
          <MobileNavItem href="/mobile" icon={Home} label="Home" active />
          <MobileNavItem href="/mobile/active" icon={ClipboardList} label="Active" />
          <MobileNavItem href="/mobile/history" icon={History} label="History" />
          <MobileNavItem href="/mobile/profile" icon={User} label="Profile" />
        </nav>
      </div>
    </div>
  );
}

function MobileNavItem({ href, icon: Icon, label, active = false }: { href: string, icon: any, label: string, active?: boolean }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 group">
      <div className={`p-2 rounded-xl transition-colors ${active ? 'bg-primary/5' : 'group-hover:bg-slate-50'}`}>
        <Icon className={`w-6 h-6 ${active ? 'text-primary fill-primary/10' : 'text-slate-400 group-hover:text-primary'}`} />
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-primary' : 'text-slate-400'}`}>
        {label}
      </span>
    </Link>
  );
}