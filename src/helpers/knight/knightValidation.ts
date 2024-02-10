import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { arePiecesDifferentColor, isValidSquare } from "../common";
import { horizontalBoard } from "../../const/common";

interface KnightValidationProps {
  source: Square;
  target: Square;
  piece: Piece;
  currentBoard: BoardPosition;
  setCurrentBoard: (board: BoardPosition) => void;
}

export const validKnightMovesFromSquare = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
  includeAllAttackedSquares = false,
) => {
  const validKnightMoves: Square[] = [];
  const sourceRowLetter = source[0];
  const sourceColumnNumber = Number(source[1]);
  const sourceRowAsIndex = horizontalBoard.indexOf(sourceRowLetter);

  const allMoves = [
    [-2, 1],
    [-2, -1],
    [-1, 2],
    [-1, -2],
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
  ];

  allMoves.forEach(([rowOffset, colOffset]) => {
    const newRow = sourceRowAsIndex + rowOffset;
    const newCol = sourceColumnNumber + colOffset;

    if (
      newRow >= 0 &&
      newRow < horizontalBoard.length &&
      newCol >= 1 &&
      newCol <= 8
    ) {
      const square = `${horizontalBoard[newRow]}${newCol}` as Square;
      // push if square doesn't have same color piece in it
      if (includeAllAttackedSquares) validKnightMoves.push(square);
      else if (arePiecesDifferentColor(piece, square, currentBoard))
        validKnightMoves.push(square);
    }
  });

  return validKnightMoves;
};

const validKnightMove = ({
  source,
  target,
  piece,
  currentBoard,
  setCurrentBoard,
}: KnightValidationProps) => {
  const validMoves = validKnightMovesFromSquare(source, piece, currentBoard);

  if (validMoves.includes(target)) {
    const newBoard = currentBoard;
    newBoard[target] = piece;
    newBoard[source] = undefined;
    setCurrentBoard(newBoard);
    return true;
  }

  return false;
};

export const allAttackedSquaresByKnight = (
  source: Square,
  attackedSquares: Record<Square, boolean>,
) => {
  const newAttackedSquares = attackedSquares;
  const columnLetter = source[0];
  const columnLetterIndex = horizontalBoard.indexOf(columnLetter);
  const rowNumber = Number(source[1]);

  const upLeftSquare1 = `${horizontalBoard[columnLetterIndex - 2]}${
    rowNumber + 1
  }` as Square;
  const upLeftSquare2 = `${horizontalBoard[columnLetterIndex - 1]}${
    rowNumber + 2
  }` as Square;
  const upRightSquare1 = `${horizontalBoard[columnLetterIndex + 1]}${
    rowNumber + 2
  }` as Square;
  const upRightSquare2 = `${horizontalBoard[columnLetterIndex + 2]}${
    rowNumber + 1
  }` as Square;
  const bottomRightSquare1 = `${horizontalBoard[columnLetterIndex + 2]}${
    rowNumber - 1
  }` as Square;
  const bottomRightSquare2 = `${horizontalBoard[columnLetterIndex + 1]}${
    rowNumber - 2
  }` as Square;
  const bottomLeftSquare1 = `${horizontalBoard[columnLetterIndex - 1]}${
    rowNumber - 2
  }` as Square;
  const bottomLeftSquare2 = `${horizontalBoard[columnLetterIndex - 2]}${
    rowNumber - 1
  }` as Square;

  if (isValidSquare(columnLetterIndex - 2, rowNumber + 1))
    newAttackedSquares[upLeftSquare1] = true;
  if (isValidSquare(columnLetterIndex - 1, rowNumber + 2))
    newAttackedSquares[upLeftSquare2] = true;
  if (isValidSquare(columnLetterIndex + 1, rowNumber + 2))
    newAttackedSquares[upRightSquare1] = true;
  if (isValidSquare(columnLetterIndex + 2, rowNumber + 1))
    newAttackedSquares[upRightSquare2] = true;
  if (isValidSquare(columnLetterIndex + 2, rowNumber - 1))
    newAttackedSquares[bottomRightSquare1] = true;
  if (isValidSquare(columnLetterIndex + 1, rowNumber - 2))
    newAttackedSquares[bottomRightSquare2] = true;
  if (isValidSquare(columnLetterIndex - 1, rowNumber - 2))
    newAttackedSquares[bottomLeftSquare1] = true;
  if (isValidSquare(columnLetterIndex - 2, rowNumber - 1))
    newAttackedSquares[bottomLeftSquare2] = true;

  return newAttackedSquares;
};

export default validKnightMove;
