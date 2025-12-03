require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        console.error('No API Key found');
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error('API Error:', JSON.stringify(data.error, null, 2));
        } else {
            console.log('Available Models:');
            if (data.models) {
                data.models.forEach(m => console.log(`- ${m.name}`));
            } else {
                console.log('No models found (empty list).');
            }
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

listModels();
