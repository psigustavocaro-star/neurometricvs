require('dotenv').config({ path: '.env.local' });

async function testGenerateRaw() {
    const apiKey = process.env.GOOGLE_API_KEY;
    const model = 'gemini-pro-latest';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    console.log(`Testing raw fetch to: ${url.replace(apiKey, 'API_KEY')}`);

    const body = {
        contents: [{
            parts: [{ text: "Hello" }]
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        console.log('Status:', response.status);
        const text = await response.text();
        console.log('Response Body:', text);

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

testGenerateRaw();
