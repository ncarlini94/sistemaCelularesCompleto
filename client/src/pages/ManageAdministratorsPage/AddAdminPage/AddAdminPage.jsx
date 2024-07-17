import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/authContext';
import { getJurisdictionsRequest } from '../../../api/query';
import styles from './AddAdminPage.module.css'
import Notification from '../../../components/Message/Notification/Notification';


const RegisterPage = () => {


    const [cuit, setCuit] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('Administrador');
    const [jurisdicciones, setJurisdicciones] = useState([])
    const { signUp } = useAuth();
    const [jurisdiccionesArray, setJurisdiccionesArray] = useState()
    const [addSuccess, setAddSuccess] = useState(false);
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        const handleSearchJurisdictions = async () => {
        try {
            const response = await getJurisdictionsRequest()
            setJurisdiccionesArray(response.data);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
        }
        };
        handleSearchJurisdictions();
    }, []);


    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        const newJurisdicciones = rol === 'Administrador' ? ['Todos'] : jurisdicciones;
        const response = await signUp({
          cuit,
          username,
          password,
          nombre,
          apellido,
          email,
          rol,
          jurisdicciones: JSON.stringify(newJurisdicciones),
        });
        if(response) {
          const newNotification = {
            text: 'Administrador creado exitosamente',
            backgroundColor: 'rgba(0, 201, 43, 0.904)',
        };
        setNotifications([...notifications, newNotification]);
        setAddSuccess(true)
        }
        console.log(response)
      } catch (error) {
        const errorMessage = error.response ? error.response.data.message : 'Error al crear el Administrador';
        const newNotification = {
          text: errorMessage,
          backgroundColor: '#ec0000',
      };
      setNotifications([...notifications, newNotification]);
      }
    };

    const handleJurisdiccionChange = (e) => {
      const selectedJurisdiccion = e.target.value;
      if (jurisdicciones.includes(selectedJurisdiccion)) {
        setJurisdicciones(prevJurisdicciones =>
          prevJurisdicciones.filter(j => j !== selectedJurisdiccion)
        );
      } else {
        setJurisdicciones(prevJurisdicciones =>
          [...prevJurisdicciones, selectedJurisdiccion]
        );
      }
    };

  return (
    <>
    <Notification notifications={notifications}/>
    <div className={`${styles.container} container-fluid bg-dark`}>
    <form onSubmit={handleSubmit}>
      <div className='row mb-4 mx-1'>
        <h3 className='col-auto me-auto'>Crear Administrador</h3>
        <button
          className={`${styles.btn} btn col-auto ${addSuccess ? 'btn-success' : 'btn-primary'}`} type="submit">
          Registrar
          </button>
      </div>
    <div className='row'>
    <div className='col-lg-12'>
    <label>Cuit</label>
      <input
        className={`${styles.input} form-control mb-2`}
        style={{
            backgroundColor:'rgba(104, 104, 104, 0.699)',
            color:'rgb(255,255,255)'
        }}
        type="number"
        placeholder="Cuit"
        value={cuit}
        required={true}
        onChange={(e) => setCuit(e.target.value)}
      />
      </div>
    <div className='col-lg-6'>
    <label>Usuario</label>
      <input
        className={`${styles.input} form-control mb-2`}
        style={{
            backgroundColor:'rgba(104, 104, 104, 0.699)',
            color:'rgb(255,255,255)'
        }}
        type="text"
        placeholder="Usuario"
        value={username}
        required={true}
        onChange={(e) => setUsername(e.target.value.toUpperCase())}
      />
      </div>
      <div className='col-lg-6'>
        <label>Contraseña</label>
          <input
            className={`${styles.input} form-control mb-2`}
            style={{
                backgroundColor:'rgba(104, 104, 104, 0.699)',
                color:'rgb(255,255,255)'
            }}
            type="password"
            placeholder="Contraseña"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
      </div>
      <div className='col-lg-6'>
        <label>Nombre</label>
          <input
            className={`${styles.input} form-control mb-2`}
            style={{
                backgroundColor:'rgba(104, 104, 104, 0.699)',
                color:'rgb(255,255,255)'
            }}
            type="text"
            placeholder={'Nombre'}
            value={nombre}
            required={true}
            onChange={(e) => setNombre(e.target.value)}
          />
      </div>
      <div className='col-lg-6'>
        <label>Apellido</label>
          <input
            className={`${styles.input} form-control mb-2`}
            style={{
                backgroundColor:'rgba(104, 104, 104, 0.699)',
                color:'rgb(255,255,255)'
            }}
            type="text"
            placeholder="Apellido"
            value={apellido}
            required={true}
            onChange={(e) => setApellido(e.target.value)}
          />
      </div>
      <div className='col-lg-8'>
        <label>Mail</label>
          <input
            className={`${styles.input} form-control mb-3`}
            style={{
                backgroundColor:'rgba(104, 104, 104, 0.699)',
                color:'rgb(255,255,255)'
            }}
            type="email"
            placeholder="Mail"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
      </div>
      <div className='col'>
      <label className=''>Rol</label>
      <select
        className={`${styles.select} form-control mb-2`}
        style={{
            backgroundColor:'rgba(104, 104, 104, 0.699)',
            color:'rgb(255,255,255)',
            marginTop: '2vh',
        }}
        value={rol}
        onChange={(e) => setRol(e.target.value)}
      >
      <option value="Administrador">Administrador</option>
      <option value="Consultor">Consultor</option>
      </select>
      </div>
      {rol === 'Consultor' && (
        <div className={`${styles.boxCheck}`}>
            {jurisdiccionesArray && jurisdiccionesArray.map((jurisdiccion) => (
              <div className='form-check' key={jurisdiccion.id}>
              <label className="form-check-label" htmlFor={jurisdiccion.jurisdiccion}>
              {jurisdiccion.jurisdiccion}
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                value={jurisdiccion.jurisdiccion}
                id={jurisdiccion.jurisdiccion}
                checked={jurisdicciones.includes(jurisdiccion.jurisdiccion)}
                onChange={handleJurisdiccionChange}
              />
              </div>
            ))}
            </div>
          )}
      </div>
    </form>
    </div>
    </>
  );
};

export default RegisterPage;
