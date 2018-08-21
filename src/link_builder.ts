import { Link } from "./link";
import {
  Link as PbLink,
  LinkMeta as PbLinkMeta,
  Process as PbProcess
} from "./proto/chainscript_pb";

/**
 * LinkVersion_1_0_0 is the first version of the link encoding.
 * In that version we encode interfaces (link.data and link.meta.data) with
 * canonical JSON and hash the protobuf-encoded link bytes with SHA-256.
 */
const LINK_VERSION_1_0_0 = "1.0.0";
/** The current link version. */
const LINK_VERSION = LINK_VERSION_1_0_0;

/**
 * ILinkBuilder makes it easy to create links that adhere to the ChainScript
 * spec.
 * It provides valid default values for required fields and allows the user
 * to set fields to valid values.
 */
export interface ILinkBuilder {
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
    this.link.setVersion(LINK_VERSION);

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

    this.link.setMeta(meta);
  }

  public build(): Link {
    return new Link(this.link);
  }
}
