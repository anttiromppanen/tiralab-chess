import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { horizontalBoard } from "../../const/common";
import {
  generateMovesDownwards,
  generateMovesLeft,
  generateMovesRight,
  generateMovesUpwards,
} from "../generateMovesForPiece";

export const generateValidRookMoves = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
  validRookMoves: Square[],
  includeBlockedSquares = false,
) => {
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
    includeBlockedSquares,
  );

  generateMovesRight(
    piece,
    currentColumnLetterIndex,
    currentRowNumber,
    maxColumns,
    validRookMoves,
    currentBoard,
    includeBlockedSquares,
  );

  generateMovesDownwards(
    piece,
    currentColumnLetter,
    currentRowNumber,
    validRookMoves,
    currentBoard,
    includeBlockedSquares,
  );

  generateMovesLeft(
    piece,
    currentColumnLetterIndex,
    currentRowNumber,
    validRookMoves,
    currentBoard,
    includeBlockedSquares,
  );
};

export const isKingAttackedByRook = (
  piece: Piece,
  source: Square,
  currentKingPosition: Square,
  currentBoard: BoardPosition,
) => {
  const movesTop: Square[] = [];
  const movesRight: Square[] = [];
  const movesBottom: Square[] = [];
  const movesLeft: Square[] = [];
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
    movesTop,
    currentBoard,
    true,
  );

  if (movesTop.includes(currentKingPosition)) return movesTop;

  generateMovesRight(
    piece,
    currentColumnLetterIndex,
    currentRowNumber,
    maxColumns,
    movesRight,
    currentBoard,
    true,
  );

  if (movesRight.includes(currentKingPosition)) return movesRight;

  generateMovesDownwards(
    piece,
    currentColumnLetter,
    currentRowNumber,
    movesBottom,
    currentBoard,
    true,
  );

  if (movesBottom.includes(currentKingPosition)) return movesBottom;

  generateMovesLeft(
    piece,
    currentColumnLetterIndex,
    currentRowNumber,
    movesLeft,
    currentBoard,
    true,
  );

  if (movesLeft.includes(currentKingPosition)) return movesLeft;
  return [];
};

const validRookMovesFromSquare = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
) => {
  const validRookMoves: Square[] = [];

  generateValidRookMoves(source, piece, currentBoard, validRookMoves);

  return validRookMoves;
};

export const allAttackedSquaresByRook = (
  piece: Piece,
  source: Square,
  currentBoard: BoardPosition,
  allAttackedSquares: Record<string, boolean>,
) => {
  const newAttackedSquares = allAttackedSquares;
  const validRookMoves: Square[] = [];

  generateValidRookMoves(source, piece, currentBoard, validRookMoves, true);

  validRookMoves.forEach((square) => {
    newAttackedSquares[square] = true;
  });

  return newAttackedSquares;
};

export default validRookMovesFromSquare;
