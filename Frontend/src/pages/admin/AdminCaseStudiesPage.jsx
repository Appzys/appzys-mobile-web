import { useEffect, useState } from 'react'
import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  Clock,
  Edit3,
  ExternalLink,
  Filter,
  FolderGit2,
  Layers,
  Plus,
  RefreshCw,
  Search,
  Smartphone,
  Sparkles,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import { api } from '../../services/api'

const CATEGORIES = [
  'ALL',
  'AI & OCR Architecture',
  'Mobile App Development',
  'Logistics & Fleet',
  'Fintech & Payments',
  'Healthcare & IoT',
]

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCase, setEditingCase] = useState(null)
  const [saving, setSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)

  const [formData, setFormData] = useState({
    appName: '',
    slug: '',
    tagline: '',
    category: 'AI & OCR Architecture',
    installsLabel: 'Live Production Build',
    rating: 4.9,
    summary: '',
    challenge: '',
    solution: '',
    techStackCsv: 'Flutter, Dart, Firebase, SQLite',
    featured: true,
  })

  const loadCaseStudies = async () => {
    setLoading(true)
    try {
      const res = await api.getAdminCaseStudies()
      if (res?.data) {
        setCaseStudies(res.data)
      }
    } catch (err) {
      console.error('Failed to load case studies:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCaseStudies()
  }, [])

  const handleOpenCreateModal = () => {
    setEditingCase(null)
    setFormData({
      appName: '',
      slug: '',
      tagline: '',
      category: 'Mobile App Development',
      installsLabel: 'Production App',
      rating: 4.9,
      summary: '',
      challenge: 'Client faced high latency and unstable performance with previous vendor codebase.',
      solution: 'Re-architected from scratch using Flutter BLoC, zero-latency background isolates, and clean reactive state.',
      techStackCsv: 'Flutter, Dart, Spring Boot, MySQL',
      featured: true,
    })
    setModalOpen(true)
  }

  const handleOpenEditModal = (item) => {
    setEditingCase(item)
    setFormData({
      appName: item.appName || item.title || '',
      slug: item.slug || '',
      tagline: item.tagline || '',
      category: item.category || 'Mobile App Development',
      installsLabel: item.installsLabel || item.downloads || 'Live on App Store & Play',
      rating: item.rating || 4.9,
      summary: item.summary || item.description || '',
      challenge: item.challenge || '',
      solution: item.solution || '',
      techStackCsv: item.techStackCsv || (Array.isArray(item.techStack) ? item.techStack.join(', ') : 'Flutter, Dart'),
      featured: item.featured ?? true,
    })
    setModalOpen(true)
  }

  const handleAppNameChange = (e) => {
    const appName = e.target.value
    if (!editingCase) {
      const autoSlug = appName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData((prev) => ({ ...prev, appName, slug: autoSlug }))
    } else {
      setFormData((prev) => ({ ...prev, appName }))
    }
  }

  const handleSaveCaseStudy = async (e) => {
    e.preventDefault()
    if (!formData.appName.trim()) {
      alert('App name is required.')
      return
    }

    setSaving(true)
    try {
      if (editingCase) {
        await api.updateAdminCaseStudy(editingCase.id, formData)
        setStatusMessage('Case study updated successfully!')
      } else {
        await api.createAdminCaseStudy(formData)
        setStatusMessage('New case study published successfully!')
      }
      setModalOpen(false)
      await loadCaseStudies()
    } catch (err) {
      console.error(err)
      alert('Failed to save case study.')
    } finally {
      setSaving(false)
      setTimeout(() => setStatusMessage(null), 4000)
    }
  }

  const handleDeleteCaseStudy = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete case study "${title}"?`)) {
      return
    }
    try {
      await api.deleteAdminCaseStudy(id)
      setCaseStudies((prev) => prev.filter((c) => c.id !== id))
      setStatusMessage('Case study removed.')
      setTimeout(() => setStatusMessage(null), 3000)
    } catch (err) {
      console.error(err)
      alert('Failed to delete case study.')
    }
  }

  const handleToggleFeatured = async (item) => {
    const newFeatured = !item.featured
    try {
      await api.updateAdminCaseStudy(item.id, { ...item, featured: newFeatured })
      setCaseStudies((prev) =>
        prev.map((c) => (c.id === item.id ? { ...c, featured: newFeatured } : c))
      )
    } catch (err) {
      console.error(err)
    }
  }

  // Filter logic
  const filteredCases = caseStudies.filter((item) => {
    const matchesCat =
      selectedCategory === 'ALL' || item.category === selectedCategory
    const q = search.toLowerCase()
    const name = (item.appName || item.title || '').toLowerCase()
    const slug = (item.slug || '').toLowerCase()
    const summary = (item.summary || item.description || '').toLowerCase()
    return matchesCat && (!q || name.includes(q) || slug.includes(q) || summary.includes(q))
  })

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {statusMessage && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 shadow-sm animate-fade-in">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <p className="text-xs font-bold">{statusMessage}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
              <Sparkles className="h-3 w-3" />
              Day 12 CMS
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Portfolio & Proof-of-Work
            </span>
          </div>
          <h1 className="mt-1 font-display text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Case Studies & Portfolio CMS
          </h1>
          <p className="text-xs text-slate-500 sm:text-sm">
            Publish completed client projects, architecture teardowns, and metric achievements in 5 minutes without touching code.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadCaseStudies}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1D63ED] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-600"
          >
            <Plus className="h-4 w-4" />
            <span>+ Add Client Case Study</span>
          </button>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Total Case Studies</span>
            <FolderGit2 className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">{caseStudies.length}</div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Featured on Homepage</span>
            <Star className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-amber-600">
            {caseStudies.filter((c) => c.featured).length}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Avg Store Rating</span>
            <Smartphone className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-600">4.9 ★</div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Publish Turnaround</span>
            <Clock className="h-4 w-4 text-purple-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-purple-600">&lt; 5 mins</div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by app name, slug, or challenge keywords..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Verticals' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-slate-400">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
            <p className="mt-3 text-xs font-semibold">Loading case studies repository...</p>
          </div>
        ) : filteredCases.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Layers className="h-10 w-10 text-slate-300" />
            <h3 className="mt-3 text-sm font-bold text-slate-800">No case studies found</h3>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              Click "+ Add Client Case Study" above to register a new client win or live production release.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 pl-6 pr-4">App & Challenge</th>
                  <th className="py-3.5 px-4">Vertical</th>
                  <th className="py-3.5 px-4">Metric & Rating</th>
                  <th className="py-3.5 px-4">Tech Stack</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredCases.map((item) => {
                  const title = item.appName || item.title || 'Untitled App'
                  const summary = item.summary || item.description || ''
                  const metric = item.installsLabel || item.downloads || 'Live Production'
                  const tags = item.techStackCsv
                    ? item.techStackCsv.split(',').map((t) => t.trim())
                    : Array.isArray(item.techStack)
                    ? item.techStack
                    : ['Flutter']

                  return (
                    <tr key={item.id} className="transition hover:bg-slate-50/60">
                      <td className="py-4 pl-6 pr-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#1D63ED] to-blue-400 text-white font-black text-sm shadow-xs">
                            {title.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900">{title}</p>
                            <p className="text-[11px] font-mono text-slate-400">
                              /case-studies/{item.slug}
                            </p>
                            <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">
                              {item.tagline || summary || 'No description provided.'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-100">
                          {item.category || 'Mobile App'}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-semibold text-slate-800 text-[11px]">{metric}</div>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span>{item.rating || 4.9}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                          {tags.length > 3 && (
                            <span className="text-[9px] font-semibold text-slate-400">
                              +{tags.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(item)}
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold transition ${
                            item.featured
                              ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          title="Click to toggle homepage showcase"
                        >
                          <Star
                            className={`h-3 w-3 ${
                              item.featured ? 'fill-amber-500 text-amber-500' : 'text-slate-400'
                            }`}
                          />
                          <span>{item.featured ? 'Featured' : 'Standard'}</span>
                        </button>
                      </td>

                      <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(item)}
                            className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
                            title="Edit Case Study"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCaseStudy(item.id, title)}
                            className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 transition hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                            title="Delete Case Study"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT CASE STUDY MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative my-8 w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-fade-in sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D63ED]">
                  {editingCase ? 'Portfolio Editor' : 'Proof-of-Work Registration'}
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {editingCase ? 'Edit Client Case Study' : 'Publish New Client Case Study'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCaseStudy} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700">App Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.appName}
                    onChange={handleAppNameChange}
                    placeholder="e.g. QuickTransit Driver"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">URL Slug *</label>
                  <div className="mt-1 flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-500">
                    <span className="text-slate-400">/case-studies/</span>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      placeholder="quicktransit-driver"
                      className="ml-0.5 flex-1 bg-transparent font-mono text-xs font-semibold text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Industry / Vertical</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
                  >
                    {CATEGORIES.filter((c) => c !== 'ALL').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Metric Highlight</label>
                  <input
                    type="text"
                    value={formData.installsLabel}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, installsLabel: e.target.value }))
                    }
                    placeholder="e.g. 100K+ Active Drivers"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Rating (0 - 5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, rating: parseFloat(e.target.value) || 4.9 }))
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Tagline / Pitch</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, tagline: e.target.value }))
                  }
                  placeholder="e.g. High-concurrency offline-first dispatch app for 200,000 daily fleet trips"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={formData.techStackCsv}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, techStackCsv: e.target.value }))
                  }
                  placeholder="Flutter, Dart, Spring Boot, WebSockets, Google Maps SDK"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Summary / Overview</label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, summary: e.target.value }))
                  }
                  placeholder="Executive summary of the client partnership, product goals, and business results."
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700">The Problem / Challenge</label>
                  <textarea
                    rows={3}
                    value={formData.challenge}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, challenge: e.target.value }))
                    }
                    placeholder="What was breaking or slow before Appzys stepped in?"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Appzys Engineering Solution</label>
                  <textarea
                    rows={3}
                    value={formData.solution}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, solution: e.target.value }))
                    }
                    placeholder="How did our senior engineering pod resolve it?"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Featured toggle */}
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                <div>
                  <span className="text-xs font-bold text-slate-900">Feature on Homepage</span>
                  <p className="text-[11px] text-slate-500">
                    Featured case studies show up on the front page and at the top of the portfolio carousel.
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, featured: e.target.checked }))
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-amber-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1D63ED] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 disabled:opacity-50"
                >
                  {saving && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
                  <span>{editingCase ? 'Save Changes' : 'Publish Case Study'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
