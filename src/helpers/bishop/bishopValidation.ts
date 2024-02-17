import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { horizontalBoard } from "../../const/common";
import {
  generateMovesLeftBottom,
  generateMovesLeftTop,
  generateMovesRightBottom,
  generateMovesRightTop,
} from "../generateMovesForPiece";

export const generateValidBishopMoves = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
  validBishopMoves: Square[],
  includeBlockedSquares = false,
) => {
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
    includeBlockedSquares,
  );

  generateMovesRightTop(
    piece,
    currentBoard,
    selectedSquareColumnLetterIndex,
    selectedSquareRowNumber,
    maxRows,
    maxColumns,
    validBishopMoves,
    includeBlockedSquares,
  );

  generateMovesLeftBottom(
    piece,
    currentBoard,
    selectedSquareColumnLetterIndex,
    selectedSquareRowNumber,
    validBishopMoves,
    includeBlockedSquares,
  );

  generateMovesRightBottom(
    piece,
    currentBoard,
    selectedSquareColumnLetterIndex,
    selectedSquareRowNumber,
    maxColumns,
    validBishopMoves,
    includeBlockedSquares,
  );
};

export const isKingAttackedByBishop = (
  piece: Piece,
  source: Square,
  currentKingPosition: Square,
  currentBoard: BoardPosition,
) => {
  const movesTopLeft: Square[] = [];
  const movesTopRight: Square[] = [];
  const movesBottomRight: Square[] = [];
  const movesBottomLeft: Square[] = [];
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
    movesTopLeft,
    true,
  );

  if (movesTopLeft.includes(currentKingPosition)) return movesTopLeft;

  generateMovesRightTop(
    piece,
    currentBoard,
    selectedSquareColumnLetterIndex,
    selectedSquareRowNumber,
    maxRows,
    maxColumns,
    movesTopRight,
    true,
  );

  if (movesTopRight.includes(currentKingPosition)) return movesTopRight;

  generateMovesLeftBottom(
    piece,
    currentBoard,
    selectedSquareColumnLetterIndex,
    selectedSquareRowNumber,
    movesBottomLeft,
    true,
  );

  if (movesBottomLeft.includes(currentKingPosition)) return movesBottomLeft;

  generateMovesRightBottom(
    piece,
    currentBoard,
    selectedSquareColumnLetterIndex,
    selectedSquareRowNumber,
    maxColumns,
    movesBottomRight,
    true,
  );

  if (movesBottomRight.includes(currentKingPosition)) return movesBottomRight;
  return [];
};

export const validBishopMovesFromSquare = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
) => {
  const validBishopMoves: Square[] = [];

  generateValidBishopMoves(source, piece, currentBoard, validBishopMoves);

  return validBishopMoves;
};

export const allAttackedSquaresByBishop = (
  piece: Piece,
  source: Square,
  currentBoard: BoardPosition,
  allAttackedSquares: Record<string, boolean>,
) => {
  const newAttackedSquares = allAttackedSquares;
  const validBishopMoves: Square[] = [];

  generateValidBishopMoves(source, piece, currentBoard, validBishopMoves, true);

  validBishopMoves.forEach((square) => {
    newAttackedSquares[square] = true;
  });

  return newAttackedSquares;
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
