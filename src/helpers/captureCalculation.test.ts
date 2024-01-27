import captureCalculation from "./captureCalculation";

describe("captureCalculation.ts", () => {
  it("should return 1 for pawn", () => {
    const resultForWhite = captureCalculation("wP");
    const resultForBlack = captureCalculation("bP");

    expect(resultForWhite).toBe(1);
    expect(resultForBlack).toBe(1);
  });

  it("should return 3 for knight", () => {
    const resultForWhite = captureCalculation("wN");
    const resultForBlack = captureCalculation("bN");

    expect(resultForWhite).toBe(3);
    expect(resultForBlack).toBe(3);
  });

  it("should return 3.5 for bishop", () => {
    const resultForWhite = captureCalculation("wB");
    const resultForBlack = captureCalculation("bB");

    expect(resultForWhite).toBe(3.5);
    expect(resultForBlack).toBe(3.5);
  });

  it("should return 5 for rook", () => {
    const resultForWhite = captureCalculation("wR");
    const resultForBlack = captureCalculation("bR");

    expect(resultForWhite).toBe(5);
    expect(resultForBlack).toBe(5);
  });

  it("should return 9 for queen", () => {
    const resultForWhite = captureCalculation("wQ");
    const resultForBlack = captureCalculation("bQ");

    expect(resultForWhite).toBe(9);
    expect(resultForBlack).toBe(9);
  });

  it("should return 1000 for king", () => {
    const resultForWhite = captureCalculation("wK");
    const resultForBlack = captureCalculation("bK");

    expect(resultForWhite).toBe(1000);
    expect(resultForBlack).toBe(1000);
  });
});
