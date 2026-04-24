import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}



export async function getSession() {
  const supabase = await createClient()

  //Obtiene el usuario autenticado de Supabase Auth
  const { data: { user }, error } = await supabase.auth.getUser()

  // Log 1 — ¿llega el usuario de auth?
  console.log('USER:', user)
  console.log('AUTH ERROR:', error)

  if(error || !user) return null

  //Busca su perfil en tu tabla con la empresa relacionada
  const { data: perfil, error: perfilError } = await supabase
    .from('perfiles')
    .select('*, empresas(id, nombre)')
    .eq('id', user.id)
    .single()

  // Log 2 — ¿llega el perfil de la tabla?
  console.log('PERFIL:', perfil)
  console.log('PERFIL ERROR:', perfilError)
  
  if(!perfil) return null

  //Devuelve todo junto en un solo objeto
  return {
    id: user.id,
    email: user.email,
    nombre: perfil.nombre ?? user.email,
    rol: perfil.rol as 'superadmin' | 'admin' | 'despachador' | 'conductor',
    empresa_id: perfil.empresa ?? (perfil as any).empresa?.id,
    empresa_nombre: (perfil as any).empresas?.nombre ?? null,
    esSuperAdmin: perfil.rol === 'superadmin',
    esAdmin: perfil.rol === 'admin',
    esDespachador: perfil.rol === 'despachador',
    esCondutor: perfil.rol === 'conductor',
  }
}