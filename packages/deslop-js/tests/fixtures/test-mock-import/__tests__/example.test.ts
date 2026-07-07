import { vi, describe, it, expect } from "vite-plus/test";
vi.mock("../src/mocked-util");
import { helper } from "../src/index";

describe("test", () => {
  it("works", () => {
    expect(helper()).toBe("help");
  });
});
