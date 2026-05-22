export interface User {
  id: string;
  email: string;
  created_at?: string;
}

export type SprintStatus = 'idea' | 'hypotheses' | 'interviews' | 'validation' | 'pitch';

export interface Project {
  id: string;
  user_id: string;
  idea_description: string;
  status: SprintStatus;
  created_at?: string;
}

export interface Hypothesis {
  id: string;
  project_id: string;
  content: string;
  status: 'pending' | 'validated' | 'invalidated';
  created_at?: string;
}

export interface Interview {
  id: string;
  project_id: string;
  interviewee_name: string;
  notes: string;
  pain_points: string[];
  created_at?: string;
}

// Database schema representation for Supabase
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at'>;
        Update: Partial<Omit<Project, 'id' | 'created_at'>>;
      };
      hypotheses: {
        Row: Hypothesis;
        Insert: Omit<Hypothesis, 'id' | 'created_at'>;
        Update: Partial<Omit<Hypothesis, 'id' | 'created_at'>>;
      };
      interviews: {
        Row: Interview;
        Insert: Omit<Interview, 'id' | 'created_at'>;
        Update: Partial<Omit<Interview, 'id' | 'created_at'>>;
      };
    };
  };
}
