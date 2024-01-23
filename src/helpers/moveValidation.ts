import { Piece } from "react-chessboard/dist/chessboard/types";

const horizontalBoard = ["a", "b", "c", "d", "e", "f", "g", "h"];

const isPieceWhite = (piece: Piece) => piece[0] === "w";

export { horizontalBoard, isPieceWhite };
