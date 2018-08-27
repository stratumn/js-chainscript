import * as constants from "./const";
import { Link } from "./link";
import { stratumn } from "./proto/chainscript_pb";
import { ErrMissingLinkHash, ErrMissingProcess, LinkReference } from "./ref";

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
  withAction(action: string): ILinkBuilder;

  /**
   * Set the link data (custom object containing business logic details).
   * @param data link details.
   */
  withData(data: any): ILinkBuilder;

  /**
   * Set the link metadata (custom object containing business logic details).
   * @param data link metadata.
   */
  withMetadata(data: any): ILinkBuilder;

  /**
   * Set the link's parent.
   * @param linkHash parent's link hash.
   */
  withParent(linkHash: Uint8Array): ILinkBuilder;

  /**
   * Set the link's priority. The priority is used to order links.
   * @param priority a positive float.
   */
  withPriority(priority: number): ILinkBuilder;

  /**
   * (Optional) Set the link process' state.
   * The process can be in a specific state depending on the actions taken.
   * @param state process state after the link action.
   */
  withProcessState(state: string): ILinkBuilder;

  /**
   * (Optional) A link can reference other links, even if they are from other
   * processes.
   * @param refs references to relevant links.
   */
  withRefs(refs: LinkReference[]): ILinkBuilder;

  /**
   * (Optional) Set the link's process step.
   * It can be used to help deserialize link data or filter link search results.
   * @param step link process step.
   */
  withStep(step: string): ILinkBuilder;

  /**
   * (Optional) A link can be tagged.
   * Tags are useful to filter link search results.
   * @param tags link tags.
   */
  withTags(tags: string[]): ILinkBuilder;

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
  private link: stratumn.chainscript.Link;
  private linkData: any;
  private linkMetadata: any;

  constructor(process: string, mapId: string) {
    this.link = new stratumn.chainscript.Link();
    this.link.version = constants.LINK_VERSION;

    if (!process) {
      throw new TypeError("process is missing");
    }

    if (!mapId) {
      throw new TypeError("map id is missing");
    }

    this.link.meta = new stratumn.chainscript.LinkMeta();
    this.link.meta.clientId = constants.ClientId;
    this.link.meta.mapId = mapId;
    this.link.meta.process = new stratumn.chainscript.Process();
    this.link.meta.process.name = process;
  }

  public withAction(action: string): ILinkBuilder {
    (this.link.meta as stratumn.chainscript.LinkMeta).action = action;
    return this;
  }

  public withData(data: any): ILinkBuilder {
    this.linkData = data;
    return this;
  }

  public withMetadata(data: any): ILinkBuilder {
    this.linkMetadata = data;
    return this;
  }

  public withParent(linkHash: Uint8Array): ILinkBuilder {
    if (!linkHash || linkHash.length === 0) {
      throw new TypeError("link hash is missing");
    }

    (this.link.meta as stratumn.chainscript.LinkMeta).prevLinkHash = linkHash;
    return this;
  }

  public withPriority(priority: number): ILinkBuilder {
    if (priority < 0) {
      throw new TypeError("priority needs to be positive");
    }

    (this.link.meta as stratumn.chainscript.LinkMeta).priority = priority;
    return this;
  }

  public withProcessState(state: string): ILinkBuilder {
    const meta = this.link.meta as stratumn.chainscript.LinkMeta;
    const process = meta.process as stratumn.chainscript.Process;
    process.state = state;
    return this;
  }

  public withRefs(refs: LinkReference[]): ILinkBuilder {
    const meta = this.link.meta as stratumn.chainscript.LinkMeta;
    const newRefs = refs.map(ref => {
      if (!ref.process) {
        throw ErrMissingProcess;
      }

      if (!ref.linkHash || ref.linkHash.length === 0) {
        throw ErrMissingLinkHash;
      }

      const pbRef = new stratumn.chainscript.LinkReference();
      pbRef.linkHash = ref.linkHash;
      pbRef.process = ref.process;

      return pbRef;
    });

    meta.refs.push(...newRefs);

    return this;
  }

  public withStep(step: string): ILinkBuilder {
    (this.link.meta as stratumn.chainscript.LinkMeta).step = step;
    return this;
  }

  public withTags(tags: string[]): ILinkBuilder {
    const meta = this.link.meta as stratumn.chainscript.LinkMeta;
    const newTags = tags.filter(t => t);

    meta.tags.push(...newTags);

    return this;
  }

  public build(): Link {
    const link = new Link(this.link);

    if (this.linkData) {
      link.setData(this.linkData);
    }

    if (this.linkMetadata) {
      link.setMetadata(this.linkMetadata);
    }

    return link;
  }
}
