'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Language, StepInfo } from '@/types/logic';
import { STEP_PIPELINE } from '@/lib/logic-engine';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import {
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Workflow,
  Activity,
} from 'lucide-react';

interface StepByStepTracerProps {
  language: Language;
  onStepChange: (step: number, element: StepInfo['activeElement']) => void;
  speed: number;
}

export function StepByStepTracer({
  language,
  onStepChange,
  speed,
}: StepByStepTracerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = STEP_PIPELINE[currentStepIndex];

  // Notify parent of active step
  useEffect(() => {
    onStepChange(currentStep.step, currentStep.activeElement);
  }, [currentStepIndex, currentStep, onStepChange]);

  // Auto-play interval
  useEffect(() => {
    if (isPlaying) {
      const stepDuration = Math.max(1000, 2400 / speed);
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= STEP_PIPELINE.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          sound.playClick();
          return prev + 1;
        });
      }, stepDuration);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed]);

  const handleNext = () => {
    if (currentStepIndex < STEP_PIPELINE.length - 1) {
      sound.playClick();
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      sound.playClick();
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const togglePlay = () => {
    sound.playClick();
    if (currentStepIndex >= STEP_PIPELINE.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-3.5 sm:p-5 text-slate-900 dark:text-white transition-colors">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 shrink-0">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base flex items-center gap-2">
              <span>{language === 'en' ? 'Signal Flow Tracer' : 'সংকেত সঞ্চালন ট্রেসার'}</span>
              <Badge variant="neon" className="text-xs">
                {language === 'en' ? `Step ${currentStep.step} of 5` : `ধাপ ${currentStep.step}/৫`}
              </Badge>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? 'Follow electric potential from switches to logic processing to load'
                : 'সুইচ থেকে শুরু করে গেটের ভেতরে ও বাল্ব পর্যন্ত বিদ্যুতের গতিপথ দেখো'}
            </p>
          </div>
        </div>

        {/* Player controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            title={language === 'en' ? 'Reset to Step 1' : 'প্রথম ধাপে যাও'}
            className="h-8 w-8 sm:w-auto sm:px-3 p-0"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            title={language === 'en' ? 'Previous Step' : 'পূর্ববর্তী ধাপ'}
            className="h-8 w-8 sm:w-auto sm:px-3 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant={isPlaying ? 'destructive' : 'default'}
            onClick={togglePlay}
            className="h-8 min-w-20 sm:min-w-24 font-bold text-xs"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Pause' : 'থামাও'}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Auto-Play' : 'চালু করো'}</span>
              </>
            )}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleNext}
            disabled={currentStepIndex === STEP_PIPELINE.length - 1}
            title={language === 'en' ? 'Next Step' : 'পরবর্তী ধাপ'}
            className="h-8 w-8 sm:w-auto sm:px-3 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Step Progress Dots */}
      <div className="flex sm:grid sm:grid-cols-5 gap-2 my-3 sm:my-4 overflow-x-auto no-scrollbar pb-1 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
        {STEP_PIPELINE.map((s, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          return (
            <button
              key={s.step}
              onClick={() => {
                sound.playClick();
                setCurrentStepIndex(idx);
              }}
              className={`p-2.5 rounded-xl text-left transition-all shrink-0 sm:shrink min-w-[130px] sm:min-w-0 cursor-pointer ${
                isCurrent
                  ? 'bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-500 shadow-sm'
                  : isDone
                  ? 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                  : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                <span className={isCurrent ? 'text-sky-600 dark:text-sky-300 font-bold' : 'text-slate-400'}>
                  0{s.step}
                </span>
                {isCurrent && <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />}
              </div>
              <span className={`block text-xs font-semibold ${
                isCurrent ? 'text-sky-950 dark:text-white font-bold' : 'text-slate-700 dark:text-slate-300'
              }`}>
                {s.title[language].split('.')[1] || s.title[language]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Step Content */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
        <h5 className="text-sm font-bold text-sky-700 dark:text-cyan-300 flex items-center gap-2">
          <span>{currentStep.title[language]}</span>
        </h5>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {currentStep.description[language]}
        </p>
      </div>
    </div>
  );
}
