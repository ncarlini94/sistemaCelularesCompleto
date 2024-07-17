import PropTypes from 'prop-types';
import styles from './DevicesSelect.module.css'

const DevicesSelect = ({ firstDevice, setFirstDevice }) => {

    const handleChangeFirstDevice = (e) => {
        const { name , value} = e.target;
        setFirstDevice({ ...firstDevice, [name]: value });
      }


  return (
    <>
          <div className={`${styles.container} row`}>
            <div className=''>
              <h3 className="text-light text-center">Equipo 1</h3>
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
                  value={firstDevice.linea}
                  autoComplete="off"
                  name='linea'
                  onChange={handleChangeFirstDevice}
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
                  value={firstDevice.funcionario}
                  autoComplete="off"
                  name='funcionario'
                  onChange={handleChangeFirstDevice}
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
                  value={firstDevice.equipo}
                  autoComplete="off"
                  name='equipo'
                  onChange={handleChangeFirstDevice}
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
                  value={firstDevice.imei}
                  autoComplete="off"
                  name='imei'
                  onChange={handleChangeFirstDevice}
                />
              </div>
          </div>
    </>
  )
}

DevicesSelect.propTypes = {
    firstDevice: PropTypes.object.isRequired,
    setFirstDevice: PropTypes.func.isRequired,
    secondDevice: PropTypes.object.isRequired,
    setSecondDevice: PropTypes.func.isRequired
};

export default DevicesSelect