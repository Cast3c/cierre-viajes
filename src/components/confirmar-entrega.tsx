'use client'

// Es client component porque necesita estado local
// para mostrar/ocultar el formulario de confirmación
import { useState } from 'react'
import { confirmarEntrega } from '@/app/dashboard/trips/actions'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

type Props = {
  viajeClienteId: string  // id del registro en viaje_clientes
  viajeId: string         // id del viaje padre
  nombreCliente: string   // para mostrar en el formulario
}

export function ConfirmarEntrega({
  viajeClienteId,
  viajeId,
  nombreCliente,
}: Props) {
  // Controla si el formulario está abierto o cerrado
  const [abierto, setAbierto] = useState(false)

  // Controla si hubo novedad para mostrar el campo de descripción
  const [huboNovedad, setHuboNovedad] = useState(false)

  // Crea la action con los ids pre-cargados usando bind
  const confirmar = confirmarEntrega.bind(null, viajeClienteId, viajeId)

  // Si el formulario está cerrado muestra solo el botón
  if (!abierto) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setAbierto(true)}
      >
        Confirmar entrega
      </Button>
    )
  }

  // Si está abierto muestra el formulario
  return (
    <div className="border rounded-xl p-4 bg-muted/30 space-y-4 mt-2">
      <p className="text-sm font-medium">
        Confirmar entrega — {nombreCliente}
      </p>

      <form
        action={confirmar}
        className="space-y-4"
      >
        {/* Campo oculto que envía si hubo novedad */}
        <input
          type="hidden"
          name="hubo_novedad"
          value={huboNovedad ? 'true' : 'false'}
        />

        <div className="space-y-2">
          <Label className="text-sm">¿Hubo alguna novedad en la entrega?</Label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setHuboNovedad(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                !huboNovedad
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-border hover:bg-muted'
              }`}
            >
              No, todo bien
            </button>
            <button
              type="button"
              onClick={() => setHuboNovedad(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                huboNovedad
                  ? 'bg-yellow-500 text-white border-yellow-500'
                  : 'bg-background border-border hover:bg-muted'
              }`}
            >
              ⚠ Sí, hubo novedad
            </button>
          </div>
        </div>

        {/* Campo de descripción solo aparece si hubo novedad */}
        {huboNovedad && (
          <div className="space-y-2">
            <Label htmlFor="descripcion_novedad">
              Describe la novedad
            </Label>
            <textarea
              id="descripcion_novedad"
              name="descripcion_novedad"
              required={huboNovedad}
              placeholder="Ej: Caja #3 con golpe leve, cliente firmó conforme..."
              rows={3}
              className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setAbierto(false)}
          >
            Cancelar
          </Button>
          <Button type="submit" size="sm">
            ✓ Confirmar entrega
          </Button>
        </div>
      </form>
    </div>
  )
}