import { crearViaje, getDatosParaViaje } from '../actions'
import { getClientesParaSelect } from '../../clients/actions'
import { getSession } from '@/lib/supabase/server'
import { createClient } from '@/lib/supabase/server'

import Link from 'next/link'
import NewTripForm from './components/NewTripForm'

export default async function NuevoViajePage() {
  const sesion = await getSession()
  const { conductores, camiones } = await getDatosParaViaje()
  const clientes = await getClientesParaSelect()

  let empresas = null
  if (sesion?.esSuperAdmin) {
    const supabase = await createClient()
    const { data } = await supabase
      .from('empresas')
      .select('id, nombre')
      .eq('activa', true)
      .order('nombre')
    empresas = data
  }

  return (
    <div className="p-8 max-w-7xl space-y-6">

      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/trips"
          className="text-muted-foreground text-sm hover:underline"
        >
          ← Volver
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Nuevo viaje</h1>
          {!sesion?.esSuperAdmin && (
            <p className="text-sm text-muted-foreground">
              Empresa: {sesion?.nombre}
            </p>
          )}
        </div>
      </div>

      <div>
        <NewTripForm 
          sesion={sesion}
          conductores={conductores}
          camiones={camiones}
          clientes={clientes}
          empresas={empresas}
        />
      </div>
    </div>
  )
}