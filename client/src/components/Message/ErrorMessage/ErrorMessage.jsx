import PropTypes from "prop-types";
import styles from './ErrorMessage.module.css'

const ErrorMessage = ({ message, success }) => {

console.log(message, success)


  return (
    <>
    {message && (
        <>
            <div className={`${styles.box} overflow-auto`}>
            {message.map((msj) => (
                <div className={`${styles.boxText} ${success ? "alert alert-success" : "alert alert-danger"}`}
                role="alert"
                key={msj}>
                <h4
                    className={`${styles.text}`}
                    style={{color:'black'}}>{msj}</h4>
                </div>
            ))}
          </div>
        </>
      )}
      </>
  );
};

ErrorMessage.propTypes = {
    message: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        success: PropTypes.string.isRequired,
      })
    ).isRequired,
    success: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
        })
      ).isRequired,
  };

export default ErrorMessage;
