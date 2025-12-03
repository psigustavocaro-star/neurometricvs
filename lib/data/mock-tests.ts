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

export const mockTests: Test[] = [
    // Neurodesarrollo
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
        id: "q-chat",
        name: "Q-CHAT",
        description: "Cuestionario cuantitativo para la detección de rasgos autistas. Ref: Allison, C., et al. (2008)",
        category: "Neurodesarrollo",
        type: "Autismo",
        duration: "5-10 min",
        questions: 25,
        ageRange: "18-24 meses"
    },
    {
        id: "cast",
        name: "CAST",
        description: "Evaluación de rasgos del espectro autista en niños de edad escolar. Ref: Scott, F. J., et al. (2002)",
        category: "Neurodesarrollo",
        type: "Autismo",
        duration: "10-15 min",
        questions: 37,
        ageRange: "4-11 años"
    },

    // TDAH
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
        id: "vanderbilt-profesores",
        name: "Vanderbilt (Profesores)",
        description: "Evaluación de síntomas de TDAH y rendimiento académico en el aula. Ref: Wolraich, M. L., et al. (2003)",
        category: "TDAH",
        type: "Escuela",
        duration: "10-15 min",
        questions: 43,
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
        id: "wurs",
        name: "WURS",
        description: "Evaluación retrospectiva de síntomas de TDAH en la infancia. Ref: Ward, M. F., et al. (1993)",
        category: "TDAH",
        type: "Retrospectivo",
        duration: "10-15 min",
        questions: 25,
        ageRange: "18+ años"
    },

    // Problemas Psicosociales / Conducta
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

    // Ansiedad
    {
        id: "scared-ninos",
        name: "SCARED (Niños)",
        description: "Autoreporte para evaluar trastornos de ansiedad en niños y adolescentes. Ref: Birmaher, B., et al. (1997)",
        category: "Ansiedad",
        type: "Autoreporte",
        duration: "10-15 min",
        questions: 41,
        ageRange: "8-18 años"
    },
    {
        id: "scared-padres",
        name: "SCARED (Padres)",
        description: "Reporte de padres para evaluar trastornos de ansiedad en sus hijos. Ref: Birmaher, B., et al. (1997)",
        category: "Ansiedad",
        type: "Heteroreporte",
        duration: "10-15 min",
        questions: 41,
        ageRange: "8-18 años"
    },
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
        description: "Escala de autoevaluación para medir niveles de ansiedad. Ref: Zung, W. W. (1971)",
        category: "Ansiedad",
        type: "Autoescala",
        duration: "5-10 min",
        questions: 20,
        ageRange: "18+ años"
    },
    {
        id: "goldberg-eadg",
        name: "Goldberg (EADG)",
        description: "Escala para detectar ansiedad y depresión en atención primaria. Ref: Goldberg, D., et al. (1988)",
        category: "Ansiedad",
        type: "Depresión",
        duration: "5-10 min",
        questions: 18,
        ageRange: "18+ años"
    },

    // Depresión
    {
        id: "ces-dc",
        name: "CES-DC",
        description: "Evaluación de sintomatología depresiva en niños y adolescentes. Ref: Weissman, M. M., et al. (1980)",
        category: "Depresión",
        type: "Infantil",
        duration: "10 min",
        questions: 20,
        ageRange: "6-17 años"
    },
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
        id: "zung-sds",
        name: "Zung (SDS)",
        description: "Escala de autoevaluación para cuantificar síntomas depresivos. Ref: Zung, W. W. (1965)",
        category: "Depresión",
        type: "Autoescala",
        duration: "5-10 min",
        questions: 20,
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
    {
        id: "cornell",
        name: "Cornell",
        description: "Evaluación de signos y síntomas de depresión en personas con demencia. Ref: Alexopoulos, G. S., et al.",
        category: "Depresión",
        type: "Demencia",
        duration: "10-15 min",
        questions: 19,
        ageRange: "Demencia"
    },

    // Bipolaridad / Manía
    {
        id: "mdq",
        name: "MDQ",
        description: "Cuestionario para el cribado de trastornos del espectro bipolar. Ref: Hirschfeld, R. M., et al. (2000)",
        category: "Bipolaridad",
        type: "Espectro",
        duration: "5-10 min",
        questions: 13,
        ageRange: "18+ años"
    },
    {
        id: "asrm",
        name: "ASRM (Altman)",
        description: "Escala breve para evaluar la presencia y severidad de manía. Ref: Altman, E. G., et al. (1997)",
        category: "Bipolaridad",
        type: "Manía",
        duration: "5-10 min",
        questions: 5,
        ageRange: "18+ años"
    },
    {
        id: "bsds",
        name: "BSDS",
        description: "Escala para mejorar la detección del espectro bipolar. Ref: Ghaemi, S. N., et al. (2005)",
        category: "Bipolaridad",
        type: "Diagnóstico",
        duration: "10-15 min",
        questions: 19,
        ageRange: "18+ años"
    },

    // Autoestima / Bienestar / Personalidad
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
        id: "swls",
        name: "SWLS",
        description: "Medida global de la satisfacción con la vida. Ref: Diener, E., et al. (1985)",
        category: "Bienestar",
        type: "Satisfacción",
        duration: "5 min",
        questions: 5,
        ageRange: "18+ años"
    },
    {
        id: "lot-r",
        name: "LOT-R",
        description: "Evaluación de la disposición al optimismo. Ref: Scheier, M. F., et al. (1994)",
        category: "Personalidad",
        type: "Optimismo",
        duration: "5 min",
        questions: 10,
        ageRange: "18+ años"
    },
    {
        id: "autoeficacia",
        name: "Autoeficacia",
        description: "Evaluación de la percepción de capacidad para afrontar situaciones. Ref: Schwarzer & Jerusalem (1995)",
        category: "Personalidad",
        type: "Afrontamiento",
        duration: "5-10 min",
        questions: 10,
        ageRange: "18+ años"
    },
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
        id: "ipip-neo-120",
        name: "IPIP-NEO-120",
        description: "Evaluación detallada de los cinco grandes factores de personalidad. Ref: Goldberg, L. R. (1999)",
        category: "Personalidad",
        type: "Big Five",
        duration: "20-30 min",
        questions: 120,
        ageRange: "18+ años"
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

    // Funcionalidad Familiar / Pareja
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
    {
        id: "das-7",
        name: "DAS-7",
        description: "Escala breve de ajuste diádico para parejas. Ref: Hunsley, J., et al. (2001)",
        category: "Pareja",
        type: "Ajuste",
        duration: "5 min",
        questions: 7,
        ageRange: "Adultos"
    },

    // Consumo de Sustancias
    {
        id: "crafft-2.1",
        name: "CRAFFT 2.1",
        description: "Cribado de riesgos por consumo de alcohol y drogas en adolescentes. Ref: Knight, J. R., et al. (2002)",
        category: "Sustancias",
        type: "Alcohol/Drogas",
        duration: "5 min",
        questions: 6,
        ageRange: "12-21 años"
    },
    {
        id: "audit",
        name: "AUDIT",
        description: "Identificación de consumo de alcohol de riesgo o perjudicial. Ref: Saunders, J. B., et al. (1993)",
        category: "Sustancias",
        type: "Alcohol (OMS)",
        duration: "5-10 min",
        questions: 10,
        ageRange: "18+ años"
    },
    {
        id: "audit-c",
        name: "AUDIT-C",
        description: "Versión abreviada para detectar consumo de alcohol de riesgo. Ref: Bush, K., et al. (1998)",
        category: "Sustancias",
        type: "Alcohol (Breve)",
        duration: "2-5 min",
        questions: 3,
        ageRange: "18+ años"
    },
    {
        id: "cage",
        name: "CAGE",
        description: "Cuestionario breve para detectar problemas con el alcohol. Ref: Ewing, J. A. (1984)",
        category: "Sustancias",
        type: "Alcoholismo",
        duration: "2 min",
        questions: 4,
        ageRange: "18+ años"
    },
    {
        id: "dast-10",
        name: "DAST-10",
        description: "Cribado de abuso de drogas (excluyendo alcohol y tabaco). Ref: Skinner, H. A. (1982)",
        category: "Sustancias",
        type: "Drogas",
        duration: "5 min",
        questions: 10,
        ageRange: "18+ años"
    },
    {
        id: "assist-v3.0",
        name: "ASSIST v3.0",
        description: "Detección de consumo de alcohol, tabaco y otras sustancias. Ref: WHO ASSIST Working Group",
        category: "Sustancias",
        type: "General",
        duration: "10-15 min",
        questions: 8,
        ageRange: "18+ años"
    },
    {
        id: "fagerstrom",
        name: "Fagerström",
        description: "Evaluación de la dependencia a la nicotina. Ref: Heatherton, T. F., et al. (1991)",
        category: "Sustancias",
        type: "Nicotina",
        duration: "5 min",
        questions: 6,
        ageRange: "18+ años"
    },
    {
        id: "tweak",
        name: "TWEAK",
        description: "Detección de problemas de alcohol en mujeres (incluyendo gestantes). Ref: Russell, M. (1994)",
        category: "Sustancias",
        type: "Alcohol (Mujeres)",
        duration: "5 min",
        questions: 5,
        ageRange: "18+ años"
    },

    // Estrés / Trauma
    {
        id: "pss-14",
        name: "PSS-14",
        description: "Medida del grado en que las situaciones de vida son evaluadas como estresantes. Ref: Cohen, S., et al. (1983)",
        category: "Estrés",
        type: "Percibido",
        duration: "5-10 min",
        questions: 14,
        ageRange: "18+ años"
    },
    {
        id: "pss-10",
        name: "PSS-10",
        description: "Versión breve de la Escala de Estrés Percibido. Ref: Cohen, S., et al. (1983)",
        category: "Estrés",
        type: "Breve",
        duration: "5 min",
        questions: 10,
        ageRange: "18+ años"
    },
    {
        id: "pcl-5",
        name: "PCL-5",
        description: "Lista de verificación para síntomas de Estrés Postraumático (DSM-5). Ref: Weathers, F. W., et al. (2013)",
        category: "Trauma",
        type: "Estrés Postraumático",
        duration: "10-15 min",
        questions: 20,
        ageRange: "18+ años"
    },
    {
        id: "ies-r",
        name: "IES-R",
        description: "Evaluación del malestar subjetivo por eventos traumáticos. Ref: Weiss, D. S. (2007)",
        category: "Trauma",
        type: "Impacto",
        duration: "10-15 min",
        questions: 22,
        ageRange: "18+ años"
    },
    {
        id: "k-10",
        name: "K-10 (Kessler)",
        description: "Medida de malestar psicológico inespecífico (ansiedad/depresión). Ref: Kessler, R. C., et al. (2002)",
        category: "Malestar",
        type: "Psicológico",
        duration: "5 min",
        questions: 10,
        ageRange: "18+ años"
    },
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

    // Cognitivo / Demencia / Adulto Mayor
    {
        id: "pfeiffer",
        name: "Pfeiffer (SPMSQ)",
        description: "Cuestionario breve para valorar el estado mental en ancianos. Ref: Pfeiffer, E. (1975)",
        category: "Cognitivo",
        type: "Deterioro",
        duration: "5 min",
        questions: 10,
        ageRange: "65+ años"
    },
    {
        id: "mini-cog",
        name: "Mini-Cog",
        description: "Herramienta rápida para detectar deterioro cognitivo. Ref: Borson, S., et al. (2000)",
        category: "Cognitivo",
        type: "Demencia (Rápido)",
        duration: "5 min",
        questions: 3,
        ageRange: "65+ años"
    },
    {
        id: "ad8",
        name: "AD8",
        description: "Entrevista a informante para distinguir envejecimiento normal de demencia. Ref: Galvin, J. E., et al. (2005)",
        category: "Cognitivo",
        type: "Demencia (Informante)",
        duration: "5 min",
        questions: 8,
        ageRange: "65+ años"
    },
    {
        id: "iqcode",
        name: "IQCODE",
        description: "Cuestionario a informante sobre el declive cognitivo en ancianos. Ref: Jorm, A. F. (1994)",
        category: "Cognitivo",
        type: "Declive",
        duration: "10-15 min",
        questions: 16,
        ageRange: "65+ años"
    },
    {
        id: "sage",
        name: "SAGE",
        description: "Examen autoadministrado para detectar deterioro cognitivo temprano. Ref: Scharre, D. W., et al. (2010)",
        category: "Cognitivo",
        type: "Gerocognitivo",
        duration: "15-20 min",
        questions: 12,
        ageRange: "Adulto Mayor"
    },
    {
        id: "barthel",
        name: "Barthel",
        description: "Evaluación de la independencia en Actividades de la Vida Diaria (AVD). Ref: Mahoney & Barthel (1965)",
        category: "Funcionalidad",
        type: "AVD Básicas",
        duration: "5-10 min",
        questions: 10,
        ageRange: "Adulto Mayor"
    },
    {
        id: "katz",
        name: "Katz",
        description: "Valoración de la independencia en actividades básicas. Ref: Katz, S., et al. (1963)",
        category: "Funcionalidad",
        type: "Independencia",
        duration: "5-10 min",
        questions: 6,
        ageRange: "Adulto Mayor"
    },
    {
        id: "lawton-brody",
        name: "Lawton & Brody",
        description: "Evaluación de Actividades Instrumentales de la Vida Diaria. Ref: Lawton & Brody (1969)",
        category: "Funcionalidad",
        type: "AVD Instrumentales",
        duration: "5-10 min",
        questions: 8,
        ageRange: "Adulto Mayor"
    },
    {
        id: "zarit",
        name: "Zarit",
        description: "Evaluación de la carga percibida por el cuidador. Ref: Zarit, S. H., et al. (1980)",
        category: "Cuidadores",
        type: "Sobrecarga",
        duration: "10-15 min",
        questions: 22,
        ageRange: "Cuidadores"
    },

    // Sexualidad / Otros
    {
        id: "iief-5",
        name: "IIEF-5",
        description: "Evaluación de la función eréctil en hombres. Ref: Rosen, R. C., et al. (1997)",
        category: "Sexualidad",
        type: "Función Eréctil",
        duration: "5 min",
        questions: 5,
        ageRange: "Hombres 18+"
    },
    {
        id: "fsfi-6",
        name: "FSFI-6",
        description: "Evaluación del funcionamiento sexual femenino. Ref: Rosen, R., et al. (2000)",
        category: "Sexualidad",
        type: "Función Sexual Fem",
        duration: "5 min",
        questions: 6,
        ageRange: "Mujeres 18+"
    },
    {
        id: "eq-5d-3l",
        name: "EQ-5D-3L",
        description: "Instrumento estandarizado para medir la calidad de vida relacionada con la salud. Ref: EuroQol Group (1990)",
        category: "Calidad de Vida",
        type: "General",
        duration: "5 min",
        questions: 5,
        ageRange: "18+ años"
    },
    {
        id: "isi",
        name: "ISI",
        description: "Evaluación de la naturaleza, severidad e impacto del insomnio. Ref: Morin, C. M. (1993)",
        category: "Sueño",
        type: "Insomnio",
        duration: "5 min",
        questions: 7,
        ageRange: "18+ años"
    },
    {
        id: "stop-bang",
        name: "STOP-Bang",
        description: "Cribado para la Apnea Obstructiva del Sueño. Ref: Chung, F., et al. (2008)",
        category: "Sueño",
        type: "Apnea",
        duration: "2-5 min",
        questions: 8,
        ageRange: "18+ años"
    }
]
