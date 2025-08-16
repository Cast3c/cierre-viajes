
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import RegistroSimple from './components/RegistroSimple'
import ListaViajes from './components/ListaViajes'
import RegistroCompleto from './components/RegistroCompleto'
import { getAll } from './services/viajes'


const App = () => {
  const [viajes, setViajes] = useState([])

  useEffect(() => {
    getAll()
      .then(data => setViajes(data))     
  }, [])

  const agregarViaje = (nuevoViaje) => {
    const nuevosViajes = [...viajes, nuevoViaje]
    setViajes(nuevosViajes)
    console.log('Viaje agregado:', nuevoViaje)
    return 
  }

  return (
    <Router>
      <div className='app'>
      <Routes>
        <Route path="/" element={<ListaViajes />}/>
        <Route path="/viaje-nuevo" element={<RegistroSimple />}/>
        <Route path="/registro-completo/:id" element={<RegistroCompleto />}/> 
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
