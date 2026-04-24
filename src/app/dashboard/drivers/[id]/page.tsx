import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getConductor, actualizarConductor, getConductorOverview } from "../actions";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Route, Receipt, CircleCheckBigIcon } from   'lucide-react'
import { cn } from "@/lib/utils";

export default async function ViewDriver({
  params,
}: {
  params: { id: string };
}) {
  const  {id} = params;

  const driver = await getConductor(id);
  const month = new Date().toLocaleString("es-CO", {
    month: "long",
  })
  const driverOverview = await getConductorOverview(id)


  function StatCard({ title, value, icon, trend, highlight }: { title: string, value: number | string, icon: React.ReactNode, trend?: string, highlight?: boolean }) {
    return (
      <Card className={cn("shadow-lg hover:shadow-xl transition-shadow",highlight && "border-accent/20")}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="bg-muted p-2 rounded-lg">{icon}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-start p-4">
              <h3 className="text-md text-muted-foreground">{value}</h3>
              <p className="text-xl font-bold">{trend}</p>
            </div>
          </div>
          
        </CardContent>
      </Card>
    );
  }

  function ActionButton({
    label,
    color,
  }: {
    label: string;
    color: "primary" | "secondary";
  }) {
    return (
      <button
        className={cn(
          "w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all",
          color === "primary"
            ? "bg-primary text-white hover:bg-primary/90"
            : "bg-muted hover:bg-muted/80",
        )}
      >
        {label}
      </button>
    );
  }

  function FeedItem({ text, time }: { text: string; time: string }) {
    return (
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground truncate mr-2">{text}</span>
        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
          {time}
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{driver.nombres} {driver.apellidos}</h1>
        <p className="text-muted-foreground uppercase">
          <Badge variant="default">{driver.estado}</Badge>
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Viajes"
          value={driverOverview.totalviajes}
          icon={<Route className="text-primary w-5 h-5" />}
          trend="+2 since yesterday"
        />
        <StatCard
          title="Dinero bruto"
          value="{}"
          icon={<Receipt className="text-primary w-5 h-5" />}
          trend="85% occupancy"
        />
        <StatCard
          title="Gastos"
          value=""
          icon={<CircleCheckBigIcon className="text-primary w-5 h-5" />}
          trend="Ready for dispatch"
        />
        <StatCard
          title="Ganancia conductor"
          value=""
          icon={<CircleCheckBigIcon className="text-primary w-5 h-5" />}
          trend="Ready for dispatch"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-700 via-red-500 to-red-700 text-white">
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
