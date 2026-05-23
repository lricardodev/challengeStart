"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Layers, Megaphone, Users, Package, HandHelping, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
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
    label: "Lista de interés",
    description: "Presenta tu solución y recoge registros, reservas o pre-pedidos antes de producir, abrir o construir a gran escala.",
    effort: "Bajo",
    recommendation: true,
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-600/10",
  },
  {
    id: "landing",
    icon: Megaphone,
    label: "Propuesta de valor",
    description: "Comunica qué ofreces y a quién — con un folleto, carta de ventas, post o página web. Valida si el mensaje conecta.",
    effort: "Bajo",
    color: "text-blue-400",
    border: "border-blue-500/20",
    bg: "bg-blue-600/10",
  },
  {
    id: "prototype",
    icon: Package,
    label: "Prototipo o muestra",
    description: "Crea una versión tangible de tu idea: mockup, muestra física, menú piloto o demo. Pruébala con clientes reales.",
    effort: "Medio",
    color: "text-violet-400",
    border: "border-violet-500/20",
    bg: "bg-violet-600/10",
  },
  {
    id: "concierge",
    icon: HandHelping,
    label: "Servicio manual (Concierge)",
    description: "Ofrece el servicio completo a mano, sin escalar. Valida que la gente paga antes de invertir en infraestructura o producción.",
    effort: "Medio",
    color: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-600/10",
  },
  {
    id: "demand-test",
    icon: TrendingUp,
    label: "Prueba de demanda",
    description: "Ofrece algo que aún no existe — un producto, plan o servicio — y mide cuántas personas muestran interés real.",
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
    "Escribe un headline claro que describa el problema que resuelves",
    "Añade tu propuesta de valor en 1 oración",
    "Abre un canal de registro: formulario, WhatsApp, cuaderno en tu local o evento",
    "Comparte donde está tu segmento: redes, boca a boca, ferias o comunidades locales",
    "Meta: 50 registros o reservas en 7 días antes de continuar",
  ],
  landing: [
    "Define el headline con el beneficio principal para tu cliente",
    "Incluye 3 beneficios claros centrados en su dolor o necesidad",
    "Añade un CTA concreto: 'Reservar', 'Pedir info' o 'Unirme a la lista'",
    "Distribúyelo online o imprime un folleto para compartir en persona",
    "Meta: 200 contactos y al menos 20% muestran interés activo",
  ],
  prototype: [
    "Define la versión mínima que tu cliente puede ver, tocar o probar",
    "Créala: mockup, muestra física, menú piloto, demo en video o catálogo",
    "Recluta 5 personas de tu segmento para probarla",
    "Observa reacciones: ¿entendieron la propuesta? ¿querrían pagar?",
    "Ajusta antes de producir en serie, abrir local o escalar",
  ],
  concierge: [
    "Ofrece el servicio completo de forma manual a 3–5 clientes",
    "Usa lo que tengas: Excel, WhatsApp, cuaderno, tu cocina o taller",
    "Cobra el precio real desde el primer día",
    "Documenta qué pasos repites y cuánto tiempo toman",
    "Valida que la gente paga antes de automatizar o escalar",
  ],
  "demand-test": [
    "Presenta una oferta que aún no existe: producto, plan o servicio nuevo",
    "Pide un gesto concreto: reserva, depósito, lista de espera o encargo",
    "Mide cuántos actúan vs cuántos solo miran o preguntan",
    "Si más del 20% muestra interés real, hay señal suficiente para avanzar",
    "Produce o desarrolla solo con demanda comprobada",
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
          Antes de invertir a gran escala, valida con la versión más pequeña de tu idea.
        </p>
      </div>

      {/* Recommendation callout */}
      <div className="glass-panel border border-emerald-500/20 p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-transparent pointer-events-none" />
        <div className="relative">
          <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">Recomendación basada en tus patrones</p>
          <p className="text-slate-200 text-sm leading-relaxed">
            Empieza con el MVP de menor esfuerzo: una{" "}
            <strong className="text-white">lista de interés</strong> centrada en el dolor principal
            que detectaste en tus entrevistas. Mide demanda real antes de producir, abrir o construir.
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
