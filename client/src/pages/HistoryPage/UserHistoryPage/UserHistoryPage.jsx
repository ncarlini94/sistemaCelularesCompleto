import { useEffect, useState } from 'react';
import styles from './UserHistoryPage.module.css'
import { getUserHistoryRequest, getUserRequest } from '../../../api/user'


const UserHistoryPage = () => {


    const [searchTerm, setSearchTerm] = useState('');
    const [userHistory, setUserHistory] = useState([]);
    const [searchResult, setSearchResult] = useState([])


const formatDate = (fecha) => {
    const fechaAlta = new Date(fecha);
    const año = fechaAlta.getFullYear();
    const mes = fechaAlta.getMonth() + 1;
    const dia = fechaAlta.getDate();
    return `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${año}`;
};


useEffect(() => {
    if (searchTerm.length === 11) {
        const fetchUserHistory = async () => {
            try {
                const response = await getUserHistoryRequest(searchTerm);
                const responseUser = await getUserRequest(searchTerm);
                setUserHistory(response.data);
                setSearchResult(responseUser.data)
            } catch (error) {
                console.error('Error al obtener el historial del usuario', error);
            }
        };
        fetchUserHistory();
    }
}, [searchTerm]);



return (
    <div>
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
            <th>Cuit</th>
            <th colSpan={2}>Fecha</th>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Jurisdiccion</th>
            <th>Reparticion 1</th>
            <th>Reparticion 2</th>
            <th>Reparticion 3</th>
            <th>Cargo</th>
            <th>Activo</th>
            </tr>
        </thead>
        <tbody className="table-group-divider">
            <tr className={`${styles.list} ${styles.body} table-active`}>
                <th>{searchResult?.cuit}</th>
                <th colSpan={2} className={`${styles.dateCell} text-info`}>{searchResult?.updateDate ? (formatDate(searchResult.updateDate)) : ''}</th>
                <th className={`${styles.dateCell} text-info`}>-</th>
                <th>{searchResult?.nombre}</th>
                <th>{searchResult?.apellido}</th>
                <th>{searchResult.jurisdiccionData?.jurisdiccion}</th>
                <th style={{minWidth:'32vh'}}>{searchResult.jurisdiccionData?.reparticion1}</th>
                <th style={{minWidth:'20vh'}}>{searchResult.jurisdiccionData?.reparticion2}</th>
                <th style={{minWidth:'20vh'}}>{searchResult.jurisdiccionData?.reparticion3}</th>
                <th>{searchResult?.cargo}</th>
                <th>{searchResult?.activo}</th>
            </tr>
            </tbody>
        <tbody className="table-group-divider">
            {userHistory.slice().reverse().map((result, index) => (
                <>
                <tr key={index} className={`${styles.list} ${styles.body}`}>
                <th>{result.cuit}</th>
                <th colSpan={2} className={`${styles.dateCell} text-info`}>{formatDate(result.updateDate)}</th>
                <th className={`${styles.dateCell} text-info`}>{result.userAdmin}</th>
                <th>{result.nombre}</th>
                <th>{result.apellido}</th>
                <th>{result.jurisdiccion}</th>
                <th>{result.reparticion1}</th>
                <th>{result.reparticion2}</th>
                <th>{result.reparticion3}</th>
                <th>{result.cargo}</th>
                <th>{result.activo}</th>
                </tr>
                </>
            ))}
        </tbody>
        </table>
        </div>

    </div>
    </div>
);
}

export default UserHistoryPage;
