import axios from "axios";
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post( baseUrl, newObject )
    return request.then(response => response.data)
}

const update = (id, noteObject) => {
    const request = axios.put(`${baseUrl}/${id}`, noteObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }