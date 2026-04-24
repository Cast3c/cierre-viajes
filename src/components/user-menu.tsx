import { getSession } from '@/lib/supabase/server'
import { UserMenuClient } from './user-menu-client'

export async function UserMenu() {
  const sesion = await getSession()
  
  console.log('SESION EN USER MENU:', sesion)

  if (!sesion) return <div>sin sesion</div>  // temporal para ver si renderiza

  return (
    <UserMenuClient
      email={sesion.email ?? ''}
      nombre={ sesion.nombre ?? sesion.email }
      rol={sesion.rol}
      empresa={sesion.empresa_nombre ?? ''}
    />
  )
}