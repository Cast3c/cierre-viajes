import { AITripAssignmentTool } from '@/components/ai-trip-assignment';
import { FleetSidebar } from '@/components/fleet-sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TripsPage() {
  return (
    <div className="flex bg-background min-h-screen">
      <FleetSidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Trip Management</h1>
              <p className="text-muted-foreground">Assign and track logistics operations across the fleet.</p>
            </div>
          </header>

          <Tabs defaultValue="assign" className="w-full">
            <TabsList className="bg-muted p-1 mb-6">
              <TabsTrigger value="assign" className="data-[state=active]:bg-white">AI Assignment</TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:bg-white">Active Trips</TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-white">Trip History</TabsTrigger>
            </TabsList>

            <TabsContent value="assign">
              <AITripAssignmentTool />
            </TabsContent>

            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>Currently Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic text-sm">Real-time GPS tracking enabled for 12 active vehicles.</p>
                  {/* Trip list table would go here */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}