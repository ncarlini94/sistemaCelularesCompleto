
import { useState } from 'react';
import styles from './NumbersUpload.module.css';
import { numbersUploadRequest } from '../../../api/import'
import ErrorMessage from '../../Message/ErrorMessage/ErrorMessage';


const NumbersUpload = ( ) => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [compañia, setCompañia] = useState()
  const [msj, setMsj] = useState('')
  const [success, setSuccess] = useState(false)
  const [uploading, setUploading] = useState(false);


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      try {
        await numbersUploadRequest( formData, compañia );
        setUploading(true);
        setSuccess(true)
        setMsj(['Datos importados correctamente'])
      } catch (error) {
        const errors = error.response.data.split(',')
        setMsj(errors)
        console.error('Error:', error);
        console.error('Server Response:', error);
      }
    }
  };

  return (

      <form onSubmit={handleUpload}>
      <div  className='row'>
      <div>
        <h3 className='text-light'>Lineas</h3>
      </div>
      <div className={`${styles.boxSelect} col-3`}>
        <select
            className={`${styles.select} form-select`}
            onChange={(e) => setCompañia(e.target.value)}
            >
              <option selected disabled defaultValue={true}>Compañia</option>
              <option value={"MOVISTAR"}>Movistar</option>
              <option value={"CLARO"}>Claro</option>
              <option value={"TELECOM"}>Telecom</option>
        </select>
      </div>
        <div className={`${styles.boxInput} input-group col-6`}>
            <input
              className={`${styles.input} form-control`}
              style={{
                background:'rgb(200,200,200)'
              }}
                type='file'
                name='file'
                id="inputGroupFile04"
                aria-label="Upload"
                onChange={handleFileChange}>
            </input>
          <button
              className={`${styles.btn} btn btn-outline-primary`}
              id="inputGroupFile04"
              type='submit'
              disabled={uploading}>
              Enviar
            </button>
          </div>
          <ErrorMessage message={msj} success={success}/>
        </div>
      </form>
  );
}

export default NumbersUpload;
