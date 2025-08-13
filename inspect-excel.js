const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');

const EXCEL_PATH = path.join(process.cwd(), 'datos productos (1).xlsx');

if (!fs.existsSync(EXCEL_PATH)) {
    console.error('No se encontró el archivo:', EXCEL_PATH);
    process.exit(1);
}

const wb = xlsx.readFile(EXCEL_PATH);
const sheet = wb.SheetNames[0];
const ws = wb.Sheets[sheet];
const rows = xlsx.utils.sheet_to_json(ws, { defval: '' });

const headers = Object.keys(rows[0] || {});
console.log('Hoja:', sheet);
console.log('Filas:', rows.length);
console.log('Headers:', headers);
console.log('Muestra (primeras 3 filas):');
console.log(rows.slice(0, 3));


