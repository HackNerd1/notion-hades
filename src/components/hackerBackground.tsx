"use client";

import { useEffect, useRef } from "react";

// function drawBackgrounds(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, drops: number[]) {
//   ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   ctx.font = "15px monospace";

//   const maxHeight = canvas.height / 20;

//   for (let i = 0; i < drops.length; i++) {
//     const text = String.fromCharCode(Math.random() * 128);
//     ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
//     for (let offset = 0; offset < maxHeight; offset++) {
//       ctx.fillText(text, i * 20, offset * 20);
//     }
//   }
// }

function drawDrops(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, drops: number[]) {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "15px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = String.fromCharCode(Math.random() * 128);

    // Set the default color to semi-transparent gray
    ctx.fillStyle = "rgba(128, 128, 128, 0.5)";

    // Randomly change some characters to green
    if (Math.random() > 0.99) {
      ctx.fillStyle = "#0f0";
    }

    ctx.fillText(text, i * 20, drops[i] * 20);

    if (drops[i] * 20 > canvas.height && Math.random() > 0.99) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

export default function HackerBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = document.body.clientWidth;
    canvas.height = window.innerHeight;

    const columns = canvas.width / 20;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // drawBackgrounds(ctx, canvas, drops);
    // Decrease the interval to slow down the animation
    const interval = setInterval(() => drawDrops(ctx, canvas, drops), 50);

    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}
