import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { horizontalBoard } from "../../const/common";
import { arePiecesDifferentColor } from "../common";

export const handleWhenSquareContainsPiece = () => {};

export const generateMovesLeftTop = (
  piece: Piece,
  currentBoard: BoardPosition,
  columnIndex: number,
  rowIndex: number,
  maxRows: number,
  validBishopMoves: Square[],
) => {
  for (let i = 1; columnIndex - i >= 0 && rowIndex + i <= maxRows; i += 1) {
    const squareToAdd = `${horizontalBoard[columnIndex - i]}${
      rowIndex + i
    }` as Square;

    if (currentBoard[squareToAdd]) {
      // if piece is opposite color, add to array
      // need to add score for this
      if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
        validBishopMoves.push(squareToAdd);
      break;
    }
    validBishopMoves.push(squareToAdd);
  }
};

export const generateMovesRightTop = (
  piece: Piece,
  currentBoard: BoardPosition,
  columnIndex: number,
  rowIndex: number,
  maxRows: number,
  maxColumns: number,
  validBishopMoves: Square[],
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
      // need to add score for this
      if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
        validBishopMoves.push(squareToAdd);
      break;
    }
    validBishopMoves.push(squareToAdd);
  }
};

export const generateMovesLeftBottom = (
  piece: Piece,
  currentBoard: BoardPosition,
  columnIndex: number,
  rowIndex: number,
  validBishopMoves: Square[],
) => {
  for (let i = 1; columnIndex - i >= 0 && rowIndex - i >= 1; i += 1) {
    const squareToAdd = `${horizontalBoard[columnIndex - i]}${
      rowIndex - i
    }` as Square;

    if (currentBoard[squareToAdd]) {
      // if piece is opposite color, add to array
      // need to add score for this
      if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
        validBishopMoves.push(squareToAdd);
      break;
    }
    validBishopMoves.push(squareToAdd);
  }
};

export const generateMovesRightBottom = (
  piece: Piece,
  currentBoard: BoardPosition,
  columnIndex: number,
  rowIndex: number,
  maxColumns: number,
  validBishopMoves: Square[],
) => {
  for (let i = 1; columnIndex + i <= maxColumns && rowIndex - i >= 1; i += 1) {
    const squareToAdd = `${horizontalBoard[columnIndex + i]}${
      rowIndex - i
    }` as Square;

    if (currentBoard[squareToAdd]) {
      // if piece is opposite color, add to array
      // need to add score for this
      if (arePiecesDifferentColor(piece, squareToAdd, currentBoard))
        validBishopMoves.push(squareToAdd);
      break;
    }
    validBishopMoves.push(squareToAdd);
  }
};

export const validBishopMovesFromSquare = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
) => {
  const validBishopMoves: Square[] = [];
  const selectedSquareColumnLetter = source[0];
  const selectedSquareColumnLetterIndex = horizontalBoard.indexOf(
    selectedSquareColumnLetter,
  );
  const selectedSquareRowNumber = Number(source[1]);
  // columns are stored in a 7-index array;
  const maxColumns = 7;
  const maxRows = 8;

  generateMovesLeftTop(
    piece,
    currentBoard,
    selectedSquareColumnLetterIndex,
    selectedSquareRowNumber,
    maxRows,
    validBishopMoves,
  );

  generateMovesRightTop(
    piece,
    currentBoard,
    selectedSquareColumnLetterIndex,
    selectedSquareRowNumber,
    maxRows,
    maxColumns,
    validBishopMoves,
  );

  generateMovesLeftBottom(
    piece,
    currentBoard,
    selectedSquareColumnLetterIndex,
    selectedSquareRowNumber,
    validBishopMoves,
  );

  generateMovesRightBottom(
    piece,
    currentBoard,
    selectedSquareColumnLetterIndex,
    selectedSquareRowNumber,
    maxColumns,
    validBishopMoves,
  );

  return validBishopMoves;
};

const validBishopMove = (
  source: Square,
  target: Square,
  piece: Piece,
  currentBoard: BoardPosition,
  setCurrentBoard: (newBoard: BoardPosition) => void,
) => {
  const validMoves = validBishopMovesFromSquare(source, piece, currentBoard);
  if (validMoves.includes(target)) {
    const newBoard = currentBoard;
    newBoard[target] = piece;
    newBoard[source] = undefined;
    setCurrentBoard(newBoard);
    return true;
  }

  return false;
};

export default validBishopMove;
