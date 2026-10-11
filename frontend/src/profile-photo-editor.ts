/** Canvas crop helpers for profile photo upload. */

export const PROFILE_CROP_CANVAS_PX = 280;
export const PROFILE_CROP_OUTPUT_PX = 512;

export interface CropTransform {
  scale: number;
  offsetX: number;
  offsetY: number;
}

export function defaultCropTransform(): CropTransform {
  return { scale: 1, offsetX: 0, offsetY: 0 };
}

async function loadImageFromObjectUrl(url: string): Promise<HTMLImageElement> {
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = url;
  });
  return img;
}

export async function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    return await loadImageFromObjectUrl(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function loadImageFromBlob(blob: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(blob);
  try {
    return await loadImageFromObjectUrl(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Pan offsets are in preview canvas pixels; scale for a different output size. */
export function cropTransformForCanvasSize(
  t: CropTransform,
  fromSize: number,
  toSize: number,
): CropTransform {
  if (fromSize === toSize) return t;
  const factor = toSize / fromSize;
  return {
    scale: t.scale,
    offsetX: t.offsetX * factor,
    offsetY: t.offsetY * factor,
  };
}

function imageDrawRect(
  img: HTMLImageElement,
  canvasSize: number,
  t: CropTransform,
): { x: number; y: number; w: number; h: number } {
  const baseScale = Math.max(canvasSize / img.naturalWidth, canvasSize / img.naturalHeight);
  const scale = baseScale * Math.max(1, t.scale);
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  const x = (canvasSize - w) / 2 + t.offsetX;
  const y = (canvasSize - h) / 2 + t.offsetY;
  return { x, y, w, h };
}

export function drawProfileCropPreview(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  t: CropTransform,
): void {
  const size = canvas.width;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, size, size);
  const { x, y, w, h } = imageDrawRect(img, size, t);
  ctx.save();
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(img, x, y, w, h);
  ctx.restore();
  ctx.strokeStyle = "var(--divider-color, #ccc)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
  ctx.stroke();
}

/** Scale down if needed and encode as JPEG for gallery upload. */
export async function encodeImageForUpload(file: File, maxEdge = 2048): Promise<Blob> {
  const img = await loadImageFromFile(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  if (w <= 0 || h <= 0) {
    throw new Error("Invalid image dimensions");
  }
  const scale = Math.min(1, maxEdge / Math.max(w, h));
  const outW = Math.max(1, Math.round(w * scale));
  const outH = Math.max(1, Math.round(h * scale));
  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas unavailable");
  }
  ctx.drawImage(img, 0, 0, outW, outH);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Export failed"));
      },
      "image/jpeg",
      0.9,
    );
  });
}

export function renderCroppedJpeg(
  img: HTMLImageElement,
  t: CropTransform,
  outputSize = PROFILE_CROP_OUTPUT_PX,
  previewSize = PROFILE_CROP_CANVAS_PX,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = outputSize;
  canvas.height = outputSize;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return Promise.reject(new Error("Canvas unavailable"));
  }
  const scaled = cropTransformForCanvasSize(t, previewSize, outputSize);
  const { x, y, w, h } = imageDrawRect(img, outputSize, scaled);
  ctx.drawImage(img, x, y, w, h);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Export failed"));
      },
      "image/jpeg",
      0.9,
    );
  });
}
