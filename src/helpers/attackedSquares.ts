import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import {
  allAttackedSquaresByPawn,
  isKingAttackedByPawn,
} from "./pawn/pawnValidation";
import {
  allAttackedSquaresByKnight,
  isKingAttackedByKnight,
} from "./knight/knightValidation";
import {
  allAttackedSquaresByBishop,
  isKingAttackedByBishop,
} from "./bishop/bishopValidation";
import {
  allAttackedSquaresByRook,
  isKingAttackedByRook,
} from "./rook/rookValidation";
import {
  allAttackedSquaresByQueen,
  isKingAttackedByQueen,
} from "./queen/queenValidation";
import { allAttackedSquaresByKing } from "./king/kingValidation";

export type AttackedSquaresItemType = {
  piece: Piece;
  source: Square;
  attackedSquaresByPiece: Square[];
}[];

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

// CHANGE: return value to { square: [{piece, square}, ...] }
export const attackedSquaresAfterCheck = (
  color: "w" | "b",
  currentBoard: BoardPosition,
) => {
  const kingPositions: Record<"w" | "b", string | undefined> = {
    w: undefined,
    b: undefined,
  };
  const allAttackedSquares: Record<string, AttackedSquaresItemType> = {};
  let attackedSquaresByPiece: Square[] = [];

  // OPTIMIZATION: move king positionts to store and update store on every king move
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
    const currentKingPosition =
      color === "w" ? kingPositions.w : kingPositions.b;

    switch (pieceWithoutColor) {
      case "P":
        attackedSquaresByPiece = isKingAttackedByPawn(
          value as Piece,
          key as Square,
          currentKingPosition as Square,
        );
        if (attackedSquaresByPiece.length) {
          allAttackedSquares[currentKingPosition as Square] = (
            allAttackedSquares[currentKingPosition as Square] ?? []
          ).concat({
            piece: value as Piece,
            source: key as Square,
            // Add source square so that check can be blocked by capturing the piece
            attackedSquaresByPiece: [...attackedSquaresByPiece, key as Square],
          });
        }
        break;
      case "N":
        attackedSquaresByPiece = isKingAttackedByKnight(
          key as Square,
          currentKingPosition as Square,
        );
        if (attackedSquaresByPiece.length) {
          allAttackedSquares[currentKingPosition as Square] = (
            allAttackedSquares[currentKingPosition as Square] ?? []
          ).concat({
            piece: value as Piece,
            source: key as Square,
            // Add source square so that check can be blocked by capturing the piece
            attackedSquaresByPiece: [...attackedSquaresByPiece, key as Square],
          });
        }
        break;
      case "B":
        attackedSquaresByPiece = isKingAttackedByBishop(
          value as Piece,
          key as Square,
          currentKingPosition as Square,
          currentBoard,
        );
        if (attackedSquaresByPiece.length) {
          allAttackedSquares[currentKingPosition as Square] = (
            allAttackedSquares[currentKingPosition as Square] ?? []
          ).concat({
            piece: value as Piece,
            source: key as Square,
            // Add source square so that check can be blocked by capturing the piece
            attackedSquaresByPiece: [...attackedSquaresByPiece, key as Square],
          });
        }
        break;
      case "R":
        attackedSquaresByPiece = isKingAttackedByRook(
          value as Piece,
          key as Square,
          currentKingPosition as Square,
          currentBoard,
        );
        if (attackedSquaresByPiece.length) {
          allAttackedSquares[currentKingPosition as Square] = (
            allAttackedSquares[currentKingPosition as Square] ?? []
          ).concat({
            piece: value as Piece,
            source: key as Square,
            // Add source square so that check can be blocked by capturing the piece
            attackedSquaresByPiece: [...attackedSquaresByPiece, key as Square],
          });
        }
        break;
      case "Q":
        attackedSquaresByPiece = isKingAttackedByQueen(
          value as Piece,
          key as Square,
          currentKingPosition as Square,
          currentBoard,
        );
        if (attackedSquaresByPiece.length) {
          allAttackedSquares[currentKingPosition as Square] = (
            allAttackedSquares[currentKingPosition as Square] ?? []
          ).concat({
            piece: value as Piece,
            source: key as Square,
            // Add source square so that check can be blocked by capturing the piece
            attackedSquaresByPiece: [...attackedSquaresByPiece, key as Square],
          });
        }
        break;
      default:
        break;
    }
  });

  return { allAttackedSquares, kingPositions };
};

export default attackedSquares;
