import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { horizontalBoardByIndex } from "../../const/common";
import {
  arePiecesDifferentColor,
  getRowAndColumnFromSquare,
  isValidSquare,
} from "../common";

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
  const { currentColumnLetterIndex, currentRowNumber } =
    getRowAndColumnFromSquare(source);

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
    const newRow = currentColumnLetterIndex + rowOffset;
    const newCol = currentRowNumber + colOffset;

    if (newRow >= 0 && newRow < 8 && newCol >= 1 && newCol <= 8) {
      const square = `${horizontalBoardByIndex[newRow]}${newCol}` as Square;
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

export const isKingAttackedByKnight = (
  source: Square,
  currentKingPosition: Square,
) => {
  const attackedSquares: Square[] = [];
  const {
    currentColumnLetterIndex: columnLetterIndex,
    currentRowNumber: rowNumber,
  } = getRowAndColumnFromSquare(source);

  const upLeftSquare1 = `${horizontalBoardByIndex[columnLetterIndex - 2]}${
    rowNumber + 1
  }` as Square;
  const upLeftSquare2 = `${horizontalBoardByIndex[columnLetterIndex - 1]}${
    rowNumber + 2
  }` as Square;
  const upRightSquare1 = `${horizontalBoardByIndex[columnLetterIndex + 1]}${
    rowNumber + 2
  }` as Square;
  const upRightSquare2 = `${horizontalBoardByIndex[columnLetterIndex + 2]}${
    rowNumber + 1
  }` as Square;
  const bottomRightSquare1 = `${horizontalBoardByIndex[columnLetterIndex + 2]}${
    rowNumber - 1
  }` as Square;
  const bottomRightSquare2 = `${horizontalBoardByIndex[columnLetterIndex + 1]}${
    rowNumber - 2
  }` as Square;
  const bottomLeftSquare1 = `${horizontalBoardByIndex[columnLetterIndex - 1]}${
    rowNumber - 2
  }` as Square;
  const bottomLeftSquare2 = `${horizontalBoardByIndex[columnLetterIndex - 2]}${
    rowNumber - 1
  }` as Square;

  if (isValidSquare(columnLetterIndex - 2, rowNumber + 1))
    if (currentKingPosition === upLeftSquare1)
      attackedSquares.push(upLeftSquare1);
  if (isValidSquare(columnLetterIndex - 1, rowNumber + 2))
    if (currentKingPosition === upLeftSquare2)
      attackedSquares.push(upLeftSquare2);
  if (isValidSquare(columnLetterIndex + 1, rowNumber + 2))
    if (currentKingPosition === upRightSquare1)
      attackedSquares.push(upRightSquare1);
  if (isValidSquare(columnLetterIndex + 2, rowNumber + 1))
    if (currentKingPosition === upRightSquare2)
      attackedSquares.push(upRightSquare2);
  if (isValidSquare(columnLetterIndex + 2, rowNumber - 1))
    if (currentKingPosition === bottomRightSquare1)
      attackedSquares.push(bottomRightSquare1);
  if (isValidSquare(columnLetterIndex + 1, rowNumber - 2))
    if (currentKingPosition === bottomRightSquare2)
      attackedSquares.push(bottomRightSquare2);
  if (isValidSquare(columnLetterIndex - 1, rowNumber - 2))
    if (currentKingPosition === bottomLeftSquare1)
      attackedSquares.push(bottomLeftSquare1);
  if (isValidSquare(columnLetterIndex - 2, rowNumber - 1))
    if (currentKingPosition === bottomLeftSquare2)
      attackedSquares.push(bottomLeftSquare2);

  return attackedSquares;
};

export const allAttackedSquaresByKnight = (
  source: Square,
  attackedSquares: Record<Square, boolean>,
) => {
  const newAttackedSquares = attackedSquares;
  const {
    currentColumnLetterIndex: columnLetterIndex,
    currentRowNumber: rowNumber,
  } = getRowAndColumnFromSquare(source);

  const upLeftSquare1 = `${horizontalBoardByIndex[columnLetterIndex - 2]}${
    rowNumber + 1
  }` as Square;
  const upLeftSquare2 = `${horizontalBoardByIndex[columnLetterIndex - 1]}${
    rowNumber + 2
  }` as Square;
  const upRightSquare1 = `${horizontalBoardByIndex[columnLetterIndex + 1]}${
    rowNumber + 2
  }` as Square;
  const upRightSquare2 = `${horizontalBoardByIndex[columnLetterIndex + 2]}${
    rowNumber + 1
  }` as Square;
  const bottomRightSquare1 = `${horizontalBoardByIndex[columnLetterIndex + 2]}${
    rowNumber - 1
  }` as Square;
  const bottomRightSquare2 = `${horizontalBoardByIndex[columnLetterIndex + 1]}${
    rowNumber - 2
  }` as Square;
  const bottomLeftSquare1 = `${horizontalBoardByIndex[columnLetterIndex - 1]}${
    rowNumber - 2
  }` as Square;
  const bottomLeftSquare2 = `${horizontalBoardByIndex[columnLetterIndex - 2]}${
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

  return attackedSquares;
};

export default validKnightMove;
