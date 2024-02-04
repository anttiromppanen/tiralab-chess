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

const validQueenMovesFromSquare = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
) => {
  const validQueenMoves: Square[] = [];
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
  );

  generateMovesHorizontally(
    piece,
    currentColumnLetterIndex,
    currentRowNumber,
    maxColumns,
    validQueenMoves,
    currentBoard,
  );

  generateMovesDiagonally(
    piece,
    currentBoard,
    currentColumnLetterIndex,
    currentRowNumber,
    maxRows,
    maxColumns,
    validQueenMoves,
  );

  return validQueenMoves;
};

export default validQueenMovesFromSquare;
