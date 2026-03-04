"use client"

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, MapPin, Navigation, Info, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ActiveTripPage() {
  const [status, setStatus] = useState<'In Transit' | 'Arrived'>('In Transit');

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="h-64 bg-slate-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="w-8 h-8 text-primary animate-bounce" />
          <div className="absolute bottom-4 left-4 right-4 p-4 glass-card rounded-2xl flex justify-between items-center shadow-lg">
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-500">Current Location</p>
              <p className="text-sm font-bold">Interstate 5 South, Bakersfield</p>
            </div>
            <Button size="icon" className="rounded-full bg-primary h-12 w-12 shadow-lg">
              <Navigation className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        <header className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Trip #101</h1>
            <p className="text-sm text-slate-500 font-medium">TechGlobal Corp - Electronics</p>
          </div>
          <Badge className={status === 'Arrived' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
            {status}
          </Badge>
        </header>

        <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase">Checkpoints</span>
              <Info className="w-4 h-4 text-slate-400" />
            </div>
            <div className="p-4 space-y-6">
              <CheckpointItem title="Origin Pickup" time="08:15 AM" completed />
              <CheckpointItem title="Weight Bridge #2" time="10:30 AM" completed />
              <CheckpointItem title="Destination Hub" time="Pending" active />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-16 rounded-2xl flex flex-col items-center justify-center gap-1 border-slate-200 bg-white shadow-sm">
            <Camera className="w-5 h-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Add Photo</span>
          </Button>
          <Button variant="outline" className="h-16 rounded-2xl flex flex-col items-center justify-center gap-1 border-slate-200 bg-white shadow-sm">
            <AlertCircle className="w-5 h-5 text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Report Issue</span>
          </Button>
        </div>

        {status === 'In Transit' ? (
          <Button 
            className="w-full h-14 rounded-2xl bg-accent hover:bg-accent/90 text-white font-bold text-lg shadow-lg"
            onClick={() => setStatus('Arrived')}
          >
            Llegué al destino
          </Button>
        ) : (
          <Button 
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg"
          >
            Confirmar Entrega
          </Button>
        )}
      </div>
    </div>
  );
}

function CheckpointItem({ title, time, completed = false, active = false }: { title: string, time: string, completed?: boolean, active?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${completed ? 'bg-green-500' : active ? 'border-2 border-primary' : 'bg-slate-100'}`}>
          {completed && <CheckCircle2 className="w-4 h-4 text-white" />}
          {active && <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
        </div>
        <span className={`text-sm font-bold ${completed ? 'text-slate-500 line-through' : 'text-slate-900'}`}>{title}</span>
      </div>
      <span className="text-[10px] font-bold text-slate-400">{time}</span>
    </div>
  );
}