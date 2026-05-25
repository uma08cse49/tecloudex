import './FallingLetters2.css'

const floatingWords = [
  { text: 'WEB DEVELOPMENT', layer: 'back', x: '8%', y: '18%', size: 'lg', delay: '-2s' },
  { text: 'SEO', layer: 'front', x: '72%', y: '20%', size: 'md', delay: '-8s' },
  { text: 'DIGITAL MARKETING', layer: 'mid', x: '52%', y: '12%', size: 'lg', delay: '-12s' },
  { text: 'UI/UX', layer: 'front', x: '18%', y: '48%', size: 'md', delay: '-5s' },
  { text: 'REACT', layer: 'mid', x: '78%', y: '48%', size: 'md', delay: '-16s' },
  { text: 'AI', layer: 'front', x: '44%', y: '33%', size: 'xl', delay: '-10s' },
  { text: 'GROWTH', layer: 'mid', x: '62%', y: '68%', size: 'md', delay: '-4s' },
  { text: 'SOCIAL MEDIA', layer: 'back', x: '10%', y: '74%', size: 'lg', delay: '-14s' },
  { text: 'ADS', layer: 'front', x: '84%', y: '76%', size: 'md', delay: '-7s' },
  { text: 'AI', layer: 'back', x: '30%', y: '14%', size: 'sm', delay: '-18s' },
  { text: 'SEO', layer: 'mid', x: '34%', y: '82%', size: 'sm', delay: '-20s' },
  { text: 'UI/UX', layer: 'back', x: '88%', y: '36%', size: 'sm', delay: '-11s' },
]

export default function HeroCinematicBackground2() {
  return (
    <div className="hero-cinematic-2" aria-hidden="true">
      <div className="hero-cinematic-2__ambient hero-cinematic-2__ambient--primary" />
      <div className="hero-cinematic-2__ambient hero-cinematic-2__ambient--secondary" />
      <div className="hero-cinematic-2__ambient hero-cinematic-2__ambient--tertiary" />
      <div className="hero-cinematic-2__grid" />
      <div className="hero-cinematic-2__beam hero-cinematic-2__beam--one" />
      <div className="hero-cinematic-2__beam hero-cinematic-2__beam--two" />

      <div className="hero-cinematic-2__words">
        {floatingWords.map((word, index) => (
          <span
            key={`${word.text}-${index}`}
            className={`hero-cinematic-2__word hero-cinematic-2__word--${word.layer} hero-cinematic-2__word--${word.size}`}
            style={{
              '--x': word.x,
              '--y': word.y,
              '--delay': word.delay,
            }}
          >
            {word.text}
          </span>
        ))}
      </div>

      <div className="hero-cinematic-2__vignette" />
      <div className="hero-cinematic-2__fade" />
    </div>
  )
}
