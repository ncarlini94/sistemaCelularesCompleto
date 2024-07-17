import { useState } from "react"
import { addPlanRequest } from "../../../api/query"
import Notification from "../../../components/Message/Notification/Notification"
import styles from './AddPlanPage.module.css'


const AddPlanPage = () => {

    const [ id, setId] = useState('')
    const [ nombre, setNombre] = useState('')
    const [ llamadas, setLlamadas] = useState('')
    const [ mensajes, setMensajes] = useState('')
    const [ datos, setDatos] = useState('')
    const [notifications, setNotifications] = useState([]);



    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await addPlanRequest({
                id,
                nombre,
                llamadas,
                mensajes,
                datos,
            })
            const newNotification = {
                text: 'Número agregado exitosamente',
                backgroundColor: '#0077FF',
            };
            setNotifications([...notifications, newNotification]);
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : 'Error al agregar el Plan'
            const newNotification = {
                text: errorMessage,
                backgroundColor: '#ec0000',
            };
            setNotifications([...notifications, newNotification]);
        }
    }




return (
    <>
    <Notification notifications={notifications}/>
            <div className={`${styles.container} container-fluid bg-dark`}>
            <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                <h3 className="col-auto me-auto" style={{marginBottom:'4vh'}}>Añadir Plan</h3>
                    <button className={`${styles.btn} btn btn-primary col-auto`} type="submit">
                        Añadir
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
                    value={nombre}
                    required={true}
                    onChange={(e) => setNombre(e.target.value)}
                />
                </div>
                <div  className="col-4">
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
                    onChange={(e) => setLlamadas(e.target.value)}
                />
                </div>
                <div  className="col-4">
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
                <div  className="col-4">
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
                    onChange={(e) => setDatos(e.target.value)}
                />
                </div>
                </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default AddPlanPage