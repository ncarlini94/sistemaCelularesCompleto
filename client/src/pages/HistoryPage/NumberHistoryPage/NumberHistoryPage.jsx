import { useEffect, useState } from 'react';
import { getNumberHistoryRequest, getNumberRequest } from '../../../api/query';
import styles from './NumberHistoryPage.module.css'


const NumberHistoryPage = () => {


    const [searchTerm, setSearchTerm] = useState('');
    const [numberHistory, setNumberHistory] = useState([]);
    const [searchResult, setSearchResult] = useState([])


const formatDate = (fecha) => {
    const fechaAlta = new Date(fecha);
    const año = fechaAlta.getFullYear();
    const mes = fechaAlta.getMonth() + 1;
    const dia = fechaAlta.getDate();
    return `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${año}`;
};



useEffect(() => {
    if (searchTerm.length === 10) {
        const fetchNumberHistory = async () => {
            try {
                const responseHistory = await getNumberHistoryRequest(searchTerm);
                const responseUser = await getNumberRequest(searchTerm);
                setNumberHistory(responseHistory.data);
                setSearchResult(responseUser.data)
            } catch (error) {
                console.error('Error al obtener el historial de números', error);
            }
        };
        fetchNumberHistory();
    }
}, [searchTerm]);



return (
    <>
    <div className={`${styles.container} bg-dark container-fluid`}>
    <input
        className={`${styles.input} form-control`}
            style={{
                color:'rgb(255,255,255)',
                background:'rgba(104, 104, 104, 0.699)'
            }}
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="table-responsive">
        <table className={`${styles.table} p-5 table table-dark table-striped table-hover`}>
        <thead>
        <tr className={`${styles.list} ${styles.header}`}>
            <th>Linea</th>
            <th colSpan={2}>Fecha</th>
            <th>Usuario</th>
            <th>Cuit</th>
            <th>Funcionario</th>
            <th>Compañia</th>
            <th>Plan</th>
            <th>Modelo</th>
            <th>Imei</th>
            <th>Sim</th>
            <th>Cliente</th>
            <th>Activo</th>
            </tr>
        </thead>
            <tbody className="table-group-divider">
            <tr className={`${styles.list} ${styles.body} table-active`}>
                <th>{searchResult.linea}</th>
                <th colSpan={2} className={`${styles.dateCell} text-info`}>{searchResult.updateDate ? (formatDate(searchResult.updateDate)) : ''}</th>
                <th className={`${styles.dateCell} text-info`}>-</th>
                <th>{searchResult.funcionarioData?.cuit}</th>
                <th>{searchResult.funcionarioData?.nombre}{' '}{searchResult.funcionarioData?.apellido}</th>
                <th>{searchResult?.compañia}</th>
                <th>{searchResult.planData?.nombre}</th>
                <th>{searchResult?.modelo}</th>
                <th>{searchResult?.imei}</th>
                <th>{searchResult?.sim}</th>
                <th>{searchResult?.cliente}</th>
                <th>{searchResult?.activo}</th>
            </tr>
            </tbody>
        <tbody className="table-group-divider">
            {numberHistory.slice().reverse().map((result, index) => (
                <>
                <tr key={index} className={`${styles.list} ${styles.body}`}>
                <th>{result.linea}</th>
                <th colSpan={2} className={`${styles.dateCell} text-info`}>{formatDate(result.updateDate)}</th>
                <th className={`${styles.dateCell} text-info`}>{result.userAdmin}</th>
                <th>{result.cuit}</th>
                <th>{result.funcionario}</th>
                <th>{result.compañia}</th>
                <th>{result.plan}</th>
                <th>{result.modelo}</th>
                <th>{result.imei}</th>
                <th>{result.sim}</th>
                <th>{result.cliente}</th>
                <th>{result.activo}</th>
                </tr>
                </>
            ))}
        </tbody>
        </table>
        </div>

    </div>
    </>
);
}

export default NumberHistoryPage;
