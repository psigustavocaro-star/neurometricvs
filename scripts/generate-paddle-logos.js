const sharp = require('./node_modules/sharp');
const fs = require('fs');

async function createLogos() {
    const inputPath = '/Users/gustavocaromaldonado/.gemini/antigravity/brain/0e26f68e-788a-46a3-bede-80ec44ffa10a/media__1772412198818.png';
    const outDir = './public/logos';
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const plans = [
        { id: 'basic', label: 'Plan Básico' },
        { id: 'clinical', label: 'Plan Clínico' },
        { id: 'pro', label: 'Plan Pro Anual' }
    ];

    for (const plan of plans) {
        console.log(`Generating logo for ${plan.label}...`);

        const svgContent = `
        <svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="600" fill="#ffffff" />
            <text x="300" y="520" text-anchor="middle" dominant-baseline="middle" 
                  font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
                  font-size="44" font-weight="bold" fill="#0f172a">
                ${plan.label}
            </text>
        </svg>
        `;

        try {
            const resizedLogo = await sharp(inputPath)
                .resize({ width: 440, height: 400, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
                .toBuffer();

            await sharp(Buffer.from(svgContent))
                .composite([
                    { input: resizedLogo, top: 50, left: 80, blend: 'over' }
                ])
                .png()
                .toFile(`${outDir}/paddle-[${plan.id}].png`);

            console.log(`   -> Created: paddle-[${plan.id}].png`);
        } catch (e) {
            console.error('Error generating image:', e);
        }
    }
}
createLogos();
