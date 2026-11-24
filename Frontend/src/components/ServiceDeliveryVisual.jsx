import { useId } from 'react'
import { Cloud, Database, ShieldCheck, Wrench, Code2 } from 'lucide-react'

function Phone({ x = 78, y = 40 }) {
  const id = useId()
  return <g transform={`translate(${x} ${y})`}>
    <defs>
      <linearGradient id={`${id}-shine`}><stop stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".65" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      <clipPath id={`${id}-screen`}><rect x="8" y="8" width="88" height="174" rx="14" /></clipPath>
    </defs>
    <rect width="104" height="190" rx="21" fill="#09182d" stroke="#6e8bb5" strokeWidth="1.5" />
    <rect x="5" y="5" width="94" height="180" rx="17" fill="#edf2f9" />
    <rect x="8" y="8" width="88" height="174" rx="14" fill="#fff" />
    <rect x="38" y="13" width="28" height="4" rx="2" fill="#243752" />
    <g fill="#dce5f2">
      <rect x="17" y="31" width="23" height="23" rx="6" />
      <rect x="47" y="34" width="37" height="5" rx="2.5" />
      <rect x="47" y="44" width="26" height="4" rx="2" fill="#edf1f7" />
      <rect x="17" y="65" width="70" height="43" rx="7" fill="#e8effa" />
      <rect x="17" y="120" width="13" height="13" rx="4" />
      <rect x="37" y="121" width="49" height="4" rx="2" />
      <rect x="37" y="129" width="34" height="3" rx="1.5" fill="#edf1f7" />
      <rect x="17" y="141" width="13" height="13" rx="4" />
      <rect x="37" y="142" width="49" height="4" rx="2" />
      <rect x="37" y="150" width="30" height="3" rx="1.5" fill="#edf1f7" />
    </g>
    <g clipPath={`url(#${id}-screen)`}><rect className="phone-screen-shimmer" x="-60" y="27" width="55" height="130" fill={`url(#${id}-shine)`} /></g>
    <rect x="17" y="164" width="70" height="10" rx="4" fill="#dce5f2" />
    <rect x="38" y="178" width="28" height="2" rx="1" fill="#a9b8cd" />
  </g>
}

function LaunchVisual() {
  return <><Phone x={78} y={28} /><g transform="translate(78 232)"><rect width="104" height="24" rx="6" fill="#d1deff" /><text x="52" y="16" textAnchor="middle" fill="#0A192F" fontSize="10" fontFamily="Inter, sans-serif">Android &amp; iOS</text></g></>
}

function ConnectVisual() {
  return <><Phone x={132} y={40} /><g transform="translate(24 56)"><rect width="82" height="74" rx="10" fill="#ffffff" stroke="#cde0f7" /><Cloud x="26" y="13" size={30} color="#1545a2" /><text x="41" y="59" textAnchor="middle" fill="#122b4e" fontSize="10" fontFamily="Inter, sans-serif">Backend</text></g><g transform="translate(24 146)"><rect width="82" height="74" rx="10" fill="#ffffff" stroke="#cde0f7" /><Database x="27" y="14" size={28} color="#1545a2" /><text x="41" y="59" textAnchor="middle" fill="#122b4e" fontSize="10" fontFamily="Inter, sans-serif">Data &amp; APIs</text></g></>
}

function ImproveVisual() {
  return <><Phone x={24} y={40} /><g transform="translate(154 56)"><rect width="82" height="74" rx="10" fill="#ffffff" stroke="#cde0f7" /><Wrench x="26" y="13" size={30} color="#1545a2" /><text x="41" y="59" textAnchor="middle" fill="#122b4e" fontSize="10" fontFamily="Inter, sans-serif">Maintain</text></g><g transform="translate(154 146)"><rect width="82" height="74" rx="10" fill="#ffffff" stroke="#cde0f7" /><ShieldCheck x="26" y="13" size={30} color="#1545a2" /><text x="41" y="59" textAnchor="middle" fill="#122b4e" fontSize="10" fontFamily="Inter, sans-serif">Validate</text></g></>
}

function TeamVisual() {
  return <><g transform="translate(24 40)"><rect width="212" height="130" rx="10" fill="#f6f9ff" /><rect width="212" height="26" rx="10" fill="#dce6f5" /><rect y="16" width="212" height="10" fill="#dce6f5" /><rect x="12" y="10" width="40" height="5" rx="2" fill="#93a9c9" /><Code2 x="18" y="55" size={32} color="#2463eb" /><rect x="70" y="52" width="114" height="5" rx="2" fill="#44658e" /><rect x="70" y="66" width="85" height="5" rx="2" fill="#8ca8d0" /><rect x="70" y="80" width="98" height="5" rx="2" fill="#c0d2ed" /><rect x="18" y="108" width="166" height="5" rx="2" fill="#dce9ff" /></g>{[58,130,202].map(x=><g key={x} transform={`translate(${x-25} 190)`}><rect width="50" height="50" rx="10" fill="#ffffff" stroke="#cde0f7" /><circle cx="25" cy="17" r="7" fill="#1545a2" /><path d="M13 37a12 12 0 0 1 24 0" fill="#1545a2" /></g>)}</>
}

const ART = { launch: LaunchVisual, connect: ConnectVisual, improve: ImproveVisual, team: TeamVisual }
const LABELS = { launch: 'From idea to app', connect: 'Your platform, connected', improve: 'A stronger next release', team: 'Your mobile development partner' }

export default function ServiceDeliveryVisual({ presentation }) {
  const Illustration = ART[presentation.tone]
  return <figure className="service-artwork" role="img" aria-label={`${LABELS[presentation.tone]} — service illustration`}>
    <svg viewBox="0 0 260 270" fill="none" aria-hidden="true">
      <Illustration />
    </svg>
    <figcaption>{LABELS[presentation.tone]}</figcaption>
  </figure>
}
