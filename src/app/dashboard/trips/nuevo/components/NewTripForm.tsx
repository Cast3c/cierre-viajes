"use client";

import { crearViaje } from "../../actions";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50"
    >
      {pending ? "Creando viaje..." : "Crear viaje"}
    </button>
  );
}

export default function NewTripForm({
  sesion,
  conductores= [],
  camiones=[],
  clientes,
  empresas,
}: any) {
  const [errors, setErrors] = useState<any>({});

  function validate(formData: FormData) {
    const newErrors: any = {};

    if (!formData.get("conductor"))
      newErrors.conductor = "Selecciona un conductor";
    if (!formData.get("camion")) newErrors.camion = "Selecciona un camión";
    if (!formData.get("origen")) newErrors.origen = "Origen requerido";
    if (!formData.get("destino_final")) newErrors.destino = "Destino requerido";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  return (
    <form
      action={(formData) => {
        if (!validate(formData)) return;
        return crearViaje(formData);
      }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-4"
    >
      {/* CARD: EMPRESA */}
      {sesion?.esSuperAdmin && (
        <div className="bg-white p-5 rounded-xl shadow border">
          <h2 className="font-semibold mb-3">Empresa</h2>

          <select
            name="empresa"
            className="w-full border p-2 rounded-lg"
            required
          >
            <option value="">Seleccionar empresa</option>
            {empresas?.map((e: any) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* CARD: RECURSOS */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <div className="grid grid-cols-2 gap-4">
          {/* CONDUCTOR */}
          <div>
            <h2><label className="font-semibold">Conductor</label></h2>
            <select
              name="conductor"
              className={`w-full border p-2 rounded-lg ${
                errors.conductor ? "border-red-500" : ""
              }`}
            >
              <option value="">Seleccionar</option>
              {conductores
                .filter((c: any) => c.estado === "disponible")
                .map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.nombres}
                  </option>
                ))}
            </select>
            {errors.conductor && (
              <p className="text-red-500 text-xs mt-1">{errors.conductor}</p>
            )}
          </div>

          {/* CAMIÓN */}
          <div>
            <label className="font-semibold">Camión</label>
            <select
              name="camion"
              className={`w-full border p-2 rounded-lg ${
                errors.camion ? "border-red-500" : ""
              }`}
            >
              <option value="">Seleccionar</option>
              {camiones
                .filter((c: any) => c.estado === "disponible")
                .map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.placa}
                  </option>
                ))}
            </select>
            {errors.camion && (
              <p className="text-red-500 text-xs mt-1">{errors.camion}</p>
            )}
          </div>
        </div>
      </div>

      {/* CARD: RUTA */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <h2 className="font-semibold mb-4">Ruta</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              name="origen"
              placeholder="Origen"
              className={`w-full border p-2 rounded-lg ${
                errors.origen ? "border-red-500" : ""
              }`}
            />
            {errors.origen && (
              <p className="text-red-500 text-xs">{errors.origen}</p>
            )}
          </div>

          <div>
            <input
              name="destino_final"
              placeholder="Destino"
              className={`w-full border p-2 rounded-lg ${
                errors.destino ? "border-red-500" : ""
              }`}
            />
            {errors.destino && (
              <p className="text-red-500 text-xs">{errors.destino}</p>
            )}
          </div>
        </div>
      </div>

      {/* CARD: CLIENTE */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <h2 className="font-semibold mb-3">Cliente</h2>

        <select name="cliente" className="w-full border p-2 rounded-lg">
          <option value="">Seleccionar</option>
          {clientes.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* CARD: FECHAS */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <h2 className="font-semibold mb-4">Fechas</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="fecha_inicio"
            className="border p-2 rounded-lg"
          />
          <input
            type="date"
            name="fecha_fin_estimada"
            className="border p-2 rounded-lg"
          />
        </div>
      </div>

      {/* CARD: OBSERVACIONES */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <h2 className="font-semibold mb-3">Observaciones</h2>

        <textarea
          name="observaciones"
          placeholder="Notas adicionales del viaje..."
          className="w-full border p-2 rounded-lg"
        />
      </div>

      {/* SUBMIT */}
      <SubmitButton />
    </form>
  );
}
