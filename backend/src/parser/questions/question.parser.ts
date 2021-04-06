const isPunctuationRe = /[.?!]/g;
const isQuestionRe = /\?$/;

export const parseQuestions = (text: string): string[] => {
  const questions: string[] = [];

  let line = '';

  for (const letter of text) {
    line += letter;

    if (!isPunctuationRe.test(letter)) {
      continue;
    }

    if (!isQuestionRe.test(line)) {
      line = '';

      continue;
    }

    questions.push(line.trim());

    line = '';
  }

  return questions;
};
