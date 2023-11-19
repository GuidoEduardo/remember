import { z } from 'zod';
import { Answer, Answers } from '../entities/answer';

type Answer = z.infer<typeof Answer>;
type Answers = z.infer<typeof Answers>;
type AnswerCreate = Omit<Answer, 'externalId' | 'answeredAt' | 'answerAgainAt'>;
type AnswerOptional = MakeOptional<AnswerCreate>;


export { Answer, Answers, AnswerOptional, AnswerCreate };
