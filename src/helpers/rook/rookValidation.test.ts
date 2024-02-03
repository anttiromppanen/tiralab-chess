import { BoardPosition, Square } from "react-chessboard/dist/chessboard/types";
import { horizontalBoard } from "../../const/common";
import {
  generateMovesDownwards,
  generateMovesLeft,
  generateMovesRight,
  generateMovesUpwards,
} from "./rookValidation";

describe("rookValidation.ts", () => {
  const emptyBoard: BoardPosition = {};
  let validRookMoves: Square[] = [];
  let whiteMoves: Square[] = [];
  let blackMoves: Square[] = [];
  let shouldContainSquares: Square[] = [];
  let whiteShouldContainSquares: Square[] = [];
  let blackShouldContainSquares: Square[] = [];
  const maxColumns = 7;
  const maxRows = 8;

  beforeEach(() => {
    validRookMoves = [];
    shouldContainSquares = [];
    whiteMoves = [];
    blackMoves = [];
    whiteShouldContainSquares = [];
    blackShouldContainSquares = [];
  });

  describe("Movement", () => {
    describe("should return correct squares on empty board", () => {
      it("should contain correct squares upwards", () => {
        shouldContainSquares = ["d5", "d6", "d7", "d8"];
        generateMovesUpwards("wR", "d", 4, maxRows, validRookMoves, emptyBoard);

        expect(shouldContainSquares.sort()).toStrictEqual(
          validRookMoves.sort(),
        );
      });

      it("should contain correct squares downwards", () => {
        shouldContainSquares = ["a5", "a4", "a3", "a2", "a1"];
        generateMovesDownwards("a", 6, validRookMoves);

        expect(shouldContainSquares.sort()).toStrictEqual(
          validRookMoves.sort(),
        );
      });

      it("should contain correct squares left", () => {
        shouldContainSquares = ["e6", "d6", "c6", "b6", "a6"];
        const sourceColumnLetterIndex = horizontalBoard.indexOf("f");
        generateMovesLeft(sourceColumnLetterIndex, 6, validRookMoves);

        expect(shouldContainSquares.sort()).toStrictEqual(
          validRookMoves.sort(),
        );
      });

      it("should contain correct squares right", () => {
        shouldContainSquares = ["c6", "d6", "e6", "f6", "g6", "h6"];
        const sourceColumnLetterIndex = horizontalBoard.indexOf("b");
        generateMovesRight(
          sourceColumnLetterIndex,
          6,
          maxColumns,
          validRookMoves,
        );

        expect(shouldContainSquares.sort()).toStrictEqual(
          validRookMoves.sort(),
        );
      });

      it("should return empty list on board top edge", () => {
        generateMovesUpwards("wR", "f", 8, maxRows, validRookMoves, emptyBoard);
        expect(shouldContainSquares).toStrictEqual(validRookMoves);
      });

      it("should return empty list on board bottom edge", () => {
        generateMovesDownwards("h", 1, validRookMoves);
        expect(shouldContainSquares).toStrictEqual(validRookMoves);
      });

      it("should return empty list on board left edge", () => {
        const sourceColumnLetterIndex = horizontalBoard.indexOf("a");
        generateMovesLeft(sourceColumnLetterIndex, 1, validRookMoves);
        expect(shouldContainSquares).toStrictEqual(validRookMoves);
      });

      it("should return empty list on board right edge", () => {
        const sourceColumnLetterIndex = horizontalBoard.indexOf("h");
        generateMovesRight(
          sourceColumnLetterIndex,
          4,
          maxColumns,
          validRookMoves,
        );
        expect(shouldContainSquares).toStrictEqual(validRookMoves);
      });
    });

    describe("blocked by opposite color piece", () => {
      it("should return correct squares upwards", () => {
        emptyBoard.c7 = "bN";
        emptyBoard.d7 = "wN";
        whiteShouldContainSquares = ["c4", "c5", "c6", "c7"];
        blackShouldContainSquares = ["d4", "d5", "d6", "d7"];
        generateMovesUpwards("wR", "c", 3, maxRows, whiteMoves, emptyBoard);
        generateMovesUpwards("bR", "d", 3, maxRows, blackMoves, emptyBoard);

        expect(whiteShouldContainSquares.sort()).toStrictEqual(
          whiteMoves.sort(),
        );
        expect(blackShouldContainSquares.sort()).toStrictEqual(
          blackMoves.sort(),
        );
      });
    });
  });
});
