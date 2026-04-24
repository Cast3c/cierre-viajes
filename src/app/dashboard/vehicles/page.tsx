import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link'
import { getCamiones } from './actions'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from '@/components/ui/table'

// Función para darle color al badge según el estado
function EstadoBadge({ estado }: { estado: string }) {
  const colores: Record<string, 'default' | 'secondary' | 'destructive'> = {
    disponible:   'default',
    en_viaje:     'secondary',
    mantenimiento: 'destructive',
    inactivo:     'secondary',
  }

  const etiquetas: Record<string, string> = {
    disponible:    'Disponible',
    en_viaje:      'En viaje',
    mantenimiento: 'Mantenimiento',
    inactivo:      'Inactivo',
  }

  return (
    <Badge variant={colores[estado] ?? 'secondary'}>
      {etiquetas[estado] ?? estado}
    </Badge>
  )
}

export default async function VehiclesPage() {
  const camiones = await getCamiones()

  return (
    <div className="p-8 space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Vehículos</h1>
          <p className="text-muted-foreground text-sm">
            {camiones?.length} vehículo(s) registrado(s)
          </p>
        </div>
        <Link href="/dashboard/vehicles/nueva">
          <Button>+ Nuevo vehículo</Button>
        </Link>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Placa</TableHead>
              <TableHead>Marca / Modelo</TableHead>
              <TableHead>Año</TableHead>
              <TableHead>Capacidad</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {camiones?.map((camion) => (
              <TableRow key={camion.id}>
                <TableCell className="font-mono font-bold">
                  {camion.placa}
                </TableCell>
                <TableCell>
                  {camion.marca} {camion.modelo}
                </TableCell>
                <TableCell>{camion.anio ?? '—'}</TableCell>
                <TableCell>
                  {camion.tons_capacity
                    ? `${camion.tons_capacity} ton`
                    : '—'}
                </TableCell>
                <TableCell>
                  {/* camion.empresas viene del join que hicimos
                      en el select('*, empresas(nombre)') */}
                  {(camion as any).empresas?.nombre ?? '—'}
                </TableCell>
                <TableCell>
                  <EstadoBadge estado={camion.estado} />
                </TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/vehicles/${camion.id}`}
                    className="text-primary text-sm hover:underline"
                  >
                    Ver / Editar
                  </Link>
                </TableCell>
              </TableRow>
            ))}

            {camiones?.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                  No hay vehículos registrados aún
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}