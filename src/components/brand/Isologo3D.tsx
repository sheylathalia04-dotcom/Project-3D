import React from 'react';

interface Isologo3DProps {
  className?: string;
  size?: number;
}

export const Isologo3D: React.FC<Isologo3DProps> = ({ className = '', size = 38 }) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Titanium & Dark Charcoal Gradients */}
          <linearGradient id="topFace" x1="24" y1="4" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="leftFace" x1="6" y1="14" x2="24" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="rightFace" x1="24" y1="24" x2="42" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          {/* Emerald Neon Accents */}
          <linearGradient id="emeraldNeon" x1="16" y1="14" x2="32" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="nozzleGlow" x1="24" y1="36" x2="24" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#059669" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Isometric 3D Cube / Extruder Body */}
        {/* Top Diamond Face */}
        <path
          d="M24 5L41.32 15L24 25L6.68 15L24 5Z"
          fill="url(#topFace)"
          stroke="#334155"
          strokeWidth="1.2"
        />

        {/* Left Vertical Face */}
        <path
          d="M6.68 15L24 25V42L6.68 32V15Z"
          fill="url(#leftFace)"
          stroke="#1E293B"
          strokeWidth="1.2"
        />

        {/* Right Vertical Face */}
        <path
          d="M24 25L41.32 15V32L24 42V25Z"
          fill="url(#rightFace)"
          stroke="#334155"
          strokeWidth="1.2"
        />

        {/* Inner Emerald Layer / Print Bed Lattice */}
        <path
          d="M24 10L35 16.35L24 22.7L13 16.35L24 10Z"
          fill="url(#emeraldNeon)"
          fillOpacity="0.25"
          stroke="#059669"
          strokeWidth="1"
        />

        {/* Central Vertical Core / Extrusion Axis Line */}
        <line
          x1="24"
          y1="10"
          x2="24"
          y2="38"
          stroke="url(#emeraldNeon)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#neonGlow)"
        />

        {/* Stylized Nozzle Core Point */}
        <polygon
          points="24,20 28,24 24,28 20,24"
          fill="url(#emeraldNeon)"
          filter="url(#neonGlow)"
        />

        {/* Glowing Lower Extrusion Point / Hotend Tip */}
        <circle
          cx="24"
          cy="38"
          r="2.5"
          fill="#10B981"
          stroke="#059669"
          strokeWidth="1"
          filter="url(#neonGlow)"
        />

        {/* Outer Accent Tech Notches */}
        <path d="M24 2V5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M43 14L41.32 15" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5 14L6.68 15" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};
