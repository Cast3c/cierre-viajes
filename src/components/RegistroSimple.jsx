import { useState } from "react";
import "../styles/Registro.css"

const RegistroSimple = ({ onCrear, onClose }) => {
  
  const [viaje, setViaje] = useState({
    estado: "",
    fecha: "",
    origen: "",
    destino: "",
    conductor: "",
    placa: "",
    flete: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setViaje(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!viaje.fecha || !viaje.origen || !viaje.destino || !viaje.flete){
      alert("Por favor, completa todos los campos.")
      return //<- esto evita que el codigo continue si no se cumplen las condiciones
    }    

    setViaje({
      estado: "",
      fecha: "",
      origen: "",
      destino: "",
      conductor: "",
      placa: "",
      flete: ""
    })
    onCrear(viaje)
  }

  return (
    <form onSubmit={handleSubmit} className="registroSimple">
      <h2>Registrar nuevo viaje</h2>
      <input name="estado" type="hidden" value="iniciado" />
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
        <input name="placa" placeholder="Placa" value={viaje.placa} onChange={handleChange}/>
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