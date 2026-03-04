import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, MapPin, Package, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function DriverMobileHome() {
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between py-2">
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Driver App</h2>
          <h1 className="text-2xl font-bold text-slate-900">Hola, Alice!</h1>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
          <Truck className="w-6 h-6 text-white" />
        </div>
      </header>

      <section className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Active Trip</h3>
        <Link href="/mobile/active">
          <Card className="border-none shadow-md overflow-hidden bg-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">In Transit</Badge>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Estimated Arrival</p>
                  <p className="text-sm font-bold text-primary">14:45 PM</p>
                </div>
              </div>

              <div className="space-y-4 relative">
                <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-slate-100" />
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Origin</p>
                    <p className="text-sm font-bold">Los Angeles Distribution Center</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Destination</p>
                    <p className="text-sm font-bold">San Francisco Retail Hub</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Package className="w-4 h-4" />
                    <span className="text-xs font-bold">2.4 Tons</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-bold">4h 20m</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Recent Tasks</h3>
          <Link href="/mobile/history" className="text-[10px] font-bold text-primary uppercase">View All</Link>
        </div>
        <div className="space-y-3">
          <MiniTaskCard title="Document Upload" subtitle="Trip #9421" time="2h ago" />
          <MiniTaskCard title="Fuel Log" subtitle="Trip #9421" time="Yesterday" />
        </div>
      </section>
    </div>
  );
}

function MiniTaskCard({ title, subtitle, time }: { title: string, subtitle: string, time: string }) {
  return (
    <div className="p-4 bg-white rounded-2xl flex items-center justify-between shadow-sm border border-slate-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
          <ClipboardList className="w-5 h-5 text-slate-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{title}</p>
          <p className="text-[10px] text-slate-400 font-medium">{subtitle}</p>
        </div>
      </div>
      <span className="text-[10px] font-bold text-slate-400">{time}</span>
    </div>
  );
}

function ClipboardList(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}