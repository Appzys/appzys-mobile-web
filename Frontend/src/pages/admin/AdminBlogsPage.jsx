import { useEffect, useState } from 'react'
import {
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Edit3,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Tag,
  Trash2,
  User,
  X,
} from 'lucide-react'
import { api } from '../../services/api'

const CATEGORIES = [
  'ALL',
  'Mobile App Engineering',
  'AI & OCR Architecture',
  'Product Strategy & Costing',
  'Cross-Platform Flutter',
]

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [saving, setSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Mobile App Engineering',
    author: 'Appzys Senior Engineering Pod',
    readTime: '5 min read',
    tagsCsv: 'Flutter, Mobile Architecture',
    coverImage: '',
    excerpt: '',
    contentMarkdown: '',
    published: true,
  })

  const loadBlogs = async () => {
    setLoading(true)
    try {
      const res = await api.getAdminBlogs()
      if (res?.data) {
        setBlogs(res.data)
      }
    } catch (err) {
      console.error('Failed to load blogs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBlogs()
  }, [])

  const handleOpenCreateModal = () => {
    setEditingBlog(null)
    setFormData({
      title: '',
      slug: '',
      category: 'Mobile App Engineering',
      author: 'Appzys Senior Engineering Pod',
      readTime: '5 min read',
      tagsCsv: 'Flutter, Mobile Architecture',
      coverImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80',
      excerpt: '',
      contentMarkdown: `## Executive Overview\n\nExplain the core technical challenge and how modern architecture solves it.\n\n### Key Architectural Pillars\n1. Zero-latency client execution\n2. Predictable monthly server costs\n3. Native-tier performance`,
      published: true,
    })
    setModalOpen(true)
  }

  const handleOpenEditModal = (blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      category: blog.category || 'Mobile App Engineering',
      author: blog.author || 'Appzys Senior Engineering Pod',
      readTime: blog.readTime || '5 min read',
      tagsCsv: blog.tagsCsv || '',
      coverImage: blog.coverImage || '',
      excerpt: blog.excerpt || '',
      contentMarkdown: blog.contentMarkdown || '',
      published: blog.published ?? true,
    })
    setModalOpen(true)
  }

  const handleTitleChange = (e) => {
    const title = e.target.value
    if (!editingBlog) {
      const autoSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData((prev) => ({ ...prev, title, slug: autoSlug }))
    } else {
      setFormData((prev) => ({ ...prev, title }))
    }
  }

  const handleSaveArticle = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert('Article title is required.')
      return
    }

    setSaving(true)
    try {
      if (editingBlog) {
        await api.updateAdminBlog(editingBlog.id, formData)
        setStatusMessage('Article successfully updated!')
      } else {
        await api.createAdminBlog(formData)
        setStatusMessage('New article successfully published!')
      }
      setModalOpen(false)
      await loadBlogs()
    } catch (err) {
      console.error(err)
      alert('Failed to save article. Please try again.')
    } finally {
      setSaving(false)
      setTimeout(() => setStatusMessage(null), 4000)
    }
  }

  const handleDeleteArticle = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }
    try {
      await api.deleteAdminBlog(id)
      setBlogs((prev) => prev.filter((b) => b.id !== id))
      setStatusMessage('Article removed successfully.')
      setTimeout(() => setStatusMessage(null), 3000)
    } catch (err) {
      console.error(err)
      alert('Failed to delete article.')
    }
  }

  const handleTogglePublished = async (blog) => {
    const newStatus = !blog.published
    try {
      await api.updateAdminBlog(blog.id, { ...blog, published: newStatus })
      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, published: newStatus } : b))
      )
    } catch (err) {
      console.error(err)
    }
  }

  // Filtered list
  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory =
      selectedCategory === 'ALL' || b.category === selectedCategory
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      b.title?.toLowerCase().includes(q) ||
      b.slug?.toLowerCase().includes(q) ||
      b.excerpt?.toLowerCase().includes(q) ||
      b.author?.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Top Banner Alert / Status */}
      {statusMessage && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 shadow-sm animate-fade-in">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <p className="text-xs font-bold">{statusMessage}</p>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
              <Sparkles className="h-3 w-3" />
              Day 12 CMS
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Content & SEO Distribution
            </span>
          </div>
          <h1 className="mt-1 font-display text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Articles & Dynamic Blog CMS
          </h1>
          <p className="text-xs text-slate-500 sm:text-sm">
            Publish technical teardowns, cost guides, and AI/OCR architectural insights without code changes. Directly fuels high-intent Google rankings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadBlogs}
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
            <span>+ Write New Article</span>
          </button>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Total Articles</span>
            <FileText className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">{blogs.length}</div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Published Live</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-600">
            {blogs.filter((b) => b.published).length}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Drafts</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-amber-600">
            {blogs.filter((b) => !b.published).length}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">SEO Target Index</span>
            <Tag className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-indigo-600">Google + GSC</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title, slug, topic, or author..."
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
              {cat === 'ALL' ? 'All Topics' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-slate-400">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
            <p className="mt-3 text-xs font-semibold">Loading articles database...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <BookOpen className="h-10 w-10 text-slate-300" />
            <h3 className="mt-3 text-sm font-bold text-slate-800">No articles found</h3>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              {search || selectedCategory !== 'ALL'
                ? 'Try adjusting your search query or topic filter.'
                : 'Click "+ Write New Article" above to publish your first high-intent technical teardown.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 pl-6 pr-4">Article & Slug</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author & Read Time</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="transition hover:bg-slate-50/60">
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-start gap-3">
                        {blog.coverImage ? (
                          <img
                            src={blog.coverImage}
                            alt=""
                            className="h-12 w-16 shrink-0 rounded-lg object-cover border border-slate-200"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        ) : (
                          <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                            <FileText className="h-5 w-5" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 line-clamp-1">{blog.title}</p>
                          <p className="mt-0.5 text-[11px] font-mono text-slate-400">/{blog.slug}</p>
                          <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">
                            {blog.excerpt || 'No summary excerpt provided.'}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                        {blog.category || 'General'}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-[11px] font-semibold text-slate-700">{blog.author}</div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Clock className="h-3 w-3" />
                        <span>{blog.readTime || '5 min read'}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleTogglePublished(blog)}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold transition ${
                          blog.published
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                        title="Click to toggle status"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            blog.published ? 'bg-emerald-600' : 'bg-amber-600'
                          }`}
                        />
                        <span>{blog.published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-[11px] text-slate-500">
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : '—'}
                    </td>

                    <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(blog)}
                          className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
                          title="Edit Article"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteArticle(blog.id, blog.title)}
                          className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 transition hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                          title="Delete Article"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT ARTICLE MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative my-8 w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-fade-in sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D63ED]">
                  {editingBlog ? 'Article Editor' : 'Publishing Studio'}
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {editingBlog ? 'Edit Technical Article' : 'Write & Publish New Article'}
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

            <form onSubmit={handleSaveArticle} className="mt-5 space-y-4">
              {/* Title & Slug */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Cost to Build Mobile App in India 2026"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    URL Slug (Google SEO Path) *
                  </label>
                  <div className="mt-1 flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-500">
                    <span className="text-slate-400">/blog/</span>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      placeholder="cost-to-build-mobile-app-india-2026"
                      className="ml-0.5 flex-1 bg-transparent font-mono text-xs font-semibold text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Category, Author, Read Time */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Category</label>
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
                  <label className="block text-xs font-bold text-slate-700">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, author: e.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, readTime: e.target.value }))
                    }
                    placeholder="e.g. 5 min read"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Cover Image URL & Tags */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, coverImage: e.target.value }))
                    }
                    placeholder="https://images.unsplash.com/photo-..."
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    SEO Keywords / Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tagsCsv}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, tagsCsv: e.target.value }))
                    }
                    placeholder="Flutter, App Cost, Mobile Architecture"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Excerpt / Meta Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Google SEO Meta Excerpt (1-2 sentences shown on SERP)
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  placeholder="A transparent breakdown of mobile app development costs across India, agency pricing models, and how to avoid $20,000 junior developer rewrites."
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none"
                />
              </div>

              {/* Content Markdown */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    Full Content (Markdown Supported)
                  </label>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Supports ## Headings, lists, code blocks
                  </span>
                </div>
                <textarea
                  rows={8}
                  value={formData.contentMarkdown}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, contentMarkdown: e.target.value }))
                  }
                  placeholder="Write your technical teardown or article content here..."
                  className="mt-1 w-full font-mono rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-[#1D63ED] focus:bg-white focus:outline-none leading-relaxed"
                />
              </div>

              {/* Status toggle */}
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                <div>
                  <span className="text-xs font-bold text-slate-900">Publish Immediately</span>
                  <p className="text-[11px] text-slate-500">
                    If checked, this article will appear live on the public articles hub and be eligible for Google indexing.
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, published: e.target.checked }))
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>

              {/* Action Buttons */}
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
                  <span>{editingBlog ? 'Save Changes' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
