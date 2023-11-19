import { z } from 'zod';

const Answer = z.object({
	externalId: z.string().uuid().readonly(),
	cardId: z.string().uuid().readonly().optional(),
	answeredById: z.string().uuid().readonly().optional(),
	difficulty: z.string().readonly(),
	answeredAt: z.date().readonly(),
	answerAgainAt: z.date().readonly(),
});

const Answers = z.array(Answer);

export { Answer, Answers };
