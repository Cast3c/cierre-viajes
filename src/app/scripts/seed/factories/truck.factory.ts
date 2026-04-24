import { faker } from "@faker-js/faker";

import {  
    generatePlate,
    generateBrand,
    generateTruckSpecs,
    generateLastMaintenance,
    generateTruckState
} from "../utils/truck.utils";

export function createTruck(empresaId: string,){
    const currentYear = new Date().getFullYear();
    const year = faker.number.int({
        min: 2000, max: currentYear
    })
    const brand = generateBrand()
    const specs = generateTruckSpecs(brand)

    return {
        empresa: empresaId,
        placa: generatePlate(),
        marca: brand,
        modelo: specs.modelo,
        tons_capacity: specs.capacidad,
        last_maintenace: generateLastMaintenance(),
        tipo_vehiculo: specs.tipo,
        estado: generateTruckState(),
        anio: year,
        is_test: true,
    }
}
