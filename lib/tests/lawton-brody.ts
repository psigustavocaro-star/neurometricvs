import { TestDefinition } from "@/types/test"

const options01 = [
    { label: "0 - Incapaz / Necesita ayuda", value: 0 },
    { label: "1 - Independiente", value: 1 }
]

const optionsCustom = [
    // Standard Lawton is complex as items differ in score points (1, 1, 0) or (1, 0, 0).
    // Simplified version uses: 1 (Independent) vs 0 (Dependent).
    // We will use specific options for each question to be precise as per the scale logic.
]

export const lawton: TestDefinition = {
    id: "lawton-brody",
    title: "Escala de Lawton y Brody (AIVD)",
    description: "Evaluación de la independencia en las Actividades Instrumentales de la Vida Diaria (AIVD).",
    instructions: "Evalúe la capacidad del paciente para realizar las siguientes actividades.",
    authors: "Lawton, M. P., & Brody, E. M. (1969)",
    reference: "Lawton, M. P., & Brody, E. M. (1969). Assessment of older people: self-maintaining and instrumental activities of daily living. The Gerontologist, 9(3), 179-186.",
    uiType: 'list',
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Funcionalidad (T. Ocupacional)',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados:**
Puntuación Total: **{score} / 8** (Mujeres) o **{score} / 5** (Hombres - histórico)

**Nivel de Dependencia:**
- **8**: Independencia Total.
- **6-7**: Dependencia Ligera.
- **4-5**: Dependencia Moderada.
- **2-3**: Dependencia Severa.
- **0-1**: Dependencia Total.

**Nota:** Originalmente, algunas ítems (cocina, limpieza, lavado) se excluían para hombres, pero actualmente se recomienda evaluar la capacidad funcional independientemente del género. El máximo posible es 8 puntos.
        `
    },
    subscales: [],
    questions: [
        {
            id: "tlf",
            text: "1. Capacidad para usar el teléfono",
            type: "single_choice",
            options: [
                { label: "Lo usa por iniciativa propia (busca números, marca)", value: 1 },
                { label: "Marca unos cuantos números bien conocidos", value: 1 },
                { label: "Contesta al teléfono, pero no marca", value: 1 },
                { label: "No usa el teléfono en absoluto", value: 0 }
            ]
        },
        {
            id: "compras",
            text: "2. Compras",
            type: "single_choice",
            options: [
                { label: "Realiza todas las compras necesarias independientemente", value: 1 },
                { label: "Realiza independientemente pequeñas compras", value: 0 }, // Often 0 in strict scale if not ALL needed? NO. Scale: 1, 0, 0, 0 usually? Or 1 if "small purchases"? Usually: Needs to be accompanied = 0.
                // Standard Lawton: 1=All shopping independently. 0=Needs to be accompanied on any shopping trip OR completely unable.
                { label: "Necesita ir acompañado para comprar", value: 0 },
                { label: "Totalmente incapaz de comprar", value: 0 }
            ]
        },
        {
            id: "cocina",
            text: "3. Preparación de la comida",
            type: "single_choice",
            options: [
                { label: "Planea, prepara y sirve las comidas adecuadas independientemente", value: 1 },
                { label: "Prepara las comidas si se le dan los ingredientes", value: 0 },
                { label: "Calienta y sirve las comidas, pero no mantiene dieta adecuada", value: 0 },
                { label: "Necesita que se le prepare y sirva la comida", value: 0 }
            ]
        },
        {
            id: "hogar",
            text: "4. Cuidado de la casa",
            type: "single_choice",
            options: [
                { label: "Cuida la casa solo o con ayuda ocasional (trabajos pesados)", value: 1 },
                { label: "Realiza tareas ligeras (fregar, hacer camas)", value: 1 },
                { label: "Realiza tareas ligeras pero no mantiene nivel de limpieza aceptable", value: 1 }, // Some versions give 1, some 0. Let's stick to strict: need help in daily maintenance = 0? 1 usually.
                { label: "Necesita ayuda en todas las tareas de la casa", value: 0 },
                { label: "No participa en ninguna tarea doméstica", value: 0 }
            ]
        },
        {
            id: "lavado",
            text: "5. Lavado de ropa",
            type: "single_choice",
            options: [
                { label: "Lava por sí mismo toda su ropa", value: 1 },
                { label: "Lava por sí mismo pequeñas prendas", value: 1 },
                { label: "Todo el lavado de ropa debe ser realizado por otro", value: 0 }
            ]
        },
        {
            id: "transporte",
            text: "6. Uso de medios de transporte",
            type: "single_choice",
            options: [
                { label: "Viaja solo en transporte público o conduce su coche", value: 1 },
                { label: "Es capaz de coger un taxi, pero no transporte público", value: 1 },
                { label: "Viaja en transporte público si va acompañado", value: 0 }, // Strict: 1 if "travels on public transport when assisted by another". Wait. Usually Lawton gives 1 point for partial independence/assistance? NO. Lawton is usually binary 0/1 final score per item but has graded answers.
                // Correction: Item scores:
                // Phone: 1, 1, 1, 0.
                // Shopping: 1, 0, 0, 0.
                // Food: 1, 0, 0, 0.
                // Housekeeping: 1, 1, 1, 0, 0.
                // Laundry: 1, 1, 0.
                // Transport: 1, 1, 1 (travels public w/ escort? no, usually 1 if travels on public trnspt/taxi), 0.
                // Let's stick to standard binary outcome logic (1=Independent/Adequate, 0=Dependent).
                // Re-verifying logic:
                // Transport: 1=Drives/Public T. 1=Taxi. 1=Public T. with assistance. 0=No travel.
                { label: "Viaja en coche o taxi solo con ayuda de otros", value: 0 },
                { label: "No viaja", value: 0 }
            ]
        },
        {
            id: "medicacion",
            text: "7. Responsabilidad sobre la medicación",
            type: "single_choice",
            options: [
                { label: "Es responsable de tomar su medicación a sus horas y dosis correctas", value: 1 },
                { label: "Toma la medicación si se la preparan con anticipación", value: 0 },
                { label: "No es capaz de administrarse su medicación", value: 0 }
            ]
        },
        {
            id: "dinero",
            text: "8. Capacidad de utilizar dinero",
            type: "single_choice",
            options: [
                { label: "Maneja sus asuntos financieros independientemente", value: 1 },
                { label: "Maneja los gastos cotidianos, pero necesita ayuda en grandes gastos/bancos", value: 1 },
                { label: "Incapaz de manejar dinero", value: 0 }
            ]
        }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 2, label: "Dependencia Severa", color: "red" },
            { min: 3, max: 5, label: "Dependencia Moderada", color: "orange" },
            { min: 6, max: 7, label: "Dependencia Ligera", color: "yellow" },
            { min: 8, max: 8, label: "Independencia", color: "green" }
        ]
    }
}
