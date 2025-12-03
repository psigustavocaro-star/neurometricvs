require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    console.log('Testing Gemini API connection...');

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        console.error('❌ Error: GOOGLE_API_KEY not found in .env.local');
        return;
    }
    console.log('✅ API Key found (starts with):', apiKey.substring(0, 5) + '...');

    const modelsToTest = ['gemini-1.5-flash', 'gemini-pro', 'gemini-1.0-pro'];
    const genAI = new GoogleGenerativeAI(apiKey);

    for (const modelName of modelsToTest) {
        console.log(`\n--- Testing model: ${modelName} ---`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent('Hello');
            const response = await result.response;
            console.log(`✅ Success with ${modelName}! Response:`, response.text());
            return; // Exit on first success
        } catch (error) {
            console.error(`❌ Failed with ${modelName}:`, error.message);
        }
    }
    console.log('\n❌ All models failed.');
}

testGemini();
