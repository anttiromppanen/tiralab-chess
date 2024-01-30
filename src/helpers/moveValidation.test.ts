import { act, renderHook } from "@testing-library/react";
import { Square } from "react-chessboard/dist/chessboard/types";
import { create } from "zustand";
import { initialBoardPosition } from "../const/common";
import { PointsStore } from "../store/usePointsStore";
import handlePieceMove from "./moveValidation";

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
  let board = { ...initialBoardPosition };

  afterEach(() => {
    board = { ...initialBoardPosition };
    const { result } = renderHook(() => usePointsStore());
    act(() => result.current.resetPoints());
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
          act(() => result.current.increaseWhitePoints(1));

          expect(result.current.whitePoints).toEqual(1);
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
          act(() => result.current.increaseBlackPoints(1));

          expect(result.current.blackPoints).toEqual(1);
          expect(board.c4).toEqual("bP");
          expect(board.b5).toEqual(undefined);
        });
      });
    });
  });

  describe("Knight", () => {
    it("white should be able to move in all directions from f5", () => {
      const moves = ["d4", "d6", "e3", "e7", "g3", "g7", "h4", "h6"];
      moves.forEach((target) => {
        const move = handlePieceMove(
          "wN",
          "f5",
          target as Square,
          board,
          () => board,
          () => board,
          () => board,
        );
        expect(move).toBe(true);
      });
    });

    it("black should be able to move in all directions from d4", () => {
      const moves = ["b3", "b5", "c2", "c6", "e2", "e6", "f3", "f5"];
      moves.forEach((target) => {
        const move = handlePieceMove(
          "bN",
          "d4",
          target as Square,
          board,
          () => board,
          () => board,
          () => board,
        );
        expect(move).toBe(true);
      });
    });

    describe("Capturing", () => {
      describe("White", () => {
        it("should return 1 points for pawn", () => {
          board.e6 = "bP";

          handlePieceMove(
            "wN",
            "d4",
            "e6",
            board,
            () => board,
            () => board,
            () => board,
          );

          const { result } = renderHook(() => usePointsStore());
          act(() => result.current.increaseWhitePoints(1));

          expect(result.current.whitePoints).toEqual(1);
          expect(board.e6).toEqual("wN");
          expect(board.d4).toEqual(undefined);
        });

        it("should return 3 points for knight", () => {
          board.c6 = "bN";

          handlePieceMove(
            "wN",
            "d4",
            "c6",
            board,
            () => board,
            () => board,
            () => board,
          );

          const { result } = renderHook(() => usePointsStore());
          act(() => result.current.increaseWhitePoints(3));

          expect(result.current.whitePoints).toEqual(3);
          expect(board.c6).toEqual("wN");
          expect(board.d4).toEqual(undefined);
        });

        it("should return 3.5 points for bishop", () => {
          board.f3 = "bB";

          handlePieceMove(
            "wN",
            "d4",
            "f3",
            board,
            () => board,
            () => board,
            () => board,
          );

          const { result } = renderHook(() => usePointsStore());
          act(() => result.current.increaseWhitePoints(3.5));

          expect(result.current.whitePoints).toEqual(3.5);
          expect(board.f3).toEqual("wN");
          expect(board.d4).toEqual(undefined);
        });

        it("should return 5 points for rook", () => {
          board.b3 = "bR";

          handlePieceMove(
            "wN",
            "d4",
            "b3",
            board,
            () => board,
            () => board,
            () => board,
          );

          const { result } = renderHook(() => usePointsStore());
          act(() => result.current.increaseWhitePoints(5));

          expect(result.current.whitePoints).toEqual(5);
          expect(board.b3).toEqual("wN");
          expect(board.d4).toEqual(undefined);
        });

        it("should return 9 points for queen", () => {
          board.f5 = "bQ";

          handlePieceMove(
            "wN",
            "d4",
            "f5",
            board,
            () => board,
            () => board,
            () => board,
          );

          const { result } = renderHook(() => usePointsStore());
          act(() => result.current.increaseWhitePoints(9));

          expect(result.current.whitePoints).toEqual(9);
          expect(board.f5).toEqual("wN");
          expect(board.d4).toEqual(undefined);
        });

        it("should return 1000 points for king", () => {
          board.b5 = "bK";

          handlePieceMove(
            "wN",
            "d4",
            "b5",
            board,
            () => board,
            () => board,
            () => board,
          );

          const { result } = renderHook(() => usePointsStore());
          act(() => result.current.increaseWhitePoints(1000));

          expect(result.current.whitePoints).toEqual(1000);
          expect(board.b5).toEqual("wN");
          expect(board.d4).toEqual(undefined);
        });
      });

      describe("Black", () => {
        it("should return 1 points for pawn", () => {
          board.e6 = "wP";

          handlePieceMove(
            "bN",
            "f4",
            "e6",
            board,
            () => board,
            () => board,
            () => board,
          );

          const { result } = renderHook(() => usePointsStore());
          act(() => result.current.increaseWhitePoints(1));

          expect(result.current.whitePoints).toEqual(1);
          expect(board.e6).toEqual("bN");
          expect(board.f4).toEqual(undefined);
        });

        it("should return 3 points for knight", () => {
          board.h3 = "wN";

          handlePieceMove(
            "bN",
            "f4",
            "h3",
            board,
            () => board,
            () => board,
            () => board,
          );

          const { result } = renderHook(() => usePointsStore());
          act(() => result.current.increaseWhitePoints(3));

          expect(result.current.whitePoints).toEqual(3);
          expect(board.h3).toEqual("bN");
          expect(board.f4).toEqual(undefined);
        });

        it("should return 3.5 points for bishop", () => {
          board.h5 = "wB";

          handlePieceMove(
            "bN",
            "f4",
            "h5",
            board,
            () => board,
            () => board,
            () => board,
          );

          const { result } = renderHook(() => usePointsStore());
          act(() => result.current.increaseWhitePoints(3.5));

          expect(result.current.whitePoints).toEqual(3.5);
          expect(board.h5).toEqual("bN");
          expect(board.f4).toEqual(undefined);
        });

        it("should return 5 points for rook", () => {
          board.g6 = "wR";

          handlePieceMove(
            "bN",
            "f4",
            "g6",
            board,
            () => board,
            () => board,
            () => board,
          );

          const { result } = renderHook(() => usePointsStore());
          act(() => result.current.increaseWhitePoints(5));

          expect(result.current.whitePoints).toEqual(5);
          expect(board.g6).toEqual("bN");
          expect(board.d4).toEqual(undefined);
        });

        it("should return 9 points for queen", () => {
          board.d3 = "wQ";

          handlePieceMove(
            "bN",
            "f4",
            "d3",
            board,
            () => board,
            () => board,
            () => board,
          );

          const { result } = renderHook(() => usePointsStore());
          act(() => result.current.increaseWhitePoints(9));

          expect(result.current.whitePoints).toEqual(9);
          expect(board.d3).toEqual("bN");
          expect(board.d4).toEqual(undefined);
        });

        it("should return 1000 points for king", () => {
          board.e2 = "wK";

          handlePieceMove(
            "bN",
            "f4",
            "e2",
            board,
            () => board,
            () => board,
            () => board,
          );

          const { result } = renderHook(() => usePointsStore());
          act(() => result.current.increaseWhitePoints(1000));

          expect(result.current.whitePoints).toEqual(1000);
          expect(board.e2).toEqual("bN");
          expect(board.d4).toEqual(undefined);
        });
      });
    });
  });
});
