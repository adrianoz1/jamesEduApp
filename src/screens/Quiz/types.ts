export type Alternative = {
  id: string;
  is_correct: boolean;
  content: string;
}

export type Question = {
  id: string;
  content: string;
  alternatives: Alternative[];
}

export type QuizProps = {
  id: string;
  title: string;
  level: number;
  questions: Question[];
};
