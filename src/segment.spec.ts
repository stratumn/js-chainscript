import { ErrUnknownLinkVersion, Link } from "./link";
import { LinkBuilder } from "./link_builder";
import { Link as PbLink } from "./proto/chainscript_pb";
import { Segment } from "./segment";

describe("segment", () => {
  it("rejects unknown version", () => {
    const link = new PbLink();
    link.setVersion("0.42.0");

    expect(() => new Segment(link)).toThrowError(ErrUnknownLinkVersion);
  });

  it("sets link hash", () => {
    const segment = new LinkBuilder("p", "m").build().segmentify();

    expect(segment.linkHash()).toHaveLength(32);
    expect(segment.link().process().name).toEqual("p");
    expect(segment.link().mapId()).toEqual("m");
  });
});
