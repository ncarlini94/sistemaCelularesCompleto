import { useState } from "react";
import { addJurisdictionRequest } from "../../../api/query";
import styles from './AddJurisdictionPage.module.css'
import Notification from "../../../components/Message/Notification/Notification";



const AddJurisdictionPage = () => {

  const [id, setId] = useState('');
  const [jurisdiccion, setJurisdiccion] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [addSuccess, setAddSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jurisdictionData = {
        id:  id,
        jurisdiccion: jurisdiccion,
      };
      const response = await addJurisdictionRequest(jurisdictionData);
      if (response.status === 200) {
        const newNotification = {
          text: 'Jurisdicción agregada exitosamente',
          backgroundColor: '#0077FF',
        };
        setNotifications([...notifications, newNotification]);
        setAddSuccess(true)
        setId('');
        setJurisdiccion('');
        setTimeout(() => {
          setAddSuccess(false)
        }, 1500);
      } else {
        const newNotification = {
          text: 'Error al intentar agregar la jurisdicción',
          backgroundColor: '#ec0000',
        };
        setNotifications([...notifications, newNotification]);
      }
    } catch (error) {
      const newNotification = {
        text: 'Error al intentar agregar la jurisdicción',
        backgroundColor: '#ec0000',
      };
      setNotifications([...notifications, newNotification]);
    }
  };

  return (
    <>
      <Notification notifications={notifications}/>
      <div className={`${styles.container} container-fluid bg-dark`}>
      <form onSubmit={handleSubmit}>
      <h3 className={`${styles.title}`}>Crear Jurisdiccion</h3>
      <div className="row">
      <div className="col-lg-2">
      <div className="form-floating">
      <input
      style={{
            backgroundColor:'rgba(104, 104, 104, 0.699)',
            color:'rgb(255,255,255)'
        }}
        className={`${styles.input} form-control`}
        type="text"
        placeholder="id"
        value={id}
        id="floatingId"
        required={true}
        onChange={(e) => setId(e.target.value.toUpperCase())}
      />
      <label className="" htmlFor="floatingId">ID</label>
      </div>
      </div>
      <div className="col-lg-8">
      <div className="form-floating">
      <input
      style={{
            backgroundColor:'rgba(104, 104, 104, 0.699)',
            color:'rgb(255,255,255)'
        }}
        className={`${styles.input} form-control`}
        type="text"
        placeholder="jurisdiccion"
        value={jurisdiccion}
        required={true}
        id="floatingJurisdiccion"
        onChange={(e) => setJurisdiccion(e.target.value.toUpperCase())}
      />
      <label htmlFor="floatingJurisdiccion">Jurisdiccion</label>
      </div>
      </div>
      <div className="col-2">
      <button
      className={`${styles.btn} btn ${addSuccess ? 'btn-success' : 'btn-primary'}`}
      type="submit"
      >
      Registrar
      </button>
      </div>
      </div>
      </form>
      </div>
    </>
  )
}

export default AddJurisdictionPage