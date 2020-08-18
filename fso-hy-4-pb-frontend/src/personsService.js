import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl)

const create = (person) => axios.post(baseUrl, person)

const update = (id, newPerson) => axios.put(`${baseUrl}/${id}`, newPerson)

const deleteId = (id) => axios.delete(`${baseUrl}/${id}`)

export default {getAll, create, update, deleteId}