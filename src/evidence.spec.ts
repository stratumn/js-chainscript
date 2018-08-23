import {
  ErrMissingBackend,
  ErrMissingProof,
  ErrMissingProvider,
  ErrMissingVersion,
  Evidence
} from "./evidence";

describe("evidence", () => {
  const proofData = Uint8Array.from([42]);

  it("rejects missing version", () => {
    expect(
      () => new Evidence("", "bitcoin", "mainnet", proofData)
    ).toThrowError(ErrMissingVersion);
  });

  it("rejects missing backend", () => {
    expect(() => new Evidence("0.1.0", "", "mainnet", proofData)).toThrowError(
      ErrMissingBackend
    );
  });

  it("rejects missing provider", () => {
    expect(() => new Evidence("0.1.0", "bitcoin", "", proofData)).toThrowError(
      ErrMissingProvider
    );
  });

  it("rejects missing proof", () => {
    expect(
      () => new Evidence("0.1.0", "bitcoin", "mainnet", new Uint8Array(0))
    ).toThrowError(ErrMissingProof);
  });
});
