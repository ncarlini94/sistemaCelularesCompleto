import { useState } from "react"
import { updatePlanRequest } from "../../../api/query";
import Notification from "../../../components/Message/Notification/Notification";
import styles from './UpdatePlanPage.module.css'
import { useLocation } from "react-router-dom";



const UpdatePlanPage = () => {


    const location = useLocation();
    const { plan } = location.state;
    const [id, setId] = useState(plan.id)
    const [nombre, setNombre] = useState(plan.nombre)
    const [llamadas, setLlamadas] = useState(plan.llamadas)
    const [mensajes, setMensajes] = useState(plan.mensajes)
    const [datos, setDatos] = useState(plan.datos)
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    useState(() =>{
        if(plan){
            setIsLoading(false)
        }
    })


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await updatePlanRequest(id,{
                id,
                nombre,
                llamadas,
                mensajes,
                datos
            })
            const newNotification = {
              text: 'Plan actualizado exitosamente',
              backgroundColor: '#0077FF',
          };
          setNotifications([...notifications, newNotification]);
        } catch (error) {
            console.log(error)
            const newNotification = {
              text: 'Error al intentar actualizar el Plan',
              backgroundColor: '#ec0000',
          };
          setNotifications([...notifications, newNotification]);
        }
      }



  return (
    <>
        <Notification notifications={notifications}/>
        {isLoading ? (
                    <p>Cargando...</p>
                ) : (
        <div className={`${styles.container} container-fluid bg-dark`}>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <h3 className="col-auto me-auto">Editar Plan</h3>
                    <button className={`${styles.btn} btn btn-primary col-auto`} type="submit">
                        Actualizar
                    </button>
                </div>
            <div className="row">
                <div className="col-lg-4">
                <label>ID</label>
                <input
                    className={`${styles.input} form-control`}
                    style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                    type="text"
                    placeholder="ID"
                    value={id}
                    required={true}
                    onChange={(e) => setId(e.target.value)}
                />
                </div>
                <div className="col-lg-8">
                <label>Nombre</label>
                <input
                    className={`${styles.input} form-control`}
                    style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                </div>
                <div className="col-4">
                <label>Llamadas</label>
                    <input
                    className={`${styles.input} form-control`}
                    style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                    type="text"
                    placeholder="Minutos"
                    value={llamadas}
                    required={true}
                    onChange={(e) => setLlamadas(e.target.value)}
                />
                </div>
                <div className="col-4">
                <label>Mensajes</label>
                <input
                    className={`${styles.input} form-control`}
                    style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                    type="text"
                    placeholder="Mensajes"
                    value={mensajes}
                    required={true}
                    onChange={(e) => setMensajes(e.target.value)}
                />
                </div>
                <div className="col-4">
                <label>Datos</label>
                <input
                    className={`${styles.input} form-control`}
                    style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                    type="text"
                    placeholder="Datos"
                    value={datos}
                    required={true}
                    onChange={(e) => setDatos(e.target.value)}
                />
                    </div>
                    </div>
                </form>
        </div>
                )}
    </>
  )
}

export default UpdatePlanPage