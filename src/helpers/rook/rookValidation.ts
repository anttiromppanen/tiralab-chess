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

const validRookMovesFromSquare = (
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
    piece,
    currentColumnLetterIndex,
    currentRowNumber,
    maxColumns,
    validRookMoves,
    currentBoard,
  );

  generateMovesDownwards(
    piece,
    currentColumnLetter,
    currentRowNumber,
    validRookMoves,
    currentBoard,
  );

  generateMovesLeft(
    piece,
    currentColumnLetterIndex,
    currentRowNumber,
    validRookMoves,
    currentBoard,
  );

  return validRookMoves;
};

export default validRookMovesFromSquare;
