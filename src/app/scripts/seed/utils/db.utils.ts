import { createClient } from "@/lib/supabase/server";

export async function getSupabase() {
  return await createClient();
}

export async function cleanTestData(supabase: any) {
  // orden IMPORTANTE (por relaciones FK)

  await supabase.from("viajes").delete().eq("is_test", true);
  await supabase.from("camiones").delete().eq("is_test", true);
  await supabase.from("conductor").delete().eq("is_test", true);
  await supabase.from("clientes").delete().eq("is_test", true);
}

export async function getOrCreateEmpresaDemo(supabase: any) {
  const { data, error} = await supabase
    .from("empresas")
    .select("*")
    .eq("nombre", "Transportes La araña")
    .maybeSingle();

  if(error) throw error;
  
  if (data) return data;

  const { data: nueva, error: insertError } = await supabase
    .from("empresas")
    .insert({ 
      nombre: "Transportes La araña",
      nit: "100090086-1",
      representante: "Ricardo Castellar",
      telefono: "3132129686",
      email: "ricardo.castellarp@gmail.com",
      direccion: "Av siempreviva 736"
    })
    .select()
    .single();
  
    if (insertError) throw insertError;

    if(!nueva){ 
      throw new Error("No se pudo crear la empresa demo");
    }

  return nueva;
}

export async function getTipoContratoMap(supabase: any) {
  const { data } = await supabase
    .from("tipo_contrato")
    .select("*");

  if (!data) throw new Error("No hay tipos de contrato");

  return {
    termino_fijo: data.find((t: {tipo_contrato: string; id: any}) => t.tipo_contrato === "termino_fijo")?.id,
    indefinido: data.find((t: {tipo_contrato: string; id: any}) => t.tipo_contrato === "indefinido")?.id,
  };
}