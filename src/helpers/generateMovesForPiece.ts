import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { horizontalBoard } from "../const/common";
import { arePiecesDifferentColor } from "./common";

export const generateMovesLeftTop = (
  piece: Piece,
  currentBoard: BoardPosition,
  columnIndex: number,
  rowIndex: number,
  maxRows: number,
  validMoves: Square[],
) => {
  for (let i = 1; columnIndex - i >= 0 && rowIndex + i <= maxRows; i += 1) {
    const squareToAdd = `${horizontalBoard[columnIndex - i]}${
      rowIndex + i
    }` as Square;

    if (currentBoard[squareToAdd]) {
      // if piece is opposite color, add to array
      if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
        validMoves.push(squareToAdd);
      break;
    }
    validMoves.push(squareToAdd);
  }
};

export const generateMovesRightTop = (
  piece: Piece,
  currentBoard: BoardPosition,
  columnIndex: number,
  rowIndex: number,
  maxRows: number,
  maxColumns: number,
  validMoves: Square[],
) => {
  for (
    let i = 1;
    columnIndex + i <= maxColumns && rowIndex + i <= maxRows;
    i += 1
  ) {
    const squareToAdd = `${horizontalBoard[columnIndex + i]}${
      rowIndex + i
    }` as Square;

    if (currentBoard[squareToAdd]) {
      // if piece is opposite color, add to array
      if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
        validMoves.push(squareToAdd);
      break;
    }
    validMoves.push(squareToAdd);
  }
};

export const generateMovesLeftBottom = (
  piece: Piece,
  currentBoard: BoardPosition,
  columnIndex: number,
  rowIndex: number,
  validMoves: Square[],
) => {
  for (let i = 1; columnIndex - i >= 0 && rowIndex - i >= 1; i += 1) {
    const squareToAdd = `${horizontalBoard[columnIndex - i]}${
      rowIndex - i
    }` as Square;

    if (currentBoard[squareToAdd]) {
      // if piece is opposite color, add to array
      if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
        validMoves.push(squareToAdd);
      break;
    }
    validMoves.push(squareToAdd);
  }
};

export const generateMovesRightBottom = (
  piece: Piece,
  currentBoard: BoardPosition,
  columnIndex: number,
  rowIndex: number,
  maxColumns: number,
  validMoves: Square[],
) => {
  for (let i = 1; columnIndex + i <= maxColumns && rowIndex - i >= 1; i += 1) {
    const squareToAdd = `${horizontalBoard[columnIndex + i]}${
      rowIndex - i
    }` as Square;

    if (currentBoard[squareToAdd]) {
      // if piece is opposite color, add to array
      if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
        validMoves.push(squareToAdd);
      break;
    }
    validMoves.push(squareToAdd);
  }
};

export const generateMovesUpwards = (
  piece: Piece,
  sourceColumnLetter: string,
  sourceRowNumber: number,
  maxRows: number,
  validMoves: Square[],
  currentBoard: BoardPosition,
) => {
  for (let i = sourceRowNumber + 1; i <= maxRows; i += 1) {
    const squareToAdd = `${sourceColumnLetter}${i}` as Square;
    if (currentBoard[squareToAdd]) {
      if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
        validMoves.push(squareToAdd);
      break;
    }
    validMoves.push(squareToAdd);
  }
};

export const generateMovesDownwards = (
  piece: Piece,
  sourceColumnLetter: string,
  sourceRowNumber: number,
  validMoves: Square[],
  currentBoard: BoardPosition,
) => {
  for (let i = sourceRowNumber - 1; i >= 1; i -= 1) {
    const squareToAdd = `${sourceColumnLetter}${i}` as Square;
    if (currentBoard[squareToAdd]) {
      if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
        validMoves.push(squareToAdd);
      break;
    }
    validMoves.push(squareToAdd);
  }
};

export const generateMovesLeft = (
  piece: Piece,
  sourceColumnLetterIndex: number,
  sourceRowNumber: number,
  validMoves: Square[],
  currentBoard: BoardPosition,
) => {
  for (let i = sourceColumnLetterIndex - 1; i >= 0; i -= 1) {
    const squareToAdd = `${horizontalBoard[i]}${sourceRowNumber}` as Square;
    if (currentBoard[squareToAdd]) {
      if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
        validMoves.push(squareToAdd);
      break;
    }
    validMoves.push(squareToAdd);
  }
};

export const generateMovesRight = (
  piece: Piece,
  sourceColumnLetterIndex: number,
  sourceRowNumber: number,
  maxColumns: number,
  validMoves: Square[],
  currentBoard: BoardPosition,
) => {
  for (let i = sourceColumnLetterIndex + 1; i <= maxColumns; i += 1) {
    const squareToAdd = `${horizontalBoard[i]}${sourceRowNumber}` as Square;
    if (currentBoard[squareToAdd]) {
      if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
        validMoves.push(squareToAdd);
      break;
    }
    validMoves.push(squareToAdd);
  }
};

export const generateMovesVertically = (
  piece: Piece,
  sourceColumnLetter: string,
  sourceRowNumber: number,
  maxRows: number,
  validMoves: Square[],
  currentBoard: BoardPosition,
) => {
  generateMovesUpwards(
    piece,
    sourceColumnLetter,
    sourceRowNumber,
    maxRows,
    validMoves,
    currentBoard,
  );
  generateMovesDownwards(
    piece,
    sourceColumnLetter,
    sourceRowNumber,
    validMoves,
    currentBoard,
  );
};

export const generateMovesHorizontally = (
  piece: Piece,
  sourceColumnLetterIndex: number,
  sourceRowNumber: number,
  maxColumns: number,
  validMoves: Square[],
  currentBoard: BoardPosition,
) => {
  generateMovesLeft(
    piece,
    sourceColumnLetterIndex,
    sourceRowNumber,
    validMoves,
    currentBoard,
  );
  generateMovesRight(
    piece,
    sourceColumnLetterIndex,
    sourceRowNumber,
    maxColumns,
    validMoves,
    currentBoard,
  );
};

export const generateMovesDiagonally = (
  piece: Piece,
  currentBoard: BoardPosition,
  columnIndex: number,
  rowIndex: number,
  maxRows: number,
  maxColumns: number,
  validMoves: Square[],
) => {
  generateMovesLeftTop(
    piece,
    currentBoard,
    columnIndex,
    rowIndex,
    maxRows,
    validMoves,
  );
  generateMovesRightBottom(
    piece,
    currentBoard,
    columnIndex,
    rowIndex,
    maxColumns,
    validMoves,
  );
  generateMovesRightTop(
    piece,
    currentBoard,
    columnIndex,
    rowIndex,
    maxRows,
    maxColumns,
    validMoves,
  );
  generateMovesLeftBottom(
    piece,
    currentBoard,
    columnIndex,
    rowIndex,
    validMoves,
  );
};
