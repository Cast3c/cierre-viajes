import { Users, Plus, Calendar, ShieldCheck } from 'lucide-react';
import Link from 'next/link'
import { getConductores } from './actions'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from '@/components/ui/table'

// Verifica si la licencia vence en menos de 30 días
function licenciaProximaAVencer(fecha: string | null): boolean {
  if (!fecha) return false
  const vencimiento = new Date(fecha)
  const hoy = new Date()
  const diff = (vencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
  return diff <= 30
}

function EstadoBadge({ estado }: { estado: string }) {
  const colores: Record<string, 'default' | 'secondary' | 'destructive'> = {
    disponible: 'default',
    en_viaje:   'secondary',
    inactivo:   'destructive',
  }
  const etiquetas: Record<string, string> = {
    disponible: 'Disponible',
    en_viaje:   'En viaje',
    inactivo:   'Inactivo',
  }
  return (
    <Badge variant={colores[estado] ?? 'secondary'}>
      {etiquetas[estado] ?? estado}
    </Badge>
  )
}

export default async function DriversPage() {
  const conductores = await getConductores()

  return (
    <div className="flex flex-col p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Conductores</h1>
          <p className="text-muted-foreground text-sm">
            {conductores?.length} conductor(es) registrado(s)
          </p>
        </div>
        <Link href="/dashboard/drivers/nueva">
          <Button>+ Nuevo conductor</Button>
        </Link>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Identificación</TableHead>
              <TableHead>Licencia</TableHead>
              <TableHead>Vence licencia</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conductores?.map((conductor) => {
              const proximoAVencer = licenciaProximaAVencer(
                conductor.fecha_vencimiento_licencia
              )

              return (
                <TableRow key={conductor.id}>
                  <TableCell className="font-medium">
                    {conductor.nombres} {conductor.apellidos}
                  </TableCell>
                  <TableCell className="font-mono">
                    {conductor.identificacion}
                  </TableCell>
                  <TableCell>
                    {conductor.categoria_licencia ?? '—'}
                  </TableCell>
                  <TableCell>
                    {/* Si vence pronto muestra alerta visual */}
                    {conductor.fecha_vencimiento_licencia ? (
                      <span className={proximoAVencer ? 'text-destructive font-semibold' : ''}>
                        {proximoAVencer && '⚠ '}
                        {new Date(conductor.fecha_vencimiento_licencia)
                          .toLocaleDateString('es-CO')}
                      </span>
                    ) : '—'}
                  </TableCell>
                  <TableCell>
                    {(conductor as any).empresas?.nombre ?? '—'}
                  </TableCell>
                  <TableCell>
                    <EstadoBadge estado={conductor.estado} />
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/drivers/${conductor.id}`}
                      className="text-primary text-sm hover:underline"
                    >
                      Ver / Editar
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}

            {conductores?.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                  No hay conductores registrados aún
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}