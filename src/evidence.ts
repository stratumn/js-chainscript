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
