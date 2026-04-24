'use server'
// ↑ Esta línea le dice a Next.js que todo este archivo
// corre en el servidor, nunca en el navegador

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { EmpresaNueva } from '@/types'

// ─── LEER TODAS ───────────────────────────────────────
export async function getEmpresas() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('empresas')        // tabla
    .select('*')             // todos los campos
    .order('nombre')         // ordenadas por nombre A→Z

  if (error) throw new Error(error.message)
  return data
}

// ─── LEER UNA ─────────────────────────────────────────
export async function getEmpresa(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('empresas')
    .select('*')
    .eq('id', id)   // eq = equal, filtra donde id = el que pasaste
    .single()       // espera exactamente un resultado, no un array

  if (error) throw new Error(error.message)
  return data
}

// ─── CREAR ────────────────────────────────────────────
export async function crearEmpresa(formData: FormData) {
  const supabase = await createClient()

  // Extraes cada campo del formulario y lo tipas
  const nueva: EmpresaNueva = {
    nombre: formData.get('nombre') as string,
    nit: formData.get('nit') as string,
    representante: formData.get('representante') as string,
    telefono: formData.get('telefono') as string,
    email: formData.get('email') as string,
    direccion: formData.get('direccion') as string,
    activa: true,
  }

  const { error } = await supabase
    .from('empresas')
    .insert(nueva)  // insert = crear registro nuevo

  if (error) throw new Error(error.message)

  // Le dices a Next.js que la lista de empresas cambió
  // para que recargue los datos frescos
  revalidatePath('/dashboard/empresas')

  // Llevas al usuario de vuelta a la lista
  redirect('/dashboard/empresas')
}

// ─── ACTUALIZAR ───────────────────────────────────────
export async function actualizarEmpresa(id: string, formData: FormData) {
  const supabase = await createClient()

  const cambios = {
    nombre: formData.get('nombre') as string,
    nit: formData.get('nit') as string,
    representante: formData.get('representante') as string,
    telefono: formData.get('telefono') as string,
    email: formData.get('email') as string,
    direccion: formData.get('direccion') as string,
  }

  const { error } = await supabase
    .from('empresas')
    .update(cambios)  // update = modificar
    .eq('id', id)     // solo el registro con ese id

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/empresas')
  redirect('/dashboard/empresas')
}

// ─── DESACTIVAR ───────────────────────────────────────
// No borramos, solo desactivamos para conservar el historial
export async function desactivarEmpresa(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('empresas')
    .update({ activa: false })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/empresas')
}
