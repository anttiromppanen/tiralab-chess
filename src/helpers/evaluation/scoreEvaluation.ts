import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { horizontalBoardByLetter } from "../../const/common";
import { isPieceWhite } from "../common";
import generateAllMovesFromPosition from "../generateAllMovesFromPosition";

const pawnValue = 100;
const knightValue = 310;
const bishopValue = 320;
const rookValue = 500;
const queenValue = 900;
const kingValue = 10000;

const pieceSquareTablesWhite = {
  P: [
    [100, 100, 100, 100, 105, 100, 100, 100],
    [78, 83, 86, 73, 102, 82, 85, 90],
    [7, 29, 21, 44, 40, 31, 44, 7],
    [-17, 16, -2, 15, 14, 0, 15, -13],
    [-26, 3, 10, 9, 6, 1, 0, -23],
    [-22, 9, 5, -11, -10, -2, 3, -19],
    [-31, 8, -7, -37, -36, -14, 3, -31],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  N: [
    [-66, -53, -75, -75, -10, -55, -58, -70],
    [-3, -6, 100, -36, 4, 62, -4, -14],
    [10, 67, 1, 74, 73, 27, 62, -2],
    [24, 24, 45, 37, 33, 41, 25, 17],
    [-1, 5, 31, 21, 22, 35, 2, 0],
    [-18, 10, 13, 22, 18, 15, 11, -14],
    [-23, -15, 2, 0, 2, 0, -23, -20],
    [-74, -23, -26, -24, -19, -35, -22, -69],
  ],
  B: [
    [-59, -78, -82, -76, -23, -107, -37, -50],
    [-11, 20, 35, -42, -39, 31, 2, -22],
    [-9, 39, -32, 41, 52, -10, 28, -14],
    [25, 17, 20, 34, 26, 25, 15, 10],
    [13, 10, 17, 23, 17, 16, 0, 7],
    [14, 25, 24, 15, 8, 25, 20, 15],
    [19, 20, 11, 6, 7, 6, 20, 16],
    [-7, 2, -15, -12, -14, -15, -10, -10],
  ],
  R: [
    [35, 29, 33, 4, 37, 33, 56, 50],
    [55, 29, 56, 67, 55, 62, 34, 60],
    [19, 35, 28, 33, 45, 27, 25, 15],
    [0, 5, 16, 13, 18, -4, -9, -6],
    [-28, -35, -16, -21, -13, -29, -46, -30],
    [-42, -28, -42, -25, -25, -35, -26, -46],
    [-53, -38, -31, -26, -29, -43, -44, -53],
    [-30, -24, -18, 5, -2, -18, -31, -32],
  ],
  Q: [
    [6, 1, -8, -104, 69, 24, 88, 26],
    [14, 32, 60, -10, 20, 76, 57, 24],
    [-2, 43, 32, 60, 72, 63, 43, 2],
    [1, -16, 22, 17, 25, 20, -13, -6],
    [-14, -15, -2, -5, -1, -10, -20, -22],
    [-30, -6, -13, -11, -16, -11, -16, -27],
    [-36, -18, 0, -19, -15, -15, -21, -38],
    [-39, -30, -31, -13, -31, -36, -34, -42],
  ],
  K: [
    [4, 54, 47, -99, -99, 60, 83, -62],
    [-32, 10, 55, 56, 56, 55, 10, 3],
    [-62, 12, -57, 44, -67, 28, 37, -31],
    [-55, 50, 11, -4, -19, 13, 0, -49],
    [-55, -43, -52, -28, -51, -47, -8, -50],
    [-47, -42, -43, -79, -64, -32, -29, -32],
    [-4, 3, -14, -50, -57, -18, 13, 4],
    [17, 30, -3, -14, 6, -1, 40, 18],
  ],
  // Endgame King Table
  endgame_k: [
    [-50, -40, -30, -20, -20, -30, -40, -50],
    [-30, -20, -10, 0, 0, -10, -20, -30],
    [-30, -10, 20, 30, 30, 20, -10, -30],
    [-30, -10, 30, 40, 40, 30, -10, -30],
    [-30, -10, 30, 40, 40, 30, -10, -30],
    [-30, -10, 20, 30, 30, 20, -10, -30],
    [-30, -30, 0, 0, 0, 0, -30, -30],
    [-50, -30, -30, -30, -30, -30, -30, -50],
  ],
};

const getScoreForPiece = (piece: Piece, square: Square) => {
  const pieceColor = piece && piece[0];
  const pieceValue = piece && (piece[1] as keyof typeof pieceSquareTablesWhite);
  const tableForPiece = pieceSquareTablesWhite[pieceValue];
  const [file, rank] = square;
  const adjustedRank = pieceColor === "w" ? Number(rank) - 1 : 8 - Number(rank);

  const score = tableForPiece[adjustedRank][horizontalBoardByLetter[file]];

  switch (pieceValue) {
    case "P":
      return pawnValue + score;
    case "N":
      return knightValue + score;
    case "B":
      return bishopValue + score;
    case "R":
      return rookValue + score;
    case "Q":
      return queenValue + score;
    case "K":
      return kingValue + score;
    default:
      return 0;
  }
};

const scoreEvaluation = (currentBoard: BoardPosition) => {
  let whiteScore = 0;
  let blackScore = 0;
  Object.entries(currentBoard).forEach((item) => {
    const square = item[0] as Square;
    const piece = item[1] as Piece;

    if (piece === undefined || square === undefined) return;
    if (isPieceWhite(piece)) whiteScore += getScoreForPiece(piece, square);
    else blackScore += getScoreForPiece(piece, square);
  });

  return blackScore - whiteScore;
};

export const calculateBestMove = (
  depth: number,
  isMaximizingPlayer: boolean,
  alpha: number,
  beta: number,
  currentBoard: BoardPosition,
) => {
  let alphaValue = alpha;
  let betaValue = beta;

  if (depth <= 0) return scoreEvaluation(currentBoard);
  const newGameMoves = generateAllMovesFromPosition(currentBoard);

  // generateAllMovesFromPosition change structure to this form
  const movesArray = newGameMoves.flatMap(({ square, piece, moves }) =>
    moves.map((move) => ({ square, piece, move })),
  );

  let bestMove = isMaximizingPlayer ? -Infinity : Infinity;

  for (let i = 0; i < movesArray.length - 1; i += 1) {
    const currentMove = movesArray[i];
    const { square, piece, move } = currentMove;
    const newBoard = { ...currentBoard };
    newBoard[square] = undefined;
    newBoard[move] = piece;

    const evaluationResult = calculateBestMove(
      depth - 1,
      !isMaximizingPlayer,
      alpha,
      beta,
      newBoard,
    );

    if (isMaximizingPlayer) {
      bestMove = Math.max(bestMove, evaluationResult);
      alphaValue = Math.max(alpha, bestMove);
    } else {
      bestMove = evaluationResult;
      bestMove = Math.min(bestMove, evaluationResult);
      betaValue = Math.min(beta, bestMove);
    }

    newBoard[square] = currentBoard[square];
    newBoard[move] = currentBoard[move];

    if (betaValue <= alphaValue) break;
  }

  return bestMove;
};

export const calculateBestMoveRoot = (
  depth: number,
  currentBoard: BoardPosition,
): {
  bestMoveFromSquare: Square | null;
  bestMoveToSquare: Square | undefined;
  bestPiece: Piece | undefined;
} => {
  const newGameMoves = generateAllMovesFromPosition(currentBoard);
  const alpha = -Infinity;
  const beta = Infinity;
  let bestMove = -Infinity;
  let bestMoveToSquare: Square | undefined;
  let bestPiece: Piece | undefined;
  let bestMoveFromSquare: Square | null = null;

  // generateAllMovesFromPosition change structure to this form
  const movesArray = newGameMoves.flatMap(({ square, piece, moves }) =>
    moves.map((move) => ({ square, piece, move })),
  );

  movesArray.forEach(({ square, piece, move }) => {
    if (!isPieceWhite(piece)) {
      const newBoard = { ...currentBoard };
      newBoard[square] = undefined;
      newBoard[move] = piece;
      const value = calculateBestMove(depth - 1, true, alpha, beta, newBoard);

      newBoard[square] = currentBoard[square];
      newBoard[move] = currentBoard[move];

      if (value >= bestMove) {
        bestMove = value;
        bestMoveToSquare = move;
        bestMoveFromSquare = square;
        bestPiece = piece;
      }
    }
  });

  return { bestMoveFromSquare, bestMoveToSquare, bestPiece };
};

export default scoreEvaluation;
