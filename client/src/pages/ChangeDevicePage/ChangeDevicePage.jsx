 import { useEffect, useState } from "react"
import { changeDeviceRequest, getNumberRequest } from "../../api/query"
import styles from './ChangeDevicePage.module.css'
import Notification from "../../components/Message/Notification/Notification"
import { useAuth } from "../../contexts/authContext"
import DevicesSelect from "../../components/StepsChangeDevices/Steps/DevicesSelect/DevicesSelect"
import ResultChangeDevices from "../../components/StepsChangeDevices/Steps/ResultChangedevices/ResultChangeDevices"
import { ConfigProvider, Steps } from 'antd';
import SecondDeviceSelect from "../../components/StepsChangeDevices/Steps/SecondDeviceSelect/SecondDeviceSelect"


const ChangeDevicePage = () => {

  const { user } = useAuth()
  const [notifications, setNotifications] = useState([]);
  const [page , setPage] = useState (0)
  const [success, setSuccess] = useState(false)

  const [firstDevice, setFirstDevice] = useState({
    linea:'',
    funcionario:'',
    equipo:'',
    imei:'',
})

const [secondDevice, setSecondDevice] = useState({
    linea:'',
    funcionario:'',
    equipo:'',
    imei:'',
})

const steps = [
  {
    title: 'Equipo 1',
    content: <DevicesSelect firstDevice={firstDevice} setFirstDevice={setFirstDevice} secondDevice={secondDevice} setSecondDevice={setSecondDevice}/>,
  },
  {
    title: 'Equipo 2',
    content: <SecondDeviceSelect firstDevice={firstDevice} setFirstDevice={setFirstDevice} secondDevice={secondDevice} setSecondDevice={setSecondDevice}/>,
  },
  {
    title: 'Resultado',
    content: <ResultChangeDevices firstDevice={firstDevice} secondDevice={secondDevice}/>,
  },
];

const items = steps.map((item) => ({
  key: item.title,
  title: item.title,
}));


  useEffect(() => {
    if (firstDevice && firstDevice.linea && firstDevice.linea.length === 10) {
        const fetchFirstDevice = async () => {
            try {
                const responseFirstDevice = await getNumberRequest(firstDevice.linea);
                setFirstDevice((prevFirstDevice) => ({
                  ...prevFirstDevice,
                  funcionario: `${responseFirstDevice.data.funcionarioData.nombre} ${responseFirstDevice.data.funcionarioData.apellido}`,
                  equipo: responseFirstDevice.data.modelo,
                  imei: responseFirstDevice.data.imei
              }))
            } catch (error) {
                console.error('Error al obtener el historial de números', error);
            }
        };
        fetchFirstDevice();
    }
}, [firstDevice.linea]);



useEffect(() => {
  if (secondDevice && secondDevice.linea && secondDevice.linea.length === 10) {
      const fetchSecondDevice = async () => {
          try {
              const responseSecondDevice = await getNumberRequest(secondDevice.linea);
              setSecondDevice(prevSecondDevice => ({
                ...prevSecondDevice,
                funcionario: `${responseSecondDevice.data.funcionarioData.nombre} ${responseSecondDevice.data.funcionarioData.apellido}`,
                equipo: responseSecondDevice.data.modelo,
                imei: responseSecondDevice.data.imei
            }));
          } catch (error) {
              console.error('Error al obtener el historial de números', error);
          }
      };
      fetchSecondDevice();
  }
}, [secondDevice.linea]);



  const handleSubmit = async (e) => {
    if(firstDevice.linea !== secondDevice.linea){
      if(firstDevice.funcionario && secondDevice.funcionario){
        try {
          e.preventDefault();
          await changeDeviceRequest(firstDevice.linea,{
            number2: secondDevice.linea,
            devicePrimary: firstDevice.equipo,
            imeiPrimary: firstDevice.imei,
            deviceSecondary: secondDevice.equipo,
            imeiSecondary: secondDevice.imei,
            userAdmin: user.username,
          })
          const newNotification = {
            text: 'Equipo actualizado exitosamente',
            backgroundColor: '#0077FF',
          };
          setNotifications([...notifications, newNotification]);
          setSuccess(true)
        } catch (error) {
          console.log(error)
          const newNotification = {
            text: 'Error al intentar actualizar el usuario',
            backgroundColor: '#ec0000',
        };
        setNotifications([...notifications, newNotification]);
        }
      }else{
        const newNotification = {
          text: 'Debes seleccionar ambas lineas',
          backgroundColor: '#ec0000',
        };
        setNotifications([...notifications, newNotification]);
      }
    }else{
      const newNotification = {
        text: 'Ambas lineas son iguales',
        backgroundColor: '#ec0000',
      };
      setNotifications([...notifications, newNotification]);
    }
}


  return (
    <>
          <Notification notifications={notifications}/>
                    <div className={`${styles.container} container-fluid bg-dark rounded`}>
                      <form className="" onSubmit={handleSubmit}>
                      <div className="row pb-3">
                      <div className="col-auto me-auto">
                      <h4 className="text-light">Cambio de Equipo</h4>
                      </div>
                      <div className="col-auto">
                      {page > 0 && (
                        <>
                        <button
                          type="button"
                          className="btn btn-primary me-lg-2"
                          onClick={() => setPage(page-1)}>
                          Volver
                        </button>
                        </>
                      )}
                      {page < 2 && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => setPage(page+1)}>
                          Siguiente
                        </button>
                      )}
                      {page === 2 && (
                        <>
                        <button
                          type="button"
                          className={`${success ? 'btn-success' : 'btn-primary'} btn`}
                          onClick={handleSubmit}
                          disabled={success ? true: false}
                          >
                          Cambiar
                        </button>
                        </>
                      )}
                        </div>
                      </div>
                      <div className={`${styles.containerCenter}`}>

                      <ConfigProvider
                          theme={{
                            components:{
                              Steps:{
                                colorText:'white',
                                colorTextDescription:'white',
                                colorFillContent:'rgba(200, 200, 255, 0.3)',
                                colorFillSecondary:'black',
                              }
                            }
                      }}>
                      <div className={`${styles.stepsBox}`}>
                    <Steps className={`${styles.steps}`} current={page} items={items} />
                    </div>
                  </ConfigProvider>
                  {steps[page].content}

                        </div>

                      </form>
                    </div>
                    </>
  )

}

export default ChangeDevicePage