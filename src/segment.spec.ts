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

    const serialized = segment.serialize();
    const segment2 = deserialize(serialized);

    expect(segment2.linkHash()).toEqual(segment.linkHash());
    expect(segment2.linkHash()).toEqual(segment.link().hash());
  });
});
