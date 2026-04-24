import { faker } from "@faker-js/faker";

export function generateLicenseExpiry() {
  const type = faker.number.int({ min: 1, max: 3 });

  if (type === 1) return faker.date.soon({ days: 180 });
  if (type === 2) return faker.date.future({ years: 3 });

  return faker.date.future({ years: 5 });
}

export function generateDriverState() {
  const rand = faker.number.int({ min: 1, max: 100 });

  if (rand <= 60) return "disponible";
  if (rand <= 80) return "en_viaje";
  if (rand <= 90) return "descanso";
  if (rand <= 95) return "incapacidad";
  return "cargando";
}

export function generatePayType() {
  const rand = faker.number.int({ min: 1, max: 100 });

  if (rand <= 50) return "comision";
  if (rand <= 80) return "sueldo fijo";
  return "mixto";
}