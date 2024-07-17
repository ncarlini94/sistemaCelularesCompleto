import axios from "axios";


// Lineas

export const getNumberRequest =  (id) => axios.get(`/api/number/${id}`)

export const getNumbersRequest =  () => axios.get('/api/numbers')

export const getNumbersForRolRequest =  (jurisdicciones) => axios.get('/api/numbers/rol', { params: { jurisdicciones } })

export const updateNumberRequest = (linea, user) => axios.put(`/api/number/${linea}`, user)

export const addNumberRequest = (number) => axios.post('/api/number', number)

export const DeleteNumberRequest = (id) => axios.delete(`/api/number/${id}`)


// Planes


export const getPlansRequest =  () => axios.get('/api/plans')

export const updatePlanRequest = (id, plan) => axios.put(`/api/plan/${id}`, plan)

export const addPlanRequest = (plan) => axios.post('/api/plan', plan)

export const DeletePlanRequest = (id) => axios.delete(`/api/plan/${id}`)

// Equipos

export const changeDeviceRequest = (id, device) => axios.put(`/api/device/${id}`, device)


// Jurisdiccion


export const getJurisdictionRequest = (id) => axios.get(`/api/jurisdiction/${id}`)

export const getJurisdictionsRequest = () => axios.get('/api/jurisdictions')

export const addJurisdictionRequest = (jurisdiccion) => axios.post('/api/jurisdiction', jurisdiccion)

export const updateJurisdictionRequest = (id, jurisdiccion) => axios.put(`/api/jurisdiction/${id}`, jurisdiccion)

export const DeleteJurisdictionRequest = (id) => axios.delete(`/api/jurisdiction/${id}`)


// Reparticion


export const getRepartitionRequest = (id) => axios.get(`/api/repartition/${id}`)

export const addRepartitionRequest = (repartition) => axios.post('/api/repartition', repartition)

export const getRepartitionsRequest = () => axios.get('/api/repartitions')

export const DeleteRepartitionRequest = (id) => axios.delete(`/api/repartition/${id}`)


// History


export const getNumberHistoryRequest = (id) => axios.get(`/api/number/history/${id}`)


export const getValuesForDashboard =  (jurisdicciones, rol) => axios.get('/api/dashboard', { params: { jurisdicciones, rol } })