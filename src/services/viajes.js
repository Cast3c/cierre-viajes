import axios from 'axios'
const baseURL = '/api/viajes'

export const getAll = () => axios.get(baseURL).then((response) => response.data )

export const getById = (id) => axios.get(`${baseURL}/${id}`).then((response)=> response.data)

export const create = (viaje) => axios.post(baseURL, viaje).then((response) => response.data)

export const update = (id, newData, url) => axios.put(`${baseURL}/${id}/${url}`, newData).then((response) => response.data)

export const remove = (id) => axios.delete(`${baseURL}/${id}`).then((response) => response.data)