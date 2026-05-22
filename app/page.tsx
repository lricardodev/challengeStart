"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Target, Users, TrendingUp, Lightbulb, CheckCircle2 } from "lucide-react";
import { useLaunchStore } from "../store/useLaunchStore";

const DEMO_IDEA = "Una app para encontrar roommates confiables y seguros.";

const steps = [
  { icon: Target, label: "Define el problema", color: "text-blue-400" },
  { icon: Users, label: "Genera entrevistas", color: "text-violet-400" },
  { icon: TrendingUp, label: "Detecta patrones", color: "text-cyan-400" },
  { icon: Lightbulb, label: "Diseña tu MVP", color: "text-amber-400" },
  { icon: CheckCircle2, label: "Presenta el pitch", color: "text-emerald-400" },
];

export default function OnboardingPage() {
  const [idea, setIdea] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const setProject = useLaunchStore((state) => state.setProject);

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
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />
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
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-sm text-blue-300"
        >
          <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-blue-400/20">
            <img src="/IconStart.jpg" alt="IconStart Logo" className="w-full h-full object-cover" />
          </div>
          MVP en 5 micro-sprints accionables
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            <span className="text-gradient-white">De la idea al</span>
            <br />
            <span className="text-gradient-blue">MVP validado.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
            LaunchLoop convierte tu idea en un experimento real. Sin caos, sin
            sospechas, solo pasos claros y resultados medibles.
          </p>
        </motion.div>

        {/* Sprint steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {steps.map(({ icon: Icon, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass text-sm text-slate-300"
            >
              <span className="w-5 h-5 rounded-full bg-blue-500/10 text-[10px] font-bold text-blue-400 flex items-center justify-center border border-blue-500/20">
                {i + 1}
              </span>
              <Icon className={`w-3.5 h-3.5 ${color}`} />
              {label}
            </motion.div>
          ))}
        </motion.div>

        {/* Input form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full space-y-3"
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
                placeholder="e.g. Una app para encontrar roommates seguros…"
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
                  Iniciar Loop
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </form>

          {/* Demo trigger */}
          <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
            <span>¿Sin idea todavía?</span>
            <button
              id="demo-btn"
              onClick={handleDemo}
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors font-medium"
            >
              Ver demo con la app de roommates →
            </button>
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-6 text-xs text-slate-500"
        >
          {[
            ["500+", "ideas validadas"],
            ["12min", "para tu primera hipótesis"],
            ["5 pasos", "estructurados"],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-slate-300 font-bold text-base font-mono">{num}</div>
              <div>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
