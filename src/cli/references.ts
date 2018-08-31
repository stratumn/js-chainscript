import * as b64 from "base64-js";
import { LinkBuilder } from "../link_builder";
import { LinkReference } from "../ref";
import { deserialize } from "../segment";
import { ITestCase } from "./test_case";

/**
 * Test a segment with references.
 */
export class ReferencesTest implements ITestCase {
  public static id = "segment-references";

  public id(): string {
    return ReferencesTest.id;
  }

  public generate(): string {
    const segment = new LinkBuilder("test_process", "test_map")
      .withRefs([
        new LinkReference(Uint8Array.from([42]), "p1"),
        new LinkReference(Uint8Array.from([24]), "p2")
      ])
      .build()
      .segmentify();

    return b64.fromByteArray(segment.serialize());
  }

  public validate(encodedSegment: string): void {
    const segment = deserialize(b64.toByteArray(encodedSegment));
    segment.validate();

    const link = segment.link();
    const refs = link.refs();
    if (refs.length !== 2) {
      throw new Error(`Invalid references count: ${refs.length}`);
    }

    if (refs[0].process !== "p1") {
      throw new Error(`Invalid first reference process: ${refs[0].process}`);
    }
    if (refs[0].linkHash[0] !== 42) {
      throw new Error(`Invalid first reference link hash: ${refs[0].linkHash}`);
    }

    if (refs[1].process !== "p2") {
      throw new Error(`Invalid second reference process: ${refs[1].process}`);
    }
    if (refs[1].linkHash[0] !== 24) {
      throw new Error(
        `Invalid second reference link hash: ${refs[1].linkHash}`
      );
    }
  }
}
