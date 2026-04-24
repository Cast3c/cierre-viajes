import { faker } from "@faker-js/faker";
import {
  generateLicenseExpiry,
  generateDriverState,
  generatePayType,
} from "../utils/driver.utils";

export function createDriver(empresaId: string, tipoContratoMap: any) {
    
  const birthDate = faker.date.birthdate({
    min: 18,
    max: 65,
    mode: "age",
  });

  const fechaIngreso = faker.date.between({
    from: new Date(birthDate.getFullYear() + 18, 0, 1),
    to: new Date(),
  });

  const contratoKey = faker.datatype.boolean() ? "termino_fijo" : "indefinido";

  if (!tipoContratoMap[contratoKey]) {
    throw new Error(`Tipo contrato inválido: ${contratoKey}`);
  }

  return {
    identificacion: faker.string.numeric(10),
    nombres: faker.person.firstName(),
    apellidos: faker.person.lastName(),
    fecha_nacimiento: birthDate,
    fecha_ingreso: fechaIngreso,
    licencia: `LC${faker.string.numeric(11)}`,
    telefono: `3${faker.string.numeric(9)}`,
    email: faker.internet.email(),
    direccion: faker.location.streetAddress(),
    tipo_contrato: tipoContratoMap[contratoKey],
    empresa: empresaId,
    categoria_licencia: "C2",
    fecha_vencimiento_licencia: generateLicenseExpiry(),
    estado: generateDriverState(),
    activo: faker.datatype.boolean(),
    modalidad_pago: generatePayType(),
    is_test: true,
  };
}
