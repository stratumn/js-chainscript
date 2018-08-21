import { linkVersion } from "./link";
import { Link } from "./proto/chainscript_pb";

describe("link", () => {
  it("version", () => {
    const link = new Link();
    link.setVersion("0.42.0");

    expect(linkVersion(link)).toEqual("0.42.0");
  });
});
