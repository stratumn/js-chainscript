import { sig } from "@stratumn/js-crypto";
import { SIGNATURE_VERSION_1_0_0 } from "./const";
import {
  deserialize,
  ErrLinkMetaMissing,
  ErrUnknownClientId,
  ErrUnknownLinkVersion,
  Link
} from "./link";
import { LinkBuilder } from "./link_builder";
import { stratumn } from "./proto/chainscript_pb";
import { LinkReference } from "./ref";
import { ErrInvalidSignature, ErrUnknownSignatureVersion } from "./signature";

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

    expect(() => link.action()).toThrowError(ErrLinkMetaMissing);
    expect(() => link.clientId()).toThrowError(ErrLinkMetaMissing);
    expect(() => link.mapId()).toThrowError(ErrLinkMetaMissing);
    expect(() => link.prevLinkHash()).toThrowError(ErrLinkMetaMissing);
    expect(() => link.priority()).toThrowError(ErrLinkMetaMissing);
    expect(() => link.process()).toThrowError(ErrLinkMetaMissing);
    expect(() => link.refs()).toThrowError(ErrLinkMetaMissing);
    expect(() => link.step()).toThrowError(ErrLinkMetaMissing);
    expect(() => link.tags()).toThrowError(ErrLinkMetaMissing);
  });

  describe("data", () => {
    const customData = { name: "Sponge", surname: "Bob" };

    it("rejects missing meta", () => {
      const link = new Link(new stratumn.chainscript.Link());
      expect(() => link.data()).toThrowError(ErrLinkMetaMissing);
      expect(() => link.setData(customData)).toThrowError(ErrLinkMetaMissing);
    });

    it("rejects incompatible client id", () => {
      const pbLink = new stratumn.chainscript.Link();
      pbLink.meta = new stratumn.chainscript.LinkMeta();
      pbLink.meta.clientId = "github.com/some-random-guy/with-custom-impl";

      const link = new Link(pbLink);
      expect(() => link.data()).toThrowError(ErrUnknownClientId);
      expect(() => link.setData(customData)).toThrowError(ErrUnknownClientId);
    });

    it("rejects unknown version", () => {
      const pbLink = new stratumn.chainscript.Link();
      pbLink.data = Uint8Array.from([42]);
      pbLink.version = "0.42.0";

      pbLink.meta = new stratumn.chainscript.LinkMeta();
      pbLink.meta.clientId = "github.com/stratumn/go-chainscript";

      const link = new Link(pbLink);
      expect(() => link.data()).toThrowError(ErrUnknownLinkVersion);
      expect(() => link.setData(customData)).toThrowError(
        ErrUnknownLinkVersion
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
      expect(() => link.metadata()).toThrowError(ErrLinkMetaMissing);
      expect(() => link.setMetadata(customMetadata)).toThrowError(
        ErrLinkMetaMissing
      );
    });

    it("rejects incompatible client id", () => {
      const pbLink = new stratumn.chainscript.Link();
      pbLink.meta = new stratumn.chainscript.LinkMeta();
      pbLink.meta.clientId = "github.com/some-random-guy/with-custom-impl";

      const link = new Link(pbLink);
      expect(() => link.metadata()).toThrowError(ErrUnknownClientId);
      expect(() => link.setMetadata(customMetadata)).toThrowError(
        ErrUnknownClientId
      );
    });

    it("rejects unknown version", () => {
      const pbLink = new stratumn.chainscript.Link();
      pbLink.version = "0.42.0";
      pbLink.meta = new stratumn.chainscript.LinkMeta();
      pbLink.meta.clientId = "github.com/stratumn/go-chainscript";
      pbLink.meta.data = Uint8Array.from([42]);

      const link = new Link(pbLink);
      expect(() => link.metadata()).toThrowError(ErrUnknownLinkVersion);
      expect(() => link.setMetadata(customMetadata)).toThrowError(
        ErrUnknownLinkVersion
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
      expect(() => link.hash()).toThrowError(ErrUnknownLinkVersion);
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
      expect(() => link.segmentify()).toThrowError(ErrUnknownLinkVersion);
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
    });
  });

  describe("signed bytes", () => {
    it("rejects unknown version", () => {
      const link = new LinkBuilder("p", "m").build();
      expect(() => link.signedBytes("0.1.0", "")).toThrowError(
        ErrUnknownSignatureVersion
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
        ErrInvalidSignature
      );
    });

    it("supports multiple signatures", () => {
      const link = new LinkBuilder("p", "m").build();
      link.sign(keyBytes, "");
      link.sign(keyBytes, "[version]");

      const signatures = link.signatures();
      expect(signatures).toHaveLength(2);
      expect(signatures[0].payloadPath()).toEqual("");
      expect(signatures[1].payloadPath()).toEqual("[version]");

      signatures[0].validate(link);
      signatures[1].validate(link);
    });
  });
});
