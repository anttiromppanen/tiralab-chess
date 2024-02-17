import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { horizontalBoardByIndex } from "../const/common";
import { arePiecesDifferentColor } from "./common";

export const generateMovesLeftTop = (
  piece: Piece,
  currentBoard: BoardPosition,
  columnIndex: number,
  rowIndex: number,
  maxRows: number,
  validMoves: Square[],
  includeBlockedSquares: boolean = false,
) => {
  for (let i = 1; columnIndex - i >= 0 && rowIndex + i <= maxRows; i += 1) {
    const squareToAdd = `${horizontalBoardByIndex[columnIndex - i]}${
      rowIndex + i
    }` as Square;

    if (currentBoard[squareToAdd]) {
      if (
        includeBlockedSquares &&
        !arePiecesDifferentColor(piece, squareToAdd, currentBoard)
      )
        validMoves.push(squareToAdd);
      // if piece is opposite color, add to array
      else if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
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
  includeBlockedSquares: boolean = false,
) => {
  for (
    let i = 1;
    columnIndex + i <= maxColumns && rowIndex + i <= maxRows;
    i += 1
  ) {
    const squareToAdd = `${horizontalBoardByIndex[columnIndex + i]}${
      rowIndex + i
    }` as Square;

    if (currentBoard[squareToAdd]) {
      if (
        includeBlockedSquares &&
        !arePiecesDifferentColor(piece, squareToAdd, currentBoard)
      )
        validMoves.push(squareToAdd);
      // if piece is opposite color, add to array
      else if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
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
  includeBlockedSquares: boolean = false,
) => {
  for (let i = 1; columnIndex - i >= 0 && rowIndex - i >= 1; i += 1) {
    const squareToAdd = `${horizontalBoardByIndex[columnIndex - i]}${
      rowIndex - i
    }` as Square;

    if (currentBoard[squareToAdd]) {
      if (
        includeBlockedSquares &&
        !arePiecesDifferentColor(piece, squareToAdd, currentBoard)
      )
        validMoves.push(squareToAdd);
      // if piece is opposite color, add to array
      else if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
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
  includeBlockedSquares: boolean = false,
) => {
  for (let i = 1; columnIndex + i <= maxColumns && rowIndex - i >= 1; i += 1) {
    const squareToAdd = `${horizontalBoardByIndex[columnIndex + i]}${
      rowIndex - i
    }` as Square;

    if (currentBoard[squareToAdd]) {
      if (
        includeBlockedSquares &&
        !arePiecesDifferentColor(piece, squareToAdd, currentBoard)
      )
        validMoves.push(squareToAdd);
      // if piece is opposite color, add to array
      else if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
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
  includeBlockedSquares: boolean = false,
) => {
  for (let i = sourceRowNumber + 1; i <= maxRows; i += 1) {
    const squareToAdd = `${sourceColumnLetter}${i}` as Square;
    if (currentBoard[squareToAdd]) {
      if (
        includeBlockedSquares &&
        !arePiecesDifferentColor(piece, squareToAdd, currentBoard)
      )
        validMoves.push(squareToAdd);
      else if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
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
  includeBlockedSquares: boolean = false,
) => {
  for (let i = sourceRowNumber - 1; i >= 1; i -= 1) {
    const squareToAdd = `${sourceColumnLetter}${i}` as Square;
    if (currentBoard[squareToAdd]) {
      if (
        includeBlockedSquares &&
        !arePiecesDifferentColor(piece, squareToAdd, currentBoard)
      )
        validMoves.push(squareToAdd);
      else if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
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
  includeBlockedSquares: boolean = false,
) => {
  for (let i = sourceColumnLetterIndex - 1; i >= 0; i -= 1) {
    const squareToAdd =
      `${horizontalBoardByIndex[i]}${sourceRowNumber}` as Square;
    if (currentBoard[squareToAdd]) {
      if (
        includeBlockedSquares &&
        !arePiecesDifferentColor(piece, squareToAdd, currentBoard)
      )
        validMoves.push(squareToAdd);
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
  includeBlockedSquares: boolean = false,
) => {
  for (let i = sourceColumnLetterIndex + 1; i <= maxColumns; i += 1) {
    const squareToAdd =
      `${horizontalBoardByIndex[i]}${sourceRowNumber}` as Square;
    if (currentBoard[squareToAdd]) {
      if (
        includeBlockedSquares &&
        !arePiecesDifferentColor(piece, squareToAdd, currentBoard)
      )
        validMoves.push(squareToAdd);
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
  includeBlockedSquares: boolean = false,
) => {
  generateMovesUpwards(
    piece,
    sourceColumnLetter,
    sourceRowNumber,
    maxRows,
    validMoves,
    currentBoard,
    includeBlockedSquares,
  );
  generateMovesDownwards(
    piece,
    sourceColumnLetter,
    sourceRowNumber,
    validMoves,
    currentBoard,
    includeBlockedSquares,
  );
};

export const generateMovesHorizontally = (
  piece: Piece,
  sourceColumnLetterIndex: number,
  sourceRowNumber: number,
  maxColumns: number,
  validMoves: Square[],
  currentBoard: BoardPosition,
  includeBlockedSquares: boolean = false,
) => {
  generateMovesLeft(
    piece,
    sourceColumnLetterIndex,
    sourceRowNumber,
    validMoves,
    currentBoard,
    includeBlockedSquares,
  );
  generateMovesRight(
    piece,
    sourceColumnLetterIndex,
    sourceRowNumber,
    maxColumns,
    validMoves,
    currentBoard,
    includeBlockedSquares,
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
  includeBlockedSquares: boolean = false,
) => {
  generateMovesLeftTop(
    piece,
    currentBoard,
    columnIndex,
    rowIndex,
    maxRows,
    validMoves,
    includeBlockedSquares,
  );
  generateMovesRightBottom(
    piece,
    currentBoard,
    columnIndex,
    rowIndex,
    maxColumns,
    validMoves,
    includeBlockedSquares,
  );
  generateMovesRightTop(
    piece,
    currentBoard,
    columnIndex,
    rowIndex,
    maxRows,
    maxColumns,
    validMoves,
    includeBlockedSquares,
  );
  generateMovesLeftBottom(
    piece,
    currentBoard,
    columnIndex,
    rowIndex,
    validMoves,
    includeBlockedSquares,
  );
};
