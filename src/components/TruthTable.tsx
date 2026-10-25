'use client';

import React from 'react';
import { GateType, Language } from '@/types/logic';
import { getTruthTable, GATE_REGISTRY } from '@/lib/logic-engine';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';

interface TruthTableProps {
  gateType: GateType;
  inputA: boolean;
  inputB: boolean;
  language: Language;
  onSelectRow: (a: boolean, b: boolean) => void;
}

export function TruthTable({
  gateType,
  inputA,
  inputB,
  language,
  onSelectRow,
}: TruthTableProps) {
  const rows = getTruthTable(gateType, inputA, inputB);
  const gateInfo = GATE_REGISTRY[gateType];
  const isSingleInput = gateType === 'NOT';

  const handleRowClick = (a: boolean, b: boolean = false) => {
    sound.playClick();
    onSelectRow(a, b);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-lg p-5 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
        <div>
          <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <span>{language === 'en' ? 'Live Truth Table' : 'সরাসরি ট্রুথ টেবিল'}</span>
            <Badge variant="neon" className="font-mono text-xs">
              {gateInfo.expression}
            </Badge>
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {language === 'en'
              ? 'Click any row to test that input combination'
              : 'যেকোনো সারিতে ক্লিক করে সার্কিট পরীক্ষা করো'}
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500">
            {language === 'en' ? 'TTL IC:' : 'টিটিএল আইসি:'} {gateInfo.icCode.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-2.5 px-3">{language === 'en' ? 'Input A' : 'ইনপুট A'}</th>
              {!isSingleInput && (
                <th className="py-2.5 px-3">{language === 'en' ? 'Input B' : 'ইনপুট B'}</th>
              )}
              <th className="py-2.5 px-3 text-sky-600 dark:text-sky-400">
                {language === 'en' ? 'Output (Y)' : 'আউটপুট (Y)'}
              </th>
              <th className="py-2.5 px-3">{language === 'en' ? 'State' : 'অবস্থা'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
            {rows.map((row, idx) => {
              const isActive = row.isCurrent;
              return (
                <tr
                  key={idx}
                  onClick={() => handleRowClick(row.a, row.b ?? false)}
                  className={`cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-500/15 dark:bg-sky-500/20 shadow-inner font-bold'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {/* Input A */}
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                        row.a
                          ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {row.a ? '1' : '0'}
                    </span>
                  </td>

                  {/* Input B */}
                  {!isSingleInput && (
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                          row.b
                            ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {row.b ? '1' : '0'}
                      </span>
                    </td>
                  )}

                  {/* Output Y */}
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold shadow-sm ${
                        row.output
                          ? 'bg-amber-400/25 text-amber-600 dark:text-amber-300 border border-amber-400/60'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {row.output ? '1' : '0'}
                    </span>
                  </td>

                  {/* Status Indicator Badge */}
                  <td className="py-2.5 px-3">
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-sans font-bold bg-sky-500 text-white shadow-sm shadow-sky-500/40 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        {language === 'en' ? 'ACTIVE NOW' : 'সক্রিয়'}
                      </span>
                    ) : (
                      <span className="text-xs font-sans text-slate-400 dark:text-slate-500">
                        {language === 'en' ? 'Click to test' : 'ক্লিক করুন'}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer hint */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>1 = HIGH (5V) · 0 = LOW (0V)</span>
        <span className="font-semibold text-sky-600 dark:text-sky-400">
          {gateInfo.booleanEquation}
        </span>
      </div>
    </div>
  );
}
