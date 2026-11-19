import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Inbox,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import { api } from '../../services/api'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    proposalLeads: 0,
    wonLeads: 0,
    totalEstimates: 0,
    pipelineValue: 185000,
  })
  const [recentLeads, setRecentLeads] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    try {
      const [statsRes, leadsRes] = await Promise.all([
        api.getAdminStats(),
        api.getAdminLeads(),
      ])
      if (statsRes?.data) setStats(statsRes.data)
      if (leadsRes?.data) setRecentLeads(leadsRes.data.slice(0, 5))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleStatusChange = async (leadId, newStatus) => {
    await api.updateLeadStatus(leadId, newStatus)
    loadData()
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-100 text-blue-700 border-blue-200 ring-1 ring-blue-500/20'
      case 'CONTACTED':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'PROPOSAL_SENT':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'WON':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Top Banner & Refresh */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1D63ED]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Day 11 Mini-CRM Operational Hub
          </div>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-[#0A192F] sm:text-3xl">
            Executive Lead &amp; Pipeline Dashboard
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Real-time tracking of client inquiries, project estimates, and proposal conversions.
          </p>
        </div>

        <button
          type="button"
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50 sm:self-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          <span>Refresh Pipeline</span>
        </button>
      </div>

      {/* 5 KPI METRIC CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Total Inquiries */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Inquiries
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 font-display text-3xl font-black text-slate-900">
            {stats.totalLeads}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Organic Store &amp; Web</span>
          </div>
        </div>

        {/* New Leads (Action Needed) */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/60 to-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              New Leads
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/25">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 font-display text-3xl font-black text-blue-700">
            {stats.newLeads}
          </div>
          <div className="mt-1 text-[11px] font-bold text-blue-600">
            Requires Feasibility Reply
          </div>
        </div>

        {/* Contacted */}
        <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/40 to-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              In Discussion
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 font-display text-3xl font-black text-amber-900">
            {stats.contactedLeads}
          </div>
          <div className="mt-1 text-[11px] font-semibold text-amber-700">
            Discovery calls / Feasibility review
          </div>
        </div>

        {/* Won Contracts */}
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/40 to-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Won / Signed
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 font-display text-3xl font-black text-emerald-800">
            {stats.wonLeads}
          </div>
          <div className="mt-1 text-[11px] font-semibold text-emerald-700">
            Converted Appzys Clients
          </div>
        </div>

        {/* Pipeline Value */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Pipeline Value
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#1D63ED]">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 font-display text-3xl font-black text-slate-900">
            ${stats.pipelineValue ? Number(stats.pipelineValue).toLocaleString() : '185,000'}
          </div>
          <div className="mt-1 text-[11px] font-semibold text-slate-500">
            From Active Cost Estimates
          </div>
        </div>
      </div>

      {/* RECENT INCOMING LEADS TABLE */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
          <div>
            <h2 className="font-display text-xl font-extrabold text-[#0A192F]">
              Recent Client Inquiries from Website
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Every contact form and cost estimator submission from the live web portfolio.
            </p>
          </div>
          <Link
            to="/admin/leads"
            className="inline-flex items-center gap-1.5 self-start text-xs font-bold text-[#1D63ED] hover:underline sm:self-auto"
          >
            <span>View Full Lead CRM</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 font-bold text-slate-600">
                <th className="py-3 px-4">Client &amp; Company</th>
                <th className="py-3 px-4">Service Required</th>
                <th className="py-3 px-4">Budget Range</th>
                <th className="py-3 px-4">Pipeline Status</th>
                <th className="py-3 px-4">Inquiry Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No leads recorded yet. Submitting a contact form on /contact will appear here automatically!
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-bold text-[#0A192F]">
                      <div>{lead.name}</div>
                      <div className="text-[11px] font-normal text-slate-500">
                        {lead.email} &bull; {lead.company || 'Private Startup'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {lead.serviceType}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-blue-700">
                      {lead.budgetRange}
                    </td>
                    <td className="py-3.5 px-4">
                      {/* Direct Status Selector */}
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-bold transition focus:outline-none ${getStatusBadge(
                          lead.status
                        )}`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                        <option value="WON">WON</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to="/admin/leads"
                        className="inline-flex items-center gap-1 font-bold text-[#1D63ED] hover:underline"
                      >
                        Review Notes <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* BOTTOM INFO CARDS */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Cost Estimates shortcut */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#1D63ED]">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900">
                Cost Estimator Calculations
              </h3>
              <p className="text-xs text-slate-500">
                {stats.totalEstimates} custom mobile app scopes generated by visitors.
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-600">
            Review detailed architecture requirements: target platform, UI/UX ergonomics, offline caching, and AI models selected by prospective clients.
          </p>
          <div className="mt-4">
            <Link
              to="/admin/estimates"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D63ED] hover:underline"
            >
              <span>Inspect All Estimates</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Security & Architecture Specs (Day 10/11) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900">
                Spring Security &amp; JWT Protected
              </h3>
              <p className="text-xs text-slate-500">
                Client privacy &amp; internal IP protection active.
              </p>
            </div>
          </div>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Token-based HMAC-SHA256 session with protected REST APIs</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Stateful status updates: NEW &rarr; CONTACTED &rarr; PROPOSAL_SENT &rarr; WON</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Internal sales notes field backed by MySQL leads schema</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
