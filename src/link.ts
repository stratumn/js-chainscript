import { Link as LinkProto } from "./proto/chainscript_pb";

export class Link {
  private link: LinkProto;

  constructor(link: LinkProto) {
    this.link = link;
  }

  /** @returns the link version. */
  public version(): string {
    return this.link.getVersion();
  }

  /** @returns the link's map id. */
  public mapId(): string {
    const meta = this.link.getMeta();
    if (!meta) {
      throw new TypeError("link meta is missing");
    }

    return meta.getMapId();
  }

  /** @returns the link's process name. */
  public process(): string {
    const meta = this.link.getMeta();
    if (!meta) {
      throw new TypeError("link meta is missing");
    }

    const process = meta.getProcess();
    if (!process) {
      throw new TypeError("link process is missing");
    }

    return process.getName();
  }
}
