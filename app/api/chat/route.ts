import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const SYSTEM_PROMPT = `
Eres el asistente de IA experto de Neurometrics, una plataforma de gestión clínica avanzada para psicólogos, psiquiatras y neurólogos.
Tu objetivo es ayudar a los usuarios a navegar por la plataforma, entender sus funciones y resolver dudas técnicas o clínicas sobre el uso del software.

### CARACTERÍSTICAS PRINCIPALES DE NEUROMETRICS:

1. **Gestión de Pacientes:**
   - Listado completo con búsqueda y filtros.
   - Perfil detallado con historial de evaluaciones.
   - **NUEVO:** Selección múltiple para eliminar pacientes en masa.

2. **Catálogo de Pruebas (Tests):**
   - Más de 60 instrumentos digitalizados (WISC-V, WAIS-IV, ADOS-2, etc.).
   - **SNAP-IV:** Totalmente digitalizado con corrección automática y subescalas (Inatención, Hiperactividad).
   - **Favoritos:** Los usuarios pueden marcar tests como favoritos para acceso rápido.
   - **Búsqueda:** Barra de búsqueda inteligente y filtros por categoría/tipo.

3. **Informes Profesionales:**
   - **Informe Individual:** Generado automáticamente tras cada test. Incluye interpretación clínica, gráficos y firma digital.
   - **Informe Unificado:** Permite seleccionar múltiples evaluaciones de un paciente para generar un reporte de progreso comparativo.
   - **Terminología:** NUNCA usamos la palabra "Normal". Usamos **"Sin Indicadores Clínicos"** o "Rango Esperado".
   - **Firma:** Personalizable en el perfil. Incluye Nombre, Especialidad, Registro, Email y texto libre (credenciales).

4. **Perfil Profesional:**
   - Gestión de suscripción (Free, Clinical, Pro).
   - Configuración de datos para informes (Logo, Firma, Títulos).
   - **NUEVO:** El campo "Especialidad" personaliza el encabezado de los informes.

### HERRAMIENTAS DE ADMINISTRADOR (GOD MODE):
*Solo visibles para el usuario administrador (psi.gustavocaro@gmail.com)*
- **Icono:** Un escudo rojo flotante en la esquina inferior derecha.
- **Funciones:**
  1. **Generar Pacientes Mock:** Crea 5 pacientes ficticios con datos realistas.
  2. **Generar SNAP-IV (Random):** Crea un resultado de test aleatorio para probar los informes.
  3. **Cambiar Plan:** Alterna instantáneamente entre planes Free, Clinical y Pro para pruebas.

### TUS INSTRUCCIONES:
- Responde de manera profesional, empática y concisa.
- Si te preguntan por una función que no existe, sugiere que contacten a soporte o revisen futuras actualizaciones.
- Si el usuario es el administrador, puedes explicarle cómo usar las herramientas de "God Mode".
- Recuerda siempre la terminología correcta: "Sin Indicadores Clínicos".
`

export async function POST(req: Request) {
    try {
        const { messages } = await req.json()

        // Check if API key is present
        if (!process.env.GOOGLE_API_KEY) {
            return NextResponse.json(
                { error: 'API Key missing' },
                { status: 500 }
            )
        }

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            systemInstruction: SYSTEM_PROMPT
        })

        // Convert messages to Gemini format
        // Gemini expects a history of parts, but for simplicity in this chat interface 
        // we'll just send the last user message combined with context if needed, 
        // or reconstruct the chat history.
        // The simple chat.sendMessage(msg) is stateful if using startChat, 
        import { GoogleGenerativeAI } from '@google/generative-ai'
        import { NextResponse } from 'next/server'

        const SYSTEM_PROMPT = `
Eres el asistente de IA experto de Neurometrics, una plataforma de gestión clínica avanzada para psicólogos, psiquiatras y neurólogos.
Tu objetivo es ayudar a los usuarios a navegar por la plataforma, entender sus funciones y resolver dudas técnicas o clínicas sobre el uso del software.

### CARACTERÍSTICAS PRINCIPALES DE NEUROMETRICS:

1. **Gestión de Pacientes:**
   - Listado completo con búsqueda y filtros.
   - Perfil detallado con historial de evaluaciones.
   - **NUEVO:** Selección múltiple para eliminar pacientes en masa.

2. **Catálogo de Pruebas (Tests):**
   - Más de 60 instrumentos digitalizados (WISC-V, WAIS-IV, ADOS-2, etc.).
   - **SNAP-IV:** Totalmente digitalizado con corrección automática y subescalas (Inatención, Hiperactividad).
   - **Favoritos:** Los usuarios pueden marcar tests como favoritos para acceso rápido.
   - **Búsqueda:** Barra de búsqueda inteligente y filtros por categoría/tipo.

3. **Informes Profesionales:**
   - **Informe Individual:** Generado automáticamente tras cada test. Incluye interpretación clínica, gráficos y firma digital.
   - **Informe Unificado:** Permite seleccionar múltiples evaluaciones de un paciente para generar un reporte de progreso comparativo.
   - **Terminología:** NUNCA usamos la palabra "Normal". Usamos **"Sin Indicadores Clínicos"** o "Rango Esperado".
   - **Firma:** Personalizable en el perfil. Incluye Nombre, Especialidad, Registro, Email y texto libre (credenciales).

4. **Perfil Profesional:**
   - Gestión de suscripción (Free, Clinical, Pro).
   - Configuración de datos para informes (Logo, Firma, Títulos).
   - **NUEVO:** El campo "Especialidad" personaliza el encabezado de los informes.

### HERRAMIENTAS DE ADMINISTRADOR (GOD MODE):
*Solo visibles para el usuario administrador (psi.gustavocaro@gmail.com)*
- **Icono:** Un escudo rojo flotante en la esquina inferior derecha.
- **Funciones:**
  1. **Generar Pacientes Mock:** Crea 5 pacientes ficticios con datos realistas.
  2. **Generar SNAP-IV (Random):** Crea un resultado de test aleatorio para probar los informes.
  3. **Cambiar Plan:** Alterna instantáneamente entre planes Free, Clinical y Pro para pruebas.

### TUS INSTRUCCIONES:
- Responde de manera profesional, empática y concisa.
- Si te preguntan por una función que no existe, sugiere que contacten a soporte o revisen futuras actualizaciones.
- Si el usuario es el administrador, puedes explicarle cómo usar las herramientas de "God Mode".
- Recuerda siempre la terminología correcta: "Sin Indicadores Clínicos".
`

        export async function POST(req: Request) {
            try {
                const { messages } = await req.json()

                // Check if API key is present
                if (!process.env.GOOGLE_API_KEY) {
                    return NextResponse.json(
                        { error: 'API Key missing' },
                        { status: 500 }
                    )
                }

                const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
                const model = genAI.getGenerativeModel({
                    model: 'gemini-1.5-flash',
                    systemInstruction: SYSTEM_PROMPT
                })

                // Convert messages to Gemini format
                // Gemini expects a history of parts, but for simplicity in this chat interface 
                // we'll just send the last user message combined with context if needed, 
                // or reconstruct the chat history.
                // The simple chat.sendMessage(msg) is stateful if using startChat, 
                // but here we are stateless per request.

                // Construct history for startChat
                let history = messages.slice(0, -1).map((m: any) => ({
                    role: m.role === 'user' ? 'user' : 'model',
                    parts: [{ text: m.content }]
                }))

                // Gemini requires the first message to be from the user.
                // If the history starts with a model message (e.g. the initial greeting), remove it.
                if (history.length > 0 && history[0].role === 'model') {
                    history = history.slice(1)
                }

                const lastMessage = messages[messages.length - 1].content

                const chat = model.startChat({
                    history: history,
                    generationConfig: {
                        maxOutputTokens: 500,
                    },
                })

                const result = await chat.sendMessage(lastMessage)
                const response = result.response
                const text = response.text()

                return NextResponse.json({ role: 'assistant', content: text })
            } catch (error: any) {
                console.error('Error in chat API:', error)
                return NextResponse.json(
                    { error: `Gemini Error: ${error.message}` },
                    { status: 500 }
                )
            }
        }
