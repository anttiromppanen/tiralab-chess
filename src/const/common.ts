import { BoardPosition, Piece } from "react-chessboard/dist/chessboard/types";
import { BlackPieceValues, WhitePieceValues } from "../types/common";

const initialBoardPosition: BoardPosition = {
  a8: "bR",
  b8: "bN",
  c8: "bB",
  d8: "bQ",
  e8: "bK",
  f8: "bB",
  g8: "bN",
  h8: "bR",
  a7: "bP",
  b7: "bP",
  c7: "bP",
  d7: "bP",
  e7: "bP",
  f7: "bP",
  g7: "bP",
  h7: "bP",
  a2: "wP",
  b2: "wP",
  c2: "wP",
  d2: "wP",
  e2: "wP",
  f2: "wP",
  g2: "wP",
  h2: "wP",
  a1: "wR",
  b1: "wN",
  c1: "wB",
  d1: "wQ",
  e1: "wK",
  f1: "wB",
  g1: "wN",
  h1: "wR",
};

const pieceValues: Piece[] = [
  "wP",
  "wB",
  "wN",
  "wR",
  "wQ",
  "wK",
  "bP",
  "bB",
  "bN",
  "bR",
  "bQ",
  "bK",
];

const whitePieceValues: WhitePieceValues[] = [
  "wP",
  "wB",
  "wN",
  "wR",
  "wQ",
  "wK",
];

const blackPieceValues: BlackPieceValues[] = [
  "bP",
  "bB",
  "bN",
  "bR",
  "bQ",
  "bK",
];

export const horizontalBoardByLetter: { [key: string]: number } = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
};
export const horizontalBoardByIndex: { [key: number]: string } = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
  4: "e",
  5: "f",
  6: "g",
  7: "h",
};

export {
  blackPieceValues,
  initialBoardPosition,
  pieceValues,
  whitePieceValues,
};
