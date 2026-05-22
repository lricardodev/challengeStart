"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLaunchStore } from "../../../../store/useLaunchStore";
import { Target, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

const SEGMENTS = ["Estudiantes universitarios", "Jóvenes profesionales", "Emprendedores", "Padres con hijos", "Freelancers", "Otro"];
const FREQUENCIES = ["Varias veces al día", "Diariamente", "Varias veces por semana", "Mensualmente", "Ocasionalmente"];
const CURRENT_SOLUTIONS = ["Grupos de Facebook / WhatsApp", "Plataformas como Airbnb / Idealista", "Agencias inmobiliarias", "Boca a boca", "Sin solución concreta"];

export default function Sprint1Page() {
  const project = useLaunchStore((s) => s.project);
  const updateStatus = useLaunchStore((s) => s.updateStatus);

  const [segment, setSegment] = useState("");
  const [customSegment, setCustomSegment] = useState("");
  const [frequency, setFrequency] = useState("");
  const [currentSolution, setCurrentSolution] = useState("");
  const [saved, setSaved] = useState(false);

  const effectiveSegment = segment === "Otro" ? customSegment : segment;
  const canSave = effectiveSegment && frequency && currentSolution;

  const handleSave = () => {
    if (!canSave) return;
    updateStatus("hypotheses");
    setSaved(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-2xl"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-blue-400 font-mono uppercase tracking-widest mb-2">
          <Target className="w-3 h-3" />
          Sprint 1 / 5
        </div>
        <h1 className="text-3xl font-bold text-white">Definir el Problema</h1>
        <p className="text-slate-400 mt-2 leading-relaxed">
          Antes de construir algo, necesitas entender exactamente el problema que resuelves.
        </p>
      </div>

      {/* Idea chip */}
      <div className="glass-panel border border-blue-500/15 p-4">
        <p className="text-xs text-blue-400 font-mono uppercase tracking-widest mb-1">Tu idea</p>
        <p className="text-slate-300 text-sm leading-relaxed">{project?.idea_description}</p>
      </div>

      <div className="space-y-6">
        {/* Q1 - Segment */}
        <div className="glass-panel border border-blue-500/10 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 font-mono">1</span>
            <h2 className="font-semibold text-white">¿Quién tiene este problema?</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SEGMENTS.map((s) => (
              <button
                key={s}
                id={`segment-${s.replace(/\s+/g, "-")}`}
                onClick={() => setSegment(s)}
                className={`px-3 py-2.5 rounded-xl text-sm border transition-all duration-200 text-left ${
                  segment === s
                    ? "bg-blue-600/30 border-blue-500/50 text-blue-300"
                    : "border-slate-700/50 text-slate-400 hover:border-violet-500/30 hover:text-violet-300 hover:bg-violet-600/5"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {segment === "Otro" && (
            <input
              type="text"
              value={customSegment}
              onChange={(e) => setCustomSegment(e.target.value)}
              placeholder="Describe el segmento..."
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/40 transition-colors"
            />
          )}
        </div>

        {/* Q2 - Frequency */}
        <div className="glass-panel border border-blue-500/10 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 font-mono">2</span>
            <h2 className="font-semibold text-white">¿Qué tan frecuente es el problema?</h2>
          </div>
          <div className="flex flex-col gap-2">
            {FREQUENCIES.map((f) => (
              <button
                key={f}
                id={`frequency-${f.replace(/\s+/g, "-")}`}
                onClick={() => setFrequency(f)}
                className={`px-4 py-3 rounded-xl text-sm border transition-all duration-200 text-left flex items-center gap-3 ${
                  frequency === f
                    ? "bg-blue-600/30 border-blue-500/50 text-blue-300"
                    : "border-slate-700/50 text-slate-400 hover:border-violet-500/30 hover:text-violet-300 hover:bg-violet-600/5"
                }`}
              >
                <div className={`w-2 h-2 rounded-full transition-colors ${frequency === f ? "bg-blue-400" : "bg-slate-600"}`} />
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Q3 - Current solution */}
        <div className="glass-panel border border-blue-500/10 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 font-mono">3</span>
            <h2 className="font-semibold text-white">¿Qué solución usan hoy?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CURRENT_SOLUTIONS.map((cs) => (
              <button
                key={cs}
                id={`solution-${cs.replace(/[\s/]+/g, "-")}`}
                onClick={() => setCurrentSolution(cs)}
                className={`px-3 py-2.5 rounded-xl text-sm border transition-all duration-200 text-left ${
                  currentSolution === cs
                    ? "bg-blue-600/30 border-blue-500/50 text-blue-300"
                    : "border-slate-700/50 text-slate-400 hover:border-violet-500/30 hover:text-violet-300 hover:bg-violet-600/5"
                }`}
              >
                {cs}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary & CTA */}
      {canSave && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel border border-emerald-500/20 p-5"
        >
          <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">Resumen generado</p>
          <p className="text-slate-200 text-sm leading-relaxed">
            <strong className="text-white">{effectiveSegment}</strong> tienen el problema{" "}
            <strong className="text-white">{frequency.toLowerCase()}</strong> y actualmente
            lo resuelven con <strong className="text-white">{currentSolution.toLowerCase()}</strong>.
            Tu idea puede ser una alternativa superior.
          </p>
        </motion.div>
      )}

      <div className="flex items-center gap-4 pt-2">
        <button
          id="save-sprint-1"
          onClick={handleSave}
          disabled={!canSave}
          className="px-6 py-3 bg-blue-600 hover:bg-violet-400 hover:text-slate-950 hover:shadow-violet-500/20 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 text-sm"
        >
          {saved ? "✓ Guardado" : "Guardar definición"}
        </button>
        {saved && (
          <Link
            href="/dashboard/sprint/2"
            className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-800/80 hover:border-violet-400/40 hover:text-violet-300 text-white rounded-xl font-semibold text-sm border border-slate-700/50 transition-all duration-200"
          >
            Sprint 2: Entrevistas
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
