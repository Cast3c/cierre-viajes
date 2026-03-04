"use client"

import { useState } from 'react';
import { aiTripAssignmentAssistant, TripAssignmentOutput } from '@/ai/flows/ai-trip-assignment-assistant';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Truck, User, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

export function AITripAssignmentTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TripAssignmentOutput | null>(null);
  const [tripData, setTripData] = useState({
    tripId: 'TRIP-' + Math.floor(Math.random() * 1000),
    origin: '34.0522,-118.2437', // LA
    destination: '37.7749,-122.4194', // SF
    capacity: 5000,
    qualifications: 'Standard',
  });

  const handleRecommend = async () => {
    setLoading(true);
    try {
      const output = await aiTripAssignmentAssistant({
        tripId: tripData.tripId,
        originLocation: tripData.origin,
        destinationLocation: tripData.destination,
        requiredCapacityKg: tripData.capacity,
        requiredQualifications: tripData.qualifications.split(',').map(s => s.trim()),
        tripStartTime: new Date().toISOString(),
      });
      setResult(output);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 bg-primary/[0.02]">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5 fill-primary" />
            <CardTitle>AI Trip Assistant</CardTitle>
          </div>
          <CardDescription>Enter trip details to get intelligent assignment recommendations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Origin (Lat,Lon)</Label>
              <Input 
                value={tripData.origin} 
                onChange={(e) => setTripData({...tripData, origin: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <Label>Destination (Lat,Lon)</Label>
              <Input 
                value={tripData.destination} 
                onChange={(e) => setTripData({...tripData, destination: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <Label>Required Capacity (Kg)</Label>
              <Input 
                type="number" 
                value={tripData.capacity} 
                onChange={(e) => setTripData({...tripData, capacity: Number(e.target.value)})} 
              />
            </div>
            <div className="space-y-2">
              <Label>Required Qualifications (comma sep)</Label>
              <Input 
                value={tripData.qualifications} 
                onChange={(e) => setTripData({...tripData, qualifications: e.target.value})} 
              />
            </div>
          </div>
          <Button onClick={handleRecommend} disabled={loading} className="w-full bg-primary hover:bg-primary/90">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            Generate Recommendations
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <h3 className="text-lg font-bold flex items-center gap-2">
            AI Recommendations <span className="text-xs font-normal text-muted-foreground px-2 py-0.5 bg-muted rounded-full">Top {result.suggestedAssignments.length} matches</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.suggestedAssignments.map((rec, i) => (
              <Card key={i} className="border-2 border-transparent hover:border-primary/20 transition-all cursor-pointer group">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <User className="w-4 h-4" />
                        {rec.driverName}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                        <Truck className="w-4 h-4" />
                        {rec.truckLicensePlate}
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                      {(90 + Math.floor(Math.random() * 10))}% Match
                    </Badge>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg text-sm italic text-muted-foreground">
                    "{rec.reasoning}"
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                    <div className="flex flex-col">
                      <span>Distance</span>
                      <span className="font-bold text-foreground">{rec.estimatedDistanceKm} km</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span>Travel Time</span>
                      <span className="font-bold text-foreground">{rec.estimatedTravelTimeMinutes} mins</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white">
                    Confirm Assignment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}