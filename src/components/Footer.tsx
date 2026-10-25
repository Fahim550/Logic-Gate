'use client';

import React from 'react';
import { Language } from '@/types/logic';
import { Keyboard, Cpu, BookOpen, Zap } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md py-10 mt-16 text-slate-500 dark:text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold text-xs">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                LogicLab Visual Simulator
              </span>
            </div>
            <p className="leading-relaxed">
              {language === 'en'
                ? 'An interactive digital electronics learning platform designed for high school and university computer science and electrical engineering students.'
                : 'মাধ্যমিক, উচ্চমাধ্যমিক ও বিশ্ববিদ্যালয়ের শিক্ষার্থীদের জন্য ডিজিটাল লজিক গেট ও সার্কিট সিমুলেশনের আধুনিক প্ল্যাটফর্ম।'}
            </p>
          </div>

          {/* Educational Standards */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Cpu className="w-4 h-4 text-sky-500" />
              <span>{language === 'en' ? 'Standards & Hardware' : 'মান ও হার্ডওয়্যার'}</span>
            </h5>
            <ul className="space-y-1 text-slate-500 dark:text-slate-400">
              <li>• ANSI / IEEE Std 91-1984 Logic Symbols</li>
              <li>• Standard TTL 7400 Series IC Pinout Specifications</li>
              <li>• Dual-rail CMOS Complementary Switching Topology</li>
              <li>• De Morgan’s Laws & Boolean Algebra Foundations</li>
            </ul>
          </div>

          {/* Keyboard Shortcuts Guide */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Keyboard className="w-4 h-4 text-cyan-500" />
              <span>{language === 'en' ? 'Keyboard Controls' : 'কীবোর্ড শর্টকাট'}</span>
            </h5>
            <div className="space-y-1 font-mono text-[11px]">
              <div>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  Tab
                </kbd>{' '}
                +{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  Space
                </kbd>{' '}
                : {language === 'en' ? 'Toggle Switches' : 'সুইচ টগল'}
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  1 - 7
                </kbd>{' '}
                : {language === 'en' ? 'Select Logic Gate' : 'লজিক গেট নির্বাচন'}
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  R
                </kbd>{' '}
                : {language === 'en' ? 'Reset Inputs to 0' : 'ইনপুট ০ রিসেট'}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-[11px]">
          <span>© 2026 LogicLab · Open Source Logic Gate Learning</span>
          <span className="text-slate-400">
            {language === 'en'
              ? 'Built with Next.js, TypeScript, Tailwind CSS & Framer Motion'
              : 'নেক্সট.জেএস, টাইপস্ক্রিপ্ট ও টেইলউইন্ড সিএসএস দিয়ে নির্মিত'}
          </span>
        </div>
      </div>
    </footer>
  );
}
