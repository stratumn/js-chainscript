import { Link } from "./link";
import {
  Link as PbLink,
  Segment as PbSegment,
  SegmentMeta as PbSegmentMeta
} from "./proto/chainscript_pb";

export const ErrMissingLink = new TypeError("link is missing");

/**
 * Deserialize a segment.
 * @param segmentBytes encoded bytes.
 * @returns the deserialized segment.
 */
export function deserialize(segmentBytes: Uint8Array): Segment {
  const pbSegment = PbSegment.deserializeBinary(segmentBytes);
  return new Segment(pbSegment);
}

/**
 * A segment describes an atomic step in your process.
 */
export class Segment {
  private pbLink: PbLink;
  private pbSegment: PbSegment;

  constructor(pbSegment: PbSegment) {
    const pbLink = pbSegment.getLink();
    if (!pbLink) {
      throw ErrMissingLink;
    }

    this.pbLink = pbLink;
    this.pbSegment = pbSegment;

    let meta = this.pbSegment.getMeta();
    if (!meta) {
      meta = new PbSegmentMeta();
      this.pbSegment.setMeta(meta);
    }

    const link = new Link(pbLink);
    meta.setLinkHash(link.hash());
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

  /**
   * Serialize the segment.
   * @returns segment bytes.
   */
  public serialize(): Uint8Array {
    return this.pbSegment.serializeBinary();
  }
}
