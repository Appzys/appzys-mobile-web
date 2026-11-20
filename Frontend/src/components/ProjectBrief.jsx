import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVICES_LIST } from '../data/appData'

export default function ProjectBrief() {
  const [service, setService] = useState(SERVICES_LIST[0].title)
  const [platform, setPlatform] = useState('Not decided yet')
  const [backend, setBackend] = useState('Not sure yet')
  const summary = `Project brief: ${platform}; existing backend: ${backend}.`
  return <details className="project-brief">
    <summary>Prefer a technical starting point? Prepare an optional project brief.</summary>
    <div className="brief-fields">
      <p>These choices help start a scoping conversation. They do not generate a quote or a delivery commitment.</p>
      <label htmlFor="brief-service">What do you need?</label>
      <select id="brief-service" value={service} onChange={event => setService(event.target.value)}>{SERVICES_LIST.map(item => <option key={item.id}>{item.title}</option>)}</select>
      <label htmlFor="brief-platform">Target platform</label>
      <select id="brief-platform" value={platform} onChange={event => setPlatform(event.target.value)}>{['Not decided yet', 'Android', 'iOS', 'Android and iOS'].map(item => <option key={item}>{item}</option>)}</select>
      <label htmlFor="brief-backend">Do you have an existing backend?</label>
      <select id="brief-backend" value={backend} onChange={event => setBackend(event.target.value)}>{['Not sure yet', 'Yes, with documented APIs', 'Yes, needs an API review', 'No, starting from scratch'].map(item => <option key={item}>{item}</option>)}</select>
      <p aria-live="polite">{summary}</p>
      <Link className="primary-button" to={`/contact?service=${encodeURIComponent(service)}&brief=${encodeURIComponent(summary)}`}>Continue with this brief</Link>
    </div>
  </details>
}
