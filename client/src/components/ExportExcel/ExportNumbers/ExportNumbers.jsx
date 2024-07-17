import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';
import stylesButtons from './../../../styles/buttons.module.css'


const ExportToExcel = ({ data, fileName, sheetName }) => {

  const exportToExcel = () => {


    const transformedData = data.map(item => ({
        "Linea": item.linea,
        "Nombre": item.funcionarioData.nombre,
        "Apellido": item.funcionarioData.apellido,
        "Compañia": item.compañia,
        "Activo": item.activo,
        "Plan": item.planData.nombre,
        "Modelo": item.modelo,
        "Imei": item.imei,
        "Sim": item.sim,
        "Jurisdiccion": item.funcionarioData.jurisdiccionData.jurisdiccion,
        "Reparticion 1": item.funcionarioData.jurisdiccionData.reparticion1,
        "Reparticion 2": item.funcionarioData.jurisdiccionData.reparticion2,
        "Reparticion 3": item.funcionarioData.jurisdiccionData.reparticion3,
        "LLamadas": item.llamadas,
        "Datos": item.datos,
        "Mensajes": item.mensajes,
        "Observaciones": item.observaciones,
    }));


    const worksheet = XLSX.utils.json_to_sheet(transformedData);


    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const maxWidths = Array.from({ length: range.e.c + 1 }, () => 0);

    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = { c: C, r: R };
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        if (!worksheet[cellRef]) continue;

        const cellValue = worksheet[cellRef].v.toString();
        maxWidths[C] = Math.max(maxWidths[C], cellValue.length);
      }
    }

    worksheet['!cols'] = maxWidths.map(width => ({ wch: width }));

    const lastColumnIndex = range.e.c;
    worksheet['!cols'][lastColumnIndex] = { wch: 25 };



    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);


    console.log('Data to export:', data);

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    FileSaver.saveAs(blob, fileName + '.xlsx');
  };

  return (
    <button className={`${stylesButtons.btnExport} btn btn-primary`} onClick={exportToExcel}>
      <i className={`${stylesButtons.icon} bi bi-cloud-arrow-down`}></i>
    </button>
  );
};

ExportToExcel.propTypes = {
    data: PropTypes.array.isRequired,
    fileName: PropTypes.string.isRequired,
    sheetName: PropTypes.string.isRequired
  };

export default ExportToExcel;