import { sig } from "@stratumn/js-crypto";
import * as b64 from "base64-js";
import * as constants from "./const";
import { Link } from "./link";
import { stratumn } from "./proto/chainscript_pb";

export const ErrUnknownSignatureVersion = new TypeError(
  "unknown signature version"
);
export const ErrSignatureMissing = new TypeError("signature bytes are missing");
export const ErrSignaturePublicKeyMissing = new TypeError(
  "signature public key is missing"
);
export const ErrInvalidSignature = new TypeError("signature is invalid");

/**
 * A signature of configurable parts of a link.
 * Different signature types and versions are allowed to sign different
 * encodings of the data, but we recommend signing a hash of the
 * protobuf-encoded bytes.
 */
export class Signature {
  private s: stratumn.chainscript.ISignature;

  constructor(s: stratumn.chainscript.ISignature) {
    this.s = s;
  }

  /**
   * @returns the version of the signature scheme.
   */
  public version(): string {
    return this.s.version || "";
  }

  /**
   * @returns the algorithm used (for example, "EdDSA").
   */
  public type(): string {
    return this.s.type || "";
  }

  /**
   * @returns a description of the parts of the link that are signed.
   */
  public payloadPath(): string {
    return this.s.payloadPath || "";
  }

  /**
   * @returns the public key of the signer.
   */
  public publicKey(): Uint8Array {
    return this.s.publicKey || new Uint8Array(0);
  }

  /**
   * @returns the signature bytes.
   */
  public signature(): Uint8Array {
    return this.s.signature || new Uint8Array(0);
  }

  /**
   * Validate the signature and throw an exception if invalid.
   * @param link the link signed.
   */
  public validate(link: Link): void {
    if (!this.publicKey() || this.publicKey().length === 0) {
      throw ErrSignaturePublicKeyMissing;
    }

    if (!this.signature() || this.signature().length === 0) {
      throw ErrSignatureMissing;
    }

    switch (this.version()) {
      case constants.SIGNATURE_VERSION_1_0_0:
        const signed = link.signedBytes(this.version(), this.payloadPath());
        const publicKey = new sig.SigningPublicKey({
          pemPublicKey: atob(b64.fromByteArray(this.publicKey()))
        });

        const valid = publicKey.verify({
          message: btoa(b64.fromByteArray(signed)),
          signature: b64.fromByteArray(this.signature())
        });

        if (!valid) {
          throw ErrInvalidSignature;
        }
        return;
      default:
        throw ErrUnknownSignatureVersion;
    }
  }
}
