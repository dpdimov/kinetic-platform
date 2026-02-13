"use client";

import { useRef, useEffect } from "react";

/**
 * Shared canvas component that renders a Kinetic framework matrix:
 * a background image with a plotted data point (glow + dot + ring).
 *
 * @param {Object}  props
 * @param {number}  props.dim1Score      - X-axis score, -10 to 10
 * @param {number}  props.dim2Score      - Y-axis score, -10 to 10
 * @param {string}  props.accentColor    - CSS color for the point (e.g. "#c4798a")
 * @param {string}  props.backgroundSrc  - URL to the background image
 * @param {number}  [props.maxSize=400]  - Maximum display width/height in px
 * @param {Object}  [props.style]        - Additional inline styles for the canvas
 */
export default function KineticMatrix({
  dim1Score,
  dim2Score,
  accentColor,
  backgroundSrc,
  maxSize = 400,
  style: canvasStyle,
}) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      const logicalSize = maxSize;

      canvas.width = logicalSize * dpr;
      canvas.height = logicalSize * dpr;
      canvas.style.width = "100%";
      canvas.style.maxWidth = logicalSize + "px";
      canvas.style.height = "auto";
      ctx.scale(dpr, dpr);

      const w = logicalSize;
      const h = logicalSize;

      ctx.clearRect(0, 0, w, h);

      // Draw background image if loaded
      if (imgRef.current) {
        ctx.drawImage(imgRef.current, 0, 0, w, h);
      }

      if (dim1Score != null && dim2Score != null) {
        // Map scores to canvas coordinates
        // The plot area is inset: 10/12 ratio matches the image border insets
        const cx = w / 2;
        const cy = h / 2;
        const plotRange = (w / 2) * (10 / 12);
        const plotX = cx + (dim1Score / 10) * plotRange;
        const plotY = cy - (dim2Score / 10) * plotRange;

        // Scale point elements proportionally to canvas size
        const s = logicalSize / 400;
        const glowR = 30 * s;
        const pointR = 7 * s;
        const ringR = 12 * s;
        const ringW = 2 * s;

        // Glow
        const gradient = ctx.createRadialGradient(plotX, plotY, 0, plotX, plotY, glowR);
        gradient.addColorStop(0, accentColor + "80");
        gradient.addColorStop(1, accentColor + "00");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(plotX, plotY, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Point
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(plotX, plotY, pointR, 0, Math.PI * 2);
        ctx.fill();

        // Ring
        ctx.strokeStyle = accentColor + "80";
        ctx.lineWidth = ringW;
        ctx.beginPath();
        ctx.arc(plotX, plotY, ringR, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    // Load image then draw
    if (!imgRef.current || imgRef.current._src !== backgroundSrc) {
      const img = new Image();
      img.onload = () => {
        img._src = backgroundSrc;
        imgRef.current = img;
        draw();
      };
      img.src = backgroundSrc;
    } else {
      draw();
    }
  }, [dim1Score, dim2Score, accentColor, backgroundSrc, maxSize]);

  return (
    <canvas
      ref={canvasRef}
      style={{ borderRadius: 8, ...canvasStyle }}
    />
  );
}
