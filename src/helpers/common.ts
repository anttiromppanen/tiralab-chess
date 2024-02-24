import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { horizontalBoardByLetter } from "../const/common";

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

export const isValidSquare = (columnLetterIndex: number, rowNumber: number) =>
  columnLetterIndex >= 0 &&
  columnLetterIndex <= 7 &&
  rowNumber >= 1 &&
  rowNumber <= 8;

export const getRowAndColumnFromSquare = (square: Square) => {
  const currentColumnLetter = square && square[0];
  const currentColumnLetterIndex = horizontalBoardByLetter[currentColumnLetter];
  const currentRowNumber = square && Number(square[1]);

  return { currentColumnLetter, currentColumnLetterIndex, currentRowNumber };
};

export const isFirstMoveForPawn = (piece: Piece, square: Square) => {
  const pieceType = piece[1];
  const rowNumber = square[1];

  if (isPieceWhite(piece)) return pieceType === "P" && rowNumber === "2";
  return pieceType === "P" && rowNumber === "7";
};
