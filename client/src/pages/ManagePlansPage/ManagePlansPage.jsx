import { useEffect, useState } from "react";
import { DeletePlanRequest, getPlansRequest } from "../../api/query";
import ReactPaginate from "react-paginate";
import styles from './ManagePlansPage.module.css'
import Notification from "../../components/Message/Notification/Notification";
import { Link } from "react-router-dom";


const ManagePlansPage = () => {

    const  [plans, setPlans] = useState([])
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        getPlansRequest()
        .then(response => {
            setPlans(response.data);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
    }, [deleteSuccess]);

    const handleDelete = async (id) => {
        try {
            await DeletePlanRequest(id);
            console.log(`Plan con ID ${id} eliminado correctamente`);
            setDeleteSuccess((prevDeleteSuccess) => ({
            ...prevDeleteSuccess,
            [id]: true,
            }));
            const newNotification = {
                text: 'Plan eliminado exitosamente',
                backgroundColor: '#0077FF',
            };
            setNotifications([...notifications, newNotification]);
        } catch (error) {
            console.error(`Error al intentar eliminar el plan con ID ${id}:`, error);
            const newNotification = {
                text: 'Error al intentar eliminar el plan',
                backgroundColor: '#ec0000',
            };
            setNotifications([...notifications, newNotification]);
        }
    };


const filteredPlans = plans.filter((plan) =>{
    const values = Object.values(plan)
    for(const value of values){
        if( value && value.toString().toLowerCase().includes(searchTerm.toLocaleLowerCase())){
            return true
        }
    }
    return false
});

console.log(filteredPlans)


const RESULTS_PER_PAGE = 10;
const pageCount = Math.ceil(searchTerm.length / RESULTS_PER_PAGE);
const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
const endIndex = startIndex + RESULTS_PER_PAGE;
const resultsToDisplay = filteredPlans.slice(startIndex, endIndex);

const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
};



return (
    <>
        <Notification notifications={notifications}/>
        <div className={`${styles.container} bg-dark container-fluid pb-5`}>
        <div className="table-responsive">
        <table className={`${styles.table} p-5 table table-dark table-striped table-hover`}>
        <thead>
            <tr className={`${styles.list} ${styles.header}`}>
                <th className="">ID</th>
                <th className="">Mombre</th>
                <th className="">Llamadas</th>
                <th className="">Mensajes</th>
                <th className="">Datos</th>
                <th>
                    <div className="btn-group dropbottom">
                        <button
                            type="button"
                            className={`${styles.btnSearch} btn btn-primary dropdown-toggle`}
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
                    <Link to={'/AddPlan'}>
                        <button
                        className={`${styles.btn} btn btn-primary`}>
                        <i className="bi bi-plus-square"></i>
                        </button>
                    </Link>
                </th>
            </tr>
            </thead>
            <tbody className={`${styles.list} table-group-divider`}>
            {resultsToDisplay && resultsToDisplay.map(plan => (
                <tr key={plan.id} className={`${styles.list} ${styles.row}`}  >
                    <th className=''>{plan.id}</th>
                    <th className=''>{plan.nombre}</th>
                    <th className=''>{plan.llamadas} Minutos</th>
                    <th className=''>{plan.mensajes} Mensajes</th>
                    <th className=''>{plan.datos} GB</th>
                    <th className=''>
                        <Link
                        to={`/UpdatePlan/${plan.id}`}
                        state={{ plan }}>
                        <button className={`${styles.btn} btn btn-primary`}><i className="bi bi-pencil-square"></i></button>
                        </Link>
                    </th>
                    <th className=''>
                    <button
                        className={`${styles.btn} btn ${deleteSuccess[plan.id] ? 'btn-success' : 'btn-danger'}`}
                        onClick={() => handleDelete(plan.id)}
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

export default ManagePlansPage