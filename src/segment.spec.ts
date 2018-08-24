import {
  ErrDuplicateEvidence,
  ErrMissingBackend,
  ErrMissingProof,
  ErrMissingProvider,
  ErrMissingVersion,
  Evidence
} from "./evidence";
import { ErrUnknownLinkVersion } from "./link";
import { LinkBuilder } from "./link_builder";
import {
  Link as PbLink,
  LinkMeta as PbLinkMeta,
  Segment as PbSegment,
  SegmentMeta as PbSegmentMeta
} from "./proto/chainscript_pb";
import { deserialize, ErrMissingLink, Segment } from "./segment";

describe("segment", () => {
  it("rejects unknown version", () => {
    const link = new PbLink();
    link.setVersion("0.42.0");

    const segment = new PbSegment();
    segment.setLink(link);

    expect(() => new Segment(segment)).toThrowError(ErrUnknownLinkVersion);
  });

  it("rejects missing link", () => {
    expect(() => new Segment(new PbSegment())).toThrowError(ErrMissingLink);
  });

  it("resets link hash", () => {
    const linkMeta = new PbLinkMeta();
    linkMeta.setClientId("github.com/stratumn/go-chainscript");

    const link = new PbLink();
    link.setVersion("1.0.0");
    link.setMeta(linkMeta);

    const segmentMeta = new PbSegmentMeta();
    segmentMeta.setLinkHash(Uint8Array.from([42, 42]));

    const pbSegment = new PbSegment();
    pbSegment.setLink(link);
    pbSegment.setMeta(segmentMeta);

    const segment = new Segment(pbSegment);
    expect(segment.linkHash()).toHaveLength(32);
    expect(segment.link().clientId()).toEqual(
      "github.com/stratumn/go-chainscript"
    );
  });

  it("serializes and deserializes correctly", () => {
    const segment = new LinkBuilder("p", "m")
      .withData({ name: "spongebob" })
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

    expect(segment2.linkHash()).toEqual(segment.linkHash());
    expect(segment2.linkHash()).toEqual(segment.link().hash());
    expect(segment2.evidences()).toHaveLength(1);
    expect(segment2.evidences()[0]).toEqual(btcEvidence);
  });

  describe("evidences", () => {
    function createEvidence(): Evidence {
      return new Evidence("0.1.0", "bitcoin", "testnet", Uint8Array.from([42]));
    }

    it("rejects missing version", () => {
      const e = createEvidence();
      e.version = "";

      const segment = new LinkBuilder("p", "m").build().segmentify();
      expect(() => segment.addEvidence(e)).toThrowError(ErrMissingVersion);
    });

    it("rejects missing backend", () => {
      const e = createEvidence();
      e.backend = "";

      const segment = new LinkBuilder("p", "m").build().segmentify();
      expect(() => segment.addEvidence(e)).toThrowError(ErrMissingBackend);
    });

    it("rejects missing provider", () => {
      const e = createEvidence();
      e.provider = "";

      const segment = new LinkBuilder("p", "m").build().segmentify();
      expect(() => segment.addEvidence(e)).toThrowError(ErrMissingProvider);
    });

    it("rejects missing proof", () => {
      const e = createEvidence();
      e.proof = new Uint8Array(0);

      const segment = new LinkBuilder("p", "m").build().segmentify();
      expect(() => segment.addEvidence(e)).toThrowError(ErrMissingProof);
    });

    it("rejects duplicate evidence", () => {
      const e = createEvidence();
      const segment = new LinkBuilder("p", "m").build().segmentify();
      segment.addEvidence(e);
      expect(() => segment.addEvidence(e)).toThrowError(ErrDuplicateEvidence);
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
});
