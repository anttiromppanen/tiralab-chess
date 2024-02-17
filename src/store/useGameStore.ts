import { create } from "zustand";

interface PointsState {
  score: number;
  isCheck: boolean;
  isCheckmate: boolean;
}

interface PointsActions {
  updateScore: (amount: number) => void;
  updateIsCheck: () => void;
  updateIsCheckmate: () => void;
  resetScore: () => void;
}

export interface PointsStore extends PointsState, PointsActions {}

const usePointsStore = create<PointsStore>((set) => ({
  score: 0,
  isCheck: false,
  isCheckmate: false,

  updateScore: (amount: number) =>
    set((state) => ({ score: state.score + amount })),
  updateIsCheck: () => set((state) => ({ isCheck: !state.isCheck })),
  updateIsCheckmate: () => set({ isCheckmate: true }),
  resetScore: () => set({ score: 0 }),
}));

export default usePointsStore;
