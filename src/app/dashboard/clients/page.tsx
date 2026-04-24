import { Package, Plus, Building2, Phone } from 'lucide-react';
import Link from 'next/link'
import { getClientes } from './actions'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from '@/components/ui/table'

export default async function ClientsPage() {
  const clientes = await getClientes()

  return (
    <div className="p-8 space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-muted-foreground text-sm">
            {clientes?.length} cliente(s) registrado(s)
          </p>
        </div>
        <Link href="/dashboard/clients/nueva">
          <Button>+ Nuevo cliente</Button>
        </Link>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>NIT / Cédula</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes?.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell className="font-medium">
                  {cliente.nombre}
                </TableCell>
                <TableCell className="font-mono">
                  {cliente.nit ?? '—'}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {cliente.tipo === 'empresa' ? 'Empresa' : 'Persona natural'}
                  </Badge>
                </TableCell>
                <TableCell>{cliente.ciudad ?? '—'}</TableCell>
                <TableCell>{cliente.telefono ?? '—'}</TableCell>
                <TableCell>
                  <Badge variant={cliente.activo ? 'default' : 'secondary'}>
                    {cliente.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/clients/${cliente.id}`}
                    className="text-primary text-sm hover:underline"
                  >
                    Ver / Editar
                  </Link>
                </TableCell>
              </TableRow>
            ))}

            {clientes?.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                  No hay clientes registrados aún
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}