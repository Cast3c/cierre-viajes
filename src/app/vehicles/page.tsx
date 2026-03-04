import { FleetSidebar } from '@/components/fleet-sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, Plus, MapPin, Weight } from 'lucide-react';
import { mockTrucks } from '@/lib/mock-data';

export default function VehiclesPage() {
  return (
    <div className="flex bg-background min-h-screen">
      <FleetSidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Vehicle Management</h1>
              <p className="text-muted-foreground">Monitor and manage your fleet of transport vehicles.</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Register Vehicle
            </Button>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Fleet List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>License Plate</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Current Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTrucks.map((truck) => (
                    <TableRow key={truck.id}>
                      <TableCell className="font-bold">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-muted-foreground" />
                          {truck.licensePlate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Weight className="w-3 h-3 text-muted-foreground" />
                          {truck.capacityKg.toLocaleString()} kg
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          {truck.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={truck.status === 'Available' ? 'default' : 'outline'}
                          className={truck.status === 'Maintenance' ? 'bg-accent text-white border-transparent' : ''}
                        >
                          {truck.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
