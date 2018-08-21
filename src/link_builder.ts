import * as constants from "./const";
import { Link } from "./link";
import {
  Link as PbLink,
  LinkMeta as PbLinkMeta,
  Process as PbProcess
} from "./proto/chainscript_pb";

/**
 * ILinkBuilder makes it easy to create links that adhere to the ChainScript
 * spec.
 * It provides valid default values for required fields and allows the user
 * to set fields to valid values.
 */
export interface ILinkBuilder {
  /**
   * Set the link action.
   * The action is what caused the link to be created.
   */
  withAction(action: string): void;

  /** build the link. */
  build(): Link;
}

/**
 * LinkBuilder makes it easy to create links that adhere to the ChainScript
 * spec.
 * It provides valid default values for required fields and allows the user
 * to set fields to valid values.
 */
export class LinkBuilder implements ILinkBuilder {
  private link: PbLink;

  constructor(process: string, mapId: string) {
    this.link = new PbLink();
    this.link.setVersion(constants.LINK_VERSION);

    if (!process) {
      throw new TypeError("process is missing");
    }

    if (!mapId) {
      throw new TypeError("map id is missing");
    }

    const proc = new PbProcess();
    proc.setName(process);

    const meta = new PbLinkMeta();
    meta.setMapId(mapId);
    meta.setProcess(proc);
    meta.setClientId(constants.ClientId);

    this.link.setMeta(meta);
  }

  public withAction(action: string): void {
    (this.link.getMeta() as PbLinkMeta).setAction(action);
  }

  public build(): Link {
    return new Link(this.link);
  }
}
