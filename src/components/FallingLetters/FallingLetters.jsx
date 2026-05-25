import { useEffect, useMemo, useRef } from 'react';
import './FallingLetters.css';

const CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const LAYER_CONFIG = [
  { count: 28, speed: [8, 16], size: [11, 15], opacity: [0.08, 0.2], blur: 0.2 },
  { count: 22, speed: [16, 28], size: [13, 20], opacity: [0.06, 0.16], blur: 0.6 },
  { count: 14, speed: [28, 42], size: [18, 28], opacity: [0.04, 0.12], blur: 1.2 },
];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function createGlyph(layer, width, height) {
  const [minSpeed, maxSpeed] = layer.speed;
  const [minSize, maxSize] = layer.size;
  const [minOpacity, maxOpacity] = layer.opacity;

  return {
    char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
    x: randomBetween(-5, 105),
    y: randomBetween(-height * 0.35, height * 1.05),
    speed: randomBetween(minSpeed, maxSpeed),
    size: randomBetween(minSize, maxSize),
    opacity: randomBetween(minOpacity, maxOpacity),
    drift: randomBetween(-10, 10),
    phase: randomBetween(0, Math.PI * 2),
    blur: layer.blur,
    hue: Math.random() > 0.52 ? 'cyan' : 'violet',
    rotate: randomBetween(-12, 12),
  };
}

export default function FallingLetters() {
  const rootRef = useRef(null);
  const glyphRefs = useRef([]);
  const glyphsRef = useRef([]);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);

  const reduceMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    if (reduceMotion || !rootRef.current) return;

    const root = rootRef.current;
    let width = root.offsetWidth || window.innerWidth;
    let height = root.offsetHeight || window.innerHeight;

    const buildGlyphs = () => {
      width = root.offsetWidth || window.innerWidth;
      height = root.offsetHeight || window.innerHeight;

      glyphsRef.current = LAYER_CONFIG.flatMap((layer) =>
        Array.from({ length: layer.count }, () =>
          createGlyph(layer, width, height)
        )
      );
    };

    buildGlyphs();

    const tick = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;

      const delta = Math.min(
        (time - lastTimeRef.current) / 1000,
        0.05
      );

      lastTimeRef.current = time;

      glyphsRef.current.forEach((glyph, index) => {
        glyph.y += glyph.speed * delta;
        glyph.phase += delta * 0.45;

        if (glyph.y > height + 80) {
          glyph.y = randomBetween(-180, -40);
        }

        const node = glyphRefs.current[index];
        if (!node) return;

        const driftX =
          Math.sin(glyph.phase) * glyph.drift;

        node.style.transform = `
          translate3d(
            calc(${glyph.x}vw + ${driftX}px),
            ${glyph.y}px,
            0
          )
          rotate(${glyph.rotate}deg)
        `;

        node.style.opacity = `${
          glyph.opacity *
          (0.72 + Math.sin(glyph.phase * 0.8) * 0.28)
        }`;
      });

      frameRef.current =
        requestAnimationFrame(tick);
    };

    frameRef.current =
      requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [reduceMotion]);

  const initialGlyphs = useMemo(
    () =>
      LAYER_CONFIG.flatMap((layer) =>
        Array.from(
          { length: layer.count },
          (_, index) => ({
            ...createGlyph(layer, 1600, 900),
            id: `${layer.blur}-${index}`,
          })
        )
      ),
    []
  );

  if (reduceMotion) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="falling-letters-container"
    >
      {initialGlyphs.map((glyph, index) => (
        <span
          key={glyph.id}
          ref={(node) => {
            glyphRefs.current[index] = node;
          }}
          className={`glyph ${
            glyph.hue === 'cyan'
              ? 'glyph-cyan'
              : 'glyph-violet'
          }`}
          style={{
            fontSize: `${glyph.size}px`,
            opacity: glyph.opacity,
            filter: `blur(${glyph.blur}px)`,
            transform: `translate3d(${glyph.x}vw, ${glyph.y}px, 0)`,
          }}
        >
          {glyph.char}
        </span>
      ))}
    </div>
  );
}