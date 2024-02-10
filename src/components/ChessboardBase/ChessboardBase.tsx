import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { initialBoardPosition } from "../../const/common";
import generateAllMovesFromPosition from "../../helpers/generateAllMovesFromPosition";
import handlePieceMove from "../../helpers/moveValidation";
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
  const [colorToMove, setColorToMove] = useState<"w" | "b">("w");
  const [allMovesOnBoard, setAllMovesOnBoard] = useState(
    generateAllMovesFromPosition(currentBoardPositions),
  );

  useEffect(() => {
    if (colorToMove === "b")
      setAllMovesOnBoard(generateAllMovesFromPosition(currentBoardPositions));
  }, [colorToMove, currentBoardPositions]);

  const handleColorToMoveChange = () =>
    setColorToMove((state) => (state === "w" ? "b" : "w"));

  const handlePieceDrop = (source: Square, target: Square, piece: Piece) => {
    if (piece[0] !== colorToMove) return false;

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
  console.log(allMovesOnBoard);
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
