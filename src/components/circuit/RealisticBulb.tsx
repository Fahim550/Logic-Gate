'use client';

import React, { useEffect, useRef } from 'react';
import { sound } from '@/lib/sound-effects';

interface RealisticBulbProps {
  x: number;
  y: number;
  output: boolean;
}

export function RealisticBulb({ x, y, output }: RealisticBulbProps) {
  const prevOutputRef = useRef(output);

  useEffect(() => {
    if (!prevOutputRef.current && output) {
      sound.playBulbOn();
    }
    prevOutputRef.current = output;
  }, [output]);

  return (
    <g transform={`translate(${x}, ${y})`} className="select-none">
      {/* Dynamic Ambient Light Bloom (when bulb is illuminated) */}
      {output && (
        <>
          {/* Broad atmospheric ambient glow */}
          <circle
            cx="0"
            cy="-28"
            r="120"
            fill="url(#bulbAmbientGrad)"
            opacity="0.8"
            className="bulb-radiant pointer-events-none"
          />

          {/* Intense core light bloom */}
          <circle
            cx="0"
            cy="-28"
            r="55"
            fill="#fbbf24"
            opacity="0.35"
            filter="blur(16px)"
            className="pointer-events-none"
          />
        </>
      )}

      {/* Solder terminal pad on wire entry */}
      <circle
        cx="-36"
        cy="22"
        r="4.5"
        className={
          output
            ? 'fill-amber-400 stroke-yellow-200'
            : 'fill-slate-700 stroke-slate-600'
        }
        strokeWidth="1.5"
        filter={output ? 'drop-shadow(0 0 5px #fbbf24)' : undefined}
      />
      <line
        x1="-36"
        y1="22"
        x2="-14"
        y2="22"
        stroke={output ? '#00f0ff' : '#475569'}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Bulb Socket / Screw Base (Edison screw threads) */}
      <g transform="translate(0, 10)">
        {/* Thread ridges */}
        <rect x="-14" y="0" width="28" height="6" rx="3" fill="#64748b" className="stroke-slate-500" strokeWidth="0.8" />
        <rect x="-13" y="5" width="26" height="5" rx="2.5" fill="#475569" className="stroke-slate-600" strokeWidth="0.8" />
        <rect x="-12" y="9" width="24" height="5" rx="2.5" fill="#334155" className="stroke-slate-700" strokeWidth="0.8" />
        {/* Base contact pip */}
        <path d="M -8 14 Q 0 18 8 14 L 6 17 Q 0 20 -6 17 Z" fill="#1e293b" />
        {/* Metallic reflections on socket */}
        <line x1="-5" y1="1" x2="-5" y2="13" stroke="#94a3b8" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      </g>

      {/* Glass Bulb Dome */}
      <path
        d="M -15 10 C -15 -2 -34 -15 -34 -38 C -34 -60 -18 -74 0 -74 C 18 -74 34 -60 34 -38 C 34 -15 15 -2 15 10 Z"
        fill={output ? 'url(#bulbGlassLitGrad)' : 'url(#bulbGlassUnlitGrad)'}
        stroke={output ? '#fef08a' : '#475569'}
        strokeWidth={output ? '2' : '1.5'}
        className="transition-colors duration-300"
        filter="drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))"
      />

      {/* Internal Mount Stem & Filament Support Wires */}
      <g>
        {/* Glass stem mount */}
        <path d="M -7 10 L -4 -12 L 4 -12 L 7 10 Z" fill={output ? '#fef3c7' : '#334155'} opacity="0.5" />
        
        {/* Support lead wires */}
        <line
          x1="-4"
          y1="-12"
          x2="-10"
          y2="-38"
          stroke={output ? '#fef08a' : '#64748b'}
          strokeWidth="1.2"
        />
        <line
          x1="4"
          y1="-12"
          x2="10"
          y2="-38"
          stroke={output ? '#fef08a' : '#64748b'}
          strokeWidth="1.2"
        />

        {/* Coiled Tungsten Filament */}
        {output ? (
          // Incandescent blazing filament
          <g filter="drop-shadow(0 0 6px #ffffff)">
            <path
              d="M -10 -38 Q -6 -44 0 -44 Q 6 -44 10 -38"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M -10 -38 Q -6 -44 0 -44 Q 6 -44 10 -38"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>
        ) : (
          // Cold tungsten filament
          <path
            d="M -10 -38 Q -6 -44 0 -44 Q 6 -44 10 -38"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        )}
      </g>

      {/* Glass Surface Specular Reflection Curve */}
      <path
        d="M -24 -46 C -24 -60 -12 -68 -2 -69 C -1 -69 -20 -60 -21 -40 C -22 -38 -24 -42 -24 -46 Z"
        fill="#ffffff"
        opacity={output ? '0.6' : '0.2'}
        className="pointer-events-none"
      />

      {/* Status Label underneath bulb */}
      <g transform="translate(0, 48)">
        <rect
          x="-38"
          y="-11"
          width="76"
          height="22"
          rx="11"
          className={
            output
              ? 'fill-amber-500/20 stroke-amber-400'
              : 'fill-slate-900/90 stroke-slate-700'
          }
          strokeWidth="1.5"
          filter={output ? 'drop-shadow(0 0 8px rgba(251,191,36,0.5))' : undefined}
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          className={`font-mono text-[11px] font-extrabold tracking-wide ${
            output ? 'fill-amber-300' : 'fill-slate-400'
          }`}
        >
          {output ? '💡 HIGH (1)' : '⚪ LOW (0)'}
        </text>
      </g>
    </g>
  );
}
