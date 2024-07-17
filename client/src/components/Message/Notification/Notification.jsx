import PropTypes from "prop-types";
import styles from './Notification.module.css'

const Notification = ({ notifications }) => {


  return (
    <div aria-live="polite" aria-atomic="true" className={`position-relative`}>
    <div
    style={{
      margin:'0 1px 8px 0'
    }}
    className="toast-container position-fixed bottom-0 end-0 pe-2">
      {notifications.map((notification, index) => (
        <div
          key={index}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{
            margin:'2px'
          }}
          className={`${styles.toastBox} toast bg-secondary show`}
        >
          <div className="toast-header bg-secondary">
            <div
              className={`rounded me-2`}
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: notification.backgroundColor,
              }}
            ></div>
            <strong
              className="me-auto"
              style={{
                color: "rgb(255,255,255, 0.8)",
              }}
            >
              Notificación
            </strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div
            className="toast-body"
            style={{
              color: "rgb(255,255,255, 0.8)",
            }}
          >
            {notification.text}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

Notification.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Notification;
