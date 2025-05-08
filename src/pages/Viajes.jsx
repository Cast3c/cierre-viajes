import { useState, useEffect } from "react";

const Viajes = () => {
    const [viajes, setViajes] = useState([]);
    
    useEffect(() => {
        const viajesGuardados = JSON.parse(localStorage.getItem("viajes")) || [];
        setViajes(viajesGuardados);
    }, []);

    const gastosTotal = (gastos) => {
            
        return Object.values(gastos).reduce((total, valor) => {
            const numero = Number(valor)
            return total + (isNaN(numero) ? 0 : numero)
        }, 0)
    }

    const eliminarViaje = (index) => {
        
        const viajesGuardados = JSON.parse(localStorage.getItem("viajes")) || []
        viajesGuardados.splice(index, 1)
        localStorage.setItem("viajes", JSON.stringify(viajesGuardados))

        setViajes(viajesGuardados)
    }
    
    return (
        <div className="container">
        <h1>Lista de Viajes</h1>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Fecha</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Cliente</th>
                <th>Flete</th>
                <th>Gastos</th>
            </tr>
            </thead>
            <tbody>
            {viajes.map((viaje, index) => (
                <tr key={index}>
                <td>{viaje.fecha}</td>
                <td>{viaje.origen}</td>
                <td>{viaje.destino}</td>
                <td>{viaje.cliente}</td>
                <td>${viaje.flete}</td>
                <td>${gastosTotal(viaje.gastos)}</td>
                <td><button onClick={() => eliminarViaje(index)}><p>Eliminar</pgit ></button></td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    }

    export default Viajes