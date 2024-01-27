import { Piece } from "react-chessboard/dist/chessboard/types";

const captureCalculation = (pieceCaptured: Piece): number => {
  const pieceWithoutColor = pieceCaptured[1];

  switch (pieceWithoutColor) {
    case "P":
      return 1;
    case "N":
      return 3;
    case "B":
      return 3.5;
    case "R":
      return 5;
    case "Q":
      return 9;
    case "K":
      return 1000;
    default:
      return 0;
  }
};

export default captureCalculation;
