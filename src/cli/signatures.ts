import { sig } from "@stratumn/js-crypto";
import * as b64 from "base64-js";
import { LinkBuilder } from "../link_builder";
import { deserialize } from "../segment";
import { ITestCase } from "./test_case";

/**
 * Test a segment with signatures.
 */
export class SignaturesTest implements ITestCase {
  public static id = "segment-signatures";

  public id(): string {
    return SignaturesTest.id;
  }

  public generate(): string {
    const ed25519Key = new sig.SigningPrivateKey({
      algo: sig.SIGNING_ALGO_ED25519.name
    });

    const rsaKey = new sig.SigningPrivateKey({
      algo: sig.SIGNING_ALGO_RSA.name
    });

    const link = new LinkBuilder("test_process", "test_map").build();
    link.sign(ed25519Key.export(), "");
    link.sign(rsaKey.export(), "[version,meta.mapId]");

    const segment = link.segmentify();

    return b64.fromByteArray(segment.serialize());
  }

  public validate(encodedSegment: string): void {
    const segment = deserialize(b64.toByteArray(encodedSegment));
    segment.validate(null);

    const signatures = segment.link().signatures();
    if (signatures.length !== 2) {
      throw new Error(`Invalid number of signatures: ${signatures.length}`);
    }

    signatures[0].validate(segment.link());
    signatures[1].validate(segment.link());

    if (signatures[0].payloadPath() !== "[version,data,meta]") {
      throw new Error(
        `Invalid first signature payload path: ${signatures[0].payloadPath()}`
      );
    }

    if (signatures[1].payloadPath() !== "[version,meta.mapId]") {
      throw new Error(
        `Invalid second signature payload path: ${signatures[1].payloadPath()}`
      );
    }
  }
}
