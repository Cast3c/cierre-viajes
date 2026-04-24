import { createDriver } from "./factories/driver.factory";
import {
  getSupabase,
  getOrCreateEmpresaDemo,
  getTipoContratoMap,
} from "./utils/db.utils";

export async function seedDrivers() {
  const supabase = await getSupabase();

  const empresa = await getOrCreateEmpresaDemo(supabase);
  const tipoContratoMap = await getTipoContratoMap(supabase);

  console.log(empresa)

  const drivers = Array.from({ length: 20 }).map(() =>
    createDriver(empresa.id, tipoContratoMap)
  );

  const { error } = await supabase
    .from("conductor")
    .insert(drivers);

  if (error) throw error;

  console.log("Conductores creados:", drivers.length);
} 