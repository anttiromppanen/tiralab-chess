import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { horizontalBoardByIndex } from "../../const/common";
import { arePiecesDifferentColor, getRowAndColumnFromSquare } from "../common";

export const generateValidKingMoves = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
  includeBlockedSquares = false,
) => {
  let validKingMoves: Square[] = [];
  const { currentColumnLetterIndex, currentRowNumber } =
    getRowAndColumnFromSquare(source);
  const maxColumns = 7;
  const maxRows = 8;

  const validColumnDown = currentColumnLetterIndex - 1 >= 0;
  const validColumnUp = currentColumnLetterIndex + 1 <= maxColumns;
  const validRowDown = currentRowNumber - 1 >= 1;
  const validRowUp = currentRowNumber + 1 <= maxRows;

  const bottomLeft =
    validColumnDown &&
    validRowDown &&
    `${horizontalBoardByIndex[currentColumnLetterIndex - 1]}${currentRowNumber - 1}`;

  const left =
    validColumnDown &&
    `${horizontalBoardByIndex[currentColumnLetterIndex - 1]}${currentRowNumber}`;

  const topLeft =
    validColumnDown &&
    validRowUp &&
    `${horizontalBoardByIndex[currentColumnLetterIndex - 1]}${currentRowNumber + 1}`;

  const top =
    validRowUp &&
    `${horizontalBoardByIndex[currentColumnLetterIndex]}${currentRowNumber + 1}`;

  const topRight =
    validColumnUp &&
    validRowUp &&
    `${horizontalBoardByIndex[currentColumnLetterIndex + 1]}${currentRowNumber + 1}`;

  const right =
    validColumnUp &&
    `${horizontalBoardByIndex[currentColumnLetterIndex + 1]}${currentRowNumber}`;

  const bottomRight =
    validColumnUp &&
    validRowDown &&
    `${horizontalBoardByIndex[currentColumnLetterIndex + 1]}${currentRowNumber - 1}`;

  const bottom =
    validRowDown &&
    `${horizontalBoardByIndex[currentColumnLetterIndex]}${currentRowNumber - 1}`;

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
  ].filter((square): square is Square => {
    if (includeBlockedSquares) return !!square;
    return (
      !!square && arePiecesDifferentColor(piece, square as Square, currentBoard)
    );
  });

  return validKingMoves;
};

const validKingMovesFromSquare = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
) => generateValidKingMoves(source, piece, currentBoard);

export const allAttackedSquaresByKing = (
  piece: Piece,
  source: Square,
  currentBoard: BoardPosition,
  allAttackedSquares: Record<string, boolean>,
) => {
  const newAttackedSquares = allAttackedSquares;
  const validKingMoves = generateValidKingMoves(
    source,
    piece,
    currentBoard,
    true,
  );

  validKingMoves.forEach((square) => {
    newAttackedSquares[square] = true;
  });

  return newAttackedSquares;
};

export default validKingMovesFromSquare;
