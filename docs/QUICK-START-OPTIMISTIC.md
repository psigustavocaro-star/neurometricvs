# 🎯 Guía Rápida: Hacer tu Componente Instantáneo

Esta guía te muestra cómo convertir componentes existentes para que se sientan instantáneos.

## 📋 Checklist de Optimización

- [ ] Envolver con QueryProvider (ya está en layout.tsx)
- [ ] Reemplazar fetch con useQuery
- [ ] Usar useOptimisticMutation para mutaciones
- [ ] Agregar prefetch en navegación
- [ ] Usar InstantLink en vez de Link

---

## 🔄 Patrón 1: Lista con Fetch → Optimística

### ❌ ANTES (Lento)

\`\`\`tsx
'use client'

function PatientList() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/patients')
      .then(r => r.json())
      .then(data => {
        setPatients(data)
        setLoading(false)
      })
  }, [])

  const createPatient = async (name: string) => {
    const response = await fetch('/api/patients', {
      method: 'POST',
      body: JSON.stringify({ name })
    })
    
    // ⏳ Recargar TODA la lista (lento)
    fetch('/api/patients').then(r => r.json()).then(setPatients)
  }

  // ...render
}
\`\`\`

### ✅ DESPUÉS (Instantáneo)

\`\`\`tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { useOptimisticMutation } from '@/lib/hooks/use-optimistic-mutation'

function PatientList() {
  // ⚡ Con cache automático
  const { data: patients = [], isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: () => fetch('/api/patients').then(r => r.json())
  })

  // 🚀 Con optimistic update
  const createPatient = useOptimisticMutation({
    mutationFn: (name: string) => 
      fetch('/api/patients', {
        method: 'POST',
        body: JSON.stringify({ name })
      }),
    queryKey: ['patients'],
    // ⚡ UI se actualiza INMEDIATAMENTE
    getOptimisticData: (name, oldPatients) => [
      { id: `temp-${Date.now()}`, name },
      ...oldPatients
    ],
    successMessage: 'Paciente creado'
  })

  // ...render con createPatient.mutate(name)
}
\`\`\`

---

## 🎬 Patrón 2: Navegación → Instantánea

### ❌ ANTES

\`\`\`tsx
import Link from 'next/link'

function Navigation() {
  return (
    <Link href="/patients">
      Pacientes
    </Link>
  )
}
\`\`\`

### ✅ DESPUÉS (Con prefetch y transitions)

\`\`\`tsx
import { InstantLink } from '@/lib/hooks/use-instant-transition'
import { usePrefetchOnHover } from '@/lib/hooks/use-prefetch'

function Navigation() {
  const { handleMouseEnter } = usePrefetchOnHover()

  return (
    <InstantLink 
      href="/patients"
      onMouseEnter={() => handleMouseEnter('/patients', {
        queryKey: ['patients'],
        fetcher: () => fetch('/api/patients').then(r => r.json())
      })}
    >
      Pacientes
    </InstantLink>
  )
}
\`\`\`

---

## ✏️ Patrón 3: Actualización → Optimística

### ❌ ANTES

\`\`\`tsx
const updatePatient = async (id: string, name: string) => {
  setLoading(true)
  
  await fetch(\`/api/patients/\${id}\`, {
    method: 'PATCH',
    body: JSON.stringify({ name })
  })
  
  // ⏳ Recargar todo
  const data = await fetch('/api/patients').then(r => r.json())
  setPatients(data)
  setLoading(false)
}
\`\`\`

### ✅ DESPUÉS

\`\`\`tsx
const updatePatient = useOptimisticMutation({
  mutationFn: ({ id, name }: { id: string, name: string }) =>
    fetch(\`/api/patients/\${id}\`, {
      method: 'PATCH',
      body: JSON.stringify({ name })
    }),
  queryKey: ['patients'],
  // ⚡ Actualizar SOLO el item modificado
  getOptimisticData: ({ id, name }, oldPatients) =>
    oldPatients.map(p => p.id === id ? { ...p, name } : p),
  successMessage: 'Actualizado'
})

// Usar: updatePatient.mutate({ id: '123', name: 'Nuevo' })
\`\`\`

---

## 🗑️ Patrón 4: Eliminación → Optimística

### ❌ ANTES

\`\`\`tsx
const deletePatient = async (id: string) => {
  await fetch(\`/api/patients/\${id}\`, { method: 'DELETE' })
  
  // ⏳ Recargar todo
  const data = await fetch('/api/patients').then(r => r.json())
  setPatients(data)
}
\`\`\`

### ✅ DESPUÉS

\`\`\`tsx
import { useDeleteOptimistic } from '@/lib/hooks/use-optimistic-mutation'

const deletePatient = useDeleteOptimistic('patients')

// ⚡ Se elimina INMEDIATAMENTE de la UI
deletePatient.mutate({ id: '123' })
\`\`\`

---

## 🔍 Patrón 5: Prefetch de Detalle

### ❌ ANTES

\`\`\`tsx
// Usuario hace click → espera → carga
<Link href={\`/patients/\${id}\`}>
  Ver Detalle
</Link>
\`\`\`

### ✅ DESPUÉS

\`\`\`tsx
import { usePrefetch } from '@/lib/hooks/use-prefetch'

const { prefetchRoute, prefetchData } = usePrefetch()

<Link 
  href={\`/patients/\${id}\`}
  onMouseEnter={() => {
    // Precargar ruta
    prefetchRoute(\`/patients/\${id}\`)
    
    // Precargar datos
    prefetchData(
      ['patient', id],
      () => fetch(\`/api/patients/\${id}\`).then(r => r.json())
    )
  }}
>
  Ver Detalle
</Link>
\`\`\`

---

## 🎨 Consejos de Implementación

### 1. **QueryKeys Consistentes**

Usa la misma queryKey en todos los lugares:

\`\`\`tsx
// ✅ Bueno - Consistente
const queryKey = ['patients']

useQuery({ queryKey })
useOptimisticMutation({ queryKey })
\`\`\`

### 2. **Optimistic Data Preciso**

Replica la estructura exacta de tus datos:

\`\`\`tsx
getOptimisticData: (newItem, oldItems) => {
  // ✅ Incluir TODOS los campos que usa tu UI
  return [
    {
      id: \`temp-\${Date.now()}\`,
      ...newItem,
      created_at: new Date().toISOString(),
      status: 'pending' // Para feedback visual
    },
    ...oldItems
  ]
}
\`\`\`

### 3. **Feedback Visual**

Indica items pendientes:

\`\`\`tsx
<div className={item.status === 'pending' ? 'opacity-60' : ''}>
  {item.name}
  {item.status === 'pending' && ' (guardando...)'}
</div>
\`\`\`

### 4. **Error Handling**

El rollback es automático, pero puedes agregar lógica:

\`\`\`tsx
useOptimisticMutation({
  // ...
  onError: (error) => {
    console.error('Falló:', error)
    toast.error('No se pudo guardar')
  }
})
\`\`\`

---

## 🚀 Quick Start para Componente Nuevo

\`\`\`tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { useOptimisticMutation } from '@/lib/hooks/use-optimistic-mutation'
import { InstantLink } from '@/lib/hooks/use-instant-transition'

export function MiComponenteOptimizado() {
  // 1. Obtener datos con cache
  const { data = [] } = useQuery({
    queryKey: ['mi-entidad'],
    queryFn: () => fetch('/api/mi-entidad').then(r => r.json())
  })

  // 2. Mutación optimista
  const crear = useOptimisticMutation({
    mutationFn: (datos) => fetch('/api/mi-entidad', {
      method: 'POST',
      body: JSON.stringify(datos)
    }),
    queryKey: ['mi-entidad'],
    getOptimisticData: (nuevo, viejos) => [nuevo, ...viejos]
  })

  // 3. Render con InstantLink
  return (
    <div>
      {data.map(item => (
        <InstantLink key={item.id} href={\`/detalle/\${item.id}\`}>
          {item.nombre}
        </InstantLink>
      ))}
    </div>
  )
}
\`\`\`

---

## 📊 Medición de Éxito

Tu componente es instantáneo si:

- ✅ Click → UI cambia en < 16ms (60 FPS)
- ✅ Navegación sin "flashes" blancos  
- ✅ Sin "spinners" durante mutaciones normales
- ✅ Datos disponibles al hacer hover
- ✅ Se siente como app nativa

---

¡Ahora convierte tus componentes a instantáneos! 🚀
