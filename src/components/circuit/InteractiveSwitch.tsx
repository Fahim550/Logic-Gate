'use client';

import React from 'react';
import { sound } from '@/lib/sound-effects';

interface InteractiveSwitchProps {
  id: string;
  label: string;
  state: boolean;
  onToggle: () => void;
  x: number;
  y: number;
  disabled?: boolean;
}

export function InteractiveSwitch({
  label,
  state,
  onToggle,
  x,
  y,
  disabled = false,
}: InteractiveSwitchProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    sound.playSwitch(!state);
    onToggle();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (disabled) return;
      sound.playSwitch(!state);
      onToggle();
    }
  };

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="cursor-pointer select-none group"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="switch"
      aria-checked={state}
      aria-label={`${label}: ${state ? 'HIGH (1)' : 'LOW (0)'}`}
    >
      {/* Base mounting plate */}
      <rect
        x="-38"
        y="-32"
        width="76"
        height="64"
        rx="10"
        className="fill-slate-900 stroke-slate-700/80 transition-colors group-hover:stroke-sky-500/80"
        strokeWidth="2"
        filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4))"
      />

      {/* Plate corner metallic screws */}
      <circle cx="-30" cy="-24" r="2.5" className="fill-slate-600 stroke-slate-500" strokeWidth="0.5" />
      <circle cx="30" cy="-24" r="2.5" className="fill-slate-600 stroke-slate-500" strokeWidth="0.5" />
      <circle cx="-30" cy="24" r="2.5" className="fill-slate-600 stroke-slate-500" strokeWidth="0.5" />
      <circle cx="30" cy="24" r="2.5" className="fill-slate-600 stroke-slate-500" strokeWidth="0.5" />

      {/* Switch slot bezel */}
      <rect
        x="-14"
        y="-22"
        width="28"
        height="44"
        rx="6"
        className="fill-slate-950 stroke-slate-800"
        strokeWidth="1.5"
      />

      {/* Rocker switch lever */}
      <g
        className="transition-transform duration-200 ease-out"
        transform={state ? 'translate(0, -8)' : 'translate(0, 8)'}
      >
        {/* Switch paddle body */}
        <rect
          x="-11"
          y="-12"
          width="22"
          height="24"
          rx="4"
          fill={state ? 'url(#switchOnGrad)' : 'url(#switchOffGrad)'}
          className="stroke-slate-600/60"
          strokeWidth="1"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
        />

        {/* Grip ridges on paddle */}
        <line x1="-7" y1="-4" x2="7" y2="-4" stroke={state ? '#67e8f9' : '#64748b'} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="-7" y1="0" x2="7" y2="0" stroke={state ? '#67e8f9' : '#64748b'} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="-7" y1="4" x2="7" y2="4" stroke={state ? '#67e8f9' : '#64748b'} strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Neon LED status indicator dot */}
      <circle
        cx="0"
        cy="-26"
        r="3"
        className={state ? 'fill-cyan-400' : 'fill-slate-700'}
        filter={state ? 'drop-shadow(0 0 6px #00f0ff)' : undefined}
      />

      {/* Label and State Text */}
      <text
        x="0"
        y="45"
        textAnchor="middle"
        className="fill-slate-300 font-semibold text-xs tracking-wide"
      >
        {label}
      </text>

      {/* State Badge (1 / 0) */}
      <g transform="translate(0, 60)">
        <rect
          x="-20"
          y="-8"
          width="40"
          height="16"
          rx="8"
          className={
            state
              ? 'fill-cyan-500/20 stroke-cyan-400/80'
              : 'fill-slate-800 stroke-slate-700'
          }
          strokeWidth="1"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          className={`font-mono text-[10px] font-bold ${
            state ? 'fill-cyan-300' : 'fill-slate-400'
          }`}
        >
          {state ? '1 · HIGH' : '0 · LOW'}
        </text>
      </g>

      {/* Outgoing copper terminal solder pad (right side) */}
      <circle
        cx="38"
        cy="0"
        r="4.5"
        className={
          state
            ? 'fill-cyan-400 stroke-cyan-200'
            : 'fill-amber-600/80 stroke-amber-500/60'
        }
        strokeWidth="1.5"
        filter={state ? 'drop-shadow(0 0 4px #00f0ff)' : undefined}
      />
    </g>
  );
}
