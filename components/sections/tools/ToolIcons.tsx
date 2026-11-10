import React from "react";

interface IconProps {
  id: string;
  className?: string;
}

export function ToolIcon({ id, className = "w-6 h-6" }: IconProps) {
  switch (id) {
    case "google-ads":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="24" fill="#0d1b2a" stroke="#4285f4" strokeWidth="2.5" />
          <path d="M44 96l22-40 14 26-22 40-14-26z" fill="#fbbc04" transform="rotate(-30 50 70)" />
          <circle cx="86" cy="74" r="14" fill="#4285f4" />
          <circle cx="48" cy="80" r="14" fill="#34a853" />
        </svg>
      );
    case "meta-ads":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="24" fill="#0b172a" stroke="#1877f2" strokeWidth="2.5" />
          <path
            d="M33.6 42.4c-9.1 0-16.1 6.5-16.1 16.8 0 14.1 12.3 26.4 29.8 26.4 12.4 0 20.3-6.2 28.7-16.8 8.4 10.6 16.3 16.8 28.7 16.8 17.5 0 29.8-12.3 29.8-26.4 0-10.3-7-16.8-16.1-16.8-11.8 0-19.4 8.7-27.1 20.2-2.1 3.1-4.1 6.4-6.3 9.7-2.2-3.3-4.2-6.6-6.3-9.7-7.7-11.5-15.3-20.2-27.1-20.2zm0 10.5c5.3 0 9.8 4.4 15.1 12.8 1.9 3 3.9 6.2 6.1 9.6-7.3 9.4-13.6 14.3-21.2 14.3-10.5 0-18.4-7.5-18.4-16.7 0-6.1 4-10 9.4-10zm60.8 0c5.4 0 9.4 3.9 9.4 10 0 9.2-7.9 16.7-18.4 16.7-7.6 0-13.9-4.9-21.2-14.3 2.2-3.4 4.2-6.6 6.1-9.6 5.3-8.4 9.8-12.8 15.1-12.8z"
            fill="url(#meta_grad)"
          />
          <defs>
            <linearGradient id="meta_grad" x1="17.5" y1="42.4" x2="114.5" y2="85.6" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0081fb" />
              <stop offset="0.5" stopColor="#0064e0" />
              <stop offset="1" stopColor="#004ac6" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "semrush":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="24" fill="#1b120c" stroke="#ff6b35" strokeWidth="2.5" />
          <path
            d="M32 40h18l14 24 14-24h18l-23 36 23 36h-18l-14-24-14 24H32l23-36-23-36z"
            fill="#ff6b35"
          />
          <circle cx="64" cy="64" r="8" fill="#ffffff" />
        </svg>
      );
    case "google-analytics":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="24" fill="#1b1509" stroke="#f59e0b" strokeWidth="2.5" />
          <rect x="30" y="74" width="16" height="26" rx="4" fill="#f59e0b" />
          <rect x="56" y="52" width="16" height="48" rx="4" fill="#f59e0b" />
          <rect x="82" y="30" width="16" height="70" rx="4" fill="#e11d48" />
          <circle cx="38" cy="62" r="8" fill="#f59e0b" />
        </svg>
      );
    case "search-console":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="24" fill="#0d1f14" stroke="#34a853" strokeWidth="2.5" />
          <path
            d="M40 76l18-24 16 14 24-30"
            stroke="#34a853"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="98" cy="36" r="6" fill="#34a853" />
          <path d="M28 96h72" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    case "canva":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="24" fill="#081e20" stroke="#00c4cc" strokeWidth="2.5" />
          <circle cx="64" cy="64" r="38" fill="url(#canva_grad)" />
          <path
            d="M72 46c-12 0-18 8-18 18s6 18 18 18c6 0 10-2 13-5l-4-5c-2 2-5 3-9 3-7 0-11-5-11-11s4-11 11-11c4 0 7 1 9 3l4-5c-3-3-7-5-13-5z"
            fill="#ffffff"
          />
          <defs>
            <linearGradient id="canva_grad" x1="26" y1="26" x2="102" y2="102" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00c4cc" />
              <stop offset="1" stopColor="#7d2ae8" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "ahrefs":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="24" fill="#091428" stroke="#0055ff" strokeWidth="2.5" />
          <path
            d="M34 88L64 32L94 88H78L64 58L50 88H34Z"
            fill="#0055ff"
          />
          <rect x="54" y="70" width="20" height="6" fill="#ff6b35" rx="2" />
        </svg>
      );
    case "hubspot":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="24" fill="#20110c" stroke="#ff7a59" strokeWidth="2.5" />
          <circle cx="86" cy="46" r="10" fill="#ff7a59" />
          <circle cx="42" cy="74" r="8" fill="#ff7a59" />
          <circle cx="70" cy="74" r="15" fill="#ff7a59" />
          <path d="M86 56v38M70 59V46M42 74h14" stroke="#ff7a59" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
    case "mailchimp":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="24" fill="#221e06" stroke="#ffe01b" strokeWidth="2.5" />
          <circle cx="64" cy="64" r="34" fill="#ffe01b" />
          <circle cx="52" cy="56" r="4" fill="#000000" />
          <circle cx="76" cy="56" r="4" fill="#000000" />
          <path d="M48 72c5 8 27 8 32 0" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case "photoshop":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="24" fill="#001e36" stroke="#31a8ff" strokeWidth="2.5" />
          <text x="64" y="82" fill="#31a8ff" fontSize="48" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            Ps
          </text>
        </svg>
      );
    case "premiere":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="24" fill="#00005b" stroke="#9999ff" strokeWidth="2.5" />
          <text x="64" y="82" fill="#9999ff" fontSize="48" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            Pr
          </text>
        </svg>
      );
    case "davinci":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="24" fill="#1a1103" stroke="#d4a017" strokeWidth="2.5" />
          <circle cx="48" cy="50" r="18" fill="#d4a017" fillOpacity="0.85" />
          <circle cx="80" cy="50" r="18" fill="#e53935" fillOpacity="0.85" />
          <circle cx="64" cy="78" r="18" fill="#1e88e5" fillOpacity="0.85" />
          <circle cx="64" cy="58" r="7" fill="#fff" />
        </svg>
      );
    case "figma":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="24" fill="#160e1f" stroke="#f24e1e" strokeWidth="2.5" />
          <g transform="translate(24, 16) scale(0.62)">
            <path d="M44 128c11 0 20-9 20-20V88H44c-11 0-20 9-20 20s9 20 20 20z" fill="#0acf83" />
            <path d="M24 68c0-11 9-20 20-20h20v40H44c-11 0-20-9-20-20z" fill="#a259ff" />
            <path d="M24 28c0-11 9-20 20-20h20v40H44c-11 0-20-9-20-20z" fill="#f24e1e" />
            <path d="M64 8h20c11 0 20 9 20 20s-9 20-20 20H64V8z" fill="#ff7262" />
            <circle cx="84" cy="68" r="20" fill="#1abcfe" />
          </g>
        </svg>
      );
    case "capcut":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="24" fill="#000000" stroke="#ffffff" strokeWidth="2" />
          <path
            d="M32 40L64 72L96 40M32 88L64 56L96 88"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <div className="w-6 h-6 rounded-md bg-zinc-800 border border-white/20 flex items-center justify-center text-[10px] font-mono text-white">
          ★
        </div>
      );
  }
}
