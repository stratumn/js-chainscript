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
import { SIGNATURE_VERSION_1_0_0 } from "./const";
import * as errors from "./errors";
import { deserialize, fromObject, Link } from "./link";
import { LinkBuilder } from "./link_builder";
import { stratumn } from "./proto/chainscript_pb";
import { LinkReference } from "./ref";
import { Signature, signLink } from "./signature";

/**
 * Create a valid test link for version 1.0.0.
 */
function createLinkV1(): Link {
  const link = new stratumn.chainscript.Link();
  link.version = "1.0.0";

  link.meta = new stratumn.chainscript.LinkMeta();
  link.meta.clientId = "github.com/stratumn/go-chainscript";
  link.meta.mapId = "test_map";

  link.meta.process = new stratumn.chainscript.Process();
  link.meta.process.name = "test_process";

  return new Link(link);
}

describe("link", () => {
  describe("process", () => {
    it("throws if meta is missing", () => {
      const link = new Link(new stratumn.chainscript.Link());
      expect(() => link.process()).toThrowError("link meta is missing");
    });

    it("throws if process is missing", () => {
      const pbLink = new stratumn.chainscript.Link();
      pbLink.meta = new stratumn.chainscript.LinkMeta();

      const link = new Link(pbLink);
      expect(() => link.process()).toThrowError("link process is missing");
    });
  });

  describe("map id", () => {
    it("throws if meta is missing", () => {
      const link = new Link(new stratumn.chainscript.Link());
      expect(() => link.mapId()).toThrowError("link meta is missing");
    });
  });

  it("throws when meta is missing", () => {
    const link = new Link(new stratumn.chainscript.Link());

    expect(() => link.action()).toThrowError(errors.ErrLinkMetaMissing);
    expect(() => link.clientId()).toThrowError(errors.ErrLinkMetaMissing);
    expect(() => link.mapId()).toThrowError(errors.ErrLinkMetaMissing);
    expect(() => link.outDegree()).toThrowError(errors.ErrLinkMetaMissing);
    expect(() => link.prevLinkHash()).toThrowError(errors.ErrLinkMetaMissing);
    expect(() => link.priority()).toThrowError(errors.ErrLinkMetaMissing);
    expect(() => link.process()).toThrowError(errors.ErrLinkMetaMissing);
    expect(() => link.refs()).toThrowError(errors.ErrLinkMetaMissing);
    expect(() => link.step()).toThrowError(errors.ErrLinkMetaMissing);
    expect(() => link.tags()).toThrowError(errors.ErrLinkMetaMissing);
  });

  describe("data", () => {
    const customData = { name: "Sponge", surname: "Capture d’écran.png" };

    it("rejects missing meta", () => {
      const link = new Link(new stratumn.chainscript.Link());
      expect(() => link.data()).toThrowError(errors.ErrLinkMetaMissing);
      expect(() => link.setData(customData)).toThrowError(
        errors.ErrLinkMetaMissing
      );
    });

    it("rejects incompatible client id", () => {
      const pbLink = new stratumn.chainscript.Link();
      pbLink.meta = new stratumn.chainscript.LinkMeta();
      pbLink.meta.clientId = "github.com/some-random-guy/with-custom-impl";

      const link = new Link(pbLink);
      expect(() => link.data()).toThrowError(errors.ErrLinkClientIdUnkown);
      expect(() => link.setData(customData)).toThrowError(
        errors.ErrLinkClientIdUnkown
      );
    });

    it("rejects unknown version", () => {
      const pbLink = new stratumn.chainscript.Link();
      pbLink.data = Uint8Array.from([42]);
      pbLink.version = "0.42.0";

      pbLink.meta = new stratumn.chainscript.LinkMeta();
      pbLink.meta.clientId = "github.com/stratumn/go-chainscript";

      const link = new Link(pbLink);
      expect(() => link.data()).toThrowError(errors.ErrLinkVersionUnknown);
      expect(() => link.setData(customData)).toThrowError(
        errors.ErrLinkVersionUnknown
      );
    });

    describe("version 1.0.0", () => {
      it("sets custom object", () => {
        const link = createLinkV1();
        link.setData(customData);

        const data = link.data();
        expect(data).toEqual(customData);
      });

      it("sets built-in type", () => {
        const link = createLinkV1();
        link.setData(42);

        const data = link.data();
        expect(data).toEqual(42);
      });
    });
  });

  describe("metadata", () => {
    const customMetadata = { name: "Batman", age: 42 };

    it("rejects missing meta", () => {
      const link = new Link(new stratumn.chainscript.Link());
      expect(() => link.metadata()).toThrowError(errors.ErrLinkMetaMissing);
      expect(() => link.setMetadata(customMetadata)).toThrowError(
        errors.ErrLinkMetaMissing
      );
    });

    it("rejects incompatible client id", () => {
      const pbLink = new stratumn.chainscript.Link();
      pbLink.meta = new stratumn.chainscript.LinkMeta();
      pbLink.meta.clientId = "github.com/some-random-guy/with-custom-impl";

      const link = new Link(pbLink);
      expect(() => link.metadata()).toThrowError(errors.ErrLinkClientIdUnkown);
      expect(() => link.setMetadata(customMetadata)).toThrowError(
        errors.ErrLinkClientIdUnkown
      );
    });

    it("rejects unknown version", () => {
      const pbLink = new stratumn.chainscript.Link();
      pbLink.version = "0.42.0";
      pbLink.meta = new stratumn.chainscript.LinkMeta();
      pbLink.meta.clientId = "github.com/stratumn/go-chainscript";
      pbLink.meta.data = Uint8Array.from([42]);

      const link = new Link(pbLink);
      expect(() => link.metadata()).toThrowError(errors.ErrLinkVersionUnknown);
      expect(() => link.setMetadata(customMetadata)).toThrowError(
        errors.ErrLinkVersionUnknown
      );
    });

    describe("version 1.0.0", () => {
      it("sets custom object", () => {
        const link = createLinkV1();
        link.setMetadata(customMetadata);

        const metadata = link.metadata();
        expect(metadata).toEqual(customMetadata);
      });

      it("sets built-in type", () => {
        const link = createLinkV1();
        link.setMetadata(42);

        const metadata = link.metadata();
        expect(metadata).toEqual(42);
      });
    });
  });

  describe("hash", () => {
    it("rejects unknown version", () => {
      const pbLink = new stratumn.chainscript.Link();
      pbLink.version = "0.42.0";

      const link = new Link(pbLink);
      expect(() => link.hash()).toThrowError(errors.ErrLinkVersionUnknown);
    });

    describe("version 1.0.0", () => {
      it("hashes link", () => {
        const link = createLinkV1();

        const h1 = link.hash();
        expect(h1).toHaveLength(32);

        link.setData(42);
        const h2 = link.hash();
        expect(h2).toHaveLength(32);
        expect(h2).not.toEqual(h1);
      });
    });
  });

  describe("segmentify", () => {
    it("rejects unknown version", () => {
      const pbLink = new stratumn.chainscript.Link();
      pbLink.version = "0.42.0";

      const link = new Link(pbLink);
      expect(() => link.segmentify()).toThrowError(
        errors.ErrLinkVersionUnknown
      );
    });

    it("hashes link in segment meta", () => {
      const link = createLinkV1();
      const segment = link.segmentify();

      expect(segment.link()).toEqual(link);
      expect(segment.linkHash()).toEqual(link.hash());
    });
  });

  describe("serialize", () => {
    describe("version 1.0.0", () => {
      it("with data and metadata", () => {
        const pbLink = new stratumn.chainscript.Link();
        pbLink.version = "1.0.0";

        const meta = new stratumn.chainscript.LinkMeta();
        meta.action = "init";
        meta.clientId = "github.com/stratumn/js-chainscript";
        meta.mapId = "m1";
        meta.process = new stratumn.chainscript.Process();
        meta.process.name = "p1";
        meta.tags = ["tag1", "tag2"];

        pbLink.meta = meta;
        const link = new Link(pbLink);

        link.setData({ name: "batman", age: 42 });
        link.setMetadata({ updatedCount: 3 });

        const serialized = link.serialize();
        expect(serialized.length).toBeGreaterThan(5);

        const link2 = deserialize(serialized);
        expect(link2.action()).toEqual("init");
        expect(link2.clientId()).toEqual(link.clientId());
        expect(link2.data().name).toEqual("batman");
        expect(link2.data().age).toEqual(42);
        expect(link2.hash()).toEqual(link.hash());
        expect(link2.mapId()).toEqual("m1");
        expect(link2.metadata().updatedCount).toEqual(3);
        expect(link2.process().name).toEqual("p1");
        expect(link2.tags()).toEqual(["tag1", "tag2"]);
        expect(link2.version()).toEqual(link.version());
      });

      it("with references", () => {
        const ref1 = new LinkReference(Uint8Array.from([24]), "p1");
        const ref2 = new LinkReference(Uint8Array.from([42]), "p2");
        const link = new LinkBuilder("p1", "m1").withRefs([ref1, ref2]).build();

        const serialized = link.serialize();
        const link2 = deserialize(serialized);
        link2.validate();

        expect(link2.hash()).toEqual(link.hash());

        expect(link2.refs()[0].process).toEqual(ref1.process);
        expect(link2.refs()[1].process).toEqual(ref2.process);

        // Protobuf uses a buffer implementation that's portable between
        // browser and node to represent bytes.
        // We can't directly compare the objects because their type won't
        // match, so we compare the data inside.
        expect(link2.refs()[0].linkHash[0]).toEqual(24);
        expect(link2.refs()[1].linkHash[0]).toEqual(42);
      });

      it("with signatures", () => {
        const link = new LinkBuilder("p", "m")
          .withAction("init")
          .withData("b4tm4n")
          .build();

        const keyBytes = new sig.SigningPrivateKey({
          algo: sig.SIGNING_ALGO_ED25519.name
        }).export();

        link.sign(keyBytes, "");
        link.sign(keyBytes, "[version,data]");

        const serialized = link.serialize();
        const link2 = deserialize(serialized);
        link2.validate();

        expect(link2.hash()).toEqual(link.hash());

        expect(link2.signatures()).toHaveLength(2);
        link2.signatures()[0].validate(link);
        link2.signatures()[1].validate(link);
      });
    });
  });

  describe("object conversion", () => {
    it("converts to object", () => {
      const link = new LinkBuilder("p1", "m1").withAction("init").build();
      const linkObj = link.toObject();

      expect(linkObj.version).toBe(link.version());
      expect(linkObj.meta.clientId).toBe(link.clientId());
      expect(linkObj.meta.process.name).toBe(link.process().name);
      expect(linkObj.meta.mapId).toBe(link.mapId());
      expect(linkObj.meta.action).toBe(link.action());
    });

    it("converts bytes to base64", () => {
      const link = new LinkBuilder("p1", "m1")
        .withData({ hello: "world!" })
        .build();
      const linkObj = link.toObject({ bytes: String });

      expect(linkObj.data).toBe(b64.fromByteArray(link.toObject().data));
    });

    it("converts from object", () => {
      const l1 = new LinkBuilder("p1", "m1").withAction("init").build();
      const l2 = fromObject(l1.toObject());

      expect(l2).toEqual(l1);
    });

    it("converts base64 to bytes", () => {
      const l1 = new LinkBuilder("p1", "m1")
        .withData({ hello: "world!" })
        .build();
      const l2 = fromObject(l1.toObject({ bytes: String }));

      expect(l2.data().hello).toBe("world!");
    });

    it("converts prevLinkHash to uint8array", () => {
      const prevLink = new LinkBuilder("p1", "m1").build();
      const prevSegment = prevLink.segmentify();

      const link = new LinkBuilder("p1", "m1")
        .withParent(prevSegment.linkHash())
        .build();

      const parsedLink = fromObject(link.toObject());

      expect(parsedLink.prevLinkHash()).toEqual(prevSegment.linkHash());
      expect(parsedLink.prevLinkHash()).toEqual(prevLink.hash());
    });
  });

  describe("addSignature", () => {
    const key = new sig.SigningPrivateKey({
      algo: sig.SIGNING_ALGO_ED25519.name
    }).export();

    it("rejects invalid signatures", () => {
      const link = new LinkBuilder("p", "m").build();
      const s = new stratumn.chainscript.Signature();
      s.publicKey = Uint8Array.from([42]);
      s.signature = Uint8Array.from([42]);

      expect(() => link.addSignature(new Signature(s))).toThrow();
      expect(link.signatures()).toHaveLength(0);
    });

    it("adds to signatures list", () => {
      const link = new LinkBuilder("p", "m").build();
      const s = signLink(key, link, "[version,meta]");

      link.addSignature(s);
      expect(link.signatures()).toHaveLength(1);
    });
  });

  describe("signed bytes", () => {
    it("rejects unknown version", () => {
      const link = new LinkBuilder("p", "m").build();
      expect(() => link.signedBytes("0.1.0", "")).toThrowError(
        errors.ErrSignatureVersionUnknown
      );
    });

    describe("version 1.0.0", () => {
      const version = SIGNATURE_VERSION_1_0_0;

      it("rejects invalid jmespath", () => {
        const link = new LinkBuilder("p", "m").withData("batman").build();
        expect(() => link.signedBytes(version, "[version,")).toThrowError();
      });

      it("includes data and meta if no path provided", () => {
        const link = new LinkBuilder("p", "m").withData("batman").build();
        const b1 = link.signedBytes(version, "[version,data,meta]");
        const b2 = link.signedBytes(version, "");
        const b3 = link.signedBytes(version, "[version,data]");

        expect(b1).toEqual(b2);
        expect(b1).not.toEqual(b3);
      });

      it("includes partial meta", () => {
        const link = new LinkBuilder("p", "m").withAction("init").build();
        const b1 = link.signedBytes(
          version,
          "[meta.action,meta.process.name,meta.mapId]"
        );
        const b2 = link.signedBytes(version, "[meta.action,meta.process.name]");

        expect(b1).not.toEqual(b2);
      });

      it("includes partial meta and link data", () => {
        const link1 = new LinkBuilder("p", "m")
          .withData({ user: "batman", age: 42 })
          .build();
        const link2 = new LinkBuilder("p", "m").build();

        const path = "[data,meta.process.name,meta.mapId]";
        const b1 = link1.signedBytes(version, path);
        const b2 = link2.signedBytes(version, path);

        expect(b1).not.toEqual(b2);
      });
    });
  });

  describe("sign", () => {
    const keyBytes = new sig.SigningPrivateKey({
      algo: sig.SIGNING_ALGO_RSA.name
    }).export();

    it("rejects invalid private key", () => {
      const link = new LinkBuilder("p", "m").build();
      expect(() => link.sign(Uint8Array.from([42]), "")).toThrowError();
    });

    it("rejects invalid payload path", () => {
      const link = new LinkBuilder("p", "m").build();
      expect(() => link.sign(keyBytes, "[data,")).toThrowError();
    });

    it("rejects invalid signature", () => {
      const l1 = new LinkBuilder("p1", "m1").build();
      l1.sign(keyBytes, "[meta]");

      const signatures = l1.signatures();
      expect(signatures).toHaveLength(1);
      signatures[0].validate(l1);

      const l2 = new LinkBuilder("p2", "m2").build();
      expect(() => signatures[0].validate(l2)).toThrowError(
        errors.ErrSignatureInvalid
      );
    });

    it("supports multiple signatures", () => {
      const link = new LinkBuilder("p", "m").build();
      link.sign(keyBytes, "");
      link.sign(keyBytes, "[version]");

      const signatures = link.signatures();
      expect(signatures).toHaveLength(2);
      expect(signatures[0].payloadPath()).toEqual("[version,data,meta]");
      expect(signatures[1].payloadPath()).toEqual("[version]");

      signatures[0].validate(link);
      signatures[1].validate(link);

      link.validate();
    });
  });

  describe("validate", () => {
    it("rejects missing version", () => {
      const link = new Link(new stratumn.chainscript.Link());
      expect(() => link.validate()).toThrowError(errors.ErrLinkVersionMissing);
    });

    it("rejects missing meta", () => {
      const pb = new stratumn.chainscript.Link();
      pb.version = "1.0.0";

      const link = new Link(pb);
      expect(() => link.validate()).toThrowError(errors.ErrLinkMetaMissing);
    });

    it("rejects missing map id", () => {
      const pb = new stratumn.chainscript.Link();
      pb.version = "1.0.0";
      pb.meta = new stratumn.chainscript.LinkMeta();
      pb.meta.process = new stratumn.chainscript.Process();
      pb.meta.process.name = "p";

      const link = new Link(pb);
      expect(() => link.validate()).toThrowError(errors.ErrLinkMapIdMissing);
    });

    it("rejects missing process", () => {
      const pb = new stratumn.chainscript.Link();
      pb.version = "1.0.0";
      pb.meta = new stratumn.chainscript.LinkMeta();
      pb.meta.mapId = "m";

      const link = new Link(pb);
      expect(() => link.validate()).toThrowError(errors.ErrLinkProcessMissing);
    });

    it("rejects incompatible clients", () => {
      const pb = new stratumn.chainscript.Link();
      pb.version = "1.0.0";
      pb.meta = new stratumn.chainscript.LinkMeta();
      pb.meta.clientId = "github.com/some/lib";
      pb.meta.mapId = "m";
      pb.meta.process = new stratumn.chainscript.Process();
      pb.meta.process.name = "p";

      const link = new Link(pb);
      expect(() => link.validate()).toThrowError(errors.ErrLinkClientIdUnkown);
    });

    it("rejects invalid reference", () => {
      const pb = new stratumn.chainscript.Link();
      pb.version = "1.0.0";

      pb.meta = new stratumn.chainscript.LinkMeta();
      pb.meta.clientId = "github.com/stratumn/go-chainscript";
      pb.meta.mapId = "m";
      pb.meta.process = new stratumn.chainscript.Process();
      pb.meta.process.name = "p";
      pb.meta.refs!.push(new stratumn.chainscript.LinkReference());

      const link = new Link(pb);
      expect(() => link.validate()).toThrowError(errors.ErrLinkProcessMissing);
    });

    it("valid references", () => {
      const link = new LinkBuilder("p1", "m1")
        .withRefs([
          new LinkReference(Uint8Array.from([42]), "p1"),
          new LinkReference(Uint8Array.from([24]), "p2")
        ])
        .build();

      link.validate();
    });
  });
});
