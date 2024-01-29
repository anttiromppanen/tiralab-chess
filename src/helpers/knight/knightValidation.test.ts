import { initialBoardPosition } from "../../const/common";
import {
  canKnightCapture,
  validKnightMovesFromSquare,
} from "./knightValidation";

describe("knightValidation.ts", () => {
  let board = { ...initialBoardPosition };

  beforeEach(() => {
    board = { ...initialBoardPosition };
  });

  describe("validKnightMovesFromSquare", () => {
    describe("White", () => {
      it("should return correct move squares for b1", () => {
        const correctSquares = ["a3", "c3"];
        const result = validKnightMovesFromSquare("b1", "wK", board);
        expect(correctSquares.sort()).toEqual(result.sort());
      });

      it("should return correct move squares for g1", () => {
        const correctSquares = ["f3", "h3"];
        const result = validKnightMovesFromSquare("g1", "wK", board);
        expect(correctSquares.sort()).toEqual(result.sort());
      });

      it("should return correct move squares for e4", () => {
        const correctSquares = ["c3", "c5", "d6", "f6", "g5", "g3"];
        const result = validKnightMovesFromSquare("e4", "wK", board);
        expect(correctSquares.sort()).toEqual(result.sort());
      });

      it("should return correct move squares for f6", () => {
        const correctSquares = ["d5", "d7", "e4", "e8", "g4", "g8", "h5", "h7"];
        const result = validKnightMovesFromSquare("f6", "wK", board);
        expect(correctSquares.sort()).toEqual(result.sort());
      });

      it("should return correct move squares for h7", () => {
        const correctSquares = ["f6", "f8", "g5"];
        const result = validKnightMovesFromSquare("h7", "wK", board);
        expect(correctSquares.sort()).toEqual(result.sort());
      });

      it("should return correct move squares for b4", () => {
        const correctSquares = ["a6", "c6", "d3", "d5"];
        const result = validKnightMovesFromSquare("b4", "wK", board);
        expect(correctSquares.sort()).toEqual(result.sort());
      });

      it("should return correct move squares for a8 when b6 is blocked", () => {
        board.b6 = "wP";
        const correctSquares = ["c7"];
        const result = validKnightMovesFromSquare("a8", "wK", board);
        expect(correctSquares.sort()).toEqual(result.sort());
      });
    });

    describe("Black", () => {
      it("should return correct move squares for b8", () => {
        const correctSquares = ["a6", "c6"];
        const result = validKnightMovesFromSquare("b8", "bK", board);
        expect(correctSquares.sort()).toEqual(result.sort());
      });

      it("should return correct move squares for g8", () => {
        const correctSquares = ["f6", "h6"];
        const result = validKnightMovesFromSquare("g8", "bK", board);
        expect(correctSquares.sort()).toEqual(result.sort());
      });

      it("should return correct move squares for d4", () => {
        const correctSquares = ["b3", "b5", "c2", "c6", "e2", "e6", "f3", "f5"];
        const result = validKnightMovesFromSquare("d4", "bK", board);
        expect(correctSquares.sort()).toEqual(result.sort());
      });

      it("should return correct move squares for c2", () => {
        const correctSquares = ["a1", "a3", "b4", "d4", "e1", "e3"];
        const result = validKnightMovesFromSquare("c2", "bK", board);
        expect(correctSquares.sort()).toEqual(result.sort());
      });

      it("should return correct move squares for h6", () => {
        // Knight has moved from g8 -> h6, so g8 = undefined
        board.g8 = undefined;
        const correctSquares = ["f5", "g4", "g8"];
        const result = validKnightMovesFromSquare("h6", "bK", board);
        expect(correctSquares.sort()).toEqual(result.sort());
      });

      it("should return correct move squares for a1 when b3 is blocked", () => {
        board.b3 = "bP";
        const correctSquares = ["c2"];
        const result = validKnightMovesFromSquare("a1", "bK", board);
        expect(correctSquares.sort()).toEqual(result.sort());
      });
    });
  });

  describe("canKnightCapture", () => {
    describe("White", () => {
      it("should return true when c3 = wN, d5 = bP", () => {
        board.d5 = "bP";
        const canCapture = canKnightCapture("c3", "d5", "wN", board);
        expect(canCapture).toBe(true);
      });

      it("should return false when f4 = wN, d5 = undefined", () => {
        board.d5 = undefined;
        const canCapture = canKnightCapture("f4", "d5", "wN", board);
        expect(canCapture).toBe(false);
      });

      it("should return true for all possible squares from d5", () => {
        board.b4 = "bN";
        board.b6 = "bB";
        board.c3 = "bN";
        board.e3 = "bB";
        board.f4 = "bQ";
        board.f6 = "bR";
        const possibleMoves = validKnightMovesFromSquare("d5", "wN", board);

        possibleMoves.forEach((target) => {
          const canCapture = canKnightCapture("d5", target, "wN", board);
          expect(canCapture).toBe(true);
        });
      });

      it("should return false for invalid targets from f4", () => {
        board.g6 = "wP";
        const possibleMoves = validKnightMovesFromSquare("f4", "wN", board);
        possibleMoves.forEach((target) => {
          const canCapture = canKnightCapture("f4", target, "wN", board);
          expect(canCapture).toBe(false);
        });
      });
    });

    describe("Black", () => {
      it("should return true when b4 = bN, a3 c3 = wP", () => {
        board.b4 = "bN";
        const canCapturea2 = canKnightCapture("b4", "a2", "bN", board);
        const canCapturec2 = canKnightCapture("b4", "c2", "bN", board);
        expect(canCapturea2).toBe(true);
        expect(canCapturec2).toBe(true);
      });

      it("should return false when d5 = bN", () => {
        const possibleMoves = validKnightMovesFromSquare("d5", "bN", board);
        possibleMoves.forEach((target) => {
          const canCapture = canKnightCapture("d5", target, "bN", board);
          expect(canCapture).toBe(false);
        });
      });

      it("should return true for all squares from f4", () => {
        board.f4 = "bN";
        board.d3 = "wP";
        board.d5 = "wB";
        board.e2 = "wN";
        board.e6 = "wP";
        board.g6 = "wQ";
        board.h3 = "wN";
        board.h5 = "wB";

        const possibleMoves = validKnightMovesFromSquare("f4", "bN", board);
        possibleMoves.forEach((target) => {
          const canCapture = canKnightCapture("f4", target, "bN", board);
          expect(canCapture).toBe(true);
        });
      });
    });
  });
});
