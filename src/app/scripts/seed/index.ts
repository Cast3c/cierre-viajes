import { seedClients } from "./clients.seed";
import { seedDrivers } from "./drivers.seed";
import { seedTrucks } from "./trucks.seed";

async function runSeed() {
  try {
    console.log("🌱 Iniciando seed...");

    await seedDrivers();
    await seedTrucks();
    await seedClients();

    console.log("✅ Seed completado");
  } catch (error) {
    console.error("❌ Error en seed:", error);
  }
}

runSeed();