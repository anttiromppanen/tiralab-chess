import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { useShallow } from "zustand/react/shallow";
import { initialBoardPosition } from "../../const/common";
import attackedSquares from "../../helpers/attackedSquares";
import {
  canCheckBeBlocked,
  isChecked,
  isCheckmated,
} from "../../helpers/checkmate/isCheckOrMate";
import { calculateBestMoveRoot } from "../../helpers/evaluation/scoreEvaluation";
import handlePieceMove from "../../helpers/moveValidation";
import useGameStore from "../../store/useGameStore";
import usePointsStore from "../../store/usePointsStore";

function ChessboardBase() {
  const [currentBoardPositions, setCurrentBoardPositions] =
    useState<BoardPosition>(initialBoardPosition);
  const addPointsForWhite = usePointsStore(
    (state) => state.increaseWhitePoints,
  );
  const addPointsForBlack = usePointsStore(
    (state) => state.increaseBlackPoints,
  );
  const [updateIsCheckmate] = useGameStore(
    useShallow((state) => [state.updateIsCheck, state.updateIsCheckmate]),
  );
  const [colorToMove, setColorToMove] = useState<"w" | "b">("w");

  useEffect(() => {
    if (colorToMove === "b") {
      const { bestMoveFromSquare, bestMoveToSquare, bestPiece } =
        calculateBestMoveRoot(3, currentBoardPositions);
      setColorToMove("w");
      const board = currentBoardPositions;
      board[bestMoveFromSquare as Square] = undefined;
      board[bestMoveToSquare as Square] = bestPiece;
      setCurrentBoardPositions(board);
    }
  }, [colorToMove, currentBoardPositions]);

  const handleColorToMoveChange = () =>
    setColorToMove((state) => (state === "w" ? "b" : "w"));

  const handlePieceDrop = (source: Square, target: Square, piece: Piece) => {
    const { allAttackedSquares, kingPositions } = attackedSquares(
      colorToMove,
      currentBoardPositions,
    );
    let canBeBlocked: Square[] = [];
    const checked = isChecked(colorToMove, kingPositions, allAttackedSquares);

    if (checked) {
      canBeBlocked = canCheckBeBlocked(colorToMove, currentBoardPositions);
      if (canBeBlocked.length && !canBeBlocked.includes(source)) return false;
    }
    if (piece[0] !== colorToMove) return false;

    if (
      isCheckmated(
        kingPositions,
        colorToMove,
        allAttackedSquares,
        canBeBlocked,
        currentBoardPositions,
      )
    ) {
      updateIsCheckmate();
      return false;
    }

    const isValidMove = handlePieceMove(
      piece,
      source,
      target,
      currentBoardPositions,
      setCurrentBoardPositions,
      addPointsForWhite,
      addPointsForBlack,
    );

    if (isValidMove) handleColorToMoveChange();

    return isValidMove;
  };

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
