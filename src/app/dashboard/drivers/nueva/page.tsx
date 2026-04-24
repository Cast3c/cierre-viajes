import {
  crearConductor,
  getEmpresasParaSelect,
  getContratosParaSelect
} from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function NuevoConductorPage() {
  const empresas = await getEmpresasParaSelect();
  const contrato = await getContratosParaSelect();

  return (
    <div className="p-8 max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/drivers"
          className="text-muted-foreground text-sm hover:underline"
        >
          ← Volver
        </Link>
        <h1 className="text-2xl font-bold">Nuevo conductor</h1>
      </div>

      <form action={crearConductor} className="space-y-6 border rounded-xl p-6">
        {/* DATOS PERSONALES */}
        <div>
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">
            Datos personales
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombres">Nombres *</Label>
              <Input
                id="nombres"
                name="nombres"
                placeholder="Carlos Andrés"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellidos">Apellidos *</Label>
              <Input
                id="apellidos"
                name="apellidos"
                placeholder="Restrepo Gómez"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="identificacion">Cédula *</Label>
              <Input
                id="identificacion"
                name="identificacion"
                placeholder="1.234.567.890"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fecha_nacimiento">Fecha de nacimiento</Label>
              <Input
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                type="date"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input id="telefono" name="telefono" placeholder="300 123 4567" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="conductor@email.com"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                name="direccion"
                placeholder="Cra 15 # 45-20, Medellín"
              />
            </div>
          </div>
        </div>

        {/* LICENCIA */}
        <div>
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">
            Licencia de conducción
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="licencia">Número de licencia</Label>
              <Input id="licencia" name="licencia" placeholder="123456789" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria_licencia">Categoría</Label>
              <select
                id="categoria_licencia"
                name="categoria_licencia"
                className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecciona...</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
                <option value="C3">C3</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fecha_vencimiento_licencia">
                Vencimiento licencia
              </Label>
              <Input
                id="fecha_vencimiento_licencia"
                name="fecha_vencimiento_licencia"
                type="date"
              />
            </div>
          </div>
        </div>

        {/* CONTRATO */}
        <div>
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">
            Contrato y empresa
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="empresa">Empresa *</Label>
              <select
                id="empresa"
                name="empresa"
                required
                className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecciona una empresa</option>
                {empresas?.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fecha_ingreso">Fecha de ingreso</Label>
              <Input id="fecha_ingreso" name="fecha_ingreso" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="empresa">Tipo de contrato</Label>
              <select
                id="contrato"
                name="contrato"
                required
                className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecciona un tipo de contrato</option>
                {contrato?.map((contrato) => (
                  <option key={contrato.id} value={contrato.id}>
                    {contrato.tipo_contrato}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modalidad_pago">Modo de pago</Label>
              <select
                id="modalidad_pago"
                name="modalidad_pago"
                required
                className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecciona un modo de pago</option>
                <option value="sueldo_fijo">Sueldo fijo mensual</option>
                <option value="sueldo_fijo_viaje">Sueldo fijo por viaje</option>
                <option value="porcentaje">Porcentaje sobre flete</option>
                <option value="mixto">Mixto (fijo + porcentaje)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Link href="/dashboard/drivers" className="flex-1">
            <Button variant="outline" className="w-full">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" className="flex-1">
            Guardar conductor
          </Button>
        </div>
      </form>
    </div>
  );
}
