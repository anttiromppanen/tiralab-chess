import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { horizontalBoard, isPieceWhite } from "./moveValidation";
import { pieceValues } from "../const/common";

const validMoveForwardForWhite = (
  sourceSquare: Square,
  targetSquare: Square,
) => {
  const validColumn = sourceSquare[0] === targetSquare[0];
  const validRow = Number(targetSquare[1]) - Number(sourceSquare[1]) === 1;
  return validColumn && validRow;
};

const validMoveForwardForBlack = (
  sourceSquare: Square,
  targetSquare: Square,
) => {
  const validColumn = sourceSquare[0] === targetSquare[0];
  const validRow = Number(targetSquare[1]) - Number(sourceSquare[1]) === -1;
  return validColumn && validRow;
};

const canPawnEat = (
  currentBoard: BoardPosition | null,
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

  const pieceAtTargetSquare = currentBoard ? currentBoard[targetSquare] : null;

  if (pieceAtTargetSquare === null || pieceAtTargetSquare === undefined)
    return false;

  if (isPieceWhite(piece) && pieceAtTargetSquare[0] === "b") {
    return isAdjacentColumn && validRowForWhite;
  }
  if (!isPieceWhite(piece) && pieceAtTargetSquare[0] === "w") {
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

  if (canPawnEat(currentBoard, sourceSquare, targetSquare, piece)) {
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

export default validPawnMove;
