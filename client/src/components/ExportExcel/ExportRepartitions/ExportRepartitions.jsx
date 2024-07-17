import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';
import stylesButtons from './../../../styles/buttons.module.css'


const ExportToExcel = ({ data, fileName, sheetName }) => {

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
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