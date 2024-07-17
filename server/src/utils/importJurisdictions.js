const excel = require('exceljs');
const Jurisdictions = require('../models/Jurisdictions.model');

const importJurisdictions = async (fileBuffer) => {
    try {
        const workbook = new excel.Workbook();
        await workbook.xlsx.load(fileBuffer);
        const worksheet = workbook.getWorksheet('jurisdictions');
        const errors = []

        if (!worksheet) {
            throw new Error('No se encontró la hoja de trabajo "jurisdictions" en el archivo Excel.');
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
                    ] = rows[row];

                    const existingRecord = await Jurisdictions.findOne({ where: { id: id } });

                    if (!existingRecord) {
                        await Jurisdictions.create({
                            id: id,
                            jurisdiccion: jurisdiccion,
                        });
                    } else {
                        errors.push(`Fila ${row}: "Ya existe la Jurisdicción" - ${jurisdiccion}`);
                    }
                }
            } catch (error) {
                console.log(`Error en la fila ${row}:`, error);
                throw error
            }

        }
        if (errors.length > 0) {
            throw new Error(errors);
        }
        console.log('Datos importados correctamente');
    } catch (error) {
        console.error('Error al importar datos:', error);
        throw error;
    }
};

module.exports = {
    importJurisdictions
};
