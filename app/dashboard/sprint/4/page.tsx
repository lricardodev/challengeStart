"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Layers, Globe, Users, Code, Bot, DoorOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface MvpOption {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
  effort: "Bajo" | "Medio" | "Alto";
  recommendation?: boolean;
  color: string;
  border: string;
  bg: string;
}

const MVP_OPTIONS: MvpOption[] = [
  {
    id: "waitlist",
    icon: Users,
    label: "Landing Page + Waitlist",
    description: "Crea una página simple que describa el problema y la solución. Mide el interés con registros antes de construir.",
    effort: "Bajo",
    recommendation: true,
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-600/10",
  },
  {
    id: "landing",
    icon: Globe,
    label: "Landing Page Pura",
    description: "Describe tu propuesta de valor con un CTA claro. Ideal para validar el mensaje antes del producto.",
    effort: "Bajo",
    color: "text-blue-400",
    border: "border-blue-500/20",
    bg: "bg-blue-600/10",
  },
  {
    id: "prototype",
    icon: Code,
    label: "Prototipo Clickable",
    description: "Crea un flujo en Figma o similar. Pruébalo con 5 usuarios para validar la UX antes de desarrollar.",
    effort: "Medio",
    color: "text-violet-400",
    border: "border-violet-500/20",
    bg: "bg-violet-600/10",
  },
  {
    id: "automation",
    icon: Bot,
    label: "Automatización Simple",
    description: "Resuelve el problema manualmente con herramientas como Airtable, Zapier o Notion. Valida sin escribir código.",
    effort: "Medio",
    color: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-600/10",
  },
  {
    id: "fake-door",
    icon: DoorOpen,
    label: "Fake Door Testing",
    description: "Muestra un botón o feature que no existe aún. Mide cuántos usuarios hacen clic para validar el interés real.",
    effort: "Bajo",
    color: "text-cyan-400",
    border: "border-cyan-500/20",
    bg: "bg-cyan-600/10",
  },
];

const EFFORT_COLOR: Record<string, string> = {
  Bajo: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Medio: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Alto: "text-rose-400 bg-rose-500/10 border-rose-500/20",
};

const ACTION_PLAN: Record<string, string[]> = {
  waitlist: [
    "Escribe un headline claro que describa el problema (#1 pain point detectado)",
    "Añade una propuesta de valor en 1 oración",
    "Crea un formulario de registro con email (usa Typeform, Tally o similar)",
    "Comparte en grupos de Facebook/WhatsApp donde está tu segmento",
    "Meta: 50 registros en 7 días antes de continuar",
  ],
  landing: [
    "Define el headline: 'La forma más segura de encontrar roommates'",
    "Incluye 3 beneficios claros centrados en la confianza",
    "Añade un CTA: 'Quiero acceso anticipado'",
    "Publica con Vercel o Netlify en menos de 1 hora",
    "Meta: 200 visitas únicas y 30% tasa de conversión",
  ],
  prototype: [
    "Mapea el flujo de 3-5 pantallas clave en Figma",
    "Prioriza la pantalla de verificación de identidad",
    "Recluta 5 personas de tu segmento para sesiones de prueba",
    "Observa dónde se confunden o se detienen",
    "Itera el diseño antes de escribir código",
  ],
  automation: [
    "Crea un formulario Typeform para perfiles de roommates",
    "Conecta con Airtable para organizar los perfiles",
    "Verifica identidad manualmente vía videollamada",
    "Cobra una tarifa pequeña por el proceso de verificación",
    "Valida si la gente paga antes de automatizar",
  ],
  "fake-door": [
    "Añade un botón 'Verificar mi perfil' en tu landing existente",
    "Al hacer clic, redirige a un formulario de 'lista de espera'",
    "Mide cuántos usuarios hacen clic vs los que solo ven",
    "Si el CTR es > 20%, el feature tiene validación suficiente",
    "Construye el feature real solo si hay demanda comprobada",
  ],
};

export default function Sprint4Page() {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const selectedOption = MVP_OPTIONS.find((o) => o.id === selected);
  const actionPlan = selected ? ACTION_PLAN[selected] : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-3xl"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono uppercase tracking-widest mb-2">
          <Layers className="w-3 h-3" />
          Sprint 4 / 5
        </div>
        <h1 className="text-3xl font-bold text-white">Crear el MVP</h1>
        <p className="text-slate-400 mt-2 leading-relaxed">
          Antes de construir una app completa, valida con el MVP más pequeño posible.
        </p>
      </div>

      {/* Recommendation callout */}
      <div className="glass-panel border border-emerald-500/20 p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-transparent pointer-events-none" />
        <div className="relative">
          <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">Recomendación basada en tus patrones</p>
          <p className="text-slate-200 text-sm leading-relaxed">
            Antes de construir una app completa, valida una{" "}
            <strong className="text-white">waitlist enfocada en seguridad y verificación</strong>.
            Tus entrevistas muestran que el miedo a estafas (75%) es el dolor más grande — no la dificultad de encontrar roommates.
          </p>
        </div>
      </div>

      {/* MVP options */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Elige tu tipo de MVP</h2>
        <div className="grid grid-cols-1 gap-3">
          {MVP_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selected === opt.id;
            return (
              <motion.button
                key={opt.id}
                id={`mvp-option-${opt.id}`}
                onClick={() => { setSelected(opt.id); setConfirmed(false); }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`glass-panel border text-left p-5 flex items-start gap-4 transition-all duration-200 cursor-pointer w-full ${
                  isSelected ? `${opt.border} bg-${opt.color.split("-")[1]}-600/10` : "border-slate-700/30 hover:border-violet-500/30 hover:bg-violet-600/5"
                }`}
              >
                <div className={`p-2.5 rounded-xl ${opt.bg} border ${opt.border} shrink-0 mt-0.5`}>
                  <Icon className={`w-5 h-5 ${opt.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-white text-sm">{opt.label}</span>
                    {opt.recommendation && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono uppercase tracking-wide">
                        Recomendado
                      </span>
                    )}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ml-auto ${EFFORT_COLOR[opt.effort]}`}>
                      Esfuerzo {opt.effort}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{opt.description}</p>
                </div>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Action plan */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel border border-amber-500/20 p-6 space-y-4"
        >
          <p className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            Plan de acción — {selectedOption?.label}
          </p>
          <ol className="space-y-3">
            {actionPlan.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-3 text-sm text-slate-300"
              >
                <span className="w-5 h-5 rounded-full bg-amber-600/20 border border-amber-500/30 text-amber-400 flex items-center justify-center text-[10px] font-bold font-mono shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </motion.li>
            ))}
          </ol>
          <button
            id="confirm-mvp"
            onClick={() => setConfirmed(true)}
            className="mt-2 px-5 py-2.5 bg-amber-600/20 border border-amber-500/30 hover:bg-amber-600/30 text-amber-300 rounded-xl transition-colors text-sm font-semibold"
          >
            {confirmed ? "✓ MVP seleccionado" : "Confirmar este MVP"}
          </button>
        </motion.div>
      )}

      {confirmed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link
            href="/dashboard/sprint/5"
            id="go-to-sprint-5"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            Preparar el Pitch →
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
