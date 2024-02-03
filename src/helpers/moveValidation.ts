import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import captureCalculation from "./captureCalculation";
import { isPieceWhite } from "./common";
import validKnightMove, { canKnightCapture } from "./knight/knightValidation";
import validPawnMove, { canPawnCapture } from "./pawn/pawnValidation";
import validBishopMove, { canBishopCapture } from "./bishop/bishopValidation";

interface CapturePieceProps {
  capturePoints: number;
  piece: Piece;
  addPointsForWhite: (amount: number) => void;
  addPointsForBlack: (amount: number) => void;
}

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
      canCapture = canKnightCapture(
        source,
        target,
        piece,
        currentBoardPositions,
      );
      isValidMove = validKnightMove({
        source,
        target,
        piece,
        currentBoard: currentBoardPositions,
        setCurrentBoard: setCurrentBoardPositions,
      });
      break;
    case "B":
      canCapture = canBishopCapture(
        source,
        target,
        piece,
        currentBoardPositions,
      );
      isValidMove = validBishopMove(
        source,
        target,
        piece,
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
