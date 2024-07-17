import { useState } from "react";
import { useParams } from "react-router-dom";
import Notification from "../../../components/Message/Notification/Notification";
import styles from './ChangePasswordPage.module.css'
import { changePasswordRequest } from "../../../api/administrator";
import { useAuth } from '../../../contexts/authContext';

const ChangePassword = () => {

  const { id } = useParams();
  const {user} = useAuth()
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [addSuccess, setAddSuccess] = useState(false);
  const [notifications, setNotifications] = useState([]);




  const handleSubmit = async (e) => {
      try {
          e.preventDefault();
          await changePasswordRequest(id,{
            password,
            newPassword,
            verifyPassword
          })
          const newNotification = {
          text: 'Contraseña actualizada con exito',
          backgroundColor: 'rgba(0, 201, 43, 0.904)',
          };
          setNotifications([...notifications, newNotification]);
          setAddSuccess(true)
        } catch (error) {
          const errorMessage = error.response ? error.response.data.message : 'Error al actualizar la contraseña';
          const newNotification = {
          text: errorMessage,
          backgroundColor: '#ec0000',
        };
          setNotifications([...notifications, newNotification]);
          console.log(error)
        }
      };



  return (
    <>
      <Notification notifications={notifications}/>
        <div className={`${styles.container} container-fluid bg-dark`}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <h3 className='col-auto me-lg-auto me-5'>Actualizar contraseña</h3>
                <button className={`${styles.btn} btn col-auto ${addSuccess ? 'btn-success' : 'btn-primary'}`} type="submit">
                  Actualizar
              </button>
            </div>
            <div className="row mt-4">
              <div className="col-lg-6">
                <label>Cuit</label>
                <input
                  className={`${styles.input} form-control`}
                  style={{
                  backgroundColor:'rgba(104, 104, 104, 0.699)',
                  color:'rgb(255,255,255)'
                  }}
                  type="text"
                  placeholder="Cuit"
                  value={id}
                  disabled={true}
                  />
              </div>
              <div className="col-lg-6">
                <label>Usuario</label>
                <input
                  className={`${styles.input} form-control`}
                  style={{
                  backgroundColor:'rgba(104, 104, 104, 0.699)',
                  color:'rgb(255,255,255)'
                  }}
                  type="text"
                  placeholder="Usuario"
                  value={user.username}
                  disabled={true}
                  />
              </div>
              <div className="col-lg-6">
                <label>Contraseña</label>
                <input
                  className={`${styles.input} form-control`}
                  style={{
                  backgroundColor:'rgba(104, 104, 104, 0.699)',
                  color:'rgb(255,255,255)'
                  }}
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <div className="col-lg-6">
                <label>Nueva Contraseña</label>
                <input
                  className={`${styles.input} form-control`}
                  style={{
                  backgroundColor:'rgba(104, 104, 104, 0.699)',
                  color:'rgb(255,255,255)'
                  }}
                  type="password"
                  placeholder="Nueva Contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  />
              </div>
              <div className="col-lg-6">
                <label>Confirmar contraseña</label>
                <input
                  className={`${styles.input} form-control`}
                  style={{
                  backgroundColor:'rgba(104, 104, 104, 0.699)',
                  color:'rgb(255,255,255)'
                  }}
                  type="password"
                  placeholder="Reingrese la contraseña"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  />
              </div>
            </div>
          </form>
        </div>
    </>
  )
}

export default ChangePassword