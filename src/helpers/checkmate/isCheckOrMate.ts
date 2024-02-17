import { BoardPosition, Square } from "react-chessboard/dist/chessboard/types";
import {
  AttackedSquaresItemType,
  attackedSquaresAfterCheck,
} from "../attackedSquares";
import generateAllMovesFromPosition, {
  MoveInfo,
} from "../generateAllMovesFromPosition";
import validKingMovesFromSquare from "../king/kingValidation";

export const canCheckBeBlocked = (
  inTurn: "w" | "b",
  currentBoard: BoardPosition,
) => {
  const { allAttackedSquares, kingPositions } = attackedSquaresAfterCheck(
    inTurn,
    currentBoard,
  );
  const kingPositionInTurn = kingPositions[inTurn] as "w" | "b";
  const allMoves = generateAllMovesFromPosition(currentBoard);
  const allMovesByColor = allMoves.filter((item) => {
    const { piece } = item;
    const pieceColor = piece[0];
    const pieceType = piece[1];
    if (pieceColor === inTurn && pieceType !== "K") return item;
    return false;
  });

  const filterList = (
    movesByColor: MoveInfo[],
    attackedSquaresByPiece: Record<string, AttackedSquaresItemType>,
  ) => {
    const attackedSquaresArray =
      attackedSquaresByPiece[kingPositionInTurn]?.[0]?.attackedSquaresByPiece ??
      [];

    return movesByColor.filter(({ moves }) =>
      attackedSquaresArray.some((square) => moves.includes(square)),
    );
  };

  const piecesAbleToBlock = filterList(allMovesByColor, allAttackedSquares);

  return piecesAbleToBlock.map(({ square }) => square);
};

export const possibleKingMovesAfterCheck = (
  inTurn: "w" | "b",
  kingPositions: Record<"w" | "b", string | undefined>,
  allAttackedSquares: Record<string, boolean>,
  currentBoard: BoardPosition,
) => {
  const whiteKingPosition = kingPositions.w as Square;
  const blackKingPosition = kingPositions.b as Square;
  let possibleMovesAfterCheck;

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

  return possibleMovesAfterCheck;
};

export const isChecked = (
  inTurn: "w" | "b",
  kingPositions: Record<"w" | "b", string | undefined>,
  allAttackedSquares: Record<string, boolean>,
) => {
  const whiteKingPosition = kingPositions.w as Square;
  const blackKingPosition = kingPositions.b as Square;
  let isKingAttacked;
  if (inTurn === "w") isKingAttacked = whiteKingPosition in allAttackedSquares;
  else isKingAttacked = blackKingPosition in allAttackedSquares;

  return isKingAttacked;
};

export const isCheckmated = (
  kingPositions: Record<"w" | "b", string | undefined>,
  inTurn: "w" | "b",
  allAttackedSquares: Record<string, boolean>,
  canBeBlocked: Square[],
  currentBoard: BoardPosition,
) => {
  const isKingAttacked = isChecked(inTurn, kingPositions, allAttackedSquares);
  const possibleMovesAfterCheck = possibleKingMovesAfterCheck(
    inTurn,
    kingPositions,
    allAttackedSquares,
    currentBoard,
  );

  return (
    isKingAttacked && !possibleMovesAfterCheck.length && !canBeBlocked.length
  );
};
