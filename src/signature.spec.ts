import * as errors from "./errors";
import { LinkBuilder } from "./link_builder";
import { stratumn } from "./proto/chainscript_pb";
import { Signature } from "./signature";

describe("signature", () => {
  it("uses empty default values", () => {
    const s = new Signature(new stratumn.chainscript.Signature());
    expect(s.version()).toEqual("");
    expect(s.payloadPath()).toEqual("");
    expect(s.publicKey()).toHaveLength(0);
    expect(s.signature()).toHaveLength(0);
  });

  it("wraps a proto signature", () => {
    const pb = new stratumn.chainscript.Signature();
    pb.version = "0.1.0";
    pb.payloadPath = "[data]";
    pb.publicKey = Uint8Array.from([42]);
    pb.signature = Uint8Array.from([24]);

    const s = new Signature(pb);
    expect(s.version()).toEqual("0.1.0");
    expect(s.payloadPath()).toEqual("[data]");
    expect(s.publicKey()).toEqual(pb.publicKey);
    expect(s.signature()).toEqual(pb.signature);
  });

  describe("validate", () => {
    it("unknown version", () => {
      const pb = new stratumn.chainscript.Signature();
      pb.version = "0.42.0";
      pb.publicKey = Uint8Array.from([42]);
      pb.signature = Uint8Array.from([42]);

      const s = new Signature(pb);
      expect(() => s.validate(new LinkBuilder("p", "m").build())).toThrowError(
        errors.ErrSignatureVersionUnknown
      );
    });

    it("missing public key", () => {
      const pb = new stratumn.chainscript.Signature();
      pb.version = "1.0.0";
      pb.signature = Uint8Array.from([42]);

      const s = new Signature(pb);
      expect(() => s.validate(new LinkBuilder("p", "m").build())).toThrowError(
        errors.ErrSignaturePublicKeyMissing
      );
    });

    it("missing signature", () => {
      const pb = new stratumn.chainscript.Signature();
      pb.version = "1.0.0";
      pb.publicKey = Uint8Array.from([42]);

      const s = new Signature(pb);
      expect(() => s.validate(new LinkBuilder("p", "m").build())).toThrowError(
        errors.ErrSignatureMissing
      );
    });
  });
});
