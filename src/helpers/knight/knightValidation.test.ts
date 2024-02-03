import { initialBoardPosition } from "../../const/common";
import { validKnightMovesFromSquare } from "./knightValidation";

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
});
