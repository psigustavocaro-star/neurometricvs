const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const filePath = process.argv[2];

if (!filePath) {
    console.error('Usage: node scripts/extract-pdf.js <path-to-pdf>');
    process.exit(1);
}

const absolutePath = path.resolve(filePath);

if (!fs.existsSync(absolutePath)) {
    console.error(`File not found: ${absolutePath}`);
    process.exit(1);
}

const dataBuffer = fs.readFileSync(absolutePath);

// Simpler usage for version 1.1.1
pdf(dataBuffer).then(function (data) {
    console.log(data.text);
}).catch(function (error) {
    console.error('Error parsing PDF:', error);
});
