import { Link } from "./link";
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
});
