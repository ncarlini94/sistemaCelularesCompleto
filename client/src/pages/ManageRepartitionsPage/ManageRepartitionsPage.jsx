import  { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { DeleteRepartitionRequest, getRepartitionsRequest} from "../../api/query";
import styles from './ManageRepartitionsPage.module.css';
import ReactPaginate from "react-paginate";
import Notification from '../../components/Message/Notification/Notification';
import ExportToExcel from '../../components/ExportExcel/ExportRepartitions/ExportRepartitions';
import stylesButtons from './../../styles/buttons.module.css'


const ManageRepartitionsPage = () => {

    const [repartitions, setRepartitions] = useState([])
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const handleSearchRepartitons = async () => {
        try {
            const response = await getRepartitionsRequest()
            setRepartitions(response.data);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
        }
        };
        handleSearchRepartitons();
    }, [deleteSuccess]);

    const handleDelete = async (id) => {
        try {
            await DeleteRepartitionRequest(id);
            console.log(`Jurisdiccion con ID ${id} eliminado correctamente`);
            setDeleteSuccess((prevDeleteSuccess) => ({
            ...prevDeleteSuccess,
            [id]: true,
            }));
            const newNotification = {
                text: 'Repartición eliminada exitosamente',
                backgroundColor: '#0077FF',
            };
            setNotifications([...notifications, newNotification]);
        } catch (error) {
            console.error(`Error al intentar eliminar la Reparticion con ID ${id}:`, error);
            const newNotification = {
                text: 'Error al intentar eliminar la Repartición',
                backgroundColor: '#ec0000',
            };
            setNotifications([...notifications, newNotification]);
        }
    };

    const filteredRepartitions = repartitions.filter((repartition) =>
    Object.values(repartition).some((value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
);


const RESULTS_PER_PAGE = 10;
const pageCount = Math.ceil(filteredRepartitions.length / RESULTS_PER_PAGE);
const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
const endIndex = startIndex + RESULTS_PER_PAGE;
const resultsToDisplay = filteredRepartitions.slice(startIndex, endIndex);

const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
};


    return (
        <>
        <Notification notifications={notifications}/>
        <div className={`${styles.container} bg-dark container-fluid`}>
        <div className='row align-items-center'>
        <div className=' col-8 me-auto'>
        </div>
        </div>
        <div className="table-responsive">
        <table className={`${styles.table} table table-dark table-striped table-hover`}>
        <thead>
        <tr className={`${styles.list}  ${styles.header}`}>
                <th className="">ID</th>
                <th className="">Jurisdiccion</th>
                <th className="" >Reparticion 1</th>
                <th className="">Reparticion 2</th>
                <th className="" style={{minWidth:'20vh'}}>Reparticion 3</th>
                <th>
                    <div className={`${styles.btnSearch} btn-group dropbottom`}>
                        <button
                            type="button"
                            className="btn btn-primary dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i className="bi bi-search"></i>
                        </button>
                        <div className="dropdown-menu bg-dark p-2">
                        <input
                            className={`${styles.input} form-control`}
                            style={{
                                backgroundColor:'rgba(104, 104, 104, 0.699)',
                                color:'rgb(255,255,255)'
                            }}
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        </div>
                    </div>
                </th>
                <th>
                <ExportToExcel data={resultsToDisplay} fileName="reparticiones" sheetName="Reparticiones" />
                </th>
                <th className=''>
                <Link to={'/AddRepartition'}>
                    <button
                    className={`${stylesButtons.btn} btn btn-primary`}>
                    <i className="bi bi-plus-square"></i></button>
                </Link>
                </th>
            </tr>
            </thead>
            <tbody className={`${styles.list} table-group-divider`}>
            {resultsToDisplay && resultsToDisplay.map((repartition) => (
                <tr key={repartition.id} className={`${styles.list} ${styles.row}`} >
                    <th className=''>{repartition.id}</th>
                    <th className=''>{repartition.jurisdiccion}</th>
                    <th className=''>{repartition.reparticion1}</th>
                    <th className=''>{repartition.reparticion2}</th>
                    <th className=''>{repartition.reparticion3}</th>
                    <th className='' colSpan={3}>
                        <button
                            className={`${stylesButtons.btn} btn ${deleteSuccess[repartition.id] ? 'btn-success' : 'btn-danger'}`}
                            onClick={() => handleDelete(repartition.id)}
                            >
                            <i className="bi bi-x-square"></i>
                        </button>
                    </th>
                </tr>
            ))}
            </tbody>
            </table>
            </div>
            <div className="pagination-container">
                {pageCount > 1 && (
                    <ReactPaginate
                        className={`${styles.pagination}`}
                        pageLinkClassName={`${styles.link}`}
                        previousClassName={`${styles.pages} btn`}
                        nextClassName={`${styles.pages} btn`}
                        activeClassName={`active ${styles.pages} btn`}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={4}
                        previousLabel={"Anterior"}
                        nextLabel={"Siguiente"}
                        breakLabel={"..."}
                        renderOnZeroPageCount={null}
                        breakClassName={"break btn"}
                    />
)}
        </div>
            </div>
        </>
    )
}

export default ManageRepartitionsPage