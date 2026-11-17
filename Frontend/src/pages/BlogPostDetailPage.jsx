import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  List,
  MessageSquare,
  Share2,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react'
import { api } from '../services/api'

export default function BlogPostDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [related, setRelated] = useState([])
  const [copied, setCopied] = useState(false)
  const [activeTocId, setActiveTocId] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    api.getBlogBySlug(slug)
      .then((res) => {
        if (active && res?.data) {
          setBlog(res.data)
        }
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    api.getBlogs()
      .then((res) => {
        if (active && res?.data) {
          setRelated(res.data.filter((b) => b.slug !== slug).slice(0, 3))
        }
      })
      .catch(() => {})

    window.scrollTo({ top: 0, behavior: 'smooth' })

    return () => {
      active = false
    }
  }, [slug])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  // Parse Table of Contents from markdown headings (##, ###)
  const parseTableOfContents = (markdown) => {
    if (!markdown) return []
    const lines = markdown.split('\n')
    const headings = []
    lines.forEach((line) => {
      const matchH2 = line.match(/^##\s+(.+)$/)
      const matchH3 = line.match(/^###\s+(.+)$/)
      if (matchH2) {
        const text = matchH2[1].replace(/\*\*/g, '').replace(/[*_#]/g, '').trim()
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        headings.push({ text, id, level: 2 })
      } else if (matchH3) {
        const text = matchH3[1].replace(/\*\*/g, '').replace(/[*_#]/g, '').trim()
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        headings.push({ text, id, level: 3 })
      }
    })
    return headings
  }

  const tocItems = blog?.contentMarkdown ? parseTableOfContents(blog.contentMarkdown) : []

  // Inline text renderer: **bold**, *italic*, `code`
  const renderInline = (text) => {
    if (!text) return null
    // Split on **bold**, *italic*, `code`
    const parts = []
    let remaining = text
    let key = 0
    const inlineRe = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g
    let lastIdx = 0
    let match
    while ((match = inlineRe.exec(remaining)) !== null) {
      if (match.index > lastIdx) {
        parts.push(<span key={key++}>{remaining.slice(lastIdx, match.index)}</span>)
      }
      if (match[2] !== undefined) {
        parts.push(<strong key={key++} className="font-bold text-[#0A192F]">{match[2]}</strong>)
      } else if (match[3] !== undefined) {
        parts.push(<em key={key++} className="italic">{match[3]}</em>)
      } else if (match[4] !== undefined) {
        parts.push(<code key={key++} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-blue-700">{match[4]}</code>)
      }
      lastIdx = match.index + match[0].length
    }
    if (lastIdx < remaining.length) {
      parts.push(<span key={key++}>{remaining.slice(lastIdx)}</span>)
    }
    return parts.length > 0 ? parts : text
  }

  // Parse markdown table: | col | col | ...
  const renderTable = (tableLines, key) => {
    const rows = tableLines.filter(l => l.includes('|') && !l.match(/^\|[-| :]+\|$/))
    const header = rows[0]
    const body = rows.slice(1)
    const parseRow = (line) =>
      line.split('|').map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1)
    const headers = parseRow(header)
    return (
      <div key={key} className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#0A192F] text-white">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-3 font-bold text-xs uppercase tracking-wide whitespace-nowrap">
                  {renderInline(h.replace(/\*\*/g, ''))}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                {parseRow(row).map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 text-slate-700 text-sm border-t border-slate-100">
                    {renderInline(cell.replace(/\*\*/g, ''))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // Simple Markdown renderer with IDs for Table of Contents navigation
  const renderMarkdown = (markdown) => {
    if (!markdown) return null
    const lines = markdown.split('\n')
    const elements = []
    let inList = false
    let isOrdered = false
    let listItems = []
    let inTable = false
    let tableLines = []

    const flushList = (key) => {
      if (inList) {
        if (isOrdered) {
          elements.push(
            <ol key={key} className="my-5 space-y-2.5 pl-6 text-slate-700 list-decimal">
              {listItems.map((item, idx) => (
                <li key={idx} className="text-base leading-relaxed pl-1">
                  {renderInline(item)}
                </li>
              ))}
            </ol>
          )
        } else {
          elements.push(
            <ul key={key} className="my-5 space-y-2.5 text-slate-700">
              {listItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-base leading-relaxed">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#1D63ED]" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          )
        }
        inList = false
        isOrdered = false
        listItems = []
      }
    }

    const flushTable = (key) => {
      if (inTable && tableLines.length >= 2) {
        elements.push(renderTable(tableLines, key))
      }
      inTable = false
      tableLines = []
    }

    lines.forEach((rawLine, index) => {
      const line = rawLine.trim()

      // Detect table rows
      if (line.startsWith('|')) {
        flushList(`flush-list-${index}`)
        inTable = true
        tableLines.push(line)
        return
      } else if (inTable) {
        flushTable(`table-${index}`)
      }

      if (line.startsWith('### ')) {
        flushList(`flush-${index}`)
        const rawText = line.replace('### ', '')
        const cleanText = rawText.replace(/\*\*/g, '').replace(/[*_#]/g, '').trim()
        const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        elements.push(
          <h3
            key={index}
            id={id}
            className="mt-8 mb-3 scroll-mt-24 font-display text-xl font-bold text-[#0A192F]"
          >
            {renderInline(rawText.replace(/^#+\s*/, ''))}
          </h3>
        )
      } else if (line.startsWith('## ')) {
        flushList(`flush-${index}`)
        const rawText = line.replace('## ', '')
        const cleanText = rawText.replace(/\*\*/g, '').replace(/[*_#]/g, '').trim()
        const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        elements.push(
          <h2
            key={index}
            id={id}
            className="mt-12 mb-4 scroll-mt-24 font-display text-2xl sm:text-3xl font-black text-[#0A192F] border-b-2 border-slate-100 pb-3"
          >
            {renderInline(rawText)}
          </h2>
        )
      } else if (line.startsWith('# ')) {
        flushList(`flush-${index}`)
        const rawText = line.replace('# ', '')
        elements.push(
          <h1
            key={index}
            className="mt-8 mb-5 font-display text-3xl sm:text-4xl font-black text-[#0A192F]"
          >
            {renderInline(rawText)}
          </h1>
        )
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        flushTable(`flush-tbl-${index}`)
        inList = true
        isOrdered = false
        listItems.push(line.substring(2))
      } else if (line.match(/^\d+\.\s+/)) {
        flushTable(`flush-tbl-${index}`)
        inList = true
        isOrdered = true
        listItems.push(line.replace(/^\d+\.\s+/, ''))
      } else if (line.startsWith('> ')) {
        flushList(`flush-${index}`)
        flushTable(`flush-tbl-${index}`)
        elements.push(
          <blockquote
            key={index}
            className="my-6 rounded-2xl border-l-4 border-[#1D63ED] bg-blue-50/60 p-5 text-base italic text-blue-950 font-medium"
          >
            {renderInline(line.replace('> ', ''))}
          </blockquote>
        )
      } else if (line.startsWith('---') || line.startsWith('***')) {
        flushList(`flush-${index}`)
        flushTable(`flush-tbl-${index}`)
        elements.push(<hr key={index} className="my-8 border-slate-200" />)
      } else if (line.length > 0) {
        flushList(`flush-${index}`)
        flushTable(`flush-tbl-${index}`)
        elements.push(
          <p
            key={index}
            className="my-4 text-base leading-[1.8] text-slate-700"
          >
            {renderInline(line)}
          </p>
        )
      } else {
        // blank line — flush pending blocks
        flushList(`flush-blank-${index}`)
        flushTable(`flush-tbl-blank-${index}`)
      }
    })

    flushList('flush-final')
    flushTable('flush-tbl-final')
    return elements
  }

  const scrollToHeading = (id) => {
    setActiveTocId(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const formatDate = (isoString) => {
    if (!isoString) return 'October 27, 2026'
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return 'October 27, 2026'
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#FAFBFD]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="mt-3 text-xs font-semibold text-slate-500">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h2 className="text-2xl font-black text-slate-900">Article Not Found</h2>
        <p className="mt-2 text-sm text-slate-500">The article you requested could not be located.</p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#FAFBFD] pb-24 text-slate-900">
      {/* TOP BREADCRUMB & HEADER (Exact Orange Mantra Layout) */}
      <section className="border-b border-slate-200/80 bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb matching Orange Mantra */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-blue-600">Blog</Link>
            <span>/</span>
            <span className="text-slate-600">{blog.category || 'Mobile Engineering'}</span>
            <span className="hidden sm:inline">/</span>
            <span className="hidden sm:inline max-w-xs truncate text-slate-900 font-bold">
              {blog.title}
            </span>
          </nav>

          {/* Title */}
          <h1 className="mt-6 font-display text-2xl font-black leading-tight text-[#0A192F] sm:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          {/* Date & Author Metadata (Orange Mantra Style) */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 sm:text-sm">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-slate-400" />
              <span>{blog.readTime || '5 min read'}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-blue-600 font-bold">
              <User className="h-4 w-4" />
              <span>{blog.author || 'Appzys Senior Engineering Pod'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2-COLUMN ARTICLE BODY: STICKY TOC ON LEFT + CONTENT ON RIGHT */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* LEFT COLUMN: STICKY TABLE OF CONTENTS (Orange Mantra Style) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* TABLE OF CONTENTS CARD */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <List className="h-4 w-4 text-[#1D63ED]" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Table of Contents
                  </span>
                </div>

                <nav className="mt-4 space-y-1 text-xs">
                  {tocItems.length > 0 ? (
                    (() => {
                      let h2Count = 0
                      return tocItems.map((item, idx) => {
                        if (item.level === 2) h2Count++
                        const isH2 = item.level === 2
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => scrollToHeading(item.id)}
                            className={`group flex w-full items-start gap-2 text-left font-medium transition py-1 ${
                              isH2 ? '' : 'pl-4'
                            } ${
                              activeTocId === item.id
                                ? 'text-blue-600 font-bold'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            <span className={`shrink-0 font-bold group-hover:text-blue-500 ${
                              isH2 ? 'text-slate-400' : 'text-slate-300 text-[10px]'
                            }`}>
                              {isH2 ? `${h2Count}.` : '–'}
                            </span>
                            <span className={`line-clamp-2 leading-snug ${isH2 ? '' : 'text-[11px]'}`}>{item.text}</span>
                          </button>
                        )
                      })
                    })()
                  ) : (
                    <div className="space-y-2 text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-400">1.</span>
                        <span>Executive Summary</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-400">2.</span>
                        <span>Architectural Teardown</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-400">3.</span>
                        <span>Implementation Details</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-400">4.</span>
                        <span>Production Due Diligence</span>
                      </div>
                    </div>
                  )}
                </nav>
              </div>

              {/* QUICK AUDIT CTA WIDGET IN SIDEBAR */}
              <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50/60 p-6 text-slate-900 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1D63ED]">
                  <Sparkles className="h-4 w-4" />
                  <span>Free Senior Engineering Audit</span>
                </div>
                <h4 className="mt-2 font-display text-sm font-extrabold text-[#0A192F]">
                  Need a mobile app built or reviewed?
                </h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Get a complete architecture, tech stack &amp; budget breakdown in 48 hours.
                </p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1D63ED] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600"
                >
                  <span>Request 48-Hr Audit</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* SHARE TOOLS */}
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
                <span className="text-xs font-bold text-slate-700">Share this guide</span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-slate-500" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: MAIN ARTICLE BODY (Orange Mantra Style) */}
          <main className="lg:col-span-8">
            {/* Feature Cover Image */}
            {blog.coverImage && (
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="h-72 w-full object-cover sm:h-96 lg:h-[420px]"
                />
              </div>
            )}

            {/* Excerpt Lead Box */}
            {blog.excerpt && (
              <div className="mt-8 rounded-3xl border border-blue-100 bg-white p-6 shadow-xs">
                <p className="text-base sm:text-lg font-medium leading-relaxed text-[#0A192F]">
                  {blog.excerpt}
                </p>
              </div>
            )}

            {/* In This Guide: Interactive Chapter Overview Box (Orange Mantra Style) */}
            {tocItems.length > 0 && (
              <div className="mt-6 rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-blue-50/40 p-6 shadow-xs">
                <div className="flex items-center gap-2 border-b border-slate-200/60 pb-3">
                  <List className="h-4 w-4 text-[#1D63ED]" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    In This Blueprint (Quick Jump Chapters)
                  </h3>
                </div>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {tocItems.filter((item) => item.level === 2).map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => scrollToHeading(item.id)}
                      className="group flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white p-2.5 text-left transition hover:border-blue-400 hover:shadow-xs"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xs font-black text-blue-700 group-hover:bg-[#1D63ED] group-hover:text-white transition">
                        {idx + 1}
                      </span>
                      <span className="line-clamp-1 text-xs font-bold text-slate-700 group-hover:text-[#1D63ED] transition">
                        {item.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Main Content Markdown */}
            <article className="prose prose-slate max-w-none mt-8 text-slate-800">
              {renderMarkdown(blog.contentMarkdown)}
            </article>

            {/* Tags Strip */}
            {blog.tagsCsv && (
              <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6">
                <span className="text-xs font-bold text-slate-500">Topics &amp; Tech:</span>
                {blog.tagsCsv.split(',').map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Author Trust Box */}
            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0A192F] text-white font-black text-xl shadow-md">
                  A
                </div>
                <div>
                  <h4 className="font-display text-base font-black text-[#0A192F]">
                    {blog.author || 'Appzys Senior Engineering Pod'}
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Senior Flutter, Mobile Architecture &amp; On-Device Machine Learning specialists based in Tamil Nadu &amp; serving clients globally. 100% IP code ownership, weekly TestFlight releases, and zero junior agency handoffs.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-1.5 text-blue-600">
                  <ShieldCheck className="h-4 w-4" />
                  <span>100% Client IP Code</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Zero Junior Handoffs</span>
                </div>
                <div className="flex items-center gap-1.5 text-purple-600">
                  <Clock className="h-4 w-4" />
                  <span>Weekly TestFlight Drops</span>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to All Articles</span>
              </Link>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                <span>View Real Case Studies</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </main>
        </div>

        {/* RELATED ARTICLES ROW (Orange Mantra Style) */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-slate-200 pt-12">
            <h3 className="font-display text-xl sm:text-2xl font-black text-[#0A192F]">
              Recommended Engineering Guides
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {related.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D63ED]">
                    <span>•</span>
                    <span>{item.category || 'Mobile Engineering'}</span>
                  </div>
                  <Link to={`/blog/${item.slug}`}>
                    <h4 className="mt-2 font-display text-sm font-bold text-[#0A192F] line-clamp-2 group-hover:text-blue-600">
                      {item.title}
                    </h4>
                  </Link>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                    {item.excerpt}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{item.readTime || '5 min read'}</span>
                    <span className="font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
