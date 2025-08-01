export const TOPICS = [
  { id: 'algorithmic-decision-making', name: 'Algorithmic Decision-Making', description: 'Explore the fairness and transparency of algorithmic decision-making systems.' },
  { id: 'generative-ai', name: 'Generative AI', description: 'Understand the capabilities and ethical implications of generative AI technologies.' },
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
  'algorithmic-decision-making': {
    title: 'Algorithmic Decision-Making Quiz',
    questions: [
      {
        question: "What is a key concern regarding algorithmic decision-making in the public sector?",
        options: [
          "The speed of the algorithms",
          "The cost of implementation",
          "The potential for biased or unfair outcomes",
          "The brand of computer used"
        ],
        answer: "The potential for biased or unfair outcomes"
      },
      {
        question: "What does 'transparency' in algorithmic systems refer to?",
        options: [
          "The algorithm's code being open source",
          "The ability to understand how the algorithm makes its decisions",
          "The algorithm being written in a simple programming language",
          "The physical visibility of the server running the algorithm"
        ],
        answer: "The ability to understand how the algorithm makes its decisions"
      },
      {
        question: "Which of the following is an example of a high-stakes decision where algorithms are used?",
        options: [
          "Recommending a movie",
          "Choosing a restaurant",
          "Determining credit scores",
          "Selecting a music playlist"
        ],
        answer: "Determining credit scores"
      }
    ]
  },
  'generative-ai': {
    title: 'Generative AI Quiz',
    questions: [
      {
        question: "What is a primary capability of generative AI?",
        options: [
          "Creating new content like text, images, and music",
          "Only analyzing existing data",
          "Storing large amounts of information",
          "Performing simple calculations"
        ],
        answer: "Creating new content like text, images, and music"
      },
      {
        question: "What is a significant ethical concern related to generative AI?",
        options: [
          "It is too slow to be useful",
          "It is not creative enough",
          "The potential for creating convincing misinformation or 'deepfakes'",
          "It requires too much electricity"
        ],
        answer: "The potential for creating convincing misinformation or 'deepfakes'"
      },
      {
        question: "According to the provided text, what is a key challenge for organizations using generative AI?",
        options: [
          "Finding enough data to train the models",
          "Ensuring the generated content is fair, unbiased, and safe",
          "The high cost of AI hardware",
          "Lack of interest from the public"
        ],
        answer: "Ensuring the generated content is fair, unbiased, and safe"
      }
    ]
  },
};
