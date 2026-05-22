"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LogOut, LayoutDashboard, Target, Users, BarChart2, Layers, Presentation, ChevronRight } from "lucide-react";
import { useLaunchStore } from "../../store/useLaunchStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const sprints = [
  { id: 1, label: "Problema", icon: Target, href: "/dashboard/sprint/1", color: "text-blue-400" },
  { id: 2, label: "Entrevistas", icon: Users, href: "/dashboard/sprint/2", color: "text-violet-400" },
  { id: 3, label: "Patrones", icon: BarChart2, href: "/dashboard/sprint/3", color: "text-cyan-400" },
  { id: 4, label: "MVP", icon: Layers, href: "/dashboard/sprint/4", color: "text-amber-400" },
  { id: 5, label: "Pitch", icon: Presentation, href: "/dashboard/sprint/5", color: "text-emerald-400" },
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
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0B1224] relative">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-64 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />
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
            <img src="/IconStart.jpg" alt="LaunchLoop Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">LaunchLoop</span>
        </div>

        {/* Project info */}
        <div className="px-5 py-4 border-b border-blue-500/10">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-mono">Proyecto activo</p>
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
            <p className="text-[10px] uppercase tracking-widest text-slate-600 font-mono">Sprints</p>
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
                {isActive && <ChevronRight className="w-3 h-3 ml-auto text-blue-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-blue-500/10">
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
