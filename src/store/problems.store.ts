import { ProblemListResponse } from '@/api/dto';
import { create } from 'zustand';

interface ProblemsStore {
  problems?: ProblemListResponse;
  setProblems: (problems: ProblemListResponse) => void;
}

export const useProblemsStore = create<ProblemsStore>((set) => ({
  problems: undefined,
  setProblems: (problems) => set({ problems }),
}));
