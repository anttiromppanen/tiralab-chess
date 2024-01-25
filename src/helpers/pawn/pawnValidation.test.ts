import { initialBoardPosition } from "../../const/common";
import validPawnMove, {
  validMoveForwardForBlack,
  validMoveForwardForWhite,
} from "./pawnValidation";

describe("Pawn", () => {
  let board = initialBoardPosition;

  afterEach(() => {
    board = initialBoardPosition;
  });

  describe("Moves with board", () => {
    describe("White", () => {
      it("should succeed for one tile move in right direction on y-axis", () => {
        const move = validPawnMove(board, "e2", "e3", "wP", () => board);
        expect(move).toBe(true);
      });

      it("should capture successfully from left side", () => {
        board.d5 = "bP";
        const move = validPawnMove(board, "e4", "d5", "wP", () => board);
        expect(move).toBe(true);
      });

      it("should capture successfully from right side", () => {
        board.b4 = "bP";
        const move = validPawnMove(board, "a3", "b4", "wP", () => board);
        expect(move).toBe(true);
      });

      it("moving on y-axis should fail when tile is blocked", () => {
        board.d5 = "bP";
        const move = validPawnMove(board, "d4", "d5", "wP", () => board);

        expect(move).toBe(false);
      });
    });

    describe("Black", () => {
      it("should succeed for one tile move in right direction on y-axis", () => {
        const move = validPawnMove(board, "f5", "f4", "bP", () => board);
        expect(move).toBe(true);
      });

      it("should capture successfully from left side", () => {
        board.d4 = "wP";
        const move = validPawnMove(board, "e5", "d4", "bP", () => board);
        expect(move).toBe(true);
      });

      it("should capture successfully from right side", () => {
        board.f5 = "wP";
        const move = validPawnMove(board, "e6", "f5", "bP", () => board);
        expect(move).toBe(true);
      });

      it("moving on y-axis should fail when tile is blocked", () => {
        board.f4 = "wP";
        const move = validPawnMove(board, "f5", "f4", "bP", () => board);

        expect(move).toBe(false);
      });
    });
  });

  describe("Moves without board", () => {
    describe("White", () => {
      it("should succeed with correct direction on y-axis", () => {
        const move = validMoveForwardForWhite("d2", "d3");
        expect(move).toBe(true);
      });

      it("should fail with incorrect direction on y-axis", () => {
        const move = validMoveForwardForWhite("f5", "f4");
        expect(move).toBe(false);
      });

      it("should fail when more than 1 tile is moved on y-axis", () => {
        const move = validMoveForwardForWhite("e3", "e5");
        expect(move).toBe(false);
      });

      it("should fail when y-axis changes without capturing a piece", () => {
        const move = validMoveForwardForWhite("c4", "d4");
        expect(move).toBe(false);
      });
    });

    describe("Black", () => {
      it("should succeed with correct direction on y-axis", () => {
        const move = validMoveForwardForBlack("c7", "c6");
        expect(move).toBe(true);
      });

      it("should fail with incorrect direction on y-axis", () => {
        const move = validMoveForwardForBlack("a3", "a4");
        expect(move).toBe(false);
      });

      it("should fail when more than 1 tile is moved on y-axis", () => {
        const move = validMoveForwardForBlack("g7", "g5");
        expect(move).toBe(false);
      });

      it("should fail when y-axis changes without capturing a piece", () => {
        const move = validMoveForwardForBlack("b4", "a4");
        expect(move).toBe(false);
      });
    });
  });
});
