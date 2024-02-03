import {
  BoardPosition,
  Piece,
  // Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { horizontalBoard } from "../../const/common";
import { arePiecesDifferentColor } from "../common";

export const generateMovesUpwards = (
  piece: Piece,
  sourceColumnLetter: string,
  sourceRowNumber: number,
  maxRows: number,
  validRookMoves: Square[],
  currentBoard: BoardPosition,
) => {
  for (let i = sourceRowNumber + 1; i <= maxRows; i += 1) {
    const squareToAdd = `${sourceColumnLetter}${i}` as Square;
    if (currentBoard[squareToAdd]) {
      if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
        validRookMoves.push(squareToAdd);
      break;
    }
    validRookMoves.push(squareToAdd);
  }
};

export const generateMovesDownwards = (
  sourceColumnLetter: string,
  sourceRowNumber: number,
  validRookMoves: Square[],
) => {
  for (let i = sourceRowNumber - 1; i >= 1; i -= 1) {
    const squareToAdd = `${sourceColumnLetter}${i}` as Square;
    validRookMoves.push(squareToAdd);
  }
};

export const generateMovesLeft = (
  sourceColumnLetterIndex: number,
  sourceRowNumber: number,
  validRookMoves: Square[],
) => {
  for (let i = sourceColumnLetterIndex - 1; i >= 0; i -= 1) {
    const squareToAdd = `${horizontalBoard[i]}${sourceRowNumber}` as Square;
    validRookMoves.push(squareToAdd);
  }
};

export const generateMovesRight = (
  sourceColumnLetterIndex: number,
  sourceRowNumber: number,
  maxColumns: number,
  validRookMoves: Square[],
) => {
  for (let i = sourceColumnLetterIndex + 1; i <= maxColumns; i += 1) {
    const squareToAdd = `${horizontalBoard[i]}${sourceRowNumber}` as Square;
    validRookMoves.push(squareToAdd);
  }
};

export const validRookMovesFromSquare = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
) => {
  const validRookMoves: Square[] = [];
  const currentColumnLetter = source[0];
  const currentColumnLetterIndex = horizontalBoard.indexOf(currentColumnLetter);
  const currentRowNumber = Number(source[1]);
  const maxColumns = 7;
  const maxRows = 8;

  generateMovesUpwards(
    piece,
    currentColumnLetter,
    currentRowNumber,
    maxRows,
    validRookMoves,
    currentBoard,
  );

  generateMovesRight(
    currentColumnLetterIndex,
    currentRowNumber,
    maxColumns,
    validRookMoves,
  );

  generateMovesDownwards(currentColumnLetter, currentRowNumber, validRookMoves);
  generateMovesLeft(currentColumnLetterIndex, currentRowNumber, validRookMoves);

  return validRookMoves;
};

const validRookMove = () => {};

export default validRookMove;
