import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { IconCamera } from "./icons";
import { useLanguage } from "../i18n/LanguageContext";

const TARGET_W = 656;
const TARGET_H = 861;

//-----------------------------------------------------------------
//-----------------------------------------------------------------
export default function PhotoChangeControl({
  onChange,
  className,
  iconClassName,
}) {
  const { t } = useLanguage();
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);
  const cropRef = useRef(null);
  const dragRef = useRef(null);

  const [sourceOpen, setSourceOpen] = useState(false);
  const [pendingImage, setPendingImage] = useState(null);
  const [cropSize, setCropSize] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  //-----------------------------------------------------------------
  useEffect(() => {
    if (!cropRef.current) return undefined;
    const resizeObserver = new ResizeObserver(() => {
      const width = cropRef.current?.clientWidth || 0;
      setCropSize({ width, height: (width * TARGET_H) / TARGET_W });
    });
    resizeObserver.observe(cropRef.current);
    return () => resizeObserver.disconnect();
  }, [pendingImage]);

  //-----------------------------------------------------------------
  function clampPosition(nextPosition, nextZoom = zoom) {
    if (!pendingImage || !cropSize.width) return nextPosition;
    const scale =
      Math.max(
        cropSize.width / pendingImage.width,
        cropSize.height / pendingImage.height,
      ) * nextZoom;
    const imageWidth = pendingImage.width * scale;
    const imageHeight = pendingImage.height * scale;
    const maxX = Math.max(0, (imageWidth - cropSize.width) / 2);
    const maxY = Math.max(0, (imageHeight - cropSize.height) / 2);
    return {
      x: Math.min(maxX, Math.max(-maxX, nextPosition.x)),
      y: Math.min(maxY, Math.max(-maxY, nextPosition.y)),
    };
  }

  //-----------------------------------------------------------------
  function handleZoom(e) {
    const nextZoom = Number(e.target.value);
    setZoom(nextZoom);
    setPosition((currentPosition) => clampPosition(currentPosition, nextZoom));
  }

  function pickCamera() {
    setSourceOpen(false);
    cameraRef.current?.click();
  }

  function pickGallery() {
    setSourceOpen(false);
    galleryRef.current?.click();
  }

  //-----------------------------------------------------------------
  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result;
      const image = new Image();
      image.onload = () => {
        setPendingImage({
          src,
          width: image.naturalWidth,
          height: image.naturalHeight,
        });
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      };
      image.src = src;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  //-----------------------------------------------------------------
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

  function handlePointerUp(e) {
    if (dragRef.current?.pointerId === e.pointerId) dragRef.current = null;
  }

  //-----------------------------------------------------------------
  function handleApply() {
    if (!pendingImage) return;
    const frameWidth = cropRef.current?.clientWidth || cropSize.width;
    if (!frameWidth) return;
    const frameSize = {
      width: frameWidth,
      height: (frameWidth * TARGET_H) / TARGET_W,
    };
    const scale =
      Math.max(
        frameSize.width / pendingImage.width,
        frameSize.height / pendingImage.height,
      ) * zoom;
    const imageWidth = pendingImage.width * scale;
    const imageHeight = pendingImage.height * scale;
    const left = (frameSize.width - imageWidth) / 2 + position.x;
    const top = (frameSize.height - imageHeight) / 2 + position.y;
    const canvas = document.createElement("canvas");
    canvas.width = TARGET_W;
    canvas.height = TARGET_H;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.onload = () => {
      context.drawImage(
        image,
        -left / scale,
        -top / scale,
        frameSize.width / scale,
        frameSize.height / scale,
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

  const previewScale =
    pendingImage && cropSize.width
      ? Math.max(
          cropSize.width / pendingImage.width,
          cropSize.height / pendingImage.height,
        ) * zoom
      : 0;

  //-----------------------------------------------------------------
  //-----------------------------------------------------------------
  return (
    <>
      <button
        type="button"
        onClick={() => setSourceOpen(true)}
        aria-label={t("changePhoto")}
        title={t("changePhoto")}
        className={className}
      >
        <IconCamera className={iconClassName || "w-4 h-4"} />
      </button>

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

      {sourceOpen && (
        <Modal title={t("changePhoto")} onClose={() => setSourceOpen(false)}>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={pickCamera}
              className="flex-1 text-sm font-medium px-3.5 py-3 rounded-full border-[1.5px] border-[var(--green-mid)] text-[var(--green-mid)] flex items-center justify-center gap-1.5 hover:bg-[color:var(--green-mid)]/8 transition-colors"
            >
              <IconCamera className="w-4 h-4" />
              {t("useCamera")}
            </button>
            <button
              type="button"
              onClick={pickGallery}
              className="flex-1 text-sm px-3.5 py-3 rounded-full border border-[var(--rule)] text-ink hover:border-[var(--green-mid)] transition-colors"
            >
              {t("useGallery")}
            </button>
          </div>
        </Modal>
      )}

      {pendingImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("cropTitle")}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-[1px] p-4"
        >
          <div className="w-full sm:max-w-sm bg-[var(--paper-raised)] rounded-3xl border border-[var(--rule)] shadow-xl p-5 rise-in">
            <p className="text-base font-semibold text-ink mb-1">
              {t("cropTitle")}
            </p>
            <p className="text-sm text-ink-soft mb-4">{t("cropHint")}</p>
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
                alt=""
                draggable="false"
                className="absolute max-w-none pointer-events-none"
                style={{
                  width: previewScale
                    ? pendingImage.width * previewScale
                    : "100%",
                  height: previewScale
                    ? pendingImage.height * previewScale
                    : "100%",
                  left: previewScale
                    ? (cropSize.width - pendingImage.width * previewScale) / 2 +
                      position.x
                    : 0,
                  top: previewScale
                    ? (cropSize.height - pendingImage.height * previewScale) /
                        2 +
                      position.y
                    : 0,
                }}
              />
              <div className="absolute inset-0 border-2 border-white/90 pointer-events-none" />
            </div>
            <label className="block text-sm text-ink-soft mt-4">
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
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={() => setPendingImage(null)}
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
        </div>
      )}
    </>
  );
}
