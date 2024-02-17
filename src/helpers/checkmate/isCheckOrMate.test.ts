import { BoardPosition, Square } from "react-chessboard/dist/chessboard/types";
import {
  canCheckBeBlocked,
  isChecked,
  isCheckmated,
  possibleKingMovesAfterCheck,
} from "./isCheckOrMate";
import { initialBoardPosition } from "../../const/common";
import attackedSquares from "../attackedSquares";

describe("isCheckOrMate.ts", () => {
  let emptyBoard: BoardPosition = {};
  let initialBoard: BoardPosition = initialBoardPosition;
  let expectedPossibleMoves: Square[];

  beforeEach(() => {
    emptyBoard = {};
    initialBoard = initialBoardPosition;
    expectedPossibleMoves = [];
  });

  describe("possibleKingMovesAfterCheck", () => {
    it("should return correct squares for white", () => {
      emptyBoard.b8 = "bP";
      emptyBoard.b7 = "wK";
      emptyBoard.b5 = "bR";

      const inTurn = "w";
      const { allAttackedSquares, kingPositions } = attackedSquares(
        inTurn,
        emptyBoard,
      );

      const validSquaresForKing = possibleKingMovesAfterCheck(
        inTurn,
        kingPositions,
        allAttackedSquares,
        emptyBoard,
      );
      expectedPossibleMoves = ["a8", "b8", "c8", "a6", "c6"];

      expect(expectedPossibleMoves.sort()).toStrictEqual(
        validSquaresForKing.sort(),
      );
    });

    it("should return correct squares for black", () => {
      emptyBoard.h8 = "bK";
      emptyBoard.e6 = "wB";
      emptyBoard.e5 = "wB";

      const inTurn = "b";
      const { allAttackedSquares, kingPositions } = attackedSquares(
        inTurn,
        emptyBoard,
      );

      const validSquaresForKing = possibleKingMovesAfterCheck(
        inTurn,
        kingPositions,
        allAttackedSquares,
        emptyBoard,
      );
      expectedPossibleMoves = ["h7"];

      expect(expectedPossibleMoves.sort()).toStrictEqual(
        validSquaresForKing.sort(),
      );
    });
  });

  describe("canCheckBeBlocked", () => {
    it("should return correct squares when check can be blocked by white", () => {
      emptyBoard.g8 = "bB";
      emptyBoard.c3 = "bP";
      emptyBoard.a2 = "bP";
      emptyBoard.b2 = "bB";
      emptyBoard.a1 = "wK";
      emptyBoard.c1 = "wP";

      const result = canCheckBeBlocked("w", emptyBoard);

      expect(result).toStrictEqual(["c1"]);
    });

    it("should return empty list when check cannot be blocked by white", () => {
      emptyBoard.e4 = "bB";
      emptyBoard.c3 = "bP";
      emptyBoard.a2 = "bP";
      emptyBoard.b2 = "bB";
      emptyBoard.a1 = "wK";
      emptyBoard.d1 = "wP";

      const result = canCheckBeBlocked("w", emptyBoard);

      expect(result).toStrictEqual([]);
    });

    it("should return correct squares when check can be blocked by black", () => {
      initialBoard.c7 = undefined;
      initialBoard.f7 = undefined;
      initialBoard.c6 = "bP";
      initialBoard.f5 = "bP";
      initialBoard.h5 = "wQ";
      initialBoard.e3 = "wP";
      initialBoard.e2 = undefined;
      initialBoard.d1 = undefined;

      const result = canCheckBeBlocked("b", initialBoard);

      expect(result).toStrictEqual(["g7"]);
    });

    it("should return empty list when check cannot be blocked by black", () => {
      emptyBoard.a8 = "bK";
      emptyBoard.c8 = "bB";
      emptyBoard.b6 = "wN";

      const result = canCheckBeBlocked("b", emptyBoard);

      expect(result).toStrictEqual([]);
    });
  });

  describe("isChecked", () => {
    it("should return true when white king is checked", () => {
      emptyBoard.c8 = "bR";
      emptyBoard.c1 = "wK";

      const inTurn = "w";
      const { allAttackedSquares, kingPositions } = attackedSquares(
        inTurn,
        emptyBoard,
      );
      const isKingAttacked = isChecked(
        inTurn,
        kingPositions,
        allAttackedSquares,
      );

      expect(isKingAttacked).toBe(true);
    });

    it("should return false when white king is not checked", () => {
      emptyBoard.b7 = "bQ";
      emptyBoard.d3 = "wK";

      const inTurn = "w";
      const { allAttackedSquares, kingPositions } = attackedSquares(
        inTurn,
        emptyBoard,
      );
      const isKingAttacked = isChecked(
        inTurn,
        kingPositions,
        allAttackedSquares,
      );

      expect(isKingAttacked).toBe(false);
    });

    it("should return true when black king is checked", () => {
      emptyBoard.a8 = "bK";
      emptyBoard.b3 = "wP";
      emptyBoard.h1 = "wB";

      const inTurn = "b";
      const { allAttackedSquares, kingPositions } = attackedSquares(
        inTurn,
        emptyBoard,
      );
      const isKingAttacked = isChecked(
        inTurn,
        kingPositions,
        allAttackedSquares,
      );

      expect(isKingAttacked).toBe(true);
    });

    it("should return false when black king is not checked", () => {
      emptyBoard.c5 = "bK";
      emptyBoard.d5 = "wP";
      emptyBoard.a4 = "wB";
      emptyBoard.c3 = "wN";

      const inTurn = "b";
      const { allAttackedSquares, kingPositions } = attackedSquares(
        inTurn,
        emptyBoard,
      );
      const isKingAttacked = isChecked(
        inTurn,
        kingPositions,
        allAttackedSquares,
      );

      expect(isKingAttacked).toBe(false);
    });
  });

  describe("isCheckmated", () => {
    it("should return true if white is checkmated", () => {
      emptyBoard.h1 = "wK";
      emptyBoard.g2 = "bP";
      emptyBoard.c5 = "bB";
      emptyBoard.h3 = "bK";

      const { allAttackedSquares, kingPositions } = attackedSquares(
        "w",
        emptyBoard,
      );
      const canBeBlocked = canCheckBeBlocked("w", emptyBoard);
      const result = isCheckmated(
        kingPositions,
        "w",
        allAttackedSquares,
        canBeBlocked,
        emptyBoard,
      );
      expect(result).toBe(true);
    });

    it("should return false if white is not checkmated", () => {
      emptyBoard.a8 = "wK";
      emptyBoard.a7 = "bP";
      emptyBoard.b6 = "bN";

      const { allAttackedSquares, kingPositions } = attackedSquares(
        "w",
        emptyBoard,
      );
      const canBeBlocked = canCheckBeBlocked("w", emptyBoard);
      const result = isCheckmated(
        kingPositions,
        "w",
        allAttackedSquares,
        canBeBlocked,
        emptyBoard,
      );

      expect(result).toBe(false);
    });

    it("should return true if black is checkmated", () => {
      emptyBoard.f8 = "bR";
      emptyBoard.g8 = "bK";
      emptyBoard.g7 = "bP";
      emptyBoard.g6 = "wP";
      emptyBoard.h7 = "wQ";
      emptyBoard.g1 = "wK";

      const { allAttackedSquares, kingPositions } = attackedSquares(
        "b",
        emptyBoard,
      );
      const canBeBlocked = canCheckBeBlocked("w", emptyBoard);
      const result = isCheckmated(
        kingPositions,
        "b",
        allAttackedSquares,
        canBeBlocked,
        emptyBoard,
      );

      expect(result).toBe(true);
    });

    it("should return false if black is not checkmated", () => {
      emptyBoard.e4 = "wB";
      emptyBoard.f4 = "wB";
      emptyBoard.h1 = "bK";

      const { allAttackedSquares, kingPositions } = attackedSquares(
        "w",
        emptyBoard,
      );
      const canBeBlocked = canCheckBeBlocked("b", emptyBoard);
      const result = isCheckmated(
        kingPositions,
        "b",
        allAttackedSquares,
        canBeBlocked,
        emptyBoard,
      );

      expect(result).toBe(false);
    });

    it("should not be checkmate for white if black can block the check", () => {
      initialBoard.d1 = undefined;
      initialBoard.f7 = undefined;
      initialBoard.f5 = "bP";
      initialBoard.h5 = "wQ";

      const { allAttackedSquares, kingPositions } = attackedSquares(
        "w",
        emptyBoard,
      );
      const canBeBlocked = canCheckBeBlocked("b", emptyBoard);
      const result = isCheckmated(
        kingPositions,
        "b",
        allAttackedSquares,
        canBeBlocked,
        emptyBoard,
      );

      expect(result).toBe(false);
    });
  });
});
