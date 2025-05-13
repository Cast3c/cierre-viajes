import { useParams } from "react-router-dom";
import { useState } from "react";
import DocViaje from "./DocViaje";
import "../App.css"

const RegistroCompleto = ({ viajes, setViajes }) => {
  
  const { index } = useParams();
  const viajeIndex = Number(index)
  const viaje = viajes[viajeIndex]

  const [ clientes, setClientes ] = useState({
    nombre: "",
    telefono:"",
    origen: "",
    destino: "",
    flete: "",
  })

  const [ gastos, setGastos ] = useState({
    combustible: "",
    peajes: "",
    ayudantes: "",
    viaticos: "",
    comision: ""
  })

  const agregarCliente = () => {
    const nuevosViajes = [...viajes]
    nuevosViajes[viajeIndex].clientes = [...(nuevosViajes[viajeIndex].clientes || []), clientes]
    
    setViajes(nuevosViajes)

    setClientes({
      nombre: "",
      telefono:"",
      origen: "",
      destino: "",
      flete: "",
    })
  }

  const agregarGastos = () => {
    const nuevosViajes = [...viajes]
    nuevosViajes[viajeIndex].gastos = gastos
    setViajes(nuevosViajes)
    alert("Gastos agregados correctamente")
    setGastos({
      combustible: "",
      peajes: "",
      ayudantes: "",
      viaticos: "",
      comision: ""
    })
  }

  if (!viaje) return <h2>Viaje no registrado.</h2>

  return (
    <div>
      <h2>Detalles del Viaje</h2>
      <div className="detalleViaje">
        <fieldset className="inputGroup">
          <legend><h3>Agregar Cliente</h3></legend>
          <input placeholder="Nombre" value={clientes.nombre} onChange={(e) => setClientes({ ...clientes, nombre: e.target.value })} />
          <input placeholder="Teléfono" value={clientes.telefono} onChange={(e) => setClientes({ ...clientes, telefono: e.target.value })} />
          <input placeholder="Flete" value={clientes.flete} onChange={(e) => setClientes({ ...clientes, flete: e.target.value })} />
          <input placeholder="Origen" value={clientes.origen} onChange={(e) => setClientes({ ...clientes, origen: e.target.value })} />
          <input placeholder="Destino" value={clientes.destino} onChange={(e) => setClientes({ ...clientes, destino: e.target.value })} />
          <button onClick={agregarCliente}> + Agregar Cliente</button>
        </fieldset>
        <fieldset className="inputGroup">
          <legend><h3>Gastos</h3></legend>
          <input placeholder="Combustible" value={gastos.combustible} onChange={(e) => setGastos({ ...gastos, combustible: e.target.value })} />
          <input placeholder="Peajes" value={gastos.peajes} onChange={(e) => setGastos({ ...gastos, peajes: e.target.value })} />
          <input placeholder="Ayudantes" value={gastos.ayudantes} onChange={(e) => setGastos({ ...gastos, ayudantes: e.target.value })} />
          <input placeholder="Viáticos" value={gastos.viaticos} onChange={(e) => setGastos({ ...gastos, viaticos: e.target.value })} />
          <input placeholder="Comisión" value={gastos.comision} onChange={(e) => setGastos({ ...gastos, comision: e.target.value })} />
          <button onClick={agregarGastos}>Guardar Gastos</button>
        </fieldset>
      </div>
      <DocViaje viaje={viaje} />
      {console.log(viaje)}
    </div>
  )
}

export default RegistroCompleto;
