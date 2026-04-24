import { faker } from "@faker-js/faker";

export function createClient(empresaId: string){
    const isCompany  = faker.datatype.boolean();
    const colombianCities = [
        "Bogotá",
        "Medellín",
        "Cali",
        "Barranquilla",
        "Cartagena",
        "Bucaramanga",
        "Pereira",
        "Manizales",
        "Santa Marta",
        "Cúcuta",
        "Villavicencio",
        "Ibagué",
    ];

    return {
        nombre: isCompany
            ? faker.company.name()
            : faker.person.fullName(),
        nit: isCompany
            ? `${faker.string.numeric(9)}-${faker.string.numeric(1)}`
            : faker.string.numeric(10),
        tipo: isCompany ? "Empresa" : "Natural",
        ciudad: faker.helpers.arrayElement(colombianCities),
        direccion: faker.location.streetAddress(true),
        telefono: `3${faker.string.numeric(9)}`,
        email: faker.internet.email(),
        activo: faker.datatype.boolean(),
        is_test: true,
        empresa: empresaId
    }
}