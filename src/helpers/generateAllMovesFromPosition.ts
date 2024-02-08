import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { validKnightMovesFromSquare } from "./knight/knightValidation";
import { validBishopMovesFromSquare } from "./bishop/bishopValidation";

interface MoveInfo {
  piece: Piece;
  moves: Square[];
}

const generateAllMovesFromPosition = (currentBoard: BoardPosition) => {
  const allMovesOnBoardTable = {} as Record<Square, MoveInfo>;
  let knightMoves: Square[] = [];
  let bishopMoves: Square[] = [];

  Object.entries(currentBoard).forEach(([key, value]) => {
    if (key && value !== undefined) {
      const pieceWithoutColor = value[1];
      switch (pieceWithoutColor) {
        case "P":
          // todo, refactor pawnValidation
          break;
        case "N":
          knightMoves = validKnightMovesFromSquare(
            key as Square,
            value,
            currentBoard,
          );
          allMovesOnBoardTable[key as Square] = {
            piece: value as Piece,
            moves: knightMoves,
          };
          break;
        case "B":
          bishopMoves = validBishopMovesFromSquare(
            key as Square,
            value,
            currentBoard,
          );
          allMovesOnBoardTable[key as Square] = {
            piece: value as Piece,
            moves: bishopMoves,
          };
          break;
        default:
          break;
      }
    }
  });
  console.log(allMovesOnBoardTable);
};

export default generateAllMovesFromPosition;
