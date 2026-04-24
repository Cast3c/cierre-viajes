import { createClient } from "./factories/client.factory";
import { getSupabase, getOrCreateEmpresaDemo } from "./utils/db.utils";

export async function seedClients(){
    const supabase = await getSupabase();
    const empresa  = await getOrCreateEmpresaDemo(supabase);
    const clients = Array.from({ length: 20 }).map(() => createClient(empresa.id))

    const { error }  = await supabase
        .from("clientes")
        .insert(clients);

    if(error) throw error;

    console.log("Clientes creados: ", clients.length);
}