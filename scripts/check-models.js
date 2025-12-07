const https = require('https');
const fs = require('fs');
const path = require('path');

// Read .env.local manually to avoid dependencies if possible, or use simple parsing
const envPath = path.join(process.cwd(), '.env.local');
let apiKey = '';

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GOOGLE_API_KEY=(.*)/);
    if (match && match[1]) {
        apiKey = match[1].trim();
        // Remove quotes if present
        apiKey = apiKey.replace(/^["']|["']$/g, '');
    }
} catch (e) {
    console.error("Could not read .env.local");
    process.exit(1);
}

if (!apiKey) {
    console.error("GOOGLE_API_KEY not found in .env.local");
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log("=== AVAILABLE GEMINI MODELS ===");
                json.models.forEach(model => {
                    // Filter for models that support 'generateContent'
                    if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes('generateContent')) {
                        console.log(`- ${model.name.replace('models/', '')}`);
                        // console.log(`  Description: ${model.description}`);
                    }
                });
                console.log("===============================");
            } else {
                console.error("Error response:", JSON.stringify(json, null, 2));
            }
        } catch (e) {
            console.error("Error parsing response:", e.message);
        }
    });
}).on('error', (err) => {
    console.error("Request Error:", err.message);
});
