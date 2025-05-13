import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "../styles/Registro.css"

const RegistroSimple = ({ onNuevoViaje}) => {
  const navigate = useNavigate()
  const [viaje, setViaje] = useState({
    estado: "",
    fecha: "",
    origen: "",
    destino: "",
    clientes: [],
    flete: "",
    gastos: {
      combustible: "",
      peajes: "",
      ayudantes: "",
      viaticos: "",
      comision: ""
    }
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setViaje({...viaje, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!viaje.fecha || !viaje.origen || !viaje.destino || !viaje.flete){
      alert("Por favor, completa todos los campos.")
      return //<- esto evita que el codigo continue si no se cumplen las condiciones
    }

    const indexNuevoViaje = onNuevoViaje(viaje)
    
    onNuevoViaje(viaje)
    setViaje({
      fecha: "",
      origen: "",
      destino: "",
      flete: ""
    })

    navigate(`/registro-completo/${indexNuevoViaje}`)
  }

  return (
    <form onSubmit={handleSubmit} className="registroSimple">
      <h2>Registrar nuevo viaje</h2>
      <input name="fecha" type="date" value={viaje.fecha} onChange={handleChange} />
      <input name="origen" placeholder="Origen" value={viaje.origen} onChange={handleChange} />
      <input name="destino" placeholder="Destino" value={viaje.destino} onChange={handleChange} />
      <input name="flete" type="number" placeholder="Flete" value={viaje.flete} onChange={handleChange} />
      <button type="submit">Registrar viaje</button>
    </form>
  )
}

export default RegistroSimple