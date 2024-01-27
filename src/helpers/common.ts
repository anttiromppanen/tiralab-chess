import { Piece } from "react-chessboard/dist/chessboard/types";

export const horizontalBoard = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const isPieceWhite = (piece: Piece) => piece[0] === "w";
