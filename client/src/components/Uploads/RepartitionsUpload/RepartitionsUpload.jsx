import { useState } from 'react';
import { repartitionsUploadRequest } from '../../../api/import';
import styles from './RepartitionsUpload.module.css';
import ErrorMessage from '../../Message/ErrorMessage/ErrorMessage';


const RepartitionsUpload = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [msj, setMsj] = useState(null)
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false)

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };



      const handleUpload = async (event) => {
        event.preventDefault();
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
          setUploading(true);
          await repartitionsUploadRequest( formData );
          setMsj(['Datos importados correctamente'])
          setSuccess(true)
        } catch (error) {
          const errors = error.response.data.split(',')
          setMsj(errors)
          console.error('Error:', error);
          console.error('Server Response:', error.response.data);
        }
      }
    };


  return (
    <>
<form className='row' onSubmit={handleUpload}>
<h3 className='text-light'>Repartición</h3>
<div className="input-group">
  <input
  style={{
    background:'rgb(200,200,200)'
  }}
    className='form-control'
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
    disabled={uploading}
    >
    Enviar
    </button>
  </div>
    <ErrorMessage message={msj} success={success}/>
</form>
    </>
  )
}

export default RepartitionsUpload