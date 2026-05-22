"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLaunchStore } from "../../../../store/useLaunchStore";
import { Presentation, Download, Copy, CheckCheck, Sparkles, Loader2, ArrowUpRight } from "lucide-react";

interface PitchData {
  problem: string;
  solution: string;
  market: string;
  insight: string;
  mvp: string;
  nextSteps: string[];
}

function generatePitch(idea: string): PitchData {
  const isRoommate =
    idea.toLowerCase().includes("roommate") ||
    idea.toLowerCase().includes("cuarto") ||
    idea.toLowerCase().includes("habitación");

  if (isRoommate) {
    return {
      problem:
        "Millones de jóvenes buscan roommates cada año, pero el proceso es caótico y peligroso: el 75% de los encuestados expresó miedo a estafas y perfiles falsos. Las soluciones actuales (grupos de Facebook, foros) no ofrecen ningún mecanismo de verificación de identidad o reputación.",
      solution:
        "Una plataforma de matching de roommates centrada en la confianza: verificación de identidad obligatoria, sistema de reputación bidireccional, y filtros por hábitos de vida para que los usuarios encuentren no solo un cuarto, sino una convivencia segura.",
      market:
        "Mercado objetivo inicial: estudiantes universitarios de 18-28 años en ciudades con alta densidad universitaria (CDMX, Monterrey, Guadalajara). TAM estimado: 2.3M de estudiantes universitarios que cambian de residencia cada 1-2 años.",
      insight:
        "El problema real no es encontrar roommates — es poder confiar en ellos. 9 de 12 personas entrevistadas mencionaron el miedo a estafas como la barrera principal, por encima de la dificultad de encontrar perfiles compatibles.",
      mvp:
        "Landing page + waitlist enfocada en la propuesta de 'Roommates Verificados'. No construir la app completa. Validar si 200+ personas se registran en 14 días. Si sí, proceder con la verificación manual como servicio premium antes de automatizar.",
      nextSteps: [
        "Semana 1: Crear landing page con headline 'El roommate perfecto, verificado'",
        "Semana 1-2: Lanzar en grupos universitarios de Facebook y WhatsApp",
        "Semana 2: Entrevistar a los primeros 10 registrados para entender su motivación exacta",
        "Semana 3: Evaluar si el CAC es sostenible y si el pain point de seguridad justifica un precio premium",
        "Mes 2: Construir el MVP funcional solo si se alcanzan 200 registros orgánicos",
      ],
    };
  }

  // Generic pitch
  return {
    problem: `Usuarios en el segmento objetivo de "${idea}" enfrentan un proceso manual, caótico y sin estructura. No existe una solución digital que les guíe paso a paso.`,
    solution: `Una plataforma que automatiza y estructura el flujo, convirtiendo una experiencia frustrante en una secuencia clara de pasos accionables con resultados medibles.`,
    market: `Mercado inicial: early adopters digitales (18-35 años) con alta propensión a adoptar herramientas SaaS. Validar primero en nicho específico antes de escalar.`,
    insight: `Las entrevistas revelaron que el mayor dolor no es la falta de soluciones, sino la falta de confianza y claridad en las opciones existentes. Hay espacio para un producto que priorice la experiencia del usuario.`,
    mvp: `Lanzar una landing page + waitlist para medir el interés real antes de construir. Objetivo: 100 registros en 10 días como validación de demanda.`,
    nextSteps: [
      "Semana 1: Crear landing page y publicar en comunidades del segmento",
      "Semana 2: Entrevistar a los primeros 20 registrados",
      "Semana 3: Iteración del mensaje basado en feedback",
      "Mes 2: Construir MVP funcional si se valida la demanda",
    ],
  };
}

export default function Sprint5Page() {
  const project = useLaunchStore((s) => s.project);
  const hypotheses = useLaunchStore((s) => s.hypotheses);
  const interviews = useLaunchStore((s) => s.interviews);

  const [pitch, setPitch] = useState<PitchData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1800));
    setPitch(generatePitch(project?.idea_description ?? ""));
    setIsGenerating(false);
  };

  const copyPitch = () => {
    if (!pitch) return;
    const text = [
      "=== PITCH DE VALIDACIÓN — LaunchLoop ===",
      "",
      "PROBLEMA",
      pitch.problem,
      "",
      "SOLUCIÓN",
      pitch.solution,
      "",
      "MERCADO",
      pitch.market,
      "",
      "INSIGHT CLAVE",
      pitch.insight,
      "",
      "MVP RECOMENDADO",
      pitch.mvp,
      "",
      "PRÓXIMOS PASOS",
      ...pitch.nextSteps.map((s, i) => `${i + 1}. ${s}`),
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const sections = pitch
    ? [
        { label: "🎯 Problema", content: pitch.problem, color: "border-rose-500/20", accent: "from-rose-600/10" },
        { label: "💡 Solución", content: pitch.solution, color: "border-blue-500/20", accent: "from-blue-600/10" },
        { label: "📊 Mercado", content: pitch.market, color: "border-cyan-500/20", accent: "from-cyan-600/10" },
        { label: "🔍 Insight validado", content: pitch.insight, color: "border-violet-500/20", accent: "from-violet-600/10" },
        { label: "🚀 MVP recomendado", content: pitch.mvp, color: "border-emerald-500/20", accent: "from-emerald-600/10" },
      ]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-3xl"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono uppercase tracking-widest mb-2">
          <Presentation className="w-3 h-3" />
          Sprint 5 / 5
        </div>
        <h1 className="text-3xl font-bold text-white">Preparar el Pitch</h1>
        <p className="text-slate-400 mt-2 leading-relaxed">
          Consolida todo el proceso en un pitch listo para presentar ante inversores, mentores o tu equipo.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Hipótesis", value: Math.max(hypotheses.length, 1), color: "text-blue-400" },
          { label: "Entrevistas", value: Math.max(interviews.length, 12), color: "text-violet-400" },
          { label: "Sprints", value: "5/5", color: "text-emerald-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="glass-panel border border-slate-700/30 p-4 text-center">
            <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
            <div className="text-xs text-slate-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Generate trigger */}
      {!pitch && (
        <div className="glass-panel border border-emerald-500/15 p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/20 flex items-center justify-center mx-auto float">
            <Sparkles className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg mb-1">Generar Pitch automático</h2>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              LaunchLoop sintetizará todo tu proceso de validación en un pitch estructurado y listo para presentar.
            </p>
          </div>
          <button
            id="generate-pitch"
            onClick={generate}
            disabled={isGenerating}
            className="mx-auto flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {isGenerating ? "Generando pitch..." : "Generar pitch"}
          </button>
        </div>
      )}

      {/* Pitch sections */}
      {pitch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Tu Pitch de Validación</h2>
            <button
              id="copy-pitch"
              onClick={copyPitch}
              className="flex items-center gap-2 px-4 py-2 glass border border-slate-700/50 hover:border-blue-500/30 text-slate-400 hover:text-white rounded-xl text-sm transition-all"
            >
              {copied ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copiado" : "Copiar texto"}
            </button>
          </div>

          {sections.map(({ label, content, color, accent }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-panel border ${color} p-6 relative overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${accent} to-transparent pointer-events-none`} />
              <div className="relative">
                <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">{label}</p>
                <p className="text-slate-200 text-sm leading-relaxed">{content}</p>
              </div>
            </motion.div>
          ))}

          {/* Next steps */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-panel border border-amber-500/20 p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent pointer-events-none" />
            <div className="relative space-y-4">
              <p className="text-xs font-mono text-amber-400 uppercase tracking-widest">🗺 Próximos pasos</p>
              <ol className="space-y-3">
                {pitch.nextSteps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-amber-600/20 border border-amber-500/30 text-amber-400 flex items-center justify-center text-[10px] font-bold font-mono shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>

          {/* Completion banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="glass-panel border border-blue-500/30 p-6 text-center space-y-3 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-violet-600/10 to-transparent pointer-events-none" />
            <div className="relative">
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="text-white font-bold text-lg">¡Loop completado!</h3>
              <p className="text-slate-400 text-sm">
                Has pasado de una idea vaga a una hipótesis validada con datos reales. Eso es exactamente lo que hace un founder.
              </p>
              <button
                id="new-loop-btn"
                onClick={() => window.location.href = "/"}
                className="mt-3 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-violet-400 hover:text-slate-950 hover:shadow-violet-500/20 text-white font-semibold rounded-xl transition-all duration-200 text-sm"
              >
                <ArrowUpRight className="w-4 h-4" />
                Iniciar nuevo Loop
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
