import { Link } from "./link";
import {
  Link as PbLink,
  Segment as PbSegment,
  SegmentMeta as PbSegmentMeta
} from "./proto/chainscript_pb";

/**
 * A segment describes an atomic step in your process.
 */
export class Segment {
  private pbLink: PbLink;
  private pbSegment: PbSegment;

  constructor(pbLink: PbLink) {
    this.pbLink = pbLink;

    const link = new Link(pbLink);
    const segmentMeta = new PbSegmentMeta();
    segmentMeta.setLinkHash(link.hash());

    this.pbSegment = new PbSegment();
    this.pbSegment.setMeta(segmentMeta);
  }

  /**
   * The segment's link is its immutable part.
   * @returns the segment's link.
   */
  public link(): Link {
    return new Link(this.pbLink);
  }

  /**
   * Get the hash of the segment's link.
   * @returns the link's hash.
   */
  public linkHash(): Uint8Array {
    return (this.pbSegment.getMeta() as PbSegmentMeta).getLinkHash_asU8();
  }
}
