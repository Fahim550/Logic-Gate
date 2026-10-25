'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GateType, Language } from '@/types/logic';
import { QUIZ_CHALLENGES } from '@/lib/logic-engine';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import { Award, CheckCircle, ArrowRight, HelpCircle, Trophy } from 'lucide-react';

interface QuizModeProps {
  currentGate: GateType;
  inputA: boolean;
  inputB: boolean;
  output: boolean;
  language: Language;
  onLoadChallenge: (gate: GateType, presetA?: boolean, presetB?: boolean) => void;
}

export function QuizMode({
  currentGate,
  inputA,
  inputB,
  output,
  language,
  onLoadChallenge,
}: QuizModeProps) {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  const challenge = QUIZ_CHALLENGES[challengeIndex];
  const isMatchingGate = currentGate === challenge.gateType;
  const isSolved = isMatchingGate && output === challenge.targetOutput;
  const hasFinished = completedIds.includes(challenge.id);

  const triggerCelebration = () => {
    sound.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#38bdf8', '#fbbf24', '#ffffff'],
      });
    } catch {
      // Safe fallback
    }
  };

  const handleCheckAnswer = () => {
    if (isSolved && !hasFinished) {
      triggerCelebration();
      setCompletedIds((prev) => [...prev, challenge.id]);
    } else {
      sound.playClick();
    }
  };

  const handleNextChallenge = () => {
    sound.playClick();
    setShowHint(false);
    if (challengeIndex < QUIZ_CHALLENGES.length - 1) {
      const nextIdx = challengeIndex + 1;
      setChallengeIndex(nextIdx);
      const nextQ = QUIZ_CHALLENGES[nextIdx];
      onLoadChallenge(nextQ.gateType, nextQ.presetA, nextQ.presetB);
    }
  };

  const handleLoadQuestionToCircuit = () => {
    sound.playClick();
    onLoadChallenge(challenge.gateType, challenge.presetA, challenge.presetB);
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-transparent p-3.5 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/20 text-amber-500 dark:text-amber-300 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>{language === 'en' ? 'Interactive Circuit Challenge' : 'ইন্টারেক্টিভ সার্কিট কুইজ'}</span>
              <Badge variant="outline" className="text-xs font-mono">
                {challengeIndex + 1} / {QUIZ_CHALLENGES.length}
              </Badge>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? 'Test your logic skills by configuring the live circuit simulator'
                : 'সরাসরি সার্কিটের সুইচ পরিচালনা করে চ্যালেঞ্জগুলো সমাধান করো'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="success" className="text-xs">
            {language === 'en' ? 'Solved:' : 'সম্পন্ন:'} {completedIds.length} / {QUIZ_CHALLENGES.length}
          </Badge>
        </div>
      </div>

      <CardContent className="p-3.5 sm:p-6 space-y-4 sm:space-y-5">
        {/* Challenge prompt box */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="neon" className="text-xs font-mono">
              GATE: {challenge.gateType}
            </Badge>
            <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 font-mono">
              TARGET: OUTPUT {challenge.targetOutput ? '1 (HIGH)' : '0 (LOW)'}
            </span>
          </div>

          <h5 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white pt-1">
            {challenge.question[language]}
          </h5>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {challenge.prompt[language]}
          </p>
        </div>

        {/* Live Simulator Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-3.5 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono border border-slate-800 gap-2.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span>
              CURRENT: <strong className="text-sky-400">{currentGate}</strong>
            </span>
            <span>
              A: <strong className={inputA ? 'text-cyan-400' : 'text-slate-400'}>{inputA ? '1' : '0'}</strong>
            </span>
            {currentGate !== 'NOT' && (
              <span>
                B: <strong className={inputB ? 'text-cyan-400' : 'text-slate-400'}>{inputB ? '1' : '0'}</strong>
              </span>
            )}
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
              OUT:{' '}
              <strong className={output ? 'text-amber-400' : 'text-slate-400'}>
                {output ? '1 (HIGH)' : '0 (LOW)'}
              </strong>
            </span>
          </div>

          {!isMatchingGate && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleLoadQuestionToCircuit}
              className="text-xs py-1 h-7 border-sky-400 text-sky-300 w-full sm:w-auto"
            >
              {language === 'en' ? 'Switch to this Gate' : 'এই গেটে যাও'}
            </Button>
          )}
        </div>

        {/* Evaluation and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHint(!showHint)}
            className="text-xs gap-1.5 text-slate-500 dark:text-slate-400"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{showHint ? (language === 'en' ? 'Hide Hint' : 'ইঙ্গিত লুকান') : (language === 'en' ? 'Need a Hint?' : 'ইঙ্গিত দরকার?')}</span>
          </Button>

          <div className="flex items-center gap-2">
            {isSolved || hasFinished ? (
              <Button
                variant="glow"
                onClick={handleNextChallenge}
                disabled={challengeIndex >= QUIZ_CHALLENGES.length - 1}
              >
                <span>{language === 'en' ? 'Next Challenge' : 'পরবর্তী চ্যালেঞ্জ'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant={isSolved ? 'glow' : 'default'}
                onClick={handleCheckAnswer}
              >
                <CheckCircle className="w-4 h-4" />
                <span>{language === 'en' ? 'Verify My Circuit' : 'যাচাই করো'}</span>
              </Button>
            )}
          </div>
        </div>

        {/* Hint / Explanation Accordion */}
        {showHint && (
          <div className="flex items-start gap-2 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200">
            <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="mr-1">{language === 'en' ? 'Hint:' : 'ইঙ্গিত:'}</strong>
              {challenge.explanation[language]}
            </div>
          </div>
        )}

        {/* Success Message Banner */}
        {(isSolved || hasFinished) && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 flex items-center gap-3">
            <Award className="w-6 h-6 shrink-0" />
            <div>
              <strong className="block text-sm font-bold">
                {language === 'en' ? 'Brilliant! Target Output Achieved!' : 'চমৎকার! সঠিক ফলাফল অর্জিত হয়েছে!'}
              </strong>
              <span className="text-xs opacity-90">
                {challenge.explanation[language]}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
