const excel = require('exceljs');
const Repartitions = require('../models/Repartitions.model');
const Jurisdictions = require('../models/Jurisdictions.model');

const importRepartitions = async (fileBuffer) => {
    try {
        const workbook = new excel.Workbook();
        await workbook.xlsx.load(fileBuffer);
        const worksheet = workbook.getWorksheet('repartitions');
        const errors = []

        if (!worksheet) {
            throw new Error('No se encontró la hoja de trabajo "Repartitions" en el archivo Excel.');
        }

        const rows = worksheet.getSheetValues();

        for (let row = 2; row <= rows.length; row++) {
            const rowData = rows[row];
            console.log(`Procesando fila ${row}`);
            try {
                if (rowData && rowData.length > 0) {
                    const [
                        _,
                        id,
                        jurisdiccion,
                        reparticion1,
                        reparticion2,
                        reparticion3,
                    ] = rows[row];

                    let existingRecord = await Repartitions.findOne({ where: { id: id } });
                    
                    let existingJurisdiccion = await Jurisdictions.findOne({ where: { jurisdiccion: jurisdiccion } });




                    if(existingJurisdiccion){
                        if (!existingRecord) {
                            await Repartitions.create({
                                id: id,
                                jurisdiccion: jurisdiccion,
                                reparticion1: reparticion1,
                                reparticion2: reparticion2,
                                reparticion3: reparticion3,
                            });
                            console.log(`Registro creado: ${id}`);
                        } else {
                            existingRecord = await Repartitions.update({
                                jurisdiccion: jurisdiccion,
                                reparticion1: reparticion1,
                                reparticion2: reparticion2,
                                reparticion3: reparticion3,
                            }, {
                                where: { id: id }
                            });
                            console.log(`Registro actualizado: ${id}`);
                        }
                    }else{
                        errors.push(`Fila ${row}: "La Jurisdicción no existe" - ${jurisdiccion}`);
                    }

                }
            } catch (error) {
                console.error(`Error en la fila ${row}:`, error);
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
    importRepartitions
};
