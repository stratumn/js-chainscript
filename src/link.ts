import { sig } from "@stratumn/js-crypto";
import * as b64 from "base64-js";
import { parse, stringify } from "canonicaljson";
import sha256 from "fast-sha256";
import { search } from "jmespath";
import * as constants from "./const";
import { Process } from "./process";
import { stratumn } from "./proto/chainscript_pb";
import { LinkReference } from "./ref";
import { Segment } from "./segment";
import { ErrUnknownSignatureVersion, Signature } from "./signature";

export const ErrLinkMetaMissing = new TypeError("link meta is missing");
export const ErrLinkProcessMissing = new TypeError("link process is missing");
export const ErrUnknownClientId = new TypeError(
  "link was created with an unknown client: can't deserialize it"
);
export const ErrUnknownLinkVersion = new TypeError("unknown link version");

/**
 * Deserialize a link.
 * @param linkBytes encoded bytes.
 * @returns the deserialized link.
 */
export function deserialize(linkBytes: Uint8Array): Link {
  const pbLink = stratumn.chainscript.Link.decode(linkBytes);
  return new Link(pbLink);
}

/**
 * A link is the immutable part of a segment.
 * A link contains all the data that represents a process' step.
 */
export class Link {
  private link: stratumn.chainscript.Link;

  constructor(link: stratumn.chainscript.Link) {
    this.link = link;
  }

  /**
   * A link is usually created as a result of an action.
   * @returns the link's action.
   */
  public action(): string {
    const meta = this.link.meta;
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.action || "";
  }

  /**
   * The client id allows segment receivers to figure out how the segment was
   * encoded and can be decoded.
   * @returns the link's client id.
   */
  public clientId(): string {
    const meta = this.link.meta;
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.clientId || "";
  }

  /**
   * The link data (business logic details about the execution of a process step).
   * @returns the object containing the link details.
   */
  public data(): any {
    this.verifyCompatibility();

    const linkData = this.link.data;
    if (!linkData || linkData.length === 0) {
      return undefined;
    }

    switch (this.version()) {
      case constants.LINK_VERSION_1_0_0:
        return parse(atob(b64.fromByteArray(linkData)));
      default:
        throw ErrUnknownLinkVersion;
    }
  }

  /**
   * Serialize the link and compute a hash of the resulting bytes.
   * The serialization and hashing algorithm used depend on the link version.
   * @returns the hash bytes.
   */
  public hash(): Uint8Array {
    switch (this.version()) {
      case constants.LINK_VERSION_1_0_0:
        const linkBytes = stratumn.chainscript.Link.encode(this.link).finish();
        return sha256(linkBytes);
      default:
        throw ErrUnknownLinkVersion;
    }
  }

  /**
   * A link always belongs to a specific process map.
   * @returns the link's map id.
   */
  public mapId(): string {
    const meta = this.link.meta;
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.mapId || "";
  }

  /**
   * The link metadata can contain a custom object.
   * @returns the object containing the link metadata details.
   */
  public metadata(): any {
    this.verifyCompatibility();

    const linkMetadata = (this.link.meta as stratumn.chainscript.LinkMeta).data;
    if (!linkMetadata || linkMetadata.length === 0) {
      return undefined;
    }

    switch (this.version()) {
      case constants.LINK_VERSION_1_0_0:
        return parse(atob(b64.fromByteArray(linkMetadata)));
      default:
        throw ErrUnknownLinkVersion;
    }
  }

  /**
   * A link can have a parent, referenced by its link hash.
   * @returns the parent link hash.
   */
  public prevLinkHash(): Uint8Array {
    const meta = this.link.meta;
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.prevLinkHash || new Uint8Array(0);
  }

  /**
   * The priority can be used to order links.
   * @returns the link's priority.
   */
  public priority(): number {
    const meta = this.link.meta;
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.priority || 0;
  }

  /**
   * A link always belong to an instance of a process.
   * @returns the link's process name.
   */
  public process(): Process {
    const meta = this.link.meta;
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    const process = meta.process;
    if (!process) {
      throw ErrLinkProcessMissing;
    }

    return new Process(process.name || "", process.state || "");
  }

  /**
   * A link can contain references to other links.
   * @returns referenced links.
   */
  public refs(): LinkReference[] {
    const meta = this.link.meta;
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    if (!meta.refs) {
      return new Array<LinkReference>(0);
    }

    return meta.refs.map(
      ref =>
        new LinkReference(ref.linkHash || new Uint8Array(0), ref.process || "")
    );
  }

  /**
   * Create a segment from the link.
   * @returns the segment wrapping the link.
   */
  public segmentify(): Segment {
    const segment = new stratumn.chainscript.Segment();
    segment.link = this.link;
    return new Segment(segment);
  }

  /**
   * Serialize the link.
   * @returns link bytes.
   */
  public serialize(): Uint8Array {
    return stratumn.chainscript.Link.encode(this.link).finish();
  }

  /**
   * Set the given object as the link's data.
   * @param data custom data to save with the link.
   */
  public setData(data: any): void {
    this.verifyCompatibility();

    switch (this.version()) {
      case constants.LINK_VERSION_1_0_0:
        this.link.data = b64.toByteArray(btoa(stringify(data)));
        return;
      default:
        throw ErrUnknownLinkVersion;
    }
  }

  /**
   * Set the given object as the link's metadata.
   * @param data custom data to save with the link metadata.
   */
  public setMetadata(data: any): void {
    this.verifyCompatibility();

    if (!this.link.meta) {
      throw ErrLinkMetaMissing;
    }

    switch (this.version()) {
      case constants.LINK_VERSION_1_0_0:
        this.link.meta.data = b64.toByteArray(btoa(stringify(data)));
        return;
      default:
        throw ErrUnknownLinkVersion;
    }
  }

  /**
   * Sign configurable parts of the link with the current signature version.
   * The payloadPath is used to select what parts of the link need to be signed
   * with the given private key. If no payloadPath is provided, the whole link
   * is signed.
   * The signature is added to the link's signature list.
   * @param key private key in PEM format (generated by @stratumn/js-crypto).
   * @param payloadPath link parts that should be signed.
   */
  public sign(key: Uint8Array, payloadPath: string): void {
    const privateKey = new sig.SigningPrivateKey({
      pemPrivateKey: key
    });

    const toSign = this.signedBytes(constants.SIGNATURE_VERSION, payloadPath);
    const signature = privateKey.sign(b64.fromByteArray(toSign));

    const s = new stratumn.chainscript.Signature();
    s.version = constants.SIGNATURE_VERSION;
    s.type = signature.AI;
    s.payloadPath = payloadPath;
    s.publicKey = b64.toByteArray(signature.public_key);
    s.signature = b64.toByteArray(signature.signature);

    this.link.signatures.push(s);
  }

  /**
   * @returns the link's signatures (if any).
   */
  public signatures(): Signature[] {
    return this.link.signatures.map(s => {
      return new Signature(s);
    });
  }

  /**
   * Compute the bytes that should be signed.
   * @argument version impacts how those bytes are computed.
   * @argument payloadPath parts of the link that should be signed.
   * @returns bytes to be signed.
   */
  public signedBytes(version: string, payloadPath: string): Uint8Array {
    switch (version) {
      case constants.SIGNATURE_VERSION_1_0_0:
        if (!payloadPath) {
          payloadPath = "[version,data,meta]";
        }

        const payloadData = search(this.link.toJSON(), payloadPath);
        const jsonData = stringify(payloadData) as string;
        const payloadBytes = new Uint8Array(jsonData.length);
        for (let i = 0; i < jsonData.length; i++) {
          payloadBytes[i] = jsonData.charCodeAt(i);
        }

        return sha256(payloadBytes);
      default:
        throw ErrUnknownSignatureVersion;
    }
  }

  /**
   * (Optional) A link can be interpreted as a step in a process.
   * @returns the corresponding process step.
   */
  public step(): string {
    const meta = this.link.meta;
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.step || "";
  }

  /**
   * (Optional) A link can be tagged.
   * Tags are useful to filter link search results.
   * @returns link tags.
   */
  public tags(): string[] {
    const meta = this.link.meta;
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.tags || [];
  }

  /**
   * Validate checks for errors in a link.
   */
  public validate(): void {
    this.link.signatures.map(s => {
      new Signature(s).validate(this);
    });
  }

  /**
   * The link version is used to properly serialize and deserialize it.
   * @returns the link version.
   */
  public version(): string {
    return this.link.version;
  }

  /**
   * Check if the link is compatible with the current library.
   * If not compatible, will throw an exception.
   */
  private verifyCompatibility(): void {
    const meta = this.link.meta;
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    const clientId = meta.clientId;
    if (!clientId) {
      throw ErrUnknownClientId;
    }

    const compatibleClients = [
      constants.ClientId,
      "github.com/stratumn/go-chainscript"
    ];

    if (compatibleClients.indexOf(clientId) < 0) {
      throw ErrUnknownClientId;
    }
  }
}
