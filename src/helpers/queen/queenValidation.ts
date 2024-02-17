import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { horizontalBoard } from "../../const/common";
import {
  generateMovesDiagonally,
  generateMovesDownwards,
  generateMovesHorizontally,
  generateMovesLeft,
  generateMovesLeftTop,
  generateMovesRight,
  generateMovesRightBottom,
  generateMovesRightTop,
  generateMovesUpwards,
  generateMovesVertically,
} from "../generateMovesForPiece";

const generateValidQueenMoves = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
  validQueenMoves: Square[],
  includeBlockedSquares = false,
) => {
  const currentColumnLetter = source[0];
  const currentColumnLetterIndex = horizontalBoard.indexOf(currentColumnLetter);
  const currentRowNumber = Number(source[1]);
  const maxColumns = 7;
  const maxRows = 8;

  generateMovesVertically(
    piece,
    currentColumnLetter,
    currentRowNumber,
    maxRows,
    validQueenMoves,
    currentBoard,
    includeBlockedSquares,
  );

  generateMovesHorizontally(
    piece,
    currentColumnLetterIndex,
    currentRowNumber,
    maxColumns,
    validQueenMoves,
    currentBoard,
    includeBlockedSquares,
  );

  generateMovesDiagonally(
    piece,
    currentBoard,
    currentColumnLetterIndex,
    currentRowNumber,
    maxRows,
    maxColumns,
    validQueenMoves,
    includeBlockedSquares,
  );
};

export const isKingAttackedByQueen = (
  piece: Piece,
  source: Square,
  currentKingPosition: Square,
  currentBoard: BoardPosition,
) => {
  let queenMoves: Square[] = [];
  const currentColumnLetter = source[0];
  const currentColumnLetterIndex = horizontalBoard.indexOf(currentColumnLetter);
  const currentRowNumber = Number(source[1]);
  const maxColumns = 7;
  const maxRows = 8;

  generateMovesLeft(
    piece,
    currentColumnLetterIndex,
    currentRowNumber,
    queenMoves,
    currentBoard,
    true,
  );

  if (queenMoves.includes(currentKingPosition)) return queenMoves;
  queenMoves = [];

  generateMovesLeftTop(
    piece,
    currentBoard,
    currentColumnLetterIndex,
    currentRowNumber,
    maxRows,
    queenMoves,
    true,
  );

  if (queenMoves.includes(currentKingPosition)) return queenMoves;
  queenMoves = [];

  generateMovesUpwards(
    piece,
    currentColumnLetter,
    currentRowNumber,
    maxRows,
    queenMoves,
    currentBoard,
    true,
  );

  if (queenMoves.includes(currentKingPosition)) return queenMoves;
  queenMoves = [];

  generateMovesRightTop(
    piece,
    currentBoard,
    currentColumnLetterIndex,
    currentRowNumber,
    maxRows,
    maxColumns,
    queenMoves,
    true,
  );

  if (queenMoves.includes(currentKingPosition)) return queenMoves;
  queenMoves = [];

  generateMovesRight(
    piece,
    currentColumnLetterIndex,
    currentRowNumber,
    maxColumns,
    queenMoves,
    currentBoard,
    true,
  );

  if (queenMoves.includes(currentKingPosition)) return queenMoves;
  queenMoves = [];

  generateMovesRightBottom(
    piece,
    currentBoard,
    currentColumnLetterIndex,
    currentRowNumber,
    maxColumns,
    queenMoves,
    true,
  );

  if (queenMoves.includes(currentKingPosition)) return queenMoves;
  queenMoves = [];

  generateMovesDownwards(
    piece,
    currentColumnLetter,
    currentRowNumber,
    queenMoves,
    currentBoard,
    true,
  );

  if (queenMoves.includes(currentKingPosition)) return queenMoves;
  queenMoves = [];

  generateMovesRightBottom(
    piece,
    currentBoard,
    currentColumnLetterIndex,
    currentRowNumber,
    maxColumns,
    queenMoves,
    true,
  );

  if (queenMoves.includes(currentKingPosition)) return queenMoves;

  return [];
};

const validQueenMovesFromSquare = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
) => {
  const validQueenMoves: Square[] = [];

  generateValidQueenMoves(source, piece, currentBoard, validQueenMoves);

  return validQueenMoves;
};

export const allAttackedSquaresByQueen = (
  piece: Piece,
  source: Square,
  currentBoard: BoardPosition,
  allAttackedSquares: Record<string, boolean>,
) => {
  const newAttackedSquares = allAttackedSquares;
  const validQueenMoves: Square[] = [];

  generateValidQueenMoves(source, piece, currentBoard, validQueenMoves, true);

  validQueenMoves.forEach((square) => {
    newAttackedSquares[square] = true;
  });

  return newAttackedSquares;
};

export default validQueenMovesFromSquare;
