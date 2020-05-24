import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const request = await axios.get(baseUrl)
	return request.data
}

const create = async blog => {
	const config = {
		headers: { Authorization: token },
	}

	const re = await axios.post(baseUrl, blog, config)
	return re.data
}

const update = async (id, newObject) => {
	const request = await axios.put(`${baseUrl}/${id}`, newObject)
	return request.data
}

const remove = async id => {
	const config = {
		headers: { Authorization: token },
	}

	const request = await axios.delete(`${baseUrl}/${id}`, config)
	return request.data
}

export default { getAll, setToken, create, update, remove }