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
   * @param action friendly name of the action.
   */
  withAction(action: string): void;

  /**
   * Set the link's parent.
   * @param linkHash parent's link hash.
   */
  withParent(linkHash: Uint8Array): void;

  /**
   * Set the link's priority. The priority is used to order links.
   * @param priority a positive float.
   */
  withPriority(priority: number): void;

  /**
   * (Optional) Set the link process' state.
   * The process can be in a specific state depending on the actions taken.
   * @param state process state after the link action.
   */
  withProcessState(state: string): void;

  /**
   * (Optional) Set the link's process step.
   * It can be used to help deserialize link data or filter link search results.
   * @param step link process step.
   */
  withStep(step: string): void;

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

  public withParent(linkHash: Uint8Array): void {
    if (!linkHash || linkHash.length === 0) {
      throw new TypeError("link hash is missing");
    }

    (this.link.getMeta() as PbLinkMeta).setPrevLinkHash(linkHash);
  }

  public withPriority(priority: number): void {
    if (priority < 0) {
      throw new TypeError("priority needs to be positive");
    }

    (this.link.getMeta() as PbLinkMeta).setPriority(priority);
  }

  public withProcessState(state: string): void {
    const meta = this.link.getMeta() as PbLinkMeta;
    const process = meta.getProcess() as PbProcess;
    process.setState(state);
  }

  public withStep(step: string): void {
    (this.link.getMeta() as PbLinkMeta).setStep(step);
  }

  public build(): Link {
    return new Link(this.link);
  }
}
