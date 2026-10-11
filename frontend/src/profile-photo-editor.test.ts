import { describe, expect, it } from "vitest";
import {
  PROFILE_CROP_CANVAS_PX,
  PROFILE_CROP_OUTPUT_PX,
  cropTransformForCanvasSize,
  defaultCropTransform,
} from "./profile-photo-editor";

describe("cropTransformForCanvasSize", () => {
  it("scales pan offsets from preview canvas to export size", () => {
    const t = { scale: 1.2, offsetX: 14, offsetY: -28 };
    const scaled = cropTransformForCanvasSize(
      t,
      PROFILE_CROP_CANVAS_PX,
      PROFILE_CROP_OUTPUT_PX,
    );
    const factor = PROFILE_CROP_OUTPUT_PX / PROFILE_CROP_CANVAS_PX;
    expect(scaled.scale).toBe(t.scale);
    expect(scaled.offsetX).toBeCloseTo(t.offsetX * factor);
    expect(scaled.offsetY).toBeCloseTo(t.offsetY * factor);
  });

  it("returns the same transform when sizes match", () => {
    const t = defaultCropTransform();
    expect(cropTransformForCanvasSize(t, 280, 280)).toEqual(t);
  });
});
