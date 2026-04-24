'use server'

import { revalidatePath }  from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { CamionNuevo } from "@/types";
import { equal } from "assert";

// ─── LEER TODOS ───────────────────────────────────────
export async function getCamiones() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('camiones')
        // Este select hace un JOIN automático con la tabla empresas
        // trae todos los campos de camiones + el nombre de la empresa
        .select('*, empresas(nombre)')
        .order('placa')

    if(error) throw new Error(error.message)
        return data
}

// ─── LEER UNO ─────────────────────────────────────────

export async function getCamion(id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('camiones')
        .select('*, empresas(nombre)')
        .eq('id', id)
        .single()

    if (error) throw new Error(error.message)
    return data
}


// ─── LEER EMPRESAS (para el select del formulario) ────

export async function getEmpresasParaSelect() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('empresas')
        .select('id, nombre') //solo se necesita esto
        .eq('activa', true)
        .order('nombre')

    if(error) throw new Error(error.message)
    return data
}

// ─── CREAR ────────────────────────────────────────────

export async function crearCamion(formData: FormData){
    const supabase = await createClient()

    const nuevo: CamionNuevo = {
        empresa: formData.get('empresa')as string,
        placa: (formData.get('placa') as string).toUpperCase(),
        marca: formData.get('marca') as string,
        modelo: formData.get('modelo') as string,
        // Number() convierte el string del form a número
        anio: Number(formData.get('anio')),
        tipo_carroceria: formData.get('tipo_carroceria') as string,
        tons_capacity: Number(formData.get('tons_capacity')),
        estado: 'disponible',
        last_maintenace: null,
    }

    const { error } = await supabase
        .from('camiones')
        .insert(nuevo)
    
    if(error) throw new Error(error.message)
    
    revalidatePath('/dashboard/vehicles')
    redirect('/dashboard/vehicles')
}

// ─── ACTUALIZAR ───────────────────────────────────────
export async function actualizarCamion(id: string, formData: FormData) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('camiones')
        .update({
            empresa: formData.get('empresa') as string,
            placa: (formData.get('placa') as string).toUpperCase(),
            marca: formData.get('marca') as string,
            modelo: formData.get('modelo') as string,
            anio: Number(formData.get('anio')),
            tipo_carroceria: formData.get('tipo_carroceria') as string,
            tons_capacity: Number(formData.get('tons_capacity')),
        })
        .eq('id', id)
    
    if(error) throw new Error(error.message)

    revalidatePath('/dashboard/vehicles')
    redirect('/dashboard/vehicles')
}

// ─── CAMBIAR ESTADO ───────────────────────────────────
export async function cambiarEstadoCamion(id: string, estado: string){
    const supabase = await createClient()

    const { error } = await supabase
        .from('camiones')
        .update({ estado })
        .eq('id', id)

    if(error) throw new Error(error.message)

    revalidatePath('/dashboard/vehicles')
}

