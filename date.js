const XLSX = require('xlsx');
// function checkDateFormat(parts) {
//     let count2 = 0;
//     let count4 = 0;
//     let month, day, year;
//     for (let i = 0; i < parts.length; i++) {
//         if (parts[i].length === 2 && parseInt(parts[i], 10) <= 12 && !month) {
//             if (!day) {
//                 month = parts[i].padStart(2, '0');
//                 count2++;
//             } else if (!month) {
//                 month = parts[i].padStart(2, '0');
//                 count2++;
//             } else {
//                 return "Ambiguous date format";
//             }
//         } else if (parts[i].length === 2 && parseInt(parts[i], 10) <= 31 && !day) {
//             day = parts[i].padStart(2, '0');
//             count2++;
//         } else if (parts[i].length === 4 && !year) {
//             year = parts[i];
//             count4++;
//         }
//     }
    
//     if ((count2 === 2 && count4 === 1) || (count2 === 1 && count4 === 2)) {
//         return $`{year}-${month}-${day}`;
//     } else {
//         return "Invalid date format";
//     }
// }

const filePath = "C:\\Users\\chauh\\OneDrive\\Desktop\\date.xlsx";
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0]; 
const worksheet = workbook.Sheets[sheetName];
const range = XLSX.utils.decode_range(worksheet['!ref']);
const dates = [];

for (let i = range.s.r + 1; i <= range.e.r; i++) {
    const cellAddress = XLSX.utils.encode_cell({ r: i, c: 0 }); 
    const cell = worksheet[cellAddress];

    if (cell && cell.t === 'n') {
        const dateSerialNumber = cell.v;
        const jsDate = XLSX.SSF.parse_date_code(dateSerialNumber);
        console.log(jsDate);
        const dateString = `${jsDate.y}-${(jsDate.m + 1).toString().padStart(2, '0')}-${jsDate.d.toString().padStart(2, '0')}`;
        dates.push(dateString);
    }
    else {
        console.log(cell);
        // dates.push(cell.w);
    }
}

console.log("Dates:", dates);

for (let i = 0; i < dates.length; i++) {
    // const inputString = '11-10-20'
    const inputString = dates[i];
    const parts = inputString.split('-');
    const formattedDate = checkDateFormat(parts);
    console.log(`Date: ${inputString}, Validation: ${formattedDate}`);
}