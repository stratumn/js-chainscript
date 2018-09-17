// Copyright 2017-2018 Stratumn SAS. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as b64 from "base64-js";
import { IConversionOptions } from "protobufjs";
import * as errors from "./errors";
import { Evidence, fromProto as evidenceFromProto } from "./evidence";
import { Link } from "./link";
import { stratumn } from "./proto/chainscript_pb";

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
 * Convert an plain object to a segment.
 * @param segment plain object.
 */
export function fromObject(segment: any): Segment {
  return new Segment(stratumn.chainscript.Segment.fromObject(segment));
}

/**
 * A segment describes an atomic step in your process.
 */
export class Segment {
  private pbLink: stratumn.chainscript.Link;
  private pbSegment: stratumn.chainscript.Segment;

  constructor(pbSegment: stratumn.chainscript.Segment) {
    if (!pbSegment.link) {
      throw errors.ErrLinkMissing;
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
      throw errors.ErrDuplicateEvidence;
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
   * Convert to a plain object.
   * @argument conversionOpts specify how to convert certain types
   * @returns a plain object.
   */
  public toObject(conversionOpts?: IConversionOptions): any {
    return stratumn.chainscript.Segment.toObject(
      this.pbSegment,
      conversionOpts
    );
  }

  /**
   * Validate checks for errors in a segment.
   */
  public validate(): void {
    if (!this.pbSegment.meta) {
      throw errors.ErrSegmentMetaMissing;
    }

    if (!this.linkHash() || this.linkHash().length === 0) {
      throw errors.ErrLinkHashMissing;
    }

    if (
      b64.fromByteArray(this.linkHash()) !==
      b64.fromByteArray(this.link().hash())
    ) {
      throw errors.ErrLinkHashMismatch;
    }

    this.link().validate();
  }
}
