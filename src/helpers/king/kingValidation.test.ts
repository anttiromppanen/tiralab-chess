import { BoardPosition, Square } from "react-chessboard/dist/chessboard/types";
import { initialBoardPosition } from "../../const/common";
import validKingMovesFromSquare from "./kingValidation";

describe("rookValidation.ts", () => {
  let board = { ...initialBoardPosition };
  let emptyBoard: BoardPosition = {};
  let validKingMoves: Square[] = [];
  let shouldContainSquares: Square[] = [];

  beforeEach(() => {
    board = { ...initialBoardPosition };
    emptyBoard = {};
    validKingMoves = [];
    shouldContainSquares = [];
  });

  describe("Movement", () => {
    it("should return correct squares on empty board from center", () => {
      validKingMoves = validKingMovesFromSquare("d4", "wK", emptyBoard);
      shouldContainSquares = ["c3", "c4", "c5", "d5", "e5", "e4", "e3", "d3"];

      expect(shouldContainSquares.sort()).toStrictEqual(validKingMoves.sort());
    });

    it("should return an empty array in beginning", () => {
      validKingMoves = validKingMovesFromSquare("e1", "wK", board);
      shouldContainSquares = [];

      expect(shouldContainSquares.sort()).toStrictEqual(validKingMoves.sort());
    });

    it("should return correct squares when squares are blocked on the center", () => {
      emptyBoard.c3 = "wR";
      emptyBoard.c5 = "wB";
      emptyBoard.e5 = "wN";
      emptyBoard.e3 = "wP";
      validKingMoves = validKingMovesFromSquare("d4", "wK", emptyBoard);
      shouldContainSquares = ["c4", "d5", "e4", "d3"];

      expect(shouldContainSquares.sort()).toStrictEqual(validKingMoves.sort());
    });

    it("should return correct squares from bottom left corner", () => {
      emptyBoard.a2 = "bR";
      validKingMoves = validKingMovesFromSquare("a1", "bK", emptyBoard);
      shouldContainSquares = ["b1", "b2"];

      expect(shouldContainSquares.sort()).toStrictEqual(validKingMoves.sort());
    });

    it("should return correct squares from top left corner", () => {
      validKingMoves = validKingMovesFromSquare("a8", "wK", emptyBoard);
      shouldContainSquares = ["a7", "b8", "b7"];

      expect(shouldContainSquares.sort()).toStrictEqual(validKingMoves.sort());
    });

    it("should return correct squares from top right corner", () => {
      emptyBoard.g7 = "wB";
      validKingMoves = validKingMovesFromSquare("h8", "wK", emptyBoard);
      shouldContainSquares = ["g8", "h7"];

      expect(shouldContainSquares.sort()).toStrictEqual(validKingMoves.sort());
    });

    it("should return correct squares from bottom left corner", () => {
      validKingMoves = validKingMovesFromSquare("h1", "bK", emptyBoard);
      shouldContainSquares = ["h2", "g1", "g2"];

      expect(shouldContainSquares.sort()).toStrictEqual(validKingMoves.sort());
    });

    it("should return an empty list when all squares are blocked", () => {
      emptyBoard.c3 = "wQ";
      emptyBoard.c4 = "wB";
      emptyBoard.c5 = "wR";
      emptyBoard.d5 = "wP";
      emptyBoard.e5 = "wP";
      emptyBoard.e4 = "wB";
      emptyBoard.e3 = "wN";
      emptyBoard.d3 = "wP";

      validKingMoves = validKingMovesFromSquare("d4", "wK", emptyBoard);
      shouldContainSquares = [];

      expect(shouldContainSquares.sort()).toStrictEqual(validKingMoves.sort());
    });

    it("should contain squares blocked by opposite color piece for white", () => {
      emptyBoard.c4 = "bB";
      emptyBoard.c5 = "bQ";
      emptyBoard.e5 = "bN";
      emptyBoard.e4 = "bP";

      validKingMoves = validKingMovesFromSquare("d4", "wK", emptyBoard);
      shouldContainSquares = ["c4", "c5", "d5", "e5", "e4", "e3", "d3", "c3"];

      expect(shouldContainSquares.sort()).toStrictEqual(validKingMoves.sort());
    });

    it("should contain squares blocked by opposite color piece for black", () => {
      emptyBoard.c4 = "wB";
      emptyBoard.c5 = "wQ";
      emptyBoard.e5 = "wN";
      emptyBoard.e4 = "wP";

      validKingMoves = validKingMovesFromSquare("d4", "bK", emptyBoard);
      shouldContainSquares = ["c4", "c5", "d5", "e5", "e4", "e3", "d3", "c3"];

      expect(shouldContainSquares.sort()).toStrictEqual(validKingMoves.sort());
    });
  });
});
