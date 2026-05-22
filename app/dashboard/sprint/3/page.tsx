"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLaunchStore } from "../../../../store/useLaunchStore";
import { BarChart2, ArrowRight, Loader2, TrendingUp, AlertCircle, Lightbulb, MessageCircle } from "lucide-react";
import Link from "next/link";

// Demo data for the roommate scenario (mirrors the proposal's demo)
const DEMO_PATTERNS = {
  totalInterviews: 12,
  painPoints: [
    { label: "Miedo a estafas / perfiles falsos", count: 9, pct: 75, color: "bg-rose-500", textColor: "text-rose-400" },
    { label: "Grupos de Facebook poco confiables", count: 7, pct: 58, color: "bg-amber-500", textColor: "text-amber-400" },
    { label: "No hay forma de verificar identidad", count: 8, pct: 67, color: "bg-orange-500", textColor: "text-orange-400" },
    { label: "Comunicación difícil antes de conocerse", count: 5, pct: 42, color: "bg-blue-500", textColor: "text-blue-400" },
    { label: "Falta de filtros por hábitos/estilo de vida", count: 6, pct: 50, color: "bg-violet-500", textColor: "text-violet-400" },
  ],
  keywords: ["seguridad", "verificación", "confianza", "Facebook", "riesgo", "estafa", "identidad"],
  opportunity: "El mayor dolor no es encontrar roommates — es poder confiar en ellos. Una solución centrada en verificación de identidad y reputación tiene alta demanda.",
  hypothesis: "Usuarios están dispuestos a pagar por una plataforma que verifique identidad y muestre reputación de potenciales roommates, antes de construir un producto completo.",
};

export default function Sprint3Page() {
  const project = useLaunchStore((s) => s.project);
  const interviews = useLaunchStore((s) => s.interviews);
  const hypotheses = useLaunchStore((s) => s.hypotheses);
  const storeAddHypothesis = useLaunchStore((s) => s.addHypothesis);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [patterns, setPatterns] = useState<typeof DEMO_PATTERNS | null>(null);
  const [hypothesisSaved, setHypothesisSaved] = useState(false);

  const analyze = async () => {
    setIsAnalyzing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setPatterns(DEMO_PATTERNS);
    setIsAnalyzing(false);
  };

  const saveHypothesis = () => {
    if (!patterns || hypothesisSaved) return;
    storeAddHypothesis({
      id: crypto.randomUUID(),
      project_id: project?.id ?? "",
      content: patterns.hypothesis,
      status: "pending",
    });
    setHypothesisSaved(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-3xl"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono uppercase tracking-widest mb-2">
          <BarChart2 className="w-3 h-3" />
          Sprint 3 / 5
        </div>
        <h1 className="text-3xl font-bold text-white">Detectar Patrones</h1>
        <p className="text-slate-400 mt-2 leading-relaxed">
          Analiza las respuestas de tus entrevistas y descubre los dolores más repetidos.
        </p>
      </div>

      {/* Analyze trigger */}
      {!patterns && (
        <div className="glass-panel border border-cyan-500/15 p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-600/20 border border-cyan-500/20 flex items-center justify-center mx-auto float">
            <BarChart2 className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg mb-1">Análisis de Patrones</h2>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              LaunchLoop analizará las respuestas de las entrevistas y detectará los temas más frecuentes.
            </p>
            {interviews.length === 0 && (
              <p className="text-amber-400/80 text-xs mt-2">
                Tip: También puedes analizar con los datos demo del escenario de roommates.
              </p>
            )}
          </div>
          <button
            id="analyze-patterns"
            onClick={analyze}
            disabled={isAnalyzing}
            className="mx-auto flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
            {isAnalyzing ? "Analizando respuestas..." : "Analizar entrevistas"}
          </button>
        </div>
      )}

      {/* Pattern results */}
      <AnimatePresence>
        {patterns && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Summary stat */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-panel border border-cyan-500/15 p-4 text-center">
                <div className="text-3xl font-bold text-cyan-400 font-mono">{patterns.totalInterviews}</div>
                <div className="text-xs text-slate-500 mt-1">personas entrevistadas</div>
              </div>
              <div className="glass-panel border border-rose-500/15 p-4 text-center">
                <div className="text-3xl font-bold text-rose-400 font-mono">9</div>
                <div className="text-xs text-slate-500 mt-1">mencionaron estafas</div>
              </div>
              <div className="glass-panel border border-amber-500/15 p-4 text-center">
                <div className="text-3xl font-bold text-amber-400 font-mono">7</div>
                <div className="text-xs text-slate-500 mt-1">usan grupos de Facebook</div>
              </div>
            </div>

            {/* Pain points bar chart */}
            <div className="glass-panel border border-slate-700/30 p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <h2 className="font-semibold text-white">Principales dolores detectados</h2>
              </div>
              {patterns.painPoints.map((pp, i) => (
                <motion.div
                  key={pp.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-1.5"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{pp.label}</span>
                    <span className={`font-mono text-xs font-bold ${pp.textColor}`}>
                      {pp.count}/{patterns.totalInterviews} ({pp.pct}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800/60 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pp.pct}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                      className={`h-full rounded-full ${pp.color} opacity-80`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Keywords cloud */}
            <div className="glass-panel border border-slate-700/30 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-cyan-400" />
                <h2 className="font-semibold text-white text-sm">Palabras más frecuentes</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {patterns.keywords.map((kw, i) => (
                  <motion.span
                    key={kw}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.06 }}
                    className="px-3 py-1.5 rounded-full text-sm font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20"
                  >
                    {kw}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Opportunity */}
            <div className="glass-panel border border-violet-500/20 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent pointer-events-none" />
              <div className="relative flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-violet-600/20 border border-violet-500/20 shrink-0">
                  <Lightbulb className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-xs font-mono text-violet-400 uppercase tracking-widest mb-2">Oportunidad detectada</p>
                  <p className="text-slate-200 leading-relaxed text-sm">{patterns.opportunity}</p>
                </div>
              </div>
            </div>

            {/* Generated hypothesis */}
            <div className="glass-panel border border-emerald-500/20 p-6 space-y-4">
              <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Hipótesis generada</p>
              <p className="text-slate-200 text-sm leading-relaxed italic">&ldquo;{patterns.hypothesis}&rdquo;</p>
              <button
                id="save-hypothesis"
                onClick={saveHypothesis}
                disabled={hypothesisSaved}
                className="px-5 py-2.5 bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed text-emerald-300 rounded-xl transition-colors text-sm font-semibold"
              >
                {hypothesisSaved ? "✓ Hipótesis guardada" : "Guardar hipótesis"}
              </button>
            </div>

            <Link
              href="/dashboard/sprint/4"
              id="go-to-sprint-4"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-colors text-sm"
            >
              Definir el MVP →
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
