const excel = require('exceljs');
const Users = require('../models/Users.model');
const Repartitions = require('../models/Repartitions.model');

const importUsers = async (fileBuffer) => {
    try {
        const workbook = new excel.Workbook();
        await workbook.xlsx.load(fileBuffer);
        const worksheet = workbook.getWorksheet('users');
        const errors = []

        if (!worksheet) {
            throw new Error('No se encontró la hoja de trabajo "Users" en el archivo Excel.');
        }

        const rows = worksheet.getSheetValues();

        for (let row = 2; row <= rows.length; row++) {
            const rowData = rows[row];
            console.log(`Procesando fila ${row}`);
            try {
                if (rowData && rowData.length > 0) {
                    const [
                        _,
                        cuit,
                        nombre,
                        apellido,
                        mail,
                        usuarioSade,
                        jurisdiccion,
                        cargo,
                        observaciones,
                        activo,
                    ] = rows[row];

            const reparticionRecord = await Repartitions.findOne({where: { id : jurisdiccion }});

            console.log(jurisdiccion)
                    if (reparticionRecord) {
                        const idReparticion = reparticionRecord.id;

                        let existingRecord = await Users.findOne({ where: { cuit: cuit } });


                        if (!existingRecord) {
                            await Users.create({
                                cuit: cuit,
                                nombre: nombre,
                                apellido: apellido,
                                mail: mail,
                                usuarioSade: usuarioSade,
                                jurisdiccion: idReparticion,
                                cargo: cargo,
                                observaciones: observaciones,
                                activo: activo,
                            });
                        } else {
                            await Users.update({
                                cuit: cuit,
                                nombre: nombre,
                                apellido: apellido,
                                mail: mail,
                                usuarioSade: usuarioSade,
                                jurisdiccion: idReparticion,
                                cargo: cargo,
                                observaciones: observaciones,
                                activo: activo,
                            }, {
                                where: { cuit: cuit }
                            });
                            console.log(`Registro actualizado para CUIT: ${cuit}`);

                        }
                        console.log('Datos importados correctamente');
                    } else {
                        errors.push(`Fila ${row}_ "No se encontro la Repartición"
                                    - Usuario: ${nombre} ${apellido}
                                    - Cuit: ${cuit}`);
                    }

                }
            } catch (error) {
                console.error(`Error en la fila ${row}:`, error);
                throw error
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
    importUsers
};


