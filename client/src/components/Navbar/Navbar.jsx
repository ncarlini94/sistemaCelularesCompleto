import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext';
import Logo from './../../assets/logo.svg'
import styles from './Navbar.module.css'
import { useEffect, useState } from 'react';


const Navbar = () => {

  const { user } = useAuth()
  const { logout } = useAuth()
  const [isAdministrator, setIsAdministrator] = useState(false)

  const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.clear();
  };


  useEffect(() =>{
    if(user.rol === "Administrador") {
      setIsAdministrator(true)
    }
  },[user.rol])


  return (
    <>
    <nav className={`${styles.Navbar} navbar bg-dark`}>
    <div className={`${styles.navbarContainer} container-fluid`}>
    <img className={`${styles.logo}`} src={Logo}></img>
    <div>
    <div className='row'>
    <div className={`${styles.boxUserExpand} col-lg-10`}>
    <h5
        className={`${styles.textUserExpand} text-light`}>{user.nombre.charAt(0).toUpperCase()}{user.apellido.charAt(0).toUpperCase()}
    </h5>
    {isMobileDevice ? (
      <>
      <Link
          className={`${styles.btnUserExpand} btn`}
          to={'/Profile'}>
              <i className={`${styles.icon} bi bi-person-fill`}></i>
        </Link>
        <Link
          className={`${styles.btnUserExpand} btn`}
          to={`/ChangePassword/${user.cuit}`}>
            <i className={`${styles.icon} bi bi-key-fill`}></i>
        </Link>
      </>
    ) : (
      <>
      <Link
          className={`${styles.btnUserExpand} btn`}
          to={'/Profile'}>
              <i className={`${styles.icon} bi bi-person-fill`}></i>
              Perfil
        </Link>
        <Link
          className={`${styles.btnUserExpand} btn`}
          to={`/ChangePassword/${user.cuit}`}>
            <i className={`${styles.icon} bi bi-key-fill`}></i>
            Cambiar Contraseña
        </Link>
      </>
    )}
    </div>
    <div className='col-lg-2 w-auto'>
    <button
    className={`${styles.btnNavbar} navbar-toggler`}
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasNavbar"
    aria-controls="offcanvasNavbar"
    aria-label="Toggle navigation">
      <i style={{color:'rgb(255,255,255)'}} className={` bi bi-list-nested`}></i>
    </button>
    </div>
    </div>
    </div>
    <div
    className={`${styles.barNavbar} offcanvas offcanvas-end`}
    tabIndex="-1"
    id="offcanvasNavbar"
    aria-labelledby="offcanvasNavbarLabel">
    <div
    className="offcanvas-header bg-dark"
    style={{
      height:'6vh',
      }}>
        <h5
        style={{fontSize:'3vh'}}
        className="offcanvas-title fw-bold text-white font-monospace"
        id="offcanvasNavbarLabel"
        >
          </h5>
        <button
        type="button"
        className="btn"
        data-bs-dismiss="offcanvas"
        aria-label="Close">
        <i
        style={{
          color:'rgb(255,255,255)'
          }}
        className={`${styles.closeBtn} bi bi-x-lg`}></i>
        </button>
      </div>
      <div
      className={`${styles.boxNavbar} bg-dark offcanvas-body`}>
    <ul>
        <li className=''>
          <Link className={`${styles.btn} ${styles.btnLine} btn disabled text-secondary`} to={'/Home'}>Tablero - Pendiente</Link>
        </li>
        <li className=''>
          <Link className={`${styles.btn} ${styles.btnLine} btn`} to={'/Numbers'}>Lineas</Link>
        </li>
        <li className=''>
          <Link className={`${styles.btn} ${styles.btnLine} btn`} to={'/Users'}>Usuarios</Link>
        </li>
    </ul>

            {isAdministrator &&
            <>
        <button
            className={`${styles.btnPanel} btn btn-outline-primary`}
            type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseWidthExample"
            aria-expanded="false"
            aria-controls="collapseWidthExample">
              Administrador
        </button>
        <div style={{minHeight: '100px'}}>
          <div className="collapse collapse-horizontal" id="collapseWidthExample">
            <div className="card card-body bg-transparent border-0">
            <ul className={`${styles.adminPanel} `}>
            <li className=''>
            <Link className={`${styles.btnPanel} ${styles.btnLine} btn`} to={'/plans'}>Planes</Link>
            </li>
            <li className=''>
            <Link className={`${styles.btnPanel} ${styles.btnLine} btn`} to={'/ChangeDevice'}>Cambio de equipo</Link>
            </li>
            <li className=''>
            <Link className={`${styles.btnPanel} ${styles.btnLine} btn`} to={'/repartitions'}>Reparticiones</Link>
            </li>
            <li className=''>
            <Link className={`${styles.btnPanel} ${styles.btnLine} btn`} to={'/Jurisdictions'}>Jurisdicciones</Link>
            </li>
            <li className=''>
            <Link className={`${styles.btnPanel} ${styles.btnLine} btn`} to={'/Manage'}>Administradores</Link>
            </li>
            <li className=''>
            <Link className={`${styles.btnPanel} ${styles.btnLine} btn disabled text-secondary`} to={'/Receipts'}>Remitos - Pendiente</Link>
            </li>
            <li className=''>
              {isMobileDevice ? (
                <Link className={`${styles.btnPanel} ${styles.btnLine} btn disabled text-secondary`}  style={{border:'none'}} to={'/'}><span style={{color:'rgba(0, 78, 223, 0.5)'}}>( Web ) </span>Importar</Link>
                ) : (
                <Link className={`${styles.btnPanel} ${styles.btnLine} btn`} to={'/Upload'}>Importar</Link>
                )}
            </li>
              <li className=''>
            <Link className={`${styles.btnPanel} ${styles.btnLine} btn`} to={'/Number/History'}>Historico Linea</Link>
            </li>
            <li className=''>
            <Link className={`${styles.btnPanel} ${styles.btnLine} btn`} to={'/User/History'}>Historico Funcionario</Link>
            </li>
            </ul>
            </div>
          </div>
      </div>
            </>
            }
        <div className={`${styles.logoutButtonContainer}`}>
            <button
                className={`${styles.sesionBtn} btn btn-outline-primary`}
                onClick={handleLogout}
                >
                Cerrar Sesión
            </button>
          </div>
    </div>
    </div>
    </div>
    </nav>
    </>
  )
}

export default Navbar