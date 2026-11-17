import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Filter,
  List,
  Search,
  Sparkles,
  Tag,
  User,
} from 'lucide-react'
import { api } from '../services/api'

const CATEGORIES = [
  'ALL',
  'On-Device AI & OCR',
  'Mobile App Engineering',
  'Product Strategy & Costing',
  'Service Architecture',
  'Store Compliance',
]

// Extract top 3-4 section headings from markdown to display mini Table of Contents inside each card
function extractMiniToc(markdown) {
  if (!markdown) return []
  const matches = []
  const lines = markdown.split('\n')
  for (const line of lines) {
    const m = line.match(/^##\s+(.+)$/)
    if (m) {
      const clean = m[1].replace(/\*\*/g, '').replace(/[*_#]/g, '').trim()
      if (clean.toLowerCase() !== 'introduction' && clean.toLowerCase() !== 'conclusion') {
        matches.push(clean)
      }
      if (matches.length >= 3) break
    }
  }
  return matches
}

export default function BlogHubPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [search, setSearch] = useState('')

  useEffect(() => {
    let active = true
    api.getBlogs()
      .then((res) => {
        if (active && res?.data) {
          setBlogs(res.data)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  // Filtered articles
  const filteredBlogs = blogs.filter((b) => {
    const matchesCat =
      selectedCategory === 'ALL' ||
      b.category?.toLowerCase() === selectedCategory.toLowerCase()
    const q = search.toLowerCase().trim()
    const matchesSearch =
      !q ||
      b.title?.toLowerCase().includes(q) ||
      b.excerpt?.toLowerCase().includes(q) ||
      b.category?.toLowerCase().includes(q) ||
      b.tagsCsv?.toLowerCase().includes(q)
    return matchesCat && matchesSearch
  })

  const featuredBlog = blogs[0]
  const listBlogs = selectedCategory === 'ALL' && !search ? blogs.slice(1) : filteredBlogs

  const formatDate = (isoString) => {
    if (!isoString) return 'Oct 27, 2026'
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return 'Oct 27, 2026'
    }
  }

  return (
    <div className="bg-[#FAFBFD] pb-24 text-slate-900">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white py-16 sm:py-20">
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-blue-700 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Engineering &amp; Architecture Insights</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-[#0A192F] sm:text-5xl lg:text-6xl">
            Mobile App &amp; AI Engineering Blog
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Technical teardowns, app costing blueprints, and battle-tested Flutter architectures directly from senior mobile developers. No generic AI fluff.
          </p>

          {/* Search Bar */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles: 'Cost', 'OCR', 'Flutter Architecture', 'Store Review'..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* Category Filter Pills (Orange Mantra Style) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-[#0A192F] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {cat === 'ALL' ? 'All Articles' : `• ${cat}`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN ARTICLES CONTAINER */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            <p className="mt-3 text-xs font-semibold text-slate-500">Loading articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
            <BookOpen className="mx-auto h-10 w-10 text-slate-300" />
            <h3 className="mt-3 text-base font-bold text-slate-800">No articles match your query</h3>
            <p className="mt-1 text-xs text-slate-500">
              Try searching for a different keyword or select "All Articles".
            </p>
          </div>
        ) : (
          <>
            {/* FEATURED ARTICLE HERO (Orange Mantra Featured Spot) */}
            {selectedCategory === 'ALL' && !search && featuredBlog && (
              <div className="mb-14 overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-md transition hover:shadow-lg">
                <div className="grid gap-0 lg:grid-cols-12">
                  <div className="relative overflow-hidden lg:col-span-7">
                    <img
                      src={
                        featuredBlog.coverImage ||
                        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&auto=format&fit=crop&q=80'
                      }
                      alt={featuredBlog.title}
                      className="h-72 w-full object-cover transition duration-500 hover:scale-105 sm:h-96 lg:h-full"
                    />
                    <div className="absolute top-4 left-4 rounded-full bg-blue-600/90 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white backdrop-blur-xs">
                      Featured Guide
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-5">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
                        <span>•</span>
                        <span>{featuredBlog.category}</span>
                      </div>

                      <Link to={`/blog/${featuredBlog.slug}`}>
                        <h2 className="mt-3 font-display text-2xl font-black leading-tight text-[#0A192F] transition hover:text-blue-600 sm:text-3xl">
                          {featuredBlog.title}
                        </h2>
                      </Link>

                      <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                        {featuredBlog.excerpt}
                      </p>

                      {/* Mini Table of Contents inside Featured Card */}
                      {extractMiniToc(featuredBlog.contentMarkdown).length > 0 && (
                        <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#1D63ED]">
                            <List className="h-3.5 w-3.5" />
                            <span>In this Blueprint:</span>
                          </div>
                          <div className="mt-2.5 flex flex-wrap gap-2">
                            {extractMiniToc(featuredBlog.contentMarkdown).map((topic, i) => (
                              <Link
                                key={i}
                                to={`/blog/${featuredBlog.slug}`}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-blue-600 hover:text-white transition"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                <span>{topic}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 border-t border-slate-100 pt-5">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          <span>{formatDate(featuredBlog.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          <span>{featuredBlog.readTime || '5 min read'}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Link
                          to={`/blog/${featuredBlog.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-bold text-[#1D63ED] hover:gap-3 transition-all"
                        >
                          <span>Read Full Blueprint</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ORANGE MANTRA STYLE ARTICLE GRID */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-xl font-black text-[#0A192F]">
                  {selectedCategory === 'ALL' && !search
                    ? 'Latest Engineering Articles'
                    : `Articles in "${selectedCategory === 'ALL' ? search : selectedCategory}"`}
                </h3>
                <span className="text-xs font-bold text-slate-400">
                  {listBlogs.length} {listBlogs.length === 1 ? 'Article' : 'Articles'}
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {listBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                  >
                    {/* Cover Thumbnail */}
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="relative block h-48 w-full overflow-hidden bg-slate-100"
                    >
                      <img
                        src={
                          blog.coverImage ||
                          'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80'
                        }
                        alt={blog.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </Link>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                      <div>
                        {/* Dot Category Label (Orange Mantra Style) */}
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D63ED]">
                          <span className="text-blue-500">•</span>
                          <span>{blog.category || 'Mobile Engineering'}</span>
                        </div>

                        {/* Title */}
                        <Link to={`/blog/${blog.slug}`}>
                          <h4 className="mt-2.5 font-display text-base font-extrabold text-[#0A192F] line-clamp-2 transition group-hover:text-[#1D63ED] sm:text-lg">
                            {blog.title}
                          </h4>
                        </Link>

                        {/* Excerpt */}
                        <p className="mt-2.5 text-xs leading-relaxed text-slate-600 line-clamp-2">
                          {blog.excerpt || 'Read the complete architectural teardown and technical insights.'}
                        </p>

                        {/* Mini Table of Contents inside Card Box */}
                        {extractMiniToc(blog.contentMarkdown).length > 0 && (
                          <div className="mt-3.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-slate-700">
                              <List className="h-3 w-3 text-blue-600" />
                              <span>Inside this Guide:</span>
                            </div>
                            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                              {extractMiniToc(blog.contentMarkdown).map((topic, i) => (
                                <li key={i} className="flex items-center gap-1.5 truncate">
                                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[9px] font-bold text-blue-700">
                                    {i + 1}
                                  </span>
                                  <span className="truncate font-medium">{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Card Footer: Date & Read Time */}
                      <div className="mt-5 border-t border-slate-100 pt-4 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                        <span>{formatDate(blog.createdAt)}</span>
                        <span>{blog.readTime || '5 min read'}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </>
        )}

        {/* BOTTOM CTA BAR */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A192F] via-[#0F2557] to-[#1D4ED8] p-8 text-white shadow-xl sm:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-blue-200">
              <Sparkles className="h-3.5 w-3.5 text-blue-300" />
              Direct Senior Engineering Pod
            </span>
            <h3 className="mt-4 font-display text-2xl font-black tracking-tight sm:text-3xl">
              Have an App Idea or Need Architecture Review?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Skip junior agency sales pitches. Speak directly with senior Flutter &amp; AI developers and get a free 48-hour architecture &amp; cost audit.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#0A192F] shadow-md transition hover:bg-blue-50"
              >
                <span>Request Free 48-Hr Audit</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/#estimator"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/20"
              >
                <span>Launch Cost Estimator</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
