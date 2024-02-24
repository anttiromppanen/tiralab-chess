import { BoardPosition, Square } from "react-chessboard/dist/chessboard/types";
import generateAllMovesFromPosition, {
  MoveInfo,
} from "./generateAllMovesFromPosition";

describe("generateAllMovesFromPosition.ts", () => {
  let emptyBoard: BoardPosition = {};
  let whiteShouldIncludeSquares: Square[] = [];
  let blackShouldIncludeSquares: Square[] = [];

  beforeEach(() => {
    emptyBoard = {};
    whiteShouldIncludeSquares = [];
  });

  it.only("should return correct squares for pawn", () => {
    emptyBoard.h6 = "bP";
    emptyBoard.h5 = "wP";

    const whitePawn = generateAllMovesFromPosition(emptyBoard).filter(
      (item: MoveInfo) => item.square === "h5",
    );
    const blackPawn = generateAllMovesFromPosition(emptyBoard).filter(
      (item) => item.square === "h6",
    );
    whiteShouldIncludeSquares = [];
    blackShouldIncludeSquares = [];

    expect(whitePawn).toStrictEqual(whiteShouldIncludeSquares);
    expect(blackPawn).toStrictEqual(blackShouldIncludeSquares);
  });

  it("should return correct squares for knight", () => {
    emptyBoard.d6 = "bR";
    emptyBoard.a5 = "bP";
    emptyBoard.e5 = "wR";
    emptyBoard.g5 = "bB";
    emptyBoard.c4 = "wN";
    emptyBoard.f3 = "bN";
    emptyBoard.b2 = "bQ";
    emptyBoard.d2 = "wP";
    emptyBoard.g1 = "wQ";

    const whiteKnight = generateAllMovesFromPosition(emptyBoard).filter(
      (item: MoveInfo) => item.square === "c4",
    );
    const blackKnight = generateAllMovesFromPosition(emptyBoard).filter(
      (item) => item.square === "f3",
    );
    whiteShouldIncludeSquares = ["a3", "a5", "b6", "d6", "b2", "e3"];
    blackShouldIncludeSquares = ["d2", "d4", "e5", "h4", "h2", "g1", "e1"];

    expect(whiteShouldIncludeSquares.sort()).toStrictEqual(
      whiteKnight[0].moves.sort(),
    );
    expect(blackShouldIncludeSquares.sort()).toStrictEqual(
      blackKnight[0].moves.sort(),
    );
  });

  it("should return correct squares for bishop", () => {
    emptyBoard.d7 = "bR";
    emptyBoard.e6 = "bB";
    emptyBoard.a5 = "bN";
    emptyBoard.g4 = "wP";
    emptyBoard.c3 = "wB";
    emptyBoard.b2 = "wK";
    emptyBoard.e1 = "bP";

    const whiteBishop = generateAllMovesFromPosition(emptyBoard).filter(
      (item: MoveInfo) => item.square === "c3",
    );
    const blackBishop = generateAllMovesFromPosition(emptyBoard).filter(
      (item) => item.square === "e6",
    );
    whiteShouldIncludeSquares = [
      "b4",
      "a5",
      "d4",
      "e5",
      "f6",
      "g7",
      "h8",
      "d2",
      "e1",
    ];
    blackShouldIncludeSquares = [
      "d5",
      "c4",
      "b3",
      "a2",
      "f7",
      "g8",
      "g4",
      "f5",
    ];

    expect(whiteShouldIncludeSquares.sort()).toStrictEqual(
      whiteBishop[0].moves.sort(),
    );
    expect(blackShouldIncludeSquares.sort()).toStrictEqual(
      blackBishop[0].moves.sort(),
    );
  });

  it("should return correct squares for rook", () => {
    emptyBoard.a6 = "bR";
    emptyBoard.c6 = "bB";
    emptyBoard.f6 = "bP";
    emptyBoard.e4 = "wN";
    emptyBoard.f4 = "wR";
    emptyBoard.a3 = "wQ";

    const whiteRook = generateAllMovesFromPosition(emptyBoard).filter(
      (item: MoveInfo) => item.square === "f4",
    );
    const blackRook = generateAllMovesFromPosition(emptyBoard).filter(
      (item) => item.square === "a6",
    );
    whiteShouldIncludeSquares = ["f5", "f6", "g4", "h4", "f3", "f2", "f1"];
    blackShouldIncludeSquares = ["a5", "a4", "a3", "a7", "a8", "b6"];

    expect(whiteShouldIncludeSquares.sort()).toStrictEqual(
      whiteRook[0].moves.sort(),
    );
    expect(blackShouldIncludeSquares.sort()).toStrictEqual(
      blackRook[0].moves.sort(),
    );
  });

  it("should return correct squares for queen", () => {
    emptyBoard.b6 = "wP";
    emptyBoard.d6 = "bQ";
    emptyBoard.g6 = "bP";
    emptyBoard.d5 = "bB";
    emptyBoard.b4 = "wK";
    emptyBoard.f4 = "bR";
    emptyBoard.d2 = "bR";
    emptyBoard.g2 = "wQ";
    emptyBoard.h2 = "wR";

    const whiteQueen = generateAllMovesFromPosition(emptyBoard).filter(
      (item: MoveInfo) => item.square === "g2",
    );
    const blackQueen = generateAllMovesFromPosition(emptyBoard).filter(
      (item) => item.square === "d6",
    );

    whiteShouldIncludeSquares = [
      "f2",
      "e2",
      "d2",
      "g3",
      "g4",
      "g5",
      "g6",
      "g1",
      "f3",
      "e4",
      "d5",
      "h3",
      "f1",
      "h1",
    ];
    blackShouldIncludeSquares = [
      "c6",
      "b6",
      "d7",
      "d8",
      "e6",
      "f6",
      "c5",
      "b4",
      "c7",
      "b8",
      "e7",
      "f8",
      "e5",
    ];

    expect(whiteShouldIncludeSquares.sort()).toStrictEqual(
      whiteQueen[0].moves.sort(),
    );
    expect(blackShouldIncludeSquares.sort()).toStrictEqual(
      blackQueen[0].moves.sort(),
    );
  });

  it("should return correct squares for king", () => {
    emptyBoard.d8 = "bR";
    emptyBoard.d7 = "bK";
    emptyBoard.e6 = "wN";
    emptyBoard.a4 = "bQ";
    emptyBoard.b3 = "wK";
    emptyBoard.c3 = "wN";
    emptyBoard.c2 = "wB";

    const whiteKing = generateAllMovesFromPosition(emptyBoard).filter(
      (item: MoveInfo) => item.square === "b3",
    );
    const blackKing = generateAllMovesFromPosition(emptyBoard).filter(
      (item) => item.square === "d7",
    );
    whiteShouldIncludeSquares = ["a2", "a3", "a4", "b4", "c4", "b2"];
    blackShouldIncludeSquares = ["c6", "c7", "c8", "e8", "e7", "e6", "d6"];

    expect(whiteShouldIncludeSquares.sort()).toStrictEqual(
      whiteKing[0].moves.sort(),
    );
    expect(blackShouldIncludeSquares.sort()).toStrictEqual(
      blackKing[0].moves.sort(),
    );
  });
});
