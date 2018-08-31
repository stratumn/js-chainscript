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

import * as b64 from "base64-js";
import { Evidence } from "../evidence";
import { LinkBuilder } from "../link_builder";
import { deserialize } from "../segment";
import { ITestCase } from "./test_case";

/**
 * Test a segment with evidences.
 */
export class EvidencesTest implements ITestCase {
  public static id = "segment-evidences";

  public id(): string {
    return EvidencesTest.id;
  }

  public generate(): string {
    const segment = new LinkBuilder("test_process", "test_map")
      .build()
      .segmentify();

    segment.addEvidence(
      new Evidence("0.1.0", "bitcoin", "testnet", Uint8Array.from([42]))
    );

    segment.addEvidence(
      new Evidence("1.0.3", "ethereum", "mainnet", Uint8Array.from([24]))
    );

    return b64.fromByteArray(segment.serialize());
  }

  public validate(encodedSegment: string): void {
    const segment = deserialize(b64.toByteArray(encodedSegment));
    segment.validate();

    if (segment.evidences().length !== 2) {
      throw new Error(`Invalid evidences count: ${segment.evidences().length}`);
    }

    const btc = segment.getEvidence("bitcoin", "testnet");
    if (!btc) {
      throw new Error("Missing bitcoin evidence");
    }
    if (
      btc.version !== "0.1.0" ||
      btc.backend !== "bitcoin" ||
      btc.provider !== "testnet" ||
      btc.proof[0] !== 42
    ) {
      throw new Error(`Invalid bitcoin evidence: ${JSON.stringify(btc)}`);
    }

    const eth = segment.getEvidence("ethereum", "mainnet");
    if (!eth) {
      throw new Error("Missing ethereum evidence");
    }
    if (
      eth.version !== "1.0.3" ||
      eth.backend !== "ethereum" ||
      eth.provider !== "mainnet" ||
      eth.proof[0] !== 24
    ) {
      throw new Error(`Invalid ethereum evidence: ${JSON.stringify(eth)}`);
    }
  }
}
