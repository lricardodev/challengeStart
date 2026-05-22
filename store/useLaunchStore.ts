import { create } from 'zustand';
import { Hypothesis, Interview, Project, SprintStatus } from '../types';

interface LaunchState {
  project: Project | null;
  hypotheses: Hypothesis[];
  interviews: Interview[];
  isLoading: boolean;
  
  // Actions
  setProject: (project: Project) => void;
  updateStatus: (status: SprintStatus) => void;
  addHypothesis: (hypothesis: Hypothesis) => void;
  updateHypothesisStatus: (id: string, status: Hypothesis['status']) => void;
  addInterview: (interview: Interview) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useLaunchStore = create<LaunchState>((set) => ({
  project: null,
  hypotheses: [],
  interviews: [],
  isLoading: false,

  setProject: (project) => set({ project }),
  
  updateStatus: (status) => set((state) => ({ 
    project: state.project ? { ...state.project, status } : null 
  })),

  addHypothesis: (hypothesis) => set((state) => ({
    hypotheses: [...state.hypotheses, hypothesis]
  })),

  updateHypothesisStatus: (id, status) => set((state) => ({
    hypotheses: state.hypotheses.map(h => h.id === id ? { ...h, status } : h)
  })),

  addInterview: (interview) => set((state) => ({
    interviews: [...state.interviews, interview]
  })),

  setLoading: (isLoading) => set({ isLoading }),

  reset: () => set({ project: null, hypotheses: [], interviews: [], isLoading: false })
}));
