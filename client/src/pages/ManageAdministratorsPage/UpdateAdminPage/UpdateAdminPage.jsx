import { useLocation, useParams } from "react-router-dom";
import { updateAdministratorRequest } from "../../../api/administrator";
import { useEffect, useState } from "react";
import { getJurisdictionsRequest } from "../../../api/query";
import styles from './UpdateAdminPage.module.css'
import Notification from "../../../components/Message/Notification/Notification";

const UpdateAdminPage = () => {

  const { id } = useParams();
  const { state } = useLocation();
  const user = state.user;
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.email);
  const [rol, setRol] = useState(user.rol);
  const [jurisdicciones, setJurisdicciones] = useState(user.jurisdicciones);
  const [jurisdiccionesArray, setJurisdiccionesArray] = useState([]);
  const [addSuccess, setAddSuccess] = useState(false);
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    const handleSearchJurisdictions = async () => {
      try {
        const response = await getJurisdictionsRequest();
        setJurisdiccionesArray(response.data);
          setJurisdicciones(JSON.parse(user.jurisdicciones));
      } catch (error) {
        console.error('Error en la búsqueda:', error);
      }
    };

    handleSearchJurisdictions();
  }, [rol, user.jurisdicciones]);


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newJurisdicciones = rol === 'Administrador' ? ['Todos'] : jurisdicciones;
      await updateAdministratorRequest(id, {
        username,
        password,
        email,
        rol,
        jurisdicciones: JSON.stringify(newJurisdicciones),
      });
      const newNotification = {
        text: 'Administrador actualizado exitosamente',
        backgroundColor: '#0077FF',
    };
    setNotifications([...notifications, newNotification]);
      setAddSuccess(true)
    } catch (error) {
      const newNotification = {
        text: 'Error al intentar actualizar el administrador',
        backgroundColor: '#ec0000',
    };
    setNotifications([...notifications, newNotification]);
    }
  };

  const handleJurisdiccionChange = (e) => {
    const selectedJurisdiccion = e.target.value;
  
    if (rol === 'Consultor') {
      setJurisdicciones((prevJurisdicciones) => {
        const updatedJurisdicciones = prevJurisdicciones.filter(j => j !== 'Todos');
        if (!updatedJurisdicciones.includes(selectedJurisdiccion)) {
          setJurisdicciones([...updatedJurisdicciones, selectedJurisdiccion]);
        }
        return updatedJurisdicciones;
      });
    } else {
      setJurisdicciones(['Todos']);
    }
  };



  return (
    <>
    <Notification notifications={notifications}/>
    <div className={`${styles.container} container-fluid bg-dark`}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <h3 className='col-auto me-auto'>Editar Administrador</h3>
              <button className={`${styles.btn} btn col-auto ${addSuccess ? 'btn-success' : 'btn-primary'}`} type="submit">
                Actualizar
              </button>
          </div>
        <div className='row'>
        <div className='col-6'>
            <label>CUIT</label>
          <input
            className={`${styles.input} form-control`}
            style={{
            backgroundColor:'rgba(104, 104, 104, 0.699)',
            color:'rgb(255,255,255)'
            }}
            type="text"
            placeholder="Usuario"
            value={id}
            disabled={true}
          />
          </div>
          <div className='col-6'>
            <label>Usuario</label>
          <input
            className={`${styles.input} form-control`}
            style={{
            backgroundColor:'rgba(104, 104, 104, 0.699)',
            color:'rgb(255,255,255)'
        }}
            type="text"
            placeholder="Usuario"
            value={username}
            disabled={true}
            required={true}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          <div className='col-6'>
            <label>Contraseña</label>
          <input
            className={`${styles.input} form-control`}
            style={{
            backgroundColor:'rgba(104, 104, 104, 0.699)',
            color:'rgb(255,255,255)'
        }}
            type="password"
            placeholder="Contraseña"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <div className='col-6'>
            <label>Rol</label>
          <select
            className={`${styles.select} form-control`}
            style={{
            backgroundColor:'rgba(104, 104, 104, 0.699)',
            color:'rgb(255,255,255)'
        }}
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="Administrador">Administrador</option>
            <option value="Consultor">Consultor</option>
          </select>
          </div>
          <div className='col-12'>
          <label>Mail</label>
          <input
            className={`${styles.input} form-control`}
            style={{
            backgroundColor:'rgba(104, 104, 104, 0.699)',
            color:'rgb(255,255,255)'
        }}
            type="email"
            placeholder="Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          {rol === 'Consultor' && (
            <>
            <div className={`${styles.cardBox} card bg-dark`}>
            <div className="card-ody">
              {jurisdiccionesArray &&
                jurisdiccionesArray.map((jurisdiccion) => (
                  <div className='form-check' key={jurisdiccion.id}>
                    <label
                      className="form-check-label"
                      htmlFor={jurisdiccion.jurisdiccion}
                    >
                      {jurisdiccion.jurisdiccion}
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={jurisdiccion.jurisdiccion}
                      id={jurisdiccion.jurisdiccion}
                      checked={jurisdicciones.includes(
                        jurisdiccion.jurisdiccion
                      )}
                      onChange={handleJurisdiccionChange}
                    />
                  </div>
                ))}
                </div>
                </div>
            </>
          )}
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateAdminPage;
