import axios from "axios";

export const createUserRequest = (user) => axios.post('/api/user', user)

export const getUserRequest = (id) => axios.get(`/api/user/${id}`);

export const getUsersRequest = (user) => axios.get('/api/users', user)

export const getUsersForRolRequest = (jurisdicciones) => axios.get('/api/users/rol',{ params: { jurisdicciones } })

export const deleteUserRequest = (id) => axios.delete(`/api/user/${id}`)

export const updateUserRequest = (id, user) => axios.put(`/api/user/${id}`, user)

export const getUserHistoryRequest = (id) => axios.get(`/api/user/history/${id}`)