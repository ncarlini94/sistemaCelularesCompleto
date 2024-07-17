import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from './ManageUsersPage.module.css';
import { useAuth } from "../../contexts/authContext";
import { deleteUserRequest, getUsersForRolRequest, getUsersRequest } from "../../api/user";
import  { Link } from 'react-router-dom'
import Notification from '../../components/Message/Notification/Notification';
import ExportToExcel from "../../components/ExportExcel/ExportUsers/ExportUsers";
import { getRepartitionsRequest } from "../../api/query";
import Select from "react-select";
import stylesButtons from './../../styles/buttons.module.css'


const ManageUsersPage = () => {

    const {user} = useAuth()
    const [searchResults, setSearchResults] = useState([]);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [filteredReparticiones, setFilteredReparticiones] = useState([]);


    const [searchTermCuit, setSearchTermCuit] = useState('');
    const [searchTermFuncionario, setSearchTermFuncionario] = useState('');
    const [searchTermCargo, setSearchTermCargo] = useState('');
    const [searchTermJurisdiccion, setSearchTermJurisdiccion] = useState('');
    const [searchTermRepartition, setSearchTermRepartition] = useState('')
    const [searchTermActivo, setSearchTermActivo] = useState('');


useEffect(() => {
    const handleSearch = async () => {
        if(user.rol=== 'Administrador'){
            try {
                const response = await getUsersRequest();
                const users = response.data;
                setSearchResults(users);
                setIsLoading(false)
            } catch (error) {
                console.error('Error en la búsqueda:', error);
            }
        }else{
            try {
                const response = await getUsersForRolRequest(user.jurisdicciones);
                const users = response.data;
                setSearchResults(users);
                setIsLoading(false)
            } catch (error) {
                console.error('Error en la búsqueda:', error);
            }
        }
    };
    handleSearch();
 }, [deleteSuccess]);

 useEffect(() => {
    const handleSearchRepartitions = async () => {
    try {
        const response = await getRepartitionsRequest()
        setFilteredReparticiones(response.data);
    } catch (error) {
        console.error('Error en la búsqueda:', error);
    }
    };
    handleSearchRepartitions();
}, []);

 const formatDate = (fecha) => {
    const fechaAlta = new Date(fecha);
    const año = fechaAlta.getFullYear();
    const mes = fechaAlta.getMonth() + 1;
    const dia = fechaAlta.getDate();
    return `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${año}`;
};


const filteredResults = searchResults.filter((result) => {

    const cuitMatch = result.cuit.toLowerCase().includes(searchTermCuit.toLowerCase());

    const funcionarioMatch = (`${result.nombre} ${result.apellido}`).toLowerCase().includes(searchTermFuncionario.toLowerCase());

    const cargoMatch = searchTermCargo ? (result.cargo.toLowerCase() === searchTermCargo.toLowerCase()) : true;

    const jurisdiccionMatch = searchTermJurisdiccion
    ? (result.jurisdiccionData &&
        (searchTermJurisdiccion.value === null || result.jurisdiccionData.id.includes(searchTermJurisdiccion.value) ||
        result.jurisdiccionData.jurisdiccion.includes(searchTermJurisdiccion.label)))
    : true;

    const repartitionMatch = searchTermRepartition
        ? (result.jurisdiccionData && result.jurisdiccionData.id.includes(searchTermRepartition.value))
        : true;

    const activoMatch = searchTermActivo ? result.activo.toLowerCase() === searchTermActivo.toLowerCase() : true;



    return cuitMatch && funcionarioMatch && cargoMatch && jurisdiccionMatch && activoMatch && repartitionMatch
});




const RESULTS_PER_PAGE = 10;
const pageCount = Math.ceil(filteredResults.length / RESULTS_PER_PAGE);
const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
const endIndex = startIndex + RESULTS_PER_PAGE;
const resultsToDisplay = filteredResults.slice(startIndex, endIndex);


const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
};

const handleClean = async () => {
    setSearchTermCuit('')
    setSearchTermFuncionario('')
    setSearchTermCargo('')
    setSearchTermJurisdiccion('')
    setSearchTermRepartition('')
    setSearchTermActivo('')
}


const handleDelete = async (id) => {
    try {
        await deleteUserRequest(id);
        console.log(`Usuario con ID ${id} eliminado correctamente`);
        setDeleteSuccess((prevDeleteSuccess) => ({
        ...prevDeleteSuccess,
        [id]: true,
        }));
        const newNotification = {
            text: 'Usuario eliminado exitosamente',
            backgroundColor: '#0077FF',
        };
        setNotifications([...notifications, newNotification]);
    } catch (error) {
        console.error(`Error al intentar eliminar el usuario con ID ${id}:`, error);
        const newNotification = {
            text: 'Error al intentar eliminar el usuario',
            backgroundColor: '#ec0000',
        };
        setNotifications([...notifications, newNotification]);
    }
};


const renderPlaceholderRows = () => {
    const placeholderRows = [];
    for (let i = 0; i < 3; i++) {
      placeholderRows.push(
        <tr key={i} className={`${styles.list} ${styles.body} placeholder-glow`}>
          {Array.from({ length: 12 }, (_, j) => (
            <th key={j} aria-hidden="true">
              <span className="placeholder col-6"></span>
            </th>
          ))}
        </tr>
      );
    }
    return placeholderRows;
  };

    const uniqueCargos = [...new Set(searchResults.map(result => result.cargo))]
        .filter(cargo => cargo && cargo.trim() !== '');

    const uniqueActivo = [...new Set(searchResults.map(result => result.activo))]
        .filter(activo => activo && activo.trim() !== '');

    const uniqueJurisdiccion = [...new Set(searchResults.map(result => result.jurisdiccionData.jurisdiccion))]
        .filter(jurisdiccion => jurisdiccion && jurisdiccion.trim() !== '');




    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(104, 104, 104, 0.699)',
            color: 'rgb(255, 255, 255)',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'rgb(255, 255, 255)',
        }),
        option: (provided, state) => ({
            ...provided,
            color: 'rgb(255, 255, 255)',
            backgroundColor: state.isFocused ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
            '&:hover': {
                color: state.isFocused ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
                backgroundColor: state.isFocused ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'rgb(255, 255, 255)',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(104, 104, 104, 1)',
        }),
        input: (provided) => ({
            ...provided,
            color: 'rgb(255, 255, 255)',
        }),
    };



return (
    <>
    <Notification notifications={notifications}/>
    <div className={`${styles.containerOptions} bg-dark container-fluid`}>
        <div className={`${styles.boxForm} row`}>
        <div className={`${styles.boxInput} col-lg-3`}>
        <input
                className={`${styles.input} form-control`}
                    style={{
                        color:'rgb(255,255,255)',
                        background:'rgba(104, 104, 104, 0.699)'
                    }}
                type="text"
                id="Cuit"
                placeholder="Cuit"
                value={searchTermCuit}
                onChange={(e) => setSearchTermCuit(e.target.value)}
            />
        </div>
            <div className={`${styles.boxInput} col-lg-4`}>
        <input
            className={`${styles.input} form-control`}
                style={{
                    color:'rgb(255,255,255)',
                    background:'rgba(104, 104, 104, 0.699)'
                }}
            type="text"
            id="Funcionario"
            placeholder="Funcionario"
            value={searchTermFuncionario.toUpperCase()}
            onChange={(e) => setSearchTermFuncionario(e.target.value)}
        />
        </div>

        <div className={`${styles.boxSelect} col-lg-3`}>
        <Select
            className={`${styles.select}`}
            styles={customStyles}
            id="Cargo"
            placeholder='Cargo'
            options={[{ value: null, label: 'Seleccionar' },
            ...uniqueCargos.map((value) => ({ value, label: value }))]}
            value={uniqueCargos.find(option => option.value === searchTermCargo)}
            onChange={(selectedOption) => setSearchTermCargo(selectedOption.value)}
            />
        </div>
        <div className={`${styles.boxSelect} col-lg-2`}>
        <Select
            className={`${styles.select}`}
            styles={customStyles}
            id="Activo"
            placeholder='Activo'
            options={[{ value: null, label: 'Seleccionar' },
            ...uniqueActivo.map((value) => ({ value, label: value }))]}
            value={uniqueActivo.find(option => option.value === searchTermActivo)}
            onChange={(selectedOption) => setSearchTermActivo(selectedOption.value)}
            isSearchable
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
        />
        </div>

        <div className={`${styles.boxSelect} col-lg-11`}>
        <Select
            styles={customStyles}
            className={`${styles.select}`}
            placeholder='Jurisdicción'
            options={[
                { value: null, label: 'Seleccionar' },
                ...uniqueJurisdiccion.map((jurisdiccion) => ({ value: jurisdiccion, label: jurisdiccion })),
                ...filteredReparticiones.map((jurisdiccion) => ({
                    value: jurisdiccion.id,
                    label: `${jurisdiccion.jurisdiccion}${
                        jurisdiccion.reparticion1 ? ` | ${jurisdiccion.reparticion1}` : ''
                    }${jurisdiccion.reparticion2 ? ` | ${jurisdiccion.reparticion2}` : ''}${
                        jurisdiccion.reparticion3 ? ` | ${jurisdiccion.reparticion3}` : ''
                    }`,
                }))
            ]}
            value={searchTermRepartition || searchTermJurisdiccion}
            onChange={(selectedOption) => {
                if (selectedOption && selectedOption.value === null) {
                    setSearchTermJurisdiccion(null);
                    setSearchTermRepartition(null);
                } else if (uniqueJurisdiccion.includes(selectedOption.value)) {
                    setSearchTermJurisdiccion({ value: selectedOption.value, label: selectedOption.label });
                    setSearchTermRepartition(null);
                } else {
                    setSearchTermRepartition({ value: selectedOption.value, label: selectedOption.label });
                    setSearchTermJurisdiccion(null);
                }
                }}
            isSearchable
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
        />
        </div>
        <div className={`${styles.boxButtonTrash} col-lg-auto`}>
            <button
                className={`${stylesButtons.btnTrash} btn btn-primary`}
                onClick={handleClean}
            >
            <i className={`bi bi-trash3`}/>
            </button>
        </div>
            </div>
        </div>




    <div className={`${styles.container} bg-dark container-fluid`}>
        <div className="table-responsive">
        <table className={`${styles.table} table table-dark table-striped table-hover`}>
        <thead>
        <tr className={`${styles.list} ${styles.header}`}>
            <th className="">Cuit</th>
            <th className="" colSpan="1">Funcionario</th>
            <th className="">Cargo</th>
            <th className="">Jurisdiccion</th>
            <th className="" style={{minWidth:'16vh'}}>Reparticion 1</th>
            <th className="" style={{minWidth:'16vh'}}>Reparticion 2</th>
            <th className="" style={{minWidth:'16vh'}}>Reparticion 3</th>
            <th className="">Activo</th>
            <th className="">Modificación</th>
            <th className="">
                <Link to={'/AddUser'}>
                    <button
                        className={`${stylesButtons.btn} btn btn-primary`}>
                        <i className={`${styles.icon} bi bi-plus-square`}></i>
                    </button>
                </Link>
            </th>
            <th>
            <ExportToExcel data={filteredResults} fileName="Funcionarios" sheetName="Funcionarios" />
            </th>
                </tr>
        </thead>
        <tbody className={`table-group-divider`}>
        {isLoading ? (
            renderPlaceholderRows()
        ) : (
            <>
        {resultsToDisplay.map((result, index) => (
            <tr key={index} className={`${styles.list} ${styles.body}`}>
                <th className="">{result.cuit}</th>
                <th className="">{result.nombre} {result.apellido}</th>
                <th className="">{result.cargo}</th>
                <th className="">{result.jurisdiccionData ? result.jurisdiccionData.jurisdiccion : ''}</th>
                <th className="">{result.jurisdiccionData ? result.jurisdiccionData.reparticion1 : ''}</th>
                <th className="">{result.jurisdiccionData ? result.jurisdiccionData.reparticion2 : ''}</th>
                <th className="">{result.jurisdiccionData ? result.jurisdiccionData.reparticion3 : ''}</th>
                <th className="">{result.activo === 'SI' ? <i className={`${styles.activoIcon} bi bi-check-circle text-success`}></i> : <i className={`${styles.activoIcon} bi bi-x-circle text-danger`}></i>}</th>
                <th className="">{result.updateDate ? formatDate(user.updateDate) : ''}</th>
                <th className=''>
                    <Link className='' to={`/UpdateUser/${result.cuit}`}
                    state={{user: result}}>
                        <button className={`${stylesButtons.btn} btn btn-primary`}>
                            <i className={`${styles.icon} bi bi-pencil-square`}></i>
                        </button>
                    </Link>
                </th>
                <th className='' >
                    <button
                            className={`${stylesButtons.btn} btn ${deleteSuccess[result.linea] ? 'btn-success' : 'btn-danger'}`}
                            onClick={() => handleDelete(result.cuit)}
                            >
                            <i className={`${styles.icon} bi bi-x-square`}></i>
                    </button>
                </th>
            </tr>
        ))}
        </>
        )}
        </tbody>
        </table>
        </div>
        <div className="pagination-container">
            <ReactPaginate
                className={`${styles.pagination}`}
                pageLinkClassName={`${styles.link}`}
                previousClassName={`${styles.pages} btn`}
                nextClassName={`${styles.pages} btn`}
                activeClassName={`active ${styles.pages} btn`}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                renderOnZeroPageCount={null}
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                breakLabel={"..."}
                breakClassName={"break btn"}
        />
            </div>
        </div>
    </>
);
};

export default ManageUsersPage;
