const fs = require('fs');

const files = [
    '/Users/gustavocaro/Documentos HDD/neurometrics/messages/es.json',
    '/Users/gustavocaro/Documentos HDD/neurometrics/messages/en.json'
];

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        JSON.parse(content);
        console.log(`✅ ${file} is valid JSON.`);
    } catch (e) {
        console.error(`❌ ${file} is INVALID JSON.`);
        console.error(e.message);
    }
});
