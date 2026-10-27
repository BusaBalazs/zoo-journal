import { useEffect, useRef, useState } from "react";
import { IconCamera, IconX } from "./icons";
import { useLanguage } from "../i18n/LanguageContext";
import {
  CROP_HEIGHT,
  CROP_WIDTH,
  clampCropPosition,
  getCropFrameSize,
  getCropImageScale,
  getCropSourceRect,
} from "../utils/photoCrop";

//-------------------------------------------------------------
//-------------------------------------------------------------
export default function PhotoPicker({
  photo,
  onChange,
  label,
}) {
  //-------------------------------------------------------------
  const { t } = useLanguage();
  //-------------------------------------------------------------
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);
  const cropRef = useRef(null);
  const dragRef = useRef(null);
  const previousPhotoRef = useRef(photo);
  const [pendingImage, setPendingImage] = useState(null);
  const [cropSize, setCropSize] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  //-------------------------------------------------------------
  useEffect(() => {
    if (!cropRef.current) return undefined;
    const resizeObserver = new ResizeObserver(() => {
      const width = cropRef.current?.clientWidth || 0;
      setCropSize(getCropFrameSize(width));
    });
    resizeObserver.observe(cropRef.current);
    return () => resizeObserver.disconnect();
  }, [pendingImage]);

  //-------------------------------------------------------------
  function clampPosition(nextPosition, nextZoom = zoom) {
    return clampCropPosition(nextPosition, pendingImage, cropSize, nextZoom);
  }

  //-------------------------------------------------------------
  function handleZoom(e) {
    const nextZoom = Number(e.target.value);
    setZoom(nextZoom);
    setPosition((currentPosition) => clampPosition(currentPosition, nextZoom));
  }

  //-------------------------------------------------------------
  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    previousPhotoRef.current = photo;
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result);
      const image = new Image();
      image.onload = () => {
        setPendingImage({
          src: reader.result,
          width: image.naturalWidth,
          height: image.naturalHeight,
        });
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  //-------------------------------------------------------------
  function handlePointerDown(e) {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      position,
    };
  }

  function handlePointerMove(e) {
    if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return;
    setPosition(
      clampPosition({
        x: dragRef.current.position.x + e.clientX - dragRef.current.startX,
        y: dragRef.current.position.y + e.clientY - dragRef.current.startY,
      }),
    );
  }

  //-------------------------------------------------------------
  function handlePointerUp(e) {
    if (dragRef.current?.pointerId === e.pointerId) dragRef.current = null;
  }

  //-------------------------------------------------------------
  function handleApply() {
    if (!pendingImage) return;
    const frameWidth = cropRef.current?.clientWidth || cropSize.width;
    if (!frameWidth) return;
    const frameSize = getCropFrameSize(frameWidth);
    const source = getCropSourceRect(pendingImage, frameSize, position, zoom);
    const canvas = document.createElement("canvas");
    canvas.width = CROP_WIDTH;
    canvas.height = CROP_HEIGHT;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.onload = () => {
      context.drawImage(
        image,
        source.x,
        source.y,
        source.width,
        source.height,
        0,
        0,
        canvas.width,
        canvas.height,
      );
      onChange(canvas.toDataURL("image/webp", 0.92));
      setPendingImage(null);
    };
    image.src = pendingImage.src;
  }

  const imageScale =
    pendingImage && cropSize.width
      ? getCropImageScale(pendingImage, cropSize, zoom)
      : 0;
  const imageWidth = pendingImage ? pendingImage.width * imageScale : 0;
  const imageHeight = pendingImage ? pendingImage.height * imageScale : 0;

  //-------------------------------------------------------------
  function handleCancel() {
    onChange(previousPhotoRef.current || null);
    setPendingImage(null);
  }

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  return (
    <div>
      <p className="text-sm font-medium text-ink-soft mt-8">{label}</p>
      {pendingImage ? (
        <div className="space-y-4">
          <div>
            <p className="text-base font-semibold text-ink mb-1">
              {t("cropTitle")}
            </p>
            <p className="text-sm text-ink-soft">{t("cropHint")}</p>
          </div>
          <div
            ref={cropRef}
            className="relative w-full aspect-[656/861] overflow-hidden rounded-2xl bg-black touch-none select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <img
              src={pendingImage.src}
              alt={t("photoUploaded")}
              draggable="false"
              className="absolute max-w-none pointer-events-none"
              style={{
                width: imageScale ? imageWidth : "100%",
                height: imageScale ? imageHeight : "100%",
                left: imageScale
                  ? (cropSize.width - imageWidth) / 2 + position.x
                  : 0,
                top: imageScale
                  ? (cropSize.height - imageHeight) / 2 + position.y
                  : 0,
              }}
            />
            <div className="absolute inset-0 border-2 border-white/90 pointer-events-none" />
          </div>
          <label className="block text-sm text-ink-soft">
            <span className="flex justify-between mb-1.5">
              <span>{t("cropZoom")}</span>
              <span>{zoom.toFixed(1)}x</span>
            </span>
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={zoom}
              onChange={handleZoom}
              className="w-full accent-[var(--green-deep)]"
            />
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 text-sm px-3.5 py-2.5 rounded-full border border-[var(--rule)] text-ink-soft hover:border-[var(--green-mid)] transition-colors"
            >
              {t("cropCancel")}
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 text-sm font-medium px-3.5 py-2.5 rounded-full bg-[var(--green-deep)] text-white hover:opacity-90 transition-opacity"
            >
              {t("cropApply")}
            </button>
          </div>
        </div>
      ) : photo ? (
        <div className="relative">
          <img
            src={photo}
            alt={t("photoUploaded")}
            className="w-full object-cover rounded-2xl border border-[var(--rule)]"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label={t("removePhoto")}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/45 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <IconX className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => cameraRef.current?.click()}
          className="flex w-full h-32 rounded-2xl border-2 border-dashed border-[var(--green-mid)] flex flex-col items-center justify-center gap-1.5 text-ink-soft"
        >
          <IconCamera className="w-6 h-6" />
          <span className="text-sm">{t("photoBody")}</span>
        </button>
      )}

      <div className="flex gap-2 mt-2.5 mt-6">
   
        <button
          type="button"
          onClick={() => galleryRef.current?.click()}
          className="flex-1 text-sm px-3.5 py-2.5 rounded-full border border-[var(--paper)] text-ink bg-[var(--paper)] hover:border-[var(--green-mid)] transition-colors"
        >
          {t("useGallery")}
        </button>
      </div>

      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        className="hidden"
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}
