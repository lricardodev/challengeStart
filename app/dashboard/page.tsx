"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLaunchStore } from "../../store/useLaunchStore";
import {
  Target,
  Users,
  BarChart2,
  Layers,
  Presentation,
  Lightbulb,
  Brain,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

const sprints = [
  {
    id: 1,
    label: "Definir Problema",
    description: "Identifica quién tiene el problema, qué tan frecuente es y qué solución usan hoy.",
    icon: Target,
    href: "/dashboard/sprint/1",
    color: "text-blue-400",
    accent: "from-blue-600/20 to-transparent",
    border: "border-blue-500/20",
    glow: "bg-blue-500/10",
  },
  {
    id: 2,
    label: "Entrevistas",
    description: "Genera preguntas inteligentes para hablar con usuarios reales y registrar respuestas.",
    icon: Users,
    href: "/dashboard/sprint/2",
    color: "text-violet-400",
    accent: "from-violet-600/20 to-transparent",
    border: "border-violet-500/20",
    glow: "bg-violet-500/10",
  },
  {
    id: 3,
    label: "Detectar Patrones",
    description: "Analiza las respuestas y detecta dolores repetidos, palabras frecuentes y oportunidades.",
    icon: BarChart2,
    href: "/dashboard/sprint/3",
    color: "text-cyan-400",
    accent: "from-cyan-600/20 to-transparent",
    border: "border-cyan-500/20",
    glow: "bg-cyan-500/10",
  },
  {
    id: 4,
    label: "Crear MVP",
    description: "Elige el tipo de MVP (landing, waitlist, prototipo) y obtén un plan de acción.",
    icon: Layers,
    href: "/dashboard/sprint/4",
    color: "text-amber-400",
    accent: "from-amber-600/20 to-transparent",
    border: "border-amber-500/20",
    glow: "bg-amber-500/10",
  },
  {
    id: 5,
    label: "Preparar Pitch",
    description: "Consolida todo en un pitch listo para presentar: problema, solución y próximos pasos.",
    icon: Presentation,
    href: "/dashboard/sprint/5",
    color: "text-emerald-400",
    accent: "from-emerald-600/20 to-transparent",
    border: "border-emerald-500/20",
    glow: "bg-emerald-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DashboardPage() {
  const project = useLaunchStore((state) => state.project);
  const hypotheses = useLaunchStore((state) => state.hypotheses);
  const interviews = useLaunchStore((state) => state.interviews);

  const validatedCount = hypotheses.filter((h) => h.status === "validated").length;
  const progress = hypotheses.length > 0 ? Math.round((validatedCount / hypotheses.length) * 100) : 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-blue-400 font-mono uppercase tracking-widest mb-2">
          <TrendingUp className="w-3 h-3" />
          Overview
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Tu Loop de Validación
        </h1>
        <p className="text-slate-400">
          Sigue los 5 pasos en orden. Cada sprint desbloquea el siguiente.
        </p>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {[
          { label: "Hipótesis", value: hypotheses.length, icon: Brain, color: "text-blue-400" },
          { label: "Validadas", value: validatedCount, icon: CheckCircle2, color: "text-emerald-400" },
          { label: "Entrevistas", value: interviews.length, icon: Users, color: "text-violet-400" },
          { label: "Progreso", value: `${progress}%`, icon: TrendingUp, color: "text-cyan-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-panel p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-xs text-slate-500 font-mono uppercase tracking-wide">{label}</span>
            </div>
            <div className={`text-3xl font-bold font-mono ${color}`}>{value}</div>
          </div>
        ))}
      </motion.div>

      {/* Idea reminder */}
      <motion.div
        variants={itemVariants}
        className="glass-panel p-5 border border-blue-500/15 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent pointer-events-none" />
        <div className="relative flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/20 shrink-0">
            <Lightbulb className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">Tu idea</p>
            <p className="text-slate-200 leading-relaxed">{project?.idea_description}</p>
          </div>
        </div>
      </motion.div>

      {/* Sprint cards grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {sprints.map((sprint, i) => {
          const Icon = sprint.icon;
          return (
            <motion.div
              key={sprint.id}
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <Link
                id={`sprint-card-${sprint.id}`}
                href={sprint.href}
                className={`glass-panel border ${sprint.border} p-6 flex flex-col gap-4 h-full group cursor-pointer block`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-xl ${sprint.glow} border ${sprint.border}`}>
                    <Icon className={`w-5 h-5 ${sprint.color}`} />
                  </div>
                  <span className={`text-xs font-mono ${sprint.color} opacity-60`}>
                    Sprint {i + 1}
                  </span>
                </div>

                <div className="flex-1">
                  <h2 className="font-semibold text-white mb-2 group-hover:text-violet-400 transition-colors">
                    {sprint.label}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed">{sprint.description}</p>
                </div>

                <div className={`flex items-center gap-1 text-xs ${sprint.color} opacity-0 group-hover:opacity-100 transition-opacity font-medium`}>
                  Ir al sprint
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${sprint.accent} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl`} />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
