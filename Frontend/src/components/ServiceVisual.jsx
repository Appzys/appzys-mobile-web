import { Smartphone, Plug, Check, Code2, Layers, Users, ShieldCheck } from 'lucide-react'

const VISUALS = {
  'mobile-app-development': { icon: Smartphone, title: 'One product. Two platforms.', steps: ['Plan', 'Build', 'Launch'], symbol: Layers },
  'mobile-app-integration': { icon: Plug, title: 'Your platform, connected.', steps: ['Backend', 'API', 'Mobile'], symbol: Code2 },
  'app-enhancement-maintenance': { icon: ShieldCheck, title: 'A stronger next release.', steps: ['Review', 'Improve', 'Release'], symbol: Check },
  'dedicated-flutter-development': { icon: Users, title: 'More capacity. One team.', steps: ['Your team', 'Flutter', 'Delivery'], symbol: Code2 },
}

// Decorative, code-native service illustrations; all essential content lives in the card.
export default function ServiceVisual({ slug }) {
  const { icon: Icon, symbol: Symbol, title, steps } = VISUALS[slug]
  return (
    <div className={`service-visual visual-${slug}`} aria-hidden="true">
      <div className="service-visual-caption"><Icon size={18} /><span>{title}</span></div>
      <div className="service-visual-flow">
        <span className="service-flow-node"><Symbol size={22} /><span>{steps[0]}</span></span>
        <span className="service-flow-connector" />
        <span className="service-flow-node service-flow-main"><Icon size={26} /><span>{steps[1]}</span></span>
        <span className="service-flow-connector" />
        <span className="service-flow-node"><Check size={22} /><span>{steps[2]}</span></span>
      </div>
    </div>
  )
}
