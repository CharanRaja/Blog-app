import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertComment = payload => api.post(`/comments`, payload)
export const getAllComments = () => api.get(`/comments`)
export const updateCommentById = (id, payload) => api.put(`/comments/${id}`, payload)

const apis = {
    insertComment,
    getAllComments,
    updateCommentById,
}

export default apis
