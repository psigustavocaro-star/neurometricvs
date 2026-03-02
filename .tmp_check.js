const fs = require('fs');
const es = require('/Users/gustavocaromaldonado/Documentos HDD/Vibe Coding/Neurometrics/messages/es.json');
const en = require('/Users/gustavocaromaldonado/Documentos HDD/Vibe Coding/Neurometrics/messages/en.json');

function compareKeys(obj1, obj2, path = '') {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    for (const key of keys1) {
        if (!keys2.includes(key)) {
            console.log(`Key ${path ? path + '.' : ''}${key} is missing in second file.`);
        } else if (typeof obj1[key] === 'object' && !Array.isArray(obj1[key]) && obj1[key] !== null) {
            compareKeys(obj1[key], obj2[key], path ? `${path}.${key}` : key);
        }
    }
}

console.log("Checking for keys in ES but missing from EN:");
compareKeys(es, en);
console.log("\nChecking for keys in EN but missing from ES:");
compareKeys(en, es);
