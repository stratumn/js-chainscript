// Copyright 2017-2018 Stratumn SAS. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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

    const link = new LinkBuilder("test_process", "test_map")
      .withAction("ʙᴀᴛᴍᴀɴ")
      .build();
    link.sign(ed25519Key.export(), "");
    link.sign(rsaKey.export(), "[version,meta.mapId]");

    const segment = link.segmentify();

    return b64.fromByteArray(segment.serialize());
  }

  public validate(encodedSegment: string): void {
    const segment = deserialize(b64.toByteArray(encodedSegment));
    segment.validate();

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
