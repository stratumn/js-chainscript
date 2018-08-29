import * as b64 from "base64-js";
import {
  ErrDuplicateEvidence,
  Evidence,
  fromProto as evidenceFromProto
} from "./evidence";
import { Link } from "./link";
import { stratumn } from "./proto/chainscript_pb";

export const ErrLinkMissing = new TypeError("link is missing");
export const ErrLinkHashMissing = new TypeError("link hash is missing");
export const ErrLinkHashMismatch = new TypeError("link hash mismatch");
export const ErrSegmentMetaMissing = new TypeError("segment meta is missing");

/**
 * GetSegmentFunc fetches segments from a store.
 * It can be used to validate that references exist.
 */
export type GetSegmentFunc = (linkHash: Uint8Array) => Segment;

/**
 * Deserialize a segment.
 * @param segmentBytes encoded bytes.
 * @returns the deserialized segment.
 */
export function deserialize(segmentBytes: Uint8Array): Segment {
  const segment = stratumn.chainscript.Segment.decode(segmentBytes);
  return new Segment(segment);
}

/**
 * A segment describes an atomic step in your process.
 */
export class Segment {
  private pbLink: stratumn.chainscript.Link;
  private pbSegment: stratumn.chainscript.Segment;

  constructor(pbSegment: stratumn.chainscript.Segment) {
    if (!pbSegment.link) {
      throw ErrLinkMissing;
    }

    this.pbLink = pbSegment.link as stratumn.chainscript.Link;
    this.pbSegment = pbSegment;

    if (!this.pbSegment.meta) {
      this.pbSegment.meta = new stratumn.chainscript.SegmentMeta();
    }

    const link = new Link(this.pbLink);
    this.pbSegment.meta.linkHash = link.hash();
  }

  /**
   * The segment can be enriched with evidence that the link was saved
   * immutably somewhere.
   * @param e evidence.
   */
  public addEvidence(e: Evidence): void {
    e.validate();

    if (this.getEvidence(e.backend, e.provider)) {
      throw ErrDuplicateEvidence;
    }

    const pbEvidence = new stratumn.chainscript.Evidence();
    pbEvidence.version = e.version;
    pbEvidence.backend = e.backend;
    pbEvidence.provider = e.provider;
    pbEvidence.proof = e.proof;

    const segmentMeta = this.pbSegment.meta as stratumn.chainscript.SegmentMeta;
    segmentMeta.evidences.push(pbEvidence);
  }

  /**
   * Return all the evidences in this segment.
   * @returns evidences.
   */
  public evidences(): Evidence[] {
    const segmentMeta = this.pbSegment.meta as stratumn.chainscript.SegmentMeta;
    return segmentMeta.evidences.map(evidenceFromProto);
  }

  /**
   * Return all the evidences of a specific backend.
   * @param backend of the expected evidences.
   * @returns evidences.
   */
  public findEvidences(backend: string): Evidence[] {
    const segmentMeta = this.pbSegment.meta as stratumn.chainscript.SegmentMeta;
    return segmentMeta.evidences
      .filter(e => e.backend === backend)
      .map(evidenceFromProto);
  }

  /**
   * Retrieve the evidence for the given backend and provider (if one exists).
   * @param backend evidence backend.
   * @param provider evidence backend instance.
   * @returns the evidence or null.
   */
  public getEvidence(backend: string, provider: string): Evidence | null {
    const segmentMeta = this.pbSegment.meta as stratumn.chainscript.SegmentMeta;
    const evidences = segmentMeta.evidences;

    for (const current of evidences) {
      if (current.backend === backend && current.provider === provider) {
        return evidenceFromProto(current);
      }
    }

    return null;
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
    return (this.pbSegment.meta as stratumn.chainscript.SegmentMeta).linkHash;
  }

  /**
   * Serialize the segment.
   * @returns segment bytes.
   */
  public serialize(): Uint8Array {
    return stratumn.chainscript.Segment.encode(this.pbSegment).finish();
  }

  /**
   * Validate checks for errors in a segment.
   */
  public validate(getSegment: GetSegmentFunc): void {
    if (!this.pbSegment.meta) {
      throw ErrSegmentMetaMissing;
    }

    if (!this.linkHash() || this.linkHash().length === 0) {
      throw ErrLinkHashMissing;
    }

    if (
      b64.fromByteArray(this.linkHash()) !==
      b64.fromByteArray(this.link().hash())
    ) {
      throw ErrLinkHashMismatch;
    }

    this.link().validate(getSegment);
  }
}
