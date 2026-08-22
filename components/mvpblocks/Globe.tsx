'use client';

import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { cn } from '@/lib/utils';

interface EarthProps {
  className?: string;
  theta?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
}

const Earth: React.FC<EarthProps> = ({
  className,
  theta = 0.25,
  dark = 1,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 40000,
  mapBrightness = 6,
  baseColor = [0.4, 0.6509, 1],
  markerColor = [1, 0, 0],
  glowColor = [0.2745, 0.5765, 0.898],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /*
   * Callers pass colours as inline array literals, so a plain dependency
   * array would tear down and rebuild the WebGL context on every parent
   * render. Key the effect on the *values* instead and read the latest
   * config from a ref.
   */
  const configKey = [
    theta,
    dark,
    scale,
    diffuse,
    mapSamples,
    mapBrightness,
    baseColor.join(),
    markerColor.join(),
    glowColor.join(),
  ].join('|');

  const configRef = useRef({
    theta,
    dark,
    scale,
    diffuse,
    mapSamples,
    mapBrightness,
    baseColor,
    markerColor,
    glowColor,
  });
  configRef.current = {
    theta,
    dark,
    scale,
    diffuse,
    mapSamples,
    mapBrightness,
    baseColor,
    markerColor,
    glowColor,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let phi = 0;
    let width = canvas.offsetWidth;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: width * 2,
      height: width * 2,
      phi: 0,
      ...configRef.current,
      opacity: 1,
      offset: [0, 0],
      markers: [],
      onRender: (state: Record<string, any>) => {
        // cobe sizes off these every frame, so keeping them in sync here is
        // what actually makes the globe responsive — the previous version
        // measured once on mount and stretched on any resize.
        state.width = width * 2;
        state.height = width * 2;
        state.phi = phi;
        if (!prefersReducedMotion) phi += 0.003;
      },
    });

    const observer = new ResizeObserver(([entry]) => {
      const next = entry.contentRect.width;
      if (next > 0) width = next;
    });
    observer.observe(canvas);

    // Fade in once the first frame has painted, avoiding a black square flash
    const raf = requestAnimationFrame(() => {
      canvas.style.opacity = '1';
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      globe.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configKey]);

  return (
    <div
      // Purely decorative — it conveys nothing a screen reader needs.
      aria-hidden="true"
      className={cn(
        'z-10 mx-auto flex w-full items-center justify-center',
        'aspect-square max-w-[260px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[440px] xl:max-w-[480px]',
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-0 transition-opacity duration-700"
        style={{ aspectRatio: '1' }}
      />
    </div>
  );
};

export default Earth;
