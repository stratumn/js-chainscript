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
import { LinkBuilder } from "../link_builder";
import { deserialize } from "../segment";
import { ITestCase } from "./test_case";

/**
 * Test a segment with custom data and metadata but no references, evidences
 * or signatures.
 */
export class SimpleSegmentTest implements ITestCase {
  public static id = "simple-segment";

  public id(): string {
    return SimpleSegmentTest.id;
  }

  public generate(): string {
    const segment = new LinkBuilder("test_process", "test_map")
      .withAction("init")
      .withData({ name: "ʙᴀᴛᴍᴀɴ", age: 42 })
      .withDegree(3)
      .withMetadata("bruce wayne")
      .withParent(Uint8Array.from([42, 42]))
      .withPriority(42)
      .withProcessState("started")
      .withStep("setup")
      .withTags(["tag1", "tag2"])
      .build()
      .segmentify();

    return b64.fromByteArray(segment.serialize());
  }

  public validate(encodedSegment: string): void {
    const segment = deserialize(b64.toByteArray(encodedSegment));
    segment.validate();

    const link = segment.link();

    if (link.action() !== "init") {
      throw new Error(`Invalid action: ${link.action()}`);
    }
    if (link.data().age !== 42) {
      throw new Error(`Invalid data: ${JSON.stringify(link.data())}`);
    }
    if (link.data().name !== "ʙᴀᴛᴍᴀɴ") {
      throw new Error(`Invalid data: ${JSON.stringify(link.data())}`);
    }
    if (link.outDegree() !== 3) {
      throw new Error(`Invalid degree: ${link.outDegree()}`);
    }
    if (link.mapId() !== "test_map") {
      throw new Error(`Invalid map id: ${link.mapId()}`);
    }
    if (link.metadata() !== "bruce wayne") {
      throw new Error(`Invalid metadata: ${JSON.stringify(link.metadata())}`);
    }
    if (link.prevLinkHash()[0] !== 42 || link.prevLinkHash()[1] !== 42) {
      throw new Error(`Invalid parent: ${link.prevLinkHash()}`);
    }
    if (link.priority() !== 42) {
      throw new Error(`Invalid priority: ${link.priority()}`);
    }
    if (link.process().name !== "test_process") {
      throw new Error(`Invalid process name: ${link.process().name}`);
    }
    if (link.process().state !== "started") {
      throw new Error(`Invalid process state: ${link.process().state}`);
    }
    if (link.step() !== "setup") {
      throw new Error(`Invalid step: ${link.step()}`);
    }
    if (link.tags()[0] !== "tag1" || link.tags()[1] !== "tag2") {
      throw new Error(`Invalid tags: ${link.tags()}`);
    }
  }
}
