import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import validPawnMove, { canPawnEat } from "./pawn/pawnValidation";
import { isPieceWhite } from "./common";
import captureCalculation from "./captureCalculation";

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
  let isValidMove;
  let canCapture;

  switch (generalPieceType) {
    case "P":
      canCapture = canPawnEat(currentBoardPositions, source, target, piece);
      isValidMove = validPawnMove(
        currentBoardPositions,
        source,
        target,
        piece,
        setCurrentBoardPositions,
      );
      break;
    default:
      return false;
  }

  if (canCapture) {
    const capturePoints = captureCalculation(capturedPiece);
    if (isPieceWhite(piece)) {
      addPointsForWhite(capturePoints);
    } else {
      addPointsForBlack(capturePoints);
    }
  }

  return isValidMove;
};

export default handlePieceMove;
