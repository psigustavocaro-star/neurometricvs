import { TestDefinition } from "@/types/test"

const yesNo = [
    { label: "No", value: 0 },
    { label: "Sí", value: 1 }
]

const impairmentOptions = [
    { label: "Sin problemas", value: 0 },
    { label: "Problemas menores", value: 1 },
    { label: "Problemas moderados", value: 2 },
    { label: "Problemas serios", value: 3 }
]

export const mdq: TestDefinition = {
    id: "mdq",
    title: "MDQ (Cuestionario de Trastornos del Humor)",
    description: "Instrumento de cribado para el trastorno bipolar.",
    instructions: "Responda las siguientes preguntas sobre cómo se ha sentido o comportado.",
    authors: "Hirschfeld, R. M., et al. (2000)",
    reference: "Hirschfeld, R. M., et al. (2000). Development and validation of a screening instrument for bipolar spectrum disorder: The Mood Disorder Questionnaire. American Journal of Psychiatry, 157(11), 1873-1875.",
    uiType: 'list',
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Trastornos del Humor',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados (Cribado Bipolar):**

**Criterios para Resultado POSITIVO:**
Deben cumplirse las 3 condiciones siguientes:
1. **Síntomas**: 7 o más respuestas "SÍ" en la Pregunta 1 (Items 1.1 - 1.13).
2. **Co-ocurrencia**: Respuesta "SÍ" a la Pregunta 2 (Ocurrieron al mismo tiempo).
3. **Disfuncionalidad**: Respuesta de "Problemas moderados" o "Problemas serios" en la Pregunta 3.

**Resultado del Paciente:**
- Síntomas reportados: **{score} / 13**
- ¿Ocurrieron al mismo tiempo?: **{q2_response}**
- Nivel de problemas causados: **{q3_response}**

**Conclusión:**
Si cumple los tres criterios, el cribado es **POSITIVO** para Trastorno del Espectro Bipolar y se recomienda evaluación psiquiátrica completa (SCID/MINI).
        `
    },
    subscales: [],
    questions: [
        { id: "note", text: "1. ¿Ha habido algún período de tiempo en el que no era usted mismo y...", type: "info" },
        { id: "q1_1", text: "...se sentía tan bien o tan excitado que otras personas pensaron que no era usted el de siempre o estaba tan excitado que se metió en líos?", type: "single_choice", options: yesNo },
        { id: "q1_2", text: "...estaba tan irritable que gritó a la gente o inició peleas o discusiones?", type: "single_choice", options: yesNo },
        { id: "q1_3", text: "...se sentía mucho más seguro de sí mismo que de costumbre?", type: "single_choice", options: yesNo },
        { id: "q1_4", text: "...dormía mucho menos que de costumbre y no echaba de menos el sueño?", type: "single_choice", options: yesNo },
        { id: "q1_5", text: "...estaba más hablador o hablaba más rápido de costumbre?", type: "single_choice", options: yesNo },
        { id: "q1_6", text: "...los pensamientos le venían muy rápido a la cabeza y no podía detenerlos?", type: "single_choice", options: yesNo },
        { id: "q1_7", text: "...se distraía tan fácilmente con las cosas de su alrededor que tenía problemas para concentrarse o continuar lo que estaba haciendo?", type: "single_choice", options: yesNo },
        { id: "q1_8", text: "...tenía mucha más energía que de costumbre?", type: "single_choice", options: yesNo },
        { id: "q1_9", text: "...era mucho más activo o hacía muchas más cosas que de costumbre?", type: "single_choice", options: yesNo },
        { id: "q1_10", text: "...era mucho más social o extravertido que de costumbre (ej. llamando a amigos en mitad de la noche)?", type: "single_choice", options: yesNo },
        { id: "q1_11", text: "...estaba mucho más interesado en el sexo que de costumbre?", type: "single_choice", options: yesNo },
        { id: "q1_12", text: "...hacía cosas que no eran habituales en usted o que los demás pensaban que eran excesivas, tontas o arriesgadas?", type: "single_choice", options: yesNo },
        { id: "q1_13", text: "...gastaba tanto dinero que usted o su familia tuvieron problemas?", type: "single_choice", options: yesNo },

        { id: "q2", text: "2. Si ha contestado SÍ a más de una de las preguntas anteriores, ¿han ocurrido varios de esos problemas al mismo tiempo?", type: "single_choice", options: yesNo },

        { id: "q3", text: "3. ¿Cuántos problemas le causaron estas situaciones (como imposibilidad de trabajar, problemas familiares, de dinero o legales, discusiones)?", type: "single_choice", options: impairmentOptions }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 6, label: "Negativo (Síntomas insuficientes)", color: "green" },
            { min: 7, max: 13, label: "Posible Positivo (Verificar condiciones 2 y 3)", color: "orange" }
        ]
    }
}
