import { NextResponse } from "next/server";
import { getSupabase, cleanTestData } from "@/app/scripts/seed/utils/db.utils";
import { seedClients } from "@/app/scripts/seed/clients.seed";
import { seedDrivers } from "@/app/scripts/seed/drivers.seed";
import { seedTrucks } from "@/app/scripts/seed/trucks.seed";

// Solo para modo desarrollo
export async function POST(){
    try {
        // 1. Seguridad basica
        if(process.env.NODE_ENV === "production"){
            return NextResponse.json(
                { error: "No permitido en produccion" },
                { status : 403 }
            );
        }

        const supabase = await getSupabase()

        await cleanTestData(supabase);
        await seedDrivers()
        await seedTrucks()
        await seedClients()
        
        console.log("✅ Seed completado");

        return NextResponse.json({
            message: "Seed ejecutado correctamente"
        });

    } catch (error) {
        console.error("❌ Error en seed:", error);

        return NextResponse.json(
            {error: "Error ejecutando seed"},
            {status: 500}
        )
    }
}