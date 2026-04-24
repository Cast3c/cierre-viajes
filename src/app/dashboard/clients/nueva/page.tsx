import { crearCliente } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function NuevoClientePage() {
  return (
    <div className="p-8 max-w-2xl space-y-6">

      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/clients"
          className="text-muted-foreground text-sm hover:underline"
        >
          ← Volver
        </Link>
        <h1 className="text-2xl font-bold">Nuevo cliente</h1>
      </div>

      <form action={crearCliente} className="space-y-6 border rounded-xl p-6">

        <div className="grid grid-cols-2 gap-4">

          <div className="space-y-2 col-span-2">
            <Label htmlFor="nombre">Nombre / Razón social *</Label>
            <Input
              id="nombre"
              name="nombre"
              placeholder="Distribuidora El Camino S.A.S"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo *</Label>
            <select
              id="tipo"
              name="tipo"
              required
              className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selecciona...</option>
              <option value="empresa">Empresa</option>
              <option value="natural">Persona natural</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nit">NIT / Cédula</Label>
            <Input
              id="nit"
              name="nit"
              placeholder="900.123.456-1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ciudad">Ciudad</Label>
            <Input
              id="ciudad"
              name="ciudad"
              placeholder="Bogotá"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              name="telefono"
              placeholder="300 123 4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="contacto@cliente.com"
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              name="direccion"
              placeholder="Cra 15 # 45-20, Bogotá"
            />
          </div>

        </div>

        <div className="flex gap-3 pt-2">
          <Link href="/dashboard/clients" className="flex-1">
            <Button variant="outline" className="w-full">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" className="flex-1">
            Guardar cliente
          </Button>
        </div>

      </form>
    </div>
  )
}