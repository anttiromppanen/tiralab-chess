import { BoardPosition, Square } from "react-chessboard/dist/chessboard/types";
import { initialBoardPosition } from "../../const/common";
import { validBishopMovesFromSquare } from "./bishopValidation";
import {
  generateMovesLeftBottom,
  generateMovesLeftTop,
  generateMovesRightBottom,
  generateMovesRightTop,
} from "../generateMovesForPiece";

describe("bishopValidation.ts", () => {
  let board = { ...initialBoardPosition };
  const emptyBoard = {};
  let validBishopMoves: Square[] = [];
  let whiteBoard: BoardPosition = {};
  let blackBoard: BoardPosition = {};
  let whiteMoves: Square[] = [];
  let blackMoves: Square[] = [];
  let whiteShouldContainSquares: Square[] = [];
  let blackShouldContainSquares: Square[] = [];
  const maxColumns = 7;
  const maxRows = 8;

  beforeEach(() => {
    board = { ...initialBoardPosition };
    validBishopMoves = [];
    whiteBoard = {};
    blackBoard = {};
    whiteMoves = [];
    blackMoves = [];
    whiteShouldContainSquares = [];
    blackShouldContainSquares = [];
  });

  describe("Movement", () => {
    describe("Left top diagonal", () => {
      it("should travel from end to end on empty board", () => {
        const shouldContainSquares = ["g2", "f3", "e4", "d5", "c6", "b7", "a8"];
        generateMovesLeftTop("wB", emptyBoard, 7, 1, maxRows, validBishopMoves);

        expect(shouldContainSquares.sort()).toStrictEqual(
          validBishopMoves.sort(),
        );
      });

      it("should stop and include square if piece is opposite color", () => {
        whiteBoard = { d5: "bP" };
        blackBoard = { e4: "wK" };
        whiteShouldContainSquares = ["g2", "f3", "e4", "d5"];
        blackShouldContainSquares = ["g2", "f3", "e4"];

        generateMovesLeftTop("wB", whiteBoard, 7, 1, maxRows, whiteMoves);
        generateMovesLeftTop("bB", blackBoard, 7, 1, maxRows, blackMoves);

        expect(whiteShouldContainSquares.sort()).toStrictEqual(
          whiteMoves.sort(),
        );
        expect(blackShouldContainSquares.sort()).toStrictEqual(
          blackMoves.sort(),
        );
      });

      it("should stop and not include square if piece is the same color", () => {
        whiteBoard = { c6: "wR" };
        blackBoard = { g2: "bK" };
        whiteShouldContainSquares = ["g2", "f3", "e4", "d5"];
        blackShouldContainSquares = [];

        generateMovesLeftTop("wB", whiteBoard, 7, 1, maxRows, whiteMoves);
        generateMovesLeftTop("bB", blackBoard, 7, 1, maxRows, blackMoves);

        expect(whiteShouldContainSquares.sort()).toStrictEqual(
          whiteMoves.sort(),
        );
        expect(blackShouldContainSquares.sort()).toStrictEqual(
          blackMoves.sort(),
        );
      });
    });

    describe("Right top diagonal", () => {
      it("should travel from end to end on empty board", () => {
        const shouldContainSquares = ["b2", "c3", "d4", "e5", "f6", "g7", "h8"];
        generateMovesRightTop(
          "wB",
          emptyBoard,
          0,
          1,
          maxRows,
          maxColumns,
          validBishopMoves,
        );

        expect(shouldContainSquares.sort()).toStrictEqual(
          validBishopMoves.sort(),
        );
      });

      it("should stop and include square if piece is opposite color", () => {
        whiteBoard = { e5: "bP" };
        blackBoard = { c3: "wR" };
        whiteShouldContainSquares = ["b2", "c3", "d4", "e5"];
        blackShouldContainSquares = ["b2", "c3"];

        generateMovesRightTop(
          "wB",
          whiteBoard,
          0,
          1,
          maxRows,
          maxColumns,
          whiteMoves,
        );
        generateMovesRightTop(
          "bB",
          blackBoard,
          0,
          1,
          maxRows,
          maxColumns,
          blackMoves,
        );

        expect(whiteShouldContainSquares.sort()).toStrictEqual(
          whiteMoves.sort(),
        );
        expect(blackShouldContainSquares.sort()).toStrictEqual(
          blackMoves.sort(),
        );
      });

      it("should stop and not include square if piece is the same color", () => {
        whiteBoard = { b2: "wN" };
        blackBoard = { g7: "bP" };
        whiteShouldContainSquares = [];
        blackShouldContainSquares = ["b2", "c3", "d4", "e5", "f6"];

        generateMovesRightTop(
          "wB",
          whiteBoard,
          0,
          1,
          maxRows,
          maxColumns,
          whiteMoves,
        );
        generateMovesRightTop(
          "bB",
          blackBoard,
          0,
          1,
          maxRows,
          maxColumns,
          blackMoves,
        );

        expect(whiteShouldContainSquares.sort()).toStrictEqual(
          whiteMoves.sort(),
        );
        expect(blackShouldContainSquares.sort()).toStrictEqual(
          blackMoves.sort(),
        );
      });
    });

    describe("Left bottom diagonal", () => {
      it("should travel from end to end on empty board", () => {
        const shouldContainSquares = ["g7", "f6", "e5", "d4", "c3", "b2", "a1"];
        generateMovesLeftBottom("bB", emptyBoard, 7, 8, validBishopMoves);

        expect(shouldContainSquares.sort()).toStrictEqual(
          validBishopMoves.sort(),
        );
      });

      it("should stop and include square if piece is opposite color", () => {
        whiteBoard = { c3: "bQ" };
        blackBoard = { f6: "wB" };
        whiteShouldContainSquares = ["g7", "f6", "e5", "d4", "c3"];
        blackShouldContainSquares = ["g7", "f6"];

        generateMovesLeftBottom("wB", whiteBoard, 7, 8, whiteMoves);
        generateMovesLeftBottom("bB", blackBoard, 7, 8, blackMoves);

        expect(whiteShouldContainSquares.sort()).toStrictEqual(
          whiteMoves.sort(),
        );
        expect(blackShouldContainSquares.sort()).toStrictEqual(
          blackMoves.sort(),
        );
      });

      it("should stop and not include square if piece is the same color", () => {
        whiteBoard = { e5: "wR" };
        blackBoard = { d4: "bQ" };
        whiteShouldContainSquares = ["g7", "f6"];
        blackShouldContainSquares = ["g7", "f6", "e5"];

        generateMovesLeftBottom("wB", whiteBoard, 7, 8, whiteMoves);
        generateMovesLeftBottom("bB", blackBoard, 7, 8, blackMoves);

        expect(whiteShouldContainSquares.sort()).toStrictEqual(
          whiteMoves.sort(),
        );
        expect(blackShouldContainSquares.sort()).toStrictEqual(
          blackMoves.sort(),
        );
      });
    });

    describe("Right bottom diagonal", () => {
      it("should travel from end to end on empty board", () => {
        const shouldContainSquares = ["b7", "c6", "d5", "e4", "f3", "g2", "h1"];
        generateMovesRightBottom(
          "bB",
          emptyBoard,
          0,
          8,
          maxColumns,
          validBishopMoves,
        );

        expect(shouldContainSquares.sort()).toStrictEqual(
          validBishopMoves.sort(),
        );
      });

      it("should stop and include square if piece is opposite color", () => {
        whiteBoard = { d5: "bP" };
        blackBoard = { c6: "wQ" };
        whiteShouldContainSquares = ["b7", "c6", "d5"];
        blackShouldContainSquares = ["b7", "c6"];

        generateMovesRightBottom(
          "wB",
          whiteBoard,
          0,
          8,
          maxColumns,
          whiteMoves,
        );
        generateMovesRightBottom(
          "bB",
          blackBoard,
          0,
          8,
          maxColumns,
          blackMoves,
        );

        expect(whiteShouldContainSquares.sort()).toStrictEqual(
          whiteMoves.sort(),
        );
        expect(blackShouldContainSquares.sort()).toStrictEqual(
          blackMoves.sort(),
        );
      });

      it("should stop and not include square if piece is the same color", () => {
        whiteBoard = { b7: "wK" };
        blackBoard = { c6: "bB" };
        whiteShouldContainSquares = [];
        blackShouldContainSquares = ["b7"];

        generateMovesRightBottom(
          "wB",
          whiteBoard,
          0,
          8,
          maxColumns,
          whiteMoves,
        );
        generateMovesRightBottom(
          "bB",
          blackBoard,
          0,
          8,
          maxColumns,
          blackMoves,
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

  describe("validBishopMovesFromSquare", () => {
    it("should return valid squares from e4 for white", () => {
      whiteShouldContainSquares = [
        "d5",
        "c6",
        "b7",
        "f5",
        "g6",
        "h7",
        "d3",
        "f3",
      ];
      validBishopMoves = validBishopMovesFromSquare("e4", "wB", board);

      expect(whiteShouldContainSquares.sort()).toStrictEqual(
        validBishopMoves.sort(),
      );
    });

    it("should return valid squares from b4 for black", () => {
      blackShouldContainSquares = ["a5", "a3", "c5", "d6", "c3", "d2"];
      validBishopMoves = validBishopMovesFromSquare("b4", "bB", board);

      expect(blackShouldContainSquares.sort()).toStrictEqual(
        validBishopMoves.sort(),
      );
    });
  });
});
