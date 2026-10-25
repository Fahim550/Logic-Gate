'use client';

import React from 'react';
import { GateType } from '@/types/logic';

interface LogicGateSVGProps {
  type: GateType;
  x: number;
  y: number;
  inputA: boolean;
  inputB: boolean;
  output: boolean;
  onGateClick?: () => void;
}

export function LogicGateSVG({
  type,
  x,
  y,
  inputA,
  inputB,
  output,
  onGateClick,
}: LogicGateSVGProps) {
  // Gate specific paths and bubble configurations (centered around x, y)
  // Let gate center be around (0, 0) inside <g transform={`translate(${x}, ${y})`}>

  const renderGateBody = () => {
    switch (type) {
      case 'AND':
      case 'NAND':
        return (
          <path
            d="M -45 -36 L 0 -36 A 36 36 0 0 1 0 36 L -45 36 Z"
            fill="url(#gateBodyGrad)"
            stroke={output ? '#38bdf8' : '#475569'}
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="transition-colors duration-300"
          />
        );

      case 'OR':
      case 'NOR':
        return (
          <path
            d="M -45 -36 Q -15 -36 35 0 Q -15 36 -45 36 Q -25 0 -45 -36 Z"
            fill="url(#gateBodyGrad)"
            stroke={output ? '#38bdf8' : '#475569'}
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="transition-colors duration-300"
          />
        );

      case 'NOT':
        return (
          <path
            d="M -40 -32 L 25 0 L -40 32 Z"
            fill="url(#gateBodyGrad)"
            stroke={output ? '#38bdf8' : '#475569'}
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="transition-colors duration-300"
          />
        );

      case 'XOR':
      case 'XNOR':
        return (
          <>
            {/* Additional curved input back-plate for XOR */}
            <path
              d="M -54 -36 Q -34 0 -54 36"
              fill="none"
              stroke={output ? '#38bdf8' : '#475569'}
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-colors duration-300"
            />
            {/* Main OR body offset slightly */}
            <path
              d="M -44 -36 Q -14 -36 35 0 Q -14 36 -44 36 Q -24 0 -44 -36 Z"
              fill="url(#gateBodyGrad)"
              stroke={output ? '#38bdf8' : '#475569'}
              strokeWidth="2.5"
              strokeLinejoin="round"
              className="transition-colors duration-300"
            />
          </>
        );
      default:
        return null;
    }
  };

  const hasInversionBubble = type === 'NOT' || type === 'NAND' || type === 'NOR' || type === 'XNOR';
  const bubbleX = type === 'NOT' ? 31 : (type === 'NAND' ? 42 : 41);

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="cursor-pointer select-none group"
      onClick={onGateClick}
      filter="drop-shadow(0 6px 12px rgba(0, 0, 0, 0.45))"
    >
      {/* Active Gate Ambient Glow */}
      {output && (
        <circle
          cx="0"
          cy="0"
          r="48"
          fill="#00f0ff"
          opacity="0.12"
          filter="blur(10px)"
        />
      )}

      {/* Internal PCB micro-traces inside gate */}
      <g opacity="0.15">
        <line x1="-30" y1="-20" x2="10" y2="-20" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="-30" y1="20" x2="10" y2="20" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="-15" y1="-10" x2="15" y2="0" stroke="#38bdf8" strokeWidth="1" />
        <line x1="-15" y1="10" x2="15" y2="0" stroke="#38bdf8" strokeWidth="1" />
      </g>

      {/* Gate Body Shape */}
      {renderGateBody()}

      {/* Inversion Bubble (NOT, NAND, NOR, XNOR) */}
      {hasInversionBubble && (
        <circle
          cx={bubbleX}
          cy="0"
          r="5.5"
          fill="#0f172a"
          stroke={output ? '#38bdf8' : '#475569'}
          strokeWidth="2.2"
          className="transition-colors duration-300"
        />
      )}

      {/* Gate Label in Center */}
      <text
        x={type === 'NOT' ? -12 : (type === 'XOR' || type === 'XNOR' ? -5 : -8)}
        y="4"
        textAnchor="middle"
        className="font-bold text-[13px] fill-slate-200 tracking-wider pointer-events-none"
      >
        {type}
      </text>

      {/* Input Terminal Pins */}
      {type === 'NOT' ? (
        // Single Input A pin
        <g>
          <line
            x1="-55"
            y1="0"
            x2="-40"
            y2="0"
            stroke={inputA ? '#00f0ff' : '#475569'}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx="-55"
            cy="0"
            r="3.5"
            fill={inputA ? '#00f0ff' : '#64748b'}
            filter={inputA ? 'drop-shadow(0 0 4px #00f0ff)' : undefined}
          />
          <text x="-62" y="3" textAnchor="end" className="text-[10px] font-bold fill-slate-400">
            A
          </text>
        </g>
      ) : (
        // Dual Input A & B pins
        <g>
          {/* Pin A */}
          <line
            x1={type === 'XOR' || type === 'XNOR' ? '-68' : '-60'}
            y1="-18"
            x2={type === 'XOR' || type === 'XNOR' ? '-52' : '-45'}
            y2="-18"
            stroke={inputA ? '#00f0ff' : '#475569'}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx={type === 'XOR' || type === 'XNOR' ? '-68' : '-60'}
            cy="-18"
            r="3.5"
            fill={inputA ? '#00f0ff' : '#64748b'}
            filter={inputA ? 'drop-shadow(0 0 4px #00f0ff)' : undefined}
          />
          <text
            x={type === 'XOR' || type === 'XNOR' ? '-75' : '-67'}
            y="-15"
            textAnchor="end"
            className="text-[10px] font-bold fill-slate-400"
          >
            A
          </text>

          {/* Pin B */}
          <line
            x1={type === 'XOR' || type === 'XNOR' ? '-68' : '-60'}
            y1="18"
            x2={type === 'XOR' || type === 'XNOR' ? '-52' : '-45'}
            y2="18"
            stroke={inputB ? '#00f0ff' : '#475569'}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx={type === 'XOR' || type === 'XNOR' ? '-68' : '-60'}
            cy="18"
            r="3.5"
            fill={inputB ? '#00f0ff' : '#64748b'}
            filter={inputB ? 'drop-shadow(0 0 4px #00f0ff)' : undefined}
          />
          <text
            x={type === 'XOR' || type === 'XNOR' ? '-75' : '-67'}
            y="21"
            textAnchor="end"
            className="text-[10px] font-bold fill-slate-400"
          >
            B
          </text>
        </g>
      )}

      {/* Output Terminal Pin (Y) */}
      <g>
        <line
          x1={hasInversionBubble ? bubbleX + 6 : (type === 'OR' || type === 'XOR' ? 35 : 36)}
          y1="0"
          x2="58"
          y2="0"
          stroke={output ? '#00f0ff' : '#475569'}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          cx="58"
          cy="0"
          r="3.5"
          fill={output ? '#00f0ff' : '#64748b'}
          filter={output ? 'drop-shadow(0 0 4px #00f0ff)' : undefined}
        />
        <text x="65" y="3" textAnchor="start" className="text-[10px] font-bold fill-slate-400">
          Y
        </text>
      </g>
    </g>
  );
}
