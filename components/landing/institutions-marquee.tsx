"use client"

const institutions = [
    { name: "Universidad de Chile", logo: "/logos/uchile.jpg" },
    { name: "Pontificia Universidad Católica de Chile", logo: "/logos/puc.png" },
    { name: "Clínica Las Condes", logo: "/logos/clinica-las-condes-v2.png" },
    { name: "Universidad de Buenos Aires", logo: "/logos/uba.png" },
    { name: "Mayo Clinic", logo: "/logos/mayo-clinic.png" },
]

export function InstitutionsMarquee() {
    return (
        <div className="w-full overflow-hidden relative">
            {/* Inline Style for keyframes to avoid styled-jsx issues in some environments */}
            <style>
                {`
                @keyframes infinite-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 40s linear infinite;
                }
                .pause:hover {
                    animation-play-state: paused;
                }
                `}
            </style>

            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background via-background/80 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background via-background/80 to-transparent z-10"></div>

            <div className="flex gap-12 w-max animate-infinite-scroll pause">
                {/* Double the list for seamless loop */}
                {[...institutions, ...institutions].map((item, i) => (
                    <div key={i} className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="h-16 w-32 flex items-center justify-center bg-white p-2 rounded-lg shadow-sm">
                            <img
                                src={item.logo}
                                alt={`Logo ${item.name}`}
                                className="h-full w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
