import { BoardPosition } from "react-chessboard/dist/chessboard/types";
import attackedSquares from "./attackedSquares";

describe("attackedSquares.ts", () => {
  let emptyBoard: BoardPosition = {};
  let expectedSquaresForWhite: Record<string, boolean> = {};
  let expectedSquaresForBlack: Record<string, boolean> = {};

  beforeEach(() => {
    emptyBoard = {};
    expectedSquaresForWhite = {};
    expectedSquaresForBlack = {};
  });

  it("should return correct squares for pawns", () => {
    emptyBoard.b7 = "bP";
    emptyBoard.d5 = "bP";
    emptyBoard.f4 = "wP";
    emptyBoard.b3 = "wP";

    const { allAttackedSquares: resultForWhite } = attackedSquares(
      "w",
      emptyBoard,
    );
    const { allAttackedSquares: resultForBlack } = attackedSquares(
      "b",
      emptyBoard,
    );

    expectedSquaresForWhite = {
      a6: true,
      c6: true,
      c4: true,
      e4: true,
    };
    expectedSquaresForBlack = {
      a4: true,
      c4: true,
      e5: true,
      g5: true,
    };

    expect(expectedSquaresForWhite).toStrictEqual(resultForWhite);
    expect(expectedSquaresForBlack).toStrictEqual(resultForBlack);
  });

  it("should return correct squares for knights", () => {
    emptyBoard.c6 = "bN";
    emptyBoard.b4 = "bP";
    emptyBoard.d3 = "wN";
    emptyBoard.f2 = "wP";

    const { allAttackedSquares: resultForWhite } = attackedSquares(
      "w",
      emptyBoard,
    );
    const { allAttackedSquares: resultForBlack } = attackedSquares(
      "b",
      emptyBoard,
    );

    expectedSquaresForWhite = {
      b4: true,
      a5: true,
      a7: true,
      d8: true,
      e7: true,
      e5: true,
      d4: true,
      a3: true,
      c3: true,
      b8: true,
    };
    expectedSquaresForBlack = {
      c1: true,
      b2: true,
      b4: true,
      c5: true,
      e5: true,
      f4: true,
      f2: true,
      e1: true,
      e3: true,
      g3: true,
    };

    expect(expectedSquaresForWhite).toStrictEqual(resultForWhite);
    expect(expectedSquaresForBlack).toStrictEqual(resultForBlack);
  });

  it("should return correct squares for bishops", () => {
    emptyBoard.c6 = "bB";
    emptyBoard.d4 = "wP";
    emptyBoard.e4 = "bP";
    emptyBoard.c3 = "wB";

    const { allAttackedSquares: resultForWhite } = attackedSquares(
      "w",
      emptyBoard,
    );
    const { allAttackedSquares: resultForBlack } = attackedSquares(
      "b",
      emptyBoard,
    );

    expectedSquaresForWhite = {
      b7: true,
      a8: true,
      d7: true,
      e8: true,
      d5: true,
      e4: true,
      b5: true,
      a4: true,
      d3: true,
      f3: true,
    };
    expectedSquaresForBlack = {
      b4: true,
      a5: true,
      d4: true,
      d2: true,
      e1: true,
      b2: true,
      a1: true,
      c5: true,
      e5: true,
    };

    expect(expectedSquaresForWhite).toStrictEqual(resultForWhite);
    expect(expectedSquaresForBlack).toStrictEqual(resultForBlack);
  });

  it("should return correct squares for rooks", () => {
    emptyBoard.f7 = "bR";
    emptyBoard.f6 = "bP";
    emptyBoard.b5 = "wP";
    emptyBoard.b2 = "wR";

    const { allAttackedSquares: resultForWhite } = attackedSquares(
      "w",
      emptyBoard,
    );
    const { allAttackedSquares: resultForBlack } = attackedSquares(
      "b",
      emptyBoard,
    );

    expectedSquaresForWhite = {
      f8: true,
      g7: true,
      h7: true,
      f6: true,
      e7: true,
      d7: true,
      c7: true,
      b7: true,
      a7: true,
      e5: true,
      g5: true,
    };
    expectedSquaresForBlack = {
      b3: true,
      b4: true,
      b5: true,
      c2: true,
      d2: true,
      e2: true,
      f2: true,
      g2: true,
      h2: true,
      b1: true,
      a2: true,
      a6: true,
      c6: true,
    };

    expect(expectedSquaresForWhite).toStrictEqual(resultForWhite);
    expect(expectedSquaresForBlack).toStrictEqual(resultForBlack);
  });

  it("should return correct squares for queens", () => {
    emptyBoard.f6 = "bQ";
    emptyBoard.b4 = "wQ";
    emptyBoard.d4 = "wP";
    emptyBoard.f4 = "bP";

    const { allAttackedSquares: resultForWhite } = attackedSquares(
      "w",
      emptyBoard,
    );
    const { allAttackedSquares: resultForBlack } = attackedSquares(
      "b",
      emptyBoard,
    );

    expectedSquaresForWhite = {
      f7: true,
      f8: true,
      g7: true,
      h8: true,
      g6: true,
      h6: true,
      g5: true,
      h4: true,
      f5: true,
      f4: true,
      e5: true,
      d4: true,
      e6: true,
      d6: true,
      c6: true,
      b6: true,
      a6: true,
      e7: true,
      d8: true,
      e3: true,
      g3: true,
    };
    expectedSquaresForBlack = {
      b5: true,
      b6: true,
      b7: true,
      b8: true,
      c5: true,
      d6: true,
      e7: true,
      f8: true,
      c4: true,
      d4: true,
      b3: true,
      b2: true,
      b1: true,
      a3: true,
      a4: true,
      a5: true,
      e5: true,
      c3: true,
      d2: true,
      e1: true,
    };

    expect(expectedSquaresForWhite).toStrictEqual(resultForWhite);
    expect(expectedSquaresForBlack).toStrictEqual(resultForBlack);
  });

  it("should return correct squares for kings", () => {
    emptyBoard.a3 = "bP";
    emptyBoard.b4 = "wK";
    emptyBoard.c4 = "wP";
    emptyBoard.e4 = "bP";
    emptyBoard.f3 = "bK";
    emptyBoard.g3 = "wP";

    const { allAttackedSquares: resultForWhite } = attackedSquares(
      "w",
      emptyBoard,
    );
    const { allAttackedSquares: resultForBlack } = attackedSquares(
      "b",
      emptyBoard,
    );

    expectedSquaresForWhite = {
      e2: true,
      e3: true,
      e4: true,
      f4: true,
      g4: true,
      g3: true,
      g2: true,
      f2: true,
      b2: true,
      d3: true,
      f3: true,
    };
    expectedSquaresForBlack = {
      a3: true,
      a4: true,
      a5: true,
      b5: true,
      c5: true,
      c4: true,
      c3: true,
      b3: true,
      d5: true,
      f4: true,
      h4: true,
    };

    expect(expectedSquaresForWhite).toStrictEqual(resultForWhite);
    expect(expectedSquaresForBlack).toStrictEqual(resultForBlack);
  });
});
