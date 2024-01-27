import { create } from "zustand";

interface PointsState {
  whitePoints: number;
  blackPoints: number;
}

interface PointsActions {
  increaseWhitePoints: (amount: number) => void;
  increaseBlackPoints: (amount: number) => void;
  resetPoints: () => void;
}

interface PointsStore extends PointsState, PointsActions {}

const usePointsStore = create<PointsStore>((set) => ({
  whitePoints: 0,
  blackPoints: 0,

  increaseWhitePoints: (amount: number) =>
    set((state) => ({ whitePoints: state.whitePoints + amount })),
  increaseBlackPoints: (amount: number) =>
    set((state) => ({ blackPoints: state.blackPoints + amount })),
  resetPoints: () => set({ whitePoints: 0, blackPoints: 0 }),
}));

export default usePointsStore;
