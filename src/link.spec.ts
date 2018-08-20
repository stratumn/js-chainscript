import { hello } from "./link";

describe("hello", () => {
  it("says hello", () => {
    expect(hello()).toEqual("Hello ChainScript");
  });
});
