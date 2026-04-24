import { getEmpresa, actualizarEmpresa } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default async function EditarEmpresaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // En Next.js 15 params también es asíncrono
  const { id } = await params

  // Cargamos los datos actuales de la empresa
  const empresa = await getEmpresa(id)

  // Creamos una action que ya tiene el id incluido
  const actualizar = actualizarEmpresa.bind(null, id)

  return (
    <div className="p-8 max-w-2xl space-y-6">

      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/empresas"
          className="text-muted-foreground text-sm hover:underline"
        >
          ← Volver
        </Link>
        <h1 className="text-2xl font-bold">Editar empresa</h1>
      </div>

      <form action={actualizar} className="space-y-4 border rounded-xl p-6">

        <div className="grid grid-cols-2 gap-4">

          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre *</Label>
            <Input
              id="nombre"
              name="nombre"
              required
              // defaultValue precarga el valor actual del campo
              defaultValue={empresa.nombre}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nit">NIT *</Label>
            <Input
              id="nit"
              name="nit"
              required
              defaultValue={empresa.nit}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="representante">Representante legal</Label>
            <Input
              id="representante"
              name="representante"
              defaultValue={empresa.representante ?? ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              name="telefono"
              defaultValue={empresa.telefono ?? ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={empresa.email ?? ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              name="direccion"
              defaultValue={empresa.direccion ?? ''}
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
            Guardar cambios
          </Button>
        </div>

      </form>
    </div>
  )
}