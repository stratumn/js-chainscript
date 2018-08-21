import { LinkBuilder } from "./link_builder";

describe("link builder", () => {
  it("sets the link version", () => {
    const link = new LinkBuilder("p", "m").build();
    expect(link.version()).toEqual("1.0.0");
  });

  it("throws if process is missing", () => {
    expect(() => new LinkBuilder("", "m")).toThrowError("process is missing");
  });

  it("sets the process name", () => {
    const link = new LinkBuilder("p", "m").build();
    expect(link.process()).toEqual("p");
  });

  it("throws if map id is missing", () => {
    expect(() => new LinkBuilder("p", "")).toThrowError("map id is missing");
  });

  it("sets the map id", () => {
    const link = new LinkBuilder("p", "m").build();
    expect(link.mapId()).toEqual("m");
  });
});
