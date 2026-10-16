import { describe, it, expect } from "vitest";
import { html, render } from "lit";

/** Lit: `.value` on `<select>` with mapped `<option>`s fails on first paint. */
describe("lit select mapped-options binding", () => {
  it("dynamic mapped options lose .value on first render", () => {
    const root = document.createElement("div");
    const quals = ["exact", "about", "before"];
    render(
      html`<select .value=${"about"}>
        ${quals.map((q) => html`<option value=${q}>${q}</option>`)}
      </select>`,
      root,
    );
    expect(root.querySelector("select")!.value).toBe("exact");
  });

  it("?selected on options works on first render", () => {
    const root = document.createElement("div");
    const quals = ["exact", "about", "before"];
    const v = "about";
    render(
      html`<select>
        ${quals.map(
          (q) => html`<option value=${q} ?selected=${q === v}>${q}</option>`,
        )}
      </select>`,
      root,
    );
    expect(root.querySelector("select")!.value).toBe("about");
  });
});
