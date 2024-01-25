import { useState } from "react";
import { Chessboard } from "react-chessboard";
import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { initialBoardPosition } from "../../const/common";
import validPawnMove from "../../helpers/pawn/pawnValidation";

function ChessboardBase() {
  const [currentPosition, setCurrentPosition] =
    useState<BoardPosition>(initialBoardPosition);

  const handlePieceDrop = (source: Square, target: Square, piece: Piece) =>
    validPawnMove(currentPosition, source, target, piece, setCurrentPosition);

  return (
    <div className="w-1/3">
      <Chessboard
        id="tiralab-chessboard"
        position={currentPosition}
        onPieceDrop={(source, target, piece) =>
          handlePieceDrop(source, target, piece)
        }
      />
    </div>
  );
}

export default ChessboardBase;
