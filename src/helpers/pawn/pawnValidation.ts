import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import {
  horizontalBoardByIndex,
  horizontalBoardByLetter,
  pieceValues,
} from "../../const/common";
import {
  getRowAndColumnFromSquare,
  isFirstMoveForPawn,
  isPieceWhite,
  isValidSquare,
} from "../common";

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
  const currentColumn = horizontalBoardByLetter[sourceSquare[0]];
  const currentRow = Number(sourceSquare[1]);

  const targetColumn = horizontalBoardByLetter[targetSquare[0]];
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
  const sourceSquarePlusTwoRows = `${sourceSquare[0]}${
    Number(sourceSquare[1]) + 2
  }` as Square;
  const sourceSquareMinusTwoRows = `${sourceSquare[0]}${
    Number(sourceSquare[1]) - 2
  }` as Square;
  const isFirstMove = isFirstMoveForPawn(piece, sourceSquare);

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
    isPieceWhite(piece) &&
    isFirstMove &&
    isValidSquare(
      horizontalBoardByLetter[sourceSquare[0]],
      Number(sourceSquare[1]) + 2,
    ) &&
    currentBoard[sourceSquarePlusTwoRows] === undefined
  ) {
    newBoardPosition[sourceSquarePlusTwoRows] = piece;
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

  if (
    !isPieceWhite(piece) &&
    validMoveForwardForBlack(sourceSquare, targetSquare) &&
    isFirstMove &&
    isValidSquare(
      horizontalBoardByLetter[sourceSquare[0]],
      Number(sourceSquare[1]) - 2,
    ) &&
    currentBoard[sourceSquareMinusTwoRows] === undefined
  ) {
    newBoardPosition[sourceSquareMinusTwoRows] = piece;
    newBoardPosition[sourceSquare] = undefined;
    setCurrentPosition(newBoardPosition);
    return true;
  }

  return false;
};

export const isSquareBlocked = (target: Square, currentBoard: BoardPosition) =>
  currentBoard[target] !== undefined;

export const isKingAttackedByPawn = (
  piece: Piece,
  source: Square,
  currentKingPosition: Square,
) => {
  const attackedSquares: Square[] = [];
  const {
    currentColumnLetterIndex: columnLetterIndex,
    currentRowNumber: rowNumber,
  } = getRowAndColumnFromSquare(source);

  const upLeftSquare = `${horizontalBoardByIndex[columnLetterIndex - 1]}${
    rowNumber + 1
  }` as Square;
  const upRightSquare = `${horizontalBoardByIndex[columnLetterIndex + 1]}${
    rowNumber + 1
  }` as Square;
  const downLeftSquare = `${horizontalBoardByIndex[columnLetterIndex - 1]}${
    rowNumber - 1
  }` as Square;
  const downRightSquare = `${horizontalBoardByIndex[columnLetterIndex + 1]}${
    rowNumber - 1
  }` as Square;

  if (isPieceWhite(piece)) {
    if (isValidSquare(columnLetterIndex - 1, rowNumber + 1))
      if (currentKingPosition === upLeftSquare) {
        attackedSquares.push(upLeftSquare);
      }
    if (isValidSquare(columnLetterIndex + 1, rowNumber + 1))
      if (currentKingPosition === upRightSquare) {
        attackedSquares.push(upRightSquare);
      }
  } else {
    if (isValidSquare(columnLetterIndex - 1, rowNumber - 1))
      if (currentKingPosition === downLeftSquare) {
        attackedSquares.push(downLeftSquare);
      }
    if (isValidSquare(columnLetterIndex + 1, rowNumber - 1))
      if (currentKingPosition === downRightSquare) {
        attackedSquares.push(downRightSquare);
      }
  }

  return attackedSquares;
};

export const allAttackedSquaresByPawn = (
  piece: Piece,
  source: Square,
  attackedSquares: Record<Square, boolean>,
) => {
  const newAttackedSquares = attackedSquares;
  const {
    currentColumnLetterIndex: columnLetterIndex,
    currentRowNumber: rowNumber,
  } = getRowAndColumnFromSquare(source);

  const upLeftSquare = `${horizontalBoardByIndex[columnLetterIndex - 1]}${
    rowNumber + 1
  }` as Square;
  const upRightSquare = `${horizontalBoardByIndex[columnLetterIndex + 1]}${
    rowNumber + 1
  }` as Square;
  const downLeftSquare = `${horizontalBoardByIndex[columnLetterIndex - 1]}${
    rowNumber - 1
  }` as Square;
  const downRightSquare = `${horizontalBoardByIndex[columnLetterIndex + 1]}${
    rowNumber - 1
  }` as Square;

  if (isPieceWhite(piece)) {
    if (isValidSquare(columnLetterIndex - 1, rowNumber + 1))
      newAttackedSquares[upLeftSquare] = true;
    if (isValidSquare(columnLetterIndex + 1, rowNumber + 1))
      newAttackedSquares[upRightSquare] = true;
  } else {
    if (isValidSquare(columnLetterIndex - 1, rowNumber - 1))
      newAttackedSquares[downLeftSquare] = true;
    if (isValidSquare(columnLetterIndex + 1, rowNumber - 1))
      newAttackedSquares[downRightSquare] = true;
  }

  return newAttackedSquares;
};

export const validPawnMovesFromSquare = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
) => {
  const isFirstMove = isFirstMoveForPawn(piece, source);
  const validPawnMoves: Square[] = [];
  const {
    currentColumnLetter: columnLetter,
    currentColumnLetterIndex: columnLetterIndex,
    currentRowNumber: rowNumber,
  } = getRowAndColumnFromSquare(source);

  // all directions for pawn
  const straightUpSquare = `${columnLetter}${rowNumber + 1}` as Square;
  const upLeftSquare = `${horizontalBoardByIndex[columnLetterIndex - 1]}${
    rowNumber + 1
  }` as Square;
  const upRightSquare = `${horizontalBoardByIndex[columnLetterIndex + 1]}${
    rowNumber + 1
  }` as Square;
  const straightDownSquare = `${columnLetter}${rowNumber - 1}` as Square;
  const downLeftSquare = `${horizontalBoardByIndex[columnLetterIndex - 1]}${
    rowNumber - 1
  }` as Square;
  const downRightSquare = `${horizontalBoardByIndex[columnLetterIndex + 1]}${
    rowNumber - 1
  }` as Square;
  const twoSquaresUp = `${columnLetter}${rowNumber + 2}` as Square;
  const twoSquaresDown = `${columnLetter}${rowNumber - 2}` as Square;

  // validation for possible squares
  if (isPieceWhite(piece)) {
    if (
      isValidSquare(columnLetterIndex, rowNumber + 2) &&
      !isSquareBlocked(twoSquaresUp, currentBoard) &&
      isFirstMove
    ) {
      validPawnMoves.push(twoSquaresUp);
    }
    if (
      validMoveForwardForWhite(source, straightUpSquare) &&
      !isSquareBlocked(straightUpSquare, currentBoard)
    )
      validPawnMoves.push(straightUpSquare);
    if (canPawnCapture(currentBoard, source, upLeftSquare, piece))
      validPawnMoves.push(upLeftSquare);
    if (canPawnCapture(currentBoard, source, upRightSquare, piece))
      validPawnMoves.push(upRightSquare);
  }
  if (!isPieceWhite(piece)) {
    if (
      isValidSquare(columnLetterIndex, rowNumber - 2) &&
      !isSquareBlocked(twoSquaresDown, currentBoard) &&
      isFirstMove
    ) {
      validPawnMoves.push(twoSquaresDown);
    }
    if (
      validMoveForwardForBlack(source, straightDownSquare) &&
      !isSquareBlocked(straightDownSquare, currentBoard)
    ) {
      validPawnMoves.push(straightDownSquare);
    }
    if (canPawnCapture(currentBoard, source, downLeftSquare, piece))
      validPawnMoves.push(downLeftSquare);
    if (canPawnCapture(currentBoard, source, downRightSquare, piece))
      validPawnMoves.push(downRightSquare);
  }

  return validPawnMoves;
};

export default validPawnMove;
