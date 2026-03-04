import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Users, AlertTriangle, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';
import { mockTrips, mockTrucks, mockDrivers } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const activeTrips = mockTrips.filter(t => t.status === 'In Progress');
  const delayedTrips = mockTrips.filter(t => t.status === 'Delayed');
  const availableTrucks = mockTrucks.filter(t => t.status === 'Available');

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Fleet Overview</h1>
        <p className="text-muted-foreground">Real-time status of your logistics network.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Trips" 
          value={activeTrips.length} 
          icon={<Truck className="text-primary w-5 h-5" />}
          trend="+2 since yesterday"
        />
        <StatCard 
          title="Available Drivers" 
          value={mockDrivers.filter(d => d.status === 'Available').length} 
          icon={<Users className="text-primary w-5 h-5" />}
          trend="85% occupancy"
        />
        <StatCard 
          title="Vehicles Idle" 
          value={availableTrucks.length} 
          icon={<CheckCircle2 className="text-primary w-5 h-5" />}
          trend="Ready for dispatch"
        />
        <StatCard 
          title="Critical Alerts" 
          value={delayedTrips.length + 1} 
          icon={<AlertTriangle className="text-accent w-5 h-5" />}
          trend="1 driver license expiring"
          highlight
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between p-4 bg-muted/40 rounded-xl border border-border/50 hover:bg-muted/60 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Truck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{trip.origin} <ArrowRight className="inline w-4 h-4 mx-1" /> {trip.destination}</p>
                      <p className="text-sm text-muted-foreground">{trip.customer} • Driver: {mockDrivers.find(d => d.id === trip.driverId)?.name}</p>
                    </div>
                  </div>
                  <Badge variant={trip.status === 'In Progress' ? 'default' : 'outline'} className={trip.status === 'Delayed' ? 'bg-accent text-white border-transparent' : ''}>
                    {trip.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ActionButton label="Dispatch New Trip" color="primary" />
            <ActionButton label="Register Vehicle" color="secondary" />
            <ActionButton label="Add New Driver" color="secondary" />
            <div className="pt-4 border-t mt-4">
              <h4 className="text-sm font-semibold mb-3">Live Feed</h4>
              <div className="space-y-3">
                <FeedItem text="TRK-002 reached destination" time="2m ago" />
                <FeedItem text="New trip created by Admin" time="15m ago" />
                <FeedItem text="Alert: TRK-003 needs service" time="1h ago" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, highlight }: { title: string, value: number | string, icon: React.ReactNode, trend?: string, highlight?: boolean }) {
  return (
    <Card className={cn(highlight && "border-accent/20")}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="bg-muted p-2 rounded-lg">{icon}</div>
        </div>
        <div className="space-y-1">
          <h3 className="text-3xl font-bold">{value}</h3>
          <p className="text-xs text-muted-foreground">{trend}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionButton({ label, color }: { label: string, color: 'primary' | 'secondary' }) {
  return (
    <button className={cn(
      "w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all",
      color === 'primary' ? "bg-primary text-white hover:bg-primary/90" : "bg-muted hover:bg-muted/80"
    )}>
      {label}
    </button>
  );
}

function FeedItem({ text, time }: { text: string, time: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground truncate mr-2">{text}</span>
      <span className="text-[10px] text-muted-foreground whitespace-nowrap">{time}</span>
    </div>
  );
}
