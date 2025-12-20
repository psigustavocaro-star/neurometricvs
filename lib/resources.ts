export interface Resource {
    id: string;
    title: string;
    description: string;
    category: 'Psicoeducación' | 'Estimulación Cognitiva' | 'TCC' | 'Mindfulness' | 'Guías Clínicas' | 'DBT' | 'Otros';
    type: 'pdf' | 'word' | 'image' | 'video' | 'link' | 'interactive';
    url: string;
    thumbnail?: string;
    tags: string[];
}

export const resources: Resource[] = [
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
    {
        id: 'cbt-1',
        title: 'Registro de Pensamientos (PDF)',
        description: 'Hoja de trabajo para identificar situaciones, emociones y pensamientos automáticos.',
        category: 'TCC',
        type: 'pdf',
        url: '/resources/registro_pensamientos.pdf',
        tags: ['ansiedad', 'depresión', 'tcc']
    },
    {
        id: 'mindfulness-1',
        title: 'Guía de Respiración Consciente',
        description: 'Ejercicio básico de mindfulness para reducción de estrés en 5 minutos.',
        category: 'Mindfulness',
        type: 'pdf',
        url: '/resources/guia_respiracion.pdf',
        tags: ['estrés', 'mindfulness', 'relajación']
    },
    {
        id: 'cog-1',
        title: 'Ejercicios de Memoria de Trabajo',
        description: 'Set de 5 ejercicios para estimular la memoria operativa en adultos mayores.',
        category: 'Estimulación Cognitiva',
        type: 'pdf',
        url: '/resources/ejercicios_memoria.pdf',
        tags: ['adulto mayor', 'memoria', 'rehabilitación']
    }
];
