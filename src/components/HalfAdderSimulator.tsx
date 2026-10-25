'use client';

import React, { useState } from 'react';
import { Language } from '@/types/logic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InteractiveSwitch } from './circuit/InteractiveSwitch';
import { ElectricWire } from './circuit/ElectricWire';
import { RealisticBulb } from './circuit/RealisticBulb';
import { sound } from '@/lib/sound-effects';
import { Cpu, Plus } from 'lucide-react';

interface HalfAdderSimulatorProps {
  language: Language;
  speed: number;
}

export function HalfAdderSimulator({ language, speed }: HalfAdderSimulatorProps) {
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  const sum = inputA !== inputB; // XOR
  const carry = inputA && inputB; // AND

  const toggleA = () => {
    sound.playSwitch(!inputA);
    setInputA(!inputA);
  };

  const toggleB = () => {
    sound.playSwitch(!inputB);
    setInputB(!inputB);
  };

  const decimalVal = (inputA ? 1 : 0) + (inputB ? 1 : 0);
  const binaryVal = `${carry ? '1' : '0'}${sum ? '1' : '0'}`;

  return (
    <Card className="border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-transparent p-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-300">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>{language === 'en' ? 'Compound Circuit: 1-Bit Half Adder' : 'যৌগিক বর্তনী: ১-বিট হাফ অ্যাডার'}</span>
              <Badge variant="neon" className="text-xs">
                XOR + AND
              </Badge>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? 'See how two primitive logic gates combine to add two binary bits together'
                : 'দেখো কীভাবে দুটি মৌলিক গেট যুক্ত হয়ে বাইনারি সংখ্যা যোগ করে'}
            </p>
          </div>
        </div>

        {/* Live arithmetic banner */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900 text-white font-mono text-sm border border-slate-700/80">
          <span>{inputA ? '1' : '0'}</span>
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          <span>{inputB ? '1' : '0'}</span>
          <span className="text-slate-500">=</span>
          <strong className="text-amber-400 text-base">{binaryVal}₂</strong>
          <span className="text-xs text-slate-400">({decimalVal} {language === 'en' ? 'in decimal' : 'দশমিকে'})</span>
        </div>
      </div>

      <CardContent className="p-4 sm:p-6 space-y-5">
        {/* SVG Half Adder Circuit */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-slate-300 dark:border-slate-800 shadow-md dark:shadow-2xl bg-[#080d1a] select-none">
          <svg
            viewBox="0 0 960 480"
            className="w-full h-auto max-h-[500px] block"
            style={{ aspectRatio: '2 / 1' }}
          >
            <defs>
              <linearGradient id="haSwitchOnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>
              <linearGradient id="haSwitchOffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="haGateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Background grid */}
            <rect width="960" height="480" fill="url(#pcbGrid)" />

            {/* Switches */}
            <InteractiveSwitch
              id="ha-switch-a"
              label={language === 'en' ? 'BIT A' : 'বিট A'}
              state={inputA}
              onToggle={toggleA}
              x={130}
              y={140}
            />
            <InteractiveSwitch
              id="ha-switch-b"
              label={language === 'en' ? 'BIT B' : 'বিট B'}
              state={inputB}
              onToggle={toggleB}
              x={130}
              y={340}
            />

            {/* Wire traces branching to XOR gate and AND gate */}
            {/* Input A to XOR (upper) */}
            <ElectricWire
              id="ha-w-a-xor"
              path="M 168 140 L 260 140 L 260 120 L 410 120"
              active={inputA}
              speed={speed}
            />
            {/* Input A branching to AND (lower) */}
            <ElectricWire
              id="ha-w-a-and"
              path="M 260 140 L 260 320 L 415 320"
              active={inputA}
              speed={speed}
            />
            {/* Solder junction dot for A */}
            <circle cx="260" cy="140" r="4.5" fill={inputA ? '#00f0ff' : '#475569'} />

            {/* Input B branching to XOR (upper) */}
            <ElectricWire
              id="ha-w-b-xor"
              path="M 168 340 L 320 340 L 320 156 L 410 156"
              active={inputB}
              speed={speed}
            />
            {/* Input B to AND (lower) */}
            <ElectricWire
              id="ha-w-b-and"
              path="M 320 340 L 415 356"
              active={inputB}
              speed={speed}
            />
            {/* Solder junction dot for B */}
            <circle cx="320" cy="340" r="4.5" fill={inputB ? '#00f0ff' : '#475569'} />

            {/* Gate 1: XOR Gate (SUM bit) */}
            <g transform="translate(480, 138)">
              {sum && <circle cx="0" cy="0" r="45" fill="#00f0ff" opacity="0.12" filter="blur(8px)" />}
              <path
                d="M -54 -32 Q -34 0 -54 32"
                fill="none"
                stroke={sum ? '#38bdf8' : '#475569'}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M -44 -32 Q -14 -32 35 0 Q -14 32 -44 32 Q -24 0 -44 -32 Z"
                fill="url(#haGateGrad)"
                stroke={sum ? '#38bdf8' : '#475569'}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <text x="-5" y="4" textAnchor="middle" className="font-bold text-xs fill-slate-200">
                XOR (SUM)
              </text>
            </g>

            {/* Gate 2: AND Gate (CARRY bit) */}
            <g transform="translate(480, 338)">
              {carry && <circle cx="0" cy="0" r="45" fill="#00f0ff" opacity="0.12" filter="blur(8px)" />}
              <path
                d="M -45 -32 L 0 -32 A 32 32 0 0 1 0 32 L -45 32 Z"
                fill="url(#haGateGrad)"
                stroke={carry ? '#38bdf8' : '#475569'}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <text x="-8" y="4" textAnchor="middle" className="font-bold text-xs fill-slate-200">
                AND (CARRY)
              </text>
            </g>

            {/* Output Wire from XOR to SUM Bulb */}
            <ElectricWire
              id="ha-w-sum"
              path="M 538 138 L 680 138 L 680 160 L 764 160"
              active={sum}
              speed={speed}
            />

            {/* Output Wire from AND to CARRY Bulb */}
            <ElectricWire
              id="ha-w-carry"
              path="M 538 338 L 680 338 L 680 360 L 764 360"
              active={carry}
              speed={speed}
            />

            {/* SUM Bulb */}
            <RealisticBulb
              x={800}
              y={138}
              output={sum}
            />
            {/* Label for SUM */}
            <text x="800" y="55" textAnchor="middle" className="fill-sky-400 font-bold text-xs font-mono">
              {language === 'en' ? 'SUM BIT (S = A ⊕ B)' : 'যোগফল বিট (S = A ⊕ B)'}
            </text>

            {/* CARRY Bulb */}
            <RealisticBulb
              x={800}
              y={338}
              output={carry}
            />
            {/* Label for CARRY */}
            <text x="800" y="255" textAnchor="middle" className="fill-amber-400 font-bold text-xs font-mono">
              {language === 'en' ? 'CARRY BIT (C = A · B)' : 'হাতে থাকা বিট (C = A · B)'}
            </text>
          </svg>
        </div>

        {/* Half Adder Explanation & Truth Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <h5 className="font-bold text-sm text-slate-900 dark:text-white">
              {language === 'en' ? 'Binary Addition Logic' : 'বাইনারি যোগের নিয়ম'}
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'Computers do all mathematics using basic logic gates! When adding 1 + 1 in binary, the result is 10₂ (decimal 2): the XOR gate produces Sum = 0, while the AND gate produces Carry = 1.'
                : 'কম্পিউটার যাবতীয় হিসাব-নিকাশ মৌলিক লজিক গেট দিয়ে সম্পন্ন করে! বাইনারিতে ১ + ১ যোগ করলে ফলাফল হয় ১০₂ (দশমিকে ২): XOR গেট আউটপুট দেয় Sum = ০ এবং AND গেট আউটপুট দেয় Carry = ১।'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              {language === 'en' ? 'Half Adder Truth Table' : 'হাফ অ্যাডার সত্যক সারণী'}
            </h5>
            <div className="grid grid-cols-4 text-center text-xs font-mono gap-1 border-b border-slate-200 dark:border-slate-700 pb-1 font-semibold text-slate-500 dark:text-slate-400">
              <div>A</div>
              <div>B</div>
              <div className="text-sky-600 dark:text-sky-400">{language === 'en' ? 'Sum (S)' : 'যোগফল (S)'}</div>
              <div className="text-amber-600 dark:text-amber-400">{language === 'en' ? 'Carry (C)' : 'হাতে থাকা (C)'}</div>
            </div>
            {[
              [false, false, false, false],
              [false, true, true, false],
              [true, false, true, false],
              [true, true, false, true],
            ].map(([a, b, s, c], i) => {
              const isActive = inputA === a && inputB === b;
              return (
                <div
                  key={i}
                  className={`grid grid-cols-4 text-center text-xs font-mono py-1 rounded transition-colors ${
                    isActive ? 'bg-sky-500/20 font-bold text-sky-400' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div>{a ? '1' : '0'}</div>
                  <div>{b ? '1' : '0'}</div>
                  <div className="text-sky-500">{s ? '1' : '0'}</div>
                  <div className="text-amber-500">{c ? '1' : '0'}</div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
