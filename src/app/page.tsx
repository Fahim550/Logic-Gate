'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { GateType, Language, StepInfo } from '@/types/logic';
import { computeGateOutput, GATE_TYPES, GATE_REGISTRY } from '@/lib/logic-engine';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CircuitBoard } from '@/components/circuit/CircuitBoard';
import { TruthTable } from '@/components/TruthTable';
import { GateExplanation } from '@/components/GateExplanation';
import { StepByStepTracer } from '@/components/StepByStepTracer';
import { QuizMode } from '@/components/QuizMode';
import { HalfAdderSimulator } from '@/components/HalfAdderSimulator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  Activity,
  BookOpen,
  Footprints,
  Trophy,
  Cpu,
  Zap,
  RotateCcw,
  Sliders,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

export default function HomePage() {
  // Simulator state
  const [gateType, setGateType] = useState<GateType>('AND');
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [showTruthTable, setShowTruthTable] = useState<boolean>(true);

  // App settings state
  const [isDark, setIsDark] = useState<boolean>(true);
  const [language, setLanguage] = useState<Language>('en');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Active educational mode tabs
  type TabType = 'simulator' | 'guide' | 'step' | 'quiz' | 'half-adder';
  const [activeTab, setActiveTab] = useState<TabType>('simulator');

  // Step tracer active highlight element
  const [activeStepElement, setActiveStepElement] = useState<StepInfo['activeElement'] | null>(null);

  // Compute live output based on pure Boolean logic
  const output = computeGateOutput(gateType, inputA, inputB);
  const gateInfo = GATE_REGISTRY[gateType];
  const isSingleInput = gateType === 'NOT';

  // Synchronize dark mode class to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Handle Switch Toggles
  const handleToggleA = useCallback(() => {
    setInputA((prev) => !prev);
  }, []);

  const handleToggleB = useCallback(() => {
    setInputB((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    sound.playClick();
    setInputA(false);
    setInputB(false);
  }, []);

  // Keyboard shortcut listeners (1-7 for gates, A/B for switches, R for reset)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key >= '1' && e.key <= '7') {
        const index = parseInt(e.key, 10) - 1;
        if (index < GATE_TYPES.length) {
          sound.playClick();
          setGateType(GATE_TYPES[index]);
        }
      } else if (e.key === 'r' || e.key === 'R') {
        handleReset();
      } else if (e.key === 'a' || e.key === 'A') {
        sound.playSwitch(!inputA);
        setInputA((prev) => !prev);
      } else if (e.key === 'b' || e.key === 'B') {
        if (gateType !== 'NOT') {
          sound.playSwitch(!inputB);
          setInputB((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gateType, inputA, inputB, handleReset]);

  // Load a quiz challenge into the simulator
  const handleLoadChallenge = (gate: GateType, presetA?: boolean, presetB?: boolean) => {
    setGateType(gate);
    if (presetA !== undefined) setInputA(presetA);
    if (presetB !== undefined) setInputB(presetB);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#060913] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Sticky Global Navigation Header */}
      <Header
        currentGate={gateType}
        onSelectGate={(gate) => {
          setGateType(gate);
          // If switching to NOT, B is ignored
        }}
        language={language}
        onToggleLanguage={() => setLanguage((l) => (l === 'en' ? 'bn' : 'en'))}
        isDark={isDark}
        onToggleTheme={() => setIsDark((d) => !d)}
        isMuted={isMuted}
        onToggleSound={() => setIsMuted(sound.toggleMute())}
        speed={speed}
        onChangeSpeed={setSpeed}
        onReset={handleReset}
        showTruthTable={showTruthTable}
        onToggleTruthTable={() => setShowTruthTable((prev) => !prev)}
      />

      {/* Main Learning Hub Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Hero Breadcrumb & Mode Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                {gateInfo.name[language]}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Formula: <strong className="text-cyan-600 dark:text-cyan-300">{gateInfo.expression}</strong>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {gateInfo.name[language]}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              {gateInfo.shortDesc[language]}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800 text-xs font-semibold backdrop-blur-md">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('simulator');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Simulator' : 'সিমুলেটর'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('step');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'step'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Footprints className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Step-by-Step' : 'ধাপে ধাপে'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('guide');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Learning Guide' : 'লার্নিং গাইড'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('quiz');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'en' ? 'Quiz / Challenge' : 'কুইজ'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('half-adder');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'half-adder'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'en' ? 'Half Adder' : 'হাফ অ্যাডার'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Mode Tab Render */}
        {activeTab === 'half-adder' ? (
          /* Bonus Compound Circuit Lab: Half Adder */
          <HalfAdderSimulator language={language} speed={speed} />
        ) : (
          /* Standard Gate Simulator & Educational Modules */
          <div className="space-y-6">
            {/* Step-by-Step Flow Controls (visible when in 'step' mode or as optional assistant) */}
            {activeTab === 'step' && (
              <StepByStepTracer
                language={language}
                onStepChange={(_, element) => setActiveStepElement(element)}
                speed={speed}
              />
            )}

            {/* Quiz Mode Banner (visible when in 'quiz' mode) */}
            {activeTab === 'quiz' && (
              <QuizMode
                currentGate={gateType}
                inputA={inputA}
                inputB={inputB}
                output={output}
                language={language}
                onLoadChallenge={handleLoadChallenge}
              />
            )}

            {/* Interactive Circuit Simulator Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Main Visual Circuit Board (spans 8 cols on desktop or 12 if truth table hidden) */}
              <div className={showTruthTable ? 'lg:col-span-8 space-y-4' : 'lg:col-span-12 space-y-4'}>
                <CircuitBoard
                  gateType={gateType}
                  inputA={inputA}
                  inputB={inputB}
                  output={output}
                  speed={speed}
                  onToggleA={handleToggleA}
                  onToggleB={handleToggleB}
                  onGateClick={() => setActiveTab('guide')}
                  activeStepElement={activeTab === 'step' ? activeStepElement : null}
                />

                {/* Tactile Control Panel & Live Multimeter Oscilloscope Bar */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-md backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
                  {/* Quick Toggle Push Buttons for Input A and B */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant={inputA ? 'glow' : 'outline'}
                      size="sm"
                      onClick={() => {
                        sound.playSwitch(!inputA);
                        setInputA(!inputA);
                      }}
                      className="font-mono text-xs font-bold"
                    >
                      <span>INPUT A:</span>
                      <span className={inputA ? 'text-cyan-950 font-black' : 'text-slate-400'}>
                        {inputA ? '1 (HIGH)' : '0 (LOW)'}
                      </span>
                    </Button>

                    {!isSingleInput && (
                      <Button
                        variant={inputB ? 'glow' : 'outline'}
                        size="sm"
                        onClick={() => {
                          sound.playSwitch(!inputB);
                          setInputB(!inputB);
                        }}
                        className="font-mono text-xs font-bold"
                      >
                        <span>INPUT B:</span>
                        <span className={inputB ? 'text-cyan-950 font-black' : 'text-slate-400'}>
                          {inputB ? '1 (HIGH)' : '0 (LOW)'}
                        </span>
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      title="Reset all inputs to 0"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" />
                      <span>{language === 'en' ? 'Reset' : 'রিসেট'}</span>
                    </Button>
                  </div>

                  {/* Digital Multimeter Voltage Status HUD */}
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">V(A):</span>
                      <strong className={inputA ? 'text-cyan-500 dark:text-cyan-400 font-bold' : 'text-slate-500'}>
                        {inputA ? '5.00V' : '0.04V'}
                      </strong>
                    </div>

                    {!isSingleInput && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">V(B):</span>
                        <strong className={inputB ? 'text-cyan-500 dark:text-cyan-400 font-bold' : 'text-slate-500'}>
                          {inputB ? '5.00V' : '0.04V'}
                        </strong>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-400">OUT (Y):</span>
                      <strong className={output ? 'text-amber-500 font-black' : 'text-slate-500'}>
                        {output ? '5.00V [HIGH]' : '0.00V [LOW]'}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Live Truth Table (spans 4 cols on desktop) */}
              {showTruthTable && (
                <div className="lg:col-span-4">
                  <TruthTable
                    gateType={gateType}
                    inputA={inputA}
                    inputB={inputB}
                    language={language}
                    onSelectRow={(a, b) => {
                      setInputA(a);
                      setInputB(b);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Deep Learning Guide (shown either on 'guide' tab or as lower pedagogical section) */}
            <div className="pt-4">
              <GateExplanation gateType={gateType} language={language} />
            </div>
          </div>
        )}
      </main>

      {/* Global Learning Platform Footer */}
      <Footer language={language} />
    </div>
  );
}
