import { GateInfo, GateType, QuizQuestion, StepInfo, TruthTableRow } from '@/types/logic';

export const GATE_TYPES: GateType[] = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];

/**
 * Pure Boolean logic computation
 */
export function computeGateOutput(type: GateType, a: boolean, b: boolean): boolean {
  switch (type) {
    case 'AND':
      return a && b;
    case 'OR':
      return a || b;
    case 'NOT':
      return !a;
    case 'NAND':
      return !(a && b);
    case 'NOR':
      return !(a || b);
    case 'XOR':
      return a !== b;
    case 'XNOR':
      return a === b;
    default:
      return false;
  }
}

/**
 * Generate complete truth table for a given gate and mark the currently active row
 */
export function getTruthTable(type: GateType, currentA: boolean, currentB: boolean): TruthTableRow[] {
  if (type === 'NOT') {
    return [
      { a: false, output: computeGateOutput('NOT', false, false), isCurrent: currentA === false },
      { a: true, output: computeGateOutput('NOT', true, false), isCurrent: currentA === true },
    ];
  }

  const combinations: [boolean, boolean][] = [
    [false, false],
    [false, true],
    [true, false],
    [true, true],
  ];

  return combinations.map(([a, b]) => ({
    a,
    b,
    output: computeGateOutput(type, a, b),
    isCurrent: currentA === a && currentB === b,
  }));
}

/**
 * Comprehensive bilingual logic gate encyclopedia
 */
export const GATE_REGISTRY: Record<GateType, GateInfo> = {
  AND: {
    type: 'AND',
    name: {
      en: 'AND Gate',
      bn: 'AND গেট',
    },
    symbolName: 'Conjunction (·)',
    expression: 'Y = A · B',
    booleanEquation: 'Y = A AND B',
    shortDesc: {
      en: 'Outputs HIGH (1) only when ALL inputs are HIGH (1).',
      bn: 'উভয় ইনপুট ১ (HIGH) হলেই কেবল আউটপুট ১ হবে।',
    },
    detailedDesc: {
      en: 'The AND gate implements logical conjunction. If any input is 0 (LOW), the output drops to 0 immediately. It acts like two electrical switches wired in series.',
      bn: 'AND গেট যৌক্তিক গুণ নির্দেশ করে। যেকোনো একটি ইনপুট ০ হলে আউটপুট সঙ্গে সঙ্গে ০ হয়ে যায়। এটি শ্রেণিবদ্ধভাবে (series) যুক্ত দুটি সুইচের মতো কাজ করে।',
    },
    rule: {
      en: 'Output is 1 if and only if both Input A = 1 and Input B = 1.',
      bn: 'আউটপুট ১ হবে শুধুমাত্র যখন ইনপুট A = ১ এবং ইনপুট B = ১ উভয়ই থাকে।',
    },
    realLifeExample: {
      title: {
        en: 'Bank Vault Dual-Key System',
        bn: 'ব্যাংক ভল্টের দ্বৈত চাবি ব্যবস্থা',
      },
      description: {
        en: 'A high-security bank vault requires both the Manager’s key AND the Security Officer’s key turned simultaneously to unlock the door.',
        bn: 'একটি নিরাপত্তা ভল্ট খুলতে ম্যানেজারের চাবি এবং সিকিউরিটি অফিসারের চাবি উভয়ই একসাথে অন করতে হয়।',
      },
      scenario: {
        en: 'Key A (Manager) = 1 AND Key B (Guard) = 1 → Vault Door Opens (1)',
        bn: 'চাবি A (ম্যানেজার) = ১ এবং চাবি B (গার্ড) = ১ → ভল্ট দরজা খোলে (১)',
      },
    },
    icCode: '7408 (Quad 2-Input AND Gate)',
    transistorCount: 6,
  },
  OR: {
    type: 'OR',
    name: {
      en: 'OR Gate',
      bn: 'OR গেট',
    },
    symbolName: 'Disjunction (+)',
    expression: 'Y = A + B',
    booleanEquation: 'Y = A OR B',
    shortDesc: {
      en: 'Outputs HIGH (1) if AT LEAST ONE input is HIGH (1).',
      bn: 'কমপক্ষে যেকোনো একটি ইনপুট ১ (HIGH) হলেই আউটপুট ১ হবে।',
    },
    detailedDesc: {
      en: 'The OR gate performs logical disjunction. The output is 0 only when both inputs are 0. In an electrical circuit, it is equivalent to two switches wired in parallel.',
      bn: 'OR গেট যৌক্তিক যোগ নির্দেশ করে। কেবল যখন দুটি ইনপুটই ০ থাকে, তখনই আউটপুট ০ হয়। এটি সমান্তরালভাবে (parallel) যুক্ত দুটি সুইচের সমতুল্য।',
    },
    rule: {
      en: 'Output is 1 if Input A = 1 OR Input B = 1 (or both). Output is 0 only when both inputs are 0.',
      bn: 'আউটপুট ১ হবে যদি ইনপুট A = ১ অথবা ইনপুট B = ১ (বা উভয়ই) হয়। শুধুমাত্র উভয় ইনপুট ০ হলেই আউটপুট ০ হয়।',
    },
    realLifeExample: {
      title: {
        en: 'Staircase / Hallway Two-Way Lighting',
        bn: 'সিঁড়ি বা করিডোরের যেকোনো সুইচে লাইট জ্বলা',
      },
      description: {
        en: 'A room lighting circuit with two entry doors: pressing switch at Door 1 OR switch at Door 2 will light up the room.',
        bn: 'একটি ঘরে দুটি দরজা আছে: দরজা ১-এর সুইচ চাপলে অথবা দরজা ২-এর সুইচ চাপলে ঘরের বাতি জ্বলে ওঠে।',
      },
      scenario: {
        en: 'Switch A = 1 OR Switch B = 1 → Room Lamp Turns ON (1)',
        bn: 'সুইচ A = ১ অথবা সুইচ B = ১ → রুমের বাতি জ্বলে (১)',
      },
    },
    icCode: '7432 (Quad 2-Input OR Gate)',
    transistorCount: 6,
  },
  NOT: {
    type: 'NOT',
    name: {
      en: 'NOT Gate (Inverter)',
      bn: 'NOT গেট (ইনভার্টার)',
    },
    symbolName: 'Negation (¯)',
    expression: 'Y = A̅',
    booleanEquation: 'Y = NOT A',
    shortDesc: {
      en: 'Inverts the single input: 0 becomes 1, and 1 becomes 0.',
      bn: 'একক ইনপুটকে উল্টে দেয়: ০ কে ১ এবং ১ কে ০ করে।',
    },
    detailedDesc: {
      en: 'The NOT gate, or inverter, has only one input and one output. It reverses the logic state: HIGH becomes LOW, and LOW becomes HIGH. Represented by a triangle with an inversion bubble.',
      bn: 'NOT গেট বা ইনভার্টারের কেবল একটি ইনপুট এবং একটি আউটপুট থাকে। এটি লজিক মান উল্টে দেয়: HIGH কে LOW এবং LOW কে HIGH করে।',
    },
    rule: {
      en: 'Output is the exact opposite of the input. If A = 0, Y = 1; If A = 1, Y = 0.',
      bn: 'আউটপুট সর্বদা ইনপুটের সম্পূর্ণ বিপরীত। যদি A = ০ হয়, Y = ১; আর A = ১ হলে, Y = ০।',
    },
    realLifeExample: {
      title: {
        en: 'Automatic Dusk-to-Dawn Streetlight',
        bn: 'স্বয়ংক্রিয় সান্ধ্যকালীন সড়কবাতি',
      },
      description: {
        en: 'A light sensor detects sunlight (1) during the daytime, causing the street lamp to stay OFF (0). When darkness falls (0), the light automatically turns ON (1).',
        bn: 'দিনের বেলা আলোক সেন্সর সূর্যের আলো (১) পেলে সড়কবাতি বন্ধ (০) থাকে। অন্ধকার হলে (০) সড়কবাতি নিজে থেকেই জ্বলে (১) ওঠে।',
      },
      scenario: {
        en: 'Sunlight Detected (1) → Lamp OFF (0) | Darkness (0) → Lamp ON (1)',
        bn: 'সূর্যের আলো (১) → বাতি বন্ধ (০) | অন্ধকার (০) → বাতি চালু (১)',
      },
    },
    icCode: '7404 (Hex Inverter Gate)',
    transistorCount: 2,
  },
  NAND: {
    type: 'NAND',
    name: {
      en: 'NAND Gate',
      bn: 'NAND গেট',
    },
    symbolName: 'NOT-AND (· + ¯)',
    expression: 'Y = (A · B)̅',
    booleanEquation: 'Y = NOT (A AND B)',
    shortDesc: {
      en: 'Universal gate: Outputs LOW (0) ONLY when ALL inputs are HIGH (1).',
      bn: 'সার্বজনীন গেট: শুধুমাত্র তখনই ০ হবে যখন সব ইনপুট ১ (HIGH) হবে।',
    },
    detailedDesc: {
      en: 'The NAND gate is an AND gate followed by an inverter. It is a "Universal Gate" because any other logic gate (AND, OR, NOT, XOR) can be constructed using only NAND gates.',
      bn: 'NAND গেট হলো একটি অ্যান্ড গেটের পর একটি ইনভার্টারের সমন্বয়। এটি একটি "সার্বজনীন গেট" কারণ শুধুমাত্র NAND গেট ব্যবহার করেই যেকোনো লজিক সার্কিট তৈরি করা সম্ভব।',
    },
    rule: {
      en: 'Output is 1 in all cases, EXCEPT when both Input A = 1 and Input B = 1 (which outputs 0).',
      bn: 'সব ক্ষেত্রেই আউটপুট ১ হবে, কেবল যখন A = ১ এবং B = ১ উভয়ই থাকে তখনই আউটপুট ০ হয়।',
    },
    realLifeExample: {
      title: {
        en: 'Industrial Machine Emergency Cutoff',
        bn: 'শিল্পকারখানার জরুরি স্বয়ংক্রিয় বিদ্যুৎ বিচ্ছিন্নকরণ',
      },
      description: {
        en: 'A heavy factory machine continues operating (1) unless BOTH excessive temperature (1) AND excessive vibration (1) are simultaneously detected, triggering safety shutdown (0).',
        bn: 'কারখানার একটি ভারী যন্ত্র চালু থাকে (১), যদি না একই সাথে অতিরিক্ত তাপমাত্রা (১) এবং অতিরিক্ত কম্পন (১) উভয় বিপত্তি ঘটে। দুটিই ঘটলে মেশিন বন্ধ (০) হয়।',
      },
      scenario: {
        en: 'Both Danger Sensors Tripped (1 & 1) → System Shuts Off (0)',
        bn: 'উভয় বিপদ সংকেত ১ ও ১ → পাওয়ার কাটডাউন বন্ধ (০)',
      },
    },
    icCode: '7400 (Quad 2-Input NAND Gate)',
    transistorCount: 4,
    universal: true,
  },
  NOR: {
    type: 'NOR',
    name: {
      en: 'NOR Gate',
      bn: 'NOR গেট',
    },
    symbolName: 'NOT-OR (+ + ¯)',
    expression: 'Y = (A + B)̅',
    booleanEquation: 'Y = NOT (A OR B)',
    shortDesc: {
      en: 'Universal gate: Outputs HIGH (1) ONLY when ALL inputs are LOW (0).',
      bn: 'সার্বজনীন গেট: শুধুমাত্র তখনই ১ হবে যখন সব ইনপুট ০ (LOW) থাকবে।',
    },
    detailedDesc: {
      en: 'The NOR gate combines an OR gate with an inverter. It is also a "Universal Gate". The output is 1 only when neither input A nor input B is high.',
      bn: 'NOR গেট হলো অর গেটের আউটপুটে একটি ইনভার্টার যুক্ত করা সার্কিট। এটিও একটি "সার্বজনীন গেট"। আউটপুট কেবল তখনই ১ হয় যখন কোনো ইনপুটই ১ নয়।',
    },
    rule: {
      en: 'Output is 1 ONLY when both A = 0 and B = 0. If either input is 1, output immediately becomes 0.',
      bn: 'আউটপুট ১ হবে কেবল যখন A = ০ এবং B = ০। যেকোনো একটি ইনপুট ১ হলেই আউটপুট অবিলম্বে ০ হয়ে যায়।',
    },
    realLifeExample: {
      title: {
        en: 'Car Door Open Warning Indicator',
        bn: 'গাড়ির দরজা খোলা সতর্ক সংকেত',
      },
      description: {
        en: 'A safe "All Clear" light stays green (1) only when Door A is fully shut (0) AND Door B is fully shut (0). If any door is ajar (1), the all-clear light shuts off (0).',
        bn: 'গাড়ির "সব নিরাপদ" সবুজ বাতি জ্বলে থাকে (১) কেবল যখন বাম দরজা বন্ধ (০) এবং ডান দরজা বন্ধ (০)। যেকোনো একটি খুললেই (১) নিরাপদ বাতি নিভে যায় (০)।',
      },
      scenario: {
        en: 'Door A closed (0) NOR Door B open (0) → Safe Indicator Lit (1)',
        bn: 'দরজা A বন্ধ (০) এবং দরজা B বন্ধ (০) → নিরাপদ বাতি জ্বলে (১)',
      },
    },
    icCode: '7402 (Quad 2-Input NOR Gate)',
    transistorCount: 4,
    universal: true,
  },
  XOR: {
    type: 'XOR',
    name: {
      en: 'XOR Gate',
      bn: 'XOR গেট',
    },
    symbolName: 'Exclusive Disjunction (⊕)',
    expression: 'Y = A ⊕ B',
    booleanEquation: 'Y = A XOR B',
    shortDesc: {
      en: 'Outputs HIGH (1) when inputs are DIFFERENT (odd parity).',
      bn: 'ইনপুট দুটি পরস্পর ভিন্ন (একটি ০ ও অন্যটি ১) হলেই কেবল আউটপুট ১ হবে।',
    },
    detailedDesc: {
      en: 'The Exclusive-OR gate outputs 1 if strictly one input is high, but not both. It is essential in digital adders (Half Adder, Full Adder) and parity checking.',
      bn: 'XOR গেট আউটপুট ১ দেয় যখন কেবল একটি ইনপুট ১ থাকে, কিন্তু উভয়টি নয়। বাইনারি যোগ বা ক্যালকুলেটরের অ্যাডার সার্কিটে এটি অপরিহার্য।',
    },
    rule: {
      en: 'Output is 1 if inputs are unequal (0,1 or 1,0). Output is 0 if inputs are identical (0,0 or 1,1).',
      bn: 'ইনপুট দুটি অসমান হলে (০,১ বা ১,০) আউটপুট ১ হবে। ইনপুট সমান হলে (০,০ বা ১,১) আউটপুট ০ হবে।',
    },
    realLifeExample: {
      title: {
        en: 'Two-Way Staircase Light Switching',
        bn: 'সিঁড়ির দোতলা-একতলার ডাবল সুইচিং',
      },
      description: {
        en: 'Flipping either the downstairs switch OR the upstairs switch toggles the light state. If both switches match position, the state inverts back.',
        bn: 'নিচতলার সুইচ বা ওপরতলার সুইচ যেকোনো একটি বদলালে লাইটের অবস্থা উল্টে যায়। এটি দিয়ে ওপর-নিচ থেকে লাইট নিয়ন্ত্রণ করা যায়।',
      },
      scenario: {
        en: 'Switch A ≠ Switch B → Light ON (1) | Switch A = Switch B → Light OFF (0)',
        bn: 'সুইচ A ≠ সুইচ B → বাতি জ্বলে (১) | সুইচ A = সুইচ B → বাতি বন্ধ (০)',
      },
    },
    icCode: '7486 (Quad 2-Input XOR Gate)',
    transistorCount: 8,
  },
  XNOR: {
    type: 'XNOR',
    name: {
      en: 'XNOR Gate',
      bn: 'XNOR গেট',
    },
    symbolName: 'Equivalence (⊙)',
    expression: 'Y = (A ⊕ B)̅',
    booleanEquation: 'Y = NOT (A XOR B)',
    shortDesc: {
      en: 'Outputs HIGH (1) when inputs are IDENTICAL (equality detector).',
      bn: 'ইনপুট দুটি যখন একই মান ধারণ করে (উভয়ই ০ বা উভয়ই ১), তখনই আউটপুট ১ হয়।',
    },
    detailedDesc: {
      en: 'The XNOR gate is the complement of XOR. It outputs HIGH (1) when all inputs are equal. It is widely used in digital comparator circuits to detect if two bits match.',
      bn: 'XNOR গেট হলো এক্সঅর গেটের বিপরীত। ইনপুটগুলো পরস্পরের সমান হলে আউটপুট ১ হয়। ডিজিটাল সংখ্যা তুলনাকারী (Comparator) সার্কিটে এটি ব্যবহৃত হয়।',
    },
    rule: {
      en: 'Output is 1 if inputs are matching (0,0 or 1,1). Output is 0 if inputs differ (0,1 or 1,0).',
      bn: 'ইনপুট দুটি সমান হলে (০,০ বা ১,১) আউটপুট ১ হবে। ইনপুট দুটি ভিন্ন হলে (০,১ বা ১,০) আউটপুট ০ হবে।',
    },
    realLifeExample: {
      title: {
        en: 'Digital Identity / Password Bit Matcher',
        bn: 'ডিজিটাল পাসওয়ার্ড ও শনাক্তকরণ বিট ম্যাচিং',
      },
      description: {
        en: 'In electronic security validation, an XNOR comparator verifies if an entered credential bit perfectly matches the authorized key bit in memory.',
        bn: 'ইলেকট্রনিক সিকিউরিটি চিপে ইনপুট করা কোড এবং সেভ থাকা কোড মিলেছে কিনা তা প্রতিটি বিটে এক্সনর দ্বারা পরীক্ষা করা হয়।',
      },
      scenario: {
        en: 'Stored Bit == Entered Bit → Match Confirmed (1)',
        bn: 'সংরক্ষিত বিট == ইনপুট বিট → মিল সঠিক (১)',
      },
    },
    icCode: '747266 / CD4077 (Quad 2-Input XNOR)',
    transistorCount: 8,
  },
};

/**
 * Step-by-step signal propagation steps
 */
export const STEP_PIPELINE: StepInfo[] = [
  {
    step: 1,
    title: {
      en: '1. Input Generation (Switches)',
      bn: '১. ইনপুট সংকেত তৈরি (সুইচ)',
    },
    description: {
      en: 'User flips physical toggle switch. Active switch (1) connects the circuit to +5V (HIGH), while inactive (0) connects to 0V Ground.',
      bn: 'ব্যবহারকারী সুইচ অন বা অফ করেন। সক্রিয় সুইচ (১) সার্কিটকে +৫ ভোল্টের সাথে এবং নিষ্ক্রিয় সুইচ (০) গ্রাউন্ডের (০ ভোল্ট) সাথে যুক্ত করে।',
    },
    activeElement: 'switches',
  },
  {
    step: 2,
    title: {
      en: '2. Wire Signal Propagation',
      bn: '২. পরিবাহী তারে বিদ্যুত সংকেত সঞ্চালন',
    },
    description: {
      en: 'Electrons and voltage pulses travel along the copper PCB traces towards the logic gate input pins at the speed of electricity.',
      bn: 'পরিবাহী কপার লাইনের মধ্য দিয়ে তড়িৎ পালস ও ইলেকট্রনগুলো লজিক গেটের ইনপুট পিনের দিকে ছুটে যায়।',
    },
    activeElement: 'wire-in',
  },
  {
    step: 3,
    title: {
      en: '3. Gate Internal Evaluation',
      bn: '৩. গেটের অভ্যন্তরীণ লজিক বিশ্লেষণ',
    },
    description: {
      en: 'Internal CMOS/TTL transistor network evaluates the incoming voltage states according to the gate’s Boolean truth function.',
      bn: 'গেটের ভেতরের ট্রানজিস্টর নেটওয়ার্ক ইনপুট ভোল্টেজ বিশ্লেষণ করে সংশ্লিষ্ট বুলিয়ান ফাংশন অনুযায়ী ফলাফল নির্ধারণ করে।',
    },
    activeElement: 'gate',
  },
  {
    step: 4,
    title: {
      en: '4. Output Transmission',
      bn: '৪. আউটপুট লাইনে ভোল্টেজ প্রেরণ',
    },
    description: {
      en: 'The calculated logic state (HIGH +5V or LOW 0V) is driven through the output terminal wire towards the load.',
      bn: 'নির্ধারিত লজিক মান অনুযায়ী আউটপুট তারে +৫ ভোল্ট (HIGH) অথবা ০ ভোল্ট (LOW) প্রবাহিত হয়।',
    },
    activeElement: 'wire-out',
  },
  {
    step: 5,
    title: {
      en: '5. Load / Bulb Response',
      bn: '৫. আউটপুট লোড বা বাল্বের প্রতিক্রিয়া',
    },
    description: {
      en: 'If output is HIGH (1), electric current heats up the bulb tungsten filament, glowing bright amber with radiant light! If LOW (0), bulb remains dark.',
      bn: 'আউটপুট ১ হলে তড়িৎ প্রবাহের ফলে বাল্বের ফিলামেন্ট উজ্জ্বলভাবে জ্বলে ওঠে! আউটপুট ০ হলে বাল্ব সম্পূর্ণ নিভে থাকে।',
    },
    activeElement: 'bulb',
  },
];

/**
 * Quiz challenges for testing student mastery
 */
export const QUIZ_CHALLENGES: QuizQuestion[] = [
  {
    id: 'q1',
    gateType: 'AND',
    targetOutput: true,
    question: {
      en: 'Light up the bulb with an AND gate!',
      bn: 'AND গেট দিয়ে বাতিটি জ্বালিয়ে দেখাও!',
    },
    prompt: {
      en: 'What switch combination is required to make the output HIGH (1)?',
      bn: 'আউটপুট ১ (HIGH) করতে কোন সুইচ কম্বিনেশন প্রয়োজন?',
    },
    explanation: {
      en: 'An AND gate requires BOTH Switch A = 1 AND Switch B = 1 to output HIGH.',
      bn: 'AND গেটে উভয় সুইচ A = ১ এবং B = ১ হলেই আউটপুট ১ হয়।',
    },
  },
  {
    id: 'q2',
    gateType: 'OR',
    targetOutput: true,
    presetA: false,
    question: {
      en: 'Input A is OFF (0). How can you make the OR gate output HIGH (1)?',
      bn: 'ইনপুট A অফ (০) আছে। OR গেটের বাতি জ্বালাতে কী করতে হবে?',
    },
    prompt: {
      en: 'Set Switch B so the bulb illuminates.',
      bn: 'সুইচ B এমনভাবে সেট করো যাতে বাতি জ্বলে।',
    },
    explanation: {
      en: 'Since an OR gate outputs 1 when ANY input is 1, turning Switch B to 1 lights up the bulb.',
      bn: 'OR গেটে যেকোনো একটি ইনপুট ১ হলেই আউটপুট ১ হয়, তাই সুইচ B = ১ করলেই বাতি জ্বলবে।',
    },
  },
  {
    id: 'q3',
    gateType: 'XOR',
    targetOutput: true,
    presetA: true,
    question: {
      en: 'Input A is ON (1). Configure an XOR gate to turn the bulb ON.',
      bn: 'ইনপুট A অন (১) আছে। বাতি জ্বালাতে XOR গেটের সুইচ B কত হতে হবে?',
    },
    prompt: {
      en: 'Choose the state for Switch B.',
      bn: 'সুইচ B এর সঠিক মান নির্বাচন করো।',
    },
    explanation: {
      en: 'An XOR gate outputs 1 only when inputs are DIFFERENT. Since A=1, B must be 0.',
      bn: 'XOR গেটে ইনপুট দুটি ভিন্ন হলেই কেবল ১ হয়। যেহেতু A = ১, তাই B = ০ হতে হবে।',
    },
  },
  {
    id: 'q4',
    gateType: 'NAND',
    targetOutput: false,
    question: {
      en: 'Turn the bulb OFF (0) using a NAND gate!',
      bn: 'NAND গেট দিয়ে বাতিটি নিভিয়ে (০) দাও!',
    },
    prompt: {
      en: 'Find the single combination that makes a NAND gate output 0.',
      bn: 'এমন সুইচ পজিশন দাও যাতে NAND গেটের আউটপুট ০ হয়।',
    },
    explanation: {
      en: 'A NAND gate outputs 0 ONLY when both inputs A and B are 1.',
      bn: 'NAND গেটের আউটপুট শুধুমাত্র তখনই ০ হয় যখন উভয় ইনপুট A ও B ১ থাকে।',
    },
  },
  {
    id: 'q5',
    gateType: 'NOT',
    targetOutput: true,
    question: {
      en: 'Make the NOT gate output HIGH (1).',
      bn: 'NOT গেটের আউটপুট ১ (HIGH) করো।',
    },
    prompt: {
      en: 'Set Switch A to invert into 1.',
      bn: 'সুইচ A এর সঠিক মান দিয়ে আউটপুট ১ করো।',
    },
    explanation: {
      en: 'A NOT gate inverts its input. Input 0 produces Output 1.',
      bn: 'NOT গেট ইনপুটকে উল্টে দেয়। ইনপুট ০ দিলে আউটপুট ১ পাওয়া যায়।',
    },
  },
];
