import PropTypes from 'prop-types';
import styles from './SecondDeviceSelect.module.css'

const SecondDeviceSelect = ({ firstDevice, secondDevice, setSecondDevice }) => {


    const handleChangeSecondDevice = (e) => {
        const { name , value} = e.target;
        setSecondDevice({ ...firstDevice, [name]: value });
      }



  return (
    <>
        <div className={`${styles.container} row`}>
          <div>
            <h3 className="text-light text-center">Equipo 2</h3>
          </div>
          <div className="input-group">
              <span className={`${styles.span} input-group-text bg-secondary text-light`}
                id="addon-wrapping">Linea
              </span>
              <input
                className={`${styles.input} form-control bg-transparent text-light`}
                list="datalistOptions"
                id="exampleDataList"
                placeholder="Linea"
                value={secondDevice.linea}
                autoComplete="off"
                name='linea'
                onChange={handleChangeSecondDevice}
                />
          </div>
          <div className="input-group">
              <span className={`${styles.span} input-group-text bg-secondary text-light`}
                id="addon-wrapping">Funcionario
              </span>
              <input
                className={`${styles.input} form-control bg-transparent text-light`}
                list="datalistOptions"
                id="exampleDataList"
                placeholder="Funcionario"
                value={secondDevice.funcionario}
                autoComplete="off"
                name='funcionario'
                onChange={handleChangeSecondDevice}
                />
          </div>
          <div className="input-group">
              <span className={`${styles.span} input-group-text bg-secondary text-light`}
                id="addon-wrapping">Equipo
              </span>
              <input
                className={`${styles.input} form-control bg-transparent text-light`}
                list="datalistOptions"
                id="exampleDataList"
                placeholder="Equipo"
                value={secondDevice.equipo}
                autoComplete="off"
                name='equipo'
                onChange={handleChangeSecondDevice}
                />
          </div>
          <div className="input-group">
              <span className={`${styles.span} input-group-text bg-secondary text-light`}
                id="addon-wrapping">Imei
              </span>
              <input
                className={`${styles.input} form-control bg-transparent text-light`}
                list="datalistOptions"
                id="exampleDataList"
                placeholder="Imei"
                value={secondDevice.imei}
                autoComplete="off"
                name='imei'
                onChange={handleChangeSecondDevice}
                />
          </div>
        </div>
    </>
  )
}

SecondDeviceSelect.propTypes = {
    firstDevice: PropTypes.object.isRequired,
    setFirstDevice: PropTypes.func.isRequired,
    secondDevice: PropTypes.object.isRequired,
    setSecondDevice: PropTypes.func.isRequired
};

export default SecondDeviceSelect