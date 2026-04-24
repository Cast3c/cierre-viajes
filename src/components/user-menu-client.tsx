'use client'

import { logout } from '@/app/(auth)/actions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { User, Building2, Shield, LogOut } from 'lucide-react'

type Props = {
  email: string
  nombre: string
  rol: string
  empresa: string
}

export function UserMenuClient({ email, nombre, rol, empresa }: Props) {
  const inicial = nombre?.charAt(0).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 h-9 px-3">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            {inicial}
          </div>
          <span className="text-sm font-medium hidden md:block">
            {nombre}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="space-y-1">
            <p className="text-sm font-medium">{email}</p>
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground capitalize">
                {rol}
              </span>
            </div>
            {empresa && (
              <div className="flex items-center gap-2">
                <Building2 className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {empresa}
                </span>
              </div>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2 cursor-pointer">
          <User className="w-4 h-4" />
          Mi perfil
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <form action={logout}>
          <button type="submit" className="w-full">
            <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </button>
        </form>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}