import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { horizontalBoard } from "../../const/common";
import { arePiecesDifferentColor } from "../common";

const validKingMovesFromSquare = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
) => {
  let validKingMoves: Square[] = [];
  const currentColumnLetter = source[0];
  const currentColumnLetterIndex = horizontalBoard.indexOf(currentColumnLetter);
  const currentRowNumber = Number(source[1]);
  const maxColumns = 7;
  const maxRows = 8;

  const validColumnDown = currentColumnLetterIndex - 1 >= 0;
  const validColumnUp = currentColumnLetterIndex + 1 <= maxColumns;
  const validRowDown = currentRowNumber - 1 >= 1;
  const validRowUp = currentRowNumber + 1 <= maxRows;

  const bottomLeft =
    validColumnDown &&
    validRowDown &&
    `${horizontalBoard[currentColumnLetterIndex - 1]}${currentRowNumber - 1}`;

  const left =
    validColumnDown &&
    `${horizontalBoard[currentColumnLetterIndex - 1]}${currentRowNumber}`;

  const topLeft =
    validColumnDown &&
    validRowUp &&
    `${horizontalBoard[currentColumnLetterIndex - 1]}${currentRowNumber + 1}`;

  const top =
    validRowUp &&
    `${horizontalBoard[currentColumnLetterIndex]}${currentRowNumber + 1}`;

  const topRight =
    validColumnUp &&
    validRowUp &&
    `${horizontalBoard[currentColumnLetterIndex + 1]}${currentRowNumber + 1}`;

  const right =
    validColumnUp &&
    `${horizontalBoard[currentColumnLetterIndex + 1]}${currentRowNumber}`;

  const bottomRight =
    validColumnUp &&
    validRowDown &&
    `${horizontalBoard[currentColumnLetterIndex + 1]}${currentRowNumber - 1}`;

  const bottom =
    validRowDown &&
    `${horizontalBoard[currentColumnLetterIndex]}${currentRowNumber - 1}`;

  // filter out false squares and squares that are blocked by same color piece
  validKingMoves = [
    bottomLeft,
    left,
    topLeft,
    top,
    topRight,
    right,
    bottomRight,
    bottom,
  ].filter(
    (square): square is Square =>
      !!square &&
      arePiecesDifferentColor(piece, square as Square, currentBoard),
  );

  return validKingMoves;
};

export default validKingMovesFromSquare;