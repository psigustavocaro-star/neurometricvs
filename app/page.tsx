import Link from "next/link"
import { ArrowRight, Check, ChevronDown, Menu, X, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LoginModal } from "@/components/auth/login-modal"
import { HeroCarousel } from "@/components/landing/hero-carousel"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { TestimonialsMarquee } from "@/components/landing/testimonials-marquee"
import { InstitutionsMarquee } from "@/components/landing/institutions-marquee"
import { Footer } from "@/components/layout/footer"
import { VerticalNavbar } from "@/components/layout/vertical-navbar"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden">
      <VerticalNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="w-full pt-28 md:pt-32 lg:pt-36 pb-24 md:pb-28 overflow-hidden relative">
          {/* Animated Mesh Background */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-white to-white">
            <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-teal-100/40 blur-[120px] animate-mesh mix-blend-multiply"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-100/40 blur-[100px] animate-mesh animation-delay-2000 mix-blend-multiply"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">

            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-6 xl:grid-cols-[1fr_700px] items-center">
              <div className="flex flex-col justify-center space-y-4 mt-8 md:-mt-24 lg:-mt-32 items-center text-center lg:items-start lg:text-left">


                <ScrollAnimation animation="fade-up" delay={100}>
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl/none text-slate-900 drop-shadow-sm text-balance">
                    Tu práctica psicológica, psiquiátrica y neurológica <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">simplificada.</span>
                  </h1>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up" delay={200}>
                  <p className="max-w-[700px] text-slate-600 md:text-xl leading-relaxed text-balance mx-auto lg:mx-0">
                    Automatiza la aplicación, corrección y generación de informes de tests psicológicos. Dedica más tiempo a tus pacientes y menos al papeleo.
                  </p>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up" delay={300}>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Button asChild size="lg" className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 shadow-lg shadow-teal-700/20 rounded-full px-8 h-12 text-base group">
                      <Link href="/onboarding">
                        <span className="relative z-10 flex items-center">Comenzar Prueba Gratis <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></span>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="border-slate-300 text-slate-700 hover:bg-teal-50 rounded-full px-8 h-12 text-base hover:border-teal-200 transition-all">
                      <Link href="#features">Ver Demo</Link>
                    </Button>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up" delay={400}>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mt-4 justify-center lg:justify-start">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-md ring-2 ring-transparent hover:ring-teal-100 transition-all hover:scale-110 hover:z-10">
                        <img src="/assets/v2/female-1.png" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-md ring-2 ring-transparent hover:ring-teal-100 transition-all hover:scale-110 hover:z-10">
                        <img src="/assets/v2/male-1.png" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-md ring-2 ring-transparent hover:ring-teal-100 transition-all hover:scale-110 hover:z-10">
                        <img src="/assets/v2/female-2.png" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-md ring-2 ring-transparent hover:ring-teal-100 transition-all hover:scale-110 hover:z-10">
                        <img src="/assets/v2/male-2.png" alt="User" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <p className="font-medium text-slate-600">Usado por +500 profesionales</p>
                  </div>
                </ScrollAnimation>
              </div>

              <div className="mx-auto lg:mr-0 relative h-[500px] md:h-[800px] w-full max-w-[800px] flex items-center justify-center mt-8 lg:mt-0">
                <ScrollAnimation animation="scale-up" delay={200} duration={0.8} className="w-full h-full flex items-center justify-center">
                  <div className="scale-75 md:scale-90 xl:scale-100 transition-transform origin-center">
                    <HeroCarousel />
                  </div>
                </ScrollAnimation>
                {/* Decorative elements */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full blur-[60px] md:blur-[100px] opacity-20 z-0 pointer-events-none"></div>
              </div>
            </div>
          </div>
          <div className="w-full z-20 flex flex-col items-center justify-center gap-2 mt-12 md:absolute md:bottom-8 md:mt-0">
            <span className="text-sm md:text-base font-medium text-slate-500 animate-pulse text-center px-4">
              Descubre nuestros servicios y precios
            </span>
          </div>
        </section>

        {/* Mobile Friendly Section */}
        <section id="mobile" className="w-full py-12 md:py-24 bg-white relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <ScrollAnimation animation="slide-in-left">
                <div className="space-y-6">
                  <div className="inline-block rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700 border border-teal-100">
                    Disponible en iOS y Android
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                    Lleva tu consulta a <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">todas partes.</span>
                  </h2>
                  <p className="text-slate-600 md:text-xl leading-relaxed">
                    Nuestra plataforma está optimizada para funcionar perfectamente en cualquier dispositivo. Tus pacientes pueden responder los tests cómodamente desde sus celulares, y tú puedes revisar los resultados al instante, estés donde estés.
                  </p>
                  <ul className="space-y-4 pt-4">
                    {[
                      "Interfaz adaptativa para cualquier tamaño de pantalla",
                      "Tests optimizados para respuesta táctil",
                      "Carga rápida en redes móviles",
                      "Sin necesidad de instalar aplicaciones extra"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3.5 w-3.5 text-green-600" />
                        </div>
                        <span className="text-slate-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-in-right" delay={200}>
                <div className="relative mx-auto w-[220px] sm:w-[280px] md:w-full md:max-w-[400px] aspect-[9/19] bg-slate-900 rounded-[2rem] md:rounded-[3rem] shadow-2xl border-[4px] md:border-[8px] border-slate-900 overflow-hidden">
                  {/* Screen Content */}
                  <div className="absolute inset-0 bg-slate-50 flex flex-col">
                    {/* Mock Header */}
                    <div className="h-14 bg-white border-b border-slate-100 flex items-center px-4 justify-between">
                      <div className="w-6 h-6 rounded-full bg-teal-100"></div>
                      <div className="w-24 h-3 rounded-full bg-slate-100"></div>
                      <div className="w-6 h-6 rounded-full bg-slate-100"></div>
                    </div>
                    {/* Mock Body */}
                    <div className="p-6 space-y-6 flex-1 overflow-hidden relative">
                      <div className="space-y-2">
                        <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                        <div className="h-4 w-1/2 bg-slate-100 rounded animate-pulse"></div>
                      </div>

                      <div className="space-y-3">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 ${i === 2 ? 'border-teal-500 bg-teal-500' : 'border-slate-300'}`}></div>
                            <div className="h-2 w-2/3 bg-slate-100 rounded"></div>
                          </div>
                        ))}
                      </div>

                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="h-12 w-full bg-slate-900 rounded-xl shadow-lg flex items-center justify-center text-white text-sm font-medium">
                          Siguiente Pregunta
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-slate-900 rounded-b-xl"></div>
                </div>
                {/* Decorative blob behind phone */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-teal-200/30 blur-3xl -z-10 rounded-full"></div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Testimonials Section (Relatos) */}
        <section id="testimonials" className="w-full py-12 md:py-24 pb-24 md:pb-32 bg-slate-50/50 relative overflow-hidden">
          {/* Floating Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-white rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">Relatos de Profesionales</h2>
                <p className="mt-4 text-slate-500 md:text-lg">Lo que dicen nuestros colegas sobre su experiencia.</p>
              </div>
            </ScrollAnimation>
            <div className="mt-12">
              <TestimonialsMarquee />
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section id="trust" className="w-full pt-12 md:pt-16 pb-24 md:pb-28 bg-white relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollAnimation animation="fade-in">
              <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
                Avalado por profesionales de
              </p>
              <div className="mt-8">
                <InstitutionsMarquee />
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 pb-24 md:pb-32 bg-slate-50/50 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollAnimation>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">Planes Transparentes</h2>
                  <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Invierte en tu productividad. Cancela cuando quieras.
                  </p>
                </div>
              </div>
            </ScrollAnimation>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 items-start max-w-5xl mx-auto perspective-1000">
              {/* Plan Básico */}
              <ScrollAnimation delay={0} className="h-full">
                <div className="flex flex-col p-6 bg-white shadow-lg rounded-2xl border border-slate-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:z-50 hover:border-teal-200 relative h-full group">
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">Básico</h3>
                    <p className="text-slate-500 text-sm">Para comenzar</p>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-4xl font-extrabold text-slate-900">$9.990</span>
                    <span className="text-slate-500">/mes</span>
                    <p className="text-xs text-teal-600 font-semibold mt-1">7 días gratis, luego facturación automática</p>
                  </div>
                  <ul className="mt-8 space-y-4 flex-1">
                    <li className="flex items-center text-sm text-slate-600">
                      <div className="bg-green-100 p-1 rounded-full mr-3"><Check className="h-3 w-3 text-green-600" /></div> Acceso a todos los tests
                    </li>
                    <li className="flex items-center text-sm text-slate-600">
                      <div className="bg-green-100 p-1 rounded-full mr-3"><Check className="h-3 w-3 text-green-600" /></div> PDFs con firma
                    </li>
                    <li className="flex items-center text-sm text-slate-400">
                      <div className="bg-slate-100 p-1 rounded-full mr-3"><X className="h-3 w-3 text-slate-400" /></div> Sin historial
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Button asChild className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-xl h-12 transition-all shadow-md hover:shadow-lg">
                      <Link href="/onboarding?plan=basic">Elegir Básico</Link>
                    </Button>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Plan Clínico */}
              <ScrollAnimation delay={150} className="h-full z-10">
                <div className="flex flex-col p-6 bg-white shadow-2xl rounded-2xl border-2 border-teal-600 transform md:-translate-y-4 relative z-10 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_20px_50px_rgba(15,118,110,0.2)] hover:z-50 h-full">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    MÁS POPULAR
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-slate-900">Clínico</h3>
                    <p className="text-slate-500 text-sm">Para profesionales</p>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-5xl font-extrabold text-slate-900">$14.990</span>
                    <span className="text-slate-500">/mes</span>
                    <p className="text-xs text-teal-600 font-semibold mt-1">7 días gratis, luego facturación automática</p>
                  </div>
                  <ul className="mt-8 space-y-4 flex-1">
                    <li className="flex items-center text-sm text-slate-700 font-medium">
                      <div className="bg-teal-50 p-1 rounded-full mr-3"><Check className="h-3 w-3 text-teal-700" /></div> Todo lo del Básico
                    </li>
                    <li className="flex items-center text-sm text-slate-700 font-medium">
                      <div className="bg-teal-50 p-1 rounded-full mr-3"><Check className="h-3 w-3 text-teal-700" /></div> Gestión de Pacientes
                    </li>
                    <li className="flex items-center text-sm text-slate-700 font-medium">
                      <div className="bg-teal-50 p-1 rounded-full mr-3"><Check className="h-3 w-3 text-teal-700" /></div> Historial clínico
                    </li>
                    <li className="flex items-center text-sm text-slate-700 font-medium">
                      <div className="bg-teal-50 p-1 rounded-full mr-3"><Check className="h-3 w-3 text-teal-700" /></div> Envíos automáticos
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Button asChild className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white border-none rounded-xl h-12 shadow-lg shadow-teal-600/30 relative overflow-hidden group">
                      <Link href="/onboarding?plan=clinical">
                        <span className="relative z-10">Elegir Clínico</span>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Plan Pro */}
              <ScrollAnimation delay={300} className="h-full">
                <div className="flex flex-col p-6 bg-white shadow-lg rounded-2xl border border-slate-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:z-50 hover:border-teal-200 relative h-full group">
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">Pro Anual</h3>
                    <p className="text-slate-500 text-sm">Ahorro inteligente</p>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-4xl font-extrabold text-slate-900">$60.000</span>
                    <span className="text-slate-500">/año</span>
                    <p className="text-xs text-teal-600 font-semibold mt-1">7 días gratis, luego facturación automática</p>
                  </div>
                  <div className="text-center text-xs text-green-600 font-bold mt-2 bg-green-50 inline-block mx-auto px-2 py-1 rounded-md">
                    65% OFF
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-sm text-slate-700">
                      <div className="bg-green-100 p-1 rounded-full mr-2"><Check className="h-3 w-3 text-green-600" /></div> Paga 4 meses, recibe 12
                    </li>
                    <li className="flex items-center text-sm text-slate-700">
                      <div className="bg-green-100 p-1 rounded-full mr-2"><Check className="h-3 w-3 text-green-600" /></div> Ahorra 65% vs Plan Clínico
                    </li>
                    <li className="flex items-center text-sm text-slate-700">
                      <div className="bg-green-100 p-1 rounded-full mr-2"><Check className="h-3 w-3 text-green-600" /></div> Solo $5.000 mensuales
                    </li>
                  </ul>
                  <ul className="mt-8 space-y-4 flex-1">
                    <li className="flex items-center text-sm text-slate-600">
                      <div className="bg-green-100 p-1 rounded-full mr-3"><Check className="h-3 w-3 text-green-600" /></div> Todo lo del Clínico
                    </li>
                    <li className="flex items-center text-sm text-slate-600">
                      <div className="bg-green-100 p-1 rounded-full mr-3"><Check className="h-3 w-3 text-green-600" /></div> Facturación anual
                    </li>
                    <li className="flex items-center text-sm text-slate-600">
                      <div className="bg-green-100 p-1 rounded-full mr-3"><Check className="h-3 w-3 text-green-600" /></div> Soporte VIP
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Button asChild className="w-full bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-50 rounded-xl h-12 transition-all shadow-sm hover:shadow-md">
                      <Link href="/onboarding?plan=pro">Elegir Pro</Link>
                    </Button>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section id="faq" className="w-full pt-12 md:pt-24 pb-48 md:pb-64 bg-white relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">Preguntas Frecuentes</h2>
                <p className="mt-4 text-slate-500 md:text-lg">Resolvemos tus dudas principales.</p>
              </div>
            </ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto perspective-1000">
              {[
                {
                  q: "¿Puedo cancelar mi suscripción en cualquier momento?",
                  a: "Sí, absolutamente. No hay contratos forzosos. Puedes cancelar desde tu panel de control con un solo clic y tu acceso se mantendrá hasta el final del ciclo de facturación."
                },
                {
                  q: "¿Los datos de mis pacientes están seguros?",
                  a: "La seguridad es nuestra prioridad. Utilizamos encriptación de grado bancario y cumplimos con las normativas de protección de datos de salud. Nadie más que tú tiene acceso a los expedientes."
                },
                {
                  q: "¿Qué tests están disponibles actualmente?",
                  a: "Contamos con una biblioteca creciente que incluye PHQ-9, GAD-7, BDI-II, SCL-90-R, entre otros. Añadimos nuevos tests mensualmente basados en las solicitudes de la comunidad."
                },
                {
                  q: "¿Ofrecen planes para empresas?",
                  a: "Sí, para clínicas y hospitales contáctanos para un plan a medida."
                },
                {
                  q: "¿Mis datos y los de mis pacientes son privados?",
                  a: "Absolutamente. Tu cuenta es privada y los datos están encriptados. Nosotros no tenemos acceso a la información clínica de tus pacientes."
                },
                {
                  q: "¿Cumplen con las leyes de protección de datos?",
                  a: "Sí, nuestra infraestructura cumple con GDPR y HIPAA, garantizando la máxima confidencialidad y seguridad ética."
                },
                {
                  q: "¿Qué sucede si cancelo mi suscripción?",
                  a: "Tus datos siguen siendo tuyos. Puedes exportar toda la información de tus pacientes y tests antes de cerrar tu cuenta."
                },
                {
                  q: "¿Tienen soporte si algo falla?",
                  a: "Sí, contamos con un equipo de soporte técnico especializado disponible 24/7 para resolver cualquier inconveniente de inmediato."
                }
              ].map((faq, i) => (
                <ScrollAnimation key={i} delay={i * 50}>
                  <Card className="border border-slate-100 shadow-md bg-slate-50 transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl hover:z-50 hover:bg-white hover:border-teal-200 relative group h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">{faq.q}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </div>

          {/* Back to Top Indicator */}
          <div className="absolute bottom-6 left-0 w-full flex justify-center z-20">
            <Link
              href="#hero"
              className="group flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-14 w-14 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center group-hover:border-teal-300 group-hover:shadow-teal-100/50 transition-all">
                <ArrowUp className="h-6 w-6 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </div>
              <span className="text-xs font-medium text-slate-400 group-hover:text-teal-600 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                Volver al inicio
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
