import { useAuth } from '../../contexts/authContext'
import styles from './ManageProfilePage.module.css'


const ManageProfilePage = () => {

    const {user} = useAuth()

    const formatDate = (fecha) => {
        const fechaAlta = new Date(fecha);
        const año = fechaAlta.getFullYear();
        const mes = fechaAlta.getMonth() + 1;
        const dia = fechaAlta.getDate();
        return `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${año}`;
    };


  return (
    <div className={`${styles.container} container-fluid bg-dark`}>
      <form className="">
        <div className={`${styles.topBox} row`}>
            <h3 className="col-auto me-auto">Mi Perfil</h3>
            <div className={`${styles.rol} col-auto`}>
                <h4 className={`${styles.rolText}`}>{user.rol}</h4>
            </div>
        </div>
        <div className={`${styles.box} row`}>
        <div  className="col-lg-6">
            <label>CUIT</label>
            <input
                style={{
                    backgroundColor:'rgba(104, 104, 104, 0.699)',
                    color:'rgb(255,255,255)'
                }}
                className={`${styles.input} form-control`}
                type="text"
                disabled={true}
                value={user.cuit}
            />
        </div>
        <div  className="col-lg-6">
            <label>Usuario</label>
            <input
                style={{
                    backgroundColor:'rgba(104, 104, 104, 0.699)',
                    color:'rgb(255,255,255)'
                }}
                className={`${styles.input} form-control`}
                type="text"
                disabled={true}
                value={user.username}
            />
        </div>
        <div  className="col-lg-6">
            <label>Nombre</label>
            <input
                style={{
                    backgroundColor:'rgba(104, 104, 104, 0.699)',
                    color:'rgb(255,255,255)'
                }}
                className={`${styles.input} form-control`}
                type="text"
                value={user.nombre}
            />
        </div>
        <div  className="col-lg-6">
            <label>Apellido</label>
            <input
                style={{
                    backgroundColor:'rgba(104, 104, 104, 0.699)',
                    color:'rgb(255,255,255)'
                }}
                className={`${styles.input} form-control`}
                type="text"
                value={user.apellido}
            />
        </div>
        <div  className="col-lg-6">
            <label>Mail</label>
            <input
                style={{
                    backgroundColor:'rgba(104, 104, 104, 0.699)',
                    color:'rgb(255,255,255)'
                }}
                className={`${styles.input} form-control`}
                type="text"
                value={user.email}
            />
        </div>
        <div  className="col-lg-3">
            <label>Creado</label>
            <input
                style={{
                    backgroundColor:'rgba(104, 104, 104, 0.699)',
                    color:'rgb(255,255,255)'
                }}
                className={`${styles.input} form-control`}
                type="text"
                value={formatDate(user.updateDate)}
            />
        </div>
        <div  className="col-lg-3">
            <label>Actualizado</label>
            <input
                style={{
                    backgroundColor:'rgba(104, 104, 104, 0.699)',
                    color:'rgb(255,255,255)'
                }}
                className={`${styles.input} form-control`}
                type="text"
                value={formatDate(user.updateDate)}
            />
        </div>
        <div  className="col-lg-12 pt-4">
            <label>Mis Jurisdicciones</label>
            <ul className={`${styles.listGroup} list-group pt-2`}>
            {user && user.jurisdicciones && JSON.parse(user.jurisdicciones).map((jurisdiccion, index) => (
            <li className={`${styles.listItem} list-group-item list-group-item-dark list-group-item-action`} key={index}>{jurisdiccion}</li>
            ))}
            </ul>
        </div>
        </div>
      </form>
    </div>
  )
}

export default ManageProfilePage