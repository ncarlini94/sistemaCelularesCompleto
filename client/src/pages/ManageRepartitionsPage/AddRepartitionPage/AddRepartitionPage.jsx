import { useEffect, useState } from "react";
import { addRepartitionRequest, getJurisdictionsRequest, getRepartitionsRequest } from "../../../api/query";
import  styles  from './AddRepartitionPage.module.css';
import Notification from "../../../components/Message/Notification/Notification";


const AddJurisdictionPage = () => {

  const [jurisdicciones, setJurisdicciones] = useState([])
  const [reparticiones, setReparticiones] = useState([])
  const [idJurisdiccion, setIdJurisdiccion] = useState('');
  const [jurisdiccion, setJurisdiccion] = useState('');
  const [idReparticion1, setIdReparticion1] = useState('');
  const [reparticion1, setReparticion1] = useState('');
  const [idReparticion2, setIdReparticion2] = useState('');
  const [reparticion2, setReparticion2] = useState('');
  const [idReparticion3, setIdReparticion3] = useState('');
  const [reparticion3, setReparticion3] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleSearchJurisdictions = async () => {
    try {
        const response = await getJurisdictionsRequest()
        setJurisdicciones(response.data);
    } catch (error) {
        console.error('Error en la búsqueda:', error);
    }
    };
    handleSearchJurisdictions();
}, []);

useEffect(() => {
  const handleSearchRepartitions = async () => {
  try {
      const response = await getRepartitionsRequest()
      setReparticiones(response.data);
  } catch (error) {
      console.error('Error en la búsqueda:', error);
  }
  };
  handleSearchRepartitions();
}, []);



const handleIdReparticion1Change = async (e) => {
  const newIdReparticion1 = e.target.value.toUpperCase();
  setIdReparticion1(newIdReparticion1);
  console.log(newIdReparticion1)
  const matchingReparticion = reparticiones.find(reparticion => reparticion.idReparticion1 === newIdReparticion1);
  if (matchingReparticion) {
    setReparticion1(matchingReparticion.reparticion1);
  } else {
    setReparticion1('');
  }
};

const handleIdReparticion2Change = async (e) => {
  const newIdReparticion2 = e.target.value.toUpperCase();
  setIdReparticion2(newIdReparticion2);
  const matchingReparticion = reparticiones.find(reparticion => reparticion.idReparticion2 === newIdReparticion2);
  if (matchingReparticion) {
    setReparticion2(matchingReparticion.reparticion2);
  } else {
    setReparticion2('');
  }
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const repartitionData = {
        idJurisdiccion: idJurisdiccion,
        jurisdiccion: jurisdiccion,
        idReparticion1: idReparticion1,
        reparticion1: reparticion1,
        idReparticion2: idReparticion2,
        reparticion2: reparticion2,
        idReparticion3: idReparticion3,
        reparticion3: reparticion3,
      };
      const response = await addRepartitionRequest(repartitionData);
      if (response.status === 200) {
        const newNotification = {
          text: 'Reparticion agregada exitosamente',
          backgroundColor: '#0077FF',
      };
      setNotifications([...notifications, newNotification]);
        setIdJurisdiccion('');
        setJurisdiccion('');
        setIdReparticion1('');
        setReparticion1('');
        setIdReparticion2('');
        setReparticion2('');
        setIdReparticion3('');
        setReparticion3('');
      } else {
        const newNotification = {
          text: 'Error al agregar la Repartición',
          backgroundColor: '#ec0000',
      };
      setNotifications([...notifications, newNotification]);
      }
    } catch (error) {
      const newNotification = {
        text: 'Error al agregar la Repartición',
        backgroundColor: '#ec0000',
    };
    setNotifications([...notifications, newNotification]);
    }
  };

  return (
    <>
    <Notification notifications={notifications}/>
      <div className={`${styles.container} container-fluid bg-dark`}>
      <form className="" onSubmit={handleSubmit}>
      <div className="row">
      <h3 className="col-auto me-auto">Crear Reparticion</h3>
      <button className={`${styles.btn} btn btn-primary col-auto`} type="submit">Register</button>
      </div>
      <div className={`${styles.box} row`}>
      <div  className={`${styles.boxSelect} col-lg-12`}>
      <label>Jurisdiccion</label>
      <select
        className={`${styles.select} form-select`}
        style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
        aria-label="Default select example"
        value={idJurisdiccion}
        onChange={(e) => {
          setIdJurisdiccion(e.target.value);
          setJurisdiccion(e.target.options[e.target.selectedIndex].text);
        }}
      >
      {jurisdicciones.map((jurisdiccion) => (
        <option key={jurisdiccion.id} value={jurisdiccion.id}>
          {jurisdiccion.jurisdiccion}
        </option>
        ))}
    </select>
    </div>
    <div className={`${styles.boxInput} col-lg-3`}>
      <label>ID Reparticion 1</label>
      <input
        style={{
                      backgroundColor:'rgba(104, 104, 104, 0.699)',
                      color:'rgb(255,255,255)'
                    }}
        className={`${styles.input} form-control`}
        type="text"
        value={idReparticion1}
        required={true}
        onChange={handleIdReparticion1Change}
      />
      </div>
      <div className={`${styles.boxInput} col-lg-9`}>
      <label>Reparticion 1</label>
      <input
        style={{
                      backgroundColor:'rgba(104, 104, 104, 0.699)',
                      color:'rgb(255,255,255)'
                    }}
                    className={`${styles.input} form-control`}
        type="text"
        value={reparticion1}
        onChange={(e) => setReparticion1(e.target.value.toUpperCase())}
      />
      </div>
      <div className={`${styles.boxInput} col-lg-3`}>
      <label>ID Reparticion 2</label>
      <input
        style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
                    className={`${styles.input} form-control`}
        type="text"
        value={idReparticion2}
        onChange={handleIdReparticion2Change}
      />
      </div>
      <div className={`${styles.boxInput} col-lg-9`}>
      <label>Reparticion 2</label>
      <input
        style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
        className={`${styles.input} form-control`}
        type="text"
        value={reparticion2}
        onChange={(e) => setReparticion2(e.target.value.toUpperCase())}
      />
      </div>
      <div className={`${styles.boxInput} col-lg-3`}>
      <label>ID Reparticion 3</label>
      <input
        style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
        className={`${styles.input} form-control`}
        type="text"
        value={idReparticion3}
        onChange={(e) => setIdReparticion3(e.target.value.toUpperCase())}
      />
      </div>
      <div className={`${styles.boxInput} col-lg-9`}>
      <label>Reparticion 3</label>
      <input
        style={{
                        backgroundColor:'rgba(104, 104, 104, 0.699)',
                        color:'rgb(255,255,255)'
                    }}
        className={`${styles.input} form-control`}
        type="text"
        value={reparticion3}
        onChange={(e) => setReparticion3(e.target.value.toUpperCase())}
      /></div>
      </div>
      </form>
      </div>
    </>
  )
}

export default AddJurisdictionPage