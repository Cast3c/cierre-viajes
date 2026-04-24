import { FleetSidebar } from '@/components/fleet-sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function LiveMapPage() {
  return (
    <div className="flex bg-background min-h-screen">
      <FleetSidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Live Fleet Map</h1>
              <p className="text-muted-foreground">Real-time GPS tracking of active vehicles.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search vehicle or trip..." className="pl-10" />
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-1">
                12 Systems Online
              </Badge>
            </div>
          </header>

          <Card className="h-[calc(100vh-12rem)] overflow-hidden">
            <CardContent className="p-0 h-full relative bg-slate-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="bg-primary/10 p-4 rounded-full inline-block animate-pulse">
                    <MapPin className="w-12 h-12 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Interactive Map Component</h2>
                    <p className="text-muted-foreground">Integrating Google Maps / Mapbox Engine...</p>
                  </div>
                </div>
              </div>

              {/* Mock Vehicle Pins */}
              <div className="absolute top-1/4 left-1/3">
                <VehiclePin plate="ABC-123" />
              </div>
              <div className="absolute top-1/2 left-2/3">
                <VehiclePin plate="DEF-456" />
              </div>
              <div className="absolute bottom-1/4 left-1/4">
                <VehiclePin plate="GHI-789" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function VehiclePin({ plate }: { plate: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="bg-primary text-white p-2 rounded-lg shadow-lg flex items-center gap-2 transform transition-transform group-hover:scale-110">
        <Truck className="w-4 h-4" />
        <span className="text-xs font-bold">{plate}</span>
      </div>
      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-primary mx-auto" />
    </div>
  );
}
