import { FileText, ScanText, Copy, AudioLines } from 'lucide-react'
import { PRODUCT_STORIES } from '../data/productStories'

export default function ProductWorkflow({ slug, compact = false }) {
  const story = PRODUCT_STORIES[slug]
  if (!story) return null
  const audio = slug === 'ai-transcript-audio-to-text'
  return (
    <figure className={`product-workflow tone-${story.color} ${compact ? 'workflow-compact' : ''}`}>
      <div className="workflow-toolbar"><span>APPZYS / {audio ? 'Audio to insight' : 'Image to editable text'}</span><span>Workflow illustration</span></div>
      <div className="workflow-stages" aria-hidden="true">
        <div className="workflow-sheet source-sheet">
          {audio ? <AudioLines size={38} /> : <FileText size={32} />}
          <span className="sheet-label">{audio ? 'Your recording' : 'Your source'}</span>
          <div className="paper-lines"><i /><i /><i /><i /></div>
          <span className="sheet-caption">{audio ? 'Meeting notes.m4a' : 'Ideas worth keeping.'}</span>
        </div>
        <div className="workflow-bridge"><ScanText size={25} /><span>{story.steps[1].title}</span></div>
        <div className="workflow-sheet result-sheet">
          <span className="result-label">{audio ? 'Transcript' : 'Extracted text'}</span>
          <p>{audio ? 'Let’s turn the next idea into something useful.' : 'Ideas worth keeping.\nReady to reuse.'}</p>
          <div className="result-action"><Copy size={15} /> {audio ? 'Review & summarize' : 'Copy & reuse'}</div>
        </div>
      </div>
      <figcaption>{compact ? `${story.outcome} Illustrated, not a production screenshot.` : 'Illustrated workflow • Not a production app screenshot'}</figcaption>
    </figure>
  )
}
