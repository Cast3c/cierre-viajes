import "../styles/Viajes.css" 
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi'

const ListaViajes = ({ viajes, onEliminar }) => {
  return (
    <div className="listaSimple">
      <h2>Viajes registrados</h2>
      {viajes.length === 0 ? (
        <p>No hay viajes registrados aún.</p>
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
                  <button onClick={()=> onEliminar(i)}>
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
  );
};

export default ListaViajes;


