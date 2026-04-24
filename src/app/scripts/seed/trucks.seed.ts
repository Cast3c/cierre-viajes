import { createTruck } from "./factories/truck.factory";
import {
    getSupabase,
    getOrCreateEmpresaDemo
} from "./utils/db.utils";

export async function seedTrucks(){
    const supabase  = await  getSupabase();

    const empresa = await getOrCreateEmpresaDemo(supabase)
    
    const trucks  = Array.from({ length: 20 }).map(() => createTruck(empresa.id)
    )

    const { error } = await supabase
        .from("camiones")
        .insert(trucks);
    
    if(error) throw error;

    console.log("Camiones creados:", trucks.length);
}