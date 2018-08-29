import * as errors from "./errors";
import { Evidence, fromProto } from "./evidence";
import { stratumn } from "./proto/chainscript_pb";

describe("evidence", () => {
  const proofData = Uint8Array.from([42]);

  it("rejects missing version", () => {
    expect(
      () => new Evidence("", "bitcoin", "mainnet", proofData)
    ).toThrowError(errors.ErrEvidenceVersionMissing);
  });

  it("rejects missing backend", () => {
    expect(() => new Evidence("0.1.0", "", "mainnet", proofData)).toThrowError(
      errors.ErrEvidenceBackendMissing
    );
  });

  it("rejects missing provider", () => {
    expect(() => new Evidence("0.1.0", "bitcoin", "", proofData)).toThrowError(
      errors.ErrEvidenceProviderMissing
    );
  });

  it("rejects missing proof", () => {
    expect(
      () => new Evidence("0.1.0", "bitcoin", "mainnet", new Uint8Array(0))
    ).toThrowError(errors.ErrEvidenceProofMissing);
  });

  it("converts from valid proto", () => {
    const e = new stratumn.chainscript.Evidence();
    e.version = "1.0.0";
    e.backend = "bitcoin";
    e.provider = "testnet";
    e.proof = Uint8Array.from([42]);

    const evidence = fromProto(e);
    expect(evidence.version).toEqual(e.version);
    expect(evidence.backend).toEqual(e.backend);
    expect(evidence.provider).toEqual(e.provider);
    expect(evidence.proof).toEqual(e.proof);
  });

  it("rejects invalid proto", () => {
    expect(() => fromProto(new stratumn.chainscript.Evidence())).toThrowError(
      errors.ErrEvidenceVersionMissing
    );
  });
});
