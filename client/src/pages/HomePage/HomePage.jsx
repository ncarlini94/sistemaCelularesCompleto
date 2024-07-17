    import * as echarts from 'echarts';
    import { useEffect, useState } from 'react';
    import {  getValuesForDashboard } from '../../api/query';
    import styles from './HomePage.module.css'
    import { useAuth } from '../../contexts/authContext';

    const HomePage = () => {

        const {user} = useAuth()
        const [numbers, setNumbers] = useState([])
        const [conteoPorCompañia, setConteoPorCompañia] = useState({});
        const [conteoPorJurisdiccion, setConteoPorJurisdiccion] = useState([]);
        const [conteoTotal, setConteoTotal] = useState(null)


console.log(conteoPorJurisdiccion)

useEffect(() => {
    const handleSearchNumbers = async () => {
        let totalPorCompañia = {};
        let totalPorJurisdiccion = [];
        let total = 0;

        try {
            const response = await getValuesForDashboard(user.jurisdicciones, user.rol);
            const numbersData = response.data;

            for (const compañia in numbersData) {
                totalPorCompañia[compañia] = 0;
                for (const jurisdiccion in numbersData[compañia]) {
                    const totalJurisdiccion = numbersData[compañia][jurisdiccion];
                    totalPorCompañia[compañia] += numbersData[compañia][jurisdiccion];
                    total += totalJurisdiccion;
                }
            }


            for (const compañia in numbersData) {
                for (const jurisdiccion in numbersData[compañia]) {
                    const total = numbersData[compañia][jurisdiccion].total;
                    const index = totalPorJurisdiccion.findIndex(item => item.jurisdiccion === jurisdiccion);
                    if (index !== -1) {
                        totalPorJurisdiccion[index].total += total;
                    } else {
                        totalPorJurisdiccion.push({ jurisdiccion, total });
                    }
                }
            }

            setConteoPorJurisdiccion(totalPorJurisdiccion)
            setConteoPorCompañia(totalPorCompañia)
            setConteoTotal(total)
            setNumbers(numbersData);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    handleSearchNumbers();
}, [user.jurisdicciones, user.rol]);


            useEffect(() => {
                var chartDom = document.getElementById('graphicCompañia');
                var myChart = echarts.init(chartDom);
                var option;
                option = {
                    tooltip: {
                        trigger: 'item',
                    },
                    legend: {
                        top: '5%',
                        left: 'center',
                        textStyle: {
                            color: 'rgb(255,255,255)',
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                    series: [
                        {
                            name: 'Compañías',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                borderRadius: 4.6,
                                borderWidth: 2,
                            },
                            label: {
                                show: false,
                                position: 'inside',
                                fontSize: 16,
                            },
                            emphasis: {
                                label: {
                                    show: false,
                                },
                            },
                            labelLine: {
                                show: false,
                            },
                            data: conteoPorCompañia && Object.keys(conteoPorCompañia).map((compania) => ({
                                name: compania,
                                value: conteoPorCompañia[compania],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                                    },
                                    color: getColorForCompania(compania),
                                },
                                textStyle: {
                                    color: 'rgb(255,255,255)',
                                }
                            })),
                        },
                    ],
                };

                option && myChart.setOption(option);

                return () => {
                    myChart.dispose();
                };
            }, [conteoPorCompañia]);


        function getColorForCompania(compania) {
            if (compania === 'MOVISTAR') {
                return '#0061FF';
            } else if (compania === 'CLARO') {
                return '#FF0000';
            } else if (compania === 'TELECOM') {
                return '#9300FF';
            }
            return '#FFD700';
        }


return (
    <>
        {numbers && (
            <>
                <div className={`${styles.container} bg-dark container-fluid`}>
                    <div className={`${styles.card} card`}>
                        <div className='card-body'>
                            <h5>Total Activas: {typeof conteoTotal === 'number' ? conteoTotal.toString() : ''}</h5>
                        </div>
                    </div>
                    <div className={`${styles.Box} row`}>
                        <div className={`${styles.graphicCompañiaBox} col-lg-4`}>
                            <div
                                className={`${styles.graphicCompañia}`}
                                id="graphicCompañia">
                            </div>
                        </div>
                        <div className={`${styles.jurisdiccionBox} col-8`}>
                            <div className={`${styles.jurisdiccionTable}`}>
                                <div className='row justify-content-start'>
                                        <div className='col-1'></div>
                                        <div className='col-8'>Jurisdiccion</div>
                                        <div className='col-3'>Total</div>
                                </div>
                                <div className={`${styles.jurisdiccionTbody} row justify-content-center`}>
                            {conteoPorJurisdiccion && conteoPorJurisdiccion.map((jurisdiccion, index) => (
                                <div key={index} className='row justify-content-center'>
                                <div className=' form-check form-switch col-1'>
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"></input>
                                </div>
                                    <div className={`${styles.jurisdiccion} col-9`}>{jurisdiccion.jurisdiccion}</div>
                                    <div className='col-2'>{jurisdiccion.total}</div>
                                    </div>
                            ))}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )}
    </>
);
}

    export default HomePage;
