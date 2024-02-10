import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { horizontalBoard } from "../../const/common";
import {
  generateMovesDiagonally,
  generateMovesHorizontally,
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
