import Link from 'next/link'
import { getEmpresas } from './actions'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

// Este es un Server Component — corre en el servidor
// y puede llamar directamente las actions
export default async function EmpresasPage() {

  // Llama la función que creamos en actions.ts
  const empresas = await getEmpresas()

  return (
    <div className="p-8 space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Empresas de transporte</h1>
          <p className="text-muted-foreground text-sm">
            {empresas?.length} empresa(s) registrada(s)
          </p>
        </div>
        <Link href="/dashboard/empresas/nueva">
          <Button>+ Nueva empresa</Button>
        </Link>
      </div>

      {/* Tabla */}
      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>NIT</TableHead>
              <TableHead>Representante</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empresas?.map((empresa) => (
              // Cada empresa es una fila
              // empresa.id como key porque es único
              <TableRow key={empresa.id}>
                <TableCell className="font-medium">
                  {empresa.nombre}
                </TableCell>
                <TableCell>{empresa.nit}</TableCell>
                <TableCell>{empresa.representante ?? '—'}</TableCell>
                {/* ?? '—' significa: si es null, muestra un guión */}
                <TableCell>{empresa.telefono ?? '—'}</TableCell>
                <TableCell>
                  <Badge variant={empresa.activa ? 'default' : 'secondary'}>
                    {empresa.activa ? 'Activa' : 'Inactiva'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/empresas/${empresa.id}`}
                    className="text-primary text-sm hover:underline"
                  >
                    Ver / Editar
                  </Link>
                </TableCell>
              </TableRow>
            ))}

            {/* Si no hay empresas muestra un mensaje */}
            {empresas?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                  No hay empresas registradas aún
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}