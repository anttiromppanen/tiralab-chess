import { initialBoardPosition } from "../../const/common";
import scoreEvaluation from "./scoreEvaluation";

describe("scoreEvaluation.ts", () => {
  let initialBoard = initialBoardPosition;

  beforeEach(() => {
    initialBoard = initialBoardPosition;
  });

  it("should return correct score in the beginning", () => {
    const score = scoreEvaluation(initialBoard);

    expect(score).toBe(0);
  });
});
