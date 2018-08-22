/**
 * A process is a collection of maps (process instances).
 * A map is a collection of links that track the process' progress.
 */
export class Process {
  public readonly name: string;
  public readonly state: string;

  constructor(name: string, state?: string) {
    this.name = name;
    this.state = "";

    if (state) {
      this.state = state;
    }
  }
}
