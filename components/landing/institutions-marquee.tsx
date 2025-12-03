'use client'

import { ScrollAnimation } from "@/components/ui/scroll-animation"

const institutions = [
    { name: "Universidad de Chile", logo: "/logos/uchile.jpg" },
    { name: "Pontificia Universidad Católica de Chile", logo: "/logos/puc.png" },
    { name: "Universidad Nacional Autónoma de México", logo: "/logos/unam-full.png" },
    { name: "Clínica Las Condes", logo: "/logos/clinica-las-condes-v2.png" },
    { name: "Clínica Barcelona", logo: "/logos/clinica-barcelona.png" },
    { name: "Universidad de Buenos Aires", logo: "/logos/uba.png" },
    { name: "Mayo Clinic", logo: "/logos/mayo-clinic.png" },
]

export function InstitutionsMarquee() {
    return (
        <div className="w-full overflow-hidden relative py-8">
            {/* Gradient Masks for smooth fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-max animate-marquee gap-12 items-center">
                {/* Original Set */}
                {institutions.map((item, i) => (
                    <InstitutionLogo key={`original-${i}`} item={item} />
                ))}
                {/* Duplicate Set for infinite loop */}
                {institutions.map((item, i) => (
                    <InstitutionLogo key={`duplicate-${i}`} item={item} />
                ))}
                {/* Triplicate Set for smoother loop on wide screens */}
                {institutions.map((item, i) => (
                    <InstitutionLogo key={`triplicate-${i}`} item={item} />
                ))}
            </div>
        </div>
    )
}

function InstitutionLogo({ item }: { item: typeof institutions[0] }) {
    return (
        <div className="flex-shrink-0 group flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 hover:bg-slate-50 hover:shadow-sm cursor-default border border-transparent hover:border-slate-100">
            <div className="relative h-12 w-12 flex-shrink-0 flex items-center justify-center">
                <img
                    src={item.logo}
                    alt={`Logo ${item.name}`}
                    className="max-h-full max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
            </div>
            <span className="text-sm font-medium text-slate-500 group-hover:text-slate-900 transition-colors duration-300 whitespace-nowrap">
                {item.name}
            </span>
        </div>
    )
}
