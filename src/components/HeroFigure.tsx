import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * The hero figure: Priti's portrait as a transparent cut-out, so the page itself is the backdrop.
 *
 * The photo is painted onto a canvas, and the "falling into shadow" fade is painted *on her*
 * (source-atop) in the page's background colour. She stays fully opaque, so nothing behind
 * her — like the giant name — ever shows through.
 *   light — clean white studio, soft fade at the very bottom
 *   dark  — rim light (CSS), lower body sinking into the dark
 * Once the image has loaded it holds with a gentle "breathing" idle.
 */

const SRC = { url: '/assets/hero-priti.webp', width: 930, height: 1359 };

/** Shadow fade per theme: [position 0–1, opacity of background colour]. */
const FADE: Record<'dark' | 'light', [number, number][]> = {
  dark: [
    [0.36, 0],
    [0.6, 0.45],
    [0.82, 0.88],
    [1, 1],
  ],
  light: [
    [0.8, 0],
    [1, 1],
  ],
};

function bgRgb() {
  const hex = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim().replace('#', '');
  const n = parseInt(hex.length === 3 ? hex.replace(/./g, (c) => c + c) : hex, 16);
  return Number.isNaN(n) ? [8, 8, 8] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function HeroFigure() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.decoding = 'async';

    const paint = () => {
      if (!img.complete || !img.naturalWidth) return;
      const { width: w, height: h } = canvas;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      const theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
      const [r, g, b] = bgRgb();
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
      for (const [at, a] of FADE[theme]) grad.addColorStop(at, `rgba(${r},${g},${b},${a})`);
      ctx.globalCompositeOperation = 'source-atop'; // only on her pixels
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
    };

    img.onload = () => {
      paint();
      setLoaded(true);
    };
    img.src = SRC.url;

    // Repaint when the lights switch so the fade matches the new background.
    const mo = new MutationObserver(paint);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);

  return (
    <div className={`hero-film relative mx-auto h-full w-fit ${loaded || reduce ? 'is-idle' : ''}`}>
      <div aria-hidden="true" className="hero-film__pool" />
      <canvas
        ref={canvasRef}
        width={SRC.width}
        height={SRC.height}
        role="img"
        aria-label="Priti Waradkar in a black blazer, smiling"
        className="hero-film__media block h-full w-auto max-w-none select-none"
      />
    </div>
  );
}
