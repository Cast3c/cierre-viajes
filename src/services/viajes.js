import axios from 'axios'
const baseURL = 'http://localhost:3001/viajes'

export const getAll = () => axios.get(baseURL).then((response) => response.data )

export const getById = (id) => axios.get(`${baseURL}/${id}`).then((response)=> response.data)

export const create = (viaje) => axios.post(baseURL, viaje).then((response) => response.data)

export const update = (id, newData) => axios.put(`${baseURL}/${id}`, newData).then((response) => response.data)

export const remove = (id) => axios.delete(`${baseURL}/${id}`).then((response) => response.data)