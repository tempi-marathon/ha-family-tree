import { describe, expect, it } from "vitest";
import { isSafeUrl } from "./url";

describe("isSafeUrl", () => {
  it("allows http, https, and mailto", () => {
    expect(isSafeUrl("https://example.com/path")).toBe(true);
    expect(isSafeUrl("http://example.com")).toBe(true);
    expect(isSafeUrl("mailto:family@example.com")).toBe(true);
  });

  it("rejects dangerous schemes", () => {
    expect(isSafeUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeUrl("data:text/html,<script>")).toBe(false);
  });

  it("rejects overlong URLs", () => {
    expect(isSafeUrl("https://example.com/" + "a".repeat(2000))).toBe(false);
  });
});
