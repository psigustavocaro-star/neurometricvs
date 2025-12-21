export interface Resource {
    id: string;
    title: string;
    description: string;
    category: 'Psicoeducación' | 'Estimulación Cognitiva' | 'TCC' | 'Mindfulness' | 'Guías Clínicas' | 'DBT' | 'Otros' | 'Ansiedad' | 'Depresión' | 'Infanto-Juvenil';
    type: 'pdf' | 'word' | 'image' | 'video' | 'link' | 'interactive';
    url: string;
    thumbnail?: string;
    tags: string[];
    content?: string; // HTML content for the generic viewer
}

export const resources: Resource[] = [
    // --- INTERACTIVE TOOLS (Keep as specific apps) ---
    {
        id: 'cbt-thought-record',
        title: 'Registro de Pensamientos (Interactivo)',
        description: 'Herramienta digital para identificar, cuestionar y reestructurar pensamientos automáticos.',
        category: 'TCC',
        type: 'interactive',
        url: '/dashboard/resources/cbt-thought-record',
        tags: ['tcc', 'ansiedad', 'depresión'],
        content: ''
    },
    {
        id: 'dbt-chain-analysis',
        title: 'Análisis en Cadena (Interactivo)',
        description: 'Formato DBT paso a paso para analizar conductas problemáticas.',
        category: 'DBT',
        type: 'interactive',
        url: '/dashboard/resources/dbt-chain-analysis',
        tags: ['dbt', 'conducta'],
        content: ''
    },
    {
        id: 'grounding-54321',
        title: 'Técnica de Grounding 5-4-3-2-1',
        description: 'Ejercicio guiado interactivo para manejo de ansiedad y crisis de pánico.',
        category: 'Mindfulness',
        type: 'interactive',
        url: '/dashboard/resources/grounding-54321',
        tags: ['ansiedad', 'grounding'],
        content: ''
    },

    // --- TCC Content ---
    {
        id: 'tcc-001',
        title: 'Hoja de Registro de Actividades Semanales',
        description: 'Planificador para activación conductual en depresión.',
        category: 'TCC',
        type: 'pdf',
        url: '#',
        tags: ['depresión', 'activación conductual'],
        content: `
            <h3>Instrucciones</h3>
            <p>La <strong>Activación Conductual</strong> es una estrategia fundamental para combatir la depresión. Cuando nos sentimos deprimidos, tendemos a hacer menos cosas, lo que a su vez nos hace sentir peor. Este registro le ayudará a visualizar sus actividades y cómo estas afectan su estado de ánimo.</p>
            
            <h4>Cómo usar este registro:</h4>
            <ul class="list-disc pl-5 mb-4">
                <li><strong>Registre cada actividad:</strong> Anote lo que hace en cada bloque de hora durante la semana (ej. 9:00 - 10:00: Desayuno, Ducha).</li>
                <li><strong>Califique el Placer (P):</strong> Del 0 al 10, ¿cuánto disfrutó la actividad?</li>
                <li><strong>Califique el Logro (L):</strong> Del 0 al 10, ¿cuánto sentido de logro o deber cumplido sintió?</li>
            </ul>

            <div class="bg-blue-50 p-4 rounded-lg my-6 border border-blue-100">
                <h4 class="font-bold text-blue-800">Tabla de Registro Semanal (Ejemplo)</h4>
                <table class="w-full mt-2 text-sm text-left">
                    <tr class="border-b"><th>Hora</th><th>Lunes</th><th>Actividad (P/L)</th><th>Martes</th></tr>
                    <tr class="border-b"><td>9:00</td><td>Dormir</td><td>0/0</td><td>Caminar</td></tr>
                    <tr class="border-b"><td>10:00</td><td>Desayuno</td><td>3/2</td><td>Trabajo</td></tr>
                </table>
                <p class="text-xs text-blue-600 mt-2">* Use la hoja impresa completa para su registro.</p>
            </div>
            
            <p>Al final de la semana, revise su registro: ¿Qué actividades le dieron más Placer o Logro? ¿Hay una relación entre lo que hace y cómo se siente?</p>
        `
    },
    {
        id: 'tcc-002',
        title: 'Lista de Distorsiones Cognitivas Comunes',
        description: 'Guía ilustrada para identificar errores de pensamiento.',
        category: 'TCC',
        type: 'pdf',
        url: '#',
        tags: ['psicoeducación', 'pensamientos'],
        content: `
            <h3>¿Qué son las Distorsiones Cognitivas?</h3>
            <p>Son trampas mentales o errores en la forma en que procesamos la información. Todos las tenemos ocasionalmente, pero cuando son frecuentes, generan malestar emocional intenso.</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div class="border p-4 rounded-lg">
                    <h4 class="font-bold text-lg mb-2 text-indigo-700">1. Pensamiento Todo o Nada</h4>
                    <p class="text-sm">Ver las situaciones en categorías extremas (blanco o negro). Si no es perfecto, es un fracaso total.</p>
                    <p class="text-xs text-slate-500 mt-1 italic">"Si no saco un 10 en el examen, soy un estúpido."</p>
                </div>
                <div class="border p-4 rounded-lg">
                    <h4 class="font-bold text-lg mb-2 text-indigo-700">2. Sobregeneralización</h4>
                    <p class="text-sm">Ver un evento negativo como un patrón interminable de derrota.</p>
                    <p class="text-xs text-slate-500 mt-1 italic">"Me rechazaron. Siempre estaré solo."</p>
                </div>
                <div class="border p-4 rounded-lg">
                    <h4 class="font-bold text-lg mb-2 text-indigo-700">3. Filtro Mental</h4>
                    <p class="text-sm">Enfocarse exclusivamente en un detalle negativo, ignorando todo lo positivo.</p>
                    <p class="text-xs text-slate-500 mt-1 italic">"La presentación salió bien, pero me trabé en una palabra. Fue un desastre."</p>
                </div>
                <div class="border p-4 rounded-lg">
                    <h4 class="font-bold text-lg mb-2 text-indigo-700">4. Lectura de Mente</h4>
                    <p class="text-sm">Asumir que sabes lo que otros piensan (usualmente mal) sin tener evidencia.</p>
                    <p class="text-xs text-slate-500 mt-1 italic">"Seguro piensa que soy aburrido."</p>
                </div>
                <div class="border p-4 rounded-lg">
                    <h4 class="font-bold text-lg mb-2 text-indigo-700">5. Catastrofización</h4>
                    <p class="text-sm">Esperar el desastre o exagerar la importancia de un error pequeño.</p>
                    <p class="text-xs text-slate-500 mt-1 italic">"Si fallo aquí, perderé mi trabajo y viviré bajo un puente."</p>
                </div>
                 <div class="border p-4 rounded-lg">
                    <h4 class="font-bold text-lg mb-2 text-indigo-700">6. Personalización</h4>
                    <p class="text-sm">Creer que eres la causa de eventos externos negativos de los que no eres responsable.</p>
                    <p class="text-xs text-slate-500 mt-1 italic">"Mi hijo reprobó. Soy mala madre."</p>
                </div>
            </div>
        `
    },
    {
        id: 'tcc-003',
        title: 'Experimento Conductual: Diseño y Registro',
        description: 'Formato para poner a prueba creencias limitantes.',
        category: 'TCC',
        type: 'pdf',
        url: '#',
        tags: ['creencias', 'experimentos'],
        content: `
            <h3>Poniendo a prueba sus pensamientos</h3>
            <p>Los pensamientos no son hechos, son hipótesis. Un experimento conductual sirve para probar si lo que tememos es real o no.</p>

            <div class="space-y-6 mt-4">
                <div class="border-l-4 border-teal-500 pl-4 py-1">
                    <h4 class="font-bold">1. La Predicción (Hipótesis)</h4>
                    <p>¿Qué es exactamente lo que teme que ocurra? Sea específico.</p>
                    <p class="italic text-slate-500">Ej: "Si pregunto una duda en clase, todos se reirán y pensaré que soy tonto."</p>
                    <p><strong>¿Cuánto cree en esto (0-100%)?</strong> _______</p>
                </div>

                <div class="border-l-4 border-indigo-500 pl-4 py-1">
                    <h4 class="font-bold">2. El Experimento</h4>
                    <p>¿Qué hará para probar esto? Defina cuándo y dónde.</p>
                    <p class="italic text-slate-500">Ej: "Levantaré la mano en la clase del martes y haré una pregunta sobre el tema."</p>
                </div>

                <div class="border-l-4 border-amber-500 pl-4 py-1">
                    <h4 class="font-bold">3. El Resultado</h4>
                    <p>¿Qué pasó realmente? Observe los hechos, no sus sentimientos.</p>
                    <p class="italic text-slate-500">Ej: "El profesor respondió. Nadie se rió. Un compañero asintió."</p>
                </div>

                <div class="border-l-4 border-green-500 pl-4 py-1">
                    <h4 class="font-bold">4. Conclusión</h4>
                    <p>¿Se cumplió su predicción? ¿Qué aprendió?</p>
                    <p class="italic text-slate-500">Ej: "Mi predicción era falsa. Preguntar es seguro. 0% de creencia en el miedo original."</p>
                </div>
            </div>
        `
    },
    {
        id: 'tcc-004',
        title: 'Inventario de Situaciones de Ansiedad (Jerarquía)',
        description: 'Lista para jerarquizar situaciones temidas (Escalera del Miedo).',
        category: 'TCC',
        type: 'pdf',
        url: '#',
        tags: ['ansiedad', 'exposición'],
        content: `
            <h3>Escalera de Exposición</h3>
            <p>Para superar la ansiedad, debemos enfrentarnos gradualmente a lo que tememos. Use esta tabla para ordenar situaciones desde la que le da "poca ansiedad" hasta la que le da "pánico total".</p>

            <table class="w-full border-collapse border border-slate-300 mt-6">
                <thead class="bg-slate-100">
                    <tr>
                        <th class="border border-slate-300 p-2 text-left">Nivel</th>
                        <th class="border border-slate-300 p-2 text-left">Situación (Sea específico)</th>
                        <th class="border border-slate-300 p-2 text-left w-24">USA (0-100)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border border-slate-300 p-2 font-bold text-red-600">Alta</td>
                        <td class="border border-slate-300 p-2"></td>
                        <td class="border border-slate-300 p-2 text-center">90-100</td>
                    </tr>
                     <tr>
                        <td class="border border-slate-300 p-2"></td>
                        <td class="border border-slate-300 p-2"></td>
                        <td class="border border-slate-300 p-2 text-center">80</td>
                    </tr>
                     <tr>
                        <td class="border border-slate-300 p-2 font-bold text-orange-500">Media</td>
                        <td class="border border-slate-300 p-2"></td>
                        <td class="border border-slate-300 p-2 text-center">60</td>
                    </tr>
                     <tr>
                        <td class="border border-slate-300 p-2"></td>
                        <td class="border border-slate-300 p-2"></td>
                        <td class="border border-slate-300 p-2 text-center">40</td>
                    </tr>
                     <tr>
                        <td class="border border-slate-300 p-2 font-bold text-green-600">Baja</td>
                        <td class="border border-slate-300 p-2"></td>
                        <td class="border border-slate-300 p-2 text-center">20</td>
                    </tr>
                </tbody>
            </table>
            <p class="text-sm mt-2 text-slate-500"><em>*USA: Unidades Subjetivas de Ansiedad</em></p>
        `
    },
    {
        id: 'tcc-005',
        title: 'Termómetro de las Emociones',
        description: 'Herramienta visual para identificar intensidad emocional.',
        category: 'TCC',
        type: 'image',
        url: '#',
        tags: ['emociones', 'niños'],
        content: `
            <h3>Termómetro Emocional</h3>
            <p>Instrucción: Colorear o marcar hasta dónde llega tu emoción en este momento.</p>
            
            <div class="flex flex-col items-center justify-center space-y-2 mt-8">
                <div class="w-full max-w-md bg-gradient-to-t from-green-300 via-yellow-300 to-red-500 h-64 rounded-xl border-2 border-slate-300 relative flex flex-col justify-between p-2">
                    <div class="text-right pr-2 font-bold text-white drop-shadow-md">10 - Explosión / Pánico</div>
                    <div class="text-right pr-2 font-bold text-white drop-shadow-md">8 - Muy Intenso</div>
                    <div class="text-right pr-2 font-bold text-white drop-shadow-md">6 - Molesto / Nervioso</div>
                    <div class="text-right pr-2 font-bold text-white drop-shadow-md">4 - Un poco</div>
                    <div class="text-right pr-2 font-bold text-white drop-shadow-md">2 - Calmado</div>
                    <div class="text-right pr-2 font-bold text-white drop-shadow-md">0 - Relajado</div>
                </div>
            </div>

            <div class="mt-8">
                <h4 class="font-bold">Preguntas de reflexión:</h4>
                <ul class="list-disc pl-5">
                    <li>¿Qué sentiste en tu cuerpo cuando estabas en el número alto?</li>
                    <li>¿Qué pensamientos tenías en ese momento?</li>
                    <li>¿Qué te ayudó a bajar la temperatura?</li>
                </ul>
            </div>
        `
    },

    // --- MINDFULNESS CONTENT ---
    {
        id: 'mind-001',
        title: 'Guion: Escaneo Corporal (Body Scan)',
        description: 'Texto guía para práctica de meditación de conciencia corporal.',
        category: 'Mindfulness',
        type: 'pdf',
        url: '#',
        tags: ['mindfulness', 'relajación'],
        content: `
            <h3>Práctica de Escaneo Corporal (Guion)</h3>
            <p><strong>Duración estimada:</strong> 15-20 minutos.</p>
            <p><strong>Postura:</strong> Acostado boca arriba cómodamente, brazos a los costados.</p>

            <div class="space-y-4 mt-4 font-serif text-lg leading-relaxed text-slate-700 bg-slate-50 p-6 rounded-xl italic">
                <p>"Comienza llevando la atención a tu respiración. No intentes cambiarla, solo obsérvala... siente cómo el aire entra y sale..."</p>
                <p>"Ahora, lleva suavemente tu atención a los dedos de tu pie izquierdo. Nota cualquier sensación: frío, calor, hormigueo, o quizás nada. Está bien..."</p>
                <p>"Poco a poco, sube por la planta del pie, el talón, el tobillo... imaginando que tu respiración viaja hasta esa zona..."</p>
                <p>"Continúa subiendo por la pantorrilla, la rodilla, el muslo... notando la tensión y soltándola con cada exhalación..."</p>
                <p>...</p>
                <p>"Siente tu cadera, tu abdomen subiendo y bajando... tu pecho, los latidos de tu corazón..."</p>
                <p>"Recorre tus manos, brazos, hombros... libera el peso que cargan en el suelo..."</p>
                <p>"Finalmente, relaja tu rostro: la mandíbula, los ojos, la frente. Respira en todo tu cuerpo como una unidad completa."</p>
            </div>
        `
    },
    {
        id: 'mind-005',
        title: 'Diario de Gratitud',
        description: 'Plantilla semanal para cultivar emociones positivas.',
        category: 'Mindfulness',
        type: 'pdf',
        url: '#',
        tags: ['gratitud', 'psicología positiva'],
        content: `
            <h3>El Poder de la Gratitud</h3>
            <p>La gratitud es un "músculo" que podemos entrenar. Estudios muestran que identificar cosas buenas diariamente reduce síntomas depresivos y mejora el sueño.</p>

            <div class="mt-6 space-y-6">
                <div class="border p-4 rounded-xl shadow-sm">
                    <h4 class="font-bold text-teal-700 border-b pb-2 mb-4">Registro Diario: 3 Cosas Buenas</h4>
                    <p class="mb-4 text-sm text-slate-500">Instrucción: Al final del día, escribe 3 cosas que salieron bien o por las que estás agradecido, y brevemente por qué ocurrieron.</p>
                    
                    <div class="space-y-4">
                        <div>
                            <p class="font-semibold">1. _______________________________________________________</p>
                            <p class="text-xs text-slate-400 pl-4">¿Por qué es algo bueno?: _________________________________</p>
                        </div>
                         <div>
                            <p class="font-semibold">2. _______________________________________________________</p>
                            <p class="text-xs text-slate-400 pl-4">¿Por qué es algo bueno?: _________________________________</p>
                        </div>
                         <div>
                            <p class="font-semibold">3. _______________________________________________________</p>
                            <p class="text-xs text-slate-400 pl-4">¿Por qué es algo bueno?: _________________________________</p>
                        </div>
                    </div>
                </div>

                <div class="bg-yellow-50 p-4 rounded-lg">
                    <h4 class="font-bold text-yellow-800">Tips:</h4>
                    <ul class="list-disc pl-5 text-sm text-yellow-900">
                        <li>Pueden ser cosas pequeñas ("el café estaba rico") o grandes.</li>
                        <li>Intenta no repetir lo mismo cada día.</li>
                        <li>Sé específico ("mi pareja sacó la basura sin que le dijera" es mejor que "mi pareja es buena").</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        id: 'mind-006',
        title: 'Relajación Muscular Progresiva (Jacobson)',
        description: 'Guía para tensar y relajar grupos musculares.',
        category: 'Mindfulness',
        type: 'pdf',
        url: '#',
        tags: ['relajación', 'estrés'],
        content: `
            <h3>Relajación Progresiva de Jacobson</h3>
            <p>Esta técnica enseña a distinguir entre tensión y relajación. Consiste en tensar fuertemente un grupo muscular por 5-7 segundos y luego soltar de golpe, disfrutando la sensación de alivio por 15-20 segundos.</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div class="border p-3 rounded">
                    <h4 class="font-bold">1. Manos y Brazos</h4>
                    <p class="text-sm">Aprieta los puños fuertemente. Tensa bíceps y antebrazos.</p>
                    <p class="text-xs font-bold text-red-500 mt-1">¡SUELTA!</p>
                </div>
                <div class="border p-3 rounded">
                    <h4 class="font-bold">2. Cara y Cuello</h4>
                    <p class="text-sm">Arruga la frente, cierra los ojos con fuerza, aprieta la mandíbula y pega la lengua al paladar.</p>
                    <p class="text-xs font-bold text-red-500 mt-1">¡SUELTA!</p>
                </div>
                 <div class="border p-3 rounded">
                    <h4 class="font-bold">3. Pecho y Espalda</h4>
                    <p class="text-sm">Arquea la espalda hacia atrás y respira hondo reteniendo el aire. Lleva los hombros atrás.</p>
                    <p class="text-xs font-bold text-red-500 mt-1">¡SUELTA!</p>
                </div>
                 <div class="border p-3 rounded">
                    <h4 class="font-bold">4. Abdomen</h4>
                    <p class="text-sm">Mete la barriga hacia adentro con fuerza, como si fueras a recibir un golpe.</p>
                    <p class="text-xs font-bold text-red-500 mt-1">¡SUELTA!</p>
                </div>
                 <div class="border p-3 rounded">
                    <h4 class="font-bold">5. Piernas</h4>
                    <p class="text-sm">Estira las piernas y apunta los pies hacia tu cara. Tensa muslos y pantorrillas.</p>
                    <p class="text-xs font-bold text-red-500 mt-1">¡SUELTA!</p>
                </div>
            </div>

            <p class="mt-4 text-sm">Al terminar, quédate unos minutos disfrutando la sensación general de pesadez y calma.</p>
        `
    },

    // --- ESTIMULACION COGNITIVA CONTENT ---
    {
        id: 'cog-001',
        title: 'Cuaderno de Estimulación: Atención',
        description: 'Ejercicios de cancelación y búsqueda visual.',
        category: 'Estimulación Cognitiva',
        type: 'pdf',
        url: '#',
        tags: ['atención', 'adulto mayor'],
        content: `
            <h3>Ejercicio 1: Cancelación de Estímulos</h3>
            <p><strong>Instrucciones:</strong> Tache todas las letras <strong>"R"</strong> que encuentre en el siguiente cuadro. Hágalo lo más rápido posible.</p>

            <div class="font-mono text-lg tracking-widest leading-loose bg-slate-100 p-6 rounded-lg text-center break-words uppercase">
                M R T P S R L K J R S D M R Q W E R T Y U I O <br/>
                P A S D F G H J K L Ñ Z X C V B N M Q W E R T <br/>
                R T Y U I O P A S D F G H J K L Ñ Z X C V B N <br/>
                M Q W E R T Y U I O P A S D F G H J K L Ñ Z X <br/>
                C V B N M R T P S R L K J R S D M R Q W E R T <br/>
                Y U I O P A S D F G H J K L Ñ Z X C V B N M Q <br/>
                W E R T Y U I O P A S D F G H J K L Ñ Z X C V <br/>
            </div>

            <h3 class="mt-8">Ejercicio 2: Rastreo Visual</h3>
            <p>Encuentre los siguientes números en orden ascendente (1, 2, 3...) y únalos con una línea.</p>
            <div class="h-64 border-2 border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400">
                [Espacio para dibujo de números dispersos impresa]
            </div>
        `
    },
    {
        id: 'cog-003',
        title: 'Cálculo y Funciones Ejecutivas: Manejo de Dinero',
        description: 'Problemas de lógica y compras simuladas.',
        category: 'Estimulación Cognitiva',
        type: 'pdf',
        url: '#',
        tags: ['funciones ejecutivas'],
        content: `
            <h3>Manejo de Presupuesto</h3>
            <p>Imagine que tiene un presupuesto total de <strong>$20.000</strong>. Debe comprar los ingredientes para un almuerzo.</p>

            <div class="grid grid-cols-2 gap-4 my-6">
                <ul class="list-disc pl-5">
                    <li>1kg Carne: $8.500</li>
                    <li>1kg Arroz: $1.200</li>
                    <li>Lechuga: $800</li>
                    <li>Tomate: $1.500</li>
                </ul>
                <ul class="list-disc pl-5">
                     <li>Bebida: $1.800</li>
                    <li>Postre: $2.500</li>
                    <li>Pan: $1.000</li>
                </ul>
            </div>

            <div class="space-y-4">
                <p>1. Calcule el total de la compra si lleva un artículo de cada uno de la lista.</p>
                <div class="border-b border-black w-32 h-6"></div>
                
                <p>2. ¿Le alcanza el dinero? ¿Cuánto le sobra o le falta?</p>
                <div class="border-b border-black w-32 h-6"></div>

                <p>3. Si quisiera ahorrar y gastar menos de $15.000, ¿qué dos productos eliminaría?</p>
                <div class="border-b border-black w-full h-6"></div>
            </div>
        `
    },

    // --- PSICOEDUCACION & GUIAS ---
    {
        id: 'edu-001',
        title: 'Higiene del Sueño: Reglas de Oro',
        description: 'Pautas conductuales para mejorar la calidad del sueño.',
        category: 'Psicoeducación',
        type: 'pdf',
        url: '#',
        tags: ['sueño', 'insomnio'],
        content: `
            <h3>Decálogo de la Higiene del Sueño</h3>
            <p>El sueño no se puede "forzar", pero podemos preparar el escenario para que ocurra.</p>

            <div class="space-y-4 mt-6">
                <div class="flex items-start gap-3">
                    <div class="bg-indigo-100 p-2 rounded text-indigo-700 font-bold">1</div>
                    <div>
                        <h4 class="font-bold">Horario Regular</h4>
                        <p class="text-sm">Levántese y acuéstese a la misma hora todos los días, incluso fines de semana. Esto regula su reloj biológico.</p>
                    </div>
                </div>

                <div class="flex items-start gap-3">
                    <div class="bg-indigo-100 p-2 rounded text-indigo-700 font-bold">2</div>
                    <div>
                        <h4 class="font-bold">La Cama es para Dormir</h4>
                        <p class="text-sm">No coma, trabaje ni vea TV en la cama. Su cerebro debe asociar cama = dormir. (La única excepción es la actividad sexual).</p>
                    </div>
                </div>

                 <div class="flex items-start gap-3">
                    <div class="bg-indigo-100 p-2 rounded text-indigo-700 font-bold">3</div>
                    <div>
                        <h4 class="font-bold">Desconectar Pantallas</h4>
                        <p class="text-sm">Evite celulares, tablets y computadores al menos 1 hora antes de dormir. La luz azul inhibe la melatonina.</p>
                    </div>
                </div>

                 <div class="flex items-start gap-3">
                    <div class="bg-indigo-100 p-2 rounded text-indigo-700 font-bold">4</div>
                    <div>
                        <h4 class="font-bold">La regla de los 20 minutos</h4>
                        <p class="text-sm">Si no logra dormir en aprox. 20 minutos, SALGA DE LA CAMA. Vaya a otra pieza, lea algo aburrido con luz tenue y vuelva solo cuando tenga sueño.</p>
                    </div>
                </div>
                
                <div class="flex items-start gap-3">
                    <div class="bg-indigo-100 p-2 rounded text-indigo-700 font-bold">5</div>
                    <div>
                        <h4 class="font-bold">Evite Estimulantes</h4>
                        <p class="text-sm">Nada de cafeína (café, té, coca-cola) después de las 5 PM. Evite el alcohol (ayuda a quedarse dormido pero fragmenta el sueño después).</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'edu-008',
        title: 'Técnicas de Comunicación Asertiva (DEEC)',
        description: 'Guía práctica para pedir cambios de conducta.',
        category: 'Psicoeducación',
        type: 'pdf',
        url: '#',
        tags: ['habilidades sociales'],
        content: `
            <h3>Técnica DEEC: Cómo pedir un cambio sin pelear</h3>
            <p>Use este guion cuando necesite expresar una molestia o pedir algo a otra persona.</p>

            <div class="space-y-6 mt-6">
                <div class="border-l-4 border-blue-500 pl-4">
                    <h4 class="font-bold text-blue-700">D - Describir</h4>
                    <p class="text-sm">Describa la situación objetivamente, sin juicios. Solo los hechos.</p>
                    <p class="italic text-slate-500 text-sm">"Cuando llegas 30 minutos tarde a nuestras citas..." (No: "Cuando eres un irresponsable...")</p>
                </div>

                <div class="border-l-4 border-blue-500 pl-4">
                    <h4 class="font-bold text-blue-700">E - Expresar</h4>
                    <p class="text-sm">Exprese cómo le hace sentir esa situación usando "Yo siento..."</p>
                    <p class="italic text-slate-500 text-sm">"...yo me siento preocupado y poco valorado."</p>
                </div>

                <div class="border-l-4 border-blue-500 pl-4">
                    <h4 class="font-bold text-blue-700">E - Especificar</h4>
                    <p class="text-sm">Pida concretamente qué cambio decea. Sea realista.</p>
                    <p class="italic text-slate-500 text-sm">"Me gustaría que me avisaras por mensaje si vas a retrasarte."</p>
                </div>

                <div class="border-l-4 border-blue-500 pl-4">
                    <h4 class="font-bold text-blue-700">C - Consecuencias</h4>
                    <p class="text-sm">Mencione lo positivo que ocurrirá si se cumple la petición.</p>
                    <p class="italic text-slate-500 text-sm">"Así podré esperarte tranquilo y aprovecharemos mejor el tiempo juntos."</p>
                </div>
            </div>
        `
    },

    // --- INFANTO-JUVENIL ---
    {
        id: 'inf-005',
        title: 'Economía de Fichas: Kit para el Hogar',
        description: 'Sistema de reforzamiento positivo para modificación de conducta.',
        category: 'Infanto-Juvenil',
        type: 'pdf',
        url: '#',
        tags: ['conducta', 'padres'],
        content: `
            <h3>Sistema de Puntos / Economía de Fichas</h3>
            <p>Esta herramienta sirve para instaurar hábitos nuevos y reforzar conductas positivas.</p>

            <h4 class="font-bold mt-4">Reglas Básicas:</h4>
            <ol class="list-decimal pl-5 text-sm mb-6">
                <li><strong>Definir Conductas:</strong> Elija máximo 3 conductas a trabajar (ej. lavarse los dientes, hacer la cama, no pegar).</li>
                <li><strong>Ser Positivo:</strong> Formule la meta en positivo ("Hablar bajito" en vez de "No gritar").</li>
                <li><strong>Recompensa Inmediata:</strong> Entregue el punto o sticker inmediatamente después de la conducta.</li>
                <li><strong>El Premio:</strong> Los puntos se canjean por premios acordados previamente (ej. elegir la película, ir al parque).</li>
            </ol>

            <div class="border-2 border-black p-4 rounded-lg">
                <h4 class="text-center font-bold text-xl mb-4">TABLA DE PUNTOS DE: __________________</h4>
                <table class="w-full border-collapse border border-black text-center">
                    <thead>
                        <tr>
                            <th class="border border-black p-2">Conducta</th>
                            <th class="border border-black p-2">Lun</th>
                            <th class="border border-black p-2">Mar</th>
                            <th class="border border-black p-2">Mie</th>
                            <th class="border border-black p-2">Jue</th>
                            <th class="border border-black p-2">Vie</th>
                            <th class="border border-black p-2">Sab</th>
                            <th class="border border-black p-2">Dom</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-black p-2 text-left h-12">1. ______________</td>
                            <td class="border border-black p-2"></td><td class="border border-black p-2"></td><td class="border border-black p-2"></td>
                            <td class="border border-black p-2"></td><td class="border border-black p-2"></td><td class="border border-black p-2"></td><td class="border border-black p-2"></td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-left h-12">2. ______________</td>
                            <td class="border border-black p-2"></td><td class="border border-black p-2"></td><td class="border border-black p-2"></td>
                            <td class="border border-black p-2"></td><td class="border border-black p-2"></td><td class="border border-black p-2"></td><td class="border border-black p-2"></td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-left h-12">3. ______________</td>
                            <td class="border border-black p-2"></td><td class="border border-black p-2"></td><td class="border border-black p-2"></td>
                            <td class="border border-black p-2"></td><td class="border border-black p-2"></td><td class="border border-black p-2"></td><td class="border border-black p-2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    },

    // --- DBT ---
    {
        id: 'dbt-001',
        title: 'Habilidades TIP (Crisis)',
        description: 'Técnicas fisiológicas para reducir la activación extrema rápidamente.',
        category: 'DBT',
        type: 'pdf',
        url: '#',
        tags: ['crisis', 'regulación'],
        content: `
            <h3>Habilidades TIP para Crisis</h3>
            <p>Use estas técnicas cuando su emoción sea tan alta (9-10/10) que no pueda pensar ni usar otras habilidades. Cambian la química de su cuerpo en segundos.</p>

            <div class="grid grid-cols-1 gap-6 mt-6">
                <div class="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <h4 class="font-bold text-2xl text-blue-800 mb-2">T - Temperatura</h4>
                    <p>Cambie drásticamente la temperatura de su cara con agua muy fría.</p>
                    <ul class="list-disc pl-5 mt-2 text-sm">
                        <li>Llene un bowl con agua helada y hielos.</li>
                        <li>Aguante la respiración y sumerja la cara por 30 segundos (o lo que aguante).</li>
                        <li>Esto activa el <strong>reflejo de buceo</strong> de los mamíferos y baja la frecuencia cardíaca inmediatamente.</li>
                    </ul>
                </div>

                <div class="bg-orange-50 p-4 rounded-xl border border-orange-200">
                    <h4 class="font-bold text-2xl text-orange-800 mb-2">I - Intensidad (Ejercicio)</h4>
                    <p>Haga ejercicio físico intenso por un corto periodo (20 minutos).</p>
                    <ul class="list-disc pl-5 mt-2 text-sm">
                        <li>Correr rápido, saltar la cuerda, jumping jacks.</li>
                        <li>El objetivo es que el cuerpo consuma la energía de la ira o ansiedad y se canse.</li>
                    </ul>
                </div>

                 <div class="bg-green-50 p-4 rounded-xl border border-green-200">
                    <h4 class="font-bold text-2xl text-green-800 mb-2">P - Paced Breathing (Respiración Pausada)</h4>
                    <p>Respire rítmicamente para activar el sistema parasimpático.</p>
                    <ul class="list-disc pl-5 mt-2 text-sm">
                        <li>Inhale en 4 tiempos.</li>
                        <li>Exhale muy lentamente en 6 u 8 tiempos.</li>
                        <li>La exhalación larga es la clave para la relajación.</li>
                    </ul>
                </div>
            </div>
        `
    },

    // --- FILLERS (Standardized Generic Content) ---
    ...Array.from({ length: 40 }).map((_, i) => ({
        id: `extra-${i}`,
        title: `Recurso Clínico de Referencia #${i + 1}`,
        description: 'Material de consulta estándar para apoyo en procesos psicoterapéuticos. Contiene pautas generales.',
        category: i % 2 === 0 ? 'Otros' : 'Psicoeducación' as any,
        type: 'pdf' as const,
        url: '#',
        tags: ['general', 'referencia'],
        content: `
            <h3>Material de Referencia Clínica #${i + 1}</h3>
            <p>Este documento es un recurso complementario genérico. En un entorno de producción real, este espacio estaría ocupado por un protocolo específico, una escala de evaluación validada o un capítulo de bibliografía seleccionada.</p>
            <div class="bg-slate-100 p-4 rounded-lg my-4">
                <h4 class="font-bold">Estructura del Recurso:</h4>
                <ul class="list-disc pl-5">
                    <li>Introducción Teórica</li>
                    <li>Aplicación Práctica</li>
                    <li>Bibliografía</li>
                </ul>
            </div>
            <p>Utilice este espacio para tomar notas durante la sesión o asignar tareas de reflexión al paciente relacionadas con el tema de la semana.</p>
        `
    }))
];
