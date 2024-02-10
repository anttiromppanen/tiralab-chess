import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { allAttackedSquaresByPawn } from "./pawn/pawnValidation";
import { allAttackedSquaresByKnight } from "./knight/knightValidation";
import { allAttackedSquaresByBishop } from "./bishop/bishopValidation";
import { allAttackedSquaresByRook } from "./rook/rookValidation";
import { allAttackedSquaresByQueen } from "./queen/queenValidation";
import { allAttackedSquaresByKing } from "./king/kingValidation";

const attackedSquares = (color: "w" | "b", currentBoard: BoardPosition) => {
  const kingPositions: Record<"w" | "b", string | undefined> = {
    w: undefined,
    b: undefined,
  };
  let allAttackedSquares: Record<string, boolean> = {};

  // finds king positions and filters results by color
  const piecesByColor = Object.entries(currentBoard).filter(
    ([square, piece]) => {
      if (piece && piece.length === 2) {
        // Check if piece is not undefined and has a length of 2
        const [pieceColor, pieceValue] = piece;
        if (pieceValue === "K") {
          if (pieceColor === "w") kingPositions.w = square;
          else kingPositions.b = square;
        }
        return pieceColor !== color;
      }
      return false;
    },
  );

  piecesByColor.forEach(([key, value]) => {
    const pieceWithoutColor = value[1];
    switch (pieceWithoutColor) {
      case "P":
        allAttackedSquares = allAttackedSquaresByPawn(
          value as Piece,
          key as Square,
          allAttackedSquares,
        );
        break;
      case "N":
        allAttackedSquares = allAttackedSquaresByKnight(
          key as Square,
          allAttackedSquares,
        );
        break;
      case "B":
        allAttackedSquares = allAttackedSquaresByBishop(
          value as Piece,
          key as Square,
          currentBoard,
          allAttackedSquares,
        );
        break;
      case "R":
        allAttackedSquares = allAttackedSquaresByRook(
          value as Piece,
          key as Square,
          currentBoard,
          allAttackedSquares,
        );
        break;
      case "Q":
        allAttackedSquares = allAttackedSquaresByQueen(
          value as Piece,
          key as Square,
          currentBoard,
          allAttackedSquares,
        );
        break;
      case "K":
        allAttackedSquares = allAttackedSquaresByKing(
          value as Piece,
          key as Square,
          currentBoard,
          allAttackedSquares,
        );
        break;
      default:
        break;
    }
  });

  return { allAttackedSquares, kingPositions };
};

export default attackedSquares;
