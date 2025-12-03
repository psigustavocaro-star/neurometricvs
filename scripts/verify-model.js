require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function verifyModel() {
    const apiKey = process.env.GOOGLE_API_KEY;
    const modelName = 'gemini-2.0-flash';

    console.log(`Testing model: ${modelName}`);
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    try {
        const result = await model.generateContent('Hello, are you working?');
        const response = await result.response;
        console.log('Response:', response.text());
        console.log('✅ Model verified successfully');
    } catch (error) {
        console.error('❌ Model failed:', error.message);
    }
}

verifyModel();
