"use client";

import { HADES_SITE_CONFIG } from "@/config/site.config";
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

function generateDrops(columns: number) {
  const drops: number[] = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }
  return drops;
}

let animationFrameId: number;
export default function HackerBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let drops: number[] = [];

    let columns: number;
    const canvas = canvasRef.current;
    let prefTime = Date.now();
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = document.body.clientWidth;
    canvas.height = window.innerHeight;

    columns = canvas.width / 20;
    // const drops: number[] = [];
    const updateCanvasSize = () => {
      canvas.width = document.body.clientWidth;
      canvas.height = window.innerHeight;
      columns = canvas.width / 20;
      drops = generateDrops(columns);
    };
    const handleResize = () => {
      updateCanvasSize();
    };

    drops = generateDrops(columns);
    window.addEventListener("resize", handleResize);

    function drawDrops() {
      if (Date.now() - prefTime > 1000 / HADES_SITE_CONFIG.backgroundFPS) {
        prefTime = Date.now();
        ctx!.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

        ctx!.font = "15px monospace";

        for (let i = 0; i < drops.length; i++) {
          const text = String.fromCharCode(Math.random() * 128);

          // Set the default color to semi-transparent gray
          ctx!.fillStyle = "rgba(128, 128, 128, 0.5)";

          // Randomly change some characters to green
          if (Math.random() > 0.99) {
            ctx!.fillStyle = "#0f0";
          }

          ctx!.fillText(text, i * 20, drops[i] * 20);

          if (drops[i] * 20 > canvas!.height && Math.random() > 0.99) {
            drops[i] = 0;
          }

          drops[i]++;
        }
      }

      animationFrameId = requestIdleCallback(drawDrops);
    }

    drawDrops();
    return () => {
      cancelIdleCallback(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}
