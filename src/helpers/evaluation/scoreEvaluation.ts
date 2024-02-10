import { BoardPosition, Piece } from "react-chessboard/dist/chessboard/types";
import { isPieceWhite } from "../common";

const pawnValue = 100;
const knightValue = 310;
const bishopValue = 320;
const rookValue = 500;
const queenValue = 900;

const getScoreForPiece = (piece: Piece) => {
  const pieceValue = piece[1];
  switch (pieceValue) {
    case "P":
      return pawnValue;
    case "N":
      return knightValue;
    case "B":
      return bishopValue;
    case "R":
      return rookValue;
    case "Q":
      return queenValue;
    default:
      return 0;
  }
};

const scoreEvaluation = (currentBoard: BoardPosition) => {
  let whiteScore = 0;
  let blackScore = 0;
  const pieces = Object.values(currentBoard);
  pieces.forEach((piece) => {
    if (isPieceWhite(piece)) whiteScore += getScoreForPiece(piece);
    else blackScore += getScoreForPiece(piece);
  });

  return whiteScore - blackScore;
};

export default scoreEvaluation;
