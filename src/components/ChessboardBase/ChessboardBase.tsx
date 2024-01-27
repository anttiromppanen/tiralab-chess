import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { initialBoardPosition } from "../../const/common";
import handlePieceMove from "../../helpers/moveValidation";
import usePointsStore from "../../store/usePointsStore";

function ChessboardBase() {
  const whitePoints = usePointsStore((state) => state.whitePoints);
  const blackPoints = usePointsStore((state) => state.blackPoints);
  const addPointsForWhite = usePointsStore(
    (state) => state.increaseWhitePoints,
  );
  const addPointsForBlack = usePointsStore(
    (state) => state.increaseBlackPoints,
  );
  const [currentBoardPositions, setCurrentBoardPositions] =
    useState<BoardPosition>(initialBoardPosition);

  const handlePieceDrop = (source: Square, target: Square, piece: Piece) =>
    handlePieceMove(
      piece,
      source,
      target,
      currentBoardPositions,
      setCurrentBoardPositions,
      addPointsForWhite,
      addPointsForBlack,
    );
  console.log(whitePoints, blackPoints);
  return (
    <div className="w-1/3">
      <Chessboard
        id="tiralab-chessboard"
        position={currentBoardPositions}
        onPieceDrop={(source, target, piece) =>
          handlePieceDrop(source, target, piece)
        }
        onPromotionCheck={() => false}
      />
    </div>
  );
}

export default ChessboardBase;
