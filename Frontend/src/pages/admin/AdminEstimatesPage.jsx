import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Calculator,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Layers,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react'
import { api } from '../../services/api'

export default function AdminEstimatesPage() {
  const [estimates, setEstimates] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const loadEstimates = async () => {
    setLoading(true)
    try {
      const res = await api.getAdminEstimates()
      if (res?.data) {
        setEstimates(res.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEstimates()
  }, [])

  const parseFeatures = (json) => {
    if (!json) return []
    try {
      const parsed = JSON.parse(json)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  const filteredEstimates = estimates.filter((item) => {
    if (!search) return true
    const s = search.toLowerCase()
    return (
      item.platform?.toLowerCase().includes(s) ||
      item.uiLevel?.toLowerCase().includes(s) ||
      item.aiLevel?.toLowerCase().includes(s) ||
      item.featuresJson?.toLowerCase().includes(s)
    )
  })

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header Strip */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[#0A192F] sm:text-3xl">
            Cost Estimator Calculations Scope
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Review detailed app scopes and budget ranges configured by prospective clients.
          </p>
        </div>

        <button
          type="button"
          onClick={loadEstimates}
          disabled={loading}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50 sm:self-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          <span>Refresh Estimates</span>
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search platform, features, or AI level..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* ESTIMATES TABLE */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 font-bold text-slate-600">
                <th className="py-3 px-4">Estimate ID &amp; Target Platform</th>
                <th className="py-3 px-4">Estimated Budget &amp; Timeline</th>
                <th className="py-3 px-4">UI / UX Ergonomics</th>
                <th className="py-3 px-4">AI Integration Level</th>
                <th className="py-3 px-4">Selected Features</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredEstimates.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <Calculator className="mx-auto h-8 w-8 text-slate-300" />
                    <div className="mt-2 text-sm font-semibold">No estimates found.</div>
                    <div className="text-xs text-slate-400">Visitors configuring the Cost Estimator will show up here.</div>
                  </td>
                </tr>
              ) : (
                filteredEstimates.map((est) => {
                  const features = parseFeatures(est.featuresJson)
                  return (
                    <tr key={est.id} className="hover:bg-slate-50/70 transition">
                      {/* Platform */}
                      <td className="py-4 px-4 font-bold text-[#0A192F]">
                        <div className="flex items-center gap-2">
                          <span className="rounded-lg bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                            #{est.id}
                          </span>
                          <span>{est.platform}</span>
                        </div>
                        {est.leadId && (
                          <div className="mt-1 text-[11px] font-semibold text-emerald-600">
                            &bull; Linked to Client Lead #{est.leadId}
                          </div>
                        )}
                      </td>

                      {/* Budget & Timeline */}
                      <td className="py-4 px-4">
                        <div className="font-display text-sm font-extrabold text-[#1D63ED]">
                          ${est.minBudget ? Number(est.minBudget).toLocaleString() : 0} - ${est.maxBudget ? Number(est.maxBudget).toLocaleString() : 0}
                        </div>
                        <div className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-slate-500">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span>~{est.estWeeks || 6} Weeks Sprint</span>
                        </div>
                      </td>

                      {/* UI Level */}
                      <td className="py-4 px-4 text-xs font-semibold text-slate-700">
                        {est.uiLevel}
                      </td>

                      {/* AI Level */}
                      <td className="py-4 px-4">
                        <span className="rounded-full bg-blue-50 border border-blue-100 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                          {est.aiLevel}
                        </span>
                      </td>

                      {/* Features */}
                      <td className="py-4 px-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {features.map((f) => (
                            <span
                              key={f}
                              className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-xs text-slate-500 whitespace-nowrap">
                        {new Date(est.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
