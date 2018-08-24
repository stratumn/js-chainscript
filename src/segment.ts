import { ErrDuplicateEvidence, Evidence } from "./evidence";
import { Link } from "./link";
import {
  Evidence as PbEvidence,
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
   * The segment can be enriched with evidence that the link was saved
   * immutably somewhere.
   * @param e evidence.
   */
  public addEvidence(e: Evidence): void {
    e.validate();

    if (this.getEvidence(e.backend, e.provider)) {
      throw ErrDuplicateEvidence;
    }

    const pbEvidence = new PbEvidence();
    pbEvidence.setVersion(e.version);
    pbEvidence.setBackend(e.backend);
    pbEvidence.setProvider(e.provider);
    pbEvidence.setProof(e.proof);

    (this.pbSegment.getMeta() as PbSegmentMeta).addEvidences(pbEvidence);
  }

  /**
   * Return all the evidences in this segment.
   * @returns evidences.
   */
  public evidences(): Evidence[] {
    return (this.pbSegment.getMeta() as PbSegmentMeta)
      .getEvidencesList()
      .map(
        e =>
          new Evidence(
            e.getVersion(),
            e.getBackend(),
            e.getProvider(),
            e.getProof_asU8()
          )
      );
  }

  /**
   * Return all the evidences of a specific backend.
   * @param backend of the expected evidences.
   * @returns evidences.
   */
  public findEvidences(backend: string): Evidence[] {
    return (this.pbSegment.getMeta() as PbSegmentMeta)
      .getEvidencesList()
      .filter(e => e.getBackend() === backend)
      .map(
        e =>
          new Evidence(
            e.getVersion(),
            e.getBackend(),
            e.getProvider(),
            e.getProof_asU8()
          )
      );
  }

  /**
   * Retrieve the evidence for the given backend and provider (if one exists).
   * @param backend evidence backend.
   * @param provider evidence backend instance.
   * @returns the evidence or null.
   */
  public getEvidence(backend: string, provider: string): Evidence | null {
    const evidences = (this.pbSegment.getMeta() as PbSegmentMeta).getEvidencesList();
    for (const current of evidences) {
      if (
        current.getBackend() === backend &&
        current.getProvider() === provider
      ) {
        return new Evidence(
          current.getVersion(),
          current.getBackend(),
          current.getProvider(),
          current.getProof_asU8()
        );
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
