import { create } from "zustand";
import { act, renderHook } from "@testing-library/react";
import { initialBoardPosition } from "../const/common";
import handlePieceMove from "./moveValidation";
import { PointsStore } from "../store/usePointsStore";

const usePointsStore = create<PointsStore>()((set) => ({
  whitePoints: 0,
  blackPoints: 0,
  increaseWhitePoints: (amount: number) =>
    set((state) => ({ whitePoints: state.whitePoints + amount })),
  increaseBlackPoints: (amount: number) =>
    set((state) => ({ blackPoints: state.blackPoints + amount })),
  resetPoints: () => set({ whitePoints: 0, blackPoints: 0 }),
}));

describe("moveValidation.ts", () => {
  let board = initialBoardPosition;

  afterEach(() => {
    board = initialBoardPosition;
  });

  describe("Pawn", () => {
    it("should work correctly for 1 tile movement", () => {
      const whiteMove = handlePieceMove(
        "wP",
        "d3",
        "d4",
        board,
        () => board,
        () => board,
        () => board,
      );

      const blackMove = handlePieceMove(
        "bP",
        "e5",
        "e4",
        board,
        () => board,
        () => board,
        () => board,
      );

      expect(whiteMove).toBe(true);
      expect(blackMove).toBe(true);
    });

    it("should fail for 2 tile movement", () => {
      const whiteMove = handlePieceMove(
        "wP",
        "d3",
        "d5",
        board,
        () => board,
        () => board,
        () => board,
      );

      const blackMove = handlePieceMove(
        "bP",
        "e5",
        "e3",
        board,
        () => board,
        () => board,
        () => board,
      );

      expect(whiteMove).toBe(false);
      expect(blackMove).toBe(false);
    });

    describe("Capturing", () => {
      describe("White", () => {
        it("should return 1 point for pawn", () => {
          board.d5 = "bP";
          board.e4 = "wP";

          handlePieceMove(
            "wP",
            "e4",
            "d5",
            board,
            () => board,
            () => board,
            () => board,
          );

          const { result } = renderHook(() => usePointsStore());
          act(() => result.current.increaseWhitePoints(10));

          expect(result.current.whitePoints).toEqual(10);
          expect(board.d5).toEqual("wP");
          expect(board.e4).toEqual(undefined);
        });
      });

      describe("Black", () => {
        it("should return 1 point for pawn", () => {
          board.b5 = "bP";
          board.c4 = "wP";

          handlePieceMove(
            "bP",
            "b5",
            "c4",
            board,
            () => board,
            () => board,
            () => board,
          );

          const { result } = renderHook(() => usePointsStore());
          act(() => result.current.increaseBlackPoints(10));

          expect(result.current.blackPoints).toEqual(10);
          expect(board.c4).toEqual("bP");
          expect(board.b5).toEqual(undefined);
        });
      });
    });
  });
});
