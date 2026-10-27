export const CROP_WIDTH = 656;
export const CROP_HEIGHT = 861;

export function getCropFrameSize(width) {
  return { width, height: (width * CROP_HEIGHT) / CROP_WIDTH };
}

export function getCropImageScale(image, frame, zoom = 1) {
  return (
    Math.max(frame.width / image.width, frame.height / image.height) * zoom
  );
}

export function clampCropPosition(position, image, frame, zoom = 1) {
  if (!image || !frame.width) return position;

  const scale = getCropImageScale(image, frame, zoom);
  const maxX = Math.max(0, (image.width * scale - frame.width) / 2);
  const maxY = Math.max(0, (image.height * scale - frame.height) / 2);

  return {
    x: Math.min(maxX, Math.max(-maxX, position.x)),
    y: Math.min(maxY, Math.max(-maxY, position.y)),
  };
}

export function getCropSourceRect(image, frame, position, zoom) {
  const scale = getCropImageScale(image, frame, zoom);
  const left = (frame.width - image.width * scale) / 2 + position.x;
  const top = (frame.height - image.height * scale) / 2 + position.y;

  return {
    x: -left / scale,
    y: -top / scale,
    width: frame.width / scale,
    height: frame.height / scale,
  };
}
