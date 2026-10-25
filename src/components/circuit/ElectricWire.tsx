'use client';

import React from 'react';

interface ElectricWireProps {
  id: string;
  path: string;
  active: boolean;
  speed?: number; // 0.5 to 3
  voltageText?: string;
  labelPosition?: { x: number; y: number };
  showVoltageBadge?: boolean;
}

export function ElectricWire({
  id,
  path,
  active,
  speed = 1,
  voltageText,
  labelPosition,
  showVoltageBadge = false,
}: ElectricWireProps) {
  // Speed calculation: duration in seconds
  // 1x = 1.2s, 2x = 0.6s, 0.5x = 2.4s
  const duration = Math.max(0.3, 1.2 / Math.max(0.2, speed));

  return (
    <g className="transition-all duration-300">
      {/* Base PCB copper wire trace */}
      <path
        d={path}
        fill="none"
        stroke={active ? '#0369a1' : '#1e293b'}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors duration-300"
      />

      {/* Secondary wire track */}
      <path
        d={path}
        fill="none"
        stroke={active ? '#0284c7' : '#334155'}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors duration-300"
      />

      {/* Active Glowing Pulse Effect */}
      {active && (
        <>
          {/* Ambient wide glow halo */}
          <path
            d={path}
            fill="none"
            stroke="#00f0ff"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
            filter="blur(4px)"
          />

          {/* Core bright neon laser line */}
          <path
            d={path}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="drop-shadow(0 0 6px #00f0ff)"
          />

          {/* Flowing electric charge pulses (travelling electron packets) */}
          <path
            d={path}
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="12 18"
            style={{
              animation: `electricFlow ${duration}s linear infinite`,
            }}
            filter="drop-shadow(0 0 4px #00f0ff)"
          />

          {/* Secondary micro-particles */}
          <path
            d={path}
            fill="none"
            stroke="#a5f3fc"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="6 24"
            style={{
              animation: `electricFlow ${duration * 0.75}s linear infinite`,
            }}
          />
        </>
      )}

      {/* Inactive pulse: when 0, show very subtle grounding ground ticks */}
      {!active && (
        <path
          d={path}
          fill="none"
          stroke="#475569"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 8"
          opacity="0.4"
        />
      )}

      {/* Voltage badge at midway or designated point */}
      {showVoltageBadge && labelPosition && (
        <g transform={`translate(${labelPosition.x}, ${labelPosition.y})`}>
          <rect
            x="-22"
            y="-10"
            width="44"
            height="20"
            rx="6"
            className={
              active
                ? 'fill-slate-900/90 stroke-cyan-400'
                : 'fill-slate-900/90 stroke-slate-700'
            }
            strokeWidth="1"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
          />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            className={`font-mono text-[10px] font-bold ${
              active ? 'fill-cyan-300' : 'fill-slate-400'
            }`}
          >
            {voltageText || (active ? '5.0V' : '0.0V')}
          </text>
        </g>
      )}
    </g>
  );
}
