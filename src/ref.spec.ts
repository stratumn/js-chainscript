import { ErrMissingLinkHash, ErrMissingProcess, LinkReference } from "./ref";

describe("link reference", () => {
  it("rejects missing process", () => {
    expect(() => new LinkReference(Uint8Array.from([42]), "")).toThrowError(
      ErrMissingProcess
    );
  });

  it("rejects missing link hash", () => {
    expect(() => new LinkReference(new Uint8Array(0), "p")).toThrowError(
      ErrMissingLinkHash
    );
  });

  it("creates a valid reference", () => {
    const ref = new LinkReference(Uint8Array.from([42]), "p");
    expect(ref.process).toEqual("p");
    expect(ref.linkHash).toEqual(Uint8Array.from([42]));
  });
});
