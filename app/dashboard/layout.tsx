"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LogOut,
  LayoutDashboard,
  Target,
  Users,
  BarChart2,
  Layers,
  Presentation,
  ChevronRight,
} from "lucide-react";
import { useLaunchStore } from "../../store/useLaunchStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const sprints = [
  {
    id: 1,
    label: "Problema",
    icon: Target,
    href: "/dashboard/sprint/1",
    color: "text-blue-400",
  },
  {
    id: 2,
    label: "Entrevistas",
    icon: Users,
    href: "/dashboard/sprint/2",
    color: "text-violet-400",
  },
  {
    id: 3,
    label: "Patrones",
    icon: BarChart2,
    href: "/dashboard/sprint/3",
    color: "text-cyan-400",
  },
  {
    id: 4,
    label: "MVP",
    icon: Layers,
    href: "/dashboard/sprint/4",
    color: "text-amber-400",
  },
  {
    id: 5,
    label: "Pitch",
    icon: Presentation,
    href: "/dashboard/sprint/5",
    color: "text-emerald-400",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const project = useLaunchStore((state) => state.project);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!project) {
      router.push("/");
    }
  }, [project, router]);

  if (!project) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#020617] relative">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-64 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-yellow-400/3 rounded-full blur-3xl pulse-glow" />
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-blue-500/10 flex flex-col z-20 relative md:h-screen md:sticky md:top-0"
        style={{ background: "rgba(15,23,42,0.95)" }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-500/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/50 overflow-hidden shrink-0">
            <img
              src="/IconStart.jpg"
              alt="LaunchLoop Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-lg tracking-tight text-yellow-400">
            LaunchLoop
          </span>
        </div>

        {/* Project info */}
        <div className="px-5 py-4 border-b border-blue-500/10">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-mono">
            Proyecto activo
          </p>
          <p className="text-sm text-slate-300 truncate leading-relaxed">
            {project.idea_description}
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {/* Overview */}
          <Link
            id="nav-overview"
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
              pathname === "/dashboard"
                ? "bg-blue-600/20 text-blue-300 border-blue-500/30"
                : "border-transparent text-slate-400 hover:text-violet-300 hover:bg-violet-600/10 hover:border-violet-500/25"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
            {pathname === "/dashboard" && (
              <ChevronRight className="w-3 h-3 ml-auto" />
            )}
          </Link>

          {/* Sprint divider */}
          <div className="px-4 pt-4 pb-2">
            <p className="text-[10px] uppercase tracking-widest text-slate-600 font-mono">
              Sprints
            </p>
          </div>

          {sprints.map((sprint, i) => {
            const Icon = sprint.icon;
            const isActive = pathname === sprint.href;
            return (
              <Link
                id={`nav-sprint-${sprint.id}`}
                key={sprint.id}
                href={sprint.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 border ${
                  isActive
                    ? "bg-blue-600/20 text-blue-300 border-blue-500/30"
                    : "border-transparent text-slate-500 hover:text-violet-300 hover:bg-violet-600/10 hover:border-violet-500/25"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold font-mono transition-colors ${
                    isActive
                      ? "border-blue-500/60 bg-blue-600/30 text-blue-300"
                      : "border-slate-700 text-slate-500"
                  }`}
                >
                  {i + 1}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? sprint.color : ""}`} />
                {sprint.label}
                {isActive && (
                  <ChevronRight className="w-3 h-3 ml-auto text-blue-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-blue-500/10 flex flex-col gap-2">
          <button
            id="exit-project-btn"
            onClick={() => {
              useLaunchStore.getState().reset();
              router.push("/");
            }}
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-200 w-full rounded-xl text-sm"
          >
            <LogOut className="w-4 h-4" />
            Salir del proyecto
          </button>

          {/* Espacio fijo para redes sociales / enlaces */}
          <div className="mt-2 pt-4 border-t border-blue-500/10">
            <div className="flex items-center justify-center gap-4 text-slate-500">
              {/* Aquí puedes agregar tus enlaces */}
              <a
                href="https://github.com/lricardodev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                title="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/lricardodev/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                title="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/richard_l43/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-pink-400 hover:bg-pink-500/10 rounded-lg transition-all"
                title="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 1.5h8.5c2.347 0 4.25 1.903 4.25 4.25v8.5c0 2.347-1.903 4.25-4.25 4.25h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5C3.5 5.403 5.403 3.5 7.75 3.5zm8.938 1.125a1.063 1.063 0 1 0 0 2.126 1.063 1.063 0 0 0 0-2.126zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto min-h-screen md:min-h-0">
        <div className="max-w-5xl mx-auto p-6 lg:p-10 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
