import { useEffect, useRef, useState } from 'react'
import { Download, Star, Smartphone, BriefcaseBusiness } from 'lucide-react'

const METRICS = [
  { value: 620, suffix: 'K+', decimals: 0, label: 'Google Play downloads', detail: 'Across our in-house app portfolio', accessible: '620 thousand plus', icon: Download },
  { value: 14, suffix: 'K+', decimals: 0, label: 'App Store ratings', detail: 'Reported on the US App Store', accessible: '14 thousand plus', icon: Smartphone },
  { value: 4.6, suffix: '/5', decimals: 1, label: 'Product rating', detail: 'Referenced US App Store rating', accessible: '4.6 out of 5', icon: Star },
  { value: 8, suffix: '+', decimals: 0, label: 'Years of experience', detail: 'In mobile application development', accessible: '8 plus years', icon: BriefcaseBusiness },
]

export default function ProofMetrics() {
  const sectionRef = useRef(null)
  // Final values are the fallback when motion or observer support is unavailable.
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches || !('IntersectionObserver' in window)) return

    let frame = 0
    let started = false
    let disposed = false
    setProgress(0)

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started || disposed) return
      started = true
      observer.disconnect()
      let start
      const tick = (timestamp) => {
        if (disposed) return
        start ??= timestamp
        const elapsed = Math.min((timestamp - start) / 1600, 1)
        setProgress(1 - (1 - elapsed) ** 3)
        if (elapsed < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.25 })

    observer.observe(sectionRef.current)
    const finishForReducedMotion = () => {
      if (!motion.matches) return
      started = true
      observer.disconnect()
      cancelAnimationFrame(frame)
      setProgress(1)
    }
    motion.addEventListener('change', finishForReducedMotion)
    return () => {
      disposed = true
      observer.disconnect()
      cancelAnimationFrame(frame)
      motion.removeEventListener('change', finishForReducedMotion)
    }
  }, [])

  return (
    <section ref={sectionRef} className="proof-section" aria-labelledby="proof-title">
      <div className="section-shell">
        <div className="proof-heading">
          <h2 id="proof-title">Product experience, in numbers.</h2>
        </div>
        <dl className="proof-grid">
          {METRICS.map(({ value, suffix, decimals, label, detail, accessible, icon: Icon }) => (
            <div key={label} className="proof-metric">
              <dt><Icon size={18} aria-hidden="true" />{label}</dt>
              <dd>
                <strong aria-hidden="true">
                  {(progress === 1 ? value : Math.floor(value * progress * 10 ** decimals) / 10 ** decimals).toFixed(decimals)}
                  <span className="metric-suffix">{suffix}</span>
                </strong>
                <span className="sr-only">{accessible}</span>
                <p>{detail}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
