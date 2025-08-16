import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Registro.css"
import { create } from "../services/viajes"

const RegistroSimple = ({ onClose }) => {
  
  const [viaje, setViaje] = useState({
    estado: "",
    fecha: "",
    origen: "",
    destino: "",
    conductor: "",
    vehiculo: "",
    flete: ""
  })
  const navigate = useNavigate()

  const handleChange =  (e) => {
    const { name, value } = e.target
    setViaje(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!viaje.fecha || !viaje.origen || !viaje.destino || !viaje.flete){
      alert("Por favor, completa todos los campos.")
      return //<- esto evita que el codigo continue si no se cumplen las condiciones
    } 
    
    try {
      const nuevoViaje = await create(viaje)
      console.log("Viaje creado con Id: ",nuevoViaje.id)
      navigate(`/registro-completo/${nuevoViaje._id}`)
      setViaje({
        estado: "",
        fecha: "",
        origen: "",
        destino: "",
        conductor: "",
        vehoculo: "",
        flete: "",
      });
    
    }catch(error){
      console.error("Error al crear el viaje:", error)
      alert("Ocurrió un error al crear el viaje. Por favor, inténtalo de nuevo.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="registroSimple">
      <h2>Registrar nuevo viaje</h2>
      <label>
        Fecha
        <input name="fecha" type="date" value={viaje.fecha} onChange={handleChange} required />
      </label>
      <label>
        Origen
        <input name="origen" placeholder="Origen" value={viaje.origen} onChange={handleChange} required/>
      </label>
      <label>
        Destino
        <input name="destino" placeholder="Destino" value={viaje.destino} onChange={handleChange} required/>
      </label>
      <label>
        Conductor
        <input name="conductor" placeholder="Conductor" value={viaje.conductor} onChange={handleChange}/>
      </label>
      <label>
        Placa
        <input name="vehiculo" placeholder="placa- vehiculo" value={viaje.vehiculo} onChange={handleChange}/>
      </label>
      <label>
        Flete
        <input name="flete" type="number" placeholder="Flete" value={viaje.flete} onChange={handleChange} required/>
      </label>
      <button type="submit">Registrar viaje</button>
      <button type="button"onClick={onClose}>Cancelar</button>
    </form>
  )
}

export default RegistroSimple