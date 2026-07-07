import { vi, describe, it, expect } from "vite-plus/test";
import { fetchData } from "../src/server/api";

vi.mock("../src/server/api");

describe("server", () => {
  it("should use auto mock", () => {
    expect(fetchData()).toBe("mocked data");
  });
});
