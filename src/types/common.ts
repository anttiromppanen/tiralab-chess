import { Piece, Square } from "react-chessboard/dist/chessboard/types";

export type WhitePieceValues = "wP" | "wB" | "wN" | "wR" | "wQ" | "wK";
export type BlackPieceValues = "bP" | "bB" | "bN" | "bR" | "bQ" | "bK";
export type AllMovesTable = Record<Square, Piece[]>;
