import axios from 'axios'



export const numbersUploadRequest =  (formData, compañia) => axios.post('/api/importNumbers', formData , {
    headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        compañia: compañia,
      },
})

export const usersUploadRequest =  (formData) => axios.post('/api/importUsers', formData , {
  headers: {
      'Content-Type': 'multipart/form-data',
    },
})


export const jurisdictionsUploadRequest =  (formData, progressCallback) => axios.post('/api/importJurisdictions', formData , {
    headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        progressCallback(progress);
      },
})

export const repartitionsUploadRequest =  (formData) => axios.post('/api/importRepartitions', formData , {
  headers: {
      'Content-Type': 'multipart/form-data',
    },
})