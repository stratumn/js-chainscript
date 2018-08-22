import { parse, stringify } from "canonicaljson";
import * as constants from "./const";
import { Process } from "./process";
import { Link as PbLink } from "./proto/chainscript_pb";

export const ErrLinkMetaMissing = new TypeError("link meta is missing");
export const ErrLinkProcessMissing = new TypeError("link process is missing");
export const ErrUnknownClientId = new TypeError(
  "link was created with a unknown client: can't deserialize it"
);
export const ErrUnknownLinkVersion = new TypeError("unknown link version");

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

    switch (this.version()) {
      case constants.LINK_VERSION_1_0_0:
        return parse(this.link.getData());
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
   * Set the given object as the link's data.
   * @param data custom data to save with the link.
   */
  public setData(data: any): void {
    this.verifyCompatibility();

    switch (this.version()) {
      case constants.LINK_VERSION_1_0_0:
        return this.link.setData(stringify(data));
      default:
        throw ErrUnknownLinkVersion;
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
