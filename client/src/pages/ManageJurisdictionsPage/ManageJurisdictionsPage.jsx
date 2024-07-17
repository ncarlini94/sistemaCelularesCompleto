import styles from './ManageJurisdictionsPage.module.css';
import  { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { DeleteJurisdictionRequest, getJurisdictionsRequest } from "../../api/query";
import ReactPaginate from 'react-paginate';
import Notification from '../../components/Message/Notification/Notification';
import stylesButtons from './../../styles/buttons.module.css'

const ManageJurisdictionsPage = () => {


    const [jurisdicciones, setJurisdicciones] = useState([])
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
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
    }, [deleteSuccess]);

    const handleDelete = async (id) => {
        try {
            await DeleteJurisdictionRequest(id);
            console.log(`Jurisdiccion con ID ${id} eliminado correctamente`);
            setDeleteSuccess((prevDeleteSuccess) => ({
            ...prevDeleteSuccess,
            [id]: true,
            }));
            const newNotification = {
                text: 'Jurisdicción eliminada exitosamente',
                backgroundColor: '#0077FF',
            };
            setNotifications([...notifications, newNotification]);
        } catch (error) {
            console.error(`Error al intentar eliminar la Jurisdiccion con ID ${id}:`, error);
            const newNotification = {
                text: 'Error al intentar eliminar la jurisdicción',
                backgroundColor: '#ec0000',
            };
            setNotifications([...notifications, newNotification]);
        }
    };

    const filteredJurisdicciones = jurisdicciones.filter((jurisdiccion) =>
  jurisdiccion.jurisdiccion.toLowerCase().includes(searchTerm.toLowerCase())
);


const RESULTS_PER_PAGE = 14;
const pageCount = Math.ceil(filteredJurisdicciones.length / RESULTS_PER_PAGE);
const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
const endIndex = startIndex + RESULTS_PER_PAGE;
const resultsToDisplay = filteredJurisdicciones.slice(startIndex, endIndex);

const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
};



    return (
        <>
        <Notification notifications={notifications}/>
        <div className={`${styles.container} bg-dark container-fluid pb-5`}>
        <div className="table-responsive">
        <table className={`${styles.table} table table-dark table-striped table-hover`}>
        <thead>
        <tr className={`${styles.list} ${styles.header}`}>
                <th className="">ID</th>
                <th className="">jurisdiccion</th>
                <th>
                    <div className={`${stylesButtons.boxSearch} btn-group dropbottom`}>
                        <button
                            type="button"
                            className={`${styles.btnSearch} btn btn-primary dropdown-toggle`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i className={`${stylesButtons.iconSearch}bi bi-search`}></i>
                        </button>
                        <div className={`${stylesButtons.boxInput} dropdown-menu bg-dark`}>
                        <input
                            className={`${stylesButtons.inputSearch} form-control`}
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
                <th className=''>
                <Link to={'/AddJurisdiction'}>
                    <button
                    className={`${stylesButtons.btn} btn btn-primary`}>
                    <i className="bi bi-plus-square"></i>
                    </button>
                </Link>
                </th>
            </tr>
            </thead>
            <tbody className={`${styles.list} table-group-divider`}>
            {resultsToDisplay && resultsToDisplay.map((jurisdiccion) => (
                <tr key={jurisdiccion.id}  className={`${styles.list}  ${styles.row}`} >
                    <th className=''>{jurisdiccion.id}</th>
                    <th className=''>{jurisdiccion.jurisdiccion}</th>
                    <th className=''>
                    <Link to={`/UpdateJurisdiction/${jurisdiccion.id}`}
                    state={{jurisdiccion: jurisdiccion}}>
                        <button className={`${stylesButtons.btn} btn btn-primary`}><i className="bi bi-pencil-square"></i></button>
                    </Link>
                </th>
                    <th className=''>
                    <button
                        className={`${stylesButtons.btn} btn ${deleteSuccess[jurisdiccion.id] ? 'btn-success' : 'btn-danger'}`}
                        onClick={() => handleDelete(jurisdiccion.id)}
                        >
                        <i className="bi bi-x-square"></i>
                    </button>
                    </th>
                </tr>
            ))}
            </tbody>
            </table>
            </div>
            {pageCount > 1 &&
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
            }
            </div>
        </>
    )
}

export default ManageJurisdictionsPage