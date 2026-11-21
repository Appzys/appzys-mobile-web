/** Shared store marks keep metrics and review cards visually consistent. */
export default function StoreIcon({ store }) {
  return <svg className="store-metric-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    {store === 'Google Play' ? <>
      <path fill="#00C1A0" d="M5.5 3.9c-.4.4-.6 1-.6 1.8v20.6c0 .8.2 1.4.6 1.8L18 16 5.5 3.9Z" />
      <path fill="#00A8F3" d="m5.5 3.9 15.4 8.8L18 16 5.5 3.9Z" />
      <path fill="#FFCF00" d="m20.9 12.7 5.2 3c.8.5.8 1.1 0 1.6l-5.2 3L17.5 16l3.4-3.3Z" />
      <path fill="#F43958" d="M5.5 28.1 20.9 19.3 18 16 5.5 28.1Z" />
    </> : <>
      <rect x="1" y="1" width="30" height="30" rx="7.2" fill="#087EF5" />
      <g fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12.5 7.5 3.5 6.1M19.5 7.5 10 24" />
        <path d="M6.7 20h13.1M17.5 16.2 22 24M23 20h2.3" />
      </g>
    </>}
  </svg>
}
