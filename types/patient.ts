export interface PatientIntervencionStats {
    tests_pendientes: number
    genograma_al_dia: boolean
    apps_activas: number
}

export interface Patient {
    id: string
    full_name: string
    birth_date: string | null
    gender: string
    contact_email: string | null
    created_at: string

    // Extended fields
    rut?: string | null
    age?: number | null
    phone?: string | null
    address?: string | null
    clinic?: string | null
    education?: string | null
    occupation?: string | null
    companion?: string | null
    emergency_contact?: string | null
    genogram?: string | null

    // New Clinical Fields
    diagnostico_principal?: string
    stats_intervencion?: PatientIntervencionStats
    id_clinico?: string
    proxima_sesion?: string
}
