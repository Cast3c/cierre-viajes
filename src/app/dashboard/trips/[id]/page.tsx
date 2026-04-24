import { getViaje, cambiarEstadoViaje, agregarClienteViaje } from "../actions";
import { getClientesParaSelect } from "../../clients/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmarEntrega } from "@/components/confirmar-entrega";
import Link from "next/link";

// Colores y etiquetas por estado
const estadoConfig: Record<
  string,
  {
    variant: "default" | "secondary" | "destructive" | "outline";
    label: string;
  }
> = {
  programado: { variant: "outline", label: "Programado" },
  en_transito: { variant: "default", label: "En tránsito" },
  en_destino: { variant: "secondary", label: "En destino" },
  cerrado: { variant: "default", label: "Cerrado" },
  cancelado: { variant: "destructive", label: "Cancelado" },
};

// Qué estados siguen a cada estado actual
const siguienteEstado: Record<string, { valor: string; label: string }[]> = {
  programado: [
    { valor: "en_transito", label: "🚛 Iniciar viaje" },
    { valor: "cancelado", label: "✕ Cancelar viaje" },
  ],
  en_transito: [{ valor: "en_destino", label: "📍 Llegué al destino" }],
  en_destino: [{ valor: "cerrado", label: "✓ Cerrar viaje" }],
  cerrado: [],
  cancelado: [],
};

const getProgressColor = (progress: number) => {
  if(progress < 40) return "bg-red-500";
  if(progress < 80) return "bg-yellow-500";
  return "bg-green-500";
} 

export default async function DetalleViajePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const viaje = await getViaje(id);
  const clientes = await getClientesParaSelect();

  if (!viaje) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Viaje no encontrado</p>
        <Link
          href="/dashboard/trips"
          className="text-primary text-sm hover:underline"
        >
          ← Volver a viajes
        </Link>
      </div>
    );
  }

  const config = estadoConfig[viaje.estado] ?? estadoConfig.programado;
  const acciones = siguienteEstado[viaje.estado] ?? [];
  const viajeClientes = (viaje as any).viaje_clientes ?? [];
  const conductor = (viaje as any).conductor;
  const camion = (viaje as any).camiones;
  const origen = (viaje as any).origen;
  const destino =  (viaje as any).destino;

  // Función para cambiar estado — usa bind para pasar el id
  const totalClientes = viajeClientes.length;
  const totalEntregados = viajeClientes.filter(
    (vc: any) => vc.entregado,
  ).length;
  const puedesCerrar = totalClientes > 0 && totalEntregados === totalClientes;
  const progreso = totalClientes > 0 ? (totalEntregados / totalClientes) * 100 : 0;

  const agregarCliente = agregarClienteViaje.bind(null, id);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <Link
            href="/dashboard/trips"
            className="text-muted-foreground text-sm hover:underline"
          >
            ← Volver a viajes
          </Link>
          <h1 className="text-2xl font-bold">
            {origen}
            <span className="text-muted-foreground mx-3">→</span>
            {destino}
          </h1>
          <div className="flex items-center gap-3">
            <Badge variant={config.variant}>{config.label}</Badge>
            <span className="text-sm text-muted-foreground font-mono">
              {id.slice(0, 8).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Botones de cambio de estado */}
        <div className="flex gap-2">
          {acciones.map((accion) => {
            // Si quiere cerrar verifica que todas las entregas estén hechas
            const deshabilitado = accion.valor === "cerrado" && !puedesCerrar;
            const cambiarEstado = cambiarEstadoViaje.bind(
              null,
              id,
              accion.valor,
            );

            return (
              <form key={accion.valor} action={cambiarEstado}>
                <Button
                  type="submit"
                  variant={
                    accion.valor === "cancelado" ? "destructive" : "default"
                  }
                  disabled={deshabilitado}
                  title={
                    deshabilitado
                      ? "Debes confirmar todas las entregas primero"
                      : ""
                  }
                >
                  {accion.label}
                </Button>
              </form>
            );
          })}
        </div>
      </div>
      {/* Progreso del viaje */}
      <div className="space-x-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Progreso:</span>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full trasition-all duration-500 ${getProgressColor(progreso)}`}
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{Math.round(progreso)}%</span>
        </div>
      </div>
          {/* Datos del viaje */}
        <div className="grid grid-cols-3 gap-4">
          {[
            // Conductor
            {
              label: "Conductor",
              value: conductor
                ? `${conductor.nombres} ${conductor.apellidos}`
                : "—",
              sub: conductor?.telefono ?? "",
            },
            // Camion
            {
              label: "Camión",
              value: camion ? `${camion.placa}` : "—",
              sub: camion ? `${camion.marca} ${camion.modelo}` : "",
            },
            // Flete
            {
              label: "Flete total",
              value:
                viaje.valor_flete_total > 0
                  ? new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      maximumFractionDigits: 0,
                    }).format(viaje.valor_flete_total)
                  : "$0",
              sub: `${totalClientes} cliente(s)`,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 space-y-1 bg-neutral-50"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                {item.label}
              </p>
              <p className="font-medium">{item.value}</p>
              {item.sub && (
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              )}
            </div>
          ))}
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Lista de clientes en el viaje */}
        <div className="space-y-4 overflow-y-hidden max-h-1/2">
          <h2 className="font-semibold text-lg">
            Clientes en este viaje
            <span className="text-muted-foreground font-normal text-sm ml-2 ">
              ({totalClientes})
            </span>
          </h2>

          {viajeClientes.length === 0 ? (
            <div className="border rounded-xl p-8 text-center text-muted-foreground bg-neutral-50">
              No hay clientes agregados aún. Agrega el primero abajo.
            </div>
          ) : (
            <div className="space-y-3 rounded-xl">
              {viajeClientes
                .sort((a: any, b: any) => a.orden_entrega - b.orden_entrega)
                .map((vc: any) => (
                  <div
                    key={vc.id}
                    className={`border rounded-xl p-4 space-y-2 ${
                      vc.entregado ? "bg-muted/30" : "bg-neutral-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                          {vc.orden_entrega}
                        </div>
                        <div>
                          <p className="font-medium">
                            {vc.clientes?.nombre ?? "—"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Destino: {vc.destino_cliente}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-green-600">
                          {new Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            maximumFractionDigits: 0,
                          }).format(vc.valor_flete)}
                        </span>
                        {/* Si ya está entregado muestra badge, si no muestra botón */}
                        {vc.entregado ? (
                          <div className="space-y-1 text-right">
                            <Badge variant="default">✓ Entregado</Badge>
                            {vc.fecha_entrega && (
                              <p className="text-xs text-muted-foreground">
                                {new Date(vc.fecha_entrega).toLocaleString(
                                  "es-CO",
                                )}
                              </p>
                            )}
                          </div>
                        ) : (
                          viaje.estado !== "cerrado" &&
                          viaje.estado !== "cancelado" && (
                            <ConfirmarEntrega
                              viajeClienteId={vc.id}
                              viajeId={id}
                              nombreCliente={vc.clientes?.nombre ?? ""}
                            />
                          )
                        )}
                      </div>
                    </div>

                    {/* Detalle de la carga */}
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground pl-10">
                      <span>📦 {vc.descripcion_mercancia ?? "—"}</span>
                      <span>⚖ {vc.peso_kg ?? 0} kg</span>
                      <span>
                        💰{" "}
                        {new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        }).format(vc.valor_declarado ?? 0)}
                      </span>
                    </div>

                    {/* Novedad si existe */}
                    {vc.hubo_novedad && (
                      <div className="pl-10 text-xs text-yellow-600 bg-yellow-50 rounded p-2">
                        ⚠ {vc.descripcion_novedad}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Formulario para agregar cliente — solo si el viaje no está cerrado */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Agregar cliente al viaje</h2>
          {viaje.estado !== "cerrado" && viaje.estado !== "cancelado" && (
            <div className="border rounded-xl p-6 space-y-4 bg-neutral-50">
              <form action={agregarCliente} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cliente">Cliente *</Label>
                    <select
                      id="cliente"
                      name="cliente"
                      required
                      className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-neutral-50"
                    >
                      <option value="">Selecciona un cliente</option>
                      {clientes?.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destino_cliente">
                      Destino del cliente *
                    </Label>
                    <Input
                      id="destino_cliente"
                      name="destino_cliente"
                      placeholder="Medellín"
                      required
                      className="bg-neutral-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descripcion_mercancia">
                      Descripción mercancía
                    </Label>
                    <Input
                      id="descripcion_mercancia"
                      name="descripcion_mercancia"
                      placeholder="Telas sintéticas"
                      className="bg-neutral-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipo_mercancia">Tipo de mercancía</Label>
                    <Input
                      id="tipo_mercancia"
                      name="tipo_mercancia"
                      placeholder="Textiles"
                      className="bg-neutral-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="peso_kg">Peso (kg)</Label>
                    <Input
                      id="peso_kg"
                      name="peso_kg"
                      type="number"
                      placeholder="1500"
                      className="bg-neutral-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valor_declarado">
                      Valor declarado (COP)
                    </Label>
                    <Input
                      id="valor_declarado"
                      name="valor_declarado"
                      type="number"
                      placeholder="5000000"
                      className="bg-neutral-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valor_flete">Valor flete (COP) *</Label>
                    <Input
                      id="valor_flete"
                      name="valor_flete"
                      type="number"
                      placeholder="800000"
                      required
                      className="bg-neutral-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instrucciones">
                      Instrucciones
                    </Label>
                    <Input
                      id="instrucciones"
                      name="instrucciones"
                      placeholder="Frágil, mantener horizontal"
                      className="bg-neutral-50"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  + Agregar cliente
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
