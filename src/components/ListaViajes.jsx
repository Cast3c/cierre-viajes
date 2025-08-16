import "../styles/Viajes.css" 
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { getAll, create } from '../services/viajes'
import RegistroSimple from "./RegistroSimple";

const ListaViajes = () => {

  const [ viajes, setViajes ] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getAll()
      .then(data=> setViajes(data))
  },[])

  const [ newViaje, setNewViaje ] = useState(false)

  const handleNewViaje = async (nuevoViaje) => {
      try {
        const crearViaje = await create(nuevoViaje)
        await setViajes(v => [...v, crearViaje])
        navigate(`/registro-completo/${crearViaje.id}`)
        setNewViaje(false)
      } catch (error) {
          console.error("Error al intentar crear el viaje: ", error)
      }    
  }

  return (
    <div className="viajesList">
      <div className="newBtn" onClick={ () => setNewViaje(!newViaje) }>  
        <h1 className="newBntItem">+</h1>
        <p className="newBntItem">Agregar nuevo viaje</p>
      </div>
      {newViaje &&(
        <RegistroSimple 
          onCrear={handleNewViaje}
          onClose={() => setNewViaje(false)}
        />
      )}
      <div className="listaSimple">
      <h2>Viajes registrados</h2>
      {viajes.length === 0 ? (
        <div>
          <table>
            <thead>
            <tr>
              <th>Fecha</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Flete</th>
              <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
          <p>Aun no hay viajes registrados</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Flete</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {viajes.map((v, i) => (
              <tr key={i}>
                <td>{v.fecha}</td>
                <td>{v.origen}</td>
                <td>{v.destino}</td>
                <td>${v.flete}</td>
                <td>
                  <button onClick={() => alert("Funcionalidad futura")}>
                    <FiEdit />
                  </button>
                  <button onClick={() => alert("Funcionalidad futura")}>
                    <FiEye />
                  </button>
                  <button onClick={()=> alert("Funcionalidad futura")}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        // <ul>
        //   {viajes.map((v, i) => (
        //     <li key={i}>
        //       📅 {v.fecha} | 🛣 {v.origen} → {v.destino} | 💰 ${v.flete}
        //       <button onClick={() => alert("Funcionalidad futura")}>Agregar detalles</button>
        //     </li>
        //   ))}
        // </ul>
      )}
      </div>
    </div>
  );
};

export default ListaViajes;


