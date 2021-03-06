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

import * as errors from "./errors";
import { LinkBuilder } from "./link_builder";
import { LinkReference } from "./ref";

describe("link builder", () => {
  describe("defaults", () => {
    it("sets the link version", () => {
      const link = new LinkBuilder("p", "m").build();
      expect(link.version()).toEqual("1.0.0");
    });

    it("sets the client id", () => {
      const link = new LinkBuilder("p", "m").build();
      expect(link.clientId()).toEqual("github.com/stratumn/js-chainscript");
    });

    it("throws if process is missing", () => {
      expect(() => new LinkBuilder("", "m")).toThrowError("process is missing");
    });

    it("sets the process name", () => {
      const link = new LinkBuilder("p", "m").build();
      expect(link.process().name).toEqual("p");
    });

    it("throws if map id is missing", () => {
      expect(() => new LinkBuilder("p", "")).toThrowError("map id is missing");
    });

    it("sets the map id", () => {
      const link = new LinkBuilder("p", "m").build();
      expect(link.mapId()).toEqual("m");
    });

    it("sets the out degree", () => {
      const link = new LinkBuilder("p", "m").build();
      expect(link.outDegree()).toEqual(-1);
    });
  });

  describe("action", () => {
    it("sets the link action", () => {
      const link = new LinkBuilder("p", "m").withAction("a").build();
      expect(link.action()).toEqual("a");
    });
  });

  describe("degree", () => {
    it("correctly sets degree", () => {
      const link = new LinkBuilder("p", "m").withDegree(1).build();
      expect(link.outDegree()).toEqual(1);
    });
  });

  describe("data", () => {
    it("sets custom link data", () => {
      const link = new LinkBuilder("p", "m").withData({ score: 42 }).build();
      expect(link.data()).toEqual({ score: 42 });
    });

    it("sets custom link metadata", () => {
      const link = new LinkBuilder("p", "m")
        .withMetadata({ updated_count: 24 })
        .build();
      expect(link.metadata()).toEqual({ updated_count: 24 });
    });

    it("handles empty data", () => {
      const link = new LinkBuilder("p", "m").build();
      expect(link.data()).toBeUndefined();
    });

    it("handles empty metadata", () => {
      const link = new LinkBuilder("p", "m").build();
      expect(link.metadata()).toBeUndefined();
    });
  });

  describe("parent", () => {
    it("rejects empty link hash", () => {
      const lb = new LinkBuilder("p", "m");
      expect(() => lb.withParent(new Uint8Array([]))).toThrowError();
    });

    it("sets parent link hash", () => {
      const link = new LinkBuilder("p", "m")
        .withParent(new Uint8Array([42, 42]))
        .build();
      expect(link.prevLinkHash()).toEqual(new Uint8Array([42, 42]));
    });
  });

  describe("priority", () => {
    it("defaults to 0", () => {
      const link = new LinkBuilder("p", "m").build();
      expect(link.priority()).toEqual(0);
    });

    it("rejects negative priority", () => {
      const lb = new LinkBuilder("p", "m");
      expect(() => lb.withPriority(-0.42)).toThrowError();
    });

    it("sets valid priority", () => {
      const link = new LinkBuilder("p", "m").withPriority(42.1).build();
      expect(link.priority()).toEqual(42.1);
    });
  });

  describe("process", () => {
    it("sets process state", () => {
      const link = new LinkBuilder("p", "m")
        .withProcessState("documents sent")
        .build();
      expect(link.process().state).toEqual("documents sent");
    });
  });

  describe("step", () => {
    it("sets process step", () => {
      const link = new LinkBuilder("p", "m")
        .withStep("signing documents")
        .build();
      expect(link.step()).toEqual("signing documents");
    });
  });

  describe("tags", () => {
    it("sets tags multiple times", () => {
      const link = new LinkBuilder("p", "m")
        .withTags(["tag1", "tag2"])
        .withTags(["tag3"])
        .build();
      expect(link.tags()).toEqual(["tag1", "tag2", "tag3"]);
    });

    it("filters empty tags", () => {
      const link = new LinkBuilder("p", "m").withTags(["tag", ""]).build();
      expect(link.tags()).toEqual(["tag"]);
    });
  });

  describe("refs", () => {
    it("rejects reference missing process", () => {
      const validRef = new LinkReference(Uint8Array.from([42]), "p1");
      const invalidRef = new LinkReference(Uint8Array.from([42]), "p1");
      invalidRef.process = "";

      expect(() =>
        new LinkBuilder("p", "m").withRefs([validRef, invalidRef])
      ).toThrowError(errors.ErrLinkProcessMissing);
    });

    it("rejects reference missing link hash", () => {
      const validRef = new LinkReference(Uint8Array.from([42]), "p1");
      const invalidRef = new LinkReference(Uint8Array.from([42]), "p1");
      invalidRef.linkHash = new Uint8Array(0);

      expect(() =>
        new LinkBuilder("p", "m").withRefs([validRef, invalidRef])
      ).toThrowError(errors.ErrLinkHashMissing);
    });

    it("adds multiple references", () => {
      const ref1 = new LinkReference(Uint8Array.from([42]), "p1");
      const ref2 = new LinkReference(Uint8Array.from([42]), "p2");

      const link = new LinkBuilder("p", "m")
        .withRefs([ref1])
        .withRefs([ref2])
        .build();

      expect(link.refs()).toHaveLength(2);
      expect(link.refs()).toEqual([ref1, ref2]);
    });

    it("has no references", () => {
      const link = new LinkBuilder("p", "m").build();
      expect(link.refs()).toHaveLength(0);
    });
  });
});
