import { TestDefinition } from "@/types/test"

// Opciones para ítems directos (mayor valor = mayor impulsividad)
const optionsDirect = [
    { label: "Raramente o nunca", value: 1 },
    { label: "Ocasionalmente", value: 2 },
    { label: "A menudo", value: 3 },
    { label: "Siempre o casi siempre", value: 4 }
]

// Opciones para ítems inversos (menor valor = mayor impulsividad)
const optionsReverse = [
    { label: "Raramente o nunca", value: 4 },
    { label: "Ocasionalmente", value: 3 },
    { label: "A menudo", value: 2 },
    { label: "Siempre o casi siempre", value: 1 }
]

export const bis11: TestDefinition = {
    id: "bis-11",
    title: "Escala de Impulsividad de Barratt (BIS-11)",
    description: "Instrumento desarrollado por Patton, Stanford y Barratt (1995) para evaluar la impulsividad como rasgo de personalidad. Es la escala de impulsividad más utilizada en investigación y clínica.",
    instructions: "Las personas son diferentes en cuanto a la forma en que se comportan y piensan en distintas situaciones. Esta es una prueba para medir algunas de las formas en que usted actúa y piensa. No se detenga demasiado tiempo en ninguna de las oraciones. Responda rápida y honestamente.",
    authors: "Patton, J.H., Stanford, M.S., & Barratt, E.S. (1995)",
    reference: "Patton, J.H., Stanford, M.S., & Barratt, E.S. (1995). Factor structure of the Barratt Impulsiveness Scale. Journal of Clinical Psychology, 51(6), 768-774.",
    questions: [
        // Ítems de Impulsividad No Planeada
        { id: "q1", text: "Planifico mis tareas con cuidado", type: "single_choice", options: optionsReverse },
        { id: "q2", text: "Hago las cosas sin pensarlas", type: "single_choice", options: optionsDirect },
        { id: "q3", text: "Casi nunca me tomo las cosas a pecho (no me perturbo con facilidad)", type: "single_choice", options: optionsReverse },
        { id: "q4", text: "Mis pensamientos pueden tener gran velocidad (tengo pensamientos que van muy rápido en mi mente)", type: "single_choice", options: optionsDirect },
        { id: "q5", text: "Planifico mis viajes con antelación", type: "single_choice", options: optionsReverse },
        { id: "q6", text: "Soy una persona con autocontrol", type: "single_choice", options: optionsReverse },
        { id: "q7", text: "Me concentro con facilidad (se me hace fácil concentrarme)", type: "single_choice", options: optionsReverse },
        { id: "q8", text: "Ahorro con regularidad", type: "single_choice", options: optionsReverse },
        { id: "q9", text: "Se me hace difícil estar quieto/a por largos periodos de tiempo", type: "single_choice", options: optionsDirect },
        { id: "q10", text: "Pienso las cosas cuidadosamente", type: "single_choice", options: optionsReverse },
        { id: "q11", text: "Planifico para tener un trabajo fijo (me esfuerzo por asegurarme de que tendré dinero para pagar mis gastos)", type: "single_choice", options: optionsReverse },
        { id: "q12", text: "Digo las cosas sin pensarlas", type: "single_choice", options: optionsDirect },
        { id: "q13", text: "Me gusta pensar sobre problemas complicados (me gusta pensar sobre problemas complejos)", type: "single_choice", options: optionsReverse },
        { id: "q14", text: "Cambio de trabajo frecuentemente (no me quedo en el mismo trabajo por largos períodos de tiempo)", type: "single_choice", options: optionsDirect },
        { id: "q15", text: "Actúo impulsivamente", type: "single_choice", options: optionsDirect },
        { id: "q16", text: "Me aburro con facilidad tratando de resolver problemas en mi mente (me aburre pensar en algo por demasiado tiempo)", type: "single_choice", options: optionsDirect },
        { id: "q17", text: "Visito al médico y al dentista con regularidad", type: "single_choice", options: optionsReverse },
        { id: "q18", text: "Hago las cosas en el momento en que se me ocurren", type: "single_choice", options: optionsDirect },
        { id: "q19", text: "Soy una persona que piensa sin distraerse (puedo enfocar mi mente en una sola cosa por mucho tiempo)", type: "single_choice", options: optionsReverse },
        { id: "q20", text: "Cambio de vivienda a menudo (me mudo con frecuencia o no me gusta vivir en el mismo sitio por mucho tiempo)", type: "single_choice", options: optionsDirect },
        { id: "q21", text: "Compro cosas impulsivamente", type: "single_choice", options: optionsDirect },
        { id: "q22", text: "Termino lo que empiezo", type: "single_choice", options: optionsReverse },
        { id: "q23", text: "Camino y me muevo con rapidez", type: "single_choice", options: optionsDirect },
        { id: "q24", text: "Resuelvo los problemas experimentando (resuelvo los problemas empleando una posible solución y viendo si funciona)", type: "single_choice", options: optionsDirect },
        { id: "q25", text: "Gasto en efectivo o a crédito más de lo que gano (gasto más de lo que gano)", type: "single_choice", options: optionsDirect },
        { id: "q26", text: "Hablo rápido", type: "single_choice", options: optionsDirect },
        { id: "q27", text: "Tengo pensamientos extraños cuando estoy pensando (a veces tengo pensamientos irrelevantes cuando pienso)", type: "single_choice", options: optionsDirect },
        { id: "q28", text: "Me interesa más el presente que el futuro", type: "single_choice", options: optionsDirect },
        { id: "q29", text: "Me siento inquieto/a en clases o charlas (me siento inquieto/a si tengo que oír a alguien hablar demasiado tiempo)", type: "single_choice", options: optionsDirect },
        { id: "q30", text: "Planifico el futuro (me interesa más el futuro que el presente)", type: "single_choice", options: optionsReverse }
    ],
    subscales: [
        {
            id: "cognitive",
            name: "Impulsividad Cognitiva (Atencional)",
            questionIds: ["q4", "q7", "q10", "q13", "q16", "q19", "q24", "q27"],
            scoringType: "sum",
            description: "Evalúa la capacidad para mantener la atención y concentración, así como la tendencia a tomar decisiones rápidas."
        },
        {
            id: "motor",
            name: "Impulsividad Motora",
            questionIds: ["q2", "q3", "q6", "q9", "q12", "q15", "q18", "q21", "q22", "q23", "q25", "q26"],
            scoringType: "sum",
            description: "Evalúa la tendencia a actuar sin pensar, dejándose llevar por el impulso del momento."
        },
        {
            id: "nonplanning",
            name: "Impulsividad No Planeada",
            questionIds: ["q1", "q5", "q8", "q11", "q14", "q17", "q20", "q28", "q29", "q30"],
            scoringType: "sum",
            description: "Evalúa la falta de planificación y previsión, así como la orientación hacia el presente."
        }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 30, max: 51, label: "Impulsividad normal", color: "green", description: "Puntuación dentro del rango normativo. No se evidencian niveles significativos de impulsividad." },
            { min: 52, max: 71, label: "Impulsividad moderada", color: "yellow", description: "Puntuación ligeramente elevada. Se sugiere evaluación de conductas específicas y monitoreo." },
            { min: 72, max: 120, label: "Impulsividad alta", color: "red", description: "Puntuación elevada que indica dificultades significativas en el control de impulsos. Se recomienda intervención terapéutica focalizada." }
        ],
        interpretation: `
## Interpretación Clínica del BIS-11

La Escala de Impulsividad de Barratt (BIS-11) es el instrumento de referencia para la evaluación de la impulsividad como rasgo de personalidad. Desarrollada por Patton, Stanford y Barratt (1995), evalúa tres dimensiones de la impulsividad.

### Estructura Factorial (3 Subescalas)

1. **Impulsividad Cognitiva/Atencional**
   - Dificultad para mantener la atención
   - Tendencia a la distracción
   - Decisiones rápidas sin reflexión

2. **Impulsividad Motora**
   - Actuar sin pensar
   - Inquietud motora
   - Falta de autocontrol conductual

3. **Impulsividad No Planeada**
   - Falta de planificación
   - Orientación al presente
   - Desinterés por las consecuencias futuras

### Puntos de Corte Clínico
- **30-51 puntos**: Impulsividad normal
- **52-71 puntos**: Impulsividad moderada/límite
- **72-120 puntos**: Impulsividad alta (clínicamente significativa)

### Asociaciones Clínicas
- TDAH en adultos
- Trastornos de personalidad (límite, antisocial)
- Conductas adictivas
- Trastornos de control de impulsos
- Conducta suicida

### Referencias
- Patton, J.H., Stanford, M.S., & Barratt, E.S. (1995). Factor structure of the Barratt Impulsiveness Scale. Journal of Clinical Psychology, 51(6), 768-774.
- Stanford, M.S., et al. (2009). Fifty years of the Barratt Impulsiveness Scale. Personality and Individual Differences, 47(5), 385-395.
- Oquendo, M.A., et al. (2001). Spanish adaptation of the Barratt Impulsiveness Scale. European Psychiatry, 16(7), 406-413.
        `
    }
}
