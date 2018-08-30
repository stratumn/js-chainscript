#!/usr/bin/env node

/* tslint:disable:no-console */

run(process.argv[2]);

/**
 * Execute commands to produce or validate chainscript data.
 * @param action to execute.
 */
function run(action: string): void {
  switch (action) {
    case "generate":
      console.log("Generating encoded chainscript");
      return;
    case "validate":
      console.log("Validating encoded chainscript");
      return;
    default:
      console.log(`Unknown action ${action}`);
  }
}
