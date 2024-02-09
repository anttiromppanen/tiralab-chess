import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { isPieceWhite } from "../common";
import { pieceValues, horizontalBoard } from "../../const/common";

// 1 means up on y-axis
export const validRowDirectionForWhite = (
  sourceSquare: Square,
  targetSquare: Square,
) => Number(targetSquare[1]) - Number(sourceSquare[1]) === 1;

// -1 means down on y-axis
export const validRowDirectionForBlack = (
  sourceSquare: Square,
  targetSquare: Square,
) => Number(targetSquare[1]) - Number(sourceSquare[1]) === -1;

export const validMoveForwardForWhite = (
  sourceSquare: Square,
  targetSquare: Square,
) => {
  const validColumn = sourceSquare[0] === targetSquare[0];
  const validRow = validRowDirectionForWhite(sourceSquare, targetSquare);
  return validColumn && validRow;
};

export const validMoveForwardForBlack = (
  sourceSquare: Square,
  targetSquare: Square,
) => {
  const validColumn = sourceSquare[0] === targetSquare[0];
  const validRow = validRowDirectionForBlack(sourceSquare, targetSquare);
  return validColumn && validRow;
};

export const canPawnCapture = (
  currentBoardPositions: BoardPosition | null,
  sourceSquare: Square,
  targetSquare: Square,
  piece: Piece,
) => {
  const currentColumn = horizontalBoard.indexOf(sourceSquare[0]);
  const currentRow = Number(sourceSquare[1]);

  const targetColumn = horizontalBoard.indexOf(targetSquare[0]);
  const targetRow = Number(targetSquare[1]);

  const isAdjacentColumn = Math.abs(currentColumn - targetColumn) === 1;
  const validRowForWhite = targetRow - currentRow === 1;
  const validRowForBlack = targetRow - currentRow === -1;

  const pieceAtTargetSquare = currentBoardPositions
    ? currentBoardPositions[targetSquare]
    : null;

  if (pieceAtTargetSquare === null || pieceAtTargetSquare === undefined)
    return false;
  if (isPieceWhite(piece) && !isPieceWhite(pieceAtTargetSquare)) {
    return isAdjacentColumn && validRowForWhite;
  }
  if (!isPieceWhite(piece) && isPieceWhite(pieceAtTargetSquare)) {
    return isAdjacentColumn && validRowForBlack;
  }

  return false;
};

const validPawnMove = (
  currentBoard: BoardPosition | null,
  sourceSquare: Square,
  targetSquare: Square,
  piece: Piece,
  setCurrentPosition: (newPosition: BoardPosition) => void,
) => {
  if (currentBoard === null) return false;
  const newBoardPosition = currentBoard;

  if (canPawnCapture(currentBoard, sourceSquare, targetSquare, piece)) {
    newBoardPosition[targetSquare] = piece;
    newBoardPosition[sourceSquare] = undefined;
    setCurrentPosition(newBoardPosition);
    return true;
  }

  if (
    currentBoard[targetSquare] !== undefined &&
    pieceValues.includes(currentBoard[targetSquare] as Piece)
  )
    return false;

  if (
    isPieceWhite(piece) &&
    validMoveForwardForWhite(sourceSquare, targetSquare)
  ) {
    newBoardPosition[targetSquare] = piece;
    newBoardPosition[sourceSquare] = undefined;
    setCurrentPosition(newBoardPosition);
    return true;
  }

  if (
    !isPieceWhite(piece) &&
    validMoveForwardForBlack(sourceSquare, targetSquare)
  ) {
    newBoardPosition[targetSquare] = piece;
    newBoardPosition[sourceSquare] = undefined;
    setCurrentPosition(newBoardPosition);
    return true;
  }

  return false;
};

export const isSquareBlocked = (
  source: Square,
  target: Square,
  currentBoard: BoardPosition,
) => {
  if (currentBoard[target] === undefined) return false;
  const sourceColumn = currentBoard[source]?.[0];
  const targetColumn = currentBoard[target]?.[0];
  return sourceColumn === targetColumn;
};

export const validPawnMovesFromSquare = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
) => {
  const validPawnMoves: Square[] = [];
  const columnLetter = source[0];
  const columnLetterIndex = horizontalBoard.indexOf(columnLetter);
  const rowNumber = Number(source[1]);

  const straightUpSquare = `${columnLetter}${rowNumber + 1}` as Square;
  const upLeftSquare = `${horizontalBoard[columnLetterIndex - 1]}${
    rowNumber + 1
  }` as Square;
  const upRightSquare = `${horizontalBoard[columnLetterIndex + 1]}${
    rowNumber + 1
  }` as Square;
  const straightDownSquare = `${columnLetter}${rowNumber - 1}` as Square;
  const downLeftSquare = `${horizontalBoard[columnLetterIndex - 1]}${
    rowNumber - 1
  }` as Square;
  const downRightSquare = `${horizontalBoard[columnLetterIndex + 1]}${
    rowNumber - 1
  }` as Square;

  if (isPieceWhite(piece)) {
    if (
      validMoveForwardForWhite(source, straightUpSquare) &&
      !isSquareBlocked(source, straightUpSquare, currentBoard)
    )
      validPawnMoves.push(straightUpSquare);
    if (canPawnCapture(currentBoard, source, upLeftSquare, piece))
      validPawnMoves.push(upLeftSquare);
    if (canPawnCapture(currentBoard, source, upRightSquare, piece))
      validPawnMoves.push(upRightSquare);
  }
  if (!isPieceWhite(piece)) {
    if (
      validMoveForwardForBlack(source, straightDownSquare) &&
      !isSquareBlocked(source, straightDownSquare, currentBoard)
    )
      validPawnMoves.push(straightDownSquare);
    if (canPawnCapture(currentBoard, source, downLeftSquare, piece))
      validPawnMoves.push(downLeftSquare);
    if (canPawnCapture(currentBoard, source, downRightSquare, piece))
      validPawnMoves.push(downRightSquare);
  }

  return validPawnMoves;
};

export default validPawnMove;
