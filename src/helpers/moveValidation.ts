import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { validBishopMovesFromSquare } from "./bishop/bishopValidation";
import captureCalculation from "./captureCalculation";
import { arePiecesDifferentColor, isPieceWhite } from "./common";
import { validKnightMovesFromSquare } from "./knight/knightValidation";
import validPawnMove, { canPawnCapture } from "./pawn/pawnValidation";
import { validRookMovesFromSquare } from "./rook/rookValidation";

interface CapturePieceProps {
  capturePoints: number;
  piece: Piece;
  addPointsForWhite: (amount: number) => void;
  addPointsForBlack: (amount: number) => void;
}

const isValidMoveForPiece = (
  source: Square,
  target: Square,
  piece: Piece,
  validMoves: Square[],
  currentBoard: BoardPosition,
  setCurrentBoard: (newPosition: BoardPosition) => void,
) => {
  if (validMoves.includes(target)) {
    const newBoard = currentBoard;
    newBoard[target] = piece;
    newBoard[source] = undefined;
    setCurrentBoard(newBoard);
    return true;
  }

  return false;
};

export const canPieceCapture = (
  target: Square,
  piece: Piece,
  validMoves: Square[],
  currentBoard: BoardPosition,
) =>
  validMoves.includes(target) &&
  currentBoard[target] !== undefined &&
  arePiecesDifferentColor(piece, target, currentBoard);

const capturePiece = ({
  capturePoints,
  piece,
  addPointsForWhite,
  addPointsForBlack,
}: CapturePieceProps) => {
  if (isPieceWhite(piece)) {
    addPointsForWhite(capturePoints);
  } else {
    addPointsForBlack(capturePoints);
  }
};

const pieceMoveValidation = (
  source: Square,
  target: Square,
  piece: Piece,
  validMoves: Square[],
  currentBoardPositions: BoardPosition,
  setCurrentBoardPositions: (newBoard: BoardPosition) => void,
) => {
  const canCapture = canPieceCapture(
    target,
    piece,
    validMoves,
    currentBoardPositions,
  );
  const isValidMove = isValidMoveForPiece(
    source,
    target,
    piece,
    validMoves,
    currentBoardPositions,
    setCurrentBoardPositions,
  );

  return [isValidMove, canCapture];
};

const handlePieceMove = (
  piece: Piece,
  source: Square,
  target: Square,
  currentBoardPositions: BoardPosition,
  setCurrentBoardPositions: (newBoardPositions: BoardPosition) => void,
  addPointsForWhite: (amount: number) => void,
  addPointsForBlack: (amount: number) => void,
) => {
  const generalPieceType = piece[1];
  const capturedPiece = currentBoardPositions[target] as Piece;
  let validMoves;
  let isValidMove;
  let canCapture;

  // checks move via piece type and stores result in isValidMove and canCapture
  switch (generalPieceType) {
    case "P":
      // refactor pawn code later to match other blocks
      canCapture = canPawnCapture(currentBoardPositions, source, target, piece);
      isValidMove = validPawnMove(
        currentBoardPositions,
        source,
        target,
        piece,
        setCurrentBoardPositions,
      );
      break;
    case "N":
      validMoves = validKnightMovesFromSquare(
        source,
        piece,
        currentBoardPositions,
      );
      [isValidMove, canCapture] = pieceMoveValidation(
        source,
        target,
        piece,
        validMoves,
        currentBoardPositions,
        setCurrentBoardPositions,
      );
      break;
    case "B":
      validMoves = validBishopMovesFromSquare(
        source,
        piece,
        currentBoardPositions,
      );
      [isValidMove, canCapture] = pieceMoveValidation(
        source,
        target,
        piece,
        validMoves,
        currentBoardPositions,
        setCurrentBoardPositions,
      );
      break;
    case "R":
      validMoves = validRookMovesFromSquare(
        source,
        piece,
        currentBoardPositions,
      );
      [isValidMove, canCapture] = pieceMoveValidation(
        source,
        target,
        piece,
        validMoves,
        currentBoardPositions,
        setCurrentBoardPositions,
      );
      break;
    default:
      return false;
  }

  if (canCapture) {
    const capturePoints = captureCalculation(capturedPiece);
    capturePiece({
      capturePoints,
      piece,
      addPointsForWhite,
      addPointsForBlack,
    });
  }

  return isValidMove;
};

export default handlePieceMove;
