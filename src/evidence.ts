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

import * as errors from "./errors";
import { stratumn } from "./proto/chainscript_pb";

/**
 * Create an evidence from a protobuf object.
 * @param e protobuf evidence.
 */
export function fromProto(e: stratumn.chainscript.IEvidence): Evidence {
  return new Evidence(
    e.version || "",
    e.backend || "",
    e.provider || "",
    e.proof || new Uint8Array(0)
  );
}

/**
 * Evidences can be used to externally verify a link's existence at a given
 * moment in time.
 * An evidence can be a proof of inclusion in a public blockchain, a timestamp
 * signed by a trusted authority or anything that you trust to provide an
 * immutable ordering of your process' steps.
 */
export class Evidence {
  /** Evidence version. Useful to correctly deserialize proof bytes. */
  public version: string;
  /** Identifier of the evidence type. */
  public backend: string;
  /** Instance of the backend used. */
  public provider: string;
  /** Serialized proof. */
  public proof: Uint8Array;

  constructor(
    version: string,
    backend: string,
    provider: string,
    proof: Uint8Array
  ) {
    this.version = version;
    this.backend = backend;
    this.provider = provider;
    this.proof = proof;

    this.validate();
  }

  /**
   * Validate that the evidence is well-formed.
   * The proof is opaque bytes so it isn't validated here.
   */
  public validate(): void {
    if (!this.version) {
      throw errors.ErrEvidenceVersionMissing;
    }

    if (!this.backend) {
      throw errors.ErrEvidenceBackendMissing;
    }

    if (!this.provider) {
      throw errors.ErrEvidenceProviderMissing;
    }

    if (!this.proof || this.proof.length === 0) {
      throw errors.ErrEvidenceProofMissing;
    }
  }
}
