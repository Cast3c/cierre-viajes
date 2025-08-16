import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getById, update } from "../services/viajes"
import DocViaje from "./DocViaje";
import "../App.css"

const RegistroCompleto = () => {
  
  const { id } = useParams();
  const viajeId = String(id)
  const [viaje, setViaje] = useState(null)

  useEffect(() => {
    getById(viajeId).then(data => setViaje(data))
  }, [viajeId])

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

    const url = "clientes";
    
    if(!viaje) return

    // const clientesViaje = {
    //   clientes: [...(viaje.clientes || []), clientes]
    // }


    update(viajeId, clientes, url )
      
      .then((data) => {
        setViaje(data)
        console.log(clientes) 
        console.log("Viaje actualizado:", data)
        alert("cliente agregado correctamente")
    })
      .catch((error) => console.error("Ocurrio un error al actualizar el viaje:", error))

    setClientes({
      nombre: "",
      telefono:"",
      origen: "",
      destino: "",
      flete: "",
    })
  }

  const agregarGastos = () => {
    const url  = "gastos"
    if(!viaje)return

    // const newGastos = {
    //   gastos: {...gastos}
    // }

    update(viajeId, gastos, url)
      .then((data) => {
        setViaje(data)
        console.log("Gastos actualizados:", data)
      })
      .catch((error)=> console.error("Ocurrio un error al actualizar los gastos:", error))

    alert("Gastos agregados correctamente")

    setGastos({
      combustible: "",
      peajes: "",
      ayudantes: "",
      viaticos: "",
      comision: ""
    })

    console.log("gastos:", gastos)
  }

 if (!viaje) {
      return <p>Cargando datos del viaje...</p>
  }

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
          <input placeholder="Combustible" value={gastos.combustible} onChange={(e) => setGastos({ ...gastos, combustible: e.target.value })} type="number" />
          <input placeholder="Peajes" value={gastos.peajes} onChange={(e) => setGastos({ ...gastos, peajes: e.target.value })} type="number"/>
          <input placeholder="Ayudantes" value={gastos.ayudantes} onChange={(e) => setGastos({ ...gastos, ayudantes: e.target.value })} type="number"/>
          <input placeholder="Viáticos" value={gastos.viaticos} onChange={(e) => setGastos({ ...gastos, viaticos: e.target.value })} type="number"/>
          <input placeholder="Comisión" value={gastos.comision} onChange={(e) => setGastos({ ...gastos, comision: e.target.value })} type="number"/>
          <button onClick={agregarGastos}>Guardar Gastos</button>
        </fieldset>
      </div>
      <DocViaje viaje={viaje} />
    </div>
  )
}

export default RegistroCompleto;
