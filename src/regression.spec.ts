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
import { readFileSync } from "fs";
import { deserialize, Segment } from "./segment";

// Regression tests defined in https://github.com/stratumn/chainscript/tree/master/samples.
describe("v1.0.0", () => {
  let segments: Map<string, Segment>;

  beforeAll(() => {
    const data = readFileSync("./proto/samples/1.0.0.json");
    const testData = JSON.parse(data.toString()) as Array<{
      id: string;
      data: string;
    }>;

    segments = new Map<string, Segment>();
    for (const testCase of testData) {
      const segment = deserialize(b64.toByteArray(testCase.data));
      segment.validate();

      segments[testCase.id] = segment;
    }
  });

  it("simple-segment", () => {
    const s = segments["simple-segment"] as Segment;

    expect(s.link().version()).toBe("1.0.0");
    expect(s.link().data().name).toBe("batman");
    expect(s.link().data().age).toBe(42);
    expect(s.link().clientId()).toBe("github.com/stratumn/go-chainscript");
    expect(s.link().prevLinkHash()).toHaveLength(2);
    expect(s.link().prevLinkHash()[0]).toBe(42);
    expect(s.link().prevLinkHash()[1]).toBe(42);
    expect(s.link().priority()).toBe(42);
    expect(s.link().process().name).toBe("test_process");
    expect(s.link().process().state).toBe("started");
    expect(s.link().mapId()).toBe("test_map");
    expect(s.link().action()).toBe("init");
    expect(s.link().step()).toBe("setup");
    expect(s.link().tags()).toHaveLength(2);
    expect(s.link().tags()[0]).toBe("tag1");
    expect(s.link().tags()[1]).toBe("tag2");
    expect(s.link().metadata()).toBe("bruce wayne");
  });

  it("segment-references", () => {
    const s = segments["segment-references"] as Segment;

    expect(s.link().version()).toBe("1.0.0");
    expect(s.link().process().name).toBe("test_process");
    expect(s.link().mapId()).toBe("test_map");

    const refs = s.link().refs();
    expect(refs).toHaveLength(2);

    expect(refs[0].process).toBe("p1");
    expect(refs[0].linkHash).toHaveLength(1);
    expect(refs[0].linkHash[0]).toBe(42);

    expect(refs[1].process).toBe("p2");
    expect(refs[1].linkHash).toHaveLength(1);
    expect(refs[1].linkHash[0]).toBe(24);
  });

  it("segment-evidences", () => {
    const s = segments["segment-evidences"] as Segment;

    expect(s.link().version()).toBe("1.0.0");
    expect(s.link().process().name).toBe("test_process");
    expect(s.link().mapId()).toBe("test_map");

    expect(s.evidences()).toHaveLength(2);

    const btc = s.getEvidence("bitcoin", "testnet");
    expect(btc.version).toBe("0.1.0");
    expect(btc.proof).toHaveLength(1);
    expect(btc.proof[0]).toBe(42);

    const eth = s.getEvidence("ethereum", "mainnet");
    expect(eth.version).toBe("1.0.3");
    expect(eth.proof).toHaveLength(1);
    expect(eth.proof[0]).toBe(24);
  });

  it("segment-signatures", () => {
    const s = segments["segment-signatures"] as Segment;

    expect(s.link().version()).toBe("1.0.0");
    expect(s.link().process().name).toBe("test_process");
    expect(s.link().mapId()).toBe("test_map");

    expect(s.link().signatures()).toHaveLength(2);
    const sigs = s.link().signatures();
    sigs[0].validate(s.link());
    sigs[1].validate(s.link());

    expect(sigs[0].version()).toBe("1.0.0");
    expect(sigs[0].payloadPath()).toBe("[version,data,meta]");

    expect(sigs[1].version()).toBe("1.0.0");
    expect(sigs[1].payloadPath()).toBe("[version,meta.mapId]");
  });
});
