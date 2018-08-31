import * as errors from "./errors";
import { Evidence } from "./evidence";
import { LinkBuilder } from "./link_builder";
import { stratumn } from "./proto/chainscript_pb";
import { deserialize, Segment } from "./segment";

describe("segment", () => {
  it("rejects unknown version", () => {
    const link = new stratumn.chainscript.Link();
    link.version = "0.42.0";

    const segment = new stratumn.chainscript.Segment();
    segment.link = link;

    expect(() => new Segment(segment)).toThrowError(
      errors.ErrLinkVersionUnknown
    );
  });

  it("rejects missing link", () => {
    expect(() => new Segment(new stratumn.chainscript.Segment())).toThrowError(
      errors.ErrLinkMissing
    );
  });

  describe("version 1.0.0", () => {
    it("resets link hash", () => {
      const link = new stratumn.chainscript.Link();
      link.version = "1.0.0";
      link.meta = new stratumn.chainscript.LinkMeta();
      link.meta.clientId = "github.com/stratumn/go-chainscript";

      const pbSegment = new stratumn.chainscript.Segment();
      pbSegment.link = link;
      pbSegment.meta = new stratumn.chainscript.SegmentMeta();
      pbSegment.meta.linkHash = Uint8Array.from([42, 42]);

      const segment = new Segment(pbSegment);
      expect(segment.linkHash()).toHaveLength(32);
      expect(segment.link().clientId()).toEqual(
        "github.com/stratumn/go-chainscript"
      );
    });

    it("serializes and deserializes correctly", () => {
      const segment = new LinkBuilder("p", "m")
        .withAction("init")
        .withData({ name: "spongebob" })
        .withPriority(42)
        .withTags(["tag"])
        .build()
        .segmentify();

      const btcEvidence = new Evidence(
        "0.1.0",
        "bitcoin",
        "testnet",
        Uint8Array.from([42])
      );
      segment.addEvidence(btcEvidence);

      const serialized = segment.serialize();
      const segment2 = deserialize(serialized);
      segment2.validate();

      expect(segment2.link().action()).toEqual("init");
      expect(segment2.link().priority()).toEqual(42);
      expect(segment2.link().tags()).toEqual(["tag"]);

      expect(segment2.linkHash()).toEqual(segment.linkHash());
      expect(segment2.linkHash()).toEqual(segment.link().hash());
      expect(segment2.evidences()).toHaveLength(1);

      expect(segment2.evidences()[0].version).toEqual(btcEvidence.version);
      expect(segment2.evidences()[0].backend).toEqual(btcEvidence.backend);
      expect(segment2.evidences()[0].provider).toEqual(btcEvidence.provider);
      // Protobuf uses a buffer implementation that's portable between
      // browser and node to represent bytes.
      // We can't directly compare the objects because their type won't
      // match, so we compare the data inside.
      expect(segment2.evidences()[0].proof).toHaveLength(1);
      expect(segment2.evidences()[0].proof[0]).toEqual(42);
    });
  });

  describe("evidences", () => {
    function createEvidence(): Evidence {
      return new Evidence("0.1.0", "bitcoin", "testnet", Uint8Array.from([42]));
    }

    it("rejects missing version", () => {
      const e = createEvidence();
      e.version = "";

      const segment = new LinkBuilder("p", "m").build().segmentify();
      expect(() => segment.addEvidence(e)).toThrowError(
        errors.ErrEvidenceVersionMissing
      );
    });

    it("rejects missing backend", () => {
      const e = createEvidence();
      e.backend = "";

      const segment = new LinkBuilder("p", "m").build().segmentify();
      expect(() => segment.addEvidence(e)).toThrowError(
        errors.ErrEvidenceBackendMissing
      );
    });

    it("rejects missing provider", () => {
      const e = createEvidence();
      e.provider = "";

      const segment = new LinkBuilder("p", "m").build().segmentify();
      expect(() => segment.addEvidence(e)).toThrowError(
        errors.ErrEvidenceProviderMissing
      );
    });

    it("rejects missing proof", () => {
      const e = createEvidence();
      e.proof = new Uint8Array(0);

      const segment = new LinkBuilder("p", "m").build().segmentify();
      expect(() => segment.addEvidence(e)).toThrowError(
        errors.ErrEvidenceProofMissing
      );
    });

    it("rejects duplicate evidence", () => {
      const e = createEvidence();
      const segment = new LinkBuilder("p", "m").build().segmentify();
      segment.addEvidence(e);
      expect(() => segment.addEvidence(e)).toThrowError(
        errors.ErrDuplicateEvidence
      );
    });

    it("gets valid evidence", () => {
      const e = createEvidence();
      const segment = new LinkBuilder("p", "m").build().segmentify();
      segment.addEvidence(e);

      expect(segment.getEvidence(e.backend, e.provider)).toEqual(e);
    });

    it("gets no result", () => {
      const segment = new LinkBuilder("p", "m").build().segmentify();
      expect(segment.getEvidence("bitcoin", "testnet")).toBeNull();
    });

    it("finds valid evidences", () => {
      const e1 = createEvidence();
      const e2 = createEvidence();
      e2.backend = "ethereum";

      const segment = new LinkBuilder("p", "m").build().segmentify();
      segment.addEvidence(e1);
      segment.addEvidence(e2);

      expect(segment.findEvidences("ethereum")).toEqual([e2]);
      expect(segment.evidences()).toEqual([e1, e2]);
    });

    it("finds no result", () => {
      const e = createEvidence();
      const segment = new LinkBuilder("p", "m").build().segmentify();
      segment.addEvidence(e);

      expect(segment.findEvidences("ethereum")).toHaveLength(0);
    });
  });

  describe("validate", () => {
    it("link hash mismatch", () => {
      const link = new stratumn.chainscript.Link();
      link.version = "1.0.0";
      link.meta = new stratumn.chainscript.LinkMeta();
      link.meta.action = "init";

      const pbSegment = new stratumn.chainscript.Segment();
      pbSegment.link = link;

      const segment = new Segment(pbSegment);

      // Mutate the underlying link.
      link.meta.action = "override";

      expect(() => segment.validate()).toThrowError(errors.ErrLinkHashMismatch);
    });

    it("invalid link", () => {
      const link = new stratumn.chainscript.Link();
      link.version = "1.0.0";

      const pbSegment = new stratumn.chainscript.Segment();
      pbSegment.link = link;

      const segment = new Segment(pbSegment);
      expect(() => segment.validate()).toThrowError(errors.ErrLinkMetaMissing);
    });
  });
});
