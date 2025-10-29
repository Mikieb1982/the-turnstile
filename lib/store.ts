import { create } from 'zustand';

interface TurnstileState {
  locked: boolean;
  insertCoin: () => void;
  push: () => void;
}

export const useTurnstileStore = create<TurnstileState>((set) => ({
  locked: true,
  insertCoin: () => set((state) => ({ locked: !state.locked ? false : !state.locked })),
  push: () => set((state) => ({ locked: state.locked ? true : !state.locked })),
}));
