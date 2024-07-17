import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { getUserRequest, getUsersRequest } from "../../../api/user";
import { getPlansRequest, updateNumberRequest } from "../../../api/query";
import styles from './UpdateNumberPage.module.css'
import Notification from "../../../components/Message/Notification/Notification";
import ProgressBar from 'react-bootstrap/ProgressBar';
import DivingLine from "../../../components/DivingLine/DivingLine";
import { useAuth } from '../../../contexts/authContext'


const UpdateNumberPage = () => {


    const { user } = useAuth()
    const { state } = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [cuit, setCuit] = useState(state.linea.funcionarioData ? state.linea.funcionarioData.cuit : '')
    const [linea, setLinea] = useState(state.linea.linea)
    const fechaAlta = new Date(state.linea.fechaAlta);
    const [funcionario, setFuncionario] = useState('')
    const [compañia, setCompañia] = useState(state.linea.compañia)
    const [plan, setPlan] = useState(state.linea.plan)
    const [modelo, setModelo] = useState(state.linea.modelo)
    const [imei, setImei] = useState(state.linea.imei)
    const [modeloConectado] = useState(state.linea.modeloConectado)
    const [imeiConectado] = useState(state.linea.imeiConectado)
    const [sim, setSim] = useState(state.linea.sim)
    const [observaciones, setObservaciones] = useState(state.linea.observaciones)
    const [activo, setActivo] = useState(state.linea.activo)
    const [isLoading, setIsLoading] = useState(true);
    const año = fechaAlta.getFullYear();
    const mes = fechaAlta.getMonth() + 1;
    const dia = fechaAlta.getDate();
    const fechaFormateada = `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${año}`;
    const [notifications, setNotifications] = useState([]);
    const [imeiMatch, setImeiMatch] = useState(null);

    console.log(state.linea)


    const [plans, setPlans] = useState([])
    const planSeleccionado = plans.find((p) => p.id === plan);
    const [ datosMoviles ] = useState(state.linea.datos || 0)
    const [ llamadas ] = useState(state.linea.llamadas || 0)
    const [ mensajes ] = useState(state.linea.mensajes || 0)
    const datosEnNumero = parseFloat(datosMoviles);
    const datosEnGB = (datosEnNumero / 1000).toFixed(2);
    const [porcentajeDatos, setPorcentajeDatos] = useState(null);
    const [porcentajeLlamadas, setPorcentajeLlamadas] = useState(null);
    const [porcentajeMensajes, setPorcentajeMensajes] = useState(null);


    useEffect(() => {
        if (llamadas !== null && mensajes !== null && plans !== null && planSeleccionado) {
            const calculatedPorcentajeLlamadas = ((llamadas / planSeleccionado.llamadas)).toFixed(0);
          const calculatedPorcentajeDatos = ((datosMoviles / (planSeleccionado.datos * 1000)) * 100).toFixed(0);
          const calculatedPorcentajeMensajes = ((parseFloat(mensajes) / parseFloat(planSeleccionado.mensajes)) * 100).toFixed(0);
            setPorcentajeLlamadas(calculatedPorcentajeLlamadas);
            setPorcentajeDatos(calculatedPorcentajeDatos);
            setPorcentajeMensajes(calculatedPorcentajeMensajes);
        }
    }, [llamadas, mensajes, plans, datosMoviles, planSeleccionado]);


    useEffect(() => {
        const handleSearchPlans = async () => {
        try {
            const response = await getPlansRequest();
            const plans = response.data;
            setPlans(plans);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
        }
        };
        handleSearchPlans();
    }, []);



    useEffect(() => {
        const handleSearchUsers = async () => {
        try {
            const response = await getUsersRequest();
            const users = response.data;
            setSearchResults(users);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
        }
        };
        handleSearchUsers();
    }, []);

    useEffect(() => {
        if (state && imei === imeiConectado) {
            setImeiMatch(true);
        } else {
            setImeiMatch(false);
        }
    }, [state, imei, imeiConectado]);



    useEffect(() => {
        const handleSearchUser = async () => {
            if (cuit && cuit.length === 11) {
                try {
                    const response = await getUserRequest(cuit);
                    const user = response.data;
                    setFuncionario(user);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error en la búsqueda:', error);
                }
            } else {
                setIsLoading(false);
            }
        };
        handleSearchUser();
    }, [cuit]);





    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await updateNumberRequest(linea, {
                funcionario: cuit,
                compañia,
                cliente: state.linea.cliente,
                plan,
                modelo,
                imei,
                sim,
                observaciones,
                activo,
                userAdmin: user.username,
            });
            const newNotification = {
                text: 'Usuario actualizado exitosamente',
                backgroundColor: '#0077FF',
            };
            setNotifications([...notifications, newNotification]);
        } catch (error) {
            console.log(error);
            const newNotification = {
                text: 'Error al intentar actualizar el usuario',
                backgroundColor: '#0077FF',
            };
            setNotifications([...notifications, newNotification]);
        }
    };




return (
    <>
    <Notification notifications={notifications}/>
    {isLoading ? (
                <div className={`${styles.ldsEing}`}><div></div><div></div><div></div><div></div></div>
                ) : (
                    <div className={`${styles.box}`}>
            <form onSubmit={handleSubmit}>
        <div className={`${styles.container} container-fluid bg-dark`}>
                <div className={`${styles.boxTop} row`}>
                    <h3 className="col-auto me-lg-auto">Datos Equipo</h3>
                    <div className="col-auto">
                        <label>Activo</label>
                            <label className={`${styles.switch}`}>
                                <input
                                type="checkbox"
                                checked={activo === "SI"}
                                value={activo}
                                onChange={() => setActivo(activo === "SI" ? "NO" : "SI")}
                                ></input>
                            <span className={`${styles.slider} ${styles.round}`}></span>
                        </label>
                    </div>
                    <button
                            className={`${styles.btn} col-auto btn btn-primary`}
                            type="submit">
                            Actualizar
                    </button>
                    </div>
                <div className=" row">
                <div className="col-lg-4">
                    <label>Linea</label>
                    <input
                        style={{
                            backgroundColor:'rgba(104, 104, 104, 0.699)',
                            color:'rgb(255,255,255)'
                        }}
                        className={`${styles.input} form-control`}
                        type="text"
                        value={linea}
                        required={true}
                        onChange={(e) => setLinea(e.target.value)}
                    />
                </div>
                <div  className="col-lg-2">
                <label className=''>Compañia</label>
                <select
                style={{
                            backgroundColor:'rgba(104, 104, 104, 0.699)',
                            color:'rgb(255,255,255)',
                            marginTop:'2vh'
                        }}
                        className={`${styles.input} form-select`}
                aria-label="Default select example"
                value={compañia}
                required={true}
                onChange={(e) => setCompañia(e.target.value)}
                >
                    <option value={'MOVISTAR'}>MOVISTAR</option>
                    <option value={'CLARO'}>CLARO</option>
                    <option value={'TELECOM'}>TELECOM</option>
                </select>
                </div>
                
                <div  className="col-lg-4">
                <label className=''>Plan</label>
                <select
                style={{
                            backgroundColor:'rgba(104, 104, 104, 0.699)',
                            color:'rgb(255,255,255)'
                        }}
                        className={`${styles.select} form-select`}
                    aria-label="Default select example"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                >
                    {plans.map((planOption) => (
                        <option key={planOption.id} value={planOption.id}>
                        {`${planOption.nombre} | ${planOption.datos} GB`}
                        </option>
                    ))}
                </select>
                </div>
                <div  className="col-lg-2">
                    <label>Fecha Alta</label>
                    <input
                        style={{
                            backgroundColor:'rgba(104, 104, 104, 0.699)',
                            color:'rgb(255,255,255)'
                        }}
                        className={`${styles.input} form-control`}
                        type="text"
                        value={fechaFormateada}
                        disabled={true}
                        readOnly={true}
                    />
                </div>
                <div  className="col-lg-4">
                    <label>Modelo</label>
                    <input
                        style={{
                backgroundColor:'rgba(104, 104, 104, 0.699)',
                color:'rgb(255,255,255)'
                }}
                        className={`${styles.input} form-control`}
                        type="text"
                        value={modelo}
                        required={true}
                        onChange={(e) => setModelo(e.target.value)}
                    />
                </div>
                <div  className="col-lg-4">
                <label>IMEI</label>
                <input
                    style={{
                            backgroundColor:'rgba(104, 104, 104, 0.699)',
                            color:'rgb(255,255,255)'
                        }}
                        className={`${styles.input} ${imeiConectado ? (imeiMatch ? 'is-valid' : 'is-invalid') : ''} form-control`}
                    type="text"
                    value={imei}
                    required={true}
                    onChange={(e) => setImei(e.target.value)}
                />
                </div>
                <div  className="col-lg-4">
                <label>SIM</label>
                    <input
                    style={{
                            backgroundColor:'rgba(104, 104, 104, 0.699)',
                            color:'rgb(255,255,255)'
                        }}
                        className={`${styles.input} form-control`}
                        type="text"
                        value={sim}
                        required={true}
                        onChange={(e) => setSim(e.target.value)}
                    />
                </div>
                <div  className="col-lg-4">
                <label>MODELO CONECTADO</label>
                <input
                    style={{
                            backgroundColor:'rgba(104, 104, 104, 0.699)',
                            color:'rgb(255,255,255)'
                        }}
                        className={`${styles.input} form-control`}
                    type="text"
                    value={modeloConectado}
                    disabled={true}
                    readOnly={true}
                />
                </div>
                <div  className="col-lg-4">
                <label>IMEI CONECTADO</label>
                <input
                    style={{
                            backgroundColor:'rgba(104, 104, 104, 0.699)',
                            color:'rgb(255,255,255)'
                        }}
                        className={`${styles.input} ${imeiConectado ? (imeiMatch ? 'is-valid' : 'is-invalid') : ''} form-control`}
                    type="text"
                    value={imeiConectado}
                    disabled={true}
                    readOnly={true}
                />
                </div>
                <DivingLine/>
                <div className="col-lg-12">
                <h3 className="mt-3">Observaciones</h3>
                    <textarea
                        style={{
                                backgroundColor:'rgba(104, 104, 104, 0.699)',
                                color:'rgb(255,255,255)'
                            }}
                            id="floatingTextarea"
                        className='form-control'
                        type="text"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value.toUpperCase())}
                        />
                        </div>
                </div>
                </div>
                <div className={`${styles.container} container-fluid bg-dark`}>
                <div className="row">
                <h3 className="col-lg-12">Datos del Funcionario</h3>
                <div className="col-lg-4">
                    <label>Cuit</label>
                    <input
                    style={{
                                backgroundColor:'rgba(104, 104, 104, 0.699)',
                                color:'rgb(255,255,255)'
                            }}
                            className={`${styles.input} form-control`}
                    list="datalistOptions"
                    id="exampleDataList"
                    value={cuit ? cuit : ''}
                    autoComplete="off"
                    onChange={(e) => setCuit(e.target.value)}
                    >
                    </input>
                    <datalist id="datalistOptions">
                        {searchResults.map((funcionario)=>(
                            <option
                            key={funcionario.cuit}
                            value={funcionario.cuit}
                            >{funcionario.nombre} {funcionario.apellido}</option>
                        ))}
                    </datalist>
                    </div>
                    {funcionario.jurisdiccion && (
                        <>
                    <div  className="col-lg-4">
                    <label>Nombre</label>
                    <input
                        style={{
                            backgroundColor:'rgba(104, 104, 104, 0.699)',
                            color:'rgb(255,255,255)'
                        }}
                        className={`${styles.input} form-control`}
                        value={cuit ? funcionario.nombre : ''}
                        disabled={true}
                        readOnly={true}
                    />
                    </div>
                    <div className="col-lg-4">
                        <label>Apellido</label>
                            <input
                                style={{
                            backgroundColor:'rgba(104, 104, 104, 0.699)',
                            color:'rgb(255,255,255)'
                        }}
                        className={`${styles.input} form-control`}
                                value={cuit ? funcionario.apellido : ''}
                                disabled={true}
                                readOnly={true}
                            />
                    </div>
                    <DivingLine/>
                    <div className="col-lg-12">
                        <label>jurisdiccion</label>
                            <input
                                style={{
                            backgroundColor:'rgba(104, 104, 104, 0.699)',
                            color:'rgb(255,255,255)'
                        }}
                        className={`${styles.input} form-control`}
                                value={cuit ? funcionario.jurisdiccionData.jurisdiccion : ''}
                                disabled={true}
                                readOnly={true}
                            />
                    </div>
                    <div className="col-lg-12">
                        <label>Reparticion 1</label>
                    <input
                        style={{
                            backgroundColor:'rgba(104, 104, 104, 0.699)',
                            color:'rgb(255,255,255)'
                        }}
                        className={`${styles.input} form-control`}
                        value={funcionario.jurisdiccionData.reparticion1}
                        disabled={true}
                        readOnly={true}
                    />
                    </div>
                    <div className="col-lg-12">
                        <label>Reparticion 2</label>
                    <input
                        style={{
                            backgroundColor:'rgba(104, 104, 104, 0.699)',
                            color:'rgb(255,255,255)'
                        }}
                        className={`${styles.input} form-control`}
                        value={funcionario.jurisdiccionData.reparticion2}
                        disabled={true}
                        readOnly={true}
                    />
                    </div>
                    <div className="col-lg-12">
                        <label>Reparticion 3</label>
                    <input
                        style={{
                            backgroundColor:'rgba(104, 104, 104, 0.699)',
                            color:'rgb(255,255,255)'
                        }}
                        className={`${styles.input} form-control`}
                        value={funcionario.jurisdiccionData.reparticion3}
                        disabled={true}
                        readOnly={true}
                    />
                    </div>
                    </>
                    )}
                    </div>

        </div>
                </form>
        {activo === 'SI' && (
        <div className={`${styles.secondaryContainer} bg-dark`}>
        {plans && datosMoviles !== null && llamadas !== null && mensajes !== null && planSeleccionado && (
            <>
            <div className="">
            <h4>Consumo</h4>
                <div className={`${styles.progressBox}`}>
            <label>Mensajes | {planSeleccionado.mensajes - mensajes}</label>
                <ProgressBar
                    now={porcentajeMensajes}
                    label={`${parseFloat(porcentajeMensajes)}%`}
                    variant="info"
                    style={{ height: '30px', background:'black' }}
                />
                </div>
                <div className={`${styles.progressBox}`}>
            <label>Llamadas | {planSeleccionado.llamadas - llamadas}</label>
                <ProgressBar
                    now={porcentajeLlamadas}
                    label={`${parseFloat(porcentajeLlamadas)}%`}
                    variant="info"
                    style={{ height: '30px', background:'black' }}
                />
                </div>
                <div className={`${styles.progressBox}`}>
            <label>Datos Moviles | {(planSeleccionado.datos - datosEnGB).toFixed(2)} GB</label>
                <ProgressBar
                    now={porcentajeDatos}
                    label={`${parseFloat(porcentajeDatos)}%`}
                    variant="info"
                    style={{ height: '30px', background:'black' }}
                />
                </div>
                </div>
            </>
        )}
        </div>
        )}
        </div>
                )}
    </>
)
}

export default UpdateNumberPage