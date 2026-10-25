'use client';

import React from 'react';
import { GateType, Language } from '@/types/logic';
import { GATE_REGISTRY } from '@/lib/logic-engine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, Lightbulb, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface GateExplanationProps {
  gateType: GateType;
  language: Language;
}

export function GateExplanation({ gateType, language }: GateExplanationProps) {
  const info = GATE_REGISTRY[gateType];

  return (
    <div className="space-y-6">
      {/* Main Gate Overview Card */}
      <Card className="overflow-hidden border-sky-500/30">
        <div className="bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-transparent p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="neon" className="text-xs font-mono">
                  {info.type}
                </Badge>
                {info.universal && (
                  <Badge variant="success" className="text-xs">
                    {language === 'en' ? '★ Universal Gate' : '★ সার্বজনীন গেট'}
                  </Badge>
                )}
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  TTL IC: {info.icCode.split(' ')[0]}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                {info.name[language]}
              </h3>
            </div>

            <div className="px-4 py-2 rounded-xl bg-slate-900 text-cyan-300 font-mono text-lg font-bold border border-cyan-500/40 shadow-inner">
              {info.expression}
            </div>
          </div>
          <p className="mt-3 text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
            {info.shortDesc[language]}
          </p>
        </div>

        <CardContent className="p-6 space-y-6">
          {/* Detailed Explanation */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-sky-500" />
              <span>{language === 'en' ? 'How it Works' : 'কার্যপদ্ধতি'}</span>
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {info.detailedDesc[language]}
            </p>
          </div>

          {/* Core Boolean Logic Rule */}
          <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60">
            <h5 className="flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>{language === 'en' ? 'Fundamental Rule' : 'মূল সূত্র / শর্ত'}</span>
            </h5>
            <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
              {info.rule[language]}
            </p>
          </div>

          {/* Real-Life Practical Analogy */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-500 dark:text-amber-300 shrink-0 mt-0.5">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                  {language === 'en' ? 'Real-Life Analogy' : 'বাস্তব জীবনের উদাহরণ'}
                </span>
                <h5 className="text-base font-bold text-slate-900 dark:text-white">
                  {info.realLifeExample.title[language]}
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {info.realLifeExample.description[language]}
                </p>
                <div className="pt-2">
                  <span className="inline-block px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-xs font-mono font-semibold text-amber-800 dark:text-amber-200">
                    💡 {info.realLifeExample.scenario[language]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                {language === 'en' ? 'Standard IC' : 'স্ট্যান্ডার্ড আইসি'}
              </span>
              <span className="font-mono text-sm font-bold text-sky-600 dark:text-sky-400">
                {info.icCode.split(' ')[0]}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                {language === 'en' ? 'CMOS Transistors' : 'ট্রানজিস্টর সংখ্যা'}
              </span>
              <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                ~{info.transistorCount} MOSFETs
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                {language === 'en' ? 'Symbol Standard' : 'প্রতীক স্ট্যান্ডার্ড'}
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                ANSI / IEEE 91-1984
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
