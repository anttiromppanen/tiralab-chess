import { BoardPosition, Square } from "react-chessboard/dist/chessboard/types";
import attackedSquares from "../attackedSquares";
import validKingMovesFromSquare from "../king/kingValidation";

export const isChecked = (inTurn: "w" | "b", currentBoard: BoardPosition) => {
  const { allAttackedSquares, kingPositions } = attackedSquares(
    inTurn,
    currentBoard,
  );
  const whiteKingPosition = kingPositions.w as Square;
  const blackKingPosition = kingPositions.b as Square;
  let isKingAttacked;
  let possibleMovesAfterCheck;

  if (inTurn === "w") isKingAttacked = whiteKingPosition in allAttackedSquares;
  else isKingAttacked = blackKingPosition in allAttackedSquares;

  if (inTurn === "w") {
    possibleMovesAfterCheck = validKingMovesFromSquare(
      whiteKingPosition,
      "wK",
      currentBoard,
    );
  } else {
    possibleMovesAfterCheck = validKingMovesFromSquare(
      blackKingPosition,
      "bK",
      currentBoard,
    );
  }

  possibleMovesAfterCheck = possibleMovesAfterCheck.filter(
    (square) => !(square in allAttackedSquares),
  );

  return { isKingAttacked, possibleMovesAfterCheck };
};

export const isCheckmated = (
  inTurn: "w" | "b",
  currentBoard: BoardPosition,
) => {
  const { isKingAttacked, possibleMovesAfterCheck } = isChecked(
    inTurn,
    currentBoard,
  );

  return isKingAttacked && !possibleMovesAfterCheck.length;
};
