import { useState } from "react";
import "../App.css";

const Registro = () => {
  const [viaje, setViaje] = useState({
    fecha: "",
    origen: "",
    destino: "",
    cliente: "",
    flete: "",
    gastos: {
      peajes: "",
      combustible: "",
      viaticos: "",
      ayudantes: "",
      parqueadero: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      [
        "peajes",
        "combustible",
        "viaticos",
        "ayudantes",
        "parqueadero",
      ].includes(name)
    ) {
      setViaje((prev) => ({
        ...prev,
        gastos: {
          ...prev.gastos,
          [name]: value,
        },
      }));
    } else {
      setViaje((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const guardarViaje = () => {
    // eslint-disable-next-line no-unused-vars
    const { fecha, origen, destino, cliente, flete, gastos } = viaje;
    if (!fecha || !origen || !destino || !cliente || !flete) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const viajesGuardados = JSON.parse(localStorage.getItem("viajes")) || []
    viajesGuardados.push(viaje)
    localStorage.setItem("viajes", JSON.stringify(viajesGuardados))
    alert("Viaje guardado con éxito.")

    setViaje({
      fecha: "",
      origen: "",
      destino: "",
      cliente: "",
      flete: "",
      gastos: {
        peajes: "",
        combustible: "",
        viaticos: "",
        ayudantes: "",
        parqueadero: "",
      },
    })

    console.log("Viaje guardado:", viaje)
  };

  return (
    <div className="registro_viaje">
      <h2>Registro de Viaje</h2>
      <input name="fecha" value={viaje.fecha} onChange={handleChange} type="date" />
      <input name="origen" value={viaje.origen} onChange={handleChange} placeholder="Origen" />
      <input name="destino" value={viaje.destino} onChange={handleChange} placeholder="Destino" />
      <input name="cliente" value={viaje.cliente} onChange={handleChange} placeholder="Cliente" />
      <input name="flete" value={viaje.flete} onChange={handleChange} placeholder="Flete ($)" type="number" />

      <button onClick={guardarViaje}>
        Guardar Viaje
      </button>
    </div>
  )
};

export default Registro;
