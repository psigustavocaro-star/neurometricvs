import { TestDefinition } from "@/types/test"

export const barthel: TestDefinition = {
    id: "barthel",
    title: "Índice de Barthel (AVD Básicas)",
    description: "Evaluación del grado de independencia en las Actividades de la Vida Diaria (AVD) básicas.",
    instructions: "Seleccione la opción que mejor describa la capacidad del paciente para realizar cada actividad.",
    authors: "Mahoney, F. I., & Barthel, D. W. (1965)",
    reference: "Mahoney, F. I., & Barthel, D. W. (1965). Functional Evaluation: The Barthel Index. Maryland State Medical Journal, 14, 61-65.",
    uiType: 'list',
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Funcionalidad (T. Ocupacional)',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados:**
Puntuación Total: **{score} / 100**

**Grado de Dependencia:**
- **100**: Independencia Total.
- **60-95**: Dependencia Leve.
- **40-55**: Dependencia Moderada.
- **20-35**: Dependencia Severa.
- **< 20**: Dependencia Total.
        `
    },
    subscales: [],
    questions: [
        {
            id: "comer",
            text: "1. Comer",
            type: "single_choice",
            options: [
                { label: "0 - Incapaz (necesita ser alimentado)", value: 0 },
                { label: "5 - Necesita ayuda para cortar, extender mantequilla, etc.", value: 5 },
                { label: "10 - Independiente (capaz de usar cualquier instrumento necesaria)", value: 10 }
            ]
        },
        {
            id: "lavarse",
            text: "2. Lavarse (baño)",
            type: "single_choice",
            options: [
                { label: "0 - Dependiente", value: 0 },
                { label: "5 - Independiente (entra y sale solo del baño)", value: 5 }
            ]
        },
        {
            id: "vestirse",
            text: "3. Vestirse",
            type: "single_choice",
            options: [
                { label: "0 - Dependiente", value: 0 },
                { label: "5 - Necesita ayuda (pero hace al menos el 50% solo)", value: 5 },
                { label: "10 - Independiente (incluye botones, cremalleras, cordones)", value: 10 }
            ]
        },
        {
            id: "arreglarse",
            text: "4. Arreglarse (Aseo personal)",
            type: "single_choice",
            options: [
                { label: "0 - Necesita ayuda", value: 0 },
                { label: "5 - Independiente para lavarse la cara, manos, dientes, peinarse, afeitarse", value: 5 }
            ]
        },
        {
            id: "deposicion",
            text: "5. Deposición (Control de Heces)",
            type: "single_choice",
            options: [
                { label: "0 - Incontinente (o necesita enemas y ayuda)", value: 0 },
                { label: "5 - Accidente ocasional (1/semana)", value: 5 },
                { label: "10 - Continente", value: 10 }
            ]
        },
        {
            id: "miccion",
            text: "6. Micción (Control de Orina)",
            type: "single_choice",
            options: [
                { label: "0 - Incontinente (o sonda y no se cuida)", value: 0 },
                { label: "5 - Accidente ocasional (máx 1/24h)", value: 5 },
                { label: "10 - Continente (al menos 7 días secos)", value: 10 }
            ]
        },
        {
            id: "retrete",
            text: "7. Uso del Retrete",
            type: "single_choice",
            options: [
                { label: "0 - Dependiente", value: 0 },
                { label: "5 - Necesita algo de ayuda (limpiarse, ropa)", value: 5 },
                { label: "10 - Independiente (entra, sale, se limpia, se viste)", value: 10 }
            ]
        },
        {
            id: "traslado",
            text: "8. Traslado (Cama-Sillón)",
            type: "single_choice",
            options: [
                { label: "0 - Incapaz (no hay equilibrio sentado)", value: 0 },
                { label: "5 - Gran ayuda (1 o 2 personas, física)", value: 5 },
                { label: "10 - Menor ayuda (verbal o física leve)", value: 10 },
                { label: "15 - Independiente", value: 15 }
            ]
        },
        {
            id: "deambulacion",
            text: "9. Deambulación",
            type: "single_choice",
            options: [
                { label: "0 - Inmóvil", value: 0 },
                { label: "5 - Independiente en silla de ruedas (si no camina)", value: 5 },
                { label: "10 - Camina con ayuda de 1 persona", value: 10 },
                { label: "15 - Independiente (puede usar bastón/muletas)", value: 15 }
            ]
        },
        {
            id: "escaleras",
            text: "10. Escaleras",
            type: "single_choice",
            options: [
                { label: "0 - Incapaz", value: 0 },
                { label: "5 - Necesita ayuda (física, verbal)", value: 5 },
                { label: "10 - Independiente", value: 10 }
            ]
        }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 20, label: "Dependencia Total", color: "red" },
            { min: 21, max: 60, label: "Dependencia Severa", color: "orange" },
            { min: 61, max: 90, label: "Dependencia Moderada", color: "yellow" },
            { min: 91, max: 99, label: "Dependencia Leve", color: "green" },
            { min: 100, max: 100, label: "Independencia Total", color: "green" }
        ]
    }
}
