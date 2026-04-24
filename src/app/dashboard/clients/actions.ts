'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { ClienteNuevo } from '@/types'

export async function getClientes() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .order('nombre')

  if (error) throw new Error(error.message)
  return data
}

export async function getCliente(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Esta función la usaremos en el formulario de viajes
// para seleccionar clientes del consolidado
export async function getClientesParaSelect() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('clientes')
    .select('id, nombre, telefono')
    .eq('activo', true)
    .order('nombre')

  if (error) throw new Error(error.message)
  return data
}

export async function crearCliente(formData: FormData) {
  const supabase = await createClient()

  const nuevo: ClienteNuevo = {
    nombre: formData.get('nombre') as string,
    nit: formData.get('nit') as string || null,
    tipo: formData.get('tipo') as string,
    ciudad: formData.get('ciudad') as string || null,
    direccion: formData.get('direccion') as string || null,
    telefono: formData.get('telefono') as string || null,
    email: formData.get('email') as string || null,
    activo: true,
  }

  const { error } = await supabase
    .from('clientes')
    .insert(nuevo)

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/clients')
  redirect('/dashboard/clients')
}

export async function actualizarCliente(id: string, formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('clientes')
    .update({
      nombre: formData.get('nombre') as string,
      nit: formData.get('nit') as string || null,
      tipo: formData.get('tipo') as string,
      ciudad: formData.get('ciudad') as string || null,
      direccion: formData.get('direccion') as string || null,
      telefono: formData.get('telefono') as string || null,
      email: formData.get('email') as string || null,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/clients')
  redirect('/dashboard/clients')
}

export async function desactivarCliente(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('clientes')
    .update({ activo: false })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/clients')
}