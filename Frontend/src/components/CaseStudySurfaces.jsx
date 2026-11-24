import { Camera, FileUp, FolderOpen, Languages, Layers, MessageSquareText, Mic, ScanText, Share2, TextCursorInput, AudioLines, NotebookPen } from 'lucide-react'

const workflowIcons = {
  'copy-text-on-screen': [FileUp, TextCursorInput, Share2],
  'ai-text-scanner': [Camera, ScanText, MessageSquareText],
  'ai-transcript-audio-to-text': [Mic, AudioLines, MessageSquareText],
  'handwriting-to-text-scanner': [Camera, NotebookPen, FolderOpen],
  'live-transcribe': [Mic, Languages, FolderOpen],
  'ai-study-tutor': [FileUp, MessageSquareText, Layers],
}

export default function CaseStudySurfaces({ slug, name, surfaces, screens, hero = false, eager = hero }) {
  return <div className={`case-surfaces case-surface-showcase${hero ? ' case-hero-mockups' : ''}`}>
    {surfaces.map(([title, description], index) => {
      const screen = screens[index % screens.length]
      const Icon = workflowIcons[slug]?.[index] || ScanText
      return <figure key={title}>
        <a className="surface-art" href={screen?.src} target="_blank" rel="noopener noreferrer" aria-label={`View ${name} screen for ${title} (opens in new tab)`}>
          <span className="surface-workflow-icon" aria-hidden="true"><Icon /></span>
          <span className="surface-orbit" aria-hidden="true" />
          <span className="surface-ground" aria-hidden="true" />
          <span className="surface-phone">
            <img src={`/product-screenshots/${slug}-surface-${index + 1}.png`} alt={`${name} screen content accompanying ${title}`} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager && index === 0 ? 'high' : 'auto'} decoding="async" width="720" height="1520" />
          </span>
          <span className="surface-spark" aria-hidden="true"><i /><i /><i /></span>
        </a>
        {!hero && <figcaption><h3>{title}</h3><p>{description}</p></figcaption>}
      </figure>
    })}
  </div>
}
