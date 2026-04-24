import { crearCamion, getEmpresasParaSelect } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default async function NuevoVehiculoPage() {
  // Cargamos las empresas en el servidor para llenar el select
  const empresas = await getEmpresasParaSelect()

  return (
    <div className="p-8 max-w-2xl space-y-6">

      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/vehicles"
          className="text-muted-foreground text-sm hover:underline"
        >
          ← Volver
        </Link>
        <h1 className="text-2xl font-bold">Nuevo vehículo</h1>
      </div>

      <form action={crearCamion} className="space-y-4 border rounded-xl p-6">
        <div className="grid grid-cols-2 gap-4">

          {/* Select de empresa — cargado desde Supabase */}
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
            <Label htmlFor="placa">Placa *</Label>
            <Input
              id="placa"
              name="placa"
              placeholder="ABC123"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="marca">Marca</Label>
            <Input
              id="marca"
              name="marca"
              placeholder="Kenworth"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modelo">Modelo</Label>
            <Input
              id="modelo"
              name="modelo"
              placeholder="T680"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="anio">Año</Label>
            <Input
              id="anio"
              name="anio"
              type="number"
              placeholder="2022"
              min="1990"
              max="2030"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo_carroceria">Tipo de carrocería</Label>
            <select
              id="tipo_carroceria"
              name="tipo_carroceria"
              className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selecciona...</option>
              <option value="furgon">Furgón</option>
              <option value="platon">Platón</option>
              <option value="refrigerado">Refrigerado</option>
              <option value="tanque">Tanque</option>
              <option value="volco">Volco</option>
              <option value="cama_baja">Cama baja</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tons_capacity">Capacidad (toneladas)</Label>
            <Input
              id="tons_capacity"
              name="tons_capacity"
              type="number"
              placeholder="10"
              step="0.5"
            />
          </div>

        </div>

        <div className="flex gap-3 pt-4">
          <Link href="/dashboard/vehicles" className="flex-1">
            <Button variant="outline" className="w-full">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" className="flex-1">
            Guardar vehículo
          </Button>
        </div>

      </form>
    </div>
  )
}