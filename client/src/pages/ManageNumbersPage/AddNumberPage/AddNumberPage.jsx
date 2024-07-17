import { useEffect, useState } from 'react'
import styles from './AddNumberPage.module.css'
import { getUserRequest, getUsersRequest } from '../../../api/user'
import { addNumberRequest, getPlansRequest } from '../../../api/query'
import Notification from '../../../components/Message/Notification/Notification'
import DivingLine from '../../../components/DivingLine/DivingLine'

const AddNumberPage = () => {

    const [searchResults, setSearchResults] = useState([])
    const [linea, setLinea] = useState('')
    const [cuit, setCuit] = useState('')
    const [funcionario, setFuncionario] = useState(null)
    const [compañia, setCompañia] = useState('')
    const [cliente, setCliente] = useState('')
    const [plan, setPlan] = useState('')
    const [plans , setPlans] = useState([])
    const [modelo, setModelo] = useState('')
    const [imei, setImei] = useState('')
    const [sim, setSim] = useState('')
    const [activo, setActivo] = useState('')
    const [notifications, setNotifications] = useState([]);



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
        const handleSearch = async () => {
        try {
            const response = await getUsersRequest();
            const users = response.data;
            setSearchResults(users);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
        }
        };
        handleSearch()
    }, []);



    useEffect(()=>{
        if(cuit.length === 11){
            const handleSearchUser = async () => {
            if(cuit.length === 11){
            try {
                const response = await getUserRequest(cuit);
                const user = response.data;
                setFuncionario(user);
            } catch (error) {
                console.error('Error en la búsqueda:', error);
            }
        }
            };
            handleSearchUser()
        }
    },[cuit])



    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await addNumberRequest({
                linea,
                funcionario: cuit,
                compañia,
                cliente,
                plan,
                formaContratacion: '',
                modelo,
                imei,
                sim,
                activo
            })
            const newNotification = {
                text: 'Número agregado exitosamente',
                backgroundColor: '#0077FF',
            };
            setNotifications([...notifications, newNotification]);
        } catch (error) {
            console.log(error)
            const newNotification = {
                text: 'Error al intentar agregar el número',
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
            <div className={`${styles.boxTop} row`}>
                <h3 className="col-auto me-lg-auto">Añadir equipo</h3>
              <div className={`${styles.activeBox} col-auto`}>
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
                            Añadir
                    </button>
            </div>
                <div className="row pt-4">
                <div className="col-lg-4">
                <label>Linea</label>
                <input
                    className={`${styles.input} form-control`}
                    style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                    type="text"
                    value={linea}
                    required={true}
                    onChange={(e) => setLinea(e.target.value)}
                />
                </div>
                <div  className={`${styles.boxSelect} col-lg-4`}>
                    <label className=''>Compañia</label>
                <select
                style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                    className={`${styles.select} form-select`}
                aria-label="Default select example"
                required={true}
                onChange={(e) => setCompañia(e.target.value)}
                >
                    <option selected>Compañia</option>
                    <option value={'MOVISTAR'}>Movistar</option>
                    <option value={'CLARO'}>Claro</option>
                    <option value={'TELECOM'}>Telecom</option>
                </select>
                </div>
                <div  className="col-lg-4">
                <label>Cliente</label>
                    <input
                    className={`${styles.input} form-control`}
                    style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                    type="text"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                />
                </div>
                <div  className="col-lg-4">
                <label>SIM</label>
                <input
                    className={`${styles.input} form-control`}
                    style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                    type="text"
                    value={sim}
                    required={true}
                    onChange={(e) => setSim(e.target.value)}
                />
                </div>
                <div  className="col-lg-4">
                <label>Modelo</label>
                <input
                    className={`${styles.input} form-control`}
                    style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                    type="text"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                />
                </div>
                <div  className="col-lg-4">
                <label>IMEI</label>
                <input
                    className={`${styles.input} form-control`}
                    style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                    type="text"
                    value={imei}
                    onChange={(e) => setImei(e.target.value)}
                />
                </div>
                <div  className={`${styles.boxSelect} col-lg-5 pb-3`}>
                <label className=''>Plan</label>
                <select
                    className={`${styles.select} form-select`}
                    style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                    aria-label="Default select example"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                >
                <option selected>Selecciona el plan</option>
                    {plans.map((planOption) => (
                        <option key={planOption.id} value={planOption.id}>
                        {`${planOption.nombre} | ${planOption.datos} GB`}
                        </option>
                    ))}
                </select>
                </div>
                </div>
                <DivingLine/>
                <div className={`${styles.boxFuncionario} row`}>
                <h3 className='col-lg-12 py-3'>Funcionario</h3>
                <div  className="col-lg-4">
                <label>Cuit</label>
                <input
                className={`${styles.input} form-control`}
                style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                list="datalistOptions"
                id="exampleDataList"
                value={cuit}
                autoComplete="off"
                onChange={(e) => {
                    setCuit(e.target.value);
                    }}
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
                    {funcionario && (
                        <>
                        <div  className="col-lg-4">
                            <label>Nombre</label>
                                <input
                                className={`${styles.input} form-control`}
                                style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                                value={funcionario.nombre}
                                disabled={true}
                                readOnly={true}
                            />
                    </div>
                    <div  className="col-lg-4">
                            <label>Apellido</label>
                    <input
                        className={`${styles.input} form-control`}
                        style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                        value={funcionario.apellido}
                        disabled={true}
                        readOnly={true}
                    />
                    </div>
                    <div  className="col-lg-6">
                        <label>Jurisdiccion</label>
                    <input
                        className={`${styles.input} form-control`}
                        style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                        value={funcionario.jurisdiccionData ? funcionario.jurisdiccionData.jurisdiccion : ''}
                        disabled={true}
                        readOnly={true}
                    />
                    </div>
                    <div  className="col-lg-6">
                    <label>Reparticion 1</label>
                    <input
                        className={`${styles.input} form-control`}
                        style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                        value={funcionario.jurisdiccionData ? funcionario.jurisdiccionData.reparticion1 : ''}
                        disabled={true}
                        readOnly={true}
                    />
                    </div>
                    <div  className="col-lg-6">
                            <label>Reparticion 2</label>
                    <input
                        className={`${styles.input} form-control`}
                        style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                        value={ funcionario.jurisdiccionData ?funcionario.jurisdiccionData.reparticion2 : ''}
                        disabled={true}
                        readOnly={true}
                    />
                    </div>
                    <div  className="col-lg-6">
                            <label>Reparticion 3</label>
                    <input
                        className={`${styles.input} form-control`}
                        style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                        value={funcionario.jurisdiccionData ? funcionario.jurisdiccionData.reparticion3 : ''}
                        disabled={true}
                        readOnly={true}
                    />
                    </div>
                    </>
                    )}
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default AddNumberPage