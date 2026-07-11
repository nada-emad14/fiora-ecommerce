import { Sparkles } from "lucide-react"
import "./Hero.css"


const Hero = () => {
  return (
    
      <section className="hero-panel">
        <div>
          <p className="eyebrow">New season, elevated essentials</p>
          <h2>Designed for modern routines and effortless movement.</h2>
          <p className="hero-copy">
            Discover wearable staples with premium textures, soft tailoring, and
            a calm, confident feel.
          </p>
          <div className="hero-actions">
            <a href="#collections" className="primary-button">
              Shop the edit
            </a>
            <div className="pill-row">
              <span className="pill">
                <Sparkles size={14} /> Free express shipping
              </span>
              <span className="pill">30-day returns</span>
            </div>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-badge">Spring / Summer 2026</div>
          <p>
            Every piece is crafted to feel polished, lightweight, and timeless.
          </p>
        </div>
      </section>
  )
}

export default Hero
