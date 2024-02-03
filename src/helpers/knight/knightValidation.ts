import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { arePiecesDifferentColor } from "../common";
import { horizontalBoard } from "../../const/common";

interface KnightValidationProps {
  source: Square;
  target: Square;
  piece: Piece;
  currentBoard: BoardPosition;
  setCurrentBoard: (board: BoardPosition) => void;
}

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
      if (arePiecesDifferentColor(piece, square, currentBoard))
        validKnightMoves.push(square);
    }
  });

  return validKnightMoves;
};

export const canKnightCapture = (
  source: Square,
  target: Square,
  piece: Piece,
  currentBoard: BoardPosition,
) => {
  const validMoves = validKnightMovesFromSquare(source, piece, currentBoard);
  return (
    validMoves.includes(target) &&
    currentBoard[target] !== undefined &&
    arePiecesDifferentColor(piece, target, currentBoard)
  );
};

const validKnightMove = ({
  source,
  target,
  piece,
  currentBoard,
  setCurrentBoard,
}: KnightValidationProps) => {
  const validMoves = validKnightMovesFromSquare(source, piece, currentBoard);

  if (validMoves.includes(target)) {
    const newBoard = currentBoard;
    newBoard[target] = piece;
    newBoard[source] = undefined;
    setCurrentBoard(newBoard);
    return true;
  }

  return false;
};

export default validKnightMove;
