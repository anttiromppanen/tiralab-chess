import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";

export const horizontalBoard = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const isPieceWhite = (piece: Piece) => piece[0] === "w";

export const arePiecesDifferentColor = (
  piece: Piece,
  target: Square,
  currentBoard: BoardPosition,
) => piece[0] !== currentBoard[target]?.[0];
