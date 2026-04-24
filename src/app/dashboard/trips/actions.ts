'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient, getSession } from '@/lib/supabase/server'
import type { ViajeNuevo, ViajeClienteNuevo } from '@/types'

// ─── LEER TODOS ───────────────────────────────────────
export async function getViajes() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('viajes')
    .select(`
      *,
      empresas(nombre),
      conductor(nombres, apellidos),
      camiones(placa)
    `)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

// ─── LEER UNO CON TODOS SUS CLIENTES ─────────────────
export async function getViaje(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('viajes')
    .select(`
      *,
      empresas(nombre),
      conductor(nombres, apellidos, telefono),
      camiones(placa, marca, modelo),
      viaje_clientes(
        *,
        clientes(nombre, telefono)
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

// ─── DATOS PARA LOS SELECTS DEL FORMULARIO ────────────
export async function getDatosParaViaje() {
  const supabase = await createClient()

  // Trae conductores, camiones disponibles en paralelo
  // Promise.all ejecuta las tres consultas al mismo tiempo
  // en lugar de esperar una por una — más rápido
  const [conductores, camiones] = await Promise.all([
    supabase
      .from('conductor')
      .select('id, nombres, apellidos, estado')
      .eq('estado', 'disponible')
      .order('nombres'),
    supabase
      .from('camiones')
      .select('id, placa, marca, tons_capacity, estado')
      .eq('estado', 'disponible')
      .order('placa'),
  ])


  if (conductores.error) throw new Error(conductores.error.message)
  if (camiones.error) throw new Error(camiones.error.message)

  return {
    conductores: conductores.data,
    camiones: camiones.data,
  }
}

// ─── CREAR VIAJE ──────────────────────────────────────
export async function crearViaje(formData: FormData) {
  const sesion = await getSession()

  if(!sesion){
    redirect('/login')
  }

  const empresaId = sesion.esSuperAdmin 
    ? formData.get('empresa')?.toString()
    : sesion.empresa_id 

  if(!empresaId){
    throw new Error('No tienes empresa asignada. Contacta al administrador.')
  }

  const supabase = await createClient()

  // Obtener empresa del perfil del usuario
  // const { data: { user } } = await supabase.auth.getUser()
  // const { data: perfil } = await supabase
  //   .from('perfiles')
  //   .select('empresa, rol')
  //   .eq('id', user!.id)
  //   .single()

  const nuevo: ViajeNuevo = {
    empresa: empresaId,
    conductor: formData.get('conductor') as string,
    camion: formData.get('camion') as string,
    fecha_inicio: formData.get('fecha_inicio') as string || null,
    fecha_fin: formData.get('fecha_fin_estimada') as string || null,
    origen: formData.get('origen') as string,
    destino: formData.get('destino_final') as string,
    estado: 'programado',
    valor_flete: 0,
    observaciones: formData.get('observaciones') as string || null,
  }

  const { data, error } = await supabase
    .from('viajes')
    .insert(nuevo)
    .select()
    .single()

  if (error) throw new Error(error.message)

  const clienteId = formData.get('cliente') as string
  if (clienteId) {
    await supabase
      .from('viaje_clientes')
      .insert({
        viaje: data.id,
        cliente: clienteId,
        orden_entrega: 1,
        entregado: false,
        fecha_entrega: null,
        hubo_novedad: false,
        descripcion_novedad: null,
      })
  }

  await Promise.all([
    supabase
      .from('camiones')
      .update({ estado: 'en_viaje' })
      .eq('id', nuevo.camion),
    supabase
      .from('conductor')
      .update({ estado: 'en_viaje' })
      .eq('id', nuevo.conductor),
  ])

  revalidatePath('/dashboard/trips')
  redirect(`/dashboard/trips/${data.id}`)
}

// ─── CAMBIAR ESTADO ───────────────────────────────────
export async function cambiarEstadoViaje(id: string, estado: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('viajes')
    .update({ estado })
    .eq('id', id)

  if (error) throw new Error(error.message)

  // Si el viaje se cierra o cancela libera camión y conductor
  if (estado === 'cerrado' || estado === 'cancelado') {
    const { data: viaje } = await supabase
      .from('viajes')
      .select('conductor, camion')
      .eq('id', id)
      .single()

    if (viaje) {
      await Promise.all([
        supabase
          .from('camiones')
          .update({ estado: 'disponible' })
          .eq('id', viaje.camion),
        supabase
          .from('conductor')
          .update({ estado: 'disponible' })
          .eq('id', viaje.conductor),
      ])
    }
  }

  revalidatePath(`/dashboard/trips/${id}`)
  revalidatePath('/dashboard/trips')
}

// ─── AGREGAR CLIENTE AL VIAJE ─────────────────────────
export async function agregarClienteViaje(
  viajeId: string,
  formData: FormData
) {
  const supabase = await createClient()

  // Cuenta cuántos clientes ya tiene el viaje
  // para asignar el orden de entrega automáticamente
  const { count } = await supabase
    .from('viaje_clientes')
    .select('*', { count: 'exact', head: true })
    .eq('viaje', viajeId)

  const nuevo: ViajeClienteNuevo = {
    viaje: viajeId,
    cliente: formData.get('cliente') as string,
    orden_entrega: (count ?? 0) + 1,
    destino_cliente: formData.get('destino_cliente') as string,
    descripcion_mercancia: formData.get('descripcion_mercancia') as string || null,
    tipo_mercancia: formData.get('tipo_mercancia') as string || null,
    peso_kg: Number(formData.get('peso_kg')) || 0,
    volumen: Number(formData.get('volumen_m3')) || 0,
    valor_declarado: Number(formData.get('valor_declarado')) || 0,
    instrucciones: formData.get('instrucciones') as string || null,
    valor_flete: Number(formData.get('valor_flete')) || 0,
    entregado: false,
    fecha_entrega: null,
    hubo_novedad: false,
    descripcion_novedad: null,
  }

  const { error } = await supabase
    .from('viaje_clientes')
    .insert(nuevo)

  if (error) throw new Error(error.message)

  // Actualiza el flete total del viaje
  const { data: clientes } = await supabase
    .from('viaje_clientes')
    .select('valor_flete')
    .eq('viaje', viajeId)

  const total = clientes?.reduce((sum, c) => sum + c.valor_flete, 0) ?? 0

  await supabase
    .from('viajes')
    .update({ valor_flete_total: total })
    .eq('id', viajeId)

  revalidatePath(`/dashboard/trips/${viajeId}`)
}

// ─── CONFIRMAR ENTREGA DE UN CLIENTE ─────────────────
export async function confirmarEntrega(
  viajeClienteId: string,
  viajeId: string,
  formData: FormData
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('viaje_clientes')
    .update({
      entregado: true,
      fecha_entrega: new Date().toISOString(),
      hubo_novedad: formData.get('hubo_novedad') === 'true',
      descripcion_novedad: formData.get('descripcion_novedad') as string || null,
    })
    .eq('id', viajeClienteId)

  if (error) throw new Error(error.message)

  revalidatePath(`/dashboard/trips/${viajeId}`)
}