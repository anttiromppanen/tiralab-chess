import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { BoardPosition } from "react-chessboard/dist/chessboard/types";

function ChessboardBase() {
  const [currentPosition, setCurrentPosition] = useState<BoardPosition | null>(
    null,
  );
  console.log(currentPosition);
  return (
    <div className="w-1/3">
      <Chessboard
        id="tiralab-chessboard"
        getPositionObject={(pos) => setCurrentPosition(pos)}
      />
    </div>
  );
}

export default ChessboardBase;
