import { useEffect, useState } from 'react'
import {
  AlertCircle,
  Building,
  CheckCircle2,
  Clock,
  Edit3,
  ExternalLink,
  FileText,
  Filter,
  Inbox,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Sparkles,
  User,
  X,
} from 'lucide-react'
import { api } from '../../services/api'

const STATUS_OPTIONS = ['ALL', 'NEW', 'CONTACTED', 'PROPOSAL_SENT', 'WON']

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('ALL')
  const [selectedLead, setSelectedLead] = useState(null)
  const [editingNotesId, setEditingNotesId] = useState(null)
  const [notesInput, setNotesInput] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)

  const loadLeads = async () => {
    setLoading(true)
    try {
      const res = await api.getAdminLeads({
        status: selectedStatus,
        search,
      })
      if (res?.data) {
        setLeads(res.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLeads()
  }, [selectedStatus])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    loadLeads()
  }

  const handleStatusChange = async (leadId, newStatus) => {
    await api.updateLeadStatus(leadId, newStatus)
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
    )
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => ({ ...prev, status: newStatus }))
    }
  }

  const startEditNotes = (lead) => {
    setEditingNotesId(lead.id)
    setNotesInput(lead.internalNotes || '')
  }

  const saveNotes = async (leadId) => {
    setSavingNotes(true)
    try {
      await api.updateLeadNotes(leadId, notesInput)
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, internalNotes: notesInput } : l))
      )
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead((prev) => ({ ...prev, internalNotes: notesInput }))
      }
      setEditingNotesId(null)
    } catch (err) {
      console.error(err)
    } finally {
      setSavingNotes(false)
    }
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

  // Count leads per status
  const counts = {
    ALL: leads.length,
    NEW: leads.filter((l) => l.status === 'NEW').length,
    CONTACTED: leads.filter((l) => l.status === 'CONTACTED').length,
    PROPOSAL_SENT: leads.filter((l) => l.status === 'PROPOSAL_SENT').length,
    WON: leads.filter((l) => l.status === 'WON').length,
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header Strip */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[#0A192F] sm:text-3xl">
            Client Inquiries &amp; Mini-CRM
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Track, qualify, and update pipeline status for every incoming mobile and AI project request.
          </p>
        </div>

        <button
          type="button"
          onClick={loadLeads}
          disabled={loading}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50 sm:self-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {STATUS_OPTIONS.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  selectedStatus === st
                    ? 'bg-[#1D63ED] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{st === 'PROPOSAL_SENT' ? 'PROPOSAL SENT' : st}</span>
                {selectedStatus === 'ALL' && counts[st] !== undefined && (
                  <span
                    className={`ml-1.5 rounded-full px-1.5 py-0.2 text-[10px] ${
                      selectedStatus === st ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {counts[st]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-full lg:w-80">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, company..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10"
            />
          </form>
        </div>
      </div>

      {/* LEADS TABLE */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 font-bold text-slate-600">
                <th className="py-3 px-4">Client Details</th>
                <th className="py-3 px-4">Service &amp; Budget</th>
                <th className="py-3 px-4">Pipeline Status</th>
                <th className="py-3 px-4">Internal Sales Notes</th>
                <th className="py-3 px-4">Received</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <Inbox className="mx-auto h-8 w-8 text-slate-300" />
                    <div className="mt-2 text-sm font-semibold">No leads match this filter.</div>
                    <div className="text-xs text-slate-400">Try searching for a different keyword or view all statuses.</div>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-blue-50/30 transition">
                    {/* Client Info */}
                    <td className="py-3.5 px-4 font-bold text-[#0A192F]">
                      <div className="flex items-center gap-1.5">
                        <span>{lead.name}</span>
                        {lead.status === 'NEW' && (
                          <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                        )}
                      </div>
                      <div className="mt-0.5 text-[11px] font-normal text-slate-500 flex flex-col gap-0.5">
                        <a
                          href={`mailto:${lead.email}`}
                          className="hover:text-blue-600 flex items-center gap-1"
                        >
                          <Mail className="h-3 w-3 text-slate-400" /> {lead.email}
                        </a>
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="hover:text-blue-600 flex items-center gap-1"
                          >
                            <Phone className="h-3 w-3 text-slate-400" /> {lead.phone}
                          </a>
                        )}
                        {lead.company && (
                          <div className="flex items-center gap-1 text-slate-600">
                            <Building className="h-3 w-3 text-slate-400" /> {lead.company}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Service & Budget */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{lead.serviceType}</div>
                      <div className="mt-0.5 text-xs font-bold text-[#1D63ED]">
                        {lead.budgetRange}
                      </div>
                      <div className="text-[10px] text-slate-400">Source: {lead.sourcePage || '/contact'}</div>
                    </td>

                    {/* Status Changer */}
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-bold transition focus:outline-none ${getStatusBadge(
                          lead.status
                        )}`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="PROPOSAL_SENT">PROPOSAL SENT</option>
                        <option value="WON">WON</option>
                      </select>
                    </td>

                    {/* Internal Sales Notes */}
                    <td className="py-3.5 px-4 max-w-xs">
                      {editingNotesId === lead.id ? (
                        <div className="space-y-1.5">
                          <textarea
                            value={notesInput}
                            onChange={(e) => setNotesInput(e.target.value)}
                            placeholder="Add notes (e.g. called client, sent architecture doc)..."
                            className="w-full rounded-lg border border-blue-400 bg-white p-2 text-xs font-medium focus:outline-none"
                            rows={2}
                          />
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => saveNotes(lead.id)}
                              disabled={savingNotes}
                              className="rounded-md bg-blue-600 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-blue-700"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingNotesId(null)}
                              className="rounded-md bg-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => startEditNotes(lead)}
                          className="group cursor-pointer rounded-lg border border-transparent p-1.5 hover:border-slate-200 hover:bg-slate-50 transition"
                        >
                          {lead.internalNotes ? (
                            <p className="text-xs text-slate-700 line-clamp-2">
                              {lead.internalNotes}
                            </p>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] italic text-slate-400 group-hover:text-blue-600">
                              <Edit3 className="h-3 w-3" /> Add internal notes...
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedLead(lead)}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-[#1D63ED] transition hover:bg-blue-100"
                      >
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* LEAD DETAIL MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedLead(null)}
              className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${getStatusBadge(selectedLead.status)}`}>
                {selectedLead.status}
              </span>
              <span className="text-xs text-slate-400">Inquiry ID: #{selectedLead.id}</span>
            </div>

            <h2 className="mt-3 font-display text-2xl font-extrabold text-[#0A192F]">
              {selectedLead.name}
            </h2>
            <div className="mt-1 flex flex-wrap gap-4 text-xs text-slate-600">
              <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-1 font-semibold text-blue-600 hover:underline">
                <Mail className="h-3.5 w-3.5" /> {selectedLead.email}
              </a>
              {selectedLead.phone && (
                <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-1 font-semibold text-slate-700 hover:underline">
                  <Phone className="h-3.5 w-3.5" /> {selectedLead.phone}
                </a>
              )}
              {selectedLead.company && (
                <span className="flex items-center gap-1 text-slate-700">
                  <Building className="h-3.5 w-3.5" /> {selectedLead.company}
                </span>
              )}
            </div>

            {/* Scope & Service Details */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Service Requested
                </span>
                <div className="mt-0.5 text-xs font-bold text-slate-900">
                  {selectedLead.serviceType}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Target Budget Range
                </span>
                <div className="mt-0.5 text-xs font-bold text-blue-600">
                  {selectedLead.budgetRange}
                </div>
              </div>
            </div>

            {/* Full Message */}
            <div className="mt-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Client Message / Project Goal
              </span>
              <div className="mt-1.5 rounded-xl border border-slate-200 bg-white p-4 text-xs sm:text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
                {selectedLead.message || 'No custom message provided.'}
              </div>
            </div>

            {/* Internal Sales Notes in Modal */}
            <div className="mt-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Internal Sales &amp; Engineering Notes
              </span>
              <div className="mt-1.5">
                <textarea
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Record call summary, pricing terms, or scheduled TestFlight drop..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none"
                  rows={3}
                />
                <button
                  type="button"
                  onClick={() => saveNotes(selectedLead.id)}
                  disabled={savingNotes}
                  className="mt-2 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-700"
                >
                  Save Internal Notes
                </button>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Update Status:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${getStatusBadge(
                    selectedLead.status
                  )}`}
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="PROPOSAL_SENT">PROPOSAL SENT</option>
                  <option value="WON">WON</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedLead.email}?subject=Appzys%2048-Hr%20Mobile%20Architecture%20Audit`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email Client</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
