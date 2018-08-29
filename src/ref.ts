import * as errors from "./errors";

/**
 * A reference to a link that can be in another process.
 */
export class LinkReference {
  public linkHash: Uint8Array;
  public process: string;

  constructor(linkHash: Uint8Array, process: string) {
    if (!process) {
      throw errors.ErrLinkProcessMissing;
    }

    if (!linkHash || linkHash.length === 0) {
      throw errors.ErrLinkHashMissing;
    }

    this.linkHash = linkHash;
    this.process = process;
  }
}
