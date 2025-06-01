import { UserResponse } from '@/api/dto';
import { create } from 'zustand';

interface Type {
  user?: UserResponse;
}

interface Action {
  setUser: (user?: UserResponse) => void;
}

const initialState: Type = {
  user: undefined,
};

export const useUserStore = create<Type & Action>((set) => ({
  ...initialState,
  setUser: (user) => set({ user }),
}));
