export const ErrMissingVersion = new TypeError("evidence version is missing");
export const ErrMissingBackend = new TypeError("evidence backend is missing");
export const ErrMissingProvider = new TypeError("evidence provider is missing");
export const ErrMissingProof = new TypeError("evidence proof is missing");

/**
 * Evidences can be used to externally verify a link's existence at a given
 * moment in time.
 * An evidence can be a proof of inclusion in a public blockchain, a timestamp
 * signed by a trusted authority or anything that you trust to provide an
 * immutable ordering of your process' steps.
 */
export class Evidence {
  /** Evidence version. Useful to correctly deserialize proof bytes. */
  public readonly version: string;
  /** Identifier of the evidence type. */
  public readonly backend: string;
  /** Instance of the backend used. */
  public readonly provider: string;
  /** Serialized proof. */
  public readonly proof: Uint8Array;

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
      throw ErrMissingVersion;
    }

    if (!this.backend) {
      throw ErrMissingBackend;
    }

    if (!this.provider) {
      throw ErrMissingProvider;
    }

    if (!this.proof || this.proof.length === 0) {
      throw ErrMissingProof;
    }
  }
}
