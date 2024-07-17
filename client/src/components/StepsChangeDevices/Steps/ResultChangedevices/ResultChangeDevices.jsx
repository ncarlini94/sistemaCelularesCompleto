import PropTypes from 'prop-types';
import Arrow from '../../../../assets/circulo.png'
import styles from './ResultChangeDevices.module.css'

const ResultChangeDevices = ({ firstDevice, secondDevice }) => {


  return (
      <>
        <div className={``}>
          <div className={``}>
            <div className={`${styles.container} bg-dark text-light`}>
              <div className="">
                <h2 className=" text-center" id="staticBackdropLabel">Resultado final</h2>
              </div>
                <div className="row">
                  <div className="col-lg-5">
                    <div>
                      <div className='input-group'>
                      <span className={`${styles.span} input-group-text bg-secondary text-light`}
                        id="addon-wrapping" >Linea</span>
                      <input
                        className={`${styles.input} form-control bg-transparent text-light`}
                        aria-describedby={'addon-wrapping'}
                        value={firstDevice.linea}
                          disabled={true}
                        />
                      </div>

                      <div className='input-group'>
                      <span
                        className={`${styles.span} input-group-text bg-secondary text-light`}
                        id="addon-wrapping" >Funcionario</span>
                      <input
                      style={{fontSize:'2vh'}}
                        className={`${styles.input} form-control bg-transparent text-light`}
                        aria-describedby={'addon-wrapping'}
                        value={firstDevice.funcionario}
                          disabled={true}
                        />
                      </div>

                      <div className='input-group'>
                      <span
                        className={`${styles.span} input-group-text bg-secondary text-light`}
                        id="addon-wrapping" >Equipo</span>
                      <input
                        className={`${styles.input} form-control bg-transparent text-light`}
                        aria-describedby={'addon-wrapping'}
                        value={secondDevice.equipo}
                          disabled={true}
                        />
                      </div>

                      <div className='input-group'>
                      <span
                        className={`${styles.span} input-group-text bg-secondary text-light`}
                        id="addon-wrapping" >Imei</span>
                      <input
                        className={`${styles.input} form-control bg-transparent text-light`}
                        aria-describedby={'addon-wrapping'}
                        value={secondDevice.imei}
                          disabled={true}
                        />
                      </div>

                    </div>
                  </div>

                  <div className="col-lg-2 d-grid justify-content-center align-items-center mb-lg-4">
                    <img className={`${styles.arrowIcon}`} src={Arrow}></img>
                  </div>

                  <div className="col-lg-5">
                    <div className='input-group'>
                      <span
                        className={`${styles.span} input-group-text bg-secondary text-light`}
                        id="addon-wrapping" >Linea</span>
                      <input
                        className={`${styles.input} form-control bg-transparent text-light`}
                        aria-describedby={'addon-wrapping'}
                        value={secondDevice.linea}
                          disabled={true}
                        />
                      </div>
                      
                      <div className='input-group'>
                      <span
                        className={`${styles.span} input-group-text bg-secondary text-light`}
                        id="addon-wrapping" >Funcionario</span>
                      <input
                        className={`${styles.input} form-control bg-transparent text-light`}
                        aria-describedby={'addon-wrapping'}
                        value={secondDevice.funcionario}
                          disabled={true}
                        />
                      </div>

                      <div className='input-group'>
                      <span
                        className={`${styles.span} input-group-text bg-secondary text-light`}
                        id="addon-wrapping" >Equipo</span>
                      <input
                        className={`${styles.input} form-control bg-transparent text-light`}
                        aria-describedby={'addon-wrapping'}
                        value={firstDevice.equipo}
                          disabled={true}
                        />
                      </div>

                      <div className='input-group'>
                      <span
                        className={`${styles.span} input-group-text bg-secondary text-light`}
                        id="addon-wrapping" >Imei</span>
                      <input
                        className={`${styles.input} form-control bg-transparent text-light`}
                        aria-describedby={'addon-wrapping'}
                        value={firstDevice.imei}
                          disabled={true}
                        />
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </>
  )
}

ResultChangeDevices.propTypes = {
    firstDevice: PropTypes.object.isRequired,
    setFirstDevice: PropTypes.func.isRequired,
    secondDevice: PropTypes.object.isRequired,
    setSecondDevice: PropTypes.func.isRequired
};



export default ResultChangeDevices