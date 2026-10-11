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

export async function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Could not load image"));
      img.src = url;
    });
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
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

export function renderCroppedJpeg(
  img: HTMLImageElement,
  t: CropTransform,
  outputSize = PROFILE_CROP_OUTPUT_PX,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = outputSize;
  canvas.height = outputSize;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return Promise.reject(new Error("Canvas unavailable"));
  }
  const { x, y, w, h } = imageDrawRect(img, outputSize, t);
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
