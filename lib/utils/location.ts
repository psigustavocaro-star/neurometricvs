export type Country = 'CL' | 'AR' | 'MX' | 'ES' | 'CO' | 'OTHER'

export const countryNames: Record<Country, string> = {
    CL: 'Chile',
    AR: 'Argentina',
    MX: 'México',
    ES: 'España',
    CO: 'Colombia',
    OTHER: 'Internacional'
}

export function getCurrentCountry(): Country {
    // In a real app, this would use a locale header or IP detection
    // For this demonstration and as requested, we'll default to Chile
    return 'CL'
}

export function getNormsText(country: Country): string {
    const countryName = countryNames[country]
    return `Los baremos y criterios de tabulación aplicados corresponden a la población de ${countryName}.`
}
