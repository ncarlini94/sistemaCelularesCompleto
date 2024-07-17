import { useState } from "react"
import NumbersUpload from "../../components/Uploads/NumbersUpload/NumbersUpload"
import JurisdictionsUpload from "../../components/Uploads/JurisdictionsUpload/JurisdictionsUpload"
import UsersUpload from "../../components/Uploads/UsersUpload/UsersUpload"
import RepartitionsUpload from "../../components/Uploads/RepartitionsUpload/RepartitionsUpload"
import styles from './UploadFilePage.module.css'


const UploadFilePage = () => {

    const [page, setPage] = useState(0)


    const PageDispley = () => {
        switch (page) {
            case 0:
                return null
            case 1:
                return <NumbersUpload/>
            case 2:
                return <JurisdictionsUpload/>
            case 3:
                return <UsersUpload/>
            case 4:
                return <RepartitionsUpload/>
            default:
                return null
        }
    }


    return (
        <>
            <div className={`${styles.container} bg-dark container-fluid`}>
            <div className="row">
            <h3 className="col-auto me-auto" style={{color:'white'}}>Sección importación</h3>
            <div className="col-12">
            <ul className={`nav nav-tabs`}>
                <li className="nav-item">
                    <button
                        className={`nav-link bg-transparent text-light ${page === 1 ? 'active': ''}`}
                        aria-current="page"
                        onClick={() => setPage(1)}>
                            Linea
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link bg-transparent text-light ${page === 2 ? 'active': ''}`}
                        onClick={() => setPage(2)}>
                            Jurisdiccion
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link bg-transparent text-light ${page === 3 ? 'active': ''}`}
                        onClick={() => setPage(3)}>
                            Funcionario
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link bg-transparent text-light ${page === 4 ? 'active': ''}`}
                        onClick={() => setPage(4)}>
                            Repartición
                    </button>
                </li>
                </ul>
                </div>
                </div>
                <div className="pt-4">
                    {PageDispley()}
                </div>
            </div>
        </>
    )
    }

export default UploadFilePage