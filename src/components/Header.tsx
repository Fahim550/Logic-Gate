'use client';

import React from 'react';
import { GateType, Language } from '@/types/logic';
import { GATE_TYPES, GATE_REGISTRY } from '@/lib/logic-engine';
import { Button } from '@/components/ui/button';
import { sound } from '@/lib/sound-effects';
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Globe,
  Sliders,
  TableProperties,
} from 'lucide-react';

interface HeaderProps {
  currentGate: GateType;
  onSelectGate: (gate: GateType) => void;
  language: Language;
  onToggleLanguage: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
  speed: number;
  onChangeSpeed: (speed: number) => void;
  onReset: () => void;
  showTruthTable: boolean;
  onToggleTruthTable: () => void;
}

export function Header({
  currentGate,
  onSelectGate,
  language,
  onToggleLanguage,
  isDark,
  onToggleTheme,
  isMuted,
  onToggleSound,
  speed,
  onChangeSpeed,
  onReset,
  showTruthTable,
  onToggleTruthTable,
}: HeaderProps) {
  const speeds = [0.5, 1, 2];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar: Brand + Global Controls */}
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-cyan-500 to-teal-400 p-0.5 shadow-md shadow-cyan-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>LogicLab</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400 font-mono font-bold">
                  2.0
                </span>
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5">
                {language === 'en'
                  ? 'Interactive Digital Logic Simulator'
                  : 'ডিজিটাল লজিক গেট সিমুলেটর'}
              </p>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Speed toggle pills */}
            <div className="hidden md:flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
              <span className="px-2 text-slate-500 text-[10px]">SPEED:</span>
              {speeds.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    sound.playClick();
                    onChangeSpeed(s);
                  }}
                  className={`px-2 py-0.5 rounded-lg transition-all ${
                    speed === s
                      ? 'bg-sky-600 text-white font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Reset circuit */}
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              title={language === 'en' ? 'Reset Switches' : 'সুইচ রিসেট করো'}
              className="gap-1.5 text-xs h-9 px-3"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {language === 'en' ? 'Reset' : 'রিসেট'}
              </span>
            </Button>

            {/* Toggle Truth Table Visibility */}
            <Button
              variant={showTruthTable ? 'secondary' : 'outline'}
              size="sm"
              onClick={onToggleTruthTable}
              title={language === 'en' ? 'Toggle Truth Table' : 'সত্যক সারণী টগল'}
              className="gap-1.5 text-xs h-9 px-3"
            >
              <TableProperties className="w-3.5 h-3.5 text-sky-500" />
              <span className="hidden sm:inline">
                {language === 'en' ? 'Truth Table' : 'ট্রুথ টেবিল'}
              </span>
            </Button>

            {/* Sound Mute/Unmute */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSound}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              className="h-9 w-9 text-slate-600 dark:text-slate-400 hover:text-cyan-400"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
            </Button>

            {/* Language Switcher */}
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleLanguage}
              className="gap-1.5 font-bold text-xs h-9 px-2.5 border-slate-300 dark:border-slate-700"
              title="Toggle English / বাংলা"
            >
              <Globe className="w-3.5 h-3.5 text-sky-500" />
              <span>{language === 'en' ? 'বাং' : 'EN'}</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
              className="h-9 w-9 text-slate-600 dark:text-slate-400"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </Button>
          </div>
        </div>

        {/* Gate Selection Pills Ribbon */}
        <div className="py-2.5 overflow-x-auto no-scrollbar border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-1.5 sm:gap-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
            {language === 'en' ? 'Gates:' : 'গেটসমূহ:'}
          </span>
          {GATE_TYPES.map((gate) => {
            const isSelected = currentGate === gate;
            const gateInfo = GATE_REGISTRY[gate];
            return (
              <button
                key={gate}
                onClick={() => {
                  sound.playClick();
                  onSelectGate(gate);
                }}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-md shadow-cyan-500/30 scale-[1.03]'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <span>{gate}</span>
                <span className={`text-[10px] ml-1.5 opacity-75 font-normal ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                  {gateInfo.expression.replace('Y = ', '')}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
