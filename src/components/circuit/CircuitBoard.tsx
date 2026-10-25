'use client';

import React from 'react';
import { GateType } from '@/types/logic';
import { InteractiveSwitch } from './InteractiveSwitch';
import { LogicGateSVG } from './LogicGateSVG';
import { ElectricWire } from './ElectricWire';
import { RealisticBulb } from './RealisticBulb';

interface CircuitBoardProps {
  gateType: GateType;
  inputA: boolean;
  inputB: boolean;
  output: boolean;
  speed: number;
  onToggleA: () => void;
  onToggleB: () => void;
  onGateClick?: () => void;
  activeStepElement?: 'switches' | 'wire-in' | 'gate' | 'wire-out' | 'bulb' | null;
}

export function CircuitBoard({
  gateType,
  inputA,
  inputB,
  output,
  speed,
  onToggleA,
  onToggleB,
  onGateClick,
  activeStepElement,
}: CircuitBoardProps) {
  const isSingleInput = gateType === 'NOT';
  const isXorOrXnor = gateType === 'XOR' || gateType === 'XNOR';

  // Positions
  const gatePos = { x: 480, y: 240 };
  const switchAPos = isSingleInput ? { x: 140, y: 240 } : { x: 140, y: 150 };
  const switchBPos = { x: 140, y: 330 };
  const bulbPos = { x: 810, y: 240 };

  // Terminal connection endpoints
  const switchATerminal = { x: switchAPos.x + 38, y: switchAPos.y };
  const switchBTerminal = { x: switchBPos.x + 38, y: switchBPos.y };

  const gatePinA = isSingleInput
    ? { x: gatePos.x - 55, y: gatePos.y }
    : { x: gatePos.x - (isXorOrXnor ? 68 : 60), y: gatePos.y - 18 };

  const gatePinB = {
    x: gatePos.x - (isXorOrXnor ? 68 : 60),
    y: gatePos.y + 18,
  };

  const gatePinY = {
    x: gatePos.x + 58,
    y: gatePos.y,
  };

  const bulbTerminal = {
    x: bulbPos.x - 36,
    y: bulbPos.y + 22,
  };

  // Wire paths
  const wireAPath = isSingleInput
    ? `M ${switchATerminal.x} ${switchATerminal.y} L ${gatePinA.x} ${gatePinA.y}`
    : `M ${switchATerminal.x} ${switchATerminal.y} L 300 ${switchATerminal.y} L 300 ${gatePinA.y} L ${gatePinA.x} ${gatePinA.y}`;

  const wireBPath = `M ${switchBTerminal.x} ${switchBTerminal.y} L 300 ${switchBTerminal.y} L 300 ${gatePinB.y} L ${gatePinB.x} ${gatePinB.y}`;

  const wireOutPath = `M ${gatePinY.x} ${gatePinY.y} L 660 ${gatePinY.y} L 660 ${bulbTerminal.y} L ${bulbTerminal.x} ${bulbTerminal.y}`;

  // Step highlight checks
  const highlightSwitches = activeStepElement === 'switches';
  const highlightWireIn = activeStepElement === 'wire-in';
  const highlightGate = activeStepElement === 'gate';
  const highlightWireOut = activeStepElement === 'wire-out';
  const highlightBulb = activeStepElement === 'bulb';

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700/60 shadow-2xl bg-[#070b14] select-none">
      {/* Circuit Board Header HUD */}
      <div className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between text-xs font-mono text-slate-400 pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/60 shadow">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-semibold tracking-wider">PWR: +5.0V ON</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
            CHIP: <strong className="text-sky-400">{gateType} LOGIC</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/60">
            FREQ: <strong className="text-cyan-400 font-bold">{speed}x</strong>
          </span>
          <span className="hidden sm:inline-block text-[11px] text-slate-500">
            INTERACTIVE SCHEMATIC
          </span>
        </div>
      </div>

      {/* Main Responsive SVG Canvas */}
      <svg
        viewBox="0 0 960 480"
        className="w-full h-auto max-h-[560px] block"
        style={{ aspectRatio: '2 / 1' }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="switchOnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>

          <linearGradient id="switchOffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="gateBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Bulb Lighting Gradients */}
          <radialGradient id="bulbAmbientGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#fbbf24" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="bulbGlassLitGrad" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="20%" stopColor="#fef08a" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.85" />
          </radialGradient>

          <radialGradient id="bulbGlassUnlitGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#475569" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#334155" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0.7" />
          </radialGradient>

          {/* Solder grid pattern */}
          <pattern id="pcbGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="0.9" fill="#1e293b" opacity="0.6" />
          </pattern>
        </defs>

        {/* Circuit Board Substrate Pattern */}
        <rect width="960" height="480" fill="url(#pcbGrid)" />

        {/* Decorative PCB Corner Mounts & Copper Ground Traces */}
        <g opacity="0.4">
          <circle cx="28" cy="28" r="8" fill="none" stroke="#334155" strokeWidth="2" />
          <circle cx="28" cy="28" r="4" fill="#0f172a" />
          <circle cx="932" cy="28" r="8" fill="none" stroke="#334155" strokeWidth="2" />
          <circle cx="932" cy="28" r="4" fill="#0f172a" />
          <circle cx="28" cy="452" r="8" fill="none" stroke="#334155" strokeWidth="2" />
          <circle cx="28" cy="452" r="4" fill="#0f172a" />
          <circle cx="932" cy="452" r="8" fill="none" stroke="#334155" strokeWidth="2" />
          <circle cx="932" cy="452" r="4" fill="#0f172a" />

          {/* Decorative PCB Silk-Screen Markings */}
          <text x="60" y="456" className="fill-slate-600 font-mono text-[10px] tracking-widest">
            LOGIC-TRAINER REV 2.4 // IC LOGIC CORE
          </text>
          <text x="900" y="456" textAnchor="end" className="fill-slate-600 font-mono text-[10px]">
            ROHS COMPLIANT · DIGITAL LOGIC LAB
          </text>
        </g>

        {/* Step Highlight Backdrops */}
        {highlightSwitches && (
          <rect
            x="80"
            y={isSingleInput ? 160 : 70}
            width="120"
            height={isSingleInput ? 160 : 340}
            rx="20"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        )}
        {highlightWireIn && (
          <rect
            x="200"
            y={isSingleInput ? 200 : 110}
            width="220"
            height={isSingleInput ? 80 : 260}
            rx="16"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        )}
        {highlightGate && (
          <circle
            cx={gatePos.x}
            cy={gatePos.y}
            r="85"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        )}
        {highlightWireOut && (
          <rect
            x="540"
            y="200"
            width="220"
            height="90"
            rx="16"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        )}
        {highlightBulb && (
          <circle
            cx={bulbPos.x}
            cy={bulbPos.y - 15}
            r="95"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        )}

        {/* Wires */}
        {/* Wire A */}
        <ElectricWire
          id="wire-a"
          path={wireAPath}
          active={inputA}
          speed={speed}
          showVoltageBadge={true}
          labelPosition={
            isSingleInput
              ? { x: (switchATerminal.x + gatePinA.x) / 2, y: switchATerminal.y - 18 }
              : { x: 300, y: switchATerminal.y - 16 }
          }
        />

        {/* Wire B (only for 2-input gates) */}
        {!isSingleInput && (
          <ElectricWire
            id="wire-b"
            path={wireBPath}
            active={inputB}
            speed={speed}
            showVoltageBadge={true}
            labelPosition={{ x: 300, y: switchBTerminal.y + 18 }}
          />
        )}

        {/* Output Wire */}
        <ElectricWire
          id="wire-out"
          path={wireOutPath}
          active={output}
          speed={speed}
          showVoltageBadge={true}
          labelPosition={{ x: 660, y: gatePinY.y - 16 }}
        />

        {/* Input Switches */}
        <InteractiveSwitch
          id="switch-a"
          label={isSingleInput ? 'INPUT A' : 'INPUT A'}
          state={inputA}
          onToggle={onToggleA}
          x={switchAPos.x}
          y={switchAPos.y}
        />

        {!isSingleInput && (
          <InteractiveSwitch
            id="switch-b"
            label="INPUT B"
            state={inputB}
            onToggle={onToggleB}
            x={switchBPos.x}
            y={switchBPos.y}
          />
        )}

        {/* Logic Gate Component */}
        <LogicGateSVG
          type={gateType}
          x={gatePos.x}
          y={gatePos.y}
          inputA={inputA}
          inputB={inputB}
          output={output}
          onGateClick={onGateClick}
        />

        {/* Realistic Output Bulb */}
        <RealisticBulb
          x={bulbPos.x}
          y={bulbPos.y}
          output={output}
        />

        {/* Signal Flow Direction Arrows (when active) */}
        {inputA && (
          <g transform={`translate(${isSingleInput ? 280 : 250}, ${switchATerminal.y})`}>
            <polygon points="-4,-4 4,0 -4,4" fill="#00f0ff" opacity="0.8" />
          </g>
        )}
        {!isSingleInput && inputB && (
          <g transform={`translate(250, ${switchBTerminal.y})`}>
            <polygon points="-4,-4 4,0 -4,4" fill="#00f0ff" opacity="0.8" />
          </g>
        )}
        {output && (
          <g transform={`translate(610, ${gatePinY.y})`}>
            <polygon points="-4,-4 4,0 -4,4" fill="#00f0ff" opacity="0.8" />
          </g>
        )}
      </svg>
    </div>
  );
}
