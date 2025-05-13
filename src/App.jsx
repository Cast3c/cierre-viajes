
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import RegistroSimple from './components/RegistroSimple'
import ListaViajes from './components/ListaViajes'
import RegistroCompleto from './components/RegistroCompleto'


const App = () => {
  const [viajes, setViajes] = useState(() => {
    const data = localStorage.getItem("viajes")
    return data ? JSON.parse(data) : []
  })

  useEffect(() => {
    localStorage.setItem("Viajes", JSON.stringify(viajes))
  }, [viajes])

  const agregarViaje = (nuevoViaje) => {
    const nuevosViajes = [...viajes, nuevoViaje]
    setViajes(nuevosViajes)
    return nuevosViajes.length - 1
  }

  const eliminarViaje = (index) => {
    const nuevosViajes = [...viajes]
    nuevosViajes.splice(index, 1)
    setViajes(nuevosViajes)
    localStorage.setItem("Viajes", JSON.stringify(nuevosViajes))
  }

  return (
    <Router>
      <div className='app'>
      <Routes>
        <Route path="/" element={<RegistroSimple onNuevoViaje={agregarViaje}/>}/>
        <Route path="/viajes" element={<ListaViajes viajes={viajes} onEliminar={eliminarViaje}/>}/>
        <Route path="/registro-completo/:index" element={<RegistroCompleto viajes={viajes} setViajes={setViajes}/>}/> 
      </Routes>
      </div>
    </Router>
    // <div className="app">
    //   <RegistroSimple onNuevoViaje={agregarViaje} />
    //   <RegistroCompleto />
    //   <ListaViajes viajes={viajes} onEliminar={eliminarViaje} />
    // </div>
  )
}


export default App
