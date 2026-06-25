import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

// Load es.json
const esJsonStr = fs.readFileSync('messages/es.json', 'utf8');
const esJson = JSON.parse(esJsonStr);

// Flattener function
function flattenObject(ob) {
    var toReturn = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}

const flatDictionary = flattenObject(esJson);
const validKeys = new Set(Object.keys(flatDictionary));

// Find all TS/TSX files
const files = globSync('{app,components,lib}/**/*.{ts,tsx,js,jsx}');

let missingCount = 0;

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    
    // Find all namespace usages: const t = useTranslations('Namespace')
    const nsRegex = /useTranslations\(\s*['"]([^'"]+)['"]\s*\)/g;
    let match;
    let namespaces = [];
    while ((match = nsRegex.exec(content)) !== null) {
        namespaces.push(match[1]);
    }
    
    // If there's 1 main namespace, we assume t('key') maps to Namespace.key
    // There are some getTranslations('Namespace') too for server components
    const serverNsRegex = /getTranslations\(\s*['"]([^'"]+)['"]\s*\)/g;
    while ((match = serverNsRegex.exec(content)) !== null) {
        namespaces.push(match[1]);
    }

    if (namespaces.length === 0) continue;
    
    const primaryNamespace = namespaces[0];

    // Find all t('key') calls
    const keyRegex = /\bt\(\s*['"]([^'"]+)['"]\s*\)/g;
    let keyMatch;
    while ((keyMatch = keyRegex.exec(content)) !== null) {
        const localKey = keyMatch[1];
        const fullKey = `${primaryNamespace}.${localKey}`;
        
        if (!validKeys.has(fullKey)) {
            console.log(`[MISSING] File: ${file} | Key: ${fullKey}`);
            missingCount++;
        }
    }
}

if (missingCount === 0) {
    console.log("SUCCESS: All evaluated translations are present in es.json!");
} else {
    console.log(`Found ${missingCount} potentially missing keys.`);
}
