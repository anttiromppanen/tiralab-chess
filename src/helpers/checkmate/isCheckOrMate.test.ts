import { BoardPosition, Square } from "react-chessboard/dist/chessboard/types";
import { isChecked } from "./isCheckOrMate";

describe("isCheckOrMate.ts", () => {
  let emptyBoard: BoardPosition = {};
  let expectedPossibleMoves: Square[];

  beforeEach(() => {
    emptyBoard = {};
    expectedPossibleMoves = [];
  });

  it("should return true when white king is checked", () => {
    emptyBoard.c8 = "bR";
    emptyBoard.c1 = "wK";

    const { isKingAttacked, possibleMovesAfterCheck } = isChecked(
      "w",
      emptyBoard,
    );
    expectedPossibleMoves = ["b1", "b2", "d2", "d1"];

    expect(isKingAttacked).toBe(true);
    expect(expectedPossibleMoves.sort()).toStrictEqual(
      possibleMovesAfterCheck.sort(),
    );
  });

  it("should return false when white king is not checked", () => {
    emptyBoard.b7 = "bQ";
    emptyBoard.d3 = "wK";

    const { isKingAttacked, possibleMovesAfterCheck } = isChecked(
      "w",
      emptyBoard,
    );
    expectedPossibleMoves = ["c2", "c3", "c4", "d4", "e3", "e2", "d2"];

    expect(isKingAttacked).toBe(false);
    expect(expectedPossibleMoves.sort()).toStrictEqual(
      possibleMovesAfterCheck.sort(),
    );
  });

  it("should return true when black king is checked", () => {
    emptyBoard.a8 = "bK";
    emptyBoard.b3 = "wP";
    emptyBoard.h1 = "wB";

    const { isKingAttacked, possibleMovesAfterCheck } = isChecked(
      "b",
      emptyBoard,
    );
    expectedPossibleMoves = ["b8", "a7"];

    expect(isKingAttacked).toBe(true);
    expect(expectedPossibleMoves.sort()).toStrictEqual(
      possibleMovesAfterCheck.sort(),
    );
  });

  it("should return false when black king is not checked", () => {
    emptyBoard.c5 = "bK";
    emptyBoard.d5 = "wP";
    emptyBoard.a4 = "wB";
    emptyBoard.c3 = "wN";

    const { isKingAttacked, possibleMovesAfterCheck } = isChecked(
      "b",
      emptyBoard,
    );
    expectedPossibleMoves = ["b6", "d6", "d4", "c4", "b4"];

    expect(isKingAttacked).toBe(false);
    expect(expectedPossibleMoves.sort()).toStrictEqual(
      possibleMovesAfterCheck.sort(),
    );
  });
});
