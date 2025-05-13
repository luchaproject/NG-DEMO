// src/utils/utils.js
import * as XLSX from 'xlsx';

export const exportToExcel = (ngData) => {
  const ws = XLSX.utils.json_to_sheet(ngData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'NG Data');
  XLSX.writeFile(wb, 'ng_data.xlsx');
};
