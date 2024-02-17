import { create } from "zustand";

interface GameState {
  score: number;
  isCheck: boolean;
  isCheckmate: boolean;
}

interface GameActions {
  updateScore: (amount: number) => void;
  updateIsCheck: () => void;
  updateIsCheckmate: () => void;
  resetScore: () => void;
}

export interface GameStore extends GameState, GameActions {}

const useGameStore = create<GameStore>((set) => ({
  score: 0,
  isCheck: false,
  isCheckmate: false,

  updateScore: (amount: number) =>
    set((state) => ({ score: state.score + amount })),
  updateIsCheck: () => set((state) => ({ isCheck: !state.isCheck })),
  updateIsCheckmate: () => set({ isCheckmate: true }),
  resetScore: () => set({ score: 0 }),
}));

export default useGameStore;
