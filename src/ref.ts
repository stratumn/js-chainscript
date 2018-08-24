export const ErrMissingProcess = new TypeError("process is missing");
export const ErrMissingLinkHash = new TypeError("link hash is missing");

/**
 * A reference to a link that can be in another process.
 */
export class LinkReference {
  public linkHash: Uint8Array;
  public process: string;

  constructor(linkHash: Uint8Array, process: string) {
    if (!process) {
      throw ErrMissingProcess;
    }

    if (!linkHash || linkHash.length === 0) {
      throw ErrMissingLinkHash;
    }

    this.linkHash = linkHash;
    this.process = process;
  }
}
