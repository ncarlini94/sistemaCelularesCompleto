import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import styles from './LoginPage.module.css'
import Logo from '../../assets/logo.svg'

const LoginPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login, isAuthenticated} = useAuth();

  if (isAuthenticated) return <Navigate to="/Users"/>;


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await login({
      username,
      password,
    })
    if (response) {
      console.log('Autenticación exitosa');
      navigate('/Users')
    } else {
      console.log('Autenticación fallida');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};


return (
  <div className={`${styles.container} container-fluid`}>
  <div className={`${styles.box} bg-dark`}>
    <form onSubmit={handleSubmit}>
      <div className={`${styles.boxUser}`}>
      <img
      className={`${styles.logo}`}
      src={Logo}
      />
        <label>Usuario</label>
        <input
        className={`${styles.input} form-control`}
        style={{
          color:'rgb(255,255,255)',
          backgroundColor:'rgba(104, 104, 104, 0.699)'
          }}
        type="text"
        value={username.toUpperCase()}
        onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className={`${styles.boxPassword}`}>
        <label>Contraseña</label>
        <input
        className={`${styles.input} form-control`}
        style={{
          color:'rgb(255,255,255)',
          backgroundColor:'rgba(104, 104, 104, 0.699)'
          }}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className={`${styles.btn} btn btn-primary`} type="submit">Iniciar Sesión</button>
    </form>
    </div>
  </div>
);
}

export default LoginPage;