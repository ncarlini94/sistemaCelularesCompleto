import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getUserRequest, updateUserRequest } from "../../../api/user";
import { getRepartitionRequest, getRepartitionsRequest } from "../../../api/query";
import styles from './UpdateUserPage.module.css'
import Select from "react-select";
import Notification from "../../../components/Message/Notification/Notification";
import DivingLine from "../../../components/DivingLine/DivingLine";
import { useAuth } from '../../../contexts/authContext'


const UpdateUserPage = () => {


  const { user } = useAuth()
  const { id } = useParams()
  const { state } = useLocation();
  const userData = state.user;
  const [searchResults, setSearchResults] = useState([]);
  const [ cuit, setCuit ] = useState(userData.cuit)
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [mail, setMail] = useState('')
  const [usuarioSade, setUsuarioSade] = useState('')
  const [cargo, setCargo] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [activo, setActivo] = useState('')
  const [filteredReparticiones, setFilteredReparticiones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [selectedReparticion, setSelectedReparticion] = useState(null);

  console.log(selectedReparticion)

  useEffect(() => {
    setNombre(searchResults.nombre || '');
    setApellido(searchResults.apellido || '')
    setMail(searchResults.mail || '')
    setUsuarioSade(searchResults.usuarioSade || '')
    setCargo(searchResults.cargo || '')
    setObservaciones(searchResults.observaciones || '')
    setActivo(searchResults.activo || '')
  }, [searchResults]);


  useEffect(() => {
    const handleSearchUser = async () => {
    if(cuit.length === 11){
    try {
        const response = await getUserRequest(cuit);
        const user = response.data;
            try {
                const repartitionResponse = await getRepartitionRequest(user.jurisdiccion);
                const repartitionData = repartitionResponse.data;
                user.jurisdiccion = repartitionData;
            } catch (error) {
                console.error('Error en getRepartitionRequest:', error);
            }
            setSearchResults(user);
            setSelectedReparticion({
              value: user.jurisdiccion.id,
              label: `${user.jurisdiccion.jurisdiccion}${
                user.jurisdiccion.reparticion1 ? ` | ${user.jurisdiccion.reparticion1}` : ''
              }${user.jurisdiccion.reparticion2 ? ` | ${user.jurisdiccion.reparticion2}` : ''}${
                user.jurisdiccion.reparticion3 ? ` | ${user.jurisdiccion.reparticion3}` : ''
              }`,
            });
        setIsLoading(false)
    } catch (error) {
        console.error('Error en la búsqueda:', error);
    }
}
    };
    handleSearchUser();
}, [cuit]);

useEffect(() => {
  const handleSearchRepartitions = async () => {
  try {
      const response = await getRepartitionsRequest()
      setFilteredReparticiones(response.data);
  } catch (error) {
      console.error('Error en la búsqueda:', error);
  }
  };
  handleSearchRepartitions();
}, []);


const handleSubmit = async (e) => {
  try {
      e.preventDefault();
      await updateUserRequest(id,{
          cuit,
          nombre,
          apellido,
          mail,
          usuarioSade,
          jurisdiccion: selectedReparticion.value,
          cargo,
          observaciones,
          activo,
          userAdmin: user.username,

      })
      const newNotification = {
        text: 'Usuario actualizado exitosamente',
        backgroundColor: '#0077FF',
    };
    setNotifications([...notifications, newNotification]);
  } catch (error) {
      console.log(error)
      const newNotification = {
        text: 'Error al intentar actualizar el usuario',
        backgroundColor: '#ec0000',
    };
    setNotifications([...notifications, newNotification]);
  }
}


const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(104, 104, 104, 0.699)',
    color: 'rgb(255, 255, 255)',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgb(255, 255, 255)',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
    ':hover': {
      color: 'rgb(0, 0, 0)',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'rgb(255, 255, 255)',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(104, 104, 104, 1)',
  }),
};



  return (
    <>
      <Notification notifications={notifications}/>
        {isLoading ? (
                    <p>Cargando...</p>
                ) : (
        <div className={`${styles.container} container-fluid bg-dark`}>
            <form onSubmit={handleSubmit}>
            <div className={`${styles.boxTop} row`}>
                <h3 className="col-auto me-lg-auto">Editar Usuario</h3>
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
            <div className="row">
                <div className="col-lg-4">
                <label>Cuit</label>
                <input
                    style={{
                      backgroundColor:'rgba(104, 104, 104, 0.699)',
                      color:'rgb(255,255,255)'
                  }}
                  className={`${styles.input} form-control`}
                    type="text"
                    placeholder="Cuit"
                    value={cuit}
                    required={true}
                    onChange={(e) => setCuit(e.target.value)}
                />
                </div>
                <div className="col-lg-4">
                <label>Nombre</label>
                <input
                    style={{
                      backgroundColor:'rgba(104, 104, 104, 0.699)',
                      color:'rgb(255,255,255)'
                  }}
                  className={`${styles.input} form-control`}
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
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
                    type="text"
                    placeholder="Apellido"
                    value={apellido}
                    required={true}
                    onChange={(e) => setApellido(e.target.value)}
                />
                </div>
                <div className="col-lg-6">
                <label>Mail</label>
                <input
                    style={{
                      backgroundColor:'rgba(104, 104, 104, 0.699)',
                      color:'rgb(255,255,255)'
                  }}
                  className={`${styles.input} form-control`}
                    type="text"
                    placeholder="Mail"
                    value={mail.toUpperCase()}
                    required={true}
                    onChange={(e) => setMail(e.target.value.toUpperCase())}
                />
                </div>
                <div className="col-lg-3">
                <label>Cargo</label>
                <select
                        style={{
                      backgroundColor:'rgba(104, 104, 104, 0.699)',
                      color:'rgb(255,255,255)'
                  }}
                  className={`${styles.input} ${styles.select} form-select`}
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value.toUpperCase())}
                        >
                      <option value={'EMPLEADO'}>EMPLEADO</option>
                      <option value={'DIRECTOR'}>DIRECTOR</option>
                    </select>
                    </div>
                    <div className="col-lg-3">
                <label>Usuario Sade</label>
                <input
                    style={{
                      backgroundColor:'rgba(104, 104, 104, 0.699)',
                      color:'rgb(255,255,255)'
                  }}
                    className={`${styles.input} form-control`}
                    type="text"
                    placeholder="Usuario Sade"
                    value={usuarioSade}
                    required={true}
                    onChange={(e) => setUsuarioSade(e.target.value)}
                />
                </div>
                <DivingLine/>
          <div className="col-lg-12">
              <label>Jurisdicción</label>
              {selectedReparticion && (
                <Select
                className={`${styles.select}`}
                styles={customStyles}
                options={filteredReparticiones.map((jurisdiccion) => ({
                  value: jurisdiccion.id,
                  label: `${jurisdiccion.jurisdiccion}${
                    jurisdiccion.reparticion1 ? ` | ${jurisdiccion.reparticion1}` : ''
                  }${jurisdiccion.reparticion2 ? ` | ${jurisdiccion.reparticion2}` : ''}${
                    jurisdiccion.reparticion3 ? ` | ${jurisdiccion.reparticion3}` : ''
                  }`,
                }))}
                value={selectedReparticion}
                onChange={(selectedOption) => setSelectedReparticion(selectedOption)}
                isSearchable
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
              />
              )}
        </div>
          <div className="col-lg-12">
            <DivingLine/>
          <h3 className="mt-2">Observaciones</h3>
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
                </form>
        </div>
                )}
    </>
  )
}

export default UpdateUserPage