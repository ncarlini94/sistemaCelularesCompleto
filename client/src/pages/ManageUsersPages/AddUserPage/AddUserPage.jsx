import { useEffect, useState } from "react"
import { createUserRequest } from "../../../api/user"
import { getRepartitionsRequest } from "../../../api/query"
import styles from './AddUserPage.module.css'
import Notification from "../../../components/Message/Notification/Notification"
import Select from "react-select";
import DivingLine from '../../../components/DivingLine/DivingLine'


const AddUserPage = () => {


    const [cuit, setCuit] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [mail, setMail] = useState('')
    const [usuarioSade, setUsuarioSade] = useState('')
    const [cargo, setCargo] = useState('')
    const [observaciones, setObservaciones] = useState('')
    const [activo, setActivo] = useState('')
    const [filteredReparticiones, setFilteredReparticiones] = useState([]);
    const [selectedReparticion, setSelectedReparticion] = useState(null);
    const [notifications, setNotifications] = useState([]);

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
        e.preventDefault();
        try {
            const userData = {
                cuit: cuit,
                nombre: nombre,
                apellido: apellido,
                mail: mail,
                usuarioSade: usuarioSade,
                jurisdiccion: selectedReparticion.value,
                cargo: cargo,
                observaciones: observaciones,
                activo: activo
            }
            const response = await createUserRequest(userData)
            if (response.status === 200) {
              const newNotification = {
                text: 'Usuario agregado exitosamente',
                backgroundColor: '#0077FF',
            };
            setNotifications([...notifications, newNotification]);
                setCuit('')
                setNombre('')
                setApellido('')
                setMail('')
                setUsuarioSade('')
                setSelectedReparticion(null)
                setCargo('')
                setObservaciones('')
                setActivo('')
            } else {
              const newNotification = {
                text: 'Error al intentar agregar el usuario',
                backgroundColor: '#ec0000',
            };
            setNotifications([...notifications, newNotification]);
            }
        } catch (error) {
            console.log(error)
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
      <div className={`${styles.container} container-fluid bg-dark`}>
      <form className="" onSubmit={handleSubmit}>
      <div className={`${styles.topBox} row`}>
        <h3 className="col-auto me-lg-auto">Crear Usuario</h3>
              <div className={`${styles.activeBox} col-auto p-0`}>
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
      <div className={`${styles.box} row`}>
      <div  className="col-lg-4">
      <label>Cuit</label>
      <input
          style={{
                backgroundColor:'rgba(104, 104, 104, 0.699)',
                color:'rgb(255,255,255)'
              }}
        className={`${styles.input} form-control`}
        type="text"
        maxLength={'11'}
        minLength={'11'}
        value={cuit}
        required={true}
        onChange={(e) => setCuit(e.target.value.toUpperCase())}
      />
      </div>
      <div  className="col-lg-4">
      <label>Nombre</label>
      <input
          style={{
                backgroundColor:'rgba(104, 104, 104, 0.699)',
                color:'rgb(255,255,255)'
              }}
        className={`${styles.input} form-control`}
        type="text"
        value={nombre}
        required={true}
        onChange={(e) => setNombre(e.target.value.toUpperCase())}
      />
      </div>
      <div  className="col-lg-4">
      <label>Apellido</label>
      <input
        style={{
                backgroundColor:'rgba(104, 104, 104, 0.699)',
                color:'rgb(255,255,255)'
              }}
        className={`${styles.input} form-control`}
        type="text"
        value={apellido}
        required={true}
        onChange={(e) => setApellido(e.target.value.toUpperCase())}
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
        value={mail}
        required={true}
        onChange={(e) => setMail(e.target.value.toUpperCase())}
      />
      </div>
      <div  className="col-lg-3">
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
      <div  className="col-lg-3">
      <label>Usuario Sade</label>
      <input
        style={{
                backgroundColor:'rgba(104, 104, 104, 0.699)',
                color:'rgb(255,255,255)'
              }}
        className={`${styles.input} form-control`}
        type="text"
        value={usuarioSade}
        required={true}
        onChange={(e) => setUsuarioSade(e.target.value.toUpperCase())}
      />
      </div>
        <DivingLine/>
          <div className="col-lg-12 py-1">
            <label>Jurisdicción</label>
              <Select
                  styles={customStyles}
                  className={`${styles.select}`}
                  placeholder='Seleccionar'
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
        </div>
        <div className="col-12 pt-1">
            <DivingLine/>
          <h3 className="mt-1">Observaciones</h3>
    <textarea
        style={{
                backgroundColor:'rgba(104, 104, 104, 0.699)',
                color:'rgb(255,255,255)'
              }}
        className={`${styles.input} form-control`}
        id="floatingTextarea"
        type="text"
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value.toUpperCase())}
      />
      </div>
      </div>
      </form>
      </div>
    </>
  )
}

export default AddUserPage