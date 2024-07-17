import { useLocation } from "react-router-dom";
import { updateJurisdictionRequest } from "../../../api/query";
import styles from './UpdateJurisdictionPage.module.css'
import Notification from "../../../components/Message/Notification/Notification";
import { useState } from "react";


const UpdateJurisdictionPage = () => {

  const { state } = useLocation();
  const [jurisdiccion, setJurisdiccion] = useState(state.jurisdiccion.jurisdiccion);
  const [addSuccess, setAddSuccess] = useState(false);
  const [notifications, setNotifications] = useState([]);


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await updateJurisdictionRequest(state.jurisdiccion.id,{
        jurisdiccion
      })
      const newNotification = {
        text: 'Jurisdiccion actualizado exitosamente',
        backgroundColor: '#0077FF',
    };
    setNotifications([...notifications, newNotification]);
      setAddSuccess(true)
    } catch (error){
      console.log(error)
      const newNotification = {
        text: 'Error al intentar actualizar la Jurisdiccion',
        backgroundColor: '#ec0000',
    };
    setNotifications([...notifications, newNotification]);
    }
  }


  return (
    <>
    <Notification notifications={notifications}/>
    <div className={`${styles.container} container-fluid bg-dark`}>
    <form onSubmit={handleSubmit}>
    <h3 className="mb-3">Editar Jurisdiccion</h3>
      <div className="row">
      <div className="col-2">
      <div className="form-floating mb-3">
      <input
      style={{
            backgroundColor:'rgba(104, 104, 104, 0.699)',
            color:'rgb(255,255,255)'
        }}
        className={`${styles.input} form-control disabled`}
        type="text"
        placeholder="id"
        value={state.jurisdiccion.id}
        id="floatingId"
        required={true}
      />
      <label className="ps-2" htmlFor="floatingId">ID</label>
      </div>
      </div>
      <div className="col-8">
      <div className="form-floating mb-3">
      <input
      style={{
            backgroundColor:'rgba(104, 104, 104, 0.699)',
            color:'rgb(255,255,255)'
        }}
        className={`${styles.input} form-control col`}
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
      Actualziar
      </button>
      </div>
      </div>
    </form>
    </div>
    </>
  )
}

export default UpdateJurisdictionPage