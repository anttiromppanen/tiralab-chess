import { BoardPosition, Square } from "react-chessboard/dist/chessboard/types";
import { horizontalBoard } from "../../const/common";
import {
  generateMovesDownwards,
  generateMovesLeft,
  generateMovesRight,
  generateMovesUpwards,
} from "../generateMovesForPiece";

describe("rookValidation.ts", () => {
  let emptyBoard: BoardPosition = {};
  let validRookMoves: Square[] = [];
  let whiteMoves: Square[] = [];
  let blackMoves: Square[] = [];
  let shouldContainSquares: Square[] = [];
  let whiteShouldContainSquares: Square[] = [];
  let blackShouldContainSquares: Square[] = [];
  const maxColumns = 7;
  const maxRows = 8;

  beforeEach(() => {
    emptyBoard = {};
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
        generateMovesDownwards("wR", "a", 6, validRookMoves, emptyBoard);

        expect(shouldContainSquares.sort()).toStrictEqual(
          validRookMoves.sort(),
        );
      });

      it("should contain correct squares left", () => {
        shouldContainSquares = ["e6", "d6", "c6", "b6", "a6"];
        const sourceColumnLetterIndex = horizontalBoard.indexOf("f");
        generateMovesLeft(
          "wR",
          sourceColumnLetterIndex,
          6,
          validRookMoves,
          emptyBoard,
        );

        expect(shouldContainSquares.sort()).toStrictEqual(
          validRookMoves.sort(),
        );
      });

      it("should contain correct squares right", () => {
        shouldContainSquares = ["c6", "d6", "e6", "f6", "g6", "h6"];
        const sourceColumnLetterIndex = horizontalBoard.indexOf("b");
        generateMovesRight(
          "wR",
          sourceColumnLetterIndex,
          6,
          maxColumns,
          validRookMoves,
          emptyBoard,
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
        generateMovesDownwards("bR", "h", 1, validRookMoves, emptyBoard);
        expect(shouldContainSquares).toStrictEqual(validRookMoves);
      });

      it("should return empty list on board left edge", () => {
        const sourceColumnLetterIndex = horizontalBoard.indexOf("a");
        generateMovesLeft(
          "bR",
          sourceColumnLetterIndex,
          1,
          validRookMoves,
          emptyBoard,
        );
        expect(shouldContainSquares).toStrictEqual(validRookMoves);
      });

      it("should return empty list on board right edge", () => {
        const sourceColumnLetterIndex = horizontalBoard.indexOf("h");
        generateMovesRight(
          "bR",
          sourceColumnLetterIndex,
          4,
          maxColumns,
          validRookMoves,
          emptyBoard,
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

      it("should return correct squares downwards", () => {
        emptyBoard.e2 = "bQ";
        emptyBoard.b3 = "wB";
        whiteShouldContainSquares = ["e2", "e3"];
        blackShouldContainSquares = ["b3", "b4", "b5", "b6"];
        generateMovesDownwards("wR", "e", 4, whiteMoves, emptyBoard);
        generateMovesDownwards("bR", "b", 7, blackMoves, emptyBoard);

        expect(whiteShouldContainSquares.sort()).toStrictEqual(
          whiteMoves.sort(),
        );
        expect(blackShouldContainSquares.sort()).toStrictEqual(
          blackMoves.sort(),
        );
      });

      it("should return correct squares left", () => {
        emptyBoard.b3 = "bN";
        emptyBoard.c7 = "wP";
        whiteShouldContainSquares = ["e3", "d3", "c3", "b3"];
        blackShouldContainSquares = ["c7"];
        const whiteSourceColumnLetterIndex = horizontalBoard.indexOf("f");
        const blackSourceColumnLetterIndex = horizontalBoard.indexOf("d");

        generateMovesLeft(
          "wR",
          whiteSourceColumnLetterIndex,
          3,
          whiteMoves,
          emptyBoard,
        );
        generateMovesLeft(
          "bR",
          blackSourceColumnLetterIndex,
          7,
          blackMoves,
          emptyBoard,
        );

        expect(whiteShouldContainSquares.sort()).toStrictEqual(
          whiteMoves.sort(),
        );
        expect(blackShouldContainSquares.sort()).toStrictEqual(
          blackMoves.sort(),
        );
      });

      it("should return correct squares right", () => {
        emptyBoard.g1 = "bP";
        emptyBoard.h5 = "wB";
        whiteShouldContainSquares = ["b1", "c1", "d1", "e1", "f1", "g1"];
        blackShouldContainSquares = ["e5", "f5", "g5", "h5"];
        const whiteSourceColumnLetterIndex = horizontalBoard.indexOf("a");
        const blackSourceColumnLetterIndex = horizontalBoard.indexOf("d");

        generateMovesRight(
          "wR",
          whiteSourceColumnLetterIndex,
          1,
          maxColumns,
          whiteMoves,
          emptyBoard,
        );
        generateMovesRight(
          "bR",
          blackSourceColumnLetterIndex,
          5,
          maxColumns,
          blackMoves,
          emptyBoard,
        );

        expect(whiteShouldContainSquares.sort()).toStrictEqual(
          whiteMoves.sort(),
        );
        expect(blackShouldContainSquares.sort()).toStrictEqual(
          blackMoves.sort(),
        );
      });
    });

    describe("blocked by same color piece", () => {
      it("should return correct squares upwards", () => {
        emptyBoard.e6 = "bN";
        emptyBoard.c5 = "wB";
        whiteShouldContainSquares = ["c4"];
        blackShouldContainSquares = ["e3", "e4", "e5"];
        generateMovesUpwards("wR", "c", 3, maxRows, whiteMoves, emptyBoard);
        generateMovesUpwards("bR", "e", 2, maxRows, blackMoves, emptyBoard);

        expect(whiteShouldContainSquares.sort()).toStrictEqual(
          whiteMoves.sort(),
        );
        expect(blackShouldContainSquares.sort()).toStrictEqual(
          blackMoves.sort(),
        );
      });

      it("should return correct squares downwards", () => {
        emptyBoard.b4 = "bP";
        emptyBoard.h3 = "wP";
        whiteShouldContainSquares = ["h6", "h5", "h4"];
        blackShouldContainSquares = ["b5"];
        generateMovesDownwards("wR", "h", 7, whiteMoves, emptyBoard);
        generateMovesDownwards("bR", "b", 6, blackMoves, emptyBoard);

        expect(whiteShouldContainSquares.sort()).toStrictEqual(
          whiteMoves.sort(),
        );
        expect(blackShouldContainSquares.sort()).toStrictEqual(
          blackMoves.sort(),
        );
      });

      it("should return correct squares left", () => {
        emptyBoard.a2 = "bP";
        emptyBoard.b5 = "wP";
        whiteShouldContainSquares = ["d5", "c5"];
        blackShouldContainSquares = ["b2", "c2", "d2", "e2", "f2"];
        const whiteSourceColumnLetterIndex = horizontalBoard.indexOf("e");
        const blackSourceColumnLetterIndex = horizontalBoard.indexOf("g");

        generateMovesLeft(
          "wR",
          whiteSourceColumnLetterIndex,
          5,
          whiteMoves,
          emptyBoard,
        );

        generateMovesLeft(
          "bR",
          blackSourceColumnLetterIndex,
          2,
          blackMoves,
          emptyBoard,
        );

        expect(whiteShouldContainSquares.sort()).toStrictEqual(
          whiteMoves.sort(),
        );
        expect(blackShouldContainSquares.sort()).toStrictEqual(
          blackMoves.sort(),
        );
      });

      it("should return correct squares right", () => {
        emptyBoard.f1 = "bP";
        emptyBoard.e6 = "wP";
        whiteShouldContainSquares = ["c6", "d6"];
        blackShouldContainSquares = ["c1", "d1", "e1"];
        const whiteSourceColumnLetterIndex = horizontalBoard.indexOf("b");
        const blackSourceColumnLetterIndex = horizontalBoard.indexOf("b");

        generateMovesRight(
          "wR",
          whiteSourceColumnLetterIndex,
          6,
          maxColumns,
          whiteMoves,
          emptyBoard,
        );

        generateMovesRight(
          "bR",
          blackSourceColumnLetterIndex,
          1,
          maxColumns,
          blackMoves,
          emptyBoard,
        );

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
