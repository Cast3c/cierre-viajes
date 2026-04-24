import { crearEmpresa } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function NuevaEmpresaPage() {
  return (
    <div className="p-8 max-w-2xl space-y-6">

      {/* Encabezado */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/empresas"
          className="text-muted-foreground text-sm hover:underline"
        >
          ← Volver
        </Link>
        <h1 className="text-2xl font-bold">Nueva empresa</h1>
      </div>

      {/* Formulario */}
      {/* action={crearEmpresa} le dice a Next.js que cuando se envíe
          el formulario ejecute esa server action directamente */}
      <form action={crearEmpresa} className="space-y-4 border rounded-xl p-6">

        <div className="grid grid-cols-2 gap-4">

          {/* name="nombre" es como actions.ts identifica el campo
              con formData.get('nombre') */}
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre *</Label>
            <Input
              id="nombre"
              name="nombre"
              placeholder="Transportes El Rápido S.A.S"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nit">NIT *</Label>
            <Input
              id="nit"
              name="nit"
              placeholder="900.123.456-1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="representante">Representante legal</Label>
            <Input
              id="representante"
              name="representante"
              placeholder="Juan Pérez"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              name="telefono"
              placeholder="601 234 5678"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="contacto@empresa.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              name="direccion"
              placeholder="Cra 7 # 32-15, Bogotá"
            />
          </div>

        </div>

        <div className="flex gap-3 pt-4">
          <Link href="/dashboard/empresas" className="flex-1">
            <Button variant="outline" className="w-full">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" className="flex-1">
            Guardar empresa
          </Button>
        </div>

      </form>
    </div>
  )
}