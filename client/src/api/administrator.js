import axios from "axios";

export const getAdministratorRequest = (username) => axios.get(`/api/administrator?username=${username}`);

export const getAdministratorsRequest = (user) => axios.get('/api/administrators', user)

export const deleteAdministratorRequest = (id) => axios.delete(`/api/administrator/${id}`)

export const updateAdministratorRequest = (id, user) => axios.put(`/api/administrator/${id}`, user)

export const changePasswordRequest = (id, user) => axios.put(`/api/changePassword/${id}`, user)