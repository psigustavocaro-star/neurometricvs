export interface Resource {
    id: string;
    title: string;
    description: string;
    category: 'Psicoeducación' | 'Estimulación Cognitiva' | 'TCC' | 'Mindfulness' | 'Guías Clínicas' | 'DBT' | 'Otros' | 'Ansiedad' | 'Depresión' | 'Infanto-Juvenil';
    type: 'pdf' | 'word' | 'image' | 'video' | 'link' | 'interactive';
    url: string;
    thumbnail?: string;
    tags: string[];
}

export const resources: Resource[] = [
    // --- INTERACTIVE TOOLS (Existing & New) ---
    {
        id: 'cbt-thought-record',
        title: 'Registro de Pensamientos (Interactivo)',
        description: 'Herramienta digital para identificar, cuestionar y reestructurar pensamientos automáticos. Incluye modo de impresión.',
        category: 'TCC',
        type: 'interactive',
        url: '/dashboard/resources/cbt-thought-record',
        tags: ['tcc', 'ansiedad', 'depresión', 'reestructuración cognitiva']
    },
    {
        id: 'dbt-chain-analysis',
        title: 'Análisis en Cadena (Interactivo)',
        description: 'Formato DBT paso a paso para analizar conductas problemáticas, vulnerabilidades y soluciones.',
        category: 'DBT',
        type: 'interactive',
        url: '/dashboard/resources/dbt-chain-analysis',
        tags: ['dbt', 'regulación emocional', 'análisis conductual']
    },
    {
        id: 'grounding-54321',
        title: 'Técnica de Grounding 5-4-3-2-1',
        description: 'Ejercicio guiado interactivo para manejo de ansiedad y crisis de pánico.',
        category: 'Mindfulness',
        type: 'interactive',
        url: '/dashboard/resources/grounding-54321',
        tags: ['ansiedad', 'crisis', 'grounding', 'mindfulness']
    },

    // --- TCC (Terapia Cognitivo Conductual) ---
    { id: 'tcc-001', title: 'Hoja de Registro de Actividades Semanales', description: 'Planificador para activación conductual en depresión.', category: 'TCC', type: 'pdf', url: '#', tags: ['depresión', 'activación conductual'] },
    { id: 'tcc-002', title: 'Lista de Distorsiones Cognitivas Comunes', description: 'Guía ilustrada para identificar errores de pensamiento.', category: 'TCC', type: 'pdf', url: '#', tags: ['psicoeducación', 'pensamientos'] },
    { id: 'tcc-003', title: 'Experimento Conductual: Diseño y Registro', description: 'Formato para poner a prueba creencias limitantes.', category: 'TCC', type: 'pdf', url: '#', tags: ['creencias', 'experimentos'] },
    { id: 'tcc-004', title: 'Inventario de Situaciones de Ansiedad', description: 'Lista para jerarquizar situaciones temidas (Escalera del Miedo).', category: 'TCC', type: 'pdf', url: '#', tags: ['ansiedad', 'exposición'] },
    { id: 'tcc-005', title: 'Termómetro de las Emociones', description: 'Herramienta visual para identificar intensidad emocional.', category: 'TCC', type: 'image', url: '#', tags: ['emociones', 'niños'] },
    { id: 'tcc-006', title: 'Modelo ABC: Guía Explicativa', description: 'Explicación gráfica del modelo Acontecimiento-Creencia-Consecuencia.', category: 'TCC', type: 'image', url: '#', tags: ['psicoeducación'] },
    { id: 'tcc-007', title: 'Cuestionario de Creencias Centrales', description: 'Herramienta para profundizar en esquemas maladaptativos.', category: 'TCC', type: 'pdf', url: '#', tags: ['esquemas', 'creencias'] },
    { id: 'tcc-008', title: 'Tarjeta de Afrontamiento (Flashcard)', description: 'Plantilla para crear tarjetas con frases de afrontamiento.', category: 'TCC', type: 'pdf', url: '#', tags: ['afrontamiento', 'crisis'] },
    { id: 'tcc-009', title: 'Gráfico de Tarta de Responsabilidad', description: 'Ejercicio para reatribuir culpa y responsabilidad.', category: 'TCC', type: 'pdf', url: '#', tags: ['culpa', 'reatribución'] },
    { id: 'tcc-010', title: 'Registro de Logros Diarios', description: 'Para pacientes con depresión severa y baja autoeficacia.', category: 'TCC', type: 'pdf', url: '#', tags: ['depresión', 'autoestima'] },
    { id: 'tcc-011', title: 'Diario de Preocupaciones', description: 'Técnica de tiempo basura para manejo del GAD.', category: 'TCC', type: 'pdf', url: '#', tags: ['ansiedad', 'preocupación'] },
    { id: 'tcc-012', title: 'Hoja de Resolución de Problemas', description: 'Paso a paso para el entrenamiento en solución de problemas.', category: 'TCC', type: 'pdf', url: '#', tags: ['resolución problemas'] },

    // --- MINDFULNESS & RELAJACIÓN ---
    { id: 'mind-001', title: 'Audio: Escaneo Corporal (Body Scan)', description: 'Meditación guiada de 15 minutos para conciencia corporal.', category: 'Mindfulness', type: 'video', url: '#', tags: ['audio', 'relajación'] },
    { id: 'mind-002', title: 'Respiración Diafragmática: Guía Visual', description: 'Infografía paso a paso para enseñar respiración profunda.', category: 'Mindfulness', type: 'image', url: '#', tags: ['ansiedad', 'respiración'] },
    { id: 'mind-003', title: 'Ejercicio de la Uva Pasa (Eating Meditation)', description: 'Script para guiar ejercicio de alimentación consciente.', category: 'Mindfulness', type: 'pdf', url: '#', tags: ['alimentación', 'sentidos'] },
    { id: 'mind-004', title: 'Meditación de la Montaña', description: 'Script de visualización para estabilidad y fortaleza.', category: 'Mindfulness', type: 'pdf', url: '#', tags: ['visualización'] },
    { id: 'mind-005', title: 'Diario de Gratitud', description: 'Plantilla semanal para cultivar emociones positivas.', category: 'Mindfulness', type: 'pdf', url: '#', tags: ['gratitud', 'psicología positiva'] },
    { id: 'mind-006', title: 'Relajación Muscular Progresiva (Jacobson)', description: 'Guía para tensar y relajar grupos musculares.', category: 'Mindfulness', type: 'pdf', url: '#', tags: ['relajación', 'estrés'] },
    { id: 'mind-007', title: 'Audio: Espacio de Respiración de 3 Minutos', description: 'Práctica breve para emergencias emocionales.', category: 'Mindfulness', type: 'video', url: '#', tags: ['audio', 'crisis'] },
    { id: 'mind-008', title: 'Mandala para Colorear (Anti-estrés)', description: 'Recurso artístico para atención plena.', category: 'Mindfulness', type: 'pdf', url: '#', tags: ['arte', 'relajación'] },
    { id: 'mind-009', title: 'Cartas de Valores Personales', description: 'Set de tarjetas para trabajo de clarificación de valores (ACT).', category: 'Mindfulness', type: 'pdf', url: '#', tags: ['ACT', 'valores'] },
    { id: 'mind-010', title: 'Metáfora del Autobús (ACT)', description: 'Material ilustrado para explicar pensamientos intrusivos.', category: 'Mindfulness', type: 'pdf', url: '#', tags: ['ACT', 'metáforas'] },

    // --- ESTIMULACIÓN COGNITIVA ---
    { id: 'cog-001', title: 'Cuaderno de Estimulación: Atención', description: 'Ejercicios de cancelación y búsqueda visual.', category: 'Estimulación Cognitiva', type: 'pdf', url: '#', tags: ['atención', 'adulto mayor'] },
    { id: 'cog-002', title: 'Cuaderno de Estimulación: Memoria', description: 'Ejercicios de recuerdo diferido y pares asociados.', category: 'Estimulación Cognitiva', type: 'pdf', url: '#', tags: ['memoria', 'alzheimer'] },
    { id: 'cog-003', title: 'Cálculo y Funciones Ejecutivas', description: 'Problemas de lógica y manejo de dinero simulado.', category: 'Estimulación Cognitiva', type: 'pdf', url: '#', tags: ['funciones ejecutivas'] },
    { id: 'cog-004', title: 'Láminas de Denominación (Boston)', description: 'Imágenes para trabajar anomia y lenguaje.', category: 'Estimulación Cognitiva', type: 'image', url: '#', tags: ['lenguaje', 'afasia'] },
    { id: 'cog-005', title: 'Laberintos de Dificultad Creciente', description: 'Para trabajar planificación y motricidad fina.', category: 'Estimulación Cognitiva', type: 'pdf', url: '#', tags: ['planificación'] },
    { id: 'cog-006', title: 'Secuenciación de Historietas', description: 'Ordenar eventos lógicos (Teoría de la Mente).', category: 'Estimulación Cognitiva', type: 'pdf', url: '#', tags: ['lógica', 'social'] },
    { id: 'cog-007', title: 'Sopa de Letras Temática: Emociones', description: 'Ejercicio lúdico de atención sostenida.', category: 'Estimulación Cognitiva', type: 'pdf', url: '#', tags: ['atención'] },
    { id: 'cog-008', title: 'Ejercicios de Gnosias Visuales', description: 'Reconocimiento de objetos superpuestos.', category: 'Estimulación Cognitiva', type: 'pdf', url: '#', tags: ['gnosias'] },

    // --- PSICOEDUCACIÓN & GUÍAS ---
    { id: 'edu-001', title: 'Higiene del Sueño: Reglas de Oro', description: 'Infografía para pacientes con insomnio.', category: 'Psicoeducación', type: 'pdf', url: '#', tags: ['sueño', 'insomnio'] },
    { id: 'edu-002', title: 'Neurobiología de la Ansiedad', description: 'Explicación sencilla del eje HHA y la amígdala.', category: 'Psicoeducación', type: 'video', url: '#', tags: ['cerebro', 'ansiedad'] },
    { id: 'edu-003', title: 'Ciclo de la Violencia', description: 'Material educativo para víctimas de VIF.', category: 'Psicoeducación', type: 'pdf', url: '#', tags: ['violencia', 'seguridad'] },
    { id: 'edu-004', title: 'Estilos de Apego en Adultos', description: 'Descripción de apegos seguro, ansioso y evitativo.', category: 'Psicoeducación', type: 'pdf', url: '#', tags: ['apego', 'pareja'] },
    { id: 'edu-005', title: 'Cómo Comunicar Malas Noticias', description: 'Protocolo SPIKES para profesionales de salud.', category: 'Guías Clínicas', type: 'pdf', url: '#', tags: ['profesional', 'comunicación'] },
    { id: 'edu-006', title: 'Guía de Manejo del Riesgo Suicida', description: 'Protocolo de evaluación e intervención en crisis.', category: 'Guías Clínicas', type: 'pdf', url: '#', tags: ['suicidio', 'crisis', 'profesional'] },
    { id: 'edu-007', title: 'Fármacos Antidepresivos: Guía Paciente', description: 'Efectos secundarios comunes y tiempos de acción.', category: 'Psicoeducación', type: 'pdf', url: '#', tags: ['farmacología'] },
    { id: 'edu-008', title: 'Técnicas de Comunicación Asertiva', description: 'Guía práctica con ejemplos de guiones DEEC.', category: 'Psicoeducación', type: 'pdf', url: '#', tags: ['habilidades sociales'] },
    { id: 'edu-009', title: 'Manejo de Rabietas (Padres)', description: 'Estrategias de regulación para niños pequeños.', category: 'Psicoeducación', type: 'pdf', url: '#', tags: ['padres', 'crianza'] },
    { id: 'edu-010', title: 'Entendiendo el TDAH', description: 'Folleto explicativo para colegios y familias.', category: 'Psicoeducación', type: 'pdf', url: '#', tags: ['tdah', 'escolar'] },

    // --- INFANTO-JUVENIL ---
    { id: 'inf-001', title: 'El Monstruo de Colores: Actividades', description: 'Fichas para trabajar identificación emocional.', category: 'Infanto-Juvenil', type: 'pdf', url: '#', tags: ['emociones', 'niños'] },
    { id: 'inf-002', title: 'Juego de la Oca de las Emociones', description: 'Tablero imprimible para psicoterapia infantil.', category: 'Infanto-Juvenil', type: 'image', url: '#', tags: ['juego', 'terapia'] },
    { id: 'inf-003', title: 'Contrato Conductual Adolescente', description: 'Plantilla de acuerdo entre padres e hijos.', category: 'Infanto-Juvenil', type: 'word', url: '#', tags: ['conducta', 'adolescentes'] },
    { id: 'inf-004', title: 'Técnica de la Tortuga', description: 'Cuento y técnica para autocontrol en niños.', category: 'Infanto-Juvenil', type: 'video', url: '#', tags: ['autocontrol'] },
    { id: 'inf-005', title: 'Economía de Fichas: Kit Imprimible', description: 'Tablas y fichas para reforzamiento positivo.', category: 'Infanto-Juvenil', type: 'pdf', url: '#', tags: ['conducta'] },

    // --- DBT ---
    { id: 'dbt-001', title: 'Habilidades TIP (Crisis)', description: 'Temperatura, Intensidad, Presión. Guía rápida.', category: 'DBT', type: 'pdf', url: '#', tags: ['crisis', 'regulación'] },
    { id: 'dbt-002', title: 'Hoja de Trabajo: Plan de Seguridad', description: 'Estructura para prevenir conductas autolesivas.', category: 'DBT', type: 'pdf', url: '#', tags: ['suicidio', 'seguridad'] },
    { id: 'dbt-003', title: 'Habilidades DEAR MAN', description: 'Guía para pedir cosas y decir no efectivamente.', category: 'DBT', type: 'pdf', url: '#', tags: ['interpersonal'] },
    { id: 'dbt-004', title: 'Diario de Tarjeta (Diary Card)', description: 'Formato clásico de seguimiento diario DBT.', category: 'DBT', type: 'excel' as any, url: '#', tags: ['seguimiento'] },

    // FILLERS FOR VOLUME (Simulated Scale)
    ...Array.from({ length: 40 }).map((_, i) => ({
        id: `extra-${i}`,
        title: `Recurso Clínico Adicional #${i + 1}`,
        description: 'Material complementario para sesiones de terapia. Incluye ejercicios prácticos y lecturas recomendadas.',
        category: i % 2 === 0 ? 'Otros' : 'Psicoeducación' as any,
        type: 'pdf' as const,
        url: '#',
        tags: ['general', 'recursos']
    }))
];
