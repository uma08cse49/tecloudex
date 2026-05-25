import { useEffect, useMemo, useRef } from 'react'
import './AboutCinematicBackground.css'

const KEYWORDS = [
  'SEO',
  'WEB',
  'A.I.',
  'MARKETING',
  'BRANDING',
  'AUTOMATION',
  'ANALYTICS',
  'PPC',
  'DATA',
  'GROWTH',
  'DESIGN',
  'STRATEGY',
]

const WORDS = [
  { text: 'SEO', layer: 'back', x: 10, y: 16, duration: 24, delay: -3 },
  { text: 'WEB', layer: 'mid', x: 82, y: 18, duration: 19, delay: -8 },
  { text: 'A.I.', layer: 'front', x: 16, y: 42, duration: 17, delay: -12 },
  { text: 'MARKETING', layer: 'back', x: 78, y: 40, duration: 28, delay: -16 },
  { text: 'BRANDING', layer: 'mid', x: 8, y: 70, duration: 22, delay: -5 },
  { text: 'AUTOMATION', layer: 'front', x: 72, y: 72, duration: 20, delay: -10 },
  { text: 'ANALYTICS', layer: 'mid', x: 31, y: 20, duration: 25, delay: -14 },
  { text: 'PPC', layer: 'front', x: 90, y: 60, duration: 18, delay: -6 },
  { text: 'DATA', layer: 'back', x: 24, y: 84, duration: 27, delay: -18 },
  { text: 'GROWTH', layer: 'mid', x: 62, y: 12, duration: 21, delay: -7 },
  { text: 'DESIGN', layer: 'front', x: 18, y: 28, duration: 23, delay: -20 },
  { text: 'STRATEGY', layer: 'back', x: 86, y: 82, duration: 30, delay: -11 },
]

function useParallax() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    let frame = 0

    const handleMove = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5).toFixed(3)
        const y = (event.clientY / window.innerHeight - 0.5).toFixed(3)

        root.style.setProperty('--about-pointer-x', x)
        root.style.setProperty('--about-pointer-y', y)
      })
    }

    window.addEventListener('pointermove', handleMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handleMove)
    }
  }, [])

  return rootRef
}

export default function AboutCinematicBackground() {
  const rootRef = useParallax()
  const wordItems = useMemo(
    () =>
      WORDS.map((word, index) => ({
        ...word,
        keyword: KEYWORDS[index % KEYWORDS.length],
        driftX: index % 2 === 0 ? 34 : -34,
        driftY: index % 3 === 0 ? -22 : 24,
        rotate: index % 2 === 0 ? 3 : -3,
      })),
    [],
  )

  return (
    <div ref={rootRef} className="about-cinematic-bg" aria-hidden="true">
      <div className="about-cinematic-bg__gradient" />
      <div className="about-cinematic-bg__beam about-cinematic-bg__beam--one" />
      <div className="about-cinematic-bg__beam about-cinematic-bg__beam--two" />
      <div className="about-cinematic-bg__glass about-cinematic-bg__glass--left" />
      <div className="about-cinematic-bg__glass about-cinematic-bg__glass--right" />
      <div className="about-cinematic-bg__particles" />

      <div className="about-cinematic-bg__words">
        {wordItems.map((word, index) => (
          <span
            key={`${word.text}-${index}`}
            className={`about-cinematic-bg__word about-cinematic-bg__word--${word.layer}`}
            style={{
              '--about-x': `${word.x}%`,
              '--about-y': `${word.y}%`,
              '--about-duration': `${word.duration}s`,
              '--about-delay': `${word.delay}s`,
              '--about-drift-x': `${word.driftX}px`,
              '--about-drift-y': `${word.driftY}px`,
              '--about-rotate': `${word.rotate}deg`,
            }}
          >
            {word.keyword}
          </span>
        ))}
      </div>

      <div className="about-cinematic-bg__center-clear" />
      <div className="about-cinematic-bg__vignette" />
    </div>
  )
}
