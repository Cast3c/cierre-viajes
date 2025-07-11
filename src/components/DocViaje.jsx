import { useEffect, useState } from "react"
import html2pdf from "html2pdf.js"

const DocViaje = ({ viaje }) => {
    const tituloViaje = viaje.fecha + " | " + viaje.origen + " → " + viaje.destino
    const [clientes, setClientes] = useState([])
    const [gastos, setGastos] = useState({})

    const [mostrarResumen, setMostrarResumen] = useState(false)

    useEffect(() => {
        if (Array.isArray(viaje.clientes)) {    
            setClientes(viaje.clientes.map(cliente => ({
                ...cliente, flete: Number(cliente.flete)
            })))            
        }
    }, [viaje.clientes])

    useEffect(() => {
        if (viaje.gastos) {
            setGastos(viaje.gastos)
        }
    }, [viaje.gastos])

    const sumFlete = clientes.reduce((total, cliente) => { 
        const flete = Number(cliente.flete)          
        return total + (isNaN(flete) ? 0 : flete)
    },0)

    const totalGastos = Object.values(gastos).reduce((total, gasto)=> {
        const valor = Number(gasto)
        return total + (isNaN(valor) ? 0 : valor)
    }, 0)

    const manejarClickResumen = () => {

        setMostrarResumen(true)

        setTimeout(() => {
            exportarPDF()
        }, 100)
    }

    const cerrarViaje = () => {
        
    }

    const exportarPDF = () => {
        const btnSeccion = document.querySelector(".btnSeccion")
        if(btnSeccion) btnSeccion.style.display = "none"

        const element = document.querySelector(".docViaje")
        const opciones = {
            margin: 0.5,
            filename: `viaje-${viaje.fecha}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }

        html2pdf()
            .set(opciones)
            .from(element)
            .save()
            .then(()=> {
                if(btnSeccion) btnSeccion.style.display = ""
            })
    }

    return(
        <div className="docViaje">   
            <h3 className="tituloDoc">{tituloViaje}</h3>
            <div className="listaClientes">
                <h3>Entregas</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Flete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clientes.map((cliente, i) => {
                        return (
                            <tr key={i}>    
                                <td>{cliente.nombre}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.origen}</td>
                                <td>{cliente.destino}</td>
                                <td className="fleteCliente">${cliente.flete}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colSpan={3}></td>
                        <td></td>
                        <td></td>
                        </tr>
                    </tfoot>
                </table>
                <h3 className="totalFlete">Total flete: ${sumFlete}</h3>
            </div>
            <div className="gastos">
                <h3>Gastos</h3>
                {console.log(gastos)}
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Combustible</td>
                                <td>${gastos.combustible}</td>
                                {console.log(gastos.combustible)}
                            </tr>
                            <tr>
                                <td>Peajes</td>
                                <td>${gastos.peajes}</td>
                            </tr>
                            <tr>
                                <td>Ayudantes</td>
                                <td>${gastos.ayudantes}</td>
                            </tr>
                            <tr>
                                <td>Viaticos</td>
                                <td>${gastos.viaticos}</td>
                            </tr>
                            <tr>
                                <td>Comision</td>
                                <td>${gastos.comision}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3 className="totalGastos">Total gastos: ${totalGastos}</h3>    
                </div>
            </div>
            <div className="totalViaje">
                {mostrarResumen && (
                    <div className="resumenViaje">
                        <h3>Resumen del viaje</h3>
                        <p>Flete total: ${sumFlete}</p>
                        <p>Gastos totales: ${totalGastos}</p>
                        <h3 className="totalViaje">Total a cobrar: ${sumFlete - totalGastos}</h3>
                    </div>
                )}                
            </div>
            <div className="btnSeccion">
                    <button onClick={manejarClickResumen} className="btnResumen">Resumen PDF</button>
                    <button onClick={cerrarViaje} className="btnCerrar">Cerrar viaje</button>
            </div>
        </div>
        
    )
    
}

export default DocViaje