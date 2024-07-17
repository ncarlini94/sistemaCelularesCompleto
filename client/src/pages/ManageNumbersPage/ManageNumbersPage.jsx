import { useEffect, useState } from "react"
import { DeleteNumberRequest, getNumbersForRolRequest, getNumbersRequest, getRepartitionsRequest } from "../../api/query"
import styles from './ManageNumbersPage.module.css'
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/authContext"
import ReactPaginate from "react-paginate"
import Notification from "../../components/Message/Notification/Notification"
import ExportToExcel from "../../components/ExportExcel/ExportNumbers/ExportNumbers"
import Select from "react-select"
import stylesButtons from './../../styles/buttons.module.css'


const ManageNumbersPage = () => {

    const {user} = useAuth()
    const [numbers, setNumbers] = useState([])
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [filteredReparticiones, setFilteredReparticiones] = useState([]);

console.log(numbers)

    const [searchTermLinea, setSearchTermLinea] = useState('');
    const [searchTermFuncionario, setSearchTermFuncionario] = useState('');
    const [searchTermCargo, setSearchTermCargo] = useState('');
    const [searchTermJurisdiccion, setSearchTermJurisdiccion] = useState('');
    const [searchTermRepartition, setSearchTermRepartition] = useState('')
    const [searchTermCompañia, setSearchTermCompañia] = useState('');
    const [searchTermModelo, setSearchTermModelo] = useState('');
    const [searchTermImei, setSearchTermImei] = useState('');
    const [searchTermSim, setSearchTermSim] = useState('');
    const [searchTermActivo, setSearchTermActivo] = useState('');


    useEffect(() => {
        const handleSearchNumbers = async () => {
            if(user.rol=== 'Administrador'){
            try {
                const response = await getNumbersRequest();
                const numbersData = response.data;
                setNumbers(numbersData);
                setIsLoading(false)
            } catch (error) {
                console.error('Error al obtener las lineas:', error);
            }
        }else{
            try {
                const response = await getNumbersForRolRequest(user.jurisdicciones);
                const numbersData = response.data;
                console.log(response)
                setNumbers(numbersData);
                setIsLoading(false)
            } catch (error) {
                console.error('Error en la búsqueda:', error);
            }
        }
        }
        handleSearchNumbers();
    }, [deleteSuccess, user.jurisdicciones, user.rol]);


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





    const filteredResults = numbers.filter((result) => {

        const lineaMatch = result.linea.toLowerCase().includes(searchTermLinea.toLowerCase());

        const funcionarioMatch = (`${result.funcionarioData?.nombre} ${result.funcionarioData?.apellido}`).toLowerCase().includes(searchTermFuncionario.toLowerCase());

        const cargoMatch = searchTermCargo ? (result.funcionarioData?.cargo.toLowerCase() === searchTermCargo.toLowerCase()) : true;

        const compañiaMatch = searchTermCompañia ? (result.compañia?.toLowerCase() === searchTermCompañia.toLowerCase()) : true;

        const activoMatch = searchTermActivo ? result.activo.toLowerCase() === searchTermActivo.toLowerCase() : true;

        const jurisdiccionMatch = searchTermJurisdiccion ? (result.funcionarioData && (searchTermJurisdiccion.value === null || result.funcionarioData.jurisdiccionData.id.includes(searchTermJurisdiccion.value) ||
            result.funcionarioData.jurisdiccionData.jurisdiccion.includes(searchTermJurisdiccion.label))) : true;

        const repartitionMatch = searchTermRepartition ? (result.funcionarioData && result.funcionarioData.jurisdiccionData.id.includes(searchTermRepartition.value)) : true;

        const modeloMatch =  result.modelo.toLowerCase().includes(searchTermModelo.toLowerCase());

        const imeiMatch =  result.imei.toLowerCase().includes(searchTermImei.toLowerCase());

        const simMatch =  result.sim.toLowerCase().includes(searchTermSim.toLowerCase());

        return lineaMatch && funcionarioMatch && cargoMatch && compañiaMatch && jurisdiccionMatch && activoMatch && repartitionMatch && simMatch && imeiMatch && modeloMatch
    });


    const handleClean = async () => {
        setSearchTermLinea('')
        setSearchTermFuncionario('')
        setSearchTermCargo('')
        setSearchTermJurisdiccion('')
        setSearchTermRepartition('')
        setSearchTermModelo('')
        setSearchTermImei('')
        setSearchTermSim('')
        setSearchTermActivo('')
    }



    const handleDelete = async (id) => {
        try {
            await DeleteNumberRequest(id);
            console.log(`Linea con ID ${id} eliminada correctamente`);
            setDeleteSuccess((prevDeleteSuccess) => ({
            ...prevDeleteSuccess,
            [id]: true,
            }));
            const newNotification = {
                text: 'Número eliminado exitosamente',
                backgroundColor: '#0077FF',
            };
            setNotifications([...notifications, newNotification]);
        } catch (error) {
            console.error(`Error al intentar eliminar la Linea con ID ${id}:`, error);
            const newNotification = {
                text: 'Error al intentar eliminar el número',
                backgroundColor: '#ec0000',
            };
            setNotifications([...notifications, newNotification]);
        }
    };


const RESULTS_PER_PAGE = 10;
const pageCount = Math.ceil(filteredResults.length / RESULTS_PER_PAGE);
const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
const endIndex = startIndex + RESULTS_PER_PAGE;
const resultsToDisplay = filteredResults.slice(startIndex, endIndex);


const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
};

const renderPlaceholderRows = () => {
    const placeholderRows = [];
    for (let i = 0; i < 3; i++) {
      placeholderRows.push(
        <tr key={i} className={`${styles.list} ${styles.body} placeholder-glow`}>
          {Array.from({ length: 13 }, (_, j) => (
            <th key={j} aria-hidden="true">
              <span className="placeholder col-6"></span>
            </th>
          ))}
        </tr>
      );
    }
    return placeholderRows;
  };

  const uniqueCompañia = [...new Set(numbers.map(result => result.compañia))]
  .filter(compañia => compañia && compañia.trim() !== '');

  const uniqueCargo = [...new Set(numbers.map(result => result.funcionarioData?.cargo))]
  .filter(cargo => cargo && cargo.trim() !== '');

  const uniqueModelo = [...new Set(numbers.map(result => result.modelo))]
  .filter(modelo => modelo && modelo.trim() !== '');

  const uniqueActivo = [...new Set(numbers.map(result => result.activo))]
  .filter(activo => activo && activo.trim() !== '');

const uniqueJurisdictions = [...new Set(numbers.map(result => result.funcionarioData?.jurisdiccionData.jurisdiccion))]
  .filter(jurisdiction => jurisdiction && jurisdiction.trim() !== '');




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
        <div className={`${styles.boxInput} col-sm-2`}>
        <input
                className={`${styles.input} form-control`}
                    style={{
                        color:'rgb(255,255,255)',
                        background:'rgba(104, 104, 104, 0.699)'
                    }}
                type="text"
                id="Linea"
                placeholder="Linea"
                value={searchTermLinea}
                onChange={(e) => setSearchTermLinea(e.target.value)}
            />
        </div>

        <div className={`${styles.boxInput} col-sm-3`}>
            <input
                className={`${styles.input} form-control`}
                    style={{
                        color:'rgb(255,255,255)',
                        background:'rgba(104, 104, 104, 0.699)'
                    }}
                type="text"
                id="Funcionario"
                placeholder="Funcionario"
                value={searchTermFuncionario}
                onChange={(e) => setSearchTermFuncionario(e.target.value)}
            />
        </div>

        <div className={`${styles.boxSelect} col-sm-3`}>
        <Select
            className={`${styles.select}`}
            styles={customStyles}
            id="Cargo"
            placeholder='Cargo'
            options={[{ value: null, label: 'Seleccionar' },
            ...uniqueCargo.map((value) => ({ value, label: value }))]}
            value={uniqueCargo.find(option => option.value === searchTermCargo)}
            onChange={(selectedOption) => setSearchTermCargo(selectedOption.value)}
            />
        </div>

        <div className={`${styles.boxSelect} col-sm-2`}>
        <Select
            className={`${styles.select}`}
            styles={customStyles}
            id="Compañia"
            placeholder="Compañia"
            options={[{ value: null, label: 'Seleccionar' },
            ...uniqueCompañia.map((value) => ({ value, label: value }))]}
            value={uniqueCompañia.find(option => option.value === searchTermCompañia)}
            onChange={(selectedOption) => setSearchTermCompañia(selectedOption.value)}
            isSearchable
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            />
        </div>
        <div className={`${styles.boxSelect} col-sm-2`}>
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

        <div className={`${styles.boxInput} col-sm-3`}>
        <input
            className={`${styles.input} form-control`}
            style={{
                color: 'rgb(255,255,255)',
                background: 'rgba(104, 104, 104, 0.699)'
                }}
            type="text"
            id="Imei"
            placeholder="Imei"
            value={searchTermImei}
            onChange={(e) => setSearchTermImei(e.target.value)}
            />
        </div>

        <div className={`${styles.boxInput} col-sm-3`}>
        <input
            className={`${styles.input} form-control`}
            style={{
                color: 'rgb(255,255,255)',
                background: 'rgba(104, 104, 104, 0.699)'
                }}
            value={searchTermSim}
            id="Sim"
            placeholder="Sim"
            onChange={(e) => setSearchTermSim(e.target.value)}
            />
        </div>

        <div className={`${styles.boxSelect} col-sm-6`}>
        <Select
            styles={customStyles}
            className={`${styles.select}`}
            id="Modelo"
            placeholder="Modelo"
            options={[{ value: null, label: 'Seleccionar' },
            ...uniqueModelo.map((value) => ({ value, label: value }))]}
            value={uniqueModelo.find(option => option.value === searchTermModelo)}
            onChange={(selectedOption) => setSearchTermModelo(selectedOption.value)}
            isSearchable
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            />
        </div>

        <div className={`${styles.boxSelect} col-sm-11`}>
        <Select
            styles={customStyles}
            className={`${styles.select}`}
            placeholder='Jurisdicción'
            options={[
                { value: null, label: 'Seleccionar' },
                ...uniqueJurisdictions.map((jurisdiccion) => ({ value: jurisdiccion, label: jurisdiccion })),
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
    } else if (uniqueJurisdictions.includes(selectedOption.value)) {
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

        <div className={`col-sm-1`}>
            <button
                className={`${stylesButtons.btnTrash} btn btn-primary`}
                onClick={handleClean}
            >
            <i className="bi bi-trash3"></i>
            </button>
        </div>
            </div>
        </div>




        <div className={`${styles.container} bg-dark container-fluid`}>
        <div className="table-responsive">
        <table className={`${styles.table} table table-dark table-striped table-hover`}>
        <thead>
        <tr className={`${styles.list} ${styles.header}`}>
            <th className="">Linea</th>
            <th className="">Funcionario</th>
            <th className="">Cargo</th>
            <th className="">Jurisdiccion</th>
            <th className="" style={{minWidth:'16vh'}}>Reparticion 1</th>
            <th className="" style={{minWidth:'16vh'}}>Reparticion 2</th>
            <th className="" style={{minWidth:'16vh'}}>Reparticion 3</th>
            <th className="">Compañia</th>
            <th className="">Modelo</th>
            <th className="">Imei</th>
            <th className="">Activo</th>
            <th>
                <Link to={'/AddNumber'}>
                    <button
                        className={`${stylesButtons.btn} btn btn-primary`}>
                        <i className="bi bi-plus-square"></i>
                    </button>
                </Link>
            </th>
            <th>
            <ExportToExcel className='' data={filteredResults} fileName="Lineas" sheetName="Lineas" />
            </th>
            </tr>
        </thead>
        <tbody className="table-group-divider">
        {isLoading ? (
            renderPlaceholderRows()
        ) : (
            <>
        {resultsToDisplay.map((result, index) => (
            <tr key={index} className={`${styles.list} ${styles.body}`} >
                <th className="">{result.linea}</th>
                <th className="">
                {result.funcionarioData ? `${result.funcionarioData.nombre} ${result.funcionarioData.apellido}` : ''}
                </th>
                <th className="">
                {result.funcionarioData ? `${result.funcionarioData.cargo}` : ''}
                </th>
                <th className="">
                {result.funcionarioData && result.funcionarioData.jurisdiccionData ? result.funcionarioData.jurisdiccionData.jurisdiccion : ''}
                </th>
                <th className="">
                {result.funcionarioData && result.funcionarioData.jurisdiccionData ? result.funcionarioData.jurisdiccionData.reparticion1 : ''}
                </th>
                <th className="">
                {result.funcionarioData && result.funcionarioData.jurisdiccionData ? result.funcionarioData.jurisdiccionData.reparticion2 : ''}
                </th>
                <th className="">
                {result.funcionarioData && result.funcionarioData.jurisdiccionData ? result.funcionarioData.jurisdiccionData.reparticion3 : ''}
                </th>
                <th className="">{result.compañia}</th>
                <th className="">{result.modelo.toUpperCase()}</th>
                <th className="">{result.imei}</th>
                <th className="">{result.activo === 'SI' ? <i className={`${styles.activoIcon} bi bi-check-circle text-success`}></i> : <i className={`${styles.activoIcon} bi bi-x-circle text-danger`}></i>}</th>
                <th className=''>
                    <Link to={`/UpdateNumber/${result.linea}`}
                    state={{linea: result}}>
                        <button className={`${stylesButtons.btn} btn btn-primary`}><i className="bi bi-pencil-square"></i></button>
                    </Link>
                </th>
                <th  className=''>
                    <button
                            className={`${stylesButtons.btn} btn ${deleteSuccess[result.linea] ? 'btn-success' : 'btn-danger'}`}
                            onClick={() => handleDelete(result.linea)}
                            >
                            <i className="bi bi-x-square"></i>
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
                pageRangeDisplayed={3}
                renderOnZeroPageCount={null}
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                breakLabel={"..."}
                breakClassName={"break btn"}
        />
        </div>
        </div>
    </>
)
}

export default ManageNumbersPage