import { Square } from "react-chessboard/dist/chessboard/types";
import {
  blackPieceValues,
  horizontalBoard,
  initialBoardPosition,
  whitePieceValues,
} from "../const/common";
import { arePiecesDifferentColor, isPieceWhite } from "./common";

describe("helpers/common.ts", () => {
  let board = { ...initialBoardPosition };

  beforeEach(() => {
    board = { ...initialBoardPosition };
  });

  describe("horizontalBoard", () => {
    it("should return correct elements", () => {
      const horizontalBoardTestVersion = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
      ];
      const horizontalBoardActualVersion = [...horizontalBoard];

      expect(horizontalBoardTestVersion.sort()).toEqual(
        horizontalBoardActualVersion.sort(),
      );
      expect(horizontalBoardTestVersion).toHaveLength(
        horizontalBoardActualVersion.length,
      );
    });
  });

  describe("isPieceWhite", () => {
    it("should return true for all white pieces", () => {
      const whitePieces = whitePieceValues;
      whitePieces.forEach((x) => expect(isPieceWhite(x)).toBe(true));
    });

    it("should return false for all white pieces", () => {
      const blackPieces = blackPieceValues;
      blackPieces.forEach((x) => expect(isPieceWhite(x)).toBe(false));
    });
  });

  describe("arePiecesDifferentColor", () => {
    it("should return true for undefined", () => {
      board.c4 = undefined;
      const result = arePiecesDifferentColor("wN", "c4", board);
      expect(result).toBe(true);
    });

    it("should return true for white capture black values", () => {
      const whitePieces = whitePieceValues;
      const blackTestSquares = ["a4", "b4", "c4", "d4", "e4", "f4"];
      board.a4 = "bP";
      board.b4 = "bN";
      board.c4 = "bB";
      board.d4 = "bR";
      board.e4 = "bQ";
      board.f4 = "bK";

      whitePieces.forEach((x) => {
        blackTestSquares.forEach((y) => {
          const result = arePiecesDifferentColor(x, y as Square, board);
          expect(result).toBe(true);
        });
      });
    });

    it("should return true for black capture white values", () => {
      const blackPieces = blackPieceValues;
      const whiteTestSquares = ["a4", "b4", "c4", "d4", "e4", "f4"];
      board.a4 = "wP";
      board.b4 = "wN";
      board.c4 = "wB";
      board.d4 = "wR";
      board.e4 = "wQ";
      board.f4 = "wK";

      blackPieces.forEach((x) => {
        whiteTestSquares.forEach((y) => {
          const result = arePiecesDifferentColor(x, y as Square, board);
          expect(result).toBe(true);
        });
      });
    });

    it("should return false for white capture white values", () => {
      const whitePieces = whitePieceValues;
      const whiteTestSquares = ["a4", "b4", "c4", "d4", "e4", "f4"];
      board.a4 = "wP";
      board.b4 = "wN";
      board.c4 = "wB";
      board.d4 = "wR";
      board.e4 = "wQ";
      board.f4 = "wK";

      whitePieces.forEach((x) => {
        whiteTestSquares.forEach((y) => {
          const result = arePiecesDifferentColor(x, y as Square, board);
          expect(result).toBe(false);
        });
      });
    });

    it("should return false for black capture black values", () => {
      const blackPieces = blackPieceValues;
      const blackTestSquares = ["a4", "b4", "c4", "d4", "e4", "f4"];
      board.a4 = "bP";
      board.b4 = "bN";
      board.c4 = "bB";
      board.d4 = "bR";
      board.e4 = "bQ";
      board.f4 = "bK";

      blackPieces.forEach((x) => {
        blackTestSquares.forEach((y) => {
          const result = arePiecesDifferentColor(x, y as Square, board);
          expect(result).toBe(false);
        });
      });
    });
  });
});
