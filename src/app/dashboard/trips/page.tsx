import Link from 'next/link'
import { getViajes } from './actions'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from '@/components/ui/table'

// Colores y etiquetas por estado
const estadoConfig: Record<string, {
  variant: 'default' | 'secondary' | 'destructive' | 'outline',
  label: string
}> = {
  programado:  { variant: 'outline',     label: 'Programado' },
  en_transito: { variant: 'default',     label: 'En tránsito' },
  en_destino:  { variant: 'secondary',   label: 'En destino' },
  cerrado:     { variant: 'default',     label: 'Cerrado' },
  cancelado:   { variant: 'destructive', label: 'Cancelado' },
}

export default async function TripsPage() {
  const viajes = await getViajes()

  return (
    <div className="p-8 space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Viajes</h1>
          <p className="text-muted-foreground text-sm">
            {viajes?.length} viaje(s) registrado(s)
          </p>
        </div>
        <Link href="/dashboard/trips/nuevo">
          <Button>+ Nuevo viaje</Button>
        </Link>
      </div>

      <div className="border rounded-xl overflow-hidden bg-neutral-50">
        <Table>
          <TableHeader className='bg-neutral-200'>
            <TableRow >
              <TableHead className='text-neutral-700 font-semibold'>Ruta</TableHead>
              <TableHead className='text-neutral-700 font-semibold'>Conductor</TableHead>
              <TableHead className='text-neutral-700 font-semibold'>Camión</TableHead>
              <TableHead className='text-neutral-700 font-semibold'>Fecha inicio</TableHead>
              <TableHead className='text-neutral-700 font-semibold'>Flete total</TableHead>
              <TableHead className='text-neutral-700 font-semibold'>Estado</TableHead>
              <TableHead className='text-neutral-700 font-semibold'>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {viajes?.map((viaje) => {
              const config = estadoConfig[viaje.estado] ?? estadoConfig.programado
              const cond = (viaje as any).conductor
              const cam = (viaje as any).camiones

              return (
                <TableRow key={viaje.id}>
                  <TableCell className="font-medium">
                    {viaje.origen}
                    <span className="text-muted-foreground mx-2">→</span>
                    {viaje.destino_final}
                  </TableCell>
                  <TableCell>
                    {cond
                      ? `${cond.nombres} ${cond.apellidos}`
                      : '—'}
                  </TableCell>
                  <TableCell className="font-mono">
                    {cam?.placa ?? '—'}
                  </TableCell>
                  <TableCell>
                    {viaje.fecha_inicio
                      ? new Date(viaje.fecha_inicio)
                          .toLocaleDateString('es-CO')
                      : '—'}
                  </TableCell>
                  <TableCell>
                    {viaje.valor_flete_total > 0
                      ? new Intl.NumberFormat('es-CO', {
                          style: 'currency',
                          currency: 'COP',
                          maximumFractionDigits: 0
                        }).format(viaje.valor_flete_total)
                      : '—'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={config.variant}>
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/trips/${viaje.id}`}
                      className="text-primary text-sm hover:underline"
                    >
                      Ver detalle
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}

            {viajes?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground py-12"
                >
                  No hay viajes registrados aún
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}