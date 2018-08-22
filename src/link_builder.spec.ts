import { LinkBuilder } from "./link_builder";

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
  });

  describe("action", () => {
    it("sets the link action", () => {
      const lb = new LinkBuilder("p", "m");
      lb.withAction("a");
      const link = lb.build();

      expect(link.action()).toEqual("a");
    });
  });

  describe("parent", () => {
    it("rejects empty link hash", () => {
      const lb = new LinkBuilder("p", "m");
      expect(() => lb.withParent(new Uint8Array([]))).toThrowError();
    });

    it("sets parent link hash", () => {
      const lb = new LinkBuilder("p", "m");
      lb.withParent(new Uint8Array([42, 42]));
      const link = lb.build();

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
      const lb = new LinkBuilder("p", "m");
      lb.withPriority(42.1);
      const link = lb.build();

      expect(link.priority()).toEqual(42.1);
    });
  });

  describe("process", () => {
    it("sets process state", () => {
      const lb = new LinkBuilder("p", "m");
      lb.withProcessState("documents sent");
      const link = lb.build();

      expect(link.process().state).toEqual("documents sent");
    });
  });

  describe("step", () => {
    it("sets process step", () => {
      const lb = new LinkBuilder("p", "m");
      lb.withStep("signing documents");
      const link = lb.build();

      expect(link.step()).toEqual("signing documents");
    });
  });
});
