import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { validKnightMovesFromSquare } from "./knight/knightValidation";
import { validBishopMovesFromSquare } from "./bishop/bishopValidation";
import validRookMovesFromSquare from "./rook/rookValidation";
import validQueenMovesFromSquare from "./queen/queenValidation";
import validKingMovesFromSquare from "./king/kingValidation";
import { validPawnMovesFromSquare } from "./pawn/pawnValidation";

export interface MoveInfo {
  square: Square;
  piece: Piece;
  moves: Square[];
}

const generateAllMovesFromPosition = (currentBoard: BoardPosition) => {
  const allMovesOnBoardTable: MoveInfo[] = [];
  let pawnMoves: Square[] = [];
  let knightMoves: Square[] = [];
  let bishopMoves: Square[] = [];
  let rookMoves: Square[] = [];
  let queenMoves: Square[] = [];
  let kingMoves: Square[] = [];

  Object.entries(currentBoard).forEach(([key, value]) => {
    // get moves only if there is a piece on the square
    if (key && value !== undefined) {
      const pieceWithoutColor = value[1];
      switch (pieceWithoutColor) {
        case "P":
          pawnMoves = validPawnMovesFromSquare(
            key as Square,
            value,
            currentBoard,
          );
          if (pawnMoves.length) {
            allMovesOnBoardTable.push({
              square: key as Square,
              piece: value as Piece,
              moves: pawnMoves,
            });
          }
          break;
        case "N":
          knightMoves = validKnightMovesFromSquare(
            key as Square,
            value,
            currentBoard,
          );
          if (knightMoves.length) {
            allMovesOnBoardTable.push({
              square: key as Square,
              piece: value as Piece,
              moves: knightMoves,
            });
          }
          break;
        case "B":
          bishopMoves = validBishopMovesFromSquare(
            key as Square,
            value,
            currentBoard,
          );
          if (bishopMoves.length) {
            allMovesOnBoardTable.push({
              square: key as Square,
              piece: value as Piece,
              moves: bishopMoves,
            });
          }
          break;
        case "R":
          rookMoves = validRookMovesFromSquare(
            key as Square,
            value,
            currentBoard,
          );
          if (rookMoves.length) {
            allMovesOnBoardTable.push({
              square: key as Square,
              piece: value as Piece,
              moves: rookMoves,
            });
          }
          break;
        case "Q":
          queenMoves = validQueenMovesFromSquare(
            key as Square,
            value,
            currentBoard,
          );
          if (queenMoves.length) {
            allMovesOnBoardTable.push({
              square: key as Square,
              piece: value as Piece,
              moves: queenMoves,
            });
          }
          break;
        case "K":
          kingMoves = validKingMovesFromSquare(
            key as Square,
            value,
            currentBoard,
          );
          if (kingMoves.length) {
            allMovesOnBoardTable.push({
              square: key as Square,
              piece: value as Piece,
              moves: kingMoves,
            });
          }
          break;
        default:
          break;
      }
    }
  });

  return allMovesOnBoardTable;
};

export default generateAllMovesFromPosition;
