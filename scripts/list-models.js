require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        console.error('No API key found');
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error('Error listing models:', data.error);
        } else {
            const fs = require('fs');
            fs.writeFileSync('models.json', JSON.stringify(data, null, 2));
            console.log('Models saved to models.json');
        }
    } catch (error) {
        console.error('Request failed:', error);
    }
}

listModels();
