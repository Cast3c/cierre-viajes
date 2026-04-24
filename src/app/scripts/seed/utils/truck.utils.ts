import { faker } from "@faker-js/faker";

type TruckModel = {
  modelo: string;
  tipo: string;
  capacidad: number;
}

const usedPlates = new Set<string>();

const truckModelsByBrand: Record<string, TruckModel[]> = {
  Chevrolet: [
    { modelo: "NHR", tipo: "turbo", capacidad: 3 },
    { modelo: "NPR", tipo: "turbo", capacidad: 5 },
    { modelo: "FVR", tipo: "sencillo", capacidad: 10 },
  ],
  Hino: [
    { modelo: "300", tipo: "turbo", capacidad: 3 },
    { modelo: "500FC", tipo: "turbo", capacidad: 5 },
    { modelo: "500GH", tipo: "sencillo", capacidad: 10 }
  ],
  Foton: [
    { modelo: "FRR", tipo: "turbo", capacidad: 5 },
    { modelo: "FVR", tipo: "sencillo", capacidad: 10 },
  ],
  JAC: [
    { modelo: "JRR", tipo: "turbo", capacidad: 5 },
  ],
  Kenworth: [
    { modelo: "T300", tipo: "sencillo", capacidad: 10 },
    { modelo: "T800", tipo: "mula", capacidad: 25 },
    { modelo: "T680", tipo: "mula", capacidad: 40 },
  ],
  Freightliner: [
    { modelo: "M2", tipo: "sencillo", capacidad: 10 },
    { modelo: "Cascadia", tipo: "mula", capacidad: 40 },
  ],
  International: [
    { modelo: "ProStar", tipo: "mula", capacidad: 40 },
  ],
  "Mercedes Benz": [
    { modelo: "Atego", tipo: "sencillo", capacidad: 10 },
    { modelo: "Actros", tipo: "mula", capacidad: 40 },
  ],
};

export function generatePlate() {
  let plate;
  do {
    const letters = faker.string.alpha({ length: 3, casing: "upper" });
    const nums = faker.string.numeric(3);
    plate = `${letters}${nums}`;
  } while (usedPlates.has(plate));

  usedPlates.add(plate);

  return plate;
}

export function generateBrand() {
  return faker.helpers.weightedArrayElement([
    { value: "Chevrolet", weight: 30 },
    { value: "Hino", weight: 15 },
    { value: "Foton", weight: 20 },
    { value: "JAC", weight: 25 },
    { value: "JMC", weight: 10 },
    { value: "Mercedes Benz", weight: 8 },
    { value: "Kenworth", weight: 5 },
    { value: "Freightliner", weight: 6 },
    { value: "International", weight: 3 },
  ]);
}

export function generateTruckSpecs(brand: string) {
  const models = truckModelsByBrand[brand];

  if (!models) {
    return{
      modelo: "Generic",
      tipo: "sencillo",
      capacidad: 10
    };
  }

  return faker.helpers.arrayElement(models);
}

export function generateLastMaintenance() {
  const today = new Date()

  return faker.date.between({
    from: new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000),
    to: today
  })
}

export function generateTruckState() {
  const rand = faker.number.int({ min: 1, max: 100 });

  if (rand <= 60) return "disponible";
  if (rand <= 80) return "en_viaje";
  if (rand <= 90) return "cargando";
  if (rand <= 95) return "descargando";
  return "mantenimiento";
}
