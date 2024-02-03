import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";

export const isPieceWhite = (piece: Piece) => piece[0] === "w";

export const arePiecesDifferentColor = (
  piece: Piece,
  target: Square,
  currentBoard: BoardPosition,
) => piece[0] !== currentBoard[target]?.[0];

export const arraysAreEqual = <T>(arr1: Array<T>, arr2: Array<T>) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value) => arr2.includes(value));
};
