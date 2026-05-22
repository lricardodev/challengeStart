"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLaunchStore } from "../../../../store/useLaunchStore";
import { Users, Brain, Plus, Trash2, ArrowRight, Loader2, Copy, CheckCheck } from "lucide-react";
import Link from "next/link";

const DEMO_QUESTIONS = [
  "¿Cuándo fue la última vez que buscaste un roommate? ¿Cómo fue la experiencia?",
  "¿Qué fue lo más frustrante de ese proceso?",
  "¿Cómo verificaste que la persona era de confianza antes de vivir juntos?",
  "¿Alguna vez tuviste una mala experiencia con un roommate? ¿Qué pasó?",
  "¿Usarías una plataforma que verifique identidad y reputación de roommates? ¿Cuánto pagarías?",
];

interface InterviewEntry {
  id: string;
  name: string;
  answers: string[];
}

export default function Sprint2Page() {
  const project = useLaunchStore((s) => s.project);
  const addInterview = useLaunchStore((s) => s.addInterview);

  const [questions, setQuestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [entries, setEntries] = useState<InterviewEntry[]>([]);
  const [newName, setNewName] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generateQuestions = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1400));

    const ideaSnippet = project?.idea_description?.toLowerCase() ?? "";
    let generated = DEMO_QUESTIONS;

    if (ideaSnippet.includes("empleo") || ideaSnippet.includes("trabajo")) {
      generated = [
        "¿Cuánto tiempo llevas buscando empleo/prácticas? ¿Cuántas aplicaciones has enviado?",
        "¿Qué plataformas usas para buscar trabajo? ¿Qué te falta en ellas?",
        "¿Cuál fue la parte más frustrante de tu última búsqueda de empleo?",
        "¿Alguna vez sentiste que tu perfil no era visto por las empresas correctas? ¿Por qué?",
        "Si existiera una herramienta que preparara tu perfil específicamente para cada vacante, ¿la usarías?",
      ];
    }
    setQuestions(generated);
    setIsGenerating(false);
  };

  const copyQuestion = (q: string, i: number) => {
    navigator.clipboard.writeText(q);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const addEntry = () => {
    if (!newName.trim()) return;
    const entry: InterviewEntry = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      answers: Array(questions.length).fill(""),
    };
    setEntries((prev) => [...prev, entry]);
    addInterview({
      id: entry.id,
      project_id: project?.id ?? "",
      interviewee_name: entry.name,
      notes: "",
      pain_points: [],
    });
    setNewName("");
  };

  const updateAnswer = (entryId: string, qIdx: number, val: string) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === entryId
          ? { ...e, answers: e.answers.map((a, i) => (i === qIdx ? val : a)) }
          : e
      )
    );
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
        <div className="flex items-center gap-2 text-xs text-violet-400 font-mono uppercase tracking-widest mb-2">
          <Users className="w-3 h-3" />
          Sprint 2 / 5
        </div>
        <h1 className="text-3xl font-bold text-white">Entrevistas con Usuarios</h1>
        <p className="text-slate-400 mt-2 leading-relaxed">
          Genera preguntas inteligentes y registra lo que te dicen usuarios reales.
        </p>
      </div>

      {/* AI generate button */}
      {questions.length === 0 ? (
        <div className="glass-panel border border-violet-500/15 p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center mx-auto">
            <Brain className="w-7 h-7 text-violet-400" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg mb-1">Generar preguntas con IA</h2>
            <p className="text-slate-500 text-sm">
              LaunchLoop generará preguntas adaptadas a tu idea para descubrir los dolores reales.
            </p>
          </div>
          <button
            id="generate-interview-questions"
            onClick={generateQuestions}
            disabled={isGenerating}
            className="mx-auto flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
            {isGenerating ? "Generando..." : "Generar preguntas"}
          </button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel border border-violet-500/15 p-6 space-y-3"
          >
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-violet-400" />
              <p className="text-sm font-semibold text-violet-300">Preguntas generadas</p>
              <span className="ml-auto text-xs text-slate-500 font-mono">{questions.length} preguntas</span>
            </div>
            {questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 group"
              >
                <span className="text-xs font-mono text-violet-400 shrink-0 mt-0.5">{i + 1}.</span>
                <p className="text-sm text-slate-200 flex-1">{q}</p>
                <button
                  onClick={() => copyQuestion(q, i)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-violet-400 shrink-0"
                >
                  {copiedIdx === i ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Register interviews */}
      {questions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-white">Registrar Entrevistados</h2>
            <span className="text-xs text-slate-500 font-mono bg-slate-800/50 px-2 py-0.5 rounded-md">
              {entries.length} entrevistas
            </span>
          </div>

          {/* Add person */}
          <div className="flex gap-2">
            <input
              id="interviewee-name"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addEntry()}
              placeholder="Nombre del entrevistado..."
              className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-500/40 transition-colors"
            />
            <button
              id="add-interviewee"
              onClick={addEntry}
              disabled={!newName.trim() || questions.length === 0}
              className="px-4 py-3 bg-violet-600/20 border border-violet-500/30 hover:bg-violet-600/30 disabled:opacity-40 disabled:cursor-not-allowed text-violet-300 rounded-xl transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Entries */}
          <div className="space-y-4">
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel border border-slate-700/40 p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-300 font-mono">
                      {entry.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-white text-sm">{entry.name}</span>
                  </div>
                  <button
                    onClick={() => setEntries((prev) => prev.filter((e) => e.id !== entry.id))}
                    className="text-slate-600 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {questions.map((q, qi) => (
                  <div key={qi} className="space-y-1.5">
                    <p className="text-xs text-slate-500">{q}</p>
                    <textarea
                      value={entry.answers[qi]}
                      onChange={(e) => updateAnswer(entry.id, qi, e.target.value)}
                      placeholder="Escribe lo que respondió..."
                      rows={2}
                      className="w-full bg-slate-800/50 border border-slate-700/40 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder:text-slate-700 outline-none focus:border-violet-500/30 transition-colors resize-none"
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Next sprint */}
      {entries.length >= 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-2"
        >
          <Link
            href="/dashboard/sprint/3"
            id="go-to-sprint-3"
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            Analizar patrones →
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
