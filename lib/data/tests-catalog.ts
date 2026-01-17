export interface Test {
    id: string
    name: string
    description: string
    category: string
    type?: string
    duration: string
    questions: number
    ageRange: string
    isFavorite?: boolean
    isPremium?: boolean
}

export const testsCatalog: Test[] = [
    // --- TDAH ---
    {
        id: "snap-iv",
        name: "SNAP-IV",
        description: "Escala para evaluar síntomas de TDAH y Trastorno Negativista Desafiante. Ref: Swanson, J. M. (1992)",
        category: "TDAH",
        type: "Oposicionismo",
        duration: "10-15 min",
        questions: 18,
        ageRange: "6-18 años"
    },
    {
        id: "vanderbilt-padres",
        name: "Vanderbilt (Padres)",
        description: "Evaluación de síntomas de TDAH y comorbilidades desde la perspectiva de los padres. Ref: Wolraich, M. L., et al. (2003)",
        category: "TDAH",
        type: "Hogar",
        duration: "10-15 min",
        questions: 55,
        ageRange: "6-12 años"
    },
    {
        id: "asrs-v1.1",
        name: "ASRS-v1.1",
        description: "Escala de autoreporte para el cribado de síntomas de TDAH en adultos. Ref: Kessler, R. C., et al. (2005)",
        category: "TDAH",
        type: "Adultos",
        duration: "5 min",
        questions: 18,
        ageRange: "18+ años"
    },
    {
        id: "caras-r",
        name: "CARAS-R",
        description: "Test de Percepción de Diferencias para evaluar atención visual y control de impulsividad. Ref: Thurstone, L.L. y Yela, M. (2012)",
        category: "TDAH",
        type: "Atención Visual",
        duration: "3 min",
        questions: 60,
        isFavorite: true,
        ageRange: "6-18 años"
    },

    // --- Neurodesarrollo / Conducta ---
    {
        id: "m-chat-r-f",
        name: "M-CHAT-R/F",
        description: "Detección temprana de riesgo de autismo (TEA). Ref: Robins, D. L., et al. (2009)",
        category: "Neurodesarrollo",
        type: "Autismo",
        duration: "5-10 min",
        questions: 20,
        ageRange: "16-30 meses"
    },
    {
        id: "wong-baker",
        name: "Wong-Baker FACES",
        description: "Escala visual de dolor utilizando caras. Ideal para niños y pacientes con dificultades comunicativas. Ref: Wong, D. & Baker, C. (1988)",
        category: "Neurodesarrollo",
        type: "Escala Visual",
        duration: "2 min",
        questions: 1,
        ageRange: "3+ años"
    },
    {
        id: "peds",
        name: "PEDS",
        description: "Evaluación de padres sobre el estado de desarrollo. Detecta problemas de desarrollo y comportamiento. Ref: Glascoe, F. P. (1997)",
        category: "Neurodesarrollo",
        type: "Cuestionario",
        duration: "5-10 min",
        questions: 10,
        ageRange: "0-8 años"
    },
    {
        id: "psc-17",
        name: "PSC-17",
        description: "Cribado breve de problemas psicosociales, internalizantes y externalizantes. Ref: Jellinek, M. S., et al. (1988)",
        category: "Conducta",
        type: "Psicosocial",
        duration: "5-10 min",
        questions: 17,
        ageRange: "4-16 años"
    },

    // --- Ansiedad ---
    {
        id: "gad-7",
        name: "GAD-7",
        description: "Medida breve para evaluar la severidad del Trastorno de Ansiedad Generalizada. Ref: Spitzer, R. L., et al. (2006)",
        category: "Ansiedad",
        type: "Generalizada",
        duration: "5 min",
        questions: 7,
        isFavorite: true,
        ageRange: "18+ años"
    },
    {
        id: "gad-2",
        name: "GAD-2",
        description: "Versión ultra-breve para el cribado inicial de ansiedad. Ref: Kroenke, K., et al. (2007)",
        category: "Ansiedad",
        type: "Breve",
        duration: "2 min",
        questions: 2,
        ageRange: "18+ años"
    },
    {
        id: "zung-sas",
        name: "Zung (SAS)",
        description: "Escala de autoevaluación para medir niveles de ansiedad psíquica y somática. Ref: Zung, W. W. (1971)",
        category: "Ansiedad",
        type: "Autoescala",
        duration: "5-10 min",
        questions: 20,
        ageRange: "18+ años"
    },
    {
        id: "goldberg",
        name: "Goldberg (EADG)",
        description: "Escala de Ansiedad y Depresión. Cribado de 18 ítems para detectar malestar psíquico en atención primaria. Ref: Goldberg, D. (1988)",
        category: "Ansiedad",
        type: "Cribado",
        duration: "5-10 min",
        questions: 18,
        ageRange: "18+ años"
    },
    {
        id: "pss-14",
        name: "PSS-14 (Estrés Percibido)",
        description: "Versión completa de la escala para evaluar el nivel de estrés percibido en el último mes. Ref: Cohen, S. (1983)",
        category: "Ansiedad",
        type: "Escala",
        duration: "5 min",
        questions: 14,
        ageRange: "12+ años"
    },
    {
        id: "c-ssrs",
        name: "C-SSRS (Riesgo Suicida)",
        description: "Standard de oro para evaluar severidad de ideación y comportamiento suicida. Versión de cribado. Ref: Posner, K. (2011)",
        category: "Riesgo",
        type: "Protocolo",
        duration: "5 min",
        questions: 6,
        ageRange: "12+ años"
    },
    {
        id: "mdq",
        name: "MDQ (Bipolar)",
        description: "Cuestionario de Trastornos del Humor. Cribado para Trastorno Bipolar. Ref: Hirschfeld, R. (2000)",
        category: "Ánimo",
        type: "Cuestionario",
        duration: "5 min",
        questions: 15,
        ageRange: "18+ años"
    },
    {
        id: "scared",
        name: "SCARED (Padres)",
        description: "Reporte de padres para evaluar trastornos de ansiedad en sus hijos. 5 subescalas: Pánico, TAG, Separación, Social, Escolar. Ref: Birmaher, B., et al. (1997)",
        category: "Ansiedad",
        type: "Heteroreporte",
        duration: "10-15 min",
        questions: 41,
        isFavorite: true,
        ageRange: "8-18 años"
    },
    {
        id: "bis-11",
        name: "BIS-11",
        description: "Escala para evaluar la impulsividad. Ref: Patton, J. H., et al. (1995)",
        category: "Personalidad",
        type: "Impulsividad",
        duration: "10-15 min",
        questions: 30,
        ageRange: "18+ años"
    },

    // --- Depresión ---
    {
        id: "phq-9",
        name: "PHQ-9",
        description: "Evalúa la presencia y severidad de síntomas depresivos. Ref: Kroenke, K., et al. (2001)",
        category: "Depresión",
        type: "Severidad",
        duration: "5-10 min",
        questions: 9,
        isFavorite: true,
        ageRange: "18+ años"
    },
    {
        id: "phq-2",
        name: "PHQ-2",
        description: "Cribado ultra-breve para depresión mayor. Ref: Kroenke, K., et al. (2003)",
        category: "Depresión",
        type: "Screening",
        duration: "2 min",
        questions: 2,
        ageRange: "18+ años"
    },
    {
        id: "epds",
        name: "EPDS (Edimburgo)",
        description: "Detección de depresión posparto y perinatal. Ref: Cox, J. L., et al. (1987)",
        category: "Depresión",
        type: "Perinatal",
        duration: "5-10 min",
        questions: 10,
        ageRange: "Gestantes"
    },
    {
        id: "gds-15",
        name: "GDS-15",
        description: "Evaluación de depresión específicamente diseñada para adultos mayores. Ref: Yesavage, J. A., et al. (1983)",
        category: "Depresión",
        type: "Geriátrica",
        duration: "5-10 min",
        questions: 15,
        ageRange: "60+ años"
    },

    // --- Somatización ---
    {
        id: "phq-15",
        name: "PHQ-15",
        description: "Evaluación de la severidad de síntomas somáticos. Ref: Kroenke, K., et al. (2002)",
        category: "Somatización",
        type: "General",
        duration: "5-10 min",
        questions: 15,
        ageRange: "18+ años"
    },

    // --- Bienestar / Otros ---
    {
        id: "who-5",
        name: "WHO-5",
        description: "Índice de bienestar general de la OMS. Ref: WHO (1998)",
        category: "Bienestar",
        type: "General",
        duration: "2-5 min",
        questions: 5,
        ageRange: "18+ años"
    },
    {
        id: "rosenberg",
        name: "Escala de Rosenberg",
        description: "Instrumento para evaluar la autoestima global. Ref: Rosenberg, M. (1965)",
        category: "Personalidad",
        type: "Autoestima",
        duration: "5 min",
        questions: 10,
        ageRange: "12-18+ años"
    },
    {
        id: "apgar-familiar",
        name: "APGAR Familiar",
        description: "Evaluación de la percepción de la funcionalidad familiar. Ref: Smilkstein, G. (1978)",
        category: "Familia",
        type: "Funcionalidad",
        duration: "5 min",
        questions: 5,
        ageRange: "8-12+ años"
    },

    // --- Cognitivo / Geriátrico ---
    {
        id: "pfeiffer",
        name: "Pfeiffer (SPMSQ)",
        description: "Cuestionario breve para valorar el estado mental y deterioro cognitivo en ancianos. Ref: Pfeiffer, E. (1975)",
        category: "Cognitivo",
        type: "Deterioro",
        duration: "5-10 min",
        questions: 10,
        ageRange: "65+ años"
    },
    {
        id: "slums",
        name: "SLUMS",
        description: "Evaluación del estado mental para detectar deterioro cognitivo leve y demencia. Ref: Tariq, S. H. (2006)",
        category: "Cognitivo",
        type: "Deterioro",
        duration: "7-10 min",
        questions: 11,
        ageRange: "18+ años"
    },
    {
        id: "ace-iii",
        name: "ACE-III",
        description: "Examen cognitivo multidominio (Atención, Memoria, Fluidez, Lenguaje, Visuoespacial). Ref: Hsieh, S. (2013)",
        category: "Cognitivo",
        type: "Completo",
        duration: "15-20 min",
        questions: 21,
        ageRange: "18+ años"
    },
    {
        id: "cage",
        name: "CAGE (Alcohol)",
        description: "Cribado breve para detectar problemas con el alcohol (Cut-down, Annoyed, Guilty, Eye-opener). Ref: Ewing, J. A. (1984)",
        category: "Adicciones",
        type: "Cribado",
        duration: "1 min",
        questions: 4,
        ageRange: "16+ años"
    },
    {
        id: "audit",
        name: "AUDIT",
        description: "Prueba de Identificación de Trastornos por Consumo de Alcohol (OMS). Detecta consumo de riesgo, perjudicial y dependencia. Ref: Saunders, J. B. (1993)",
        category: "Adicciones",
        type: "Escala",
        duration: "3-5 min",
        questions: 10,
        ageRange: "18+ años"
    },
    // --- Fonoaudiología & T. Ocupacional ---
    {
        id: "eat-10",
        name: "EAT-10",
        description: "Herramienta de autoevaluación para riesgo de disfagia (dificultad deglutoria). Ref: Belafsky, P. C. (2008)",
        category: "Fonoaudiología",
        type: "Disfagia",
        duration: "5 min",
        questions: 10,
        ageRange: "18+ años"
    },
    {
        id: "barthel",
        name: "Índice de Barthel",
        description: "Evaluación de la independencia en Actividades Básicas de la Vida Diaria (ABVD). Ref: Mahoney, F. I. (1965)",
        category: "Funcionalidad",
        type: "AVD Básicas",
        duration: "5-10 min",
        questions: 10,
        ageRange: "Adultos/Geriatría"
    },
    {
        id: "lawton-brody",
        name: "Lawton & Brody",
        description: "Evaluación de la independencia en Actividades Instrumentales de la Vida Diaria (AIVD). Ref: Lawton, M. P. (1969)",
        category: "Funcionalidad",
        type: "AVD Instrum.",
        duration: "5-10 min",
        questions: 8,
        ageRange: "Adultos/Geriatría"
    }
]
