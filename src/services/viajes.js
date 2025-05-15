import axios from 'axios'
const baseURL = 'http://localhost:3001/viajes'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then((response) => response.data )
}

const create = (viaje) => {
    const request = axios.post(baseURL, viaje)
    return request.then((response) => response.data)
} 

const update = (id, newData) => {
    const request = axios.put(`${baseURL}/${id}`, newData)
    return request.then((response) => response.data)
} 

const dltViaje = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then((response) => response.data)
}

export default { 
    getAll: getAll, 
    create: create, 
    update: update, 
    dltViaje: dltViaje 
}