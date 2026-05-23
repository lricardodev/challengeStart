"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  Users,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  Presentation,
  Sparkles,
} from "lucide-react";
import { useLaunchStore } from "../store/useLaunchStore";

const DEMO_IDEA = "Una app para encontrar roommates confiables y seguros.";

const steps = [
  {
    icon: Target,
    label: "Problema",
    desc: "Entiende el dolor real",
    color: "text-blue-400",
    border: "border-blue-500/20",
    bg: "bg-blue-500/10",
  },
  {
    icon: Users,
    label: "Entrevistas",
    desc: "Escucha a usuarios reales",
    color: "text-violet-400",
    border: "border-violet-500/20",
    bg: "bg-violet-500/10",
  },
  {
    icon: TrendingUp,
    label: "Patrones",
    desc: "Detecta lo que se repite",
    color: "text-cyan-400",
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Lightbulb,
    label: "MVP",
    desc: "Elige cómo validar",
    color: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/10",
  },
  {
    icon: CheckCircle2,
    label: "Pitch",
    desc: "Presenta con datos",
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/10",
  },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 19) return "Buenas tardes";
  return "Buenas noches";
}

export default function OnboardingPage() {
  const [idea, setIdea] = useState("");
  const [focused, setFocused] = useState(false);
  const [greeting, setGreeting] = useState("Hola");
  const router = useRouter();
  const setProject = useLaunchStore((state) => state.setProject);

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setProject({
      id: crypto.randomUUID(),
      user_id: "mock-user-id",
      idea_description: idea.trim(),
      status: "idea",
    });

    router.push("/dashboard");
  };

  const handleDemo = () => {
    setProject({
      id: crypto.randomUUID(),
      user_id: "mock-user-id",
      idea_description: DEMO_IDEA,
      status: "idea",
    });
    router.push("/dashboard");
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] glow-blue pulse-glow" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] glow-cyan opacity-40" />
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] glow-yellow-ambient opacity-60 rounded-full blur-3xl pulse-glow" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-10">
        {/* Greeting + Brand */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shrink-0 border border-blue-400/20 shadow-lg shadow-blue-900/40">
              <img
                src="/IconStart.jpg"
                alt="LaunchLoop"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              LaunchLoop
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 text-xs text-slate-400 font-mono">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>
              Mi entrega para el <strong>Challenge START Lima</strong>
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center space-y-5"
        >
          <p className="text-lg text-slate-500 font-light">{greeting} 👋</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            <span className="text-gradient-white">¿Qué quieres</span>
            <br />
            <span className="text-gradient-blue">validar hoy?</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 max-w-lg mx-auto leading-relaxed">
            Describe tu idea y te guiaré paso a paso: desde entender el problema
            real hasta tener un pitch listo con datos.
          </p>
        </motion.div>

        {/* Input form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full space-y-4"
        >
          <form onSubmit={handleSubmit} className="relative group">
            {/* Glow border on focus */}
            <div
              className={`absolute -inset-0.5 rounded-3xl blur transition-opacity duration-500 ${
                focused
                  ? "opacity-100 bg-gradient-to-r from-blue-500/40 via-violet-500/30 to-cyan-500/30"
                  : "opacity-0"
              }`}
            />
            <div className="relative flex flex-col sm:flex-row gap-2 glass rounded-3xl p-2 border border-blue-500/15">
              <input
                id="idea-input"
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Describe tu idea en una frase…"
                className="flex-1 bg-transparent border-none outline-none px-5 py-4 text-white placeholder:text-slate-600 font-mono text-sm"
                autoFocus
              />
              <button
                id="start-loop-btn"
                type="submit"
                disabled={!idea.trim()}
                className="relative px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm transition-all duration-200 overflow-hidden group/btn disabled:opacity-40 disabled:cursor-not-allowed bg-blue-600 hover:bg-violet-400 hover:text-slate-950 text-white shadow-lg shadow-blue-900/50 hover:shadow-violet-500/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Comenzar
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </form>

          {/* Demo trigger */}
          <div className="flex items-center justify-center">
            <button
              id="demo-btn"
              onClick={handleDemo}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm text-slate-500 hover:text-blue-300 hover:bg-blue-500/5 border border-transparent hover:border-blue-500/15 transition-all duration-200"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Probar con ejemplo: app de roommates
            </button>
          </div>
        </motion.div>

        {/* Bottom actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={() => router.push("/presentacion")}
            className="relative overflow-hidden px-10 py-5 mt-4 rounded-2xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 hover:from-violet-500 hover:via-blue-500 hover:to-cyan-500 text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-[0_0_45px_rgba(59,130,246,0.35)] hover:shadow-[0_0_65px_rgba(242,202,0,0.55)] group flex items-center gap-4"
          >
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md text-white shadow-inner relative z-10">
              <Presentation className="w-6 h-6" />
            </div>

            <span className="relative z-10 tracking-wide">
              VER PRESENTACIÓN DEL PROYECTO
            </span>

            <div className="relative z-10 bg-white/10 p-1.5 rounded-lg group-hover:bg-white/20 transition-colors">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </motion.div>

        {/* How it works — 5 sprints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full space-y-4"
        >
          <p className="text-xs text-slate-600 font-mono uppercase tracking-widest text-center">
            5 pasos — de la idea al pitch
          </p>
          <div className="grid grid-cols-5 gap-2">
            {steps.map(({ icon: Icon, label, desc, color, border, bg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.07 }}
                className={`glass-panel border ${border} p-3 flex flex-col items-center gap-2 text-center`}
              >
                <div className={`p-2 rounded-xl ${bg} border ${border}`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <span className="text-xs font-semibold text-white leading-tight">
                  {label}
                </span>
                <span className="text-[10px] text-slate-500 leading-tight hidden sm:block">
                  {desc}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
