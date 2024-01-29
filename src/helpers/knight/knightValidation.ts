import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { horizontalBoard } from "../common";

export const validKnightMovesFromSquare = (
  source: Square,
  piece: Piece,
  currentBoard: BoardPosition,
) => {
  const validKnightMoves: Square[] = [];
  const sourceRowLetter = source[0];
  const sourceColumnNumber = Number(source[1]);
  const sourceRowAsIndex = horizontalBoard.indexOf(sourceRowLetter);

  const allMoves = [
    [-2, 1],
    [-2, -1],
    [-1, 2],
    [-1, -2],
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
  ];

  allMoves.forEach(([rowOffset, colOffset]) => {
    const newRow = sourceRowAsIndex + rowOffset;
    const newCol = sourceColumnNumber + colOffset;

    if (
      newRow >= 0 &&
      newRow < horizontalBoard.length &&
      newCol >= 1 &&
      newCol <= 8
    ) {
      const square = `${horizontalBoard[newRow]}${newCol}` as Square;
      // push if square doesn't have same color piece in it
      if (piece[0] !== currentBoard[square]?.[0]) validKnightMoves.push(square);
    }
  });

  return validKnightMoves;
};

const knightValidation = () => {};

export default knightValidation;
