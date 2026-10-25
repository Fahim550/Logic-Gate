export type GateType = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';

export type Language = 'en' | 'bn';

export interface TruthTableRow {
  a: boolean;
  b?: boolean; // NOT gate only has input A
  output: boolean;
  isCurrent: boolean;
}

export interface GateInfo {
  type: GateType;
  name: {
    en: string;
    bn: string;
  };
  symbolName: string;
  expression: string;
  booleanEquation: string;
  shortDesc: {
    en: string;
    bn: string;
  };
  detailedDesc: {
    en: string;
    bn: string;
  };
  rule: {
    en: string;
    bn: string;
  };
  realLifeExample: {
    title: {
      en: string;
      bn: string;
    };
    description: {
      en: string;
      bn: string;
    };
    scenario: {
      en: string;
      bn: string;
    };
  };
  icCode: string;
  transistorCount: number;
  universal?: boolean;
}

export interface StepInfo {
  step: number;
  title: {
    en: string;
    bn: string;
  };
  description: {
    en: string;
    bn: string;
  };
  activeElement: 'switches' | 'wire-in' | 'gate' | 'wire-out' | 'bulb';
}

export interface QuizQuestion {
  id: string;
  gateType: GateType;
  question: {
    en: string;
    bn: string;
  };
  prompt: {
    en: string;
    bn: string;
  };
  targetOutput: boolean;
  presetA?: boolean;
  presetB?: boolean;
  explanation: {
    en: string;
    bn: string;
  };
}
