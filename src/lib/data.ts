export const TOPICS = [
  { id: 'ai-bias', name: 'AI Bias', description: 'Explore the nuances of bias in artificial intelligence systems.', icon: 'BrainCircuit' },
  { id: 'data-privacy', name: 'Data Privacy', description: 'Understand the importance of protecting personal data.', icon: 'Lock' },
  { id: 'algorithmic-transparency', name: 'Algorithmic Transparency', description: 'Learn about the need for clarity in how algorithms work.', icon: 'Search' },
  { id: 'surveillance-capitalism', name: 'Surveillance Capitalism', description: 'Investigate the monetization of personal data.', icon: 'Eye' },
  { id: 'autonomous-systems', name: 'Autonomous Systems', description: 'Consider the ethics of self-governing machines.', icon: 'Bot' },
];

export const DAILY_FACTS = [
  "In 2018, it was discovered that a recruiting AI used by a major tech company was biased against female candidates.",
  "The EU's GDPR, implemented in 2018, is one of the world's strictest data privacy regulations.",
  "Some studies show that facial recognition systems have higher error rates for women and people of color.",
  "The term 'surveillance capitalism' was coined by scholar Shoshana Zuboff in 2014.",
  "Ethical frameworks for AI often draw from principles like beneficence, non-maleficence, autonomy, and justice.",
  "The 'Trolley Problem' is a famous ethical thought experiment often applied to the programming of autonomous vehicles.",
  "Data brokers create detailed profiles on individuals, often without their direct knowledge or consent.",
  "Redlining, the discriminatory housing practice, has found a new digital form in biased mortgage-approval algorithms.",
  "The 'Right to be Forgotten' allows individuals in some jurisdictions to have personal data removed from search engines.",
  "Explainable AI (XAI) is a field dedicated to making complex AI 'black boxes' more transparent and understandable."
];

export const QUIZZES: Record<string, { title: string; questions: any[] }> = {
  'ai-bias': {
    title: 'AI Bias Quiz',
    questions: [
      {
        question: 'What is a common source of bias in AI systems?',
        options: [
          'The programming language used',
          'Biased training data',
          'The speed of the processor',
          'The color of the server rack'
        ],
        answer: 'Biased training data',
      },
      {
        question: 'Which of these is a real-world example of AI bias?',
        options: [
          'An AI defeating a chess grandmaster',
          'An AI that can write poetry',
          'Facial recognition struggling to identify non-white faces',
          'An AI that composes classical music'
        ],
        answer: 'Facial recognition struggling to identify non-white faces',
      },
       {
        question: 'What is "algorithmic fairness"?',
        options: [
          'Ensuring algorithms are always correct',
          'An effort to prevent algorithms from having discriminatory impacts',
          'Making algorithms run faster on older hardware',
          'A brand of ethical software'
        ],
        answer: 'An effort to prevent algorithms from having discriminatory impacts',
      },
    ],
  },
  'data-privacy': {
    title: 'Data Privacy Quiz',
    questions: [
      {
        question: "What does GDPR stand for?",
        options: [
          "General Data Protection Regulation",
          "Global Data Privacy Rules",
          "Government Data Protection Registry",
          "General Digital Privacy Rights"
        ],
        answer: "General Data Protection Regulation",
      },
      {
        question: "What is a 'data breach'?",
        options: [
          "A successful attempt to access sensitive data",
          "A type of data compression",
          "A legal document about data usage",
          "When a server runs out of memory"
        ],
        answer: "A successful attempt to access sensitive data",
      }
    ],
  },
  'algorithmic-transparency': {
    title: 'Algorithmic Transparency Quiz',
    questions: [
      {
        question: "Why is algorithmic transparency important?",
        options: [
          "It helps developers debug their code",
          "It makes apps look more modern",
          "It allows for accountability and checking for bias",
          "It increases the algorithm's speed"
        ],
        answer: "It allows for accountability and checking for bias",
      },
      {
        question: "What is meant by an AI 'black box'?",
        options: [
          "An AI that only works at night",
          "A model whose internal workings are difficult for humans to understand",
          "A secure hardware device for running AI",
          "An AI that has been banned"
        ],
        answer: "A model whose internal workings are difficult for humans to understand",
      }
    ],
  },
  'surveillance-capitalism': {
    title: 'Surveillance Capitalism Quiz',
    questions: [
      {
        question: "Who coined the term 'surveillance capitalism'?",
        options: [
          "Mark Zuckerberg",
          "Tim Cook",
          "Shoshana Zuboff",
          "Edward Snowden"
        ],
        answer: "Shoshana Zuboff",
      },
      {
        question: "What is the primary goal of surveillance capitalism?",
        options: [
          "To improve national security",
          "To predict and modify human behavior for profit",
          "To provide free online services",
          "To catch criminals"
        ],
        answer: "To predict and modify human behavior for profit",
      }
    ],
  },
  'autonomous-systems': {
    title: 'Autonomous Systems Quiz',
    questions: [
      {
        question: "The 'Trolley Problem' is often used to discuss the ethics of which technology?",
        options: [
          "Social media algorithms",
          "Drones",
          "Autonomous vehicles",
          "Smart home assistants"
        ],
        answer: "Autonomous vehicles",
      },
      {
        question: "What is a major ethical concern regarding autonomous weapons?",
        options: [
          "Their cost",
          "Their susceptibility to hacking",
          "The lack of human moral judgment in life-or-death decisions",
          "Their weight"
        ],
        answer: "The lack of human moral judgment in life-or-death decisions",
      }
    ],
  },
};
