import { useEffect, useState } from 'react';
import { deleteAdministratorRequest, getAdministratorsRequest } from '../../api/administrator';
import  { Link } from 'react-router-dom'
import styles from './ManageAdministratorsPage.module.css';
import ReactPaginate from 'react-paginate';
import Notification from '../../components/Message/Notification/Notification';


const ManageAdministratorsPage = () => {


    const [administrators, setAdministrators] = useState([])
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [notifications, setNotifications] = useState([]);



    const formatDate = (fecha) => {
        const fechaAlta = new Date(fecha);
        const año = fechaAlta.getFullYear();
        const mes = fechaAlta.getMonth() + 1;
        const dia = fechaAlta.getDate();
        return `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${año}`;
    };

    useEffect(() => {
        getAdministratorsRequest()
        .then(response => {
            setAdministrators(response.data);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
    }, [deleteSuccess]);


    const handleDelete = async (id) => {
        try {
            await deleteAdministratorRequest(id);
            console.log(`Usuario con ID ${id} eliminado correctamente`);
            setDeleteSuccess((prevDeleteSuccess) => ({
            ...prevDeleteSuccess,
            [id]: true,
            }));
            const newNotification = {
                text: 'Administrador eliminado exitosamente',
                backgroundColor: '#0077FF',
            };
            setNotifications([...notifications, newNotification]);
        } catch (error) {
            console.error(`Error al intentar eliminar el usuario con ID ${id}:`, error);
            const newNotification = {
                text: 'Error al intentar eliminar el Administrador',
                backgroundColor: '#ec0000',
            };
            setNotifications([...notifications, newNotification]);
        }
    };

    const filteredAdministrators = administrators.filter((administrator) => {
        const values = Object.values(administrator);
        for (const value of values) {
            if (value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
        }
        }
        return false;
    });


const RESULTS_PER_PAGE = 10;
const pageCount = Math.ceil(searchTerm.length / RESULTS_PER_PAGE);
const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
const endIndex = startIndex + RESULTS_PER_PAGE;
const resultsToDisplay = filteredAdministrators.slice(startIndex, endIndex);

const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
};


return (
    <>
        <Notification notifications={notifications}/>
        <div className={`${styles.container} bg-dark container-fluid`}>
        <div className="table-responsive">
        <table className={`${styles.table} p-5 table table-dark table-striped table-hover`}>
        <thead>
            <tr className={`${styles.list} ${styles.header}`}>
                <th className="">Usuario</th>
                <th className="">Mail</th>
                <th className="">Rol</th>
                <th className="">Jurisdicciones</th>
                <th className="">Fecha Modificado</th>
                <th>
                    <div className="btn-group dropbottom">
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
                <th className=''>
                    <Link to={'/Register'}>
                        <button
                        className={`${styles.btn} btn btn-primary`}>
                        <i className="bi bi-plus-square"></i>
                        </button>
                    </Link>
                </th>
            </tr>
            </thead>
            <tbody>
                {resultsToDisplay && resultsToDisplay.map(user => (
                <tr key={user.usermame} className={`${styles.list}  ${styles.row}`}  >
                    <th className='' key={true}>{user.username}</th>
                    <th className=''>{user.email}</th>
                    <th className=''>{user.rol}</th>
                    <th className=''>
                    <div>
                    {user.jurisdicciones ? (
                JSON.parse(user.jurisdicciones).map((jurisdiccion, index) => (
                    <p key={index} className='m-0'>{jurisdiccion}</p>
                ))
            ) : ''}
            </div>
                    </th>
                    <th className=''>{user.updateDate ? formatDate(user.updateDate) : ''}</th>
                    <th className=''>
                        <Link
                        to={`/UpdateAdmin/${user.cuit}`}
                        state={{ user }}>
                        <button className={`${styles.btn} btn btn-primary`}><i className="bi bi-pencil-square"></i></button>
                        </Link>
                    </th>
                    <th className=''>
                    <button
                        className={`btn ${deleteSuccess[user.id] ? 'btn-success' : 'btn-danger'}`}
                        onClick={() => handleDelete(user.cuit)}
                        >
                        <i className="bi bi-x-square"></i>
                    </button>
                    </th>
                </tr>
                ))}
                </tbody>
                </table>
                </div>
                {resultsToDisplay > 10 &&
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

export default ManageAdministratorsPage