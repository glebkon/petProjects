export const questions = {
  1: {
    question: "What is your marital status?",
    answers: [
      { option: "Single", next_question: 2 },
      { option: "Married", next_question: 3 },
      { option: "Divorced" },
    ],
  },
  2: {
    question: "Are you planning on getting married next year?",
    answers: [{ option: "Yes" }, { option: "No", next_question: 5 }],
  },
  3: {
    question: "How long have you been married?",
    answers: [
      { option: "Less than a year" },
      { option: "More than a year", next_question: 4 },
    ],
  },
  4: {
    question: "Have you celebrated your one year anniversary?",
    answers: [{ option: "Yes" }, { option: "No" }],
  },
  5: {
    question: "Are you dating someone?",
    answers: [
      { option: "Yes", next_question: 6 },
      { option: "No", next_question: 7 },
    ],
  },
  6: {
    question: "How long have you been in a relationship?",
    answers: [
      { option: "Less than a year" },
      { option: "More than a year", next_question: 4 },
    ],
  },
  7: {
    question: "When was the last time you were in a relationship?",
    answers: [{ option: "Less than a year" }, { option: "More than a year" }],
  },
};
