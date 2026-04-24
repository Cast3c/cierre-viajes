'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { ConductorNuevo, ConductorOverview } from '@/types'

export async function getConductores() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('conductor')
    .select('*, empresas(nombre), tipo_contrato(tipo_contrato)')
    .order('nombres')

  if (error) throw new Error(error.message)
  return data
}

export async function getConductor(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('conductor')
    .select('*, empresas(nombre), tipo_contrato(tipo_contrato)')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function getEmpresasParaSelect() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('empresas')
    .select('id, nombre')
    .eq('activa', true)
    .order('nombre')

  if (error) throw new Error(error.message)
  return data
}

export async function getContratosParaSelect() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('tipo_contrato')
    .select('id, tipo_contrato')
    .order('tipo_contrato')
  if (error) throw new Error(error.message)
  return data
}

export async function crearConductor(formData: FormData) {
  const supabase = await createClient()

  const nuevo: ConductorNuevo = {
    empresa: formData.get('empresa') as string,
    tipo_contrato: formData.get('contrato') as string,
    modalidad_pago: formData.get('modalidad_pago') as string,
    identificacion: formData.get('identificacion') as string,
    nombres: formData.get('nombres') as string,
    apellidos: formData.get('apellidos') as string,
    fecha_nacimiento: formData.get('fecha_nacimiento') as string || null,
    licencia: formData.get('licencia') as string || null,
    categoria_licencia: formData.get('categoria_licencia') as string || null,
    fecha_vencimiento_licencia: formData.get('fecha_vencimiento_licencia') as string || null,
    telefono: formData.get('telefono') as string || null,
    email: formData.get('email') as string || null,
    direccion: formData.get('direccion') as string || null,
    fecha_ingreso: formData.get('fecha_ingreso') as string || null,
    estado: 'disponible',
    activo: true,
  }

  const { error } = await supabase
    .from('conductor')
    .insert(nuevo)

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/drivers')
  redirect('/dashboard/drivers')
}

// Dashboard conductor
export async function getConductorOverview(conductorId: string, range?: { start?: Date; end?: Date}){
  const supabase = await createClient();

  // Fechas opcionales
  const start_date = range?.start?.toISOString() ?? null;
  const end_date = range?.end?.toISOString() ?? null;

  const { data, error } = await supabase.rpc("get_conductor_overview", {
    conductor_id: conductorId,
    start_date,
    end_date,
  });

  if(error){
    console.error("Error fetching conductor overview: ", error);
    throw new Error("No se pudo obtener el overview del conductor");
  }

  return data?.[0] as ConductorOverview;
}

export async function actualizarConductor(id: string, formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('conductor')
    .update({
      empresa: formData.get('empresa') as string,
      tipo_contrato: formData.get('contrato') as string || null,
      identificacion: formData.get('identificacion') as string,
      nombres: formData.get('nombres') as string,
      apellidos: formData.get('apellidos') as string,
      fecha_nacimiento: formData.get('fecha_nacimiento') as string || null,
      licencia: formData.get('licencia') as string || null,
      categoria_licencia: formData.get('categoria_licencia') as string || null,
      fecha_vencimiento_licencia: formData.get('fecha_vencimiento_licencia') as string || null,
      telefono: formData.get('telefono') as string || null,
      email: formData.get('email') as string || null,
      direccion: formData.get('direccion') as string || null,
      fecha_ingreso: formData.get('fecha_ingreso') as string || null,
      sueldo_fijo: Number(formData.get('sueldo_fijo')) || 0,
      porcentaje: Number(formData.get('porcentaje')) || 0,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/drivers')
  redirect('/dashboard/drivers')
}

export async function desactivarConductor(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('conductor')
    .update({ activo: false, estado: 'inactivo' })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/drivers')
}