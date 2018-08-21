import { Link as PbLink } from "./proto/chainscript_pb";

const ErrLinkMetaMissing = new TypeError("link meta is missing");
const ErrLinkProcessMissing = new TypeError("link process is missing");

export class Link {
  private link: PbLink;

  constructor(link: PbLink) {
    this.link = link;
  }

  /** @returns the link version. */
  public version(): string {
    return this.link.getVersion();
  }

  public clientId(): string {
    const meta = this.link.getMeta();
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.getClientId();
  }

  /** @returns the link's map id. */
  public mapId(): string {
    const meta = this.link.getMeta();
    if (!meta) {
      throw ErrLinkMetaMissing;
    }

    return meta.getMapId();
  }

  /** @returns the link's process name. */
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
}
