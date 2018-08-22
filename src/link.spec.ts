import {
  ErrLinkMetaMissing,
  ErrUnknownClientId,
  ErrUnknownLinkVersion,
  Link
} from "./link";
import { Link as PbLink, LinkMeta as PbLinkMeta } from "./proto/chainscript_pb";

describe("link", () => {
  describe("process", () => {
    it("throws if meta is missing", () => {
      const link = new Link(new PbLink());
      expect(() => link.process()).toThrowError("link meta is missing");
    });

    it("throws if process is missing", () => {
      const pbLink = new PbLink();
      pbLink.setMeta(new PbLinkMeta());

      const link = new Link(pbLink);
      expect(() => link.process()).toThrowError("link process is missing");
    });
  });

  describe("map id", () => {
    it("throws if meta is missing", () => {
      const link = new Link(new PbLink());
      expect(() => link.mapId()).toThrowError("link meta is missing");
    });
  });

  it("throws when meta is missing", () => {
    const link = new Link(new PbLink());

    expect(() => link.action()).toThrowError(ErrLinkMetaMissing);
    expect(() => link.clientId()).toThrowError(ErrLinkMetaMissing);
    expect(() => link.mapId()).toThrowError(ErrLinkMetaMissing);
    expect(() => link.prevLinkHash()).toThrowError(ErrLinkMetaMissing);
    expect(() => link.priority()).toThrowError(ErrLinkMetaMissing);
    expect(() => link.process()).toThrowError(ErrLinkMetaMissing);
    expect(() => link.step()).toThrowError(ErrLinkMetaMissing);
    expect(() => link.tags()).toThrowError(ErrLinkMetaMissing);
  });

  describe("set data", () => {
    const customData = { name: "Sponge", surname: "Bob" };

    it("rejects missing meta", () => {
      const link = new Link(new PbLink());
      expect(() => link.setData(customData)).toThrowError(ErrLinkMetaMissing);
    });

    it("rejects incompatible client id", () => {
      const meta = new PbLinkMeta();
      meta.setClientId("github.com/some-random-guy/with-custom-impl");

      const pbLink = new PbLink();
      pbLink.setMeta(meta);

      const link = new Link(pbLink);
      expect(() => link.setData(customData)).toThrowError(ErrUnknownClientId);
    });

    it("rejects unknown version", () => {
      const meta = new PbLinkMeta();
      meta.setClientId("github.com/stratumn/go-chainscript");

      const pbLink = new PbLink();
      pbLink.setMeta(meta);
      pbLink.setVersion("0.42.0");

      const link = new Link(pbLink);
      expect(() => link.setData(customData)).toThrowError(
        ErrUnknownLinkVersion
      );
    });
  });
});
