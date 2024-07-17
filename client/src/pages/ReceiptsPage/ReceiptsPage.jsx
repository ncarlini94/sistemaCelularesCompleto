import {  useState } from 'react';
import { Document, HeadingLevel, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import styles from './ReceiptsPage.module.css';

const ReceiptsPage = () => {

  const [itemCount, setItemCount] = useState(1);
  const [generating, setGenerating] = useState(false)
  const initialRowData = {
          linea: '',
          funcionario: '',
          cuit: '',
          modelo: '',
          imei: '',
          jurisdiccion: '',
          reparticion1: '',
          reparticion2: '',
          reparticion3: ''
      };
  const [rowsData, setRowsData] = useState(Array.from({ length: itemCount }, () => ({ ...initialRowData })));



  const handleAddRow = (e) => {
    e.preventDefault();
    setItemCount(itemCount + 1);
    setRowsData([...rowsData, {}]);
  };

  const handleRemoveRow = (e) => {
    e.preventDefault();
    if (itemCount > 1) {
      const updatedRows = rowsData.slice(0, -1);
      setRowsData(updatedRows);
      setItemCount(updatedRows.length);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rowsData];
    const updatedValue = value || '';
    updatedRows[index] = { ...updatedRows[index], [field]: updatedValue.toUpperCase() };
    setRowsData(updatedRows);
  };

  const renderInputFields = () => {
    return rowsData.map((rowData, index) => (
        <tr key={index}>
        <th><h5 style={{margin:'1vh auto 0.8vh 1vh', fontSize:'3vh'}}>{index + 1}</h5></th>
          <th>
              <input
                className={`${styles.input} form-control`}
                            style={{
                                backgroundColor:'rgba(104, 104, 104, 0.699)',
                                color:'rgb(255,255,255)'
                            }}
                            type="text"
                            placeholder='Linea'
                            value={rowData.linea}
                            onChange={(e) => handleInputChange(index, 'linea', e.target.value)}
              />
          </th>
          <th>
            <input
              className={`${styles.input} form-control`}
                          style={{
                              backgroundColor:'rgba(104, 104, 104, 0.699)',
                              color:'rgb(255,255,255)'
                          }}
                          type="text"
                          placeholder='Funcionario'
                          value={rowData.funcionario}
                          onChange={(e) => handleInputChange(index, 'funcionario', e.target.value.toUpperCase())}
            />
          </th>
          <th>
            <input
              className={`${styles.input} form-control`}
                          style={{
                              backgroundColor:'rgba(104, 104, 104, 0.699)',
                              color:'rgb(255,255,255)'
                          }}
                          type="text"
                          placeholder='Cuit'
                          value={rowData.cuit}
                          onChange={(e) => handleInputChange(index, 'cuit', e.target.value)}
            />
          </th>
          <th>
            <input
              className={`${styles.input} form-control`}
                          style={{
                              backgroundColor:'rgba(104, 104, 104, 0.699)',
                              color:'rgb(255,255,255)'
                          }}
                          type="text"
                          placeholder='Modelo'
                          value={rowData.modelo}
                          onChange={(e) => handleInputChange(index, 'modelo', e.target.value.toUpperCase())}
            />
          </th>
          <th>
            <input
              className={`${styles.input} form-control`}
                          style={{
                              backgroundColor:'rgba(104, 104, 104, 0.699)',
                              color:'rgb(255,255,255)'
                          }}
                          type="text"
                          placeholder='Imei'
                          value={rowData.imei}
                          onChange={(e) => handleInputChange(index, 'imei', e.target.value)}
            />
          </th>
          <th>
            <input
              className={`${styles.input} form-control`}
                          style={{
                              backgroundColor:'rgba(104, 104, 104, 0.699)',
                              color:'rgb(255,255,255)'
                          }}
                          type="text"
                          placeholder='Jurisdicción'
                          value={rowData.jurisdiccion}
                          onChange={(e) => handleInputChange(index, 'jurisdiccion', e.target.value.toUpperCase())}
            />
          </th>
          <th>
            <input
              className={`${styles.input} form-control`}
                          style={{
                              backgroundColor:'rgba(104, 104, 104, 0.699)',
                              color:'rgb(255,255,255)'
                          }}
                          type="text"
                          placeholder='Repartición 1'
                          value={rowData.reparticion1}
                          onChange={(e) => handleInputChange(index, 'reparticion1', e.target.value.toUpperCase())}
            />
          </th>
          <th>
            <input
              className={`${styles.input} form-control`}
                          style={{
                              backgroundColor:'rgba(104, 104, 104, 0.699)',
                              color:'rgb(255,255,255)'
                          }}
                          type="text"
                          placeholder='Repartición 2'
                          value={rowData.reparticion2}
                          onChange={(e) => handleInputChange(index, 'reparticion2', e.target.value.toUpperCase())}
            />
          </th>
          <th>
            <input
              className={`${styles.input} form-control`}
                          style={{
                              backgroundColor:'rgba(104, 104, 104, 0.699)',
                              color:'rgb(255,255,255)'
                          }}
                          type="text"
                          placeholder='Repartición 3'
                          value={rowData.reparticion3}
                          onChange={(e) => handleInputChange(index, 'reparticion3', e.target.value.toUpperCase())}
            />
            </th>
        </tr>
    ));
  };


  const generarRemito = async (e) => {
    e.preventDefault()
    setGenerating(true);
    try {

      const fechaActual = new Date()
      const año = fechaActual.getFullYear();
      const mes = fechaActual.getMonth() + 1;
      const dia = fechaActual.getDate();

      const Header = new Paragraph({
        children: [
          new TextRun({
            text: 'EMPLRESA',
            bold: true,
            size: 22,
            break: 1,
            color: '#000000'
          }),
          new TextRun({
            text: 'AREA',
            bold: true,
            size: 22,
            break: 1,
            color: '#000000'
          }),
          new TextRun({
            text: `Fecha: ${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${año}`,
            bold: true,
            size: 20,
            break: 2,
            color: '#000000'
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        spacing: {
          after: 1800,
        },
      });

      const tableHeaders = [
        'Línea',
        'Funcionario',
        'Cuit',
        'Modelo',
        'Imei',
        'Jurisdicción',
        'Repartición 1',
        'Repartición 2',
        'Repartición 3',
      ];
      const headerCells = tableHeaders.map((headerText) => createTableCell(headerText));
      const headerRow = new TableRow({ children: headerCells });

      const tableRows = [headerRow];

      for (let i = 0; i < itemCount; i++) {
        const rowData = [
          rowsData[i]?.linea || '',
          rowsData[i]?.funcionario || '',
          rowsData[i]?.cuit || '',
          rowsData[i]?.modelo || '',
          rowsData[i]?.imei || '',
          rowsData[i]?.jurisdiccion || '',
          rowsData[i]?.reparticion1 || '',
          rowsData[i]?.reparticion2 || '',
          rowsData[i]?.reparticion3 || '',
        ];
        const rowCells = rowData.map((data) => createTableCell(data));
        const newRow = new TableRow({ children: rowCells });
        tableRows.push(newRow);
      }


      const firma = new Paragraph({
        children: [
          new TextRun({
            text:"Firma: .........................................",
            bold: true,
            break: 2
          }),
          new TextRun({
            text:"Aclaración: .........................................",
            bold: true,
            break: 2
          }),
          new TextRun({
            text:"DNI: .........................................",
            bold: true,
            break: 2
          }),
          new TextRun({
            text:"Fecha: .........................................",
            bold: true,
            break: 2
          })
        ],
          spacing: {
            before: 3400,
          },
});

      const doc = new Document({
        sections: [
          {
            children: [
              Header,
              new Table({
              width: { size: '100%', type: 'AUTO' },
              rows: tableRows,
            }),
            firma,
          ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'remito.docx');
    } catch (error) {
      console.error('Error al generar el remito:', error);
    }
    setGenerating(false);
  };

  const createTableCell = (text) => {
    return new TableCell({
      children: [new Paragraph(text)],
    });
  };

  return (
    <div className={`${styles.container} bg-dark container-fluid`}>
    <form>
      <div className={`${styles.row} row px-lg-4 px-2`}>
        <h4 className='col-auto me-auto'>Remito</h4>
        <div className='col-auto'>
          <button className="btn btn-secondary me-lg-2" onClick={handleRemoveRow}>
            -
          </button>
        </div>
        <div className='col-auto'>
          <span><h5 className={`${styles.number}`}>{itemCount}</h5></span>
        </div>
        <div className='col-auto '>
          <button className="btn btn-secondary ms-lg-2" onClick={handleAddRow}>
            +
          </button>
        </div>
      <button className='col-auto btn btn-primary mb-lg-3' onClick={generarRemito} disabled={generating}>
        {generating ? 'Generando...' : 'Generar'}
      </button>
      </div>
      <div className="table-responsive">
      <table className={`${styles.table} table table-dark table-striped table-hover`}>
        <thead>
          <tr className={`${styles.list} ${styles.header}`}>
          <th className="">Item</th>
          <th className="">Linea</th>
          <th className="">Funcionario</th>
          <th className="">Cuit</th>
          <th className="">Modelo</th>
          <th className="">Imei</th>
          <th className="">Jurisdicción</th>
          <th className="">Repartición 1</th>
          <th className="">Repartición 2</th>
          <th className="">Repartición 3</th>
          </tr>
        </thead>
        <tbody className={`${styles.list} table-group-divider`}>
      {renderInputFields()}
        </tbody>
      </table>
      </div>
      </form>
    </div>
  );
};

export default ReceiptsPage;
