import { FleetSidebar } from '@/components/fleet-sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Package, Plus, Building2, Phone } from 'lucide-react';

const mockClients = [
  { id: 'C001', name: 'TechGlobal Corp', contact: '+1 555-0123', industry: 'Electronics', activeTrips: 2 },
  { id: 'C002', name: 'EcoBuild Supplies', contact: '+1 555-0199', industry: 'Construction', activeTrips: 1 },
  { id: 'C003', name: 'FreshFood Logistics', contact: '+1 555-0155', industry: 'FMCG', activeTrips: 0 },
];

export default function ClientsPage() {
  return (
    <div className="flex bg-background min-h-screen">
      <FleetSidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Client Management</h1>
              <p className="text-muted-foreground">Manage client relationships and merchandise profiles.</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Client Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Active Trips</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-bold">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          {client.name}
                        </div>
                      </TableCell>
                      <TableCell>{client.industry}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          {client.contact}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Package className="w-3 h-3 text-muted-foreground" />
                          {client.activeTrips}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Details</Button>
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
