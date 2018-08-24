import { parse, stringify } from "canonicaljson";
import sha256 from "fast-sha256";
import { search } from "jmespath";
import * as constants from "./const";
import { Process } from "./process";
import {
  Link as PbLink,
  LinkMeta as PbLinkMeta,
  Segment as PbSegment
} from "./proto/chainscript_pb";
import { LinkReference } from "./ref";
import { Segment } from "./segment";

export const ErrLinkMetaMissing = new TypeError("link meta is missing");
export const ErrLinkProcessMissing = new TypeError("link process is missing");
export const ErrUnknownClientId = new TypeError(
  "link was created with an unknown client: can't deserialize it"
);
export const ErrUnknownLinkVersion = new TypeError("unknown link version");
export const ErrUnknownSignatureVersion = new TypeError(
  "unknown signature version"
);

/**
 * Deserialize a link.
 * @param linkBytes encoded bytes.
 * @returns the deserialized link.
 */
export function deserialize(linkBytes: Uint8Array): Link {
  const pbLink = PbLink.deserializeBinary(linkBytes);
  return new Link(pbLink);
}

/**
 * A link is the immutable part of a segment.
 * A link contains all the data that represents a process' step.
 */
export class Link {
  private link: PbLink;

  constructor(link: PbLink) {
    this.link = link;
  }

  /**
   * A link is usually created as a result of an action.
   * @returns the link's action.
   */
  public action(): string {
    const meta = this.link.getMeta();
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.getAction();
  }

  /**
   * The client id allows segment receivers to figure out how the segment was
   * encoded and can be decoded.
   * @returns the link's client id.
   */
  public clientId(): string {
    const meta = this.link.getMeta();
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.getClientId();
  }

  /**
   * The link data (business logic details about the execution of a process step).
   * @returns the object containing the link details.
   */
  public data(): any {
    this.verifyCompatibility();

    const linkData = this.link.getData_asB64();
    if (!linkData) {
      return undefined;
    }

    switch (this.version()) {
      case constants.LINK_VERSION_1_0_0:
        return parse(atob(linkData));
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
        const linkBytes = this.link.serializeBinary();
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
    const meta = this.link.getMeta();
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.getMapId();
  }

  /**
   * The link metadata can contain a custom object.
   * @returns the object containing the link metadata details.
   */
  public metadata(): any {
    this.verifyCompatibility();

    const linkMetadata = (this.link.getMeta() as PbLinkMeta).getData_asB64();
    if (!linkMetadata) {
      return undefined;
    }

    switch (this.version()) {
      case constants.LINK_VERSION_1_0_0:
        return parse(atob(linkMetadata));
      default:
        throw ErrUnknownLinkVersion;
    }
  }

  /**
   * A link can have a parent, referenced by its link hash.
   * @returns the parent link hash.
   */
  public prevLinkHash(): Uint8Array {
    const meta = this.link.getMeta();
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.getPrevLinkHash_asU8();
  }

  /**
   * The priority can be used to order links.
   * @returns the link's priority.
   */
  public priority(): number {
    const meta = this.link.getMeta();
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.getPriority();
  }

  /**
   * A link always belong to an instance of a process.
   * @returns the link's process name.
   */
  public process(): Process {
    const meta = this.link.getMeta();
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    const process = meta.getProcess();
    if (!process) {
      throw ErrLinkProcessMissing;
    }

    return new Process(process.getName(), process.getState());
  }

  /**
   * A link can contain references to other links.
   * @returns referenced links.
   */
  public refs(): LinkReference[] {
    const meta = this.link.getMeta();
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    const pbRefs = meta.getRefsList();
    return pbRefs.map(
      ref => new LinkReference(ref.getLinkHash_asU8(), ref.getProcess())
    );
  }

  /**
   * Create a segment from the link.
   * @returns the segment wrapping the link.
   */
  public segmentify(): Segment {
    const pbSegment = new PbSegment();
    pbSegment.setLink(this.link);
    return new Segment(pbSegment);
  }

  /**
   * Serialize the link.
   * @returns link bytes.
   */
  public serialize(): Uint8Array {
    return this.link.serializeBinary();
  }

  /**
   * Set the given object as the link's data.
   * @param data custom data to save with the link.
   */
  public setData(data: any): void {
    this.verifyCompatibility();

    switch (this.version()) {
      case constants.LINK_VERSION_1_0_0:
        return this.link.setData(btoa(stringify(data)));
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

    switch (this.version()) {
      case constants.LINK_VERSION_1_0_0:
        return (this.link.getMeta() as PbLinkMeta).setData(
          btoa(stringify(data))
        );
      default:
        throw ErrUnknownLinkVersion;
    }
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

        const payloadData = search(this.link.toObject(), payloadPath);
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
    const meta = this.link.getMeta();
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.getStep();
  }

  /**
   * (Optional) A link can be tagged.
   * Tags are useful to filter link search results.
   * @returns link tags.
   */
  public tags(): string[] {
    const meta = this.link.getMeta();
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.getTagsList();
  }

  /**
   * The link version is used to properly serialize and deserialize it.
   * @returns the link version.
   */
  public version(): string {
    return this.link.getVersion();
  }

  /**
   * Check if the link is compatible with the current library.
   * If not compatible, will throw an exception.
   */
  private verifyCompatibility(): void {
    const meta = this.link.getMeta();
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    const clientId = meta.getClientId();
    const compatibleClients = [
      constants.ClientId,
      "github.com/stratumn/go-chainscript"
    ];

    if (compatibleClients.indexOf(clientId) < 0) {
      throw ErrUnknownClientId;
    }
  }
}
