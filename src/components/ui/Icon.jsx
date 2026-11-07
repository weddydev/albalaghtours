// Thin gold line icons (24×24, currentColor). Decorative by default.
const paths = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  plane: (
    <path d="M10.2 21l1.8-.6 1.2-5.9 4.4 4.2 1.4-.5-1.6-5.9 3.3-3.1c.9-.9.9-2.1.1-2.6-.6-.4-1.6-.1-2.5.7l-3.2 3-5.8-1.8-1.4.6 4.1 4.3-5.8 1.4L4 13.7l-1.6.6 2.6 2.3.9 3.4 1.6-.6.3-2.3 5.2-3.1" />
  ),
  kaaba: (
    <>
      <path d="M4 8.5L12 5l8 3.5v10L12 22l-8-3.5z" />
      <path d="M4 8.5L12 12l8-3.5M12 12v10" />
      <path d="M4 11.5l8 3.5 8-3.5" />
      <path d="M14.5 15.5v4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="M7.5 13h2M11 13h2M14.5 13h2M7.5 16.5h2M11 16.5h2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 19.5c.6-3.3 3-5.2 6-5.2s5.4 1.9 6 5.2" />
      <path d="M15.5 4.9a3.2 3.2 0 010 6.2M17.5 14.6c1.8.6 3 2.3 3.5 4.9" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </>
  ),
  phone: (
    <path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 006.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 01-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 015 4z" />
  ),
  mapPin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.5 3.6 5.3 3.6 8.5s-1.2 6-3.6 8.5c-2.4-2.5-3.6-5.3-3.6-8.5s1.2-6 3.6-8.5z" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M10 17h10" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  minus: <path d="M6 12h12" />,
  plus: <path d="M12 6v12M6 12h12" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  star: <path d="M12 3.8l2.5 5.2 5.7.8-4.1 4 1 5.6L12 16.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z" />,
  shield: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.1 8.2-7.5 9.5-4.4-1.3-7.5-4.9-7.5-9.5V6z" />
      <path d="M8.5 12l2.4 2.4 4.6-4.8" />
    </>
  ),
  bed: (
    <>
      <path d="M3 19v-8.5h18V19M3 16h18" />
      <path d="M5 10.5V7.5A1.5 1.5 0 016.5 6h11A1.5 1.5 0 0119 7.5v3" />
      <rect x="6.5" y="8" width="4.5" height="2.5" rx="1" />
      <rect x="13" y="8" width="4.5" height="2.5" rx="1" />
    </>
  ),
  passport: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="10.5" r="3.2" />
      <path d="M8.8 10.5h6.4M12 7.3c1 1 1.5 2 1.5 3.2s-.5 2.2-1.5 3.2c-1-1-1.5-2-1.5-3.2s.5-2.2 1.5-3.2zM9 17h6" />
    </>
  ),
  stamp: (
    <>
      <path d="M9.5 3.5h5l-.8 7h-3.4z" />
      <path d="M5 13.5a2 2 0 012-2h10a2 2 0 012 2v3H5z" />
      <path d="M4 20.5h16" />
    </>
  ),
  certificate: (
    <>
      <rect x="3.5" y="4" width="17" height="12.5" rx="1.5" />
      <path d="M7 8h10M7 11h6" />
      <circle cx="16" cy="15" r="2.6" />
      <path d="M14.6 17.2l-.8 3.8 2.2-1.2 2.2 1.2-.8-3.8" />
    </>
  ),
  palm: (
    <>
      <path d="M12 21c.3-4.5.1-8.5-1-12" />
      <path d="M11 9C9 6 6 5.6 3.5 7c2.6.2 4.5 1 5.5 2.5M11 9c1-3 4-4.6 7-3.8-2.4.7-4.1 1.8-5 3.6M11 9c3.4-.7 6.4.8 7.5 3.8-2-.9-4.2-1.6-6.4-1.4M11 9c-3 .2-5.5 2-6.4 4.8 2-1.5 3.9-2.3 6-2.5" />
      <path d="M6 21h12" />
    </>
  ),
  headset: (
    <>
      <path d="M4.5 14v-2a7.5 7.5 0 0115 0v2" />
      <rect x="3.5" y="13.5" width="4" height="6" rx="1.5" />
      <rect x="16.5" y="13.5" width="4" height="6" rx="1.5" />
      <path d="M18.5 19.5c0 1.2-1.6 2-4 2h-1.5" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0112 7.4 4.3 4.3 0 0119.5 10c0 5.6-7.5 10-7.5 10z" />,
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <circle cx="12" cy="9" r="2.6" />
      <path d="M8.3 13l-1.8 7.5 5.5-2.8 5.5 2.8-1.8-7.5" />
    </>
  ),
  mosque: (
    <>
      <path d="M7 20.5v-6.5c0-3 2.4-4.5 5-6 2.6 1.5 5 3 5 6v6.5" />
      <path d="M12 8V5.5M3.5 20.5V10M20.5 20.5V10M3.5 10l.75-2 .75 2M19 10l.75-2 .75 2" />
      <path d="M2.5 20.5h19M10.5 20.5v-3a1.5 1.5 0 013 0v3" />
    </>
  ),
  hands: (
    <path d="M9.5 21l-3-3.2c-.9-1-1.4-2.2-1.4-3.5V7.6a1.3 1.3 0 012.6 0v4.6M14.5 21l3-3.2c.9-1 1.4-2.2 1.4-3.5V7.6a1.3 1.3 0 00-2.6 0v4.6M7.7 12.2L11 4.8c.3-.7 1-.8 1-.8s.7.1 1 .8l3.3 7.4M12 4v11" />
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  bus: (
    <>
      <rect x="4.5" y="3.5" width="15" height="14" rx="2.5" />
      <path d="M4.5 10.5h15M8 3.5v7M16 3.5v7M7 20.5v-3M17 20.5v-3" />
      <circle cx="8" cy="14" r="0.9" />
      <circle cx="16" cy="14" r="0.9" />
    </>
  ),
  utensils: <path d="M7 3v7a2 2 0 002 2h0a2 2 0 002-2V3M9 3v18M17 21V3c-2.2 1-3.5 3.6-3.5 7 0 2 1 3 3.5 3" />,
  arrowUpRight: <path d="M7 17L17 7M9 7h8v8" />,
  wifi: (
    <>
      <path d="M2.5 9a14 14 0 0119 0M5.5 12.5a9.5 9.5 0 0113 0M8.6 15.8a5 5 0 016.8 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </>
  ),
  sparkle: <path d="M12 3l1.8 5.6L19.5 10l-5.7 1.6L12 17l-1.8-5.4L4.5 10l5.7-1.4zM19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />,
  shirt: <path d="M8.5 3.5L3.5 6.6l2 3.6 2.2-1.1V20.5h8.6V9.1l2.2 1.1 2-3.6-5-3.1c-.6 1.6-1.9 2.6-3.5 2.6S9.1 5.1 8.5 3.5z" />,
  briefcase: (
    <>
      <rect x="3.5" y="7" width="17" height="12.5" rx="2.5" />
      <path d="M9 7V5.2c0-.7.5-1.2 1.2-1.2h3.6c.7 0 1.2.5 1.2 1.2V7M3.5 12.5h17M10.5 12.5v1.5h3v-1.5" />
    </>
  ),
  play: <path d="M8 5.5v13l10.5-6.5z" />,
  camera: (
    <>
      <path d="M4 8.5h3l1.6-2.5h6.8L17 8.5h3v10.5H4z" />
      <circle cx="12" cy="13.5" r="3.4" />
    </>
  ),
  quote: <path d="M10 7.5C6.8 8.6 5 11 5 14.2V17h5v-5H7.4c.3-1.6 1.3-2.7 2.9-3.3zM19 7.5c-3.2 1.1-5 3.5-5 6.7V17h5v-5h-2.6c.3-1.6 1.3-2.7 2.9-3.3z" />,
  luggage: (
    <>
      <rect x="5" y="7" width="14" height="13" rx="2.5" />
      <path d="M9 7V4.5h6V7M9.5 11v5M14.5 11v5M8 20v1.5M16 20v1.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4.5 19.8l1.1-3.9A8.3 8.3 0 1112 20.3a8.4 8.4 0 01-4-1z" />
      <path d="M9 8.3c.3-.6.6-.6.9-.6h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.5.7c-.1.2-.2.3 0 .6.4.7.9 1.3 1.5 1.8.6.5 1.2.8 1.8 1.1.3.1.4 0 .6-.1l.7-.8c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.4.4 0 .4-.1 1-.6 1.4-.5.5-1.4.8-2.1.7-1.1-.2-2.6-.8-4-2-1.6-1.4-2.6-3-2.9-4-.3-.8 0-1.6.3-2z" />
    </>
  ),
}

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.5, title }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  )
}
