const filePath = "C:\\Users\\chauh\\OneDrive\\Desktop\\date.xlsx";
const XLSX = require('xlsx');
// const moment = require('moment');
const fs = require('fs');
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
const headers = jsonData[0];
const data = jsonData.slice(1);
const jsonObject = data.map(row => {
    const obj = {};
    row.forEach((value, index) => {
        obj[headers[index]] = value;
    });
    return obj;
});
const filteredJsonObject = jsonObject.filter(obj => {
    return Object.values(obj).some(val => val !== null && typeof val !== 'object');
});
const extractedDates = [];
filteredJsonObject.forEach(obj => {
    if (obj.Date != null) {
        extractedDates.push(obj.Date);
    }
});

console.log(extractedDates);

// // function countDatesInFormat(dates, format) {
// //     let count = 0;
// //     dates.forEach(date => {
// //         if (moment(date, format, true).isValid()) {
// //             count++;
// //         }
// //     });
// //     return count;
// // }
// // const countDDMMYYYY = countDatesInFormat(extractedDates, 'DD-MM-YYYY');
// // const countMMDDYYYY = countDatesInFormat(extractedDates, 'MM-DD-YYYY');

// // console.log(`Number of dates in DD-MM-YYYY format: ${countDDMMYYYY}`);
// // console.log(`Number of dates in MM-DD-YYYY format: ${countMMDDYYYY}`);
// const moment = require('moment');
// function convertAllToYYYYMMDD(counts) {
//     for (let format in counts) {
//         counts[format] = counts[format].map(dateString => moment(dateString).format('YYYY-MM-DD'));
//     }
//     return counts;
// }

// // Function to count dates in combined formats
// function countCombinedFormats(dates) {
//     let counts = {
//         'DD-MM-YYYY': [],
//         'MM-DD-YYYY': [],
//         'YYYY-MM-DD': [],
//         'amb': []
//     };
//     dates.forEach(dateString => {
//         const dateDMY = moment(dateString, ['DD-MM-YYYY', 'DD-MM-YY', 'D-M-YY', 'D.M.YY', 'DD MMMM YYYY', 'DD-MMM-YY','DD-MM-YYYY HH:mm'], true);
//         const dateMDY = moment(dateString, ['MMM-YY', 'MM-DD-YYYY', 'MM.DD.YYYY','MMM-DD-YYYY'], true);
//         const dateYMD = moment(dateString, ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD', 'YYYY.MM.DD'], true);
    
//         // Count the date in respective format
//         const isAmbiguous = dateDMY.isValid() && dateMDY.isValid();
        
//         if (isAmbiguous) {
//             console.log(`Ambiguous date: ${dateString}`);
//             counts['amb'].push(dateString);
//         } else {
//             if (dateDMY.isValid()) {
//                 counts['DD-MM-YYYY'].push(dateString);
//             }
//             if (dateMDY.isValid()) {
//                 counts['MM-DD-YYYY'].push(dateString);
//             }
//             if (dateYMD.isValid()) {
//                 counts['YYYY-MM-DD'].push(dateString);
//             }
//         }
//     });

//     return counts;
// }

// function handleAmbiguousDates(counts) {
//     const maxCount = Math.max(counts['DD-MM-YYYY'].length, counts['MM-DD-YYYY'].length, counts['YYYY-MM-DD'].length);
//     const ambiguousDates = counts['amb'];
//     if (maxCount === counts['DD-MM-YYYY'].length) {
//         counts['DD-MM-YYYY'] = counts['DD-MM-YYYY'].concat(ambiguousDates);
//     } else if (maxCount === counts['MM-DD-YYYY'].length) {
//         counts['MM-DD-YYYY'] = counts['MM-DD-YYYY'].concat(ambiguousDates);
//     } else {
//         counts['YYYY-MM-DD'] = counts['YYYY-MM-DD'].concat(ambiguousDates);
//     }
//     return counts;
// }

// // Test data
// const dates = extractedDates;
// // const dates = [
// //     "04-12-2004",
// //     "04-11-2004",
// //     "14-03-2012",
// //     "14-03-12",
// //     "14-3-12",
// //     "14.3.12",
// //     "2012-03-14",
// //     "14 March 2012",
// //     "14-Mar-12",
// //     "Mar-12-2001",
// //     "14-Mar",
// //     "Feb-24",
// //     "Mar-12",
// //     "14-03-2012 00:00" 
// // ];

// const counts = countCombinedFormats(dates);

// for (let format in counts) {
//     console.log(`Dates in format ${format}:`);
//     counts[format].forEach(dateString => {
//         console.log(`- ${dateString}`);
//     });
// }

// // Output the size of each array
// console.log("Number of dates in DD-MM-YYYY:", counts['DD-MM-YYYY'].length);
// console.log("Number of dates in MM-DD-YYYY:", counts['MM-DD-YYYY'].length);
// console.log("Number of dates in YYYY-MM-DD:", counts['YYYY-MM-DD'].length);

// console.log("-----------REPLACE THE AMBIGUOUS DATE TO MOST POSSIBLE COUNT-------------");
// const update = handleAmbiguousDates(counts);
// console.log("Number of dates in DD-MM-YYYY:", counts['DD-MM-YYYY'].length);
// console.log("Number of dates in MM-DD-YYYY:", counts['MM-DD-YYYY'].length);
// console.log("Number of dates in YYYY-MM-DD:", counts['YYYY-MM-DD'].length);
// console.log("-----------REPLACE THE ALL DATE TO YYYY-MM-DD-------------");
// // const allDatesInYYYYMMDD = convertAllToYYYYMMDD(update);
// // console.log(allDatesInYYYYMMDD);