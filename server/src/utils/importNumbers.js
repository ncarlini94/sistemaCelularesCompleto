const excel = require('exceljs');
const Numbers = require('../models/Numbers.model');
const Users = require('../models/Users.model');
const Plans = require('../models/Plans.model');


const numbersImporter = async (fileBuffer, compañia) => {


    try {
        const workbook = new excel.Workbook();
        await workbook.xlsx.load(fileBuffer);
        const worksheet = workbook.getWorksheet('numbers');
        const errors = []

        if (!worksheet) {
            throw new Error('No se encontró la hoja de trabajo "numbers" en el archivo Excel.');
        }

        const rows = worksheet.getSheetValues();


        for (let row = 2; row <= rows.length; row++) {
            const rowData = rows[row];
            console.log(`Procesando fila ${row}`);



            try {
                if (rowData && rowData.length > 0) {
                    const [
                        _,
                        Linea,
                        Funcionario,
                        Cliente,
                        FormaContratacion,
                        Plan,
                        Modelo,
                        Imei,
                        ModeloConectado,
                        ImeiConectado,
                        Sim,
                        Llamadas,
                        Mensajes,
                        Datos,
                        Observaciones,
                        Activo,
                    ] = rows[row];

                    const existingRecord = await Numbers.findOne({ where: { linea: Linea } });

                    const existingFuncionario = await Users.findOne({ where: { cuit: Funcionario } });

                    const existingPlan = await Plans.findOne({ where: { id: Plan } });


                    if(!existingFuncionario){
                        errors.push(`Fila ${row} "El funcionario no existe" - Linea: ${Linea}`);
                    }

                    if(!existingPlan){
                        errors.push(`Fila ${row} "El plan no existe" - Linea: ${Linea}`);
                    }


                    if(existingFuncionario && existingPlan) {

                    if (!existingRecord) {
                        await Numbers.create({
                            linea: Linea,
                            funcionario: Funcionario !== undefined ? Funcionario : "",
                            compañia: compañia,
                            cliente: Cliente || "",
                            formaContratacion: FormaContratacion || "",
                            plan: Plan || "",
                            modelo: Modelo || "",
                            imei: Imei || "",
                            modeloConectado: ModeloConectado || '',
                            imeiConectado: ImeiConectado || '',
                            sim: Sim || "",
                            llamadas: parseInt(Llamadas) || 0,
                            mensajes: parseInt(Mensajes) || 0,
                            datos: Datos ? parseFloat(Datos.toString().replace(',', '.')) : 0,
                            observaciones: Observaciones ? Observaciones : '',
                            activo: Activo,
                            });
                            console.log('Datos creados correctamente');
                    } else {


                        if (existingRecord.linea !== Linea) {
                            existingRecord.linea = Linea;
                        }

                        if (existingRecord.funcionario !== Funcionario) {
                            existingRecord.funcionario = Funcionario;
                        }

                        if (existingRecord.compañia !== compañia) {
                            existingRecord.compañia = compañia;
                        }

                        if (existingRecord.cliente !== Cliente) {
                            existingRecord.cliente = Cliente;
                        }

                        if (existingRecord.formaContratacion !== FormaContratacion) {
                            existingRecord.formaContratacion = FormaContratacion;
                        }

                        if (existingRecord.plan !== Plan) {
                            existingRecord.plan = Plan;
                        }

                        if (existingRecord.modelo !== Modelo) {
                            existingRecord.modelo = Modelo;
                        }

                        if (existingRecord.imei !== Imei) {
                            existingRecord.imei = Imei;
                        }

                        if (existingRecord.modeloConectado  !== ModeloConectado) {
                            existingRecord.imeiConectado = ModeloConectado
                        }

                        if (existingRecord.imeiConectado  !== ImeiConectado) {
                            existingRecord.imeiConectado = ImeiConectado
                        }

                        if (existingRecord.sim !== Sim) {
                            existingRecord.sim = Sim;
                        }

                        if (existingRecord.llamadas !== Llamadas) {
                            existingRecord.llamadas = Llamadas ? Llamadas : 0;
                        }

                        if (existingRecord.mensajes !== Mensajes) {
                            existingRecord.mensajes = Mensajes ? Mensajes : 0;
                        }

                        if (existingRecord.datos !== parseFloat(Datos)) {
                            existingRecord.datos = Datos ? parseFloat(Datos) : 0;
                        }

                        if (existingRecord.observaciones !== Observaciones) {
                            existingRecord.observaciones = Observaciones;
                        }

                        if (existingRecord.activo !== Activo) {
                            existingRecord.activo = Activo;
                        }
                        await existingRecord.save();

                        console.log('Datos actualizados correctamente');
                    }

                }
                
            }

            } catch (error) {
                console.error(`Fila ${row}:`, error);
            }
        }

        if (errors.length > 0) {
            throw new Error(errors);
        }


    } catch (error) {
        console.error('Error al importar datos:', error);
        throw error;
    }
};

module.exports = {
    numbersImporter
};
