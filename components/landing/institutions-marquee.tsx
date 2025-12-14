'use client'

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
        <div className="w-full overflow-hidden relative">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

            <div className="flex gap-12 w-max animate-infinite-scroll hover:pause">
                {/* Double the list for seamless loop */}
                {[...institutions, ...institutions].map((item, i) => (
                    <div key={i} className="flex flex-col items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="h-12 w-auto flex items-center justify-center">
                            <img
                                src={item.logo}
                                alt={`Logo ${item.name}`}
                                className="h-full w-auto object-contain max-w-[150px]"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <style jsx global>{`
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
            `}</style>
        </div>
    )
}
