import { Link as PbLink } from "./proto/chainscript_pb";

const ErrLinkMetaMissing = new TypeError("link meta is missing");
const ErrLinkProcessMissing = new TypeError("link process is missing");

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
   * A link always belong to an instance of a process.
   * @returns the link's process name.
   */
  public process(): string {
    const meta = this.link.getMeta();
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    const process = meta.getProcess();
    if (!process) {
      throw ErrLinkProcessMissing;
    }

    return process.getName();
  }

  /**
   * The link version is used to properly serialize and deserialize it.
   * @returns the link version.
   */
  public version(): string {
    return this.link.getVersion();
  }
}
