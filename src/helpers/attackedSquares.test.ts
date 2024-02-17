import { BoardPosition } from "react-chessboard/dist/chessboard/types";
import {
  AttackedSquaresItemType,
  attackedSquaresAfterCheck,
} from "./attackedSquares";

describe("attackedSquaresAfterCheck.ts", () => {
  let emptyBoard: BoardPosition = {};
  let expectedSquaresForWhite: AttackedSquaresItemType = [];
  let expectedSquaresForBlack: AttackedSquaresItemType = [];

  beforeEach(() => {
    emptyBoard = {};
    expectedSquaresForWhite = [];
    expectedSquaresForBlack = [];
  });

  it("should return correct squares for pawns", () => {
    emptyBoard.b7 = "bP";
    emptyBoard.a6 = "wK";
    emptyBoard.g5 = "bK";
    emptyBoard.f4 = "wP";

    const { allAttackedSquares: resultForWhite } = attackedSquaresAfterCheck(
      "w",
      emptyBoard,
    );
    const { allAttackedSquares: resultForBlack } = attackedSquaresAfterCheck(
      "b",
      emptyBoard,
    );

    expectedSquaresForWhite = [
      { piece: "bP", source: "b7", attackedSquaresByPiece: ["a6", "b7"] },
    ];
    expectedSquaresForBlack = [
      { piece: "wP", source: "f4", attackedSquaresByPiece: ["g5", "f4"] },
    ];

    expect(expectedSquaresForWhite).toStrictEqual(resultForWhite.a6);
    expect(expectedSquaresForBlack).toStrictEqual(resultForBlack.g5);
  });

  it("should return correct squares for knights", () => {
    emptyBoard.d8 = "wK";
    emptyBoard.c6 = "bN";
    emptyBoard.e2 = "wN";
    emptyBoard.g1 = "bK";

    const { allAttackedSquares: resultForWhite } = attackedSquaresAfterCheck(
      "w",
      emptyBoard,
    );
    const { allAttackedSquares: resultForBlack } = attackedSquaresAfterCheck(
      "b",
      emptyBoard,
    );

    expectedSquaresForWhite = [
      { piece: "bN", source: "c6", attackedSquaresByPiece: ["d8", "c6"] },
    ];
    expectedSquaresForBlack = [
      { piece: "wN", source: "e2", attackedSquaresByPiece: ["g1", "e2"] },
    ];

    expect(expectedSquaresForWhite).toStrictEqual(resultForWhite.d8);
    expect(expectedSquaresForBlack).toStrictEqual(resultForBlack.g1);
  });

  it("should return correct squares for bishops", () => {
    emptyBoard.c6 = "bB";
    emptyBoard.a5 = "bK";
    emptyBoard.e1 = "wB";
    emptyBoard.h1 = "wK";

    const { allAttackedSquares: resultForWhite } = attackedSquaresAfterCheck(
      "w",
      emptyBoard,
    );
    const { allAttackedSquares: resultForBlack } = attackedSquaresAfterCheck(
      "b",
      emptyBoard,
    );

    expectedSquaresForWhite = [
      {
        piece: "bB",
        source: "c6",
        attackedSquaresByPiece: ["d5", "e4", "f3", "g2", "h1", "c6"],
      },
    ];
    expectedSquaresForBlack = [
      {
        piece: "wB",
        source: "e1",
        attackedSquaresByPiece: ["e1", "d2", "c3", "b4", "a5"],
      },
    ];

    resultForWhite.h1[0].attackedSquaresByPiece.sort();
    resultForBlack.a5[0].attackedSquaresByPiece.sort();
    expectedSquaresForWhite[0].attackedSquaresByPiece.sort();
    expectedSquaresForBlack[0].attackedSquaresByPiece.sort();

    expect(expectedSquaresForWhite).toStrictEqual(resultForWhite.h1);
    expect(expectedSquaresForBlack).toStrictEqual(resultForBlack.a5);
  });

  it("should return correct squares for rooks", () => {
    emptyBoard.b8 = "bK";
    emptyBoard.a7 = "wK";
    emptyBoard.f7 = "bR";
    emptyBoard.b2 = "wR";

    const { allAttackedSquares: resultForWhite } = attackedSquaresAfterCheck(
      "w",
      emptyBoard,
    );
    const { allAttackedSquares: resultForBlack } = attackedSquaresAfterCheck(
      "b",
      emptyBoard,
    );

    expectedSquaresForWhite = [
      {
        piece: "bR",
        source: "f7",
        attackedSquaresByPiece: ["e7", "f7", "d7", "c7", "b7", "a7"],
      },
    ];
    expectedSquaresForBlack = [
      {
        piece: "wR",
        source: "b2",
        attackedSquaresByPiece: ["b2", "b3", "b4", "b5", "b6", "b7", "b8"],
      },
    ];

    resultForWhite.a7[0].attackedSquaresByPiece.sort();
    resultForBlack.b8[0].attackedSquaresByPiece.sort();
    expectedSquaresForWhite[0].attackedSquaresByPiece.sort();
    expectedSquaresForBlack[0].attackedSquaresByPiece.sort();

    expect(expectedSquaresForWhite).toStrictEqual(resultForWhite.a7);
    expect(expectedSquaresForBlack).toStrictEqual(resultForBlack.b8);
  });

  it("should return correct squares for queens", () => {
    emptyBoard.e7 = "bK";
    emptyBoard.f6 = "bQ";
    emptyBoard.b4 = "wQ";
    emptyBoard.h4 = "wK";

    const { allAttackedSquares: resultForWhite } = attackedSquaresAfterCheck(
      "w",
      emptyBoard,
    );
    const { allAttackedSquares: resultForBlack } = attackedSquaresAfterCheck(
      "b",
      emptyBoard,
    );

    expectedSquaresForWhite = [
      {
        piece: "bQ",
        source: "f6",
        attackedSquaresByPiece: ["g5", "f6", "h4"],
      },
    ];
    expectedSquaresForBlack = [
      {
        piece: "wQ",
        source: "b4",
        attackedSquaresByPiece: ["c5", "d6", "b4", "e7"],
      },
    ];

    resultForWhite.h4[0].attackedSquaresByPiece.sort();
    resultForBlack.e7[0].attackedSquaresByPiece.sort();
    expectedSquaresForWhite[0].attackedSquaresByPiece.sort();
    expectedSquaresForBlack[0].attackedSquaresByPiece.sort();

    expect(expectedSquaresForWhite).toStrictEqual(resultForWhite.h4);
    expect(expectedSquaresForBlack).toStrictEqual(resultForBlack.e7);
  });
});
