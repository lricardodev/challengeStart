"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Rocket, 
  Target, 
  Users, 
  BarChart2, 
  Layers, 
  Presentation,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles
} from "lucide-react";

const slides = [
  {
    id: "intro",
    title: "¿Qué es LaunchLoop?",
    subtitle: "De la idea al MVP validado",
    icon: Rocket,
    color: "text-blue-400",
    bg: "from-blue-600/20 to-blue-900/5",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/20",
    content: "LaunchLoop es un copiloto que estoy creando para ayudar a personas que quieren construir ideas o startups, pero no saben cómo validarlas correctamente.\n\nCreo que muchas buenas ideas nunca llegan a existir porque las personas construyen a ciegas, sin estructura, claridad o experiencia previa.\n\nPor eso, LaunchLoop guía a founders primerizos a través de 5 micro-sprints enfocados en validar problemas reales mediante entrevistas, hipótesis y experimentos rápidos.\n\nMi objetivo es hacer que emprender sea más accesible y ayudar a convertir ideas en proyectos reales con propósito."

    },
  {
    id: "sprint1",
    title: "Sección 1: Definir Problema",
    subtitle: "Encuentra el dolor real",
    icon: Target,
    color: "text-blue-400",
    bg: "from-blue-600/20 to-blue-900/5",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/20",
    content: "Antes de pensar en la solución, debes entender el problema. En esta sección identificarás quién es tu cliente ideal, qué tan grave es su dolor y qué alternativas usa actualmente para resolverlo."
  },
  {
    id: "sprint2",
    title: "Sección 2: Entrevistas",
    subtitle: "Habla con tus usuarios",
    icon: Users,
    color: "text-violet-400",
    bg: "from-violet-600/20 to-violet-900/5",
    border: "border-violet-500/20",
    glow: "shadow-violet-500/20",
    content: "Las suposiciones no sirven, necesitas hechos. Aquí aprenderás a generar preguntas inteligentes y podrás registrar las respuestas de tus entrevistas reales en un solo lugar centralizado."
  },
  {
    id: "sprint3",
    title: "Sección 3: Detectar Patrones",
    subtitle: "Analiza las respuestas",
    icon: BarChart2,
    color: "text-cyan-400",
    bg: "from-cyan-600/20 to-cyan-900/5",
    border: "border-cyan-500/20",
    glow: "shadow-cyan-500/20",
    content: "Después de hablar con las personas, esta sección te ayuda a encontrar similitudes. Detecta dolores repetidos, palabras clave frecuentes y descubre oportunidades ocultas en las respuestas."
  },
  {
    id: "sprint4",
    title: "Sección 4: Crear MVP",
    subtitle: "Elige tu primer prototipo",
    icon: Layers,
    color: "text-amber-400",
    bg: "from-amber-600/20 to-amber-900/5",
    border: "border-amber-500/20",
    glow: "shadow-amber-500/20",
    content: "Ya validaste el problema. Ahora debes elegir cómo lanzar tu Producto Mínimo Viable de forma ágil. Te daremos un plan de acción (ya sea para una Landing Page, una Waitlist o un prototipo)."
  },
  {
    id: "sprint5",
    title: "Sección 5: Preparar Pitch",
    subtitle: "Consolida tu aprendizaje",
    icon: Presentation,
    color: "text-emerald-400",
    bg: "from-emerald-600/20 to-emerald-900/5",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/20",
    content: "El paso final. Consolida todos los datos recolectados en un Pitch listo para presentarse. Tendrás claro el problema, la solución validada y los próximos pasos para construir tu empresa."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 }
  },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, router]);

  const nextSlide = () => {
    if (current < slides.length - 1) setCurrent(c => c + 1);
  };

  const prevSlide = () => {
    if (current > 0) setCurrent(c => c - 1);
  };

  const isLast = current === slides.length - 1;
  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-[#020617] selection:bg-yellow-500/30 selection:text-yellow-100">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="absolute inset-0 transition-colors duration-1000 ease-in-out mix-blend-screen opacity-50">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br ${slide.bg} blur-[120px] rounded-full`} 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, -50, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr ${slide.bg} blur-[120px] rounded-full`} 
          />
        </div>
      </div>

      <button 
        onClick={() => router.push("/")}
        className="group absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-yellow-500/10 transition-all text-slate-400 hover:text-yellow-300 z-50 flex items-center gap-2 text-sm backdrop-blur-md border border-white/10 hover:border-yellow-500/30 hover:scale-105"
      >
        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        <span className="hidden sm:inline pr-2 font-medium">Cerrar Tour</span>
      </button>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-12">
        <div className="flex gap-3 mb-16 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="relative group h-2 rounded-full overflow-hidden transition-all duration-500 ease-out"
              style={{ width: i === current ? '64px' : '24px' }}
            >
              <div className="absolute inset-0 bg-white/20 group-hover:bg-white/40 transition-colors" />
              {i === current && (
                <motion.div 
                  layoutId="activeProgress"
                  className="absolute inset-0 bg-yellow-400 shadow-[0_0_12px_rgba(242,202,0,0.85)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div
          ref={cardRef}
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full relative group"
        >
          <div className={`absolute -inset-1 bg-gradient-to-r ${slide.bg} rounded-[3rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-1000`} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="relative w-full glass-panel p-8 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col md:flex-row gap-12 items-center text-center md:text-left backdrop-blur-2xl bg-[#091120]/80 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <motion.div 
                variants={itemVariants}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg} blur-xl opacity-50 rounded-full`} />
                <div className={`relative p-8 md:p-10 rounded-[2rem] bg-gradient-to-br ${slide.bg} border ${slide.border} shrink-0 shadow-inner backdrop-blur-md`}>
                  <Icon className={`w-20 h-20 md:w-28 md:h-28 ${slide.color} drop-shadow-lg`} strokeWidth={1.5} />
                </div>
              </motion.div>

              <div className="flex-1 space-y-6">
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Sparkles className={`w-4 h-4 ${slide.color}`} />
                  <span className={`text-xs md:text-sm font-mono uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r ${slide.bg} font-bold`}>
                    {slide.subtitle}
                  </span>
                </motion.div>
                
                <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  {slide.title.split(':').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i === 0 && arr.length > 1 && <span className="text-white/40">:</span>}
                      {i === 0 && arr.length > 1 && <br className="hidden md:block" />}
                    </span>
                  ))}
                </motion.h1>
                
                <motion.p variants={itemVariants} className="text-lg md:text-2xl text-slate-300 leading-relaxed max-w-2xl font-light">
                  {slide.content.split('\n\n').map((paragraph, idx) => (
                    <span key={idx} className="block mb-4 last:mb-0">{paragraph}</span>
                  ))}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="flex items-center gap-6 mt-16 z-20">
          <button
            onClick={prevSlide}
            disabled={current === 0}
            className="group p-5 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-0 disabled:pointer-events-none transition-all text-white backdrop-blur-md border border-white/10 hover:border-white/20 hover:-translate-x-1"
          >
            <ArrowLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          {isLast ? (
            <button
              onClick={() => router.push("/")}
              className="group relative px-10 py-5 rounded-full bg-blue-600 text-white font-bold text-xl shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] transition-all flex items-center gap-4 border border-blue-400/30 overflow-hidden hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-violet-500 to-blue-600 bg-[length:200%_auto] animate-pulse" />
              <span className="relative z-10 flex items-center gap-3">
                Iniciar mi proyecto
                <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
          ) : (
            <button
              onClick={nextSlide}
              className="group px-10 py-5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xl backdrop-blur-md border border-white/10 hover:border-white/20 transition-all flex items-center gap-4 hover:scale-105"
            >
              Siguiente
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
