import { FleetSidebar } from '@/components/fleet-sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Plus, Calendar, ShieldCheck } from 'lucide-react';
import { mockDrivers } from '@/lib/mock-data';

export default function DriversPage() {
  return (
    <div className="flex bg-background min-h-screen">
      <FleetSidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Driver Management</h1>
              <p className="text-muted-foreground">Manage driver profiles, qualifications, and compliance.</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add New Driver
            </Button>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Active Drivers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver Name</TableHead>
                    <TableHead>Qualifications</TableHead>
                    <TableHead>License Expiry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDrivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-bold">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          {driver.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {driver.qualifications.map((q) => (
                            <Badge key={q} variant="secondary" className="text-[10px] py-0">
                              {q}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          {driver.licenseExpiry}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={driver.status === 'Available' ? 'default' : 'outline'}
                        >
                          {driver.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Profile</Button>
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
